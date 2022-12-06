const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const mainRouter = require('./src/routes/index');

const app = express();

const recipe =  require('./src/routes/recipe');
const users =  require('./src/routes/users');

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


const port = 4000;

app.use('/recipe', recipe);
app.use('/users', users);
app.use('/', mainRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
