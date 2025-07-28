import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
        
      <Link to="/Login">Login</Link>
      <Link to="/Register">Register</Link>
    </div>
  );
};
export default Header;
