const mysql = require('mysql');
var Pool = require("../../util/connectionPool");
const db = require("../../config/dbConfig");

module.exports = {
	
	encode_password : function(){
		return new Promise((resolve, reject)=>{
			const con = mysql.createConnection(db);
			let sql = "	SELECT	password(?)	AS pass	";
			
			
		});
	},
};