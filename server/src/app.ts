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
    app.get("/", (req, res) =>
      res.status(200).send({
        message: "Welcome to the Words API"
      })
    );

    // get all words
    app.get("/words/all", async (req: Request, res: Response) => {
      const words = await wordRepository.find();
      return res.send(words);
    });

    // add a new word
    app.post("/words", async (req: Request, res: Response) => {
      const word = wordRepository.create(req.body);
      const results = await wordRepository.save(word);
      return res.send(results);
    });

    // delete a word
    app.delete("/words/:id", async (req: Request, res: Response) => {
      const results = await wordRepository.delete(req.params.id);
      return res.send(results);
    });

    // get all words that match the specified box
    app.get("/words", async (req: Request, res: Response) => {
      // will receive request like: http://localhost:4000/words?boxes=1,3
      const boxesStr = req.query.boxes;
      const boxes = boxesStr.split(",").map(str => parseInt(str));
      const results = await wordRepository
        .createQueryBuilder("word")
        .where("word.box IN (:...boxes)", {
          boxes: boxes
        })
        .getMany();
      return res.send(results);
    });

    // update an existing word
    app.put("/words/:id", async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      let wordToUpdate = await wordRepository.findOne({ id: id });
      wordToUpdate.box = req.body.box;
      wordToUpdate.dateLastSeen = req.body.dateLastSeen;
      await wordRepository.save(wordToUpdate);
      res.send(wordToUpdate);
    });

    // start express server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(error => console.log(error));
