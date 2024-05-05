import{db} from '../db.mjs'
import express from 'express';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }));

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
            req.session.username = user.username; // Store username in session
            res.send({ message: 'User logged in' });
        } else {
            res.status(400).json({error: 'User or Password does not match'});
        }
    })
    .catch((err) => {
        res.status(500).json({error: 'error occured'});
    });
});

app.post('/api/trip', (req, res) => {
    // Handle login logic here
    const { trip_id, start_date, end_date, location } = req.body;

    db.run('INSERT INTO trips (trip_id, start_date, end_date, location) VALUES (?, ?, ?, ?)', 
    [trip_id, start_date, end_date, location])
    .then(() => {
        res.send({ message: 'trip created' });
    })
    .catch((err) => {
        res.status(500).json({error: 'error occured'});
    });
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
    const { trip_id } = req.body;

    //check if user exists
    db.run('DELETE from trips WHERE trip_id = ?', trip_id)
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});