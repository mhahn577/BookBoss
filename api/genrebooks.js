"use strict";
var express = require("express");
var db_1 = require("../db");
var router = express.Router();
router.get('/:genre', function (req, res) {
    var genre = req.params['genre'];
    console.log('this genre is: ', genre);
    db_1.default.db.collection('booksread').find({ genre: genre }).toArray().then(function (booksread) {
        res.json(booksread);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
