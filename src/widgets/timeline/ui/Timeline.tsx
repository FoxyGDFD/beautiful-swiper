import styles from './Timeline.module.scss';
import { TimelineCircle } from './TimelineCircle';
import { SELECT_SLIDER_BUTTONS, useSliderSelector } from '@shared/store/useSliderSelector';
import { toTwoDigitString } from '../utils/to-two-digit-string';
import { Button } from '@shared/ui';
import ArrowBack from '../assets/arrow-left.svg?react';
import ArrowForward from '../assets/arrow-right.svg?react';
import { TimelineSlider } from './Slider';

export interface TimelineEvent {
  title: string | number;
  description: string;
}


const events: TimelineEvent[] = [
  {
    title: 2020,
    description: "Начало разработки инновационной платформы"
  },
  {
    title: 2021,
    description: "Привлечение первых крупных клиентов и партнеров"
  },
  {
    title: 2020,
    description: "Начало разработки инновационной платформы"
  },
  {
    title: 2021,
    description: "Привлечение первых крупных клиентов и партнеров"
  },
  {
    title: 2020,
    description: "Начало разработки инновационной платформы"
  },
  {
    title: 2021,
    description: "Привлечение первых крупных клиентов и партнеров"
  },
  {
    title: 2020,
    description: "Начало разработки инновационной платформы"
  },
  {
    title: 2021,
    description: "Привлечение первых крупных клиентов и партнеров"
  },
  {
    title: 2020,
    description: "Начало разработки инновационной платформы"
  },
  {
    title: 2021,
    description: "Привлечение первых крупных клиентов и партнеров"
  },
];


export const Timeline = () => {
  const { currentIndex, total, dispatch } = useSliderSelector();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Исторические<br/> даты</h2>

      <TimelineCircle buttons={SELECT_SLIDER_BUTTONS}/>
      <div className={styles.navigation}>
        <p className={styles.counter}>{toTwoDigitString(currentIndex+1)}/{toTwoDigitString(total)}</p>
        <div className='d-flex gap-5'>
          <Button className={styles.controller} onClick={() => dispatch({ type: 'PREV'})}><ArrowBack className={styles.icon} /></Button>
          <Button className={styles.controller} onClick={() => dispatch({ type: 'NEXT'})}><ArrowForward className={styles.icon} /></Button>
        </div>
      </div>
      <TimelineSlider events={events} activeIndex={0}  />
    </div>
  );
};