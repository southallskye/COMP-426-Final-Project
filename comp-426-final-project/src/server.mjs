import{db} from '../db.mjs'


import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes here
app.post('/api/signup', (req, res) => {
    // Handle signup logic here
    //console.log(req.body);

    const { username, password } = req.body;
    console.log(username, password)
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

    //console.log("Sign up route hit!");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});