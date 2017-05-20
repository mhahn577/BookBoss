import * as express from 'express';
import * as mongodb from 'mongodb';
import Database from '../db';
let router = express.Router();

router.post('/', (req, res) => {
  let genre = req.body;
  genre._id = new mongodb.ObjectID(req.body._id);
  Database.db.collection('genres').save(req.body).then(() => {
    res.end();
  })
})

// GET single genre
router.get('/:id', (req, res) => {
  let genreId = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('genres').findOne({_id: genreId}).then((genre)=> {
    res.json(genre);
  });
});

router.get('/', (req, res) => {
  Database.db.collection('genres').find().toArray().then((genres) => {
    res.json(genres);
  })
})

router.delete('/:id', (req, res) => {
  let genreID = new mongodb.ObjectID(req.params['id']);
  Database.db.collection('genres').remove({_id: genreID}).then(() => {
    res.end();
  })
})


export default router;
