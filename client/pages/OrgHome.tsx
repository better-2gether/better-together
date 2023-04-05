import { useState, useEffect } from 'react';
import OrgCalendar from '../components/OrgCalendar';
import EventCard from '../components/EventCard';
import { Org, Event } from '../types';
import styles from './OrgHome.module.css';

const OrgHome = ( { orgId, orgName, username, causes, events }: Org ) => {
  const [days, setDays] = useState<Date[] | undefined>([]);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>(events);
  const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);

  useEffect((): void => {
    if (days && days.length === 0) setSelectedEvents(events);
    else setSelectedEvents(events.filter((event) => days?.map((day) => day.toDateString()).includes(event.date.toDateString())));
  }, [days]);

  return (
    <div className={styles.container}>
      <div className={styles['details-container']}>
        <OrgCalendar
          days={days}
          setDays={setDays}
        />
      </div>
      
      <div className={styles['event-container']}>
        {selectedEvents && selectedEvents.map((event: Event, i: number): JSX.Element => {
          return (
            <EventCard
              key={event.eventId}
              event={event}
              darkStyle={i % 2 === 0}
            />
          );
        })}
      </div>
    </div>
  );
}

export default OrgHome;