import type { Request, Response } from "express";
import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler";
import { CityService } from "../services/city.service";
import { successResponse } from "../utils/api-response";

// type City = {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
//   elevation: number;
//   feature_code: string;
//   timezone: string;
//   country: string;
//   admin1?: string;
//   admin2?: string;
//   admin3?: string;
//   admin4?: string;
//   admin1_id?: number;
//   admin2_id?: number;
//   admin3_id?: number;
//   admin4_id?: number;
// };

const cityRouter = Router();

cityRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { search } = req.query;
    if (search) {
      const cities = await CityService.searchCities(search as string);
      successResponse({
        res,
        data: cities,
        statusCode: 200,
      });
      return;
    }
    const cities = await CityService.getAllCities();
    successResponse({
      res,
      data: cities,
      statusCode: 200,
    });
  }),
);
export { cityRouter };
