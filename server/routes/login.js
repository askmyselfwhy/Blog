var db = require('../db');
const express = require('express');
var router = express.Router();
const crypto = require('crypto');

router.post('/', function(req, res) {
	let { email, password } = req.body;
	let cryptedPassword = crypto.createHash('sha512').update(password).digest('hex');
	let query = `SELECT id, name, rights from users WHERE email='${email}' AND password='${cryptedPassword}'`;
	db.query(query, function(err, result) {
		if (err) throw err;
		if (result.length > 0) {
			let obj = result[0];
			console.log(password);
			obj.password = password;
			res.json({ status: 200, data: { ...obj } });
		} else {
			res.json({ status: 404, text: 'Email or password is wrong!' });
		}
	});
});

module.exports = router;
