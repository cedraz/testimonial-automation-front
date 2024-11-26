export interface IPaginationResponse<T> {
  results: T[];
  total: number;
  init: number;
  limit: number;
}
