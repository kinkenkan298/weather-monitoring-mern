export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface City {
  _id: string;
  name: string;
  country: string;
  population: number;
  latitude: number;
  longitude: number;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export type CityApiResponse = ApiResponse<City[]>;
