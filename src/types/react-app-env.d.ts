// react-app-env.d.ts
import 'react';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}