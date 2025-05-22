
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { VoiceProvider } from './contexts/VoiceContext'
import { VoiceTrainerProvider } from './contexts/VoiceTrainerContext'

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
