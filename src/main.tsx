import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sciencegrade from './Component/Sciencegrade.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sciencegrade />
    { /*<App /> */}
  </StrictMode>
)
