"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Coffee, TreePine, Users, Hammer, Heart, Leaf, Mountain, Clock, MapPin } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useSimpleParallax } from "@/hooks/use-simple-parallax"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = value / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default function TreeTopKafePage() {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const { y: parallaxY } = useSimpleParallax({ speed: 0.3 })
  
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])

  useEffect(() => {
    setIsMounted(true)
    window.scrollTo(0, 0)
  }, [])

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const galleryImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-YoslXnN1ESGceZyd4bGz2Bwj31cStN.jpg",
      alt: "Tree Top Kafe coffee counter with espresso machine",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%284%29-YXudiOrNegRsoeBsC0J9KnuonB1NDQ.jpg",
      alt: "Tree Top Kafe exterior with menu board",
      span: "",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%283%29-dWx95Lm8ONxagAbQTB49V1wtei7liH.jpg",
      alt: "Wooden walkway bridge to the treehouse",
      span: "",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%282%29-EkfvCLujV4OCMG8UPtZte84qqhjgB6.jpg",
      alt: "Treehouse platform nestled in foliage",
      span: "md:col-span-2",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%286%29-A6otNyohUthnHTaO7VCkyq4mFERrIV.jpg",
      alt: "The Mama Khaya tree with traditional decorations",
      span: "",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%288%29-KPYGLD1DddVuphQxHwRCe33NEnCWhB.jpg",
      alt: "Multi-level treehouse structure",
      span: "",
    },
  ]

  const buildSteps = [
    {
      number: "01",
      icon: TreePine,
      title: "Foundation on Nature",
      description: "Built around living trees, our structure embraces the natural growth patterns, allowing the trees to continue thriving while supporting the kafe.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%288%29-KPYGLD1DddVuphQxHwRCe33NEnCWhB.jpg",
    },
    {
      number: "02",
      icon: Hammer,
      title: "Traditional Craftsmanship",
      description: "Local artisans used time-honored techniques passed down through generations, hand-shaping each piece of wood with precision and care.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%283%29-dWx95Lm8ONxagAbQTB49V1wtei7liH.jpg",
    },
    {
      number: "03",
      icon: Heart,
      title: "Sustainable Materials",
      description: "Every material was carefully sourced - reclaimed wood, natural rope, and locally harvested bamboo - ensuring minimal environmental impact.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%282%29-EkfvCLujV4OCMG8UPtZte84qqhjgB6.jpg",
    },
  ]

  return (
    <div
      style={{ opacity: isMounted ? 1 : 0, transition: "opacity 0.5s" }}
      className="flex flex-col min-h-screen bg-background"
    >
      {/* Hero Section - Modern Split Design */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${parallaxY}px)`,
            scale: heroScale,
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%288%29-KPYGLD1DddVuphQxHwRCe33NEnCWhB.jpg"
            alt="Tree Top Kafe Treehouse Structure"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </motion.div>

        {/* Animated grain overlay */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-removebg-preview-OYa60AH6kyOmLtvFBqYcNqNWQqgBXL.png"
                    alt="Tree Top Kafe Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-white/90 text-sm font-medium tracking-wide">A Unique Experience</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-2xl md:text-3xl text-primary font-light tracking-widest mb-6"
              >
                COFFEE AMONG THE CANOPY
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="h-0.5 bg-gradient-to-r from-primary to-primary/0 mb-8"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-lg text-white/80 mb-10 leading-relaxed"
              >
                Experience coffee like never before, perched high above the ground in our handcrafted 
                treehouse kafe, built with love by the Tree House Community.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  onClick={scrollToAbout}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group px-8 py-6 text-base font-medium rounded-full"
                >
                  <span className="flex items-center gap-2">
                    Discover the Kafe
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                  </span>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-base font-medium rounded-full"
                >
                  <a href="/contact">Visit Us</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right - Floating Info Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="hidden lg:block relative h-[500px]"
            >
              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
              >
                <Mountain className="h-8 w-8 text-primary mb-2" />
                <p className="text-white font-bold text-2xl">15+ ft</p>
                <p className="text-white/70 text-sm">Above Ground</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-40 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
              >
                <Coffee className="h-8 w-8 text-primary mb-2" />
                <p className="text-white font-bold text-2xl">Artisanal</p>
                <p className="text-white/70 text-sm">Coffee & Gelato</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-20 right-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
              >
                <Leaf className="h-8 w-8 text-primary mb-2" />
                <p className="text-white font-bold text-2xl">360°</p>
                <p className="text-white/70 text-sm">Canopy View</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center cursor-pointer"
            onClick={scrollToAbout}
          >
            <span className="text-white/60 text-xs font-medium mb-3 tracking-[0.2em]">SCROLL</span>
            <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Modern Asymmetric Layout */}
      <section ref={aboutRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
        <FloatingParticles />
        
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4"
              >
                About the Kafe
              </motion.span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                A Kafe in the{" "}
                <span className="text-primary relative">
                  Sky
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 100 10"
                  >
                    <motion.path
                      d="M0,5 Q25,0 50,5 T100,5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary/30"
                    />
                  </motion.svg>
                </span>
              </h2>
            </motion.div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-5 relative"
              >
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-YoslXnN1ESGceZyd4bGz2Bwj31cStN.jpg"
                      alt="Tree Top Kafe coffee counter"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Floating accent image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-8 -right-8 w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-background"
                  >
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%284%29-YXudiOrNegRsoeBsC0J9KnuonB1NDQ.jpg"
                      alt="Tree Top Kafe exterior"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -z-10 -top-6 -left-6 w-full h-full rounded-3xl border border-primary/20" />
                  <div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                </div>
              </motion.div>

              {/* Text Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-7 lg:pl-8"
              >
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Welcome to Tree Top Kafe, a one-of-a-kind coffee experience nestled high among the trees 
                    at Keeth House. Our kafe is not just a place to grab a cup of coffee &ndash; it&apos;s a journey 
                    into the canopy, where you can savor artisanal beverages while surrounded by the whispers 
                    of leaves and birdsong.
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Built entirely from sustainable materials &ndash; locally sourced wood, bamboo, and natural 
                    fibers &ndash; the Tree Top Kafe embodies our commitment to eco-conscious living.
                  </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-2 gap-4 mt-10">
                  {[
                    { icon: Mountain, label: "Elevation", value: "15+ feet", desc: "above ground" },
                    { icon: Users, label: "Capacity", value: "20 seats", desc: "intimate setting" },
                    { icon: Coffee, label: "Specialty", value: "Artisanal", desc: "coffee & gelato" },
                    { icon: Leaf, label: "View", value: "360°", desc: "tree canopy" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="group p-5 rounded-2xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300"
                    >
                      <item.icon className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <p className="font-bold text-foreground text-lg">{item.value}</p>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Built It - Timeline Section */}
      <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="inline-block text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4">
                The Build
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                How We Built It
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The creation of Tree Top Kafe was a labor of love, combining traditional building 
                techniques with innovative design.
              </p>
            </motion.div>

            {/* Build Steps */}
            <div className="space-y-24">
              {buildSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      
                      {/* Step number overlay */}
                      <div className="absolute top-6 left-6 bg-primary text-primary-foreground text-4xl font-bold px-4 py-2 rounded-xl">
                        {step.number}
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Journey Up Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-32 relative"
            >
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3 relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%283%29-dWx95Lm8ONxagAbQTB49V1wtei7liH.jpg"
                    alt="Wooden walkway to the treehouse"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">The Journey Up</h3>
                    <p className="text-white/80 text-lg max-w-md">
                      A handcrafted wooden bridge that transforms a simple coffee break into an adventure.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Reaching the Tree Top Kafe is an experience in itself. A handcrafted wooden bridge 
                    connects you to the main platform, swaying gently as you walk, surrounded by marigold 
                    garlands and the rustling of leaves.
                  </p>
                  <div className="flex items-center gap-4 text-primary">
                    <Clock className="h-6 w-6" />
                    <span className="text-foreground font-medium">6 months of construction</span>
                  </div>
                  <div className="flex items-center gap-4 text-primary">
                    <MapPin className="h-6 w-6" />
                    <span className="text-foreground font-medium">Built by local artisans</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Masonry Layout */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
            >
              <div>
                <span className="inline-block text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4">
                  Visual Journey
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                  Gallery
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-md">
                Explore the beauty of Tree Top Kafe through our collection of images
              </p>
            </motion.div>

            {/* Masonry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className={`group relative aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer ${image.span}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tree House Community Section */}
      <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="inline-block text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4">
                The Builders
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Tree House Community
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Tree House Community is a passionate group of architects, carpenters, and nature 
                  enthusiasts united by a shared vision &ndash; to create spaces that celebrate the harmony 
                  between human habitation and the natural world.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded on the principles of sustainable construction and community collaboration, 
                  this dedicated team has been building treehouse structures around Auroville for over 
                  a decade. Their work goes beyond construction; it&apos;s about creating experiences that 
                  reconnect people with nature.
                </p>
                
                {/* The Mama Khaya */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-3xl border border-primary/20 mt-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-xl">
                      <TreePine className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-foreground mb-2">The Mama Khaya</h4>
                      <p className="text-muted-foreground">
                        Our kafe is built around &quot;The Mama Khaya&quot; &ndash; a magnificent tree that has stood 
                        for over a century. The community honors this tree with traditional ceremonies, 
                        symbolizing our respect for the land and its ancient inhabitants.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%286%29-A6otNyohUthnHTaO7VCkyq4mFERrIV.jpg"
                    alt="The Mama Khaya tree with traditional decorations"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-3xl border border-primary/20" />
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { value: 10, suffix: "+", label: "Years of Experience" },
                { value: 25, suffix: "+", label: "Treehouses Built" },
                { value: 40, suffix: "+", label: "Community Members" },
                { value: 100, suffix: "+", label: "Trees Preserved" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background p-8 rounded-3xl text-center shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-foreground relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <div className="relative w-32 h-32">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-removebg-preview-OYa60AH6kyOmLtvFBqYcNqNWQqgBXL.png"
                  alt="Tree Top Kafe Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold text-background mb-6">
              Visit Tree Top Kafe
            </h2>
            <p className="text-lg text-background/70 mb-10 max-w-2xl mx-auto">
              Open daily for guests of Keeth House. Experience artisanal coffee, fresh juices, 
              and homemade gelato while immersed in the beauty of nature.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-medium rounded-full"
              >
                <a href="/contact">Plan Your Visit</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/30 text-background hover:bg-background/10 px-10 py-6 text-lg font-medium rounded-full"
              >
                <a href="/">Explore Our Houses</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
