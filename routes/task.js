module.exports = (app, services) => {
    const router = app.Router();
    const {
        Task
    } = services;
    router.post('/', async (req, res) => {
        const result = await Task.create(req);
        return res.status(result.status).json(result);
    });
    router.get('/findAll', async (req, res) => {
        const result = await Task.findAll(req);
        return res.status(result.status).json(result);
    })
    router.get('/findById/:id', async (req, res) => {
        const result = await Task.findById(req);
        return res.status(result.status).json(result);
    })
    router.put('/update/:id', async (req, res) => {
        let result = await Task.update(req);
        return res.status(result.status).json(result);
    });
    router.delete('/delete/:id', async (req, res) => {
        let result = await Task.delete(req);
        return res.status(result.status).json(result);
    });
    router.put('/updatetaskItems/:id', async (req, res) => {
        let result = await Task.updatetaskItems(req);
        return res.status(result.status).json(result);
    });
    return router;
}