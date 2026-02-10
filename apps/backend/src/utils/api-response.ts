import type { Response } from "express";

export enum MessageType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}
export interface APIResponse<T = unknown> {
  res: Response;
  success?: boolean;
  message?: string;
  errors?: string[];
  data: T;
  statusCode: number;
  type?: MessageType;
}

const successResponse = <T>({
  res,
  message,
  data,
  success = true,
  statusCode = 200,
  type = MessageType.SUCCESS,
}: APIResponse<T>): Response => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    type,
  } as APIResponse<T>);
};
const errorResponse = <T>({
  res,
  message,
  data,
  errors,
  statusCode = 500,
  type = MessageType.ERROR,
}: APIResponse<T>) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    data,
    type,
  } as APIResponse<T>);
};

export interface GeoCityResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  extratags: Extratags;
  namedetails: Namedetails;
  boundingbox: string[];
}

export interface Namedetails {
  name: string;
}

export interface Extratags {
  lanes: string;
  width: string;
  oneway: string;
  surface: string;
  motorcycle: string;
  smoothness: string;
}

export interface Address {
  road: string;
  neighbourhood: string;
  village: string;
  city_district: string;
  city: string;
  state: string;
  "ISO3166-2-lvl4": string;
  region: string;
  "ISO3166-2-lvl3": string;
  postcode: string;
  country: string;
  country_code: string;
}

export { errorResponse, successResponse };
