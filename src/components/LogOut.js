import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-reducer";

const Logout = () => {
  const nav = useNavigate();
  const dispatch = useDispatch(); 
  const logOuthandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("photoUrl");
    localStorage.removeItem("emailVerified");
    localStorage.removeItem("displayName");
    dispatch(authActions.logout());
    nav("/");
  };
  return <Button variant="secondary" className="py-1 mt-2" onClick={logOuthandler}>Logout</Button>;
};
export default Logout;
