module.exports = db => {
    return {
        create(req) {
            return db.sequelize.transaction(t => {

            return db.taskItem.create(req.body,{transaction:t})
                .then(taskItem => {
                    return {
                        status: 201,
                        data: taskItem
                    };
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    };
                })
            })
        },
        findAll(req) {
            return db.taskItem.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })
                .then(taskItem => {
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
        },
        findById(req) {
            return db.taskItem.findByPk(req.params.id, {
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })
                .then(taskItem => {
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
        },
        update(req) {
            const id = req.params.id;
            return db.taskItem.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(taskItem => {
                    return {
                        status: 201,
                        data: taskItem
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
        search(req) {}
    }
}