import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearUser } from "../redux/userSlice";
import styles from "../styles/navBar.module.css";
import { Menu, X } from "lucide-react"; 

interface NavbarProps {
  active: "inventory" | "orders" | "leaderboard" | "reviews" | "dashboard";
}

const FNavbar: React.FC<NavbarProps> = ({ active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
      <span >Food</span>
      <span >Sync</span>
       </div>
      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
        <Link to="/foodbank/dashboard" className={active === "dashboard" ? styles.active : ""}>Dashboard</Link>
        <Link to="/foodbank/availableItems" className={active === "inventory" ? styles.active : ""}>Available Items</Link>
        <Link to="/foodbank/ordersPage" className={active === "orders" ? styles.active : ""}>My Orders</Link>
        <Link to="/leaderboard" className={active === "leaderboard" ? styles.active : ""}>Leaderboard</Link>
        <Link to="/foodbank/reviews" className={active === "reviews" ? styles.active : ""}>Review</Link>

   
        <div className={styles.userAreaMobile}>
         
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </div>
      </nav>

      
      <div className={styles.userArea}>
      
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
    </header>
  );
};

export default FNavbar;
