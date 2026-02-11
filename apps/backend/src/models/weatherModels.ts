import { Document, model, Schema, type ObjectId } from "mongoose";

export interface IWeather extends Document {
  cityId: ObjectId;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherDescription: string;
  timestamp: Date;
}

const WeatherSchema = new Schema<IWeather>(
  {
    cityId: {
      type: Schema.Types.ObjectId,

      ref: "cities",
      required: true,
    },
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
