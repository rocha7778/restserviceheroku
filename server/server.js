const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config/config')


app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())



app.get('/usuarios', function(req, res) {

    res.json('getUsuarios')

})


app.post('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    if (body.nombre == undefined || body.nombre == '') {

        res.status(400).json({
            ok: false,
            message: 'el nombre de la persona es requerido'
        })

    } else {
        res.json({
            operation: 'pos',
            id: id,
            url: req.originalUrl,
            body: body
        })

    }

})


app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    res.json({
        operation: 'put',
        id: id,
        url: req.originalUrl
    })

})


app.delete('/usuario', function(req, res) {

    res.json('delete')

})
app.listen(config.port, () => {
    console.log(`escuchando en el puerto ${config.port}`);
})