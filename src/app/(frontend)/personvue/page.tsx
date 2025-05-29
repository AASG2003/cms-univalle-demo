'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, Flex, Input, Image, Stack, Text, Grid, GridCol, Group, ThemeIcon, Tabs, Paper, Title, List, FloatingIndicator } from '@mantine/core'
import { IconArrowRight, IconCheck, IconZoom } from '@tabler/icons-react'
import classes from './personvue.module.css';

type TabKey = 'LaPaz' | 'SantaCruz' | 'Cochabamba';

const content: Record<TabKey, {
  titulo: string;
  encargado: string;
  informacion: string[];
  imagen: string;
}> = {
  LaPaz: {
    titulo: 'Sede Académica La Paz',
    encargado:
      'Manuel Molina – TA Principal y Contacto técnico',
    informacion: [
      'Horarios de atención: Miércoles y Sábado de 8:00 a 12:00',
      'zona de Miraflores, Av. Argentina # 2083, al lado del canal de TV ATB, a unos pasos del parque Triangular. Torre 2 Innovación Piso 4.'
    ],
    imagen: 'https://www.univalle.edu/wp-content/uploads/2022/08/lapaz_des.jpg',
  },
  Cochabamba: {
    titulo: 'Sede Académica Cochabamba',
    encargado:
      'Jimena Castellón – TA Principal y Contacto técnico',
    informacion: [
      'Horarios de atención: Miércoles y Sábado de 8:00 a 12:00',
    ],
    imagen: '/foto_sedepaisaje01.jpg',
  },
  SantaCruz: {
    titulo: 'Sede Académica Santa Cruz',
    encargado:
      'WillerGalean – TA Principal y Contacto técnico',
    informacion: [
      'Horarios de atención: Miércoles y Sábado de 8:00 a 12:00',
    ],
    imagen: '/santa_des.jpg',
  },
};


export default function PersonVue() {

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<TabKey>('LaPaz');

  const controlsRefs = {
    LaPaz: useRef<HTMLButtonElement>(null),
    Cochabamba: useRef<HTMLButtonElement>(null),
    SantaCruz: useRef<HTMLButtonElement>(null),
  };

  const { titulo, encargado, informacion, imagen } = content[value];
  
  return (
    <div>
      <Box
        h={'auto'}
        pt={90}
        pb={70}
        style={{
          width: '100%',
          backgroundImage: 'url("/Mask group.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
      }}>
        <Stack pl={80} pr={80}>
          <Text ta="left" size='50' fw={600} inline c='white' w={"80%"} style={{
            lineHeight: 1.5,
          }}>
            Desbloquea todo tu potencial con 
            <br/> las certificaciones de <b>Pearson Vue</b>
          </Text>
        <Grid>
          <GridCol span={4}>
            <Text c={'white'} mb={40}>
              Capacitate y obten el reconocimiento brindado por importantes empresas 
              de tecnologia.
              <br/><br/>
              Resalta tu perfil profesional y haz que tu perfil profesional sobresalga.
            </Text>
            <Button
              component="a"
              href="https://www.pearsonvue.com/"
              target="_blank"
              rightSection={<IconArrowRight size={18} />}
              variant="filled"
            >
              Ir a Pearson VUE
            </Button>
          </GridCol>
          <GridCol span={4}>
            <Box
              style={{
                position: 'relative',
                width: '100%',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/Pearson VUE Authorized Test Center_US 1.png"
                alt="Imagen centrada"
                radius="md"
                maw={200}
                mah={200}
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </GridCol>
          <GridCol span={4}>
            <Stack justify="center" h="100%">
              {[
                'Valida tus habilidades profesionalmente',
                'Aumenta tus oportunidades laborales',
                'Reconocimiento internacional',
              ].map((item, index) => (
                <Group key={index} gap={'sm'}>
                  <ThemeIcon radius="xl" size={10} color="" />
                  <Text size="sm" c={"white"}>
                    {item}
                  </Text>
                </Group>
              ))}
            </Stack>
          </GridCol>
        </Grid>
      </Stack>
      </Box>
      <Box>
        <Stack m={40}>
          <Text ta="center" size='50' fw={600} inline c='#83013E' mb={40}>Conoce nuestras 3 Sedes a disposicion</Text>
          <Text></Text>
          <Tabs value={value} onChange={(val) => setValue(val as TabKey)} variant="none">
            <Tabs.List ref={rootRef} className={classes.list}>
              <Tabs.Tab value="LaPaz" ref={controlsRefs.LaPaz} className={classes.tab}>
                La Paz
              </Tabs.Tab>
              <Tabs.Tab value="Cochabamba" ref={controlsRefs.Cochabamba} className={classes.tab}>
                Cochabamba
              </Tabs.Tab>
              <Tabs.Tab value="SantaCruz" ref={controlsRefs.SantaCruz} className={classes.tab}>
                Santa Cruz
              </Tabs.Tab>

              <FloatingIndicator
                parent={rootRef.current}
                target={controlsRefs[value].current}
              />
            </Tabs.List>

            <Tabs.Panel value={value} pt="md">
              <Paper shadow="md" p="lg" radius="lg" withBorder>
                <Grid align="center">
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Title order={3}>{titulo}</Title>
                    <Text mt="sm" mb="md">
                      {encargado}
                    </Text>
                    <Text fw={600} mb={6}>
                      Información:
                    </Text>
                    <List
                      spacing="xs"
                      size="sm"
                      icon={
                        <ThemeIcon size={20} radius="xl">
                          <IconCheck size={14} />
                        </ThemeIcon>
                      }
                    >
                      {informacion.map((item, idx) => (
                        <List.Item key={idx}>{item}</List.Item>
                      ))}
                    </List>
                    {/* <Button mt="lg" >
                      Apply Now
                    </Button> */}
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Image
                      src={imagen}
                      alt={titulo}
                      radius="lg"
                      fit="cover"
                      height={300}
                    />
                  </Grid.Col>
                </Grid>
              </Paper>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Box>
    </div>   
  )
}
