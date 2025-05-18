export interface PeriodEvent{
  year: number,
  description: string
}

export interface Period{
  title: string,
  events: PeriodEvent[],
}