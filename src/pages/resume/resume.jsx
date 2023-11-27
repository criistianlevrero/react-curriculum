import { useState, useEffect } from "react";

import { SectionWithTitle } from '@components/section-with-title/section-with-title';
import { LoadingScreen } from '@components/loading-screen/loading-screen';
import MainWithAsideLayout from '@layouts/main-with-aside/main-with-aside';
import { ContentfulRichtext } from '@components/contentful-richtext/contentful-richtext';
import { ToastMessage } from '@components/toast-message/toast-message';
import { Button } from '@components/button/button';

import { SideInfirmation } from './components/side-infirmation/side-infirmation';
import { Qualifications } from './components/qualifications/qualifications'
import { WorkingExperience } from './components/working-experience/working-experience';
import { LiveBackground } from "./components/live-background/live-background";
import { ResumeHeader } from "./components/resume-header/resume-header";

import fetchData from '@services/api'

import styles from './resume.module.scss'

export const Resume = () => {

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

  return (
    <div className={styles.resumeContainer}>
      <LiveBackground></LiveBackground>
      <MainWithAsideLayout
        aside={
          <SideInfirmation profileImage={pageModel.personalData.profilePicture}
            mediaLinks={pageModel.personalData.mediaLinksCollection}></SideInfirmation>
        }

        main={
          <>
            <ResumeHeader name={pageModel.personalData.name} subheading={pageModel.personalData.subheadin}></ResumeHeader>
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
      <ToastMessage><Button iconName={"github"} href={"https://github.com/criistianlevrero/react-curriculum"} showLabel={true}>Check out the source code</Button></ToastMessage>
    </div>
  );
}
