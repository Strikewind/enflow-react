import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { ThemeProvider } from './App.tsx'
import { DeviceContext, isMobileDevice } from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<DeviceContext.Provider value={{ isMobileDevice }}>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</DeviceContext.Provider>
	</StrictMode>,
)
