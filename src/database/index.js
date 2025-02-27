import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
 
// Open an SQLite database connection
const dbPromise = open({
    filename: './src/database/db.sqlite',
    driver: sqlite3.Database
});
 
export default dbPromise;