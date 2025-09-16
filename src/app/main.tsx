import { createRoot } from 'react-dom/client'
import { MainPage } from '@pages'
import './styles/global.scss'

const root = document.getElementById('root');

if (root) createRoot(root).render(<MainPage />)
else throw new Error('Root is not defined')
