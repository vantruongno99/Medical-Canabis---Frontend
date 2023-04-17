import { createStyles, Navbar, Group, Code, getStylesRef, rem, Text } from '@mantine/core';
import {
  IconBellRinging,
  IconReceipt2,
  IconHome,
  IconDevices,
  IconBook2
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";


const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 400,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));


const data = [
  { link: '', label: "Home", icon: IconHome, },
  { link: 'device', label: 'Devices', icon: IconDevices },
  { link: 'task', label: 'Tasks', icon: IconBook2 },
];


function Nav() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('/');

  const location = useLocation();

  const links = data.map((item) => (
    <>
      <Link to={item.link}
        className={cx(classes.link, { [classes.linkActive]: item.link === active })}
        onClick={(event) => {
          setActive(item.link);
        }}>
        <item.icon className={classes.linkIcon} size="1.5rem" stroke={1.5} />
        <Text fz="md">{item.label}</Text>
      </Link>
    </>


  ));

  useEffect(() => {
    if (location.pathname != "/") {
      const a = location.pathname.split('/')[1]
      setActive(a)
    }
  },
    [])

  // Same can be applied to Aside component with Aside.Section component
  return (
    <Navbar height='auto' p="xs" width={{
      sm: 200,
      lg: 250,
      base: 100,
    }}
    >

      <Navbar.Section grow>
        <nav>
          {links}
        </nav>

      </Navbar.Section>
    </Navbar>
  );
}

export default Nav