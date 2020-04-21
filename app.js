
const   express = require('express');
const   app     = express();
const   http    = require('http').createServer(app);
const   port    = 8001;

const   accountRoute = require("./src/routes/account/accountIndex");
app.use (accountRoute);

http.listen(port, function()
{
    console.log(`http://localhost:${port}`);
});