import { useState } from 'react';
import type { ObjectId } from 'mongodb';
import type { Event } from '../types';
import styles from './AddEvent.module.css';

interface AddEventProps {
  _id: ObjectId;
  updateOrgEvents: (events: Event) => void;
}

const AddEvent = (props: AddEventProps): JSX.Element => {
  const { _id, updateOrgEvents } = props;

  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toDateString());
  const [need, setNeed] = useState<string>('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<'success' | 'failure' | ''>('');

  const needsList = [
    'Web Development',
    'Construction',
    'Marketing',
    'Telephone Work',
    'Mentoring',
    'Fundraising',
    'Cooking',
    'Event Planning',
    'Crafts',
    'Gardening',
    'Data Entry',
    'Legal Services',
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/addEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          _id,
          title,
          date,
          needs,
        }),
      });
      if (!response.ok) throw Error;
      const data = await response.json();
      updateOrgEvents(data.events);
      setFormStatus('success');
    } catch (err) {
      setFormStatus('failure');
    }
  };

  const addNeed = () => {
    if (need.length === 0 || needs.includes(need)) return;
    setNeeds([...needs, need]);
  };

  const deleteNeed = (deleteNeed: string) => {
    if (deleteNeed.length === 0) return;
    setNeeds(needs.filter((need) => need !== deleteNeed));
  };

  return (
    <div className={styles.container}>
      <h1>Add a New Event</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {/* Event title */}
        <div className={styles.formRow}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            placeholder='Event title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Event date */}
        <div className={styles.formRow}>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Event needs */}
        <div className={styles.needs}>
          <div className={styles.formCol}>
            <label htmlFor='needs'>Add Needs</label>
            <div>
              <select name='needs' onChange={(e) => setNeed(e.target.value)}>
                <option value=''>-- Select a need --</option>
                {needsList.map((need) => (
                  <option value={need} key={need}>
                    {need}
                  </option>
                ))}
              </select>
              <button type='button' onClick={addNeed}>
                Add Need
              </button>
            </div>
          </div>
          <ul className={styles.needsList}>
            {needs.map((need) => (
              <li key={`li-${need}`}>
                {need}
                <button type='button' onClick={() => deleteNeed(need)}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
      <button type='submit'>Add Event</button>
      {formStatus === 'success' && <div className={styles.formSuccess}>Event added!</div>}
      {formStatus === 'failure' && (
        <div className={styles.formFailure}>Error adding event. Please try again.</div>
      )}
    </div>
  );
};

export default AddEvent;
