import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetUpPage = () => {
  const router = useRouter();
  const onAddMeetupHandler = async (meetupData) => {
    const resp = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    console.log(data);
    router.push('/');
  };
  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="create a new amazing meetups!" />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </>
  );
};

export default NewMeetUpPage;
