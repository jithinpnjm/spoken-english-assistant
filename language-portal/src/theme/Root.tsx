import React, {type ReactNode} from 'react';
import GlobalAITeacher from '@site/src/components/GlobalAITeacher';
import GermanSpeechButtons from '@site/src/components/GermanSpeechButtons';

// The Root component wraps the entire Docusaurus application.
// By placing the GlobalAITeacher here, it will be available on EVERY single page.
export default function Root({children}: {children: ReactNode}) {
  return (
    <>
      {children}
      <GermanSpeechButtons />
      <GlobalAITeacher />
    </>
  );
}
