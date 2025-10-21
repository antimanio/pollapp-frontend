import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CreatePoll from './components/createPoll.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CreatePoll />
  </StrictMode>,
)
