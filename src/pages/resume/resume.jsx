import React from 'react';
import {useState, useEffect} from "react";

import { Project } from './components/project/project';
import { Company } from './components/company/company';
import { Profile } from './components/profile/profile';
import { LoadingScreen } from './components/loading-screen/loading-screen';
import { Qualifications } from './components/qualifications/qualifications'

import { getMonthYear, getYear } from '../../services/helpers'
import fetchData from '../../services/api'

import MainWithAsideLayout from '../../layouts/main-with-aside/main-with-aside';

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
            <Profile profileImage={ profileImage }></Profile>
        }
        
        main={
            <>
                <header >
                    <h1>{pageModel.personalData.name}</h1>
                    <p>{pageModel.personalData.subheading}</p>
                </header>
                <section>
                    <h2>Profile</h2>
                    {pageModel.personalData.profile.json.content[0].content[0].value}
                </section>
                <Qualifications dataModel={pageModel.qualificationsCollection.items}></Qualifications>
                <section>
                    <h2>Work experience</h2>
                    {pageModel.companyCollection.items.map((company, index) => (
                    <Company companyName={company.companyName} from={getMonthYear(company.startDate)} to={getMonthYear(company.finishDate)} key={index}>
                        {company.linkedFrom.projectCollection.items.map((project, index) => (
                        <Project projectName={project.projectName} year={getYear(project.year)} key={index}>
                            {project.positionDescription?.json.content[0].content[0].value}
                        </Project>
                        ))}
                    </Company>
                    ))}
                    
                </section>
            </>
        }
    />
  );
}
