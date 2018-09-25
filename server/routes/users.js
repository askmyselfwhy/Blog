var db = require('../db');
const express = require('express');
var router = express.Router();
const crypto = require('crypto');
const uuid = require('uuid/v4');

router.post('/', function(req, res) {
	let { name, email, password1 } = req.body;
	let password = crypto.createHash('sha512').update(password1).digest('hex');
	let promise = new Promise((resolve, reject) => {
		db.query(`SELECT * FROM users WHERE email='${email}'`, function(err, result) {
			if (err) return reject(err);
			resolve(result.length);
		});
	});
	promise.then((length) => {
		if (length < 1) {
			let query = `INSERT INTO users(id, name, email, password, rights, image) VALUES ('${uuid()}','${name}','${email}','${password}', 0, 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1')`;
			db.query(query, function(err, result) {
				if (err) throw err;
				return res.send({ text: 'Your credentials has been added to db' });
			});
		} else {
			return res.send({ text: 'User with such email already exist' });
		}
	});
});
router.patch('/:id', function(req, res) {
	console.log('PATCH');
	let { id } = req.params;
	let { about, image, password1 } = req.body;
	let cryptedPassword = crypto.createHash('sha512').update(password1).digest('hex');
	let query = `UPDATE users SET \`password\`='${cryptedPassword}', \`image\`='${image}', \`about\`='${about}' WHERE id='${id}'`;
	db.query(query, function(err, result) {
		if (err) throw err;
		res.send('Changes applied');
	});
});
router.get('/:id', function(req, res) {
	let { id } = req.params;
	db.query(`SELECT * FROM users WHERE id='${id}'`, function(err, result) {
		if (err) return reject(err);
		res.json({
			...result[0]
		});
	});
});

module.exports = router;
