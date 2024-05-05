import {db} from './db.mjs'

//setup tables and whatnot
db.run(`CREATE TABLE users (
    username TEXT,
    password TEXT
)`);

db.run(`CREATE TABLE trips (
    trip_id INTEGER,
    user TEXT,
    start_date TEXT,
    end_date TEXT,
    location TEXT,
    FOREIGN KEY user REFERENCES users (username)
)`);

db.run(`CREATE TABLE events (
    trip_id INTEGER,
    event_id INTEGER,
    date TEXT,
    desc TEXT,
    FOREIGN KEY trip_id REFERENCES trips (trip_id)
)`)

db.run()

db.close()