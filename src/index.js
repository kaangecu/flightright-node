import express, { json } from 'express';
import fileupload from 'express-fileupload';
import cors from 'cors';
import visitsCsvController from './controller/VisitsCsvController';

const app = express();

app.use(
  fileupload({
    createParentPath: true,
  })
);

app.use(cors());

app.use(json());

const PORT = process.env.PORT || 5000;

app.post('/visits', async (req, res) => {
  try {
    if (!req.files) {
      res.status(400).send('No file uploaded');
    } else {
      const response = await visitsCsvController(req);

      res.status(200).send(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
