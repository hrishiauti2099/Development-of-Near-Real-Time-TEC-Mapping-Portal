export interface AitecQuery {
  datetime: string; // ISO 8601 datetime
  latitude: number;
  longitude: number;
  f107: number;
}

export interface AitecValue {
  datetime: string; // ISO 8601 datetime
  latitude: number;
  longitude: number;
  f107: number;
  vtec: number;
}
