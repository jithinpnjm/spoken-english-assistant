import React from 'react';
import GlobalAITeacher from '@site/src/components/GlobalAITeacher';

// The Root component wraps the entire Docusaurus application.
// By placing the GlobalAITeacher here, it will be available on EVERY single page.
export default function Root({children}) {
  return (
    <>
      {children}
      <GlobalAITeacher />
    </>
  );
}
