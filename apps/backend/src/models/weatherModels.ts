import { Document, model, Schema } from "mongoose";

interface IWeather extends Document {
  cityId: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherDescription: string;
  timestamp: Date;
}

const WeatherSchema = new Schema<IWeather>(
  {
    cityId: { type: String, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    windSpeed: { type: Number, required: true },
    weatherDescription: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const Weather = model<IWeather>("weathers", WeatherSchema);
