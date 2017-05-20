import * as express from 'express';
import * as mongodb from 'mongodb';
import Database from '../db';
let router = express.Router();

router.get('/:genre', (req, res) => {
  let genre = req.params['genre'];
  console.log('this genre is: ', genre);
  Database.db.collection('booksreading').find({ genre: genre } ).toArray().then((booksreading) => {
    res.json(booksreading);
  })
})

export default router;
