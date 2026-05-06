import { useLocalStorage } from './hooks/useLocalStorage';
import { themes } from './themes/themes';
import WindowChrome from './components/WindowChrome';
import TabBar from './components/TabBar';
import { useState } from 'react';
import PhasesTab from './components/tabs/PhasesTab';

export default function App() {
  const [plan, setPlan] = useLocalStorage('plan', {}); // change back to null later, just for testing purposes
  const [apiKey, setApiKey] = useLocalStorage('apiKey', null);
  const [themeName, setThemeName] = useLocalStorage('theme', 'cool');
  const [activeTab, setActiveTab] = useState('phases');
  const theme = themes[themeName];

  const themeVars = {
    '--primary': theme.primary,
    '--secondary': theme.secondary,
    '--accent': theme.accent,
    '--letters': theme.letters,
    '--title': theme.title,
    '--design': theme.design,
  };

  const tabComponents = {
    phases: <PhasesTab />,
    buckets: <p style={{ color: 'var(--letters)' }}>buckets coming soon</p>,
    week: <p style={{ color: 'var(--letters)' }}>week coming soon</p>,
    calendar: <p style={{ color: 'var(--letters)' }}>calendar coming soon</p>,
  };

  if (!plan) {
    return (
      <div style={{...themeVars, background: 'var(--primary)', minHeight: '100vh'}}>
        {/* onboarding goes here later */}
        <p style={{ color: 'var(--letters)' }}>onboarding placeholder</p>
      </div>
    );
  }

  return (
    <div style={{
      ...themeVars,
      background: 'var(--primary)',
      minHeight: '100vh',
      backgroundImage: `radial-gradient(circle, var(--design) 1.5px, transparent 1.5px)`,
      backgroundSize: '35px 35px',
      borderRadius: '30px 30x 0 0'
  }}>
      {/* planner widget goes here later */}
      <WindowChrome title="planner ⋅˚₊‧ ୨୧ ‧₊˚ ⋅"/>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab}/>
      {tabComponents[activeTab]}
    </div>
  );
}