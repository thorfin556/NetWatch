import { useContext } from "react";
import { AuthContext} from "../context/AuthContext.jsx";

function useAuth(){
    const auth = useContext(AuthContext);
    return auth;

}

export default useAuth;