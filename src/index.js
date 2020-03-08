const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routesV1 = require('./routes/v1');

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routesV1(app);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to mongodb');
    app.listen(port, () => {
      console.log(`runig on ${port}`);
    });
  })
  .catch(error => {
    console.log('mongodb error', error);
  });
