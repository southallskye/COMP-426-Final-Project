import{db} from '../db.mjs'


import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes here
app.post('/api/signup', (req, res) => {
    // Handle signup logic here
    const { username, password } = req.body;

    //check if username already exists
    db.get('SELECT * FROM users WHERE username = ?', [username])
    .then((user) => {
        if(user) {
            //return error if user already exists
            res.status(400).json({error: 'User already exists'});
        } else {
            //add user to database
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password])
            .then(() => {
                res.send({ message: 'User created' });
            })
            .catch((err) => {
                res.status(500).json({error: 'error occured'});
            });
        }
    })
});

app.post('/api/login', (req, res) => {
    // Handle login logic here
    const { username, password } = req.body;

    //check if user exists
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
    .then((user) => {
        if(user) {
            res.send({ message: 'User logged in' });
        } else {
            res.status(400).json({error: 'User or Password does not match'});
        }
    })
    .catch((err) => {
        res.status(500).json({error: 'error occured'});
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});