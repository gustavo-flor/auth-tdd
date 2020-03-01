const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const SessionController = require('./app/controllers/SessionController');
const DashboardController = require('./app/controllers/DashboardController');
 
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', DashboardController.show);

module.exports = routes;