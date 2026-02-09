import { Request, Response, Router } from "express";
import { CityService } from "../services/city.service";
import { successResponse } from "../utils/api-response";

const cityRouter = Router();

cityRouter.get("/", async (req: Request, res: Response) => {
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
});
export { cityRouter };
