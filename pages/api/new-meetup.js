// MongoDB connection component
import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

// function to connect to MongoDB
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
        'mongodb+srv://laura:VS4u4uayit9gMe8L@cluster0.nf7log0.mongodb.net/?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;