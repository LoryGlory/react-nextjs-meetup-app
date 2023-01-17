import {MongoClient} from "mongodb";
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

// GETSERVERSIDEPROPS EXAMPLE
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }


// getStaticProps will return the data on the first render cycle; data-fetching for pre-rendering
export async function getStaticProps() {
  //fetch data from an api for example
  const client = await MongoClient.connect(
      'mongodb+srv://laura:VS4u4uayit9gMe8L@cluster0.nf7log0.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 10
  };
}

export default HomePage;