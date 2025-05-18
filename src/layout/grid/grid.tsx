import type { PropsWithChildren } from "react";
import * as styles from './style.module.css';

export const Grid = (props: PropsWithChildren) => (
  <div className={styles.grid} {...props}>
    {props.children}
  </div>);