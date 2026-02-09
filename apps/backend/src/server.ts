import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/error-handler";
import { cityRouter } from "./routes/city.routes";
import { weatherRouter } from "./routes/weather.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/v1/cities", cityRouter);
app.use("/v1/weather", weatherRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hallo backend!");
});

export { app };
