import { MantineProvider, Text } from '@mantine/core';
import { Layout } from './Layout';
import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { innerRoutes, outerRoutes } from './Routes';
import { Notifications } from '@mantine/notifications';

import { Loader } from '@mantine/core';
import Cookies from 'js-cookie'
import authservice from './Services/auth.service';

export default function App() {


  const isAuthenticated = async () => {
    try {
      await authservice.tokenAuth()
    }
    catch (e) {
      return false
    }
    return true

  }

  const loader = async () => {
    const valid = await isAuthenticated()
    if (!valid) {
      authservice.logout()
      return redirect("/login");
    }
    return null;
  };


  const routes = [...outerRoutes, {
    path: "/", element: <Layout />,
    loader: loader,
    children: [
      ...innerRoutes
    ]
  }
  ]
  const router = createBrowserRouter(routes)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{
        components: {
          Input: {
            // Subscribe to theme and component params
            styles: (theme) => ({
              input: {
                '&:disabled':
                {
                  color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                  opacity: 1
                },
              }
            }),
          },
        },
      }}
    >
      <Notifications />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </MantineProvider>
  );
}