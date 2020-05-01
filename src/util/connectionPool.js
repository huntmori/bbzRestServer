var generic_pool = require('generic-pool');
var mysql = require('mysql');
var db = require('../config/dbConfig');

var dbConfig = {
     host:  db.host
    ,user:  db.user
    ,password: db.password
    ,port : db.port
    ,database: db.database
    ,connectionLimit : 50
}

var pool = mysql.createPool(dbConfig);
exports.pool = pool;