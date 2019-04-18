module.exports = (sequelize, datatype) => {
    const Task = sequelize.define('Task', {
        id: {
            type: datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        task: {
            type: datatype.STRING
        },
        status: {
            type: datatype.STRING
        }
    })
    Task.associate=(model)=>{
        Task.hasMany(model.taskItem);
    }
    return Task;
}