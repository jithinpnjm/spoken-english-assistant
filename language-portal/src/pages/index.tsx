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
        <p className="hero__subtitle">Learn German from your first day in Germany to Goethe A1 (A2 in progress), and Professional English (B2-C1), through structured theory and AI-driven practice.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/german/course-guide/how-this-course-works">
            Start German A1 🇩🇪
          </Link>
          <Link
            className="button button--secondary button--lg"
            style={{marginLeft: '10px'}}
            to="/docs/english/grammar-refresh/advanced-tenses">
            Start English C1 🇬🇧
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
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
