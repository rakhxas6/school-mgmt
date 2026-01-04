import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "220px", background: "#111", color: "#fff" }}>
      <h3 style={{ padding: "16px" }}>School Admin</h3>

      <nav>
        <ul style={{ listStyle: "none", padding: "0" }}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/students">Students</Link></li>
          <li><Link to="/classes">Classes</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
