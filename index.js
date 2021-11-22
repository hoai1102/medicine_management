const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');

//CONNECT DB
db.connect();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');

app.use('/user', userRouter);
app.use('/', authRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
