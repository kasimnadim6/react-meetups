import classes from './MeetupDetails.module.scss';

const MeetupDetails = ({ selectedMeetup }) => {
  return (
    <section className={classes.selectedMeetup}>
      <img src={selectedMeetup.image} alt={selectedMeetup.title} />
      <h1>{selectedMeetup.title}</h1>
      <address>{selectedMeetup.address}</address>
      <p>{selectedMeetup.description}</p>
    </section>
  );
};

export default MeetupDetails;
