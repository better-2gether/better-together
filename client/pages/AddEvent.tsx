import { useState } from 'react';
import styles from './AddEvent.module.css';


const AddEvent = ( ): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>((new Date()).toDateString());


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send request
  };

  return (
    <div className={styles.container}>
      <h1>Add a New Event</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={styles.formRow}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            placeholder='Event title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={styles.needs}>
        </div>
      </form>
      <button type='submit'>Add Event</button>

    </div>
  );
}

export default AddEvent;