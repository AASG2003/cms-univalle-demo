'use client'
import React, { useEffect, useState } from 'react'
import { Box, Input, Stack, Text, Accordion, Group, Anchor, Button } from '@mantine/core'
import { IconZoom } from '@tabler/icons-react'
import { FaqResumen } from '@/app/types/faq';

export default function Faq() {
  
  const [faqs, setFaqs] = useState<FaqResumen[]>([]);

  useEffect(() => {
    async function fetchNoticias() {
      const res = await fetch('/local_api/faq?limit=10');
      const data = await res.json();
      setFaqs(data);
    }
    fetchNoticias();
  }, []);

  console.log(faqs)


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
        <Stack justify='center' align='center' style={{
          height:'100%'
        }}>
          <Text ta="center" size='45' fw={600} inline c='white' w={"50%"}>
            FAQ
          </Text>
          <Input placeholder="Ingresa un topico" rightSection={<IconZoom size={16} />} w={"40%"} mt={30} radius={15}/>
        </Stack> 
      </Box>
      <Accordion chevronPosition="right" variant="contained" m={100} bg={'white'}>
        {faqs.map((faq) => (
          <Accordion.Item value={faq.id} key={faq.id} p={100} >
            <Accordion.Control>
              <Group wrap="nowrap">
                <div>
                  <Text ta="left" size='23' fw={400} inline c='#83013E'>{faq.titulo}</Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap={30}>
                <Text size="sm">{faq.respuesta}</Text>
                {faq.pdf?.url && (
                  <Anchor href={faq.pdf.url} target="_blank" rel="noopener noreferrer">
                    <Button color="#83013E">Ver Manual</Button>
                  </Anchor>
                )}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>   
  )
}