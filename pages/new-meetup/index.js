// new-meetup subpage / containing form to add new meetups and API to post data
import Head from "next/head";
import {Fragment} from "react";
import {useRouter} from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  // useRouter to direct users back to home after submitting (see below)
  const router = useRouter();

  // connect to MongoDB database in /api, post new meetup
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);

    // direct user back to home
    router.push('/');
  }

  return (
      <Fragment>
        <Head>
          <title>Add a New Meetup</title>
          <meta
              name='description'
              content='Add your own meetups and create amazing networking opportunities.'
          />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
      </Fragment>
  )
}

export default NewMeetupPage;