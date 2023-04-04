import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './OrgCalendar.module.css';

const OrgCalendar = () => {
  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);

  return (
    <div className={styles.container}>
      <style>{`
        .rdp {
          --rdp-cell-size: 32px;
        }
        .rdp-months {
          justify-content: center;
        }
        .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
          background-color: white;
          color: var(--color-secondary);
        }
      `}</style>
      <DayPicker
        mode="multiple"
        selected={days}
        onSelect={setDays}
      />
      
    </div>
  );
}

export default OrgCalendar;