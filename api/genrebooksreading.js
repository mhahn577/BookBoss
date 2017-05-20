"use strict";
var express = require("express");
var db_1 = require("../db");
var router = express.Router();
router.get('/:genre', function (req, res) {
    var genre = req.params['genre'];
    console.log('this genre is: ', genre);
    db_1.default.db.collection('booksreading').find({ genre: genre }).toArray().then(function (booksreading) {
        res.json(booksreading);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
