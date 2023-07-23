import { useState, useEffect } from "react";

import { SectionWithTitle } from '@components/section-with-title/section-with-title';
import { LoadingScreen } from '@components/loading-screen/loading-screen';
import MainWithAsideLayout from '@layouts/main-with-aside/main-with-aside';
import { ContentfulRichtext } from '@components/contentful-richtext/contentful-richtext';

import { SideInfirmation } from './components/side-infirmation/side-infirmation';
import { Qualifications } from './components/qualifications/qualifications'
import { WorkingExperience } from './components/working-experience/working-experience';

import fetchData from '@services/api'

import styles from './resume.module.scss'
import { LiveBackground } from "./components/live-background/live-background";

export default function Resume() {

  const [pageModel, setpageModel] = useState(null);

  useEffect(() => {
    fetchData(setpageModel)
  }, [setpageModel]);

  if (!pageModel) {
    //if (true) {
    return (
      <LoadingScreen></LoadingScreen>
    );
  }

  const profileImage =
    'https://cristian-test-bucket.s3.us-east-2.amazonaws.com/profile-picture.png';

  return (
    <>
      <LiveBackground></LiveBackground>
      <MainWithAsideLayout
        aside={
          <SideInfirmation profileImage={profileImage} mediaLinks={pageModel.personalData.mediaLinksCollection}></SideInfirmation>
        }
  
        main={
          <>
            <header className={styles.header} >
              <h1 className={styles.headerTitle}>{pageModel.personalData.name}</h1>
              <p className={styles.headerDescription}>{pageModel.personalData.subheading}</p>
            </header>
            <SectionWithTitle title='Profile'>
              <ContentfulRichtext richtext={pageModel.personalData.profile.json} />
            </SectionWithTitle>
            <SectionWithTitle title='Qualifications'>
              <Qualifications dataModel={pageModel.qualificationsCollection.items} />
            </SectionWithTitle>
            <SectionWithTitle title='Work experience'>
              <WorkingExperience dataModel={pageModel.companyCollection.items} />
            </SectionWithTitle>
          </>
        }
      />
    </>
  );
}
