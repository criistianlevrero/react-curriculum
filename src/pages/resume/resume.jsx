import React from 'react';
import { useState, useEffect } from "react";

import { SectionWithTitle } from '../../components/section-with-title/section-with-title';

import { Project } from './components/project/project';
import { Company } from './components/company/company';
import { ResumeAside } from './components/resume-aside/resume-aside';
import { LoadingScreen } from './components/loading-screen/loading-screen';
import { Qualifications } from './components/qualifications/qualifications'

import { getMonthYear, getYear } from '../../services/helpers'
import fetchData from '../../services/api'

import MainWithAsideLayout from '../../layouts/main-with-aside/main-with-aside';

import styles from './resume.module.scss'

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
    <MainWithAsideLayout
      aside={
        <ResumeAside profileImage={profileImage}></ResumeAside>
      }

      main={
        <div className={styles.mainContainer}>
          <header className={styles.header} >
            <h1 className={styles.headerTitle}>{pageModel.personalData.name}</h1>
            <p className={styles.headerDescription}>{pageModel.personalData.subheading}</p>
          </header>
          <SectionWithTitle title='Profile'>
            {pageModel.personalData.profile.json.content[0].content[0].value}
          </SectionWithTitle>
          <SectionWithTitle title='Qualifications'>
            <Qualifications dataModel={pageModel.qualificationsCollection.items}></Qualifications>
          </SectionWithTitle>
          <SectionWithTitle title='Work experience'>
            {pageModel.companyCollection.items.map((company, index) => (
              <Company companyName={company.companyName} from={getMonthYear(company.startDate)} to={getMonthYear(company.finishDate)} key={index}>
                {company.linkedFrom.projectCollection.items.map((project, index) => (
                  <Project projectName={project.projectName} year={getYear(project.year)} key={index}>
                    {project.positionDescription?.json.content[0].content[0].value}
                  </Project>
                ))}
              </Company>
            ))}
          </SectionWithTitle>
        </div>
      }
    />
  );
}
