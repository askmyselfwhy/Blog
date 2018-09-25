const express = require('express');
const cors = require('cors');
const config = require('./config');
const bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.json());

const users = require('./routes/users');
const comments = require('./routes/comments');
const posts = require('./routes/posts');
const tables = require('./routes/tables');
const login = require('./routes/login');

app.use('/login', login);
app.use('/users', users);
app.use('/comments', comments);
app.use('/posts', posts);
app.use('/tables', tables);

app.listen(config.port, (err) => {
	if (err) throw err;
	console.log(`Server has started on port ${config.port}`);
});
