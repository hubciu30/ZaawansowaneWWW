module.exports = (app) =>
{
    app.get('/signup', (req, res)=>{
        res.send("Signup")
    })
}