"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s, transform 0.5s",
            }}
            className="text-3xl sm:text-4xl font-bold mb-2"
          >
            Our Team
          </h2>
          <div
            style={{
              width: isVisible ? "5rem" : "0",
              opacity: isVisible ? 1 : 0,
              transition: "width 0.5s, opacity 0.5s",
              transitionDelay: "0.2s",
            }}
            className="h-1 bg-primary mx-auto mb-6"
          />
          <p
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.5s",
              transitionDelay: "0.3s",
            }}
            className="max-w-2xl mx-auto text-foreground/80"
          >
            Meet the dedicated people who make Keeth House a place of warmth, comfort, and natural beauty. Our diverse
            team brings together local knowledge, traditional skills, and a shared passion for sustainable living.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center" ref={ref}>
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-50px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}
            className="relative mx-auto md:mx-0 max-w-xl md:max-w-none"
          >
            <div className="relative z-10 overflow-hidden rounded-xl hover-scale">
              <Image
                src="/images/our-story/team.webp"
                alt="The Keeth House Team"
                width={600}
                height={500}
                className="object-cover w-full h-full hover-brightness"
              />
            </div>
            <div className="absolute top-5 -left-5 w-full h-full border-4 border-primary rounded-2xl -z-10" />
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(50px)",
              transition: "opacity 0.6s, transform 0.6s",
              transitionDelay: "0.2s",
            }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Our Extended Family</h3>
            <p className="text-foreground/90 mb-6 text-lg">
              At Keeth House, we're more than just a team - we're a family. Many of our staff members are from nearby
              villages, bringing with them generations of traditional knowledge and craftsmanship that shape the
              authentic experience we offer.
            </p>
            <p className="text-foreground/90 mb-6 text-lg">
              From our skilled artisans who maintain our bamboo structures to our kitchen staff who prepare delicious
              local cuisine, each person plays a vital role in creating the Keeth House experience.
            </p>
            <p className="text-foreground/90 mb-6 text-lg">
              Our team includes guest relations managers who ensure you feel welcomed, hospitality leads who oversee
              daily operations, talented chefs creating organic meals from locally-sourced ingredients, grounds managers
              who maintain our beautiful gardens, and housekeeping staff who prepare our cottages with meticulous care.
            </p>
          </div>
        </div>

        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s, transform 0.6s",
            transitionDelay: "0.5s",
          }}
          className="max-w-3xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover-shadow"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Our Values</h3>
          <p className="text-foreground/80 mb-4">Our team is united by shared values that guide everything we do:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg hover-scale">
              <h4 className="font-medium text-primary mb-2">Sustainability</h4>
              <p className="text-sm">
                We're committed to environmentally responsible practices in all aspects of our operation.
              </p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg hover-scale">
              <h4 className="font-medium text-primary mb-2">Community</h4>
              <p className="text-sm">
                We support local communities by providing employment and sourcing materials locally.
              </p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg hover-scale">
              <h4 className="font-medium text-primary mb-2">Authenticity</h4>
              <p className="text-sm">We preserve and share traditional knowledge and crafts with our guests.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
