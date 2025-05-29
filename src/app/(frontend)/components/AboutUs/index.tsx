'use client';

import '@mantine/carousel/styles.css'; 
import { Button, Card, Container, Grid, Group, Image, Text } from '@mantine/core';


export function AboutUs() {
  
  return (
    <>
      <Grid
        px="md"
        py="sm"
        justify="center"
        ml='70'
        mr='70'
        mt='50'
        style={{
          minHeight: '720',
          backgroundColor: 'transparent',
          border: 'none',
          height: '720',
        }}
      >
        <Grid.Col span={5}>
          <Container fluid >
            <Text ta="left" size='40' fw={600} inline c='#83013E' pt={'2rem'}
              style={{
              }}
              >
              Academias de tecnología e Innovación Univalle
            </Text>
            <Group style={{
              position:'relative'
            }}>
              <Image alt='Sede' src='/sedeSCfigma.png' width={480} height={550} 
                style={{
                  width: '100%',         
                  height: 'auto',       
                  marginTop: '20px',
                }}
              />
              <Card
                shadow="lg"
                style={{
                  position: 'absolute', 
                  borderRadius: '26px',
                  top: '24%',    
                  left: '88%',
                  zIndex: 2,
                  backgroundColor: 'white',
                  width: '190px',
                  height: '150px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text c='#83013E' ta="center" fw={600}>1mil+</Text>
                <Text ta="center" mb='20'>Estudiantes</Text>
                <Image alt = 'estudiantes' src='/3 imgs.png' height='40' width='120'/>
              </Card>
            </Group>
          </Container>
        </Grid.Col>

        <Grid.Col span={4} style={{
          paddingTop: '6.5rem',
        }}>
          <Container fluid style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%'
          }}>
            <Text ta="center" inline
              style={{
              }}
              >
              Centro Person Vue autorizado para rendir examenes.
            </Text>
            <Image alt='Sede' src='/image 4.png' width={380} height={280}
              style={{
                width: '100%',         
                height: 'auto',
                borderRadius: '25px',
              }}
            />
            <Text ta="left" inline pt='20'
              style={{
                lineHeight:1.1,
                marginBottom: '65px',
              }}
              >
              Academias TI UNIVALLE es un espacio de innovación tecnológica
              que impulsa la formación práctica en programación, inteligencia artificial, 
              desarrollo web y software. 
            </Text>
            <Button variant="filled" color="#83013E" radius="xl" component='a' href='/personvue'>Conoce mas</Button>
          </Container>
        </Grid.Col>

        <Grid.Col span={3}>
        <Container fluid style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}>
            <Group justify="flex-start">
              <Image alt='Sede' src='/Pearson VUE Authorized Test Center_US 1.png'
                style={{
                  width: 'auto',         
                  height: '80%',
                  borderRadius: '25px',
                }}
              />
            </Group>
            <Card
                shadow="lg"
                style={{
                  borderRadius: '26px',
                  backgroundColor: 'white',
                  width: '190px',
                  height: '110px',
                  justifyContent: 'center',
                }}
              >
                <Text c='#83013E' ta="center" fw={600}>200+</Text>
                <Text ta="center">Cursos</Text>
            </Card>
            <Card
                shadow="lg"
                style={{
                  borderRadius: '26px',
                  backgroundColor: 'white',
                  width: '190px',
                  height: '110px',
                  justifyContent: 'center',
                }}
              >
                <Text c='#83013E' ta="center" fw={600}>10+</Text>
                <Text ta="center">Centros de certificación con convenio</Text>
            </Card>
            <Card
                shadow="lg"
                style={{
                  borderRadius: '26px',
                  backgroundColor: 'white',
                  width: '190px',
                  height: '110px',
                  justifyContent: 'center',
                }}
              >
                <Text c='#83013E' ta="center" fw={600}>1mil+</Text>
                <Text ta="center">Certificaciones</Text>
            </Card>
            <Card
                shadow="lg"
                style={{
                  borderRadius: '26px',
                  backgroundColor: 'white',
                  width: '190px',
                  height: '110px',
                  justifyContent: 'center',
                }}
              >
                <Text c='#83013E' ta="center" fw={600}>5</Text>
                <Text ta="center">Sedes</Text>
            </Card>
          </Container>
        </Grid.Col>
      </Grid>
      
    </>
  );
}
