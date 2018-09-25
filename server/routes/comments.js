var db = require('../db');
const express = require('express');
const uuid = require('uuid/v4');
var router = express.Router();

router.post('/', function(req, res) {
	let { post_id, user_id, comment } = req.body;
	let date = Date.now();
	let query = `INSERT INTO comments(id, id_post, id_user, comment, added) VALUES ('${uuid()}','${post_id}','${user_id}','${comment}','${date}')`;
	db.query(query, function(err, result) {
		if (err) throw err;
		res.send('Post has been added');
	});
});
router.get('/:id', function(req, res) {
	db.query(
		`SELECT comments.id as comment_id, comments.added, comments.comment, users.id as user_id, users.name, users.image FROM comments INNER JOIN users ON comments.id_user = users.id WHERE id_post = '${req
			.params.id}'`,
		function(err, result) {
			console.log(result);
			if (err) throw err;
			res.json({
				data: result
			});
		}
	);
});

router.delete('/:id', function(req, res) {
	let { id } = req.params;
	let query = `DELETE FROM comments WHERE comments.id = '${id}'`;
	db.query(query, function(err, result) {
		if (err) throw err;
		res.send('Comment has been deleted');
	});
});

module.exports = router;
