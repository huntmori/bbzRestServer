var mysql = require('mysql');

exports.create = function(request, response)
{
    var msg = '';

    var connection = mysql.createConnection({
         host : 'localhost'
        ,port : 3307
        ,user : 'root'
        ,password : ''
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

            msg = 'rows:'+JSON.stringify(rows);
            console.log(msg);
            response.send(msg);
        }
    });

    response.send(msg);
}