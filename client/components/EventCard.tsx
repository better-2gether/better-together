import styles from './EventCard.module.css';
import { Event } from '../types';

const EventCard = ( { eventId, title, date, needs, userRanks}: Event ): JSX.Element => {
  return (
    <div className={styles.container}>
      Example
    </div>
  );
}

export default EventCard;