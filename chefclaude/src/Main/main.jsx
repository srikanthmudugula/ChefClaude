import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './ChefClaude.css'
import App from './App.jsx'
import { IngredientsProvider } from '../QuestionProvider/QuestionP.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <IngredientsProvider>
    <App />
    </IngredientsProvider>
  </StrictMode>,

)
