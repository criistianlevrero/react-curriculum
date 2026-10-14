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
import { useParams } from 'react-router-dom';
import {CONTENT_QUERY, resolveResume} from '@services/api-data'

import styles from './resume.module.scss'

export const Resume = () => {

  const { slug } = useParams();
  const { loading, error, data } = useQuery(CONTENT_QUERY, {
    variables: { where: slug ? { slug } : { isDefault: true } },
  });

  if (loading) return <LoadingScreen></LoadingScreen>;

  if (error) return <p>Error : {error.message}</p>;

  const resume = data.resumeCollection.items[0];

  if (!resume) return <p>Resume not found</p>;

  const { personalData, qualifications, companies } = resolveResume(resume);

  return (
    <div className={styles.resumeContainer}>
      <LiveBackground></LiveBackground>
      <MainWithAsideLayout
        aside={
          <SideInfirmation profileImage={personalData.profilePicture}
            mediaLinks={personalData.mediaLinksCollection}></SideInfirmation>
        }

        main={
          <>
            <ResumeHeader name={personalData.name} subheading={personalData.subheading}></ResumeHeader>
            <SectionWithTitle title='Profile'>
              <ContentfulRichtext richtext={personalData.profile.json} />
            </SectionWithTitle>
            <SectionWithTitle title='Qualifications'>
              <Qualifications dataModel={qualifications} />
            </SectionWithTitle>
            <SectionWithTitle title='Work experience'>
              <WorkingExperience dataModel={companies} />
            </SectionWithTitle>
          </>
        }
      />
      <div className={styles.stickyButton}>
        <ToastMessage><Button iconName={"github"} href={"https://github.com/criistianlevrero/react-curriculum"} showLabel={true}>Check out the source code</Button></ToastMessage>
      </div>
    </div>
  );
}
