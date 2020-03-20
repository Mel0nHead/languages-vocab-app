import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as logger from "morgan";
import { createConnection } from "typeorm";
import { Word } from "./entity/Word";

createConnection()
  .then(connection => {
    const wordRepository = connection.getRepository(Word);
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
    app.get("/api/all-words", async function(req: Request, res: Response) {
      const words = await wordRepository.find();
      return res.send(words); // might be res.json(words)
    });

    // add a new word
    app.post("/api/add-word", async function(req: Request, res: Response) {
      const word = wordRepository.create(req.body);
      const results = await wordRepository.save(word);
      return res.send(results);
    });

    // delete a word
    app.post("/api/delete-word", async function(req: Request, res: Response) {
      const results = await wordRepository.delete(req.body.id);
      return res.send(results);
    });

    // get all words that match the specified box
    app.get("/api/review-words", function(req: Request, res: Response) {}); // TODO

    // update an existing word
    app.post("/api/update-word", async function(req: Request, res: Response) {
      let wordToUpdate = await wordRepository.findOne({ id: req.body.id });
      wordToUpdate.box = req.body.box;
      wordToUpdate.dateLastSeen = req.body.dateLastSeen;
      await wordRepository.save(wordToUpdate);
    });

    // start express server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(error => console.log(error));
