'use client';

import {
  Box,
  Button,
  Burger,
  Drawer,
  Grid,
  Group,
  Text,
  useMantineTheme,
  Flex,
  Stack,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setAtTop(window.scrollY === 0);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkButton = (label: string, href: string) => (
    <Button
      key={href}
      variant="subtle"
      size="sm"
      color="white"
      component="a"
      href={href}
      fullWidth={isMobile}
    >
      {label}
    </Button>
  );

  const leftLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Noticias', href: '/noticias' },
    { label: 'Cursos', href: '/cursos' },
  ];

  const rightLinks = [
    { label: 'Person Vue', href: '/personvue' },
    { label: 'FAQ', href: '/faq' },
  ];

  const leftButtons = leftLinks.map(link => linkButton(link.label, link.href));
  const rightButtons = rightLinks.map(link => linkButton(link.label, link.href));

  return (
    <>
      <Box
        component="header"
        pos="fixed"
        top={0}
        w="100%"
        px="md"
        py="sm"
        style={{
          zIndex: 1000,
          transition: 'background-color 0.3s ease',
          backgroundColor: atTop ? 'transparent' : '#83013E',
        }}
      >
        <Grid align="center">
          {!isMobile && (
            <Grid.Col span={4}>
              <Flex justify="left">
                <Group gap="sm">{leftButtons}</Group>
              </Flex>
            </Grid.Col>
          )}

          <Grid.Col span={isMobile ? 6 : 4} ta="center">
            <Text fw={700} fz="lg" c="white">
              Academias TI
            </Text>
          </Grid.Col>

          <Grid.Col span={isMobile ? 6 : 4}>
            <Flex justify="flex-end">
              {isMobile ? (
                <Burger opened={opened} onClick={toggle} color="white" aria-label="Abrir menú" />
              ) : (
                <Group gap="sm">{rightButtons}</Group>
              )}
            </Flex>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Drawer de navegación móvil */}
      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        title="Menú"
        position="right"
        size="md"
        styles={{
          header: {
            color: 'white',
            backgroundColor: '#83013E',
          },
          body: {
            color: 'white',
            backgroundColor: '#83013E',
          },
        }}
      >
        <Box mb="md">
          {leftButtons}
        </Box>
        {rightButtons}
      </Drawer>
    </>
  );
}
