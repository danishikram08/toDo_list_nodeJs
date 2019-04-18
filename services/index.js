const db = require('../model/index.js');
module.exports = {
    Task: require('./task.js')(db),
    taskItem: require('./taskItem')(db)
}