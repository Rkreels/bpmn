
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { VoiceProvider } from './contexts/VoiceContext'
import { VoiceTrainerProvider } from './contexts/VoiceTrainerContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <VoiceProvider>
        <VoiceTrainerProvider>
          <App />
        </VoiceTrainerProvider>
      </VoiceProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
