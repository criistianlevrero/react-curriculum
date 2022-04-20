import React from 'react';
import './style.scss';
import { Qualifications } from './components/qualifications/Qualifications';
import { Experience } from './components/experience/Experience';

export default function App() {
  const profileImage =
    'https://cristian-test-bucket.s3.us-east-2.amazonaws.com/profile-picture.png';
  return (
    <>
      <aside>
        <img src={profileImage} alt="una bella foto" />
        <cl-contactCard itemList="" actionsList=""></cl-contactCard>
      </aside>
      <main>
        <header>
          <h1>Cristian Levrero</h1>
          <p>Front end engineer, UI specialist</p>
        </header>
        <section>
          <h2>Profile</h2>
          <p>
            The developer has +15 years professional experience in front-end web
            technologies, featuring web standards and the best programming
            practices. His background includes solid Interface design,
            architecture, and modularization knowledge.
          </p>
          <p>
            The developer has +15 years professional experience in front-end web
            technologies, featuring web standards and the best programming
            practices. His background includes solid Interface design,
            architecture, and modularization knowledge.
          </p>
          <p>
            His work experience includes survey and functional analysis of
            requirements requested by different areas, planning and estimation
            of tasks to be performed, design and implementation, maintenance,
            user tracking, analytics, third-party solutions integration, first
            stage testing and validation and deployment of developed solutions.
          </p>
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
    </>
  );
}
