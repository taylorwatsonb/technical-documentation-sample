import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '🧠 Visual Problem Solver',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        I don't just write documentation—I create interactive experiences that make complex concepts accessible through ReactFlow visualizations, custom mind maps, and interactive examples that users can actually use.
      </>
    ),
  },
  {
    title: '🚀 Modern Technical Stack',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Built with cutting-edge tools that demonstrate real-world skills: Docusaurus + React + TypeScript, Git workflows and CI/CD integration, responsive design and accessibility best practices.
      </>
    ),
  },
  {
    title: '📊 User-Centered Approach',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Every piece of content is designed around actual user needs: Research-driven content strategy, progressive disclosure for different skill levels, multiple content formats for diverse audiences.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}