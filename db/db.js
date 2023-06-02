const mysql = require('mysql');
const config = require('config');
const { connection } = require('mongoose');

//rutas db
const host = config.get('servidordb.host');
const user = config.get('servidordb.user');
const pass = config.get('servidordb.password');
const database = config.get('servidordb.database');

const pool = mysql.createPool({
    connectionLimit: 4,
    waitForConnections: true,
    queueLimit: 0,
    host: host,
    user: user,
    password: pass,
    database: database
})

pool.getConnection((err, connection) => {
    if(err){
        console.log("error al conectar en la base de datos");
    }else{
        console.log("se conecto a la base de datos");
    }
})

module.exports = pool;