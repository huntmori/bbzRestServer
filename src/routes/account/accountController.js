var mysql = require('mysql');
var Pool = require("../../util/connectionPool");
var db = require("../../config/dbConfig");
var status = require("../../config/HttpStatus");
exports.create = function(request, response)
{
    var msg = '';

    var params = request.params;
    var pool = mysql.createPool(db);
    
    var user = {
        'account_name':request.body.id
        ,'password':request.body.password
    }

    var sql_password = "SELECT password(?)  AS  pass"
    var query = pool.query(sql_password, request.body.password, function(error, result){
        if(error){
            console.error(error);
            response.send(400, "error while sql");
        }
        console.log(query.sql);
        console.log(result);
        password_encoded = result[0].pass;
        user.password = password_encoded;
        console.log(password_encoded);
        console.log('user',user);
        
        var query2 = pool.query("INSERT INTO tb_user SET ?", user, function(error, result){
            if(error){
                console.error(error);
                response.status(status.BAD_REQUEST)
                        .send("error while sql");
            }
            console.log(query.sql);
            
            response.status(status.CREATED)
                    .send('success');
        }); 
    });
}

exports.login = function(request, response)
{
    var user = request.body;
    var pool = mysql.createPool(db);
    var sql = ` SELECT  *
                FROM    tb_user 
                WHERE   id = ? 
                AND     password = password(?); `;
    var filter = [user.account_name, user.password];
    sql = mysql.format(sql, filter);

    pool.query(sql, null, function(error, rows, fields)
    {
        
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
            pool.releaseConnection();
        }
        else
        {
            response.json({"mesage":"400 Bad Request"});
            pool.releaseConnection();
        }
    });
};