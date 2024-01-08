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

import { useQuery } from '@apollo/client';
import {CONTENT_QUERY} from '@services/api-data'

import styles from './resume.module.scss'

export const Resume = () => {

  const { loading, error, data } = useQuery(CONTENT_QUERY);

  if (loading) return <LoadingScreen></LoadingScreen>;

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.resumeContainer}>
      <LiveBackground></LiveBackground>
      <MainWithAsideLayout
        aside={
          <SideInfirmation profileImage={data.personalData.profilePicture}
            mediaLinks={data.personalData.mediaLinksCollection}></SideInfirmation>
        }

        main={
          <>
            <ResumeHeader name={data.personalData.name} subheading={data.personalData.subheadin}></ResumeHeader>
            <SectionWithTitle title='Profile'>
              <ContentfulRichtext richtext={data.personalData.profile.json} />
            </SectionWithTitle>
            <SectionWithTitle title='Qualifications'>
              <Qualifications dataModel={data.qualificationsCollection.items} />
            </SectionWithTitle>
            <SectionWithTitle title='Work experience'>
              <WorkingExperience dataModel={data.companyCollection.items} />
            </SectionWithTitle>
          </>
        }
      />
      <ToastMessage><Button iconName={"github"} href={"https://github.com/criistianlevrero/react-curriculum"} showLabel={true}>Check out the source code</Button></ToastMessage>
    </div>
  );
}
