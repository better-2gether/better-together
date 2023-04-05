import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import type { Org, User } from '../types';

interface NavbarProps {
  isUser: boolean;
  user: Org | User | null;
}

const Navbar = (props: NavbarProps): JSX.Element => {
  const { isUser, user } = props;

  return (
    <div className={styles.nav}>
      <nav className={styles.navContent}>
        <NavLink className={styles.logoLink} to='/'>
          Better Together
        </NavLink>
        <ul className={styles.navList}>
          {!isUser && (
            <li>
              <NavLink className={styles.btnEvent} to='/event'>
                Add Event
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
