var generic_pool = require('generic-pool');
var mysql = require('mysql');
var db = require('../config/dbConfig');

var pool = generic_pool.Pool({
    name : 'mysql'
    ,create : function(callback){
        var config = {
            host : db.host
            ,port : db.port
            ,user : db.user
            ,password : db.password
            ,database : db.database
        }

        var client = mysql.createConnection(config);

        client.connect(function(error){
            if(error){
                console.log(error);
            }
            callback(error, client);
        });
    }
    ,destroy: function(client){
        client.end();
    }
    ,min : 7
    ,max : 10
    ,idleTimeoutMillis : 300000
    ,log : true
});

process.on("exit", function(){
    pool.drain(function(){
        pool.destroyAllNow();
    });
})

module.exports = pool;