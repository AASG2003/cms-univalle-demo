'use client'

import { Box, Grid, GridCol, Image, Stack, Text} from "@mantine/core";

export function Footer(){
  return(
    <footer>
      <Box
      h={350}
      mt={50}
      pl={50} pr={50}
      style={{
        width: '100%',
        backgroundImage: 'url("/footer.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <Grid pt={50}>
          <GridCol span={3}>
            <Image
              alt="logo academias"
              src={'/logo_academiasTI.png'}
            >
            </Image>
            <Text c={'white'} mt={30}>
              Aquí es donde construimos, con cada paso, un 
              brillante mañana empezando hoy mismo.
            </Text>
          </GridCol>
          <GridCol offset={3} span={1}>
            <Stack>
              <Text c={'white'} mt={20} fw={700}>
                Links
              </Text>
              <Text c={'white'} mt={20}>
                Inicio
              </Text>
              <Text c={'white'} mt={10}>
                Noticias
              </Text>
              <Text c={'white'} mt={10}>
                Cursos
              </Text>
              <Text c={'white'} mt={10}>
                FAQ
              </Text>
            </Stack>
          </GridCol>
          <GridCol offset={2} span={1}>
            <Stack>
              <Text c={'white'} mt={20} fw={700}>
                Siguenos
              </Text>
              <Text c={'white'} mt={20}>
                Facebook
              </Text>
              <Text c={'white'} mt={10}>
                Instagram
              </Text>
            </Stack>
          </GridCol>
        </Grid>
      </Box>
    </footer>
  )
}