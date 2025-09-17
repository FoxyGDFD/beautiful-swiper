import styles from './Timeline.module.scss';
import { TimelineCircle } from './TimelineCircle';
import { SELECT_SLIDER_BUTTONS, useSliderSelector } from '@shared/store/useSliderSelector';
import { toTwoDigitString } from '../utils/to-two-digit-string';
import { Button } from '@shared/ui';
import ArrowBack from '../assets/arrow-left.svg?react';
import ArrowForward from '../assets/arrow-right.svg?react';
import { TimelineSlider } from './Slider';
import { BulletNavigation } from './BulletNavigation';

export interface TimelineEvent {
  title: string | number;
  description: string;
}
// TODO: move to some config
const timelines: TimelineEvent[][] = [
  // Строка 1: Древняя история
  [
    { title: "3000 до н.э.", description: "Объединение Верхнего и Нижнего Египта" },
    { title: "2500 до н.э.", description: "Строительство пирамиды Хеопса" },
    { title: "2000 до н.э.", description: "Расцвет цивилизации долины Инда" },
    { title: "1500 до н.э.", description: "Правление династии Шан в Китае" },
    { title: "1000 до н.э.", description: "Основание Карфагена" },
    { title: "500 до н.э.", description: "Расцвет Афинской демократии" }
  ],

  // Строка 2: Античность
  [
    { title: "336 до н.э.", description: "Александр Македонский становится царём" },
    { title: "264 до н.э.", description: "Начало Первой Пунической войны" },
    { title: "44 до н.э.", description: "Убийство Юлия Цезаря" },
    { title: "27 до н.э.", description: "Основание Римской империи" },
    { title: "79 н.э.", description: "Извержение Везувия, гибель Помпеи" },
    { title: "395 н.э.", description: "Раздел Римской империи на Западную и Восточную" }
  ],

  // Строка 3: Средневековье
  [
    { title: "476", description: "Падение Западной Римской империи" },
    { title: "800", description: "Коронация Карла Великого" },
    { title: "1066", description: "Нормандское завоевание Англии" },
    { title: "1096", description: "Начало Крестовых походов" },
    { title: "1347", description: "Начало эпидемии Чёрной смерти" },
    { title: "1453", description: "Падение Константинополя" }
  ],

  // Строка 4: Новое время
  [
    { title: "1492", description: "Открытие Америки Колумбом" },
    { title: "1517", description: "Начало Реформации" },
    { title: "1588", description: "Разгром Непобедимой армады" },
    { title: "1648", description: "Вестфальский мир" },
    { title: "1789", description: "Великая французская революция" },
    { title: "1815", description: "Венский конгресс" }
  ],

  // Строка 5: XIX век
  [
    { title: "1848", description: "Весна народов в Европе" },
    { title: "1861", description: "Отмена крепостного права в России" },
    { title: "1871", description: "Объединение Германии" },
    { title: "1885", description: "Изобретение автомобиля Бенцем" },
    { title: "1896", description: "Первые современные Олимпийские игры" },
    { title: "1898", description: "Испано-американская война" }
  ],

  // Строка 6: XX-XXI век
  [
    { title: "1914", description: "Начало Первой мировой войны" },
    { title: "1945", description: "Окончание Второй мировой войны" },
    { title: "1969", description: "Первый человек на Луне" },
    { title: "1991", description: "Распад СССР" },
    { title: "2001", description: "Теракты 11 сентября" },
    { title: "2020", description: "Пандемия COVID-19" }
  ]
];


export const Timeline = () => {
  const { currentIndex, total, dispatch } = useSliderSelector();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Исторические<br/> даты</h2>

      <TimelineCircle buttons={SELECT_SLIDER_BUTTONS}/>
      <div className={styles.navigation}>
        <p className={styles.counter}>{toTwoDigitString(currentIndex+1)}/{toTwoDigitString(total)}</p>
        <div className={styles.navigationElements}>
          <div className={styles.buttonContainer}>
            <Button className={styles.controller} onClick={() => dispatch({ type: 'PREV'})}><ArrowBack className={styles.icon} /></Button>
            <Button className={styles.controller} onClick={() => dispatch({ type: 'NEXT'})}><ArrowForward className={styles.icon} /></Button>
          </div>
           <BulletNavigation buttons={SELECT_SLIDER_BUTTONS} className={styles.mobileController} />
        </div>
      </div>
      <TimelineSlider events={timelines[currentIndex]}  />
    </div>
  );
};