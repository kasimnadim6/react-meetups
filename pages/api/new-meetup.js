import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(
      'mongodb+srv://kasim:Jf0NigW9Gyr6Qzpd@cluster0.6k4zk.mongodb.net/meetup?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.insertOne(data);
    client.close();
    res.status(201).json({ id: result.insertedId, message: 'Record inserted' });
  }
}

export default handler;
