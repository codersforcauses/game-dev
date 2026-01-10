export interface PageResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
