const routes = {}
module.exports = (app) => {
    const services = require('../services/index.js');
    routes.tasks = require('./task.js')(app, services);
    routes.taskItems = require('./taskItem.js')(app, services);
    return routes;
}