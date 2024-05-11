const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://127.0.0.1:27017/library';

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to the MongoDB server
async function connectToMongoDB() {
    try {
        await client.connect();
        const db=client.db('library')
        const collection=db.collection('books')
        const cursor=collection.find({})
        await cursor.forEach(record=>{
            console.log(record)
        })
        const ackresult= await collection.insertOne({
         firstName: 'Arneeth',
         lastName: 'Laya',
        gender: 'male',
        email: 'arneeth.laya@abc.com',
        salary: 5000,
    department: { name: 'Developer' }
        })
        await client.close()
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Call the function to connect
connectToMongoDB();