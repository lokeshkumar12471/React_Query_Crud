import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


//create a queryClient
const queryclient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryclient}>
        <App />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
