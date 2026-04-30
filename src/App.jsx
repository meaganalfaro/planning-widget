import { useLocalStorage } from './hooks/useLocalStorage';
import { themes } from './themes/themes';
import WindowChrome from './components/WindowChrome';

export default function App() {
  const [plan, setPlan] = useLocalStorage('plan', {}); // change back to null later, just for testing purposes
  const [apiKey, setApiKey] = useLocalStorage('apiKey', null);
  const [themeName, setThemeName] = useLocalStorage('theme', 'dark');

  const theme = themes[themeName];

  const themeVars = {
    '--primary': theme.primary,
    '--secondary': theme.secondary,
    '--accent': theme.accent,
    '--letters': theme.letters,
    '--title': theme.title,
    '--design': theme.design,
  };

  if (!plan) {
    return (
      <div style={themeVars}>
        {/* onboarding goes here later */}
        <p style={{ color: 'var(--letters)' }}>onboarding placeholder</p>
      </div>
    );
  }

  return (
    <div style={themeVars}>
      {/* planner widget goes here later */}
      <WindowChrome title="planner ⋅˚₊‧ ୨୧ ‧₊˚ ⋅"/>
      <p style={{ color: 'var(--letters)' }}>widget placeholder</p>
    </div>
  );
}