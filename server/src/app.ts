import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as logger from "morgan";
import { createConnection } from "typeorm";

createConnection()
  .then(connection => {
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

    // get all words
    app.get("/api/all-words", function(req: Request, res: Response) {});

    // add a new word
    app.post("/api/add-word", function(req: Request, res: Response) {});

    // delete a word
    app.post("/api/delete-word", function(req: Request, res: Response) {});

    // get all words that match the specified box
    app.get("/api/review-words", function(req: Request, res: Response) {});

    // update an existing word
    app.post("/api/update-word", function(req: Request, res: Response) {});

    // start express server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(error => console.log(error));
