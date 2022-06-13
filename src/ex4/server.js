// Express boilerplate, hosting the `dist` file, connecting to the routes
//import ItemManager from "../services/itemManager.js";
import express from 'express';
import itemRouter from './server/routes/api.js';
const  port = 8080;
const app = express();


app.use([express.json()]);
app.use('/static',express.static( 'dist'));
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

async function start_server()
{
    try {
		const todoJsonFile = await fs.readFile("tasksDB.json");
		this.itemsArr = JSON.parse(todoJsonFile);
	  } catch (err) {
		await fs.writeFile("tasksDB.json", JSON.stringify(this.itemsArr));
	  }

		
	app.listen(port, () => { console.log( msg ) ; })
}

app.listen(port, () => { console.log( msg ) ; })
//start_server();






