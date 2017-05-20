import * as express from 'express';
import * as mongodb from 'mongodb';
import Database from '../db';
let router = express.Router();

router.post('/', (req, res) => {
  let bookreading = req.body;
  bookreading._id = new mongodb.ObjectID(req.body._id);
  Database.db.collection('booksreading').save(req.body).then(() => {
    res.end();
  })
})

// GET single book
router.get('/:id', (req, res) => {
  let bookId = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('booksreading').findOne({_id: bookId}).then((book)=> {
    res.json(book);
  });
});

router.get('/', (req, res) => {
  Database.db.collection('booksreading').find().toArray().then((booksreading) => {
    res.json(booksreading);
  })
})

router.delete('/:id', (req, res) => {
  let bookreadingID = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('booksreading').remove({_id: bookreadingID}).then(() => {
    res.end();
  })
})


export default router;
