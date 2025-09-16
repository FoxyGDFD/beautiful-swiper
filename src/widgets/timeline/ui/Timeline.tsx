import styles from './Timeline.module.scss';
import clsx from 'clsx';
import { TimelineCircle } from './TimelineCircle';
import { SELECT_SLIDER_BUTTONS } from '@shared/store/useSliderSelector';

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


export const Timeline = ({ className }: TimelineProps) => {
  return (
    <div className={clsx(styles.timeline, className)}>
      <h2 className={styles.title}>Исторические<br/> даты</h2>

      <TimelineCircle buttons={SELECT_SLIDER_BUTTONS}/>
    </div>
  );
};