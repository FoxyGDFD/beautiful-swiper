import styles from './Timeline.module.scss';
import clsx from 'clsx';
import { TimelineCircle } from './TimelineCircle';
import { SELECT_SLIDER_BUTTONS, useSliderSelector } from '@shared/store/useSliderSelector';
import { toTwoDigitString } from '../utils/to-two-digit-string';
import { Button } from '@shared/ui';
import ArrowBack from '../assets/arrow-left.svg?react'
import ArrowForward from '../assets/arrow-right.svg?react'

export interface TimelineEvent {
  year: string;
  date?: string;
  title: string;
  description: string;
}



export const Timeline = () => {
  const { currentIndex, total, dispatch } = useSliderSelector();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Исторические<br/> даты</h2>

      <TimelineCircle buttons={SELECT_SLIDER_BUTTONS}/>
      <div className={styles.controls}>
        <p className={styles.counter}>{toTwoDigitString(currentIndex+1)}/{toTwoDigitString(total)}</p>
        <div className='d-flex gap-5'>
          <Button onClick={() => dispatch({ type: 'PREV'})}><ArrowBack className={styles.icon} /></Button>
          <Button onClick={() => dispatch({ type: 'NEXT'})}><ArrowForward className={styles.icon} /></Button>
        </div>
      </div>
    </div>
  );
};