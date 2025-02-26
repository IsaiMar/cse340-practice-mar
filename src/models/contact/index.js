// import dbPromise from '../../database/index.js';


const storeUserMessage = async (name, email, message) => {
    // const db = await dbPromise;
    // const query = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    // return await db.run(query, [name, email, message]);
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
};

export { storeUserMessage };