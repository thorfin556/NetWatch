import monitorModel from "../models/monitor.js";
import resultModel from "../models/checkResult.js";
import validator from "validator";

export async function createMonitor(req, res) {
  const { name, url } = req.body;
  
  if (!name || !url) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  let cleanUrl = url.toLowerCase();
  if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "https://" + cleanUrl;
  }
  try {
    // duplicate prevention
    const exists = await monitorModel.findOne({
        user: req.user._id,
        url: cleanUrl
    });
    if(exists){
        return res.status(409).json({
            success: false,
            message: "Monitor alreay Exists",
        })
    }

    // create monitor
    const monitor = new monitorModel({
    name,
    url: cleanUrl,
    user: req.user._id,
  });
  const savedMonitor = await monitor.save();
  res.status(201).json({
    success: true,
    monitor: savedMonitor,
  })

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }

}

export async function getMonitorUser(req,res) {
    try {
     const monitor = await monitorModel.find({
        user: req.user._id
    });
    res.status(201).json({
        success: true,
        monitor,
    })   
    } catch (err) {
        console.error(err);
        res.status(500).json({
        success: false,
        message: "Server error",
    });
    }

}

export async function getMoniterById(req,res) {
    const monitor =  await monitorModel.findById(req.params.id)
 try {
    if (!monitor) {
      return res.status(404).json({
        success: false,
        message: "Monitor Not Found",
      });
    }if(monitor.user.toString() !== req.user._id.toString()){
        return res.status(401).json({
            success: false,
            message:"Unauthorized Access"
        })
    }res.json({
        success: true,
        monitor,
    })
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
export async function getMoniterHistory(req,res) {
    const monitor =  await monitorModel.findById(req.params.id)
 try {
    if (!monitor) {
      return res.status(404).json({
        success: false,
        message: "Monitor Not Found",
      });
    }if(monitor.user.toString() !== req.user._id.toString()){
        return res.status(401).json({
            success: false,
            message:"Unauthorized Access"
        })
    }
    const history = await resultModel.find({
        monitor: monitor._id
    }).sort({ checkedAt: -1 })
        .limit(20);
    res.json({
        success: true,
        history,
    })
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
export async function getLatestMonitor(req,res) {
    const monitor =  await monitorModel.findById(req.params.id)
 try {
    if (!monitor) {
      return res.status(404).json({
        success: false,
        message: "Monitor Not Found",
      });
    }if(monitor.user.toString() !== req.user._id.toString()){
        return res.status(401).json({
            success: false,
            message:"Unauthorized Access"
        })
    }
    const latest = await resultModel.findOne({
        monitor: monitor._id
    }).sort({ checkedAt: -1 });
    res.json({
        success: true,
        latest,
    })
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};



export async function updateMonitor(req,res) {
    const {name,url} = req.body;
    if(!name || !url){
        return res.status(401).json({
            success: false,
            message: "Invalid Name or URL"
        })
    }
    try {
        const monitor = await monitorModel.findById(req.params.id);
    
        // to check if monitor exists
        if(!monitor){
            return res.status(404).json({
                success: false,
                message: "Monitor Not Found"
            });
        };
        
        // Ownership check
        if(monitor.user.toString() !== req.user._id.toString()){
        return res.status(401).json({
            success: false,
            message:"Unauthorized Access"
        });
    }
    let cleanUrl = url.toLowerCase();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "https://" + cleanUrl;
    }

    // updates values
    monitor.name = name;
    monitor.url = cleanUrl;

    const updatedMonitor = await monitor.save();

    res.json({
        success: true,
        monitor: updatedMonitor,
        message: "Monitor Updated successfully"
    });
    }catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
}}

export async function deletedMonitor(req,res) {
    try {
        const monitor = await monitorModel.findById(req.params.id);
    
        // to check if monitor exists
        if(!monitor){
            return res.status(404).json({
                success: false,
                message: "Monitor Not Found"
            });
        };
        
        // Ownership check
        if(monitor.user.toString() !== req.user._id.toString()){
        return res.status(401).json({
            success: false,
            message:"Unauthorized Access"
        });
    }
    const monitorDelete = await monitor.deleteOne();
    res.json({
        success: true,
        message: "Monitor Deleted Successfully",
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
}}

export async function dashboard(req,res) {
    try {
    const totalMonitor = await monitorModel.find({
        user: req.user._id
        })
    const activeMonitor = await monitorModel.countDocuments({
        user: req.user._id,
        isActive: true
    });
    const downMonitor = await monitorModel.countDocuments({
        user: req.user._id,
        isActive: false
    });
    const monitorArray = totalMonitor.map((monitor) => monitor._id);
    const resultCheck = await resultModel.find({
        monitor: {
            $in: monitorArray
        }
    });
    const totalResponseTime = resultCheck.reduce(
        (sum,result) => sum + result.responseTime,
        0
    );
    const avgResponseTime =  
        resultCheck.length > 0
            ? Math.round(totalResponseTime / resultCheck.length)
            : 0;
    const totalChecks = await resultModel.countDocuments({
        monitor: {
            $in: monitorArray
        }
    })
    const upChecks = await resultModel.countDocuments({
         monitor: {
            $in: monitorArray
        },
        status: "UP"
    })
    const uptime = totalChecks > 0
        ? Math.round(Number(((upChecks / totalChecks) * 100).toFixed(2)))
        :0;
    const lastCheck = await resultModel.findOne({
         monitor: {
            $in: monitorArray
        }
    }).sort({
        checkedAt: -1
    });
    const recentChecks = await resultModel
        .find({
            monitor:{ $in: monitorArray }
        })
            .sort({ checkedAt:-1 })
            .limit(20);
    const fastest = await resultModel.findOne({
         monitor: {
            $in: monitorArray
        },
        status: "UP"
    }).sort({
        responseTime: 1
    }).populate("monitor");
    const slowest = await resultModel.findOne({
         monitor: {
            $in: monitorArray
        }
    }).sort({
        responseTime: -1
    }).populate("monitor");
    res.json({
        TotalMonitor: totalMonitor.length,
        activeMonitor: activeMonitor,
        downMonitor: downMonitor,
        avgResponseTime: avgResponseTime,
        TotalChecks: totalChecks,
        recentChecks: recentChecks,
        UpTimePercentage: uptime,
        LastCheck: lastCheck
        ? lastCheck.checkedAt.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
            })
            : "No checks yet",
        fastestMonitor: fastest
        ?{
            name: fastest.monitor.name,
            responseTime: fastest.responseTime
        }
        : null,
        slowestMonitor: slowest
        ?{
            name: slowest.monitor.name,
            responseTime: slowest.responseTime
        }:null,
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
}}