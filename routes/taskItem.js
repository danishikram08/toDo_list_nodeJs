module.exports = (app, services) => {
    const router = app.Router();
    const {
        taskItem
    } = services;
    router.post('/', async (req, res) => {
        const result = await taskItem.create(req);
        return res.status(result.status).json(result);
    })
    router.get('/findAll', async (req, res) => {
        const result = await taskItem.findAll(req);
        return res.status(result.status).json(result);
    })
    router.get('/findById/:id', async (req, res) => {
        const result = await taskItem.findById(req);
        return res.status(result.status).json(result);
    })
    router.put('/update/:id', async (req, res) => {
        let result = await taskItem.update(req);
        return res.status(result.status).json(result);
    });
    router.delete('/delete/:id', async (req, res) => {
        let result = await taskItem.delete(req);
        return res.status(result.status).json(result);
    });
    return router;
}