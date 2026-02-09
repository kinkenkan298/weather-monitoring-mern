import { Document, model, Schema } from "mongoose";

export interface ICity extends Document {
  name: string;
  country: string;
  population: number;
  latitude: number;
  longitude: number;
}

const CitySchema = new Schema<ICity>(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    population: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const City = model<ICity>("cities", CitySchema);
