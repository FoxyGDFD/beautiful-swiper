import styles from './Timeline.module.scss';
import clsx from 'clsx';
import { TimelineCircle } from './TimelineCircle';

export interface TimelineEvent {
  year: string;
  date?: string;
  title: string;
  description: string;
}

interface TimelineProps {
  title?: string;
  className?: string;
}

const buttons = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 }
];


export const Timeline = ({ className }: TimelineProps) => {
  return (
    <div className={clsx(styles.timeline, className)}>
      <h2 className={styles.title}>Исторические<br/> даты</h2>

      <TimelineCircle buttons={buttons}/>
    </div>
  );
};