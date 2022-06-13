// Define your endpoints here (this is your "controller file")


import express from 'express';
const itemRouter = express.Router();
import  createItem  from '../controllers/itemsController.js';


itemRouter.post('/',createItem);
// itemRouter.get('/:id', auth, getJedi);
// itemRouter.post('/',
// itemRouter.put('/:id', auth, replaceJedi)
// itemRouter.delete('/:id', auth, deleteJedi);

export default itemRouter;
