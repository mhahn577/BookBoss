import * as express from 'express';
import * as mongodb from 'mongodb';
import Database from '../db';
let router = express.Router();

router.post('/', (req, res) => {
  let reader = req.body;
  reader._id = new mongodb.ObjectID(req.body._id);
  Database.db.collection('readers').save(req.body).then(() => {
    res.end();
  })
})

// GET single book
router.get('/:id', (req, res) => {
  let readerId = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('readers').findOne({_id: readerId}).then((reader)=> {
    res.json(reader);
  });
});

router.get('/', (req, res) => {
  Database.db.collection('readers').find().toArray().then((readers) => {
    res.json(readers);
  })
})

router.delete('/:id', (req, res) => {
  let readerID = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('readers').remove({_id: readerID}).then(() => {
    res.end();
  })
})


export default router;
