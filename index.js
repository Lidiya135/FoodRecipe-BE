const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const mainRouter = require('./src/router/index');
const { response } = require('./src/middleware/common');
const app = express();

app.use(express.json()); app.use(express.urlencoded({
  extended: true,
  })
 );
app.use(bodyParser.json());
// app.use(cors());
app.use(morgan("dev"));
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
// app.use(cors({credentials: true}))
const corsOptions = {
  origin: ["https://food-recipe-69hmohwjl-lidiya135.vercel.app", "http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
const port = process.env.PORT;

app.use('/', mainRouter);
app.use('/img', express.static('./upload'));

app.all('*', (req, res, next) => {
  response(res, 404, false, null, '404 Not Found');
});

app.get('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
