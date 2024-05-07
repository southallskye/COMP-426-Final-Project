import{db} from '../db.mjs'
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { getAllByPlaceholderText } from '@testing-library/react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     console.log('Root route is being accessed');
//     // res.send('Hello World');
//   });

// Define your routes here
app.post('/api/signup', (req, res) => {
    // Handle signup logic here
    const { username, password } = req.body;

    //check if username already exists
    db.get('SELECT * FROM users WHERE username = ?', [username])
    .then((user) => {
        if(user) {
            //return error if user already exists
            console.log("User already exists");
            res.status(400).json({error: 'User already exists'});
        } else {
            //add user to database
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password])
            .then(() => {
                console.log("User created");
                res.send({ message: 'User created' });
            })
            .catch((err) => {
                console.error("Error occurred during signup:", err);
                res.status(500).json({error: 'error occurred'});
            });
        }
    })
    .catch((err) => {
        console.error("Error occurred during signup:", err);
        res.status(500).json({error: 'error occurred'});
    });
});

app.post('/api/login', (req, res) => {
    // Handle login logic here
    const { username, password } = req.body;

    //check if user exists
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
    .then((user) => {
        if(user) {
            req.session.username = user.username; // Store username in session
            console.log("User logged in");
            res.send({ message: 'User logged in' });
        } else {
            console.log("User or Password does not match");
            res.status(400).json({error: 'User or Password does not match'});
        }
    })
    .catch((err) => {
        console.error("Error occurred during login:", err);
        res.status(500).json({error: 'error occurred'});
    });
});

app.post('/api/trip', (req, res) => {
    // Handle login logic here
    const { id, tripStart, tripEnd, tripData } = req.body;
    console.log(id);
    console.log(tripStart);
    console.log(tripEnd);
    console.log(tripData);
    console.log(req.session.username);

    db.run('INSERT INTO trips VALUES (?, ?, ?, ?, ?)', [id, 'user1', tripStart, tripEnd, tripData])
    .then(() => {
        console.log("trip created");
        res.send({ message: 'Trip created' });
    })
    .catch((err) => {
        console.error("Error occurred during trip creation:", err);
        res.status(500).json({error: 'error occurred'});
    });
});

app.get('/api/trip', async (req, res) => {
    // find tirps associated with 
    const { username } = req.body;

    // might want to change this to be user
    let gathered_trips = await db.all('SELECT * FROM trips WHERE username = ?', ['user1']); // all instead of get?
    console.log("Gathered trips: ?");
    console.log(gathered_trips);
    if (gathered_trips == undefined) {
        res.json([]);
    }
    console.log("The result of get 'user1' for trips");
    console.log(JSON.stringify(gathered_trips));

    res.json(JSON.stringify(gathered_trips));
});

app.put('/api/trip', async (req, res) => {
    // Handle login logic here
    const { trip_id, start_date, end_date } = req.body;

    /*
    let db_result = await db.get('select * from trips where id = trip_id', trip_id);

    
    if (!db_result) { // correct implementation?
        res.status(500).json({error: 'trip not found'});
    } else {
        await db.run(`update ingredients set start_date = ?, end_date = ? where id = ?`, 
        [start_trip, end_date, trip_id]);
    }*/

    db.get('SELECT * from trips WHERE id = trip_id', trip_id)
    .then(async (trip) => {
        if(user) {
            await db.run(`update ingredients set start_date = ?, end_date = ? where id = ?`, 
            [start_trip, end_date, trip_id]);
        } else {
            res.status(400).json({error: 'User or Password does not match'});
        }
    })
    .catch((err) => {
        res.status(500).json({error: 'error occured'});
    });
});

app.delete('/api/trip', (req, res) => {
    // Handle login logic here
    const { id } = req.body;
    console.log(id);

    //check if user exists
    db.run('DELETE from trips WHERE trip_id = ?', id)
    .then(() => {
        res.send({ message: 'trip sucessfully deleted' });
    })
    .catch((err) => {
        res.status(500).json({error: 'error occured'});
    });
});

app.post('/api/event', (req, res) => {
    // Handle login logic here
    const { trip_id, event_id, date, desc } = req.body;

    //check if user exists
    db.get('INSERT INTO events (trip_id, event_id, date, desc) VALUES (?, ?, ?, ?)', 
            [trip_id, event_id, date, desc])
    .then(() => {
        res.send({ message: 'trip sucessfully deleted' });
    })
    .catch((err) => {
        res.status(500).json({error: 'error occured'});
    });
});

app.delete('/api/event', (req, res) => {
    // Handle login logic here
    const { event_id } = req.body;

    //check if user exists
    db.get('DELETE from events WHERE event_id = ?', event_id)
    .then(() => {
        res.send({ message: 'event sucessfully deleted' });
    })
    .catch((err) => {
        res.status(500).json({error: 'error occured'});
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    server.emit('ready');
});


// app.listen(3333, () => {
//     console.log(`Server is running on port ${port}`);
//     server.emit('ready');
// });