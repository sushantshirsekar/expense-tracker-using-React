import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const nav = useNavigate();
  const logOuthandler = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("photoUrl");
    localStorage.removeItem("emailVerified");
    localStorage.removeItem("displayName");
    nav("/");
  };
  return <Button variant="secondary" className="py-1 mt-2" onClick={logOuthandler}>Logout</Button>;
};
export default Logout;
