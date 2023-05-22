import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

import paper from './routes/paper';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello PaperBran' });
});

const connection = mysql.createConnection({
    host: 'db-mysql-sfo2-92289-do-user-8489321-0.b.db.ondigitalocean.com',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to DB!');
});

app.use('/paper', paper);


app.listen(8000, () => {
    console.log('PaperBrain Backend listening on port 8000!');
});

