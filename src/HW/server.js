// Express boilerplate, hosting the `dist` file, connecting to the routes
const express =  require('express');
const  bodyParser =require( 'body-parser');
const itemRouter = require( './server/routes/api.js');
const  errorHandler = require('./server/middleware/error_handler.js');
const  {logger}  = require('./server/middleware/logger.js')
const  cors = require('cors')
const  port = 8080;
const app = express();


app.use([logger,cors(),express.json(),errorHandler]);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static( 'dist'));
app.use('/item', itemRouter);
process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Rejection", reason.message);
    throw reason
});

process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
    process.exit(1);
});



let msg = ` listening at port ${port}`

app.listen(port, () => { console.log( msg ) ; })






