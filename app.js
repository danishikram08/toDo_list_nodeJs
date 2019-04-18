const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const routers = require('./routes')(express);
app.use('/tasks', routers.tasks);
app.use('/taskItems', routers.taskItems);
module.exports = app;