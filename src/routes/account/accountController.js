var mysql = require('mysql');
var Pool = require("../../util/connectionPool");
var db = require("../../config/dbConfig");
exports.create = function(request, response)
{
    var msg = '';

    var params = request.params;
    console.log("params", params);
    console.log("query", request.query);
    console.log("body", request.body);

    console.log("test");
    var pool = mysql.createPool(db);
    
    var user = {
        'account_name':request.body.id
        ,'password':request.body.password
    }
    var query = pool.query("INSERT INTO tb_user SET ?", user, function(error, result){
        if(error){
            console.error(error);
            throw error;
        }
        console.log(query);
        response.send(200, 'success');
    });
}

exports.test = function(request, response)
{
    console.log("test");
    var pool = mysql.createPool(db);
    
    pool.query("SELECT now() as date", function(error, rows, fields)
    {
        //pool.releaseConnection();
        if(!error)
        {
            let result = new Object();
            result.data = Array();
            for(let i=0; i< rows.length; i++){
                console.log(i+":"+rows[i]);
                result.data.push(rows[i]);
            }
            console.log(rows);
            console.log(fields);
            console.log(rows.length);
            msg = JSON.stringify(rows);
            console.log(msg);
            response.json(result);
        }
        else
        {
            response.json({"mesage":"400 Bad Request"});
        }
    });
};