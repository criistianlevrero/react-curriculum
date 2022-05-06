import React from 'react';
import {useState, useEffect} from "react";
import './style.scss';
import { Qualifications } from './components/qualifications/Qualifications';
import { Experience } from './components/experience/Experience';
import { Profile } from './components/profile/Profile';
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
}`;


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

        console.log(data.personalData);
        // rerender the entire component with new data
        setpageModel(data.personalData);
      });
  }, []);

  if (!pageModel) {
    return "Loading...";
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
          <h1 className={classNames([styles.header__title, 'typography-hero'])}>{pageModel.name}</h1>
          <p className={classNames([styles.header__description, 'typography-hero-secondary'])}>{pageModel.subheading}</p>
        </header>
        <section>
          <h2>Profile</h2>
          {pageModel.profile.json.content[0].content[0].value}
        </section>
        <section>
          <h2>Qualifications</h2>
          <dl>
            <Qualifications
              expPoints="5"
              name="HTML"
              description={['maquetado', 'accesibilidad', 'posicionamiento']}
            />
            <Qualifications
              expPoints="4"
              name="Angular"
              description={['maquetado', 'accesibilidad', 'posicionamiento']}
            />
            <Qualifications
              expPoints="3"
              name="Wordpress"
              description={['maquetado', 'accesibilidad', 'posicionamiento']}
            />
            <Qualifications
              expPoints="4"
              name="UX analysis"
              description={['maquetado', 'accesibilidad', 'posicionamiento']}
            />
          </dl>
        </section>
        <section>
          <h2>Work experience</h2>
          <Experience companyName="Naranja X (Jun 2020 - Present)" year="2020">
            <h4>UI / front-end engeneer.</h4>
            <p>The propose of this project was to bring an Angular UI library for all the Naranja web app ecosystem.</p>
            <p>Activities on the project included:</p>
            <ul>
              <li>Create high quality components and layouts</li>
              <li>Documentation maintenance</li>
              <li>Usability and accessibility research</li>
            </ul>
          </Experience>
        </section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
      </main>
    </div>
  );
}
