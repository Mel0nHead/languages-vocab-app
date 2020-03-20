import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as logger from "morgan";

// create and setup express app
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

// register routes
app.get("/api", (req, res) =>
  res.status(200).send({
    message: "Welcome"
  })
);

app.get("/api/all-words", function(req: Request, res: Response) {});
app.post("/api/add-word", function(req: Request, res: Response) {});
app.post("/api/delete-word", function(req: Request, res: Response) {});
app.get("/api/review-words", function(req: Request, res: Response) {});
app.post("/api/update-word", function(req: Request, res: Response) {});

// start express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
