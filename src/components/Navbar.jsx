import { Menu, Bell } from "lucide-react";

function Navbar() {
  return (
    <header className="topbar">

      <button className="menu-button">
        <Menu size={22} />
      </button>

      <div className="topbar-actions">

        <button className="notification-button">
          <Bell size={21} />
          <span className="notification-badge">3</span>
        </button>

        <div className="avatar">
          ML
        </div>

      </div>

    </header>
  );
}

export default Navbar;