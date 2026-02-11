import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler";
import { WeatherService } from "../services/weather.service";
import { successResponse } from "../utils/api-response";

const weatherRouter = Router();

weatherRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { lat, lon } = req.query;
    const weather = await WeatherService.getWeather(
      lat as string,
      lon as string,
    );
    successResponse({
      res,
      data: weather,
      statusCode: 200,
    });
  }),
);

weatherRouter.get(
  "/history",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { city } = req.query;
    const weather = await WeatherService.getWeatherHistory(city as string);
    successResponse({
      res,
      data: weather,
      statusCode: 200,
    });
  }),
);

export { weatherRouter };
