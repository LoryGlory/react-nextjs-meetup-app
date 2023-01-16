import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://images.unsplash.com/photo-1503609796759-4cfd4d5a0b9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80',
    address: 'Address xxx in San Francisco',
    description: 'This is a meetup in San Francisco!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    address: 'Address xxx in Los Angeles',
    description: 'This is a meetup in Los Angeles!'
  }
];

function HomePage(props) {
  return (
      <MeetupList meetups={props.meetups}/>
  )
};

//getStaticProps will return the data on the first render cycle; data-fetching for pre-rendering
export async function getStaticProps() {
  //fetch data from an api for example
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  };
}

export default HomePage;