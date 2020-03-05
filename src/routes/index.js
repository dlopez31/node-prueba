const { countries, languages } = require('countries-list');

const routes = app => {
  app.get('/', (req, res) => {
    res.send('HELLO');
  });

  app.get('/info', (req, res) => {
    res.send('info');
  });

  app.get('/country', (req, res) => {
    res.json(countries[req.query.code]);
  });

  app.get('/languages/:lang', (req, res) => {
    const lang = languages[req.params.lang];
    if (lang) {
      res.json({ status: 'ok', data: lang });
    } else {
      res.status(404).json({
        status: 'NOT_FOUND',
        message: `languages ${req.params.lang} not found`
      });
    }
  });

  app.get('*', (req, res) => {
    res.status(404).send('NO FOUND');
  });
};

module.exports = routes;
