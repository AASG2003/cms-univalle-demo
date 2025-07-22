"use client";

import { Box, Container, Text, Group, Stack, Image, Card, Center, Button, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

const courses = [
  {
    year: "2019",
    image: "/2019.png",
  },
  {
    year: "2021",
    image: "/20211.png",
    image2: "/20212.png"
  },
  {
    year: "2023",
    image: "/2023.png",
  },
  {
    year: "2024",
    image: "/2024.png",
  },
];

export function Courses() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <Container size="xl" py="xl">
      <Title
        ta={'center'}
        order={2}
        fz={{ base: 28, md: 40 }}
        fw={600}
        c="#83013E"
        lh={1.2}
        pl={{ base: 0, md: 30 }}
      >
        Línea de Tiempo de Cursos
      </Title>
      <Text ta="center" mt="sm" mb="lg">
        Evolución de nuestras áreas de formación por año
      </Text>

      <Box
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          borderRadius: "16px",
          padding: isTablet ? "2rem 1rem" : "3rem 2rem",
          minHeight: isTablet ? "400px" : "500px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            right: "5%",
            height: "4px",
            background: `linear-gradient(90deg, ${courses.map(() => '#83013E').join(", ")})`,
            borderRadius: "2px",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        />

        <Group
          justify="space-between"
          align="center"
          style={{
            position: "relative",
            zIndex: 3,
            height: "100%",
            paddingTop: isTablet ? "3rem" : "4rem",
            paddingBottom: isTablet ? "3rem" : "4rem",
            flexWrap: "wrap",
          }}
        >
          {courses.map((course, index) => (
            <Stack
              key={index}
              align="center"
              gap="lg"
              style={{ flex: 1, maxWidth: isTablet ? "160px" : "200px" }}
            >
              <Card
                shadow="lg"
                padding="md"
                radius="md"
                withBorder
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  border: `2px solid #83013E20`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <Card.Section>
                  <Image src={course.image} h={140} w="100%" alt={`Curso ${course.year}`} fit="contain" />
                  {course.image2 && (
                    <Image src={course.image2} h={140} w="100%" alt={`Curso ${course.year} extra`} fit="contain" mt="xs" />
                  )}
                </Card.Section>
              </Card>

              <Center
                style={{
                  width: isTablet ? "60px" : "80px",
                  height: isTablet ? "60px" : "80px",
                  borderRadius: "50%",
                  backgroundColor: "#83013E",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  border: "4px solid white",
                  position: "relative",
                  zIndex: 4,
                  fontWeight: 700,
                  fontSize: isTablet ? "14px" : "18px",
                  color: "white",
                }}
              >
                {course.year}
              </Center>
            </Stack>
          ))}
        </Group>
      </Box>

      <Center mt="xl">
        <Button
          component="a"
          href="/cursos"
          variant="filled"
          color="#83013E"
          radius="xl"
        >
          Ver Cursos
        </Button>
      </Center>
    </Container>
  );
}
