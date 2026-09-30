import React, {useState} from 'react';
import Layout from '@theme/Layout';
import AIPracticeComponent from '../components/AIPracticeComponent';

type Scenario = {label: string; topic: string; prompt: string};

const GERMAN: Scenario[] = [
  {label: 'Free conversation (A1 tutor)', topic: 'Free A1 conversation', prompt: 'Act as a patient German teacher for a complete beginner living in Germany. Ask one simple question at a time about daily life, correct mistakes with the correction loop, and keep German short and simple.'},
  {label: 'Bakery / café', topic: 'Bakery and café', prompt: 'You are a bakery employee in Germany. The learner orders bread rolls, coffee and cake and pays. Keep your German very simple.'},
  {label: 'Supermarket', topic: 'Supermarket', prompt: 'You are a supermarket cashier. The learner asks where things are, buys groceries and pays.'},
  {label: 'Doctor reception (communication only)', topic: 'Doctor appointment', prompt: 'You are a doctor\'s receptionist. The learner books or moves an appointment and describes symptoms in simple words. Practise language only: never diagnose or give medical advice.'},
  {label: 'Telephone call', topic: 'Telephone call', prompt: 'You answer the phone at a company or office. The learner asks for a person, leaves a message and spells a name.'},
  {label: 'Public transport / tickets', topic: 'Public transport', prompt: 'You are a ticket-counter employee at a German train station. The learner buys a ticket and asks about platform and time.'},
  {label: 'Registering your address (language practice)', topic: 'Anmeldung at the Bürgeramt', prompt: 'You are a Bürgeramt clerk. Practise the language of registering an address: name, date of birth, address, documents. Do not state legal rules as fact; practise the words only.'},
  {label: 'Apartment viewing / landlord', topic: 'Apartment viewing', prompt: 'You are a landlord showing a flat. The learner asks about rooms, rent and utilities and says whether they like it.'},
  {label: 'Introducing yourself', topic: 'Introducing yourself', prompt: 'You meet the learner at a language course. Practise name, origin, job, family and hobbies with very simple questions.'},
];

export default function LiveCoach(): React.JSX.Element {
  const language = 'German' as const;
  const level = 'A1';
  const [index, setIndex] = useState(0);
  const list = GERMAN;
  const scenario = list[Math.min(index, list.length - 1)];
  return (
    <Layout title="Live Coach" description="Talk or type with an AI coach that corrects you and makes you repeat.">
      <main className="container margin-vert--lg" style={{maxWidth: 860}}>
        <h1>Live Coach</h1>
        <p>
          Practise your A1 German out loud or in writing. The coach speaks first, corrects your mistakes with a short reason, and asks you to repeat
          the corrected sentence before moving on. Start the voice session with the microphone button and allow microphone access.
        </p>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem'}}>
          <label>
            Scenario{' '}
            <select value={index} onChange={(e) => setIndex(Number(e.target.value))}>
              {list.map((item, i) => (
                <option key={item.label} value={i}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <AIPracticeComponent
          key={index}
          topic={scenario.topic}
          level={level}
          taskType="roleplay"
          prompt={scenario.prompt}
          language={language}
        />
      </main>
    </Layout>
  );
}
