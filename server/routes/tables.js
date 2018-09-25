var db = require('../db');
const express = require('express');
var router = express.Router();

router.get('/get_all', function(req, res) {
	db.query(`SELECT table_name FROM information_schema.tables WHERE TABLE_SCHEMA='${db.config.database}'`, function(
		err,
		result
	) {
		if (err) throw err;
		res.send(result);
	});
});
router.get('/', function(req, res) {
	let { table_name, num } = req.query;
	db.query(`SELECT * FROM ${table_name} LIMIT ${num}`, function(err, result, fields) {
		if (err) throw err;
		res.json({
			fields: fields,
			data: result
		});
	});
});

module.exports = router;
