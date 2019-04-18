const env = {
    database: 'todolist',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000
    }
}
module.exports = env;