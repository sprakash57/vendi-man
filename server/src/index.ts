import express, { Request, Response } from "express";
import morgan from "morgan";
import config from "config";
import cors from "cors";
import routes from "./routes";

const PORT = config.get("port");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1", routes);

app.use("*", (_req: Request, res: Response) => {
  res.status(404).send("Resource not found");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
