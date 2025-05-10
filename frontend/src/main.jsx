import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/store.js'
import './i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import filter from 'leo-profanity'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

filter.add(filter.getDictionary('ru'))
filter.add(filter.getDictionary('en'))

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <StrictMode>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </StrictMode>
    </ErrorBoundary>
  </RollbarProvider>,
)
