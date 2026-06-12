import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditPage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMonitor = async () => {
      try {
        const response = await api.get(`/monitors/${id}`);

        setName(response.data.monitor.name);
        setUrl(response.data.monitor.url);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonitor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/monitors/${id}`, {
        name,
        url,
      });

      navigate('/monitor')
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
        />

        <input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
        />
         <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Confirm Edit"}
        </button>
      </form>
    </div>
  );
}

export default EditPage;
