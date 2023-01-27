const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to PaperBrain node backend' });
});

// connect to mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Could not connect to MongoDB', err);
    });

app.use('/api/users', userRoute);

app.listen(8800, () => {
    console.log('Legal AI Backend listening on Port 8800!');
});