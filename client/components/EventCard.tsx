import styles from './EventCard.module.css';
import { Event } from '../types';

interface EventCardProps {
  darkStyle: boolean,
  event: Event
}

const EventCard = ( props: EventCardProps ): JSX.Element => {
  const {darkStyle, event: { eventId, title, date, needs, userRanks}} = props;

  return (
    <div className={darkStyle? styles['dark-container'] : styles['light-container']}>
      <h4 className={styles.title}>{title}</h4>
    </div>
  );
}

export default EventCard;