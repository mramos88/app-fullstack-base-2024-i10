//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.get('/usuario/:id',function(req,res){
    console.log(req.params.id);
    if(req.params.id>0){
        res.status(200).send("{id:1,name:'mramos'}");
    }else{
        let mensaje = {mensaje:'El id no puede ser negativo'}
        res.status(403).send(JSON.stringify(mensaje));
    }
})
app.get('/usuario',function(req,res){

    res.send("[{id:1,name:'mramos'},{id:2,name:'fperez'}]")
});
//Insert
app.post('/usuario',function(req,res){
    console.log(req.body.id);
    if(req.body.id!=undefined && req.body.name!=undefined){
        //inset en la tabla
        res.send();
    }else{
        let mensaje = {mensaje:'El id o el name no estaban cargados'}
        res.status(400).send(JSON.stringify(mensaje));
    }
    
});



app.get('/devices/', function(req, res, next) {
    
    devices = [
        { 
            'id': 1, 
            'name': 'Lampara 1', 
            'description': 'Luz living', 
            'state': 0, 
            'type': 1, 
        },
        { 
            'id': 2, 
            'name': 'Ventilador 1', 
            'description': 'Ventilador Habitacion', 
            'state': 1, 
            'type': 2, 
        }, { 
            'id': 3, 
            'name': 'Luz Cocina 1', 
            'description': 'Cocina', 
            'state': 1, 
            'type': 2, 
        },
    ]
    res.send(JSON.stringify(devices)).status(200);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
