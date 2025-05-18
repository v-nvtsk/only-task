import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as styles from './style.module.css';

interface YearsProps {
  from: number;
  to: number;
}

export const Years = ({ from, to }: YearsProps) => {
  const fromRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (fromRef.current) fromRef.current.innerText = from.toString();
    if (toRef.current) toRef.current.innerText = to.toString();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fromRef.current) {
      gsap.fromTo(fromRef.current,
        { innerText: fromRef.current.innerText },
        {
          duration: 1,
          innerText: from,
          snap: { innerText: 1 },
          modifiers: {
            innerText: (value: string) => Math.floor(parseFloat(value)).toString(),
          },
        },
      );
    }

    if (toRef.current) {
      gsap.fromTo(toRef.current,
        { innerText: toRef.current.innerText },
        {
          duration: 1.5,
          innerText: to,
          snap: { innerText: 1 },
          modifiers: {
            innerText: (value: string) => Math.floor(parseFloat(value)).toString(),
          },
        },
      );
    }
  }, [from, to]);

  return (
    <div className={styles.years}>
      <span ref={fromRef} className={styles.from} />
      <span ref={toRef} className={styles.to} />
    </div>
  );
};