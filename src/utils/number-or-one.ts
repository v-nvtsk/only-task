export function numberOrOne (arg: unknown){
  return typeof arg === 'number' ? arg : 1;
}