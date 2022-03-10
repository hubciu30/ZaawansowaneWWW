module.exports = (app) =>
{
    app.get('/login', (req, res)=>{
        res.send("Login")
    })

    app.post('/login', (req, res)=>{
        res.sendStatus(200);
    });
}