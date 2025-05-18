import type { PropsWithChildren } from "react";

export const GridArea = (props: PropsWithChildren<{ areaName: string }>) => (
  <div style={{ gridArea: props.areaName }}>
    {props.children}
  </div>
);