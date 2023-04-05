import styles from './EventCard.module.css';
import { Event } from '../types';

interface EventCardProps {
  darkStyle: boolean,
  event: Event
}

const EventCard = ( props: EventCardProps ): JSX.Element => {
  const {darkStyle, event: { eventId, title, date, needs, userRanks}} = props;

  // Use only the first 50 characters of the title.
  const truncatedTitle: string = title.length > 40 ? `${title.slice(0, 40)}...` : title;

  return (
    <div className={darkStyle? styles['dark-container'] : styles['light-container']}>
      <h4 className={styles.title}>{truncatedTitle}</h4>
    </div>
  );
}

export default EventCard;