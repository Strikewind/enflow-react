import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import HomePage from './pages/HomePage';
// import AccountSettingsPage from './pages/AccountSettingsPage';

type DeviceContextType = {
	isMobileDevice: boolean;
};

type Theme = 'light' | 'dark';

export const ThemeContext = createContext<{
	theme: Theme;
	toggleTheme: () => void;
}>({
	theme: 'light',
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>('light');

	// Load saved theme or use browser preference
	useEffect(() => {
		const saved = localStorage.getItem('theme');
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (saved === 'dark' || saved === 'light') {
			setTheme(saved as Theme);
			document.documentElement.classList.toggle('dark', saved === 'dark');
		} else {
			setTheme(systemPrefersDark ? 'dark' : 'light');
			document.documentElement.classList.toggle('dark', systemPrefersDark);
			}
  	}, []);

  	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
		localStorage.setItem('theme', newTheme);
		setTheme(newTheme);
  	};

  	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
  	);
};

export const DeviceContext = createContext<DeviceContextType>({ isMobileDevice: false });

export const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

function App() {
	
	const theme = localStorage.getItem('theme') || 'light';

	const favicon = document.querySelector("link[rel='icon']");

	if (theme === 'dark') {
		document.documentElement.classList.add('dark');
  	}

	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (favicon) {
		favicon.setAttribute('href', (prefersDark) ? '/src/assets/favicon_dark.png' : '/src/assets/favicon_light.png');
	}

  return (
		<Router basename="/enflow-react/">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				{/* <Route path="/login" element={<LoginPage />} /> */}
				<Route path="/projects" element={<ProjectsPage />} />
				<Route path="/:projectId/home" element={<HomePage />} />
				{/* <Route path="/account" element={<AccountSettingsPage />} /> */}
			</Routes>
		</Router>
	);
}

export default App
