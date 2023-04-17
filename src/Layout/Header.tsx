import { useState } from 'react';
import {
    createStyles, Header, Autocomplete, Group, Burger, rem,
    Container,
    Avatar,
    UnstyledButton,
    Menu,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import {
    IconLogout,
} from '@tabler/icons-react';
import authservice from '../Services/auth.service';


const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        height: '100%',

    },

    inner: {
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    user: {
        color: theme.white,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                0.1
            ),
        },
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },
    userActive: {
        backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.1
        ),
    },


}));



export default function CustomHeader() {
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { classes, theme, cx } = useStyles();



    return (
        <Header height={60} className={classes.header} mb={120}>
            <div className={classes.inner}>
                <Group>
                    <MantineLogo size={28} inverted />
                </Group>

                <Group>
                    <Menu
                        width={150}
                        position="bottom-end"
                        transitionProps={{ transition: 'pop-top-right' }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                            >
                                <Group spacing={7}>
                                    <Avatar radius="xl" size={40} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={() =>authservice.logout()} color="red" icon={<IconLogout size="1rem" stroke={1.5} />}>
                                Log out
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </div>
        </Header>
    );
}