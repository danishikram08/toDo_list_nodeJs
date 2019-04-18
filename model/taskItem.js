module.exports = (sequelize, datatype) => {
    const taskItem = sequelize.define('taskItem', {
        id: {
            type: datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        taskitem: {
            type: datatype.STRING
        },
        status: {
            type: datatype.STRING
        }
    })
    taskItem.associate = (model) => {
        taskItem.belongsTo(model.Task)
    }
    return taskItem;
}