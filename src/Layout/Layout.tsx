import { useState } from 'react';
import {
  AppShell,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box
} from '@mantine/core';
import Nav from './Navbar';
import CustomHeader from './Header';
import { Outlet } from 'react-router-dom';

export default function AppShellDemo() {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Nav />
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
            <CustomHeader />
      }
    >
      <Box p={10}>
        <Outlet />
      </Box>
    </AppShell>
  );
} 
