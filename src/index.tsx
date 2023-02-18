import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PlayGame from './components/play';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import DevPlay from './components/devPlay';
import PlayPage from './components/playPage';
import { QueryClient, QueryClientProvider } from 'react-query';

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
    path: '/devplay',
    element: <DevPlay />,
    errorElement: <ErrorPage/>
  },
  {
    path: '/playpage',
    element: <PlayPage />,
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


