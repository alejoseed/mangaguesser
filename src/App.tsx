import './index.css'
import NavBar from './components/navBar'
import React from 'react';
import Body from './components/body'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

function App() {
  return (
    <>
      <NavBar />
      <Body />
    </>
  );
}

export default App;
