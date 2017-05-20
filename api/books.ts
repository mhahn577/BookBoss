import * as express from 'express';
import * as mongodb from 'mongodb';
import Database from '../db';
let router = express.Router();

router.post('/', (req, res) => {
  let book = req.body;
  book._id = new mongodb.ObjectID(req.body._id);
  Database.db.collection('books').save(req.body).then(() => {
    res.end();
  })
})

router.get('/', (req, res) => {
  Database.db.collection('books').find().toArray().then((books) => {
    res.json(books);
  })
})

router.delete('/:id', (req, res) => {
  let bookID = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('books').remove({_id: bookID}).then(() => {
    res.end();
  })
})


export default router;
