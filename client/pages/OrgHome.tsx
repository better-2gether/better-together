import OrgCalendar from '../components/OrgCalendar';
import { Org } from '../types';
import styles from './OrgHome.module.css';

interface OrgHomeProps {
  OrgData: Org;
}

const OrgHome = ( { OrgData }:OrgHomeProps ) => {
  return (
    <div className={styles.container}>
      <div className={styles['event-container']}>hello</div>
      <div className={styles['details-container']}>
        <OrgCalendar />
      </div>
    </div>
  );
}

export default OrgHome;