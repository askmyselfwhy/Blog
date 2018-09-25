var db = require('../db');
const express = require('express');
var router = express.Router();
const uuid = require('uuid/v4');

router.get('/', function(req, res) {
	db.query('SELECT * FROM posts ORDER By added DESC', function(err, result) {
		if (err) throw err;
		res.json({
			data: result
		});
	});
});
router.get('/count', function(req, res) {
	db.query('SELECT COUNT(id) as count FROM posts', function(err, result) {
		if (err) throw err;
		res.json({ count: result[0].count });
	});
});
router.post('/add', function(req, res) {
	let { title, pre_text, text, image } = req.body;
	let date = Date.now();
	db.query(
		`INSERT INTO posts(id, title, pre_text, text, added, image) VALUES ('${uuid()}','${title}','${pre_text}','${text}',${date}, '${image}')`,
		function(err, result) {
			if (err) throw err;
			return res.send({ text: "Something went wrong! Can't add new post!" });
		}
	);
});
router.get('/new/:number', function(req, res) {
	let lim = req.params.number;
	db.query(`SELECT * FROM posts ORDER By added DESC LIMIT ${lim}`, function(err, result) {
		if (err) throw err;
		res.json({
			data: result
		});
	});
});
router.get('/:id', function(req, res) {
	db.query(`SELECT * FROM posts WHERE id = '${req.params.id}'`, function(err, result) {
		if (err) throw err;
		res.json({
			data: result
		});
	});
});
router.get('/:start/:end', function(req, res) {
	var query = 'SELECT * FROM posts ORDER BY added DESC LIMIT 6 OFFSET ' + req.params.start;
	db.query(query, function(err, result) {
		if (err) throw err;
		res.json({
			data: result
		});
	});
});

module.exports = router;
