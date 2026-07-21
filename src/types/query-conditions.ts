export type QueryConditions<T> = {
  [K in keyof T]?: T[K];
};
