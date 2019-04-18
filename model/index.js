const env = require('../bin/env.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
})
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Task = require('../model/task.js')(sequelize, Sequelize);
db.taskItem = require('../model/taskItem.js')(sequelize, Sequelize);
if (db.Task.associate) {
    db.Task.associate(db);
}
if (db.taskItem.associate) {
    db.taskItem.associate(db);
}
module.exports = db;