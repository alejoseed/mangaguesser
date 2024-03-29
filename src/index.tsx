import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import PlayPage from './components/playPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import TestingPage from './components/testingPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/play',
    element: <PlayPage />,
    errorElement: <ErrorPage/>
  },
  {
    path: '/test',
    element: <TestingPage />,
    errorElement: <ErrorPage/>
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
      <RouterProvider router={router}/>
    {/* </React.StrictMode> */}
  </QueryClientProvider>

);


