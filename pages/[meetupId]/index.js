// dynamic routing component for individual meetups
import Head from "next/head";
import {Fragment} from "react";
import {MongoClient, ObjectId} from "mongodb";
import MeetUpDetail from "../../components/meetups/MeetUpDetail";

function MeetupDetails(props) {
  return (
      <Fragment>
        {/* Head section to display meetup title as page title */}
        <Head>
          <title>{props.meetupData.title}</title>
          <meta
              name='description'
              content={props.meetupData.description}
          />
        </Head>
        {/* dynamic meetup detail props */}
        <MeetUpDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
      </Fragment>
  )
};

// define lists for static path rendering for meetups
export async function getStaticPaths() {
  const client = await MongoClient.connect(
      'mongodb+srv://laura:VS4u4uayit9gMe8L@cluster0.nf7log0.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: {meetupId: meetup._id.toString()},
    }))
  };
}

// render static props on server for meetup according to context object created in getStaticPaths
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
      'mongodb+srv://laura:VS4u4uayit9gMe8L@cluster0.nf7log0.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  }
}

export default MeetupDetails;