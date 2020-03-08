const productsRoutes = require('./products-routes');
const usersRoutes = require('./user-routes');

module.exports = app => {
  // console.log(app);

  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/products', productsRoutes);
};
