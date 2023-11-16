export type Nullable<T> = T | null;

export interface IPokemon {
  id?: string;
  name: string;
  url: string;
}

export interface IResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}
