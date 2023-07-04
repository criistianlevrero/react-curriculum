import React from 'react';
import {useState, useEffect} from "react";
import './style.scss';

import { Qualifications } from './components/qualifications/qualifications';
import { Project } from './components/project/project';
import { Company } from './components/company/company';
import { Profile } from './components/profile/profile';
import { LoadingScreen } from './components/loading-screen/loading-screen'
import { getMonthYear, getYear } from './services/helpers'

import styles from './home.module.scss';
var classNames = require('classnames');

const query = `{
	personalData(id: "2wscO3EoyDEFK5PPX4R424") {
		name
		subheading
		email
		profile {
			json
		}
		location
	}
	qualificationsCollection(limit: 100){
		items{
			name
			description {
				json
			}
			rating
		}
	}
	companyCollection(limit:100 order:startDate_DESC){
		items{
			companyName
			startDate
			finishDate
			linkedFrom{
				projectCollection(limit:100){
					items{
						year
						projectName
						positionDescription{json}
					}
				}
			}
		}
	}
}
`;


export default function App() {

  const [pageModel, setpageModel] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/h2xj79xdxq5r/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer dtD_lAL0wrlAybfYaTIZ7Fk4yWwHufbpTWaibFd2VwE",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        console.log(data);
        // rerender the entire component with new data
        setpageModel(data);
      });
  }, []);

  if (!pageModel) {
  //if (true) {
    return (
      <LoadingScreen></LoadingScreen>
    );
  }

  const profileImage =
    'https://cristian-test-bucket.s3.us-east-2.amazonaws.com/profile-picture.png';
  
  return (
    <div className={classNames(styles.resumeLayout, 'typography-body01')}>
      <aside className={styles.resumeLayout__sideCard}>
        <Profile profileImage={ profileImage }></Profile>
      </aside>
      <main className={styles.resumeLayout__mainContent}>
        <header >
          <h1 className={classNames([styles.header__title, 'typography-hero'])}>{pageModel.personalData.name}</h1>
          <p className={classNames([styles.header__description, 'typography-hero-secondary'])}>{pageModel.personalData.subheading}</p>
        </header>
        <section>
          <h2>Profile</h2>
          {pageModel.personalData.profile.json.content[0].content[0].value}
        </section>
        <section>
          <h2>Qualifications</h2>
          <dl>
            {pageModel.qualificationsCollection.items.map(qualification => (
              <Qualifications
                expPoints={qualification.rating}
                name={qualification.name}
                description={['maquetado', 'accesibilidad', 'posicionamiento']}
              />
            ))}
          </dl>
        </section>
        <section>
          <h2>Work experience</h2>
          {pageModel.companyCollection.items.map(company => (
            <Company companyName={company.companyName} from={getMonthYear(company.startDate)} to={getMonthYear(company.finishDate)}>
              {company.linkedFrom.projectCollection.items.map(project => (
                <Project projectName={project.projectName} year={getYear(project.year)}>
                  {project.positionDescription?.json.content[0].content[0].value}
                </Project>
              ))}
            </Company>
          ))}
          
        </section>
      </main>
    </div>
  );
}
