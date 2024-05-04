import {db} from './db.mjs'

//setup tables and whatnot
db.run(`CREATE TABLE users (
    username TEXT,
    password TEXT
)`);

db.run(`CREATE TABLE trips (
    start_date TEXT,
    end_date TEXT,
    location TEXT
)`);

db.close()