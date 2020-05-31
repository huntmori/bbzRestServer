const mysql = require('mysql');
var Pool = require("../../util/connectionPool");
const db = require("../../config/dbConfig");

module.exports = {
	
	encode_password : function(password){
		return new Promise((resolve, reject)=>{
			const con = mysql.createConnection(db);
			let sql = "	SELECT	password(?)	AS pass	";
			
			con.query(sql, password, (err, results, fields)=>{
				if(err){
					console.error("\terror:",err);
					reject(err);
				}
				else{
					console.log("\tsql success:", results);
					resolve(results);
				}
			});
			con.end();
		});
	},

	createMember : function(parameter){
		return new Promise((resolve, reject)=>{
			const con = mysql.createConnection(db);
			let sql = `	INSERT	INTO	tb_user
						SET		?	`;
			con.query(sql, parameter, (err, results, fields)=>{
				if(err){
					console.error("\terror:",err);
					reject(err);
				}
				else{
					console.log("\tsql success:", results);
					resolve(results);
				}
			});
		});
	},
};