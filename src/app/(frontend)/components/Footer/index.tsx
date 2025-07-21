'use client';

import { Box, Grid, Image, Stack, Text } from '@mantine/core';

export function Footer() {
  return (
    <footer>
      <Box
        mt={50}
        px={{ base: 20, sm: 40, md: 60 }}
        py={{ base: 40, sm: 50 }}
        style={{
          width: '100%',
          minHeight: 350,
          backgroundImage: 'url("/footer.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Grid gutter="lg">
          {/* Columna: Logo y descripción */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Image
              alt="logo academias"
              src="/logo_academiasTI.png"
              maw={180}
              mb="md"
            />
            <Text c="white">
              Aquí es donde construimos, con cada paso, un brillante mañana
              empezando hoy mismo.
            </Text>
          </Grid.Col>

          {/* Columna: Links */}
          <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
            <Stack gap={5}>
              <Text c="white" fw={700} mb="xs">
                Links
              </Text>
              <Text c="white" component="a" href="/">
                Inicio
              </Text>
              <Text c="white" component="a" href="/noticias">
                Noticias
              </Text>
              <Text c="white" component="a" href="/cursos">
                Cursos
              </Text>
              <Text c="white" component="a" href="/faq">
                FAQ
              </Text>
              <Text c="white" component="a" href="/personvue">
                Person Vue
              </Text>
            </Stack>
          </Grid.Col>

          {/* Columna: Redes sociales */}
          <Grid.Col span={{ base: 6, md: 4, lg: 2 }}>
            <Stack gap={5}>
              <Text c="white" fw={700} mb="xs">
                Síguenos
              </Text>
              <Text
                c="white"
                component="a"
                href="https://www.facebook.com/univallelpz"
                target="_blank"
              >
                Facebook
              </Text>
              <Text
                c="white"
                component="a"
                href="https://www.instagram.com/univalle_lapaz/"
                target="_blank"
              >
                Instagram
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>
    </footer>
  );
}
