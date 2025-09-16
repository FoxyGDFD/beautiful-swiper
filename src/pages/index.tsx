import { Timeline } from "@widgets/timeline";
import style from './Page.module.scss'

export const MainPage = () => {
  return <div className={style.page}>
      <Timeline />
    </div>
}