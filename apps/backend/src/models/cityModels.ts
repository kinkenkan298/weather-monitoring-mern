import { Document, model, Schema } from "mongoose";

export interface ICity {
  name: string;
  country: string;
  population: number;
  latitude: number;
  longitude: number;
  timezone: string;
}
interface ICityDocument extends ICity, Document { }

const CitySchema = new Schema<ICityDocument>(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    population: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timezone: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const cityModel = model<ICity>("cities", CitySchema);
