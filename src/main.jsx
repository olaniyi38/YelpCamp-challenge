import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './css/tailwind.styles.css'
import './css/index.styles.scss'
import { Provider } from 'react-redux'
import { store } from './store/store'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <StrictMode>
        <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        </BrowserRouter>
    </StrictMode>
)