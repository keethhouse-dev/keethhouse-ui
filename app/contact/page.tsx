"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProps, setScrollProps] = useState({ y: 0, opacity: 1 })

  useEffect(() => {
    window.scrollTo(0, 0)
    setMounted(true)

    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollPosition = window.scrollY
      const containerHeight = containerRef.current.offsetHeight
      const scrollProgress = Math.min(scrollPosition / containerHeight, 1)

      setScrollProps({
        y: scrollProgress * 200,
        opacity: 1 - scrollProgress * 0.8,
      })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={containerRef} className="relative h-[50vh] md:h-[60vh] flex items-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollProps.y}px)`,
            opacity: scrollProps.opacity,
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
          }}
        >
          <Image
            src="/images/contact-us.webp"
            alt="Keeth House Reception Desk"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

          {/* Subtle dot overlay */}
          <div
            className="absolute inset-0 bg-black/45"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.03) 0.4px, transparent 0.4px)",
              backgroundSize: "3px 3px",
            }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-primary mb-6">Get in touch with Keeth House</p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              We're here to help with any questions about our eco-friendly cottages, bookings, or special requests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Locations Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-2">Our Locations</h2>
              <div className="h-1 w-20 bg-primary mb-8"></div>

              <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-primary mb-3">About Our Location</h3>
                <p className="text-gray-700 mb-4">
                  Keeth House is nestled in the serene surroundings of Auroville, a universal township in Tamil Nadu,
                  India. Known for its spiritual significance and experimental community, Auroville provides the perfect
                  backdrop for our eco-friendly accommodations. Our three phases are strategically situated in different
                  areas around Auroville, each offering a unique experience of natural living while maintaining easy
                  access to local attractions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Travel Information</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span className="text-gray-600">
                          <span className="font-medium">2.5 hours</span> from Chennai International Airport (MAA)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span className="text-gray-600">
                          <span className="font-medium">5 minutes</span> from Auroville Visitor Center
                        </span>
                      </li>
                      <li className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span className="text-gray-600">
                          <span className="font-medium">15-25 minutes</span> from Pondicherry
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Local Surroundings</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">Surrounded by lush greenery and tropical vegetation</span>
                      </li>
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">Close to pristine beaches along the Bay of Bengal</span>
                      </li>
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">
                          Near cultural attractions, organic farms, and wellness centers
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Transportation Tip:</strong> We recommend arranging a taxi from Chennai Airport or
                    Pondicherry for the most convenient travel experience. Local auto-rickshaws and rental scooters are
                    available for exploring the area once you arrive.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-8">
                {/* Phase 1 */}
                <LocationCard
                  title="Phase I"
                  address="Lakshya Township, 237 Second Cross Street, near Auroville, Irumbai, Tamil Nadu 605111"
                  description="Our original property with three beautiful cottages surrounded by vibrant trees and foliage."
                  mapImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Phase-I-Map-trQqAqdC2oKffG33pOxokeYtnTjj6L.png"
                  navigationUrl="https://maps.app.goo.gl/AXWTNaZcf21UXbTY8"
                />

                {/* Phase 2 */}
                <LocationCard
                  title="Phase II"
                  address="117, Edayanchavadi Rd, near Red Earth Riding School, Irumbai, Tamil Nadu 605111"
                  description="A secluded property with four charming houses, high ceilings, and lush tree cover."
                  mapImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Phase-II-Map-nL1NuWlFDXK7TT5WJbf6emtmcIWoP8.png"
                  navigationUrl="https://maps.app.goo.gl/XU2mB2xnxno23KVS8"
                />

                {/* Phase 3 */}
                <LocationCard
                  title="Phase III"
                  address="118, Cross Road, near Red Earth Riding School, Phase III, Auroville, Edayanchavadi, Tamil Nadu 605111"
                  description="Our newest collection of unique eco-cottages combining sustainable living with modern comforts."
                  mapImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Phase-III-Map-AKxSku2Uybjb8JJI5neocbGugC8ZIw.png"
                  navigationUrl="https://maps.app.goo.gl/yjh3P49suiYNaVHS7"
                />
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Exact directions and GPS coordinates will be provided after booking
                  confirmation.
                </p>
              </div>
            </motion.div>

            {/* Contact Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-2">Contact Details</h2>
              <div className="h-1 w-20 bg-primary mb-8"></div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>

                  <div className="space-y-6">
                  <ContactItem
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                          <path d="M9 14a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z" />
                        </svg>
                      }
                      title="WhatsApp"
                      content="Direct Message"
                      link="https://wa.me/918124338124"
                    />

                    <ContactItem
                      icon={<Mail className="h-5 w-5 text-primary" />}
                      title="Email"
                      content="reservations@keethhouse.com"
                      link="mailto:reservations@keethhouse.com"
                    />

                    <ContactItem
                      icon={<Clock className="h-5 w-5 text-primary" />}
                      title="Office Hours"
                      content="9:00 AM - 6:00 PM (IST), Monday to Sunday"
                    />

                    <ContactItem
                      icon={<MapPin className="h-5 w-5 text-primary" />}
                      title="Main Office"
                      content="118, Cross Road, near Red Earth Riding School, Phase III, Auroville, Edayanchavadi, Tamil Nadu 605111"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold mb-6">Connect With Us</h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Instagram className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Instagram</h4>
                        <a
                          href="https://www.instagram.com/keethhouse/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-600 hover:text-primary transition-colors"
                        >
                          @keethhouse
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          Follow us for daily updates and behind-the-scenes glimpses
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Facebook className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Facebook</h4>
                        <a
                          href="https://www.facebook.com/keethhouse"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-600 hover:text-primary transition-colors"
                        >
                          Keeth House
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          Join our community and stay updated on events and offers
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-medium mb-2">Emergency Contact</h4>
                    <p className="text-sm">
                      For urgent matters outside office hours, please call:
                      <br />
                      <a href="tel:+918124338124" className="text-primary font-medium ml-1">
                        +91 8124338124
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}

// Location Card Component
function LocationCard({
  title,
  address,
  description,
  mapImage,
  navigationUrl,
}: {
  title: string
  address: string
  description: string
  mapImage: string
  navigationUrl: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
          <div className="flex items-start mb-3">
            <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
            <p className="font-semibold">{address}</p>
          </div>
          <p className="text-gray-600 mb-6">{description}</p>
        </div>
        <div className="relative h-64 md:h-auto">
          <Image
            src={mapImage || "/placeholder.svg"}
            alt={`Map of Keeth House ${title}`}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 z-10">
            <a
              href={navigationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center shadow-md"
            >
              <MapPin className="h-4 w-4 mr-1" />
              Navigate to {title}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// Contact Item Component
function ContactItem({
  icon,
  title,
  content,
  link,
}: {
  icon: React.ReactNode
  title: string
  content: string
  link?: string
}) {
  return (
    <div className="flex items-start">
      <div className="bg-primary/10 p-3 rounded-full mr-4">{icon}</div>
      <div>
        <h4 className="font-medium">{title}</h4>
        {link ? (
          <a href={link} className="text-gray-600 hover:text-primary transition-colors">
            {content}
          </a>
        ) : (
          <p className="text-gray-600">{content}</p>
        )}
      </div>
    </div>
  )
}
