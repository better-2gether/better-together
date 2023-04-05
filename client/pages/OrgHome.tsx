import { useState, useEffect } from 'react';
import OrgCalendar from '../components/OrgCalendar.js';
import EventCard from '../components/EventCard.js';
import { Event } from '../types.js';
import styles from './OrgHome.module.css';

interface OrgHomeProps {
  events: Event[];
}

const OrgHome = (props: OrgHomeProps) => {
  const { events } = props;

  const [days, setDays] = useState<Date[] | undefined>([]);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>(events);

  useEffect((): void => {
    if (days && days.length === 0) setSelectedEvents(events);
    else
      setSelectedEvents(
        events.filter((event: Event) =>
          days?.map((day) => day.toDateString()).includes(event.date.toDateString())
        )
      );
  }, [days]);

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <OrgCalendar days={days} setDays={setDays} />
      </div>

      <div className={styles.eventContainer}>
        {selectedEvents &&
          selectedEvents.map((event: Event, i: number): JSX.Element => {
            return <EventCard key={event._id.toString()} event={event} darkStyle={i % 2 === 0} />;
          })}
      </div>
    </div>
  );
};

export default OrgHome;
