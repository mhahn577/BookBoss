import * as express from 'express';
import * as mongodb from 'mongodb';
import Database from '../db';
let router = express.Router();

router.post('/', (req, res) => {
  let booktoread = req.body;
  booktoread._id = new mongodb.ObjectID(req.body._id);
  Database.db.collection('bookstoread').save(req.body).then(() => {
    res.end();
  })
})

// GET single book
router.get('/:id', (req, res) => {
  let bookId = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('bookstoread').findOne({_id: bookId}).then((book)=> {
    res.json(book);
  });
});

router.get('/', (req, res) => {
  Database.db.collection('bookstoread').find().toArray().then((bookstoread) => {
    res.json(bookstoread);
  })
})

router.delete('/:id', (req, res) => {
  let booktoreadID = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('bookstoread').remove({_id: booktoreadID}).then(() => {
    res.end();
  })
})


export default router;
