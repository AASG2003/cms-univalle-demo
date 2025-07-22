'use client'
import React, { useRef, useState } from 'react'
import { 
  Box, 
  Button, 
  Card, 
  Flex, 
  Image, 
  Stack, 
  Text, 
  Grid, 
  GridCol, 
  Group, 
  ThemeIcon, 
  Tabs, 
  Paper, 
  Title, 
  List, 
  FloatingIndicator,
  Container
} from '@mantine/core'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import classes from './personvue.module.css'

type TabKey = 'LaPaz' | 'SantaCruz' | 'Cochabamba'

interface SedeContent {
  titulo: string
  encargado: string
  informacion: string[]
  imagen: string
  mapaurl: string
}

const CONTENT: Record<TabKey, SedeContent> = {
  LaPaz: {
    titulo: '🔵 📌 Sede LA PAZ – Torre Innovación',
    encargado: '👨‍💻Contacto técnico: Ing. Manuel Molina',
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
    encargado: '👩‍💻Contacto técnico: Ing. Jimena Castellón',
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
    encargado: '👨‍💻Contacto técnico: Ing. Willer Galean',
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
}

const FEATURES = [
  'Exámenes con tecnología antifraude y alta confidencialidad',
  'Ambientes cómodos, monitoreados y seguros',
  'Resultados confiables con el respaldo global de Pearson VUE',
] as const

// Componente optimizado para el hero
const HeroSection: React.FC = () => (
  <Box
    style={{
      minHeight: '70vh',
      backgroundImage: 'url("/Mask group.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <Container size="xl" py={{ base: 40, md: 90 }}>
      <Grid align="center" gutter="xl">
        <GridCol span={{ base: 12, md: 5 }}>
          <Stack gap="xl">
            <Title
              order={1}
              fz={{ base: 30, sm: 40, md: 50 }}
              c="white"
              lh={1.3}
              fw={600}
            >
              Desbloquea todo tu potencial con
              <br />
              las certificaciones de <Text component="span" fw={700}>Pearson Vue</Text>
            </Title>
            
            <Text c="white" fz={{ base: 'sm', md: 'md' }} lh={1.6}>
              Capacítate y obtén el reconocimiento brindado por importantes empresas 
              de tecnología.
              <br /><br />
              Resalta tu perfil profesional y haz que tu perfil profesional sobresalga.
            </Text>
            
            <Button
              component="a"
              href="https://www.pearsonvue.com/"
              target="_blank"
              rightSection={<IconArrowRight size={18} />}
              variant="filled"
              size="lg"
              w={{ base: '100%', sm: 'auto' }}
            >
              Ir a Pearson VUE
            </Button>
          </Stack>
        </GridCol>
        
        <GridCol span={{ base: 12, md: 3 }}>
          <Flex justify="center" align="center" h={{ base: 200, md: 300 }}>
            <Image
              src="/Pearson VUE Authorized Test Center_US 1.png"
              alt="Pearson VUE Authorized Test Center"
              radius="md"
              maw={{ base: 150, md: 200 }}
              mah={{ base: 150, md: 200 }}
              fit="contain"
            />
          </Flex>
        </GridCol>
        
        <GridCol span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            {FEATURES.map((item, index) => (
              <Group key={index} gap="sm" align="flex-start">
                <ThemeIcon 
                  radius="xl" 
                  size={12} 
                  color="white" 
                  mt={4}
                  style={{ flexShrink: 0 }}
                />
                <Text fz="sm" c="white" lh={1.4}>
                  {item}
                </Text>
              </Group>
            ))}
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  </Box>
)

// Componente para la información de cada sede
const SedeInfo: React.FC<{ sede: SedeContent }> = ({ sede }) => (
  <Paper shadow="md" p={{ base: 'md', md: 'xl' }} radius="lg" withBorder>
    <Grid align="stretch" gutter="xl">
      <GridCol span={{ base: 12, lg: 6 }}>
        <Stack gap="md" h="100%">
          <Title order={3} fz={{ base: 'h4', md: 'h3' }} lh={1.3}>
            {sede.titulo}
          </Title>
          
          <Text mt="sm" mb="md" c="dimmed">
            {sede.encargado}
          </Text>
          
          <Box>
            <Text fw={600} mb="xs" fz="sm">
              Información:
            </Text>
            <List spacing="xs" fz="sm">
              {sede.informacion.map((item, idx) => (
                <List.Item key={idx} style={{ lineHeight: 1.5 }}>
                  {item}
                </List.Item>
              ))}
            </List>
          </Box>
        </Stack>
      </GridCol>

      <GridCol span={{ base: 12, lg: 6 }}>
        <Box
          style={{
            position: 'relative',
            width: '100%',
            height: '300px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <iframe
            src={sede.mapaurl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa de ${sede.titulo}`}
          />
        </Box>
      </GridCol>
    </Grid>
  </Paper>
)

export default function PersonVue() {
  const [activeTab, setActiveTab] = useState<TabKey>('LaPaz')
  const rootRef = useRef<HTMLDivElement>(null)

  const controlsRefs = {
    LaPaz: useRef<HTMLButtonElement>(null),
    Cochabamba: useRef<HTMLButtonElement>(null),
    SantaCruz: useRef<HTMLButtonElement>(null),
  }

  const currentSede = CONTENT[activeTab]

  return (
    <Box>
      <HeroSection />
      
      <Container size="xl" py={{ base: 40, md: 80 }}>
        <Stack gap="xl">
          <Stack gap="md" ta="center">
            <Title
              order={2}
              fz={{ base: 30, md: 50 }}
              c="#83013E"
              fw={600}
              lh={1.2}
            >
              Conoce nuestras 3 Sedes a disposición
            </Title>
            
            <Text
              fz={{ base: 'sm', md: 'md' }}
              lh={1.6}
              maw={800}
              mx="auto"
              px={{ base: 'md', md: 0 }}
            >
              ¡Ahora puedes certificar tus conocimientos internacionales sin salir del país!
              UNIVALLE ha sido acreditada como Centro Autorizado de Exámenes Pearson VUE 
              (PVTC-UNIVALLE) desde junio de 2024, brindando exámenes internacionales de 
              alta seguridad en las Sedes Académicas de La Paz, Cochabamba y Santa Cruz, 
              bajo los más rigurosos estándares globales.
            </Text>
          </Stack>

          <Tabs 
            value={activeTab} 
            onChange={(val) => setActiveTab(val as TabKey)} 
            variant="none"
            keepMounted={false}
          >
            <Tabs.List 
              ref={rootRef} 
              className={classes.list} 
              pb={{ base: 30, md: 50 }}
              justify="center"
            >
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
                target={controlsRefs[activeTab].current}
              />
            </Tabs.List>

            <Tabs.Panel value={activeTab} pt="md">
              <SedeInfo sede={currentSede} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </Box>
  )
}