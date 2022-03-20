import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta
          name="description"
          content="Browse a huge list of React meetups!"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://kasim:Jf0NigW9Gyr6Qzpd@cluster0.6k4zk.mongodb.net/meetup?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        const { title, image, address, description, _id } = meetup;
        return (meetup = {
          id: _id.toString(),
          title,
          image,
          address,
          description,
        });
      }),
    },
    revalidate: 1,
  };
}

export default HomePage;
