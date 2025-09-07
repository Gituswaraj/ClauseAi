// src/router/index.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/layout/Layout.jsx';
import Home from '../pages/Home/Home.jsx';
import Pricing from '../pages/Pricing/Pricing.jsx';
import Demo from '../pages/Demo/Demo.jsx';
import FAQ from '../pages/FAQ/FAQ.jsx';
import About from '../pages/About/About.jsx';
import Contact from '../pages/Contact/Contact.jsx';

function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-semibold text-white">404</h1>
      <p className="mt-2 text-white/70">Page not found.</p>
      <a
        href="/"
        className="mt-6 inline-flex rounded-md bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        Go home
      </a>
    </section>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'demo', element: <Demo /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;