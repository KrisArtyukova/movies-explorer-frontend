import React from 'react';
import './AboutProject.css';
import BlockTitle from '../BlockTitle/BlockTitle';

function AboutProject() {
  return (
    <main>
      <section className="project">
        <div className="project__container">
          <BlockTitle title="Технологии" />
          <h3 className="project__title">7 технологий</h3>
          <p className="project__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="techs">
            <li className="techs__name">HTML</li>
            <li className="techs__name">CSS</li>
            <li className="techs__name">JS</li>
            <li className="techs__name">React</li>
            <li className="techs__name">Git</li>
            <li className="techs__name">Express.js</li>
            <li className="techs__name">mongoDB</li>
          </ul>
        </div>
      </section>
    </main>

  );
}

export default AboutProject;
