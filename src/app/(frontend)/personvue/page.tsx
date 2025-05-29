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
  mapaurl: string;
}> = {
  LaPaz: {
    titulo: '🔵 📌 Sede LA PAZ – Torre Innovación',
    encargado:
      '👨‍💻Contacto técnico: Ing. Manuel Molina',
    informacion: [
      '🕑Horario de atención: Miércoles y Sábados de 08:00 a 12:00',
      '📍Dirección: Av. Argentina #2083, Zona Miraflores (al lado de ATB, a pasos del Parque Triangular)',
      '📞Teléfono: (591-2) 2200180 int. 2306',
      '🚈Cómo llegar:',
      'Mi Teleférico Línea Blanca, estación Parque Triangular',
      'Taxi/Uber: Indicar MIRAFLORES, AV. ARGENTINA #2083 LADO ATB',
    ],
    imagen: 'https://www.univalle.edu/wp-content/uploads/2022/08/lapaz_des.jpg',
    mapaurl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d956.3622372214091!2d-68.11991375158998!3d-16.503417431594112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f206782937445%3A0xacceb97486edb698!2sUniversidad%20Privada%20del%20Valle%20Sede%20La%20Paz!5e0!3m2!1sen!2sbo!4v1748526376836!5m2!1sen!2sbo',
  },
  Cochabamba: {
    titulo: '🔵 📌 Sede COCHABAMBA – Campus Central Tiquipaya',
    encargado:
      '👩‍💻Contacto técnico: Ing. Jimena Castellón',
    informacion: [
      '🕑Horario de atención: Lunes de 12:15 a 17:15 y Sábados de 07:00 a 10:00',
      '📍Dirección: C. Guillermina Martínez S/N – Campus Universitario Univalle',
      '📞Teléfono: (591-4) 4318800 int. 1410',
      '🚍Cómo llegar:',
      'Transporte público: Líneas 120, Z12 y 150',
    ],
    imagen: '/foto_sedepaisaje01.jpg',
    mapaurl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.628757779222!2d-66.22897992567808!3d-17.333452183544534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e375a63e6e2e9f%3A0xd3797a03a1ee948d!2sUNIVALLE!5e0!3m2!1sen!2sbo!4v1748527362306!5m2!1sen!2sbo',
  },
  SantaCruz: {
    titulo: '🔵 📌 Sede SANTA CRUZ – Campus Eco Smart',
    encargado:
      '👨‍💻Contacto técnico: Ing. Willer Galean',
    informacion: [
      '🕑Horario de atención: Lunes de 14:00 a 17:00 y Sábados de 08:00 a 13:00',
      '📍Dirección: Av. 7mo anillo y Av. Juan Pablo II – Módulo 4 Planta Baja',
      '📞Teléfono: (591-3) 3000001 int. 5411',
      '🚍Cómo llegar:',
      'Transporte público: línea 99, línea 58 y línea 128 (parada: Av. Juan Pablo II – EcoSmart)',
    ],
    imagen: '/santa_des.jpg',
    mapaurl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15202.22350279868!2d-63.1678671!3d-17.7184285!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7bd8f502d25%3A0xf6e1e8d427ed4466!2sCampus%20Univalle!5e0!3m2!1sen!2sbo!4v1748527070155!5m2!1sen!2sbo',
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

  const { titulo, encargado, informacion, imagen, mapaurl } = content[value];
  
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
                'Exámenes con tecnología antifraude y alta confidencialidad',
                'Ambientes cómodos, monitoreados y seguros',
                'Resultados confiables con el respaldo global de Pearson VUE',
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
          <Text pl={200} pr={200} ta={'center'}>¡Ahora puedes certificar tus conocimientos internacionales sin salir del país!
            UNIVALLE ha sido acreditada como Centro Autorizado de Exámenes Pearson VUE 
            (PVTC-UNIVALLE) desde junio de 2024, brindando exámenes internacionales de 
            alta seguridad en las Sedes Académicas de La Paz, Cochabamba y Santa Cruz, 
            bajo los más rigurosos estándares globales.</Text>
          <Tabs value={value} onChange={(val) => setValue(val as TabKey)} variant="none">
            <Tabs.List ref={rootRef} className={classes.list} pb={50}>
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
                  <Grid.Col p={'50px'} span={{ base: 12, md: 6 }} style={{
                  }}>
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
                      // icon={
                      //   <ThemeIcon size={20} radius="xl">
                      //     <IconCheck size={14} />
                      //   </ThemeIcon>
                      // }
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
                    <iframe src={mapaurl} width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
