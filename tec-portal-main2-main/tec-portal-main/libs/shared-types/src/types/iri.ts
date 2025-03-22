export interface IriQuery {
  datetime: string; // ISO 8601 datetime
  latitude: number;
  longitude: number;
  f107?: number;
}

export interface IriValue {
  datetime: string; // ISO 8601 datetime
  latitude: number;
  longitude: number;
  f107?: number;
  vtec: number;
}
