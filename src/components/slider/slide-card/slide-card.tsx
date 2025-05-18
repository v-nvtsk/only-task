import type { PeriodEvent } from '@/types/data';
import { classnames } from '@utils/classnames';
import * as styles from './style.module.css';

export const SlideCard = ({ isActive, item }: { isActive: boolean, item: PeriodEvent }) => (
  <div className={classnames(styles.slide, isActive ? styles.slideActive : '')}>
    <div className={styles.year}>{item.year}</div>
    <div className={styles.description}>{item.description}</div>
  </div>
);