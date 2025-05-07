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
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import "@mantine/core/styles.css"
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

  const leftButtons = (
    <Group gap="sm">
      <Button variant="subtle" size="sm"  color='white'>
        Inicio
      </Button>
      <Button variant="subtle" size="sm"  color='white'>
        About
      </Button>
    </Group>
  );

  const rightButtons = (
    <Group gap="sm">
      <Button variant="subtle" size="sm" color='white'>
        Cursos
      </Button>
      <Button variant="subtle" size="sm"  color='white'>
        Recursos
      </Button>
    </Group>
  );

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
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          transition: 'background-color 0.3s ease',
          backgroundColor: atTop ? 'transparent' : '#83013E',
          borderBottom: 'none',
        }}
      >
        <Grid align="center">
          {!isMobile && (
            <Grid.Col span={4}>
              <Flex justify="left">
                {leftButtons}
              </Flex>
            </Grid.Col>
          )}

          <Grid.Col span={isMobile ? 6 : 4} ta={isMobile ? "left":"center"}>
            <Text fw={700} fz="lg" c='white'>
              Academias TI
            </Text>
          </Grid.Col>

          <Grid.Col span={isMobile ? 6 : 4}>
            <Flex justify={'flex-end'}>
              {isMobile ? (
                <Burger opened={opened} onClick={toggle} color='white' aria-label="Abrir menu"/>
              ) : (
                rightButtons
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
            color: 'black',   // Título "Menú"
          },
          body: {
            color: 'black',   // Texto dentro del drawer
          },
        }}
      >
        <Box mb="md" color='black'>
        {leftButtons}
        </Box>
        {rightButtons}
      </Drawer>
    </>
  );
}
