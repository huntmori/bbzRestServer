const mysql = require('mysql');
var Pool = require("../../util/connectionPool");
const db = require("../../config/dbConfig");
const status = require("../../config/HttpStatus");
const model = require("./accountModel");
exports.create = function(request, response)
{
    var msg = '';

    var params = request.params;
    var pool = mysql.createPool(db);
    
    var user = {
        'account_name':request.query.account_name,
        'password':request.query.password
    };

    var pass_query = model.encode_password(user.password)
        .then(function(resolvedData){
            console.log("resolvedData",resolvedData);
            user.password = resolvedData[0].pass;
        }).catch(function(err){

        });
    var create_query = model.createMember(user)
        .then(function(resolvedData){
            response.status(status.CREATED)
                    .send({
                        "result":true,
                        "result_msg":"account created"
                    });
        }).catch(function(err){
            response.status(status.BAD_REQUEST)
                    .send({
                        "result":false,
                        "result_msg":"error while sql",
                        "error":err
                    });
        });
    
    // var sql_password = "SELECT password(?)  AS  pass";  
    // var query = pool.query(sql_password, request.query.password, function(error, result){
    //     if(error){
    //         console.error(error);
    //         response.send(400, "error while sql");
    //     }
    //     console.log(query.sql);
    //     console.log(result);
    //     password_encoded = result[0].pass;
    //     user.password = password_encoded;
    //     console.log(password_encoded);
    //     console.log('user',user);
    //     let insert_sql = `  INSERT
    //                         INTO    tb_user 
    //                         SET     ?   `;
    //     var query2 = pool.query(insert_sql, user, function(error, result){
    //         if(error){
    //             console.error(error);
    //             response.status(status.BAD_REQUEST)
    //                     .send("error while sql");
    //         }
    //         else{
    //             console.log(query.sql);
            
    //             response.status(status.CREATED)
    //                     .send('success');
    //         }
    //     }); 
    //     console.log(query2);
    // });
    // console.log(query);
};

exports.login = function(request, response)
{
    //console.log(request);
    console.log("request.query",request.query);
    var user = request.query;
    console.log("user",user);
    var pool = mysql.createPool(db);
    var sql = ` SELECT  *
                FROM    tb_user 
                WHERE   account_name = ? 
                AND     password = password(?); `;
    var filter = [user.account_name, user.password];
    sql = mysql.format(sql, filter);
    
    var status_code;
    var data;
    pool.query(sql, function(error, rows, fields)
    {
        if(error)
        {
            console.log("BAD_REQUEST",status.BAD_REQUEST, "params", user);
            console.log( "sql", sql);
			console.log("ERROR", error);
            status_code = status.BAD_REQUEST;
            data = {    
                        message:"error occured while do something...",
                        error:error
                    };
        }
        else if(rows.length == 0)
        {
            //there is no account or password mismatched
            console.log("NO_CONTENT",status.NO_CONTENT, "params", user);
            console.log("sql", sql);

            status_code = status.NO_CONTENT;
            data = {
                message : "there is no account name or password mismatched."
            };
        }
        else
        {
            //login success
            console.log("OK",status.OK, "params", user);
            console.log("sql", sql);

            status_code = status.OK;
            data = {
                message:"login success"
            };
        }
        response.status(status_code).send(data);
    });
    
};


// sql execution test
exports.test = function(request, response)
{
    console.log("test");
    var pool = mysql.createPool(db);
     
    pool.query("SELECT now() as date", function(error, rows, fields)
    {
        //pool.releaseConnection();
        if(!error)
        {
            let result = {};
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
            response.status(status.BAD_REQUEST)
					.send({
						"mesage":"400 Bad Request"
					});
            pool.releaseConnection();
        }
    });
};

// raw-json test
exports.body_test = function(request, response)
{
	try{
		console.log("test");
		console.log("request",request.body);	
	}
	catch(ex){
		console.error(ex);
	}
	
	//console.log("response", response);
    
    //var pool = mysql.createPool(db);
     
    //console.log(request.body);
};