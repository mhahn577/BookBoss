import * as express from 'express';
import * as mongodb from 'mongodb';
import Database from '../db';
let router = express.Router();

router.post('/', (req, res) => {
  let bookread = req.body;
  bookread._id = new mongodb.ObjectID(req.body._id);
  Database.db.collection('booksread').save(req.body).then(() => {
    res.end();
  })
})

// GET single book
router.get('/:id', (req, res) => {
  let bookId = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('booksread').findOne({_id: bookId}).then((book)=> {
    res.json(book);
  });
});

router.get('/', (req, res) => {
  Database.db.collection('booksread').find().toArray().then((booksread) => {
    res.json(booksread);
  })
})

router.delete('/:id', (req, res) => {
  let bookreadID = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('booksread').remove({_id: bookreadID}).then(() => {
    res.end();
  })
})


export default router;
