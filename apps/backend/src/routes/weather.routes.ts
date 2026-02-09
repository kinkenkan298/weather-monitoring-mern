import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler";
import { weatherService } from "../services/weather.service";
import { successResponse } from "../utils/api-response";

const weatherRouter = Router();

weatherRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { latitude, longitude } = req.query;
    const weather = await weatherService.getWeather(
      latitude as string,
      longitude as string,
    );
    successResponse({
      res,
      data: weather,
      statusCode: 200,
    });
  }),
);

export { weatherRouter };
