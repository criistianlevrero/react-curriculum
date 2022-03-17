import React from 'react';
import './style.css';

export default function App() {
  const personalName = 'Cristian Levrero';
  const profileImage =
    'https://cristian-test-bucket.s3.us-east-2.amazonaws.com/profile-picture.png';
  return (
    <>
      <aside>
        <img src={profileImage} alt="una bella foto" />
        <contactCard itemList="" actionsList=""></contactCard>
      </aside>
      <h1> {personalName}</h1>
      <p>Start editing to see some magic happen :)</p>
    </>
  );
}
