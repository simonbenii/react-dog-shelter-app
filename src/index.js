import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import "./App.css"

import Public from './components/Public';
import Details from './components/DogDetails';

// const router = HashRouter([
//   {
//     path: '/',
//     element: <Public />,
//   },
//   {
//     path: '/dogdetails/:id',
//     element: <Details />,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*     <RouterProvider router={router} /> */}
    <HashRouter>
      <Routes>
        <Route path='/' element={<Public />} />
        <Route path='/dogdetails/:id' element={<Details />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
