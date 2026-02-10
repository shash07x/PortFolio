import { useEffect, useState, useRef } from 'react'
import './App.css'
import { 
  Mail, 
  Linkedin, 
  Github, 
  Brain, 
  Briefcase, 
  GraduationCap, 
  Award, 
  MapPin, 
  ExternalLink,
  ChevronDown,
  Cpu,
  Globe,
  Send,
  Sprout,
  HeartPulse,
  Eye,
  Code
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// Animated Particles Component
function AnimatedParticles() {
  return (
    <div className="particles-container">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 20}s`,
            opacity: Math.random() * 0.5 + 0.2,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
        />
      ))}
    </div>
  )
}

// Floating Orbs Component
function FloatingOrbs() {
  return (
    <div className="orbs-container">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
    </div>
  )
}

// Grid Background Component
function GridBackground() {
  return (
    <div className="grid-bg">
      <div className="grid-lines" />
    </div>
  )
}

// Skill Progress Bar Component
function SkillCard({ name, category, percentage }: { name: string; category: string; percentage: number }) {
  return (
    <Card className="skill-card glass-effect border-white/10 hover-lift">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <span className="category-tag">{category}</span>
        <div className="skill-bar-container">
          <div className="skill-bar" style={{ width: `${percentage}%` }} />
        </div>
        <span className="skill-percentage">{percentage}%</span>
      </CardContent>
    </Card>
  )
}

// Project Card Component
function ProjectCard({ 
  image, 
  title, 
  description, 
  tags, 
  icon: Icon 
}: { 
  image: string; 
  title: string; 
  description: string; 
  tags: string[];
  icon: React.ElementType;
}) {
  return (
    <Card className="project-card glass-effect border-white/10 hover-lift overflow-hidden">
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
        <div className="project-icon-overlay">
          <div className="project-icon">
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span key={i} className="tech-tag">{tag}</span>
          ))}
        </div>
        <div className="flex gap-4">
          <a href="#" className="project-link">
            <ExternalLink className="w-4 h-4" />
            View Project
          </a>
          <a href="#" className="project-link">
            <Code className="w-4 h-4" />
            Code
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ]

  const skills = [
    { name: 'Python', category: 'Languages', percentage: 90 },
    { name: 'SQL', category: 'Databases', percentage: 85 },
    { name: 'MongoDB', category: 'Databases', percentage: 80 },
    { name: 'Oracle', category: 'Databases', percentage: 75 },
    { name: 'Flask', category: 'Frameworks', percentage: 85 },
    { name: 'Computer Vision', category: 'AI/ML', percentage: 80 },
    { name: 'Machine Learning', category: 'AI/ML', percentage: 78 },
    { name: 'React', category: 'Frontend', percentage: 82 },
    { name: 'Node.js', category: 'Backend', percentage: 75 },
    { name: 'Git', category: 'Tools', percentage: 85 },
  ]

  const projects = [
    {
      image: '/project-ai-cheating.jpg',
      title: 'AI Cheating Detection System',
      description: 'Real-Time AI-Assisted Cheating Detection System for virtual interviews, focused on analyzing live webcam and audio streams to identify suspicious behavior and generate explainable alerts.',
      tags: ['Python', 'Computer Vision', 'Machine Learning', 'OpenCV'],
      icon: Eye
    },
    {
      image: '/project-iot-plant.jpg',
      title: 'Smart IoT Plant Watering',
      description: 'IoT-based smart plant watering system with automated moisture sensing and cloud connectivity for remote monitoring and control.',
      tags: ['IoT', 'Sensors', 'Arduino', 'Cloud'],
      icon: Sprout
    },
    {
      image: '/project-health-wearable.jpg',
      title: 'Health Monitoring Wearable',
      description: 'Wearable health monitoring device for heart patients with real-time ECG tracking and emergency alert system.',
      tags: ['IoT', 'Healthcare', 'Embedded Systems', 'Data Analytics'],
      icon: HeartPulse
    }
  ]

  const experiences = [
    {
      company: 'Mindnotix Software Solutions',
      role: 'Data Analyst',
      duration: 'December 2024 - January 2025',
      location: 'Coimbatore',
      description: [
        'Gained foundational knowledge in data analysis, covering data cleaning, chart creation, and basic statistical methods using Excel',
        'Acquired introductory SQL skills for querying and managing relational databases',
        'Explored core data science and ML concepts, including data preprocessing and pattern identification in structured datasets'
      ]
    },
    {
      company: 'Qono Technologies Pvt Ltd',
      role: 'Full Stack Web Developer',
      duration: 'December 2023 - January 2024',
      location: 'Coimbatore',
      description: [
        'Designed and deployed 2+ full-stack web apps, improving user engagement by 40% through responsive UI and clean architecture',
        'Implemented secure authentication workflows with JWT and optimized backend performance using middleware and aggregation pipelines',
        'Contributed to production-grade codebases, applying custom hooks, Context API, and robust error handling in a fast-paced team environment'
      ]
    }
  ]

  const certifications = [
    { name: 'Python Developer Certification', issuer: 'Professional' },
    { name: 'Oracle - APEX Cloud Developer', issuer: 'Certified Professional' }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect py-3' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gradient">SP</div>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Button 
              onClick={scrollToContact}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Let's Talk
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* AI Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/hero-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        
        {/* Live Animated Backgrounds */}
        <AnimatedParticles />
        <FloatingOrbs />
        
        {/* Background Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-slide-up">
            {/* Circular Profile Image with Glow */}
            <div className="profile-container mb-8">
              <div className="profile-glow" />
              <img 
                src="/hero-profile.jpg" 
                alt="Shashvath P" 
                className="profile-image"
              />
              <div className="online-indicator" />
            </div>

            {/* Name with Gradient */}
            <h1 className="hero-name mb-4">
              SHASHVATH <span className="text-gradient">P</span>
            </h1>
            
            {/* Title */}
            <p className="hero-title mb-6">
              Software Engineer & Data Analyst
            </p>
            
            {/* Tags */}
            <div className="hero-tags mb-10">
              <span className="hero-tag">Python Developer</span>
              <span className="hero-tag">Full Stack</span>
              <span className="hero-tag">Data Analytics</span>
              <span className="hero-tag">Machine Learning</span>
            </div>
            
            {/* Buttons */}
            <div className="hero-buttons">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="explore-btn"
              >
                Explore My Work
                <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
              </Button>
              <Button 
                variant="outline" 
                onClick={scrollToContact}
                className="contact-btn"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
              <a 
                href="https://www.linkedin.com/in/shash-383b803aa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="linkedin-btn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection('about')}
          className="scroll-indicator"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
          <GridBackground />
        </div>
        <AnimatedParticles />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">About Me</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">Who I Am</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="glass-effect border-white/10 hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Professional Summary</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I'm a Computer Science and Engineering graduate with hands-on experience in software development and data analytics, backed by practical exposure to Python, SQL, MongoDB, and Oracle. I enjoy building reliable, real-world solutions and continuously strengthening my backend and analytical skills through projects, certifications, and internships.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  With a strong foundation in IT concepts and databases, I bring a problem-solving mindset, adaptability, and the ability to work effectively in collaborative environments.
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>India</span>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card className="glass-effect border-white/10 hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h4 className="font-semibold">Current Project</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Developing a Real-Time AI-Assisted Cheating Detection System for virtual interviews, focused on analyzing live webcam and audio streams to identify suspicious behavior and generate explainable alerts.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-effect border-white/10 hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="font-semibold">IoT Projects</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Worked on IoT-based academic projects including a smart plant watering system and a wearable health monitoring device for heart patients.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-effect border-white/10 hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-green-400" />
                    </div>
                    <h4 className="font-semibold">Career Goals</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Actively seeking entry-level opportunities as an Associate Software Developer or Data Analyst. Short-term goal: gain hands-on industry experience. Long-term aspiration: grow into a skilled software engineer building scalable, meaningful solutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Technical Arsenal */}
      <section id="skills" className="py-24 relative">
        {/* AI Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/skills-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <FloatingOrbs />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">Expertise</Badge>
            <h2 className="section-title">Technical <span className="text-gradient">Arsenal</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <SkillCard 
                key={skill.name}
                name={skill.name}
                category={skill.category}
                percentage={skill.percentage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
        </div>
        <AnimatedParticles />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">Portfolio</Badge>
            <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Innovative solutions I've built across AI, IoT, and web development
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                icon={project.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative">
        {/* AI Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/experience-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <AnimatedParticles />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">Experience</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Work Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry exposure through internships in Full Stack Web Development and Data Analytics
            </p>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="glass-effect border-white/10 hover-lift">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{exp.role}</h3>
                          <p className="text-blue-400">{exp.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 ml-13">
                        <span>{exp.duration}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                      <ul className="space-y-2 ml-13">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="py-24 relative">
        {/* AI Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/education-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <FloatingOrbs />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="mb-8">
                <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">Education</Badge>
                <h2 className="text-3xl font-bold">Academic Background</h2>
              </div>
              <Card className="glass-effect border-white/10 hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Bachelor's Degree in Computer Science</h3>
                      <p className="text-blue-400 mb-2">Sri Ramakrishna Engineering College</p>
                      <p className="text-sm text-muted-foreground">September 2022 - May 2026</p>
                      <p className="text-muted-foreground mt-4">
                        Currently pursuing a comprehensive Computer Science degree with focus on software development, data analytics, and emerging technologies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Certifications */}
            <div>
              <div className="mb-8">
                <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Certifications</Badge>
                <h2 className="text-3xl font-bold">Professional Certifications</h2>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card key={index} className="glass-effect border-white/10 hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <Award className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        {/* AI Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/contact-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <AnimatedParticles />
        <FloatingOrbs />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">Get In Touch</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Open to connecting with professionals, recruiters, and teams working on innovative products and data-driven systems
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a 
              href="mailto:shash.07x@gmail.com"
              className="glass-effect border-white/10 rounded-xl p-6 hover-lift group text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors group-hover:scale-110 transform duration-300">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">shash.07x@gmail.com</p>
            </a>
            <a 
              href="https://www.linkedin.com/in/shash-383b803aa"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect border-white/10 rounded-xl p-6 hover-lift group text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors group-hover:scale-110 transform duration-300">
                <Linkedin className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-1">LinkedIn</h3>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                Connect <ExternalLink className="w-3 h-3" />
              </p>
            </a>
            <a 
              href="#"
              className="glass-effect border-white/10 rounded-xl p-6 hover-lift group text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors group-hover:scale-110 transform duration-300">
                <Github className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-1">GitHub</h3>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                View Projects <ExternalLink className="w-3 h-3" />
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gradient font-bold text-xl">Shashvath P</div>
            <p className="text-sm text-muted-foreground">
              © 2025 Shashvath P. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:shash.07x@gmail.com" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/shash-383b803aa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
