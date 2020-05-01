var mysql = require('mysql');
var Pool = require("../../util/connectionPool");
var db = require("../../config/dbConfig");
exports.create = function(request, response)
{
    var msg = '';

    var connection = mysql.createConnection({
         host : 'localhost'
        ,port : 3307
        ,user : 'root'
        ,password : '1234'
        ,database : 'bbz_db'
    });
    connection.connect();
    connection.query("SELECT now() ", function(error, rows, fields)
    {
        connection.end();
        if(!error)
        {
            console.log(rows);
            console.log(fields);
            console.log(rows.length);
            msg = JSON.stringify(rows);
            console.log(msg);
            response.json(msg);
        }
        else
        {
            response.json({"mesage":"400 Bad Request"});
        }
    });

    //response.send(msg);
}

exports.test = function(request, response)
{
    console.log("test");
    var pool = mysql.createPool(db);

    pool.query("SELECT now() ", function(error, rows, fields)
    {
        //pool.releaseConnection();
        if(!error)
        {
            console.log(rows);
            console.log(fields);
            console.log(rows.length);
            msg = JSON.stringify(rows);
            console.log(msg);
            response.json(msg);
        }
        else
        {
            response.json({"mesage":"400 Bad Request"});
        }
    });
};