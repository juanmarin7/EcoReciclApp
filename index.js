const mysql = require('mysql');
const express = require('express');
const config = require('config');

//mysql
const conn = require('./db/db.js');

//puerto
const puerto = config.get('servidor.puerto');
const PORT = process.env.PORT || puerto;

//app
const app = express();

//respuestas del servidor
let respuesta = {
  error: false,
  codigo: 0,
  mensaje: '',
  parametro: '',
}
let _404 = {
  codigo: respuesta.codigo = 404,
  error: respuesta.error = true,
  mensaje: respuesta.mensaje = "no se encontro recidio en base de datos"
}


app.use(express.static('public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
  }
}));

app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// index page
app.get('/', function (req, res) {

  res.render('pages/seleccion', {
    mascots: "mascots",
    tagline: "ay ama"});
});
app.get('/residuos', function (req, res) {
  res.render('pages/residuos', {
    mascots: "mascots",
    tagline: "ay ama"
  });
});

app.get('/registro', function (req, res) {

  res.render('pages/signup', {
    mascots: "mascots",
    tagline: "ay ama"
  });
});

app.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  
  conn.getConnection(() => {
    conn.query('SELECT NOMBRE FROM usuarios WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        console.error('Error al realizar la consulta: ', error);
        res.status(500).send('Error al obtener el usuario.');
      } else {
        if (results.length > 0) {
          const usuario = results[0];
          res.send(usuario);
          console.log(usuario);
        } else {
          res.status(404).send('Usuario no encontrado.');
        }
      }
    });
  });  
});

app.get('/residuo/:tipo_residuo', function (req, res) {

  conn.getConnection(() =>{

    var tipo_residuo = req.params.tipo_residuo;
    var query = "SELECT GROUP_CONCAT(entidades_recolectoras.direccion SEPARATOR ', ') AS direcciones " +
      "FROM residuos " +
      "JOIN entidades_recolectoras ON residuos.id_entidad = entidades_recolectoras.id " +
      "WHERE residuos.tipo_residuo = '"+tipo_residuo+"'";
    
    conn.query(query, (err, result) => {
      if(err){
        let respuestaServidor = {
          codigo: respuesta.codigo = 404,
          error: respuesta.error = err,
          mensaje: respuesta.mensaje = 'residuo no encontrado o no esta en base de datos'
        }
        res.send(respuestaServidor);
      }else{
        let respuestaServidor = {
          codigo: respuesta.codigo = 200,
          error: respuesta.error = false,
          mensaje: respuesta.mensaje = result
        }
        if(respuestaServidor.mensaje[0].direcciones == null){
          res.send(_404);
        }else{
          res.render('pages/mapa', {mapa: respuestaServidor.mensaje[0].direcciones})
        }
        
      }
    })
  });
});

app.listen(PORT, () => {
  console.log(`se conecto al: http://localhost:${PORT}`);
})
