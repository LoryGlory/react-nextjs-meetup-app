import {MongoClient} from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

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