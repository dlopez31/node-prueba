const express = require('express');
cosnt { countries } = require('countries-list')
const { info, error } = require('./modules/my-log');

const app = express();

app.get('/', (request, response) => {
  response.send('HELLO');
});

app.get('/info', (request, response) => {
  response.send('info');
});

app.get('/country', (req, res) => {

});

app.get('*', (request, response) => {
  response.status(404).send('NO FOUND');
});

app.listen(4000, () => {
  console.log('runig on 4000');
});
