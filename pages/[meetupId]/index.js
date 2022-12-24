import MeetUpDetail from "../../components/meetups/MeetUpDetail";

function MeetupDetails() {
  return (
      <MeetUpDetail
          image='https://images.unsplash.com/photo-1503609796759-4cfd4d5a0b9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80'
          title='First Meetup'
          address='Some Street 1, San Francisco'
          description='The meetup description'
      />
  )
};

export default MeetupDetails;