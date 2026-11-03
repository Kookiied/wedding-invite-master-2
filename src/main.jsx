import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { PatternProvider } from './context/PatternContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <PatternProvider>
        <App />
      </PatternProvider>
    </ThemeProvider>
  </StrictMode>,
)
