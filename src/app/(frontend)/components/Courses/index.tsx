'use client';

import '@mantine/carousel/styles.css'; 
import { Button, Flex, Grid, GridCol, Stack, Text } from '@mantine/core';
import { IconCalendarClock, IconCloudCode, IconCloudLock, IconDatabase, IconInputAi, IconTopologyFullHierarchy } from '@tabler/icons-react';

export function Courses(){
    const courses = [
      {
        icon: IconInputAi,
        title: 'Inteligencia Artificial',
        subtitle: 'Cisco, Huawei, IBM...',
      },
      {
        icon: IconCloudLock,
        title: 'Ciberseguirdad',
        subtitle: 'Cisco, Huawei, EC-Council...',
      },
      {
        icon: IconDatabase,
        title: 'Bases de Datos',
        subtitle: 'Oracle, AWS....',
      },
      {
        icon: IconTopologyFullHierarchy,
        title: 'Redes y Hardware',
        subtitle: 'Cisco, Huawei...',
      },
      {
        icon: IconCalendarClock,
        title: 'Gestión de proyectos',
        subtitle: 'PMI, Microsoft, Odoo...',
      },
      {
        icon: IconCloudCode,
        title: 'Computación en la Nube',
        subtitle: 'AWS, Microsoft, IBM...',
      },
    ];

    return(
        <Grid align='center' mt={'5rem'} maw={'99%'}>
            <GridCol span={8} offset={2} mt={50}>
                <Text ta="center" size='40' fw={600} inline c='#83013E' pl={80} pr={50}>
                Explora las áreas disponibles dentro de academias TI
                </Text>
            </GridCol>
            <GridCol span={6} offset={3} mt={30}>
              <Text ta={'center'}>
                Con mas de 20 areas para escoger cursos de distintas plataformas
              </Text>
            </GridCol>
            <GridCol span={10} offset={1} mt={30} style={{
              justifyContent: 'center',
              alignItems: 'center',

            }}>
            <Flex
                mt={50}
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify={{ base: 'center' }}
                align={'center'}
                wrap={'wrap'}
                >
                  {courses.map((course, index) => (
                    <Button
                      key={index}
                      leftSection={<course.icon size={50} style={{ marginLeft: 40 }} />}
                      variant="filled"
                      color="#83013E"
                      radius="md"
                      w={{base:"320px", sm:"380px"}}
                      style={{ 
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'left'
                      }}>
                      <Stack p={40}>
                        <Text ta="left">{course.title}</Text>
                        <Text ta="left" size="xs">{course.subtitle}</Text>
                      </Stack>
                    </Button>
                  ))}
            </Flex>
            </GridCol>
            <GridCol span={4} offset={4} mt={40} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
            }}>
                <Button variant="filled" color="#83013E" radius="xl">Ver Cursos</Button>
            </GridCol>
        </Grid>
    )
}