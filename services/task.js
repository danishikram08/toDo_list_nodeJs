module.exports = db => {

    return {
        create(req) {
            return db.Task.create(req.body)
                .then(Task => {
                    const {
                        taskItem
                    } = req.body;
                    taskItem.forEach(taskItems => {
                        taskItems.TaskId = Task.id
                    })
                    db.taskItem.bulkCreate(taskItem, {
                            returning: true
                        }).then(taskItem => {
                            return {
                                status: 201,
                                data: taskItem
                            }
                        })
                        .catch(error => {
                            return {
                                status: 500,
                                error: error
                            }
                        })
                    return {
                        status: 201,
                        data: Task
                    }
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    }
                })

        },
        findAll(req) {
            return db.Task.findAll({
                    include: {
                        model: db.taskItem
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })
                .then(Task => {
                    return {
                        status: 201,
                        data: Task
                    }
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    }
                })
        },
        findById(req) {
            return db.Task.findByPk(req.params.id, {
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })
                .then(Task => {
                    return {
                        status: 201,
                        data: Task
                    }
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    }
                })
        },
        update(req) {
            const id = req.params.id;
            return db.Task.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(Task => {
                    return {
                        status: 201,
                        data: Task
                    };
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    };
                });
        },
        delete(req) {
            let id = req.params.id;
            return db.Task.destroy({
                    where: {
                        id: id
                    }
                })
                .then(Task => {
                    return {
                        status: 201,
                        data: Task
                    };
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    };
                });
        },
        updatetaskItems(req) {
            const sid = req.params.id;
            return db.sequelize.transaction(async transaction => {
                    await db.Task.update(req.body, {
                        where: {
                            id: req.params.id
                        }
                    }, {
                        transaction: transaction
                    })

                    const {
                        taskItems
                    } = req.body;
                    for (let taskItem of taskItems) {
                        if (taskItem.id) {

                            await db.taskItem.update(taskItem, {
                                where: {
                                    id: taskItem.id
                                }
                            }, {
                                transaction: transaction
                            })
                        } else {
                            taskItem.TaskId = sid
                            await db.taskItem.create(taskItem, {
                                transaction: transaction
                            });
                        }
                    }
                    return true;
                })
                .then(transaction => {
                    return {
                        status: 201,
                        data: transaction
                    }
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    }
                })
        }
    }
}