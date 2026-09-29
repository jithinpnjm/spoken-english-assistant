import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          The Intelligent Language Portal
        </Heading>
        <p className="hero__subtitle">Master German (A1-C2) and spoken English (A1-C1) through structured theory and AI-driven practice.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/german/a1/vol1-foundations/alphabet-pronunciation">
            Start German A1 🇩🇪
          </Link>
          <Link
            className="button button--secondary button--lg"
            style={{marginLeft: '10px'}}
            to="/docs/english/overview">
            Start English (A1-C1) 🇬🇧
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <div className="container" style={{padding: '2rem 0', textAlign: 'center'}}>
          <h2>Why this approach?</h2>
          <p>
            Language learning requires <strong>structure</strong>. You can't just chat with an AI and hope to learn grammar.
            This portal combines the strict, step-by-step curriculum of the Goethe-Institut with the interactive power of Gemini AI. 
            Read the theory, then immediately practice it with an AI tutor locked to that specific context.
          </p>
        </div>
      </main>
    </Layout>
  );
}
