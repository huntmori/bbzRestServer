
const   express = require('express');
const   app     = express();
const   http    = require('http').createServer(app);
const   port    = 8080;
const fs = require("fs");
/*const moment = require('moment');
require('moment-timezone');*/
//app.use(express.static(__dirname+"/view"));
//moment.tz.setDefault('Asia/Seoul');
/*app.use(express.json());
app.use(express.urlencoded({extended:true}));*/
//const   dbConfig = require('./src/config/dbConfig');
const   accountRoute = require("./src/routes/account/accountIndex");


app.use (accountRoute);
app.use("/TemplateData", express.static(__dirname+"/TemplateData"));
app.use("/Build", express.static(__dirname+"/Build"));
app.get("/", function(request, response){
    var data = fs.readFileSync(__dirname+"/index.html",'utf-8');
    //console.log(data);
    const ip = request.headers['x-forwarded-for'] ||  request.connection.remoteAddress;
    //const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    //console.log("["+timestamp+"] access from : "+ip);
    response.end(data);
});


http.listen(port, function()
{
    console.log(`http://localhost:${port}`);
    //console.log(dbConfig);
});