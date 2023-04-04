import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = (): JSX.Element => {
  return (
    <div className={styles.nav}>
      <nav className={styles['nav-content']}>
        <NavLink className={styles['logo-link']} to='/'>Better Together</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;