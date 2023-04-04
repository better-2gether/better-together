import OrgCalendar from '../components/OrgCalendar';
import EventCard from '../components/EventCard';
import { Org, Event } from '../types';
import styles from './OrgHome.module.css';

const OrgHome = ( { orgId, orgName, username, causes, events }: Org ) => {
  return (
    <div className={styles.container}>
      
      <div className={styles['event-container']}>
        {events && events.map((event: Event, i: number): JSX.Element => {
          return (
            <EventCard
              key={event.eventId}
              event={event}
              darkStyle={i % 2 === 0}
            />
          );
        })}
      </div>

      <div className={styles['details-container']}>
        <OrgCalendar />
      </div>
    </div>
  );
}

export default OrgHome;