import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetails from '../../components/meetups/MeetupDetails';

const MeetupDetailsPage = ({ selectedMeetup }) => {
  return (
    <>
      <Head>
        <title>{selectedMeetup.title}</title>
        <meta name="description" content={selectedMeetup.description} />
      </Head>
      <MeetupDetails selectedMeetup={selectedMeetup} />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://kasim:Jf0NigW9Gyr6Qzpd@cluster0.6k4zk.mongodb.net/meetup?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((m) => ({ params: { meetupId: m._id.toString() } })),
  };
}
export async function getStaticProps(context) {
  const id = context.params.meetupId;
  const client = await MongoClient.connect(
    'mongodb+srv://kasim:Jf0NigW9Gyr6Qzpd@cluster0.6k4zk.mongodb.net/meetup?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const selectedMeetup = await meetupCollection.findOne({ _id: ObjectId(id) });
  console.log(selectedMeetup);
  client.close();
  return {
    props: {
      selectedMeetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailsPage;
