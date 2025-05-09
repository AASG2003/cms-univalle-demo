import React from 'react'
import './styles.css'
import { HeroSection } from './components/HeroSection'
import { AboutUs } from './components/AboutUs'
import { Courses } from './components/CoursesHome'
import { Testimonials } from './components/Testimonials'
import { NewsHome } from './components/NewsHome'

export default async function HomePage() {

  return (
    <div>
      <HeroSection/>
      <AboutUs />
      <Courses />
      <Testimonials />
      <NewsHome />
    </div>
  )
}
