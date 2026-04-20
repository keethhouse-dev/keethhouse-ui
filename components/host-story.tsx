"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"

export default function HostStory() {
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
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center" ref={ref}>
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-50px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}
            className="relative mx-auto md:mx-0 max-w-xs md:max-w-none"
          >
            <div className="relative z-10 overflow-hidden rounded-xl hover-scale">
              <Image
                src="/images/our-story/host.webp"
                alt="Sankar - Keeth House Host"
                width={500}
                height={700}
                className="object-cover w-full h-full hover-brightness"
              />
            </div>

            {/* Simplified decorative elements */}
            <div className="absolute -z-10 w-full h-full rounded-full border-2 border-primary/30 -top-6 -right-5" />
            <div className="absolute -bottom-4 left-8 w-16 h-16 bg-primary/20 rounded-full -z-10" />
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(50px)",
              transition: "opacity 0.6s, transform 0.6s",
              transitionDelay: "0.2s",
            }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Meet Sankar N S</h3>
            <div>
              <p className="text-foreground/90 mb-3 md:mb-4 text-base md:text-lg">
                My love for exploring new places and connecting with people has been with me since childhood. Living in
                the heart of Auroville gave me the opportunity to meet travelers from around the world, and before I
                even realized it, I had started hosting — a passion that quickly became a way of life.
              </p>
              <p className="text-foreground/90 mb-3 md:mb-4 text-base md:text-lg">
                Through Couchsurfing, I began opening my home to guests from different cultures and walks of life.
                Listening to their stories, learning about their journeys, and sharing a part of mine became an
                experience I cherished deeply.
              </p>
              <p className="text-foreground/90 mb-4 text-base md:text-lg">
                Keeth House was born from this passion — a dream nurtured by the little things I love. What began as a
                small personal project for my family and me gradually blossomed into a warm and welcoming eco-stay,
                opening its doors to guests in 2019.
              </p>
              <p className="text-foreground/90 mb-6 text-base md:text-lg">
                Rooted in a minimalist and sustainable lifestyle, Keeth House reflects my values in every detail. From
                working with local artisans to using natural, organic materials, each element was thoughtfully chosen to
                create an authentic and grounded experience.
              </p>

              <p className="text-foreground/90 mb-6 text-base md:text-lg">
                After four fulfilling years of hosting in Keeth House Phase 1, we felt inspired to grow. With months of
                planning and dedication, Keeth House Phase 2 came to life — adding three unique cottages and a cozy tree
                house, bringing our total to seven distinctive stays designed to reconnect you with nature and
                simplicity.
              </p>
              <p className="text-foreground/90 mb-6 text-base md:text-lg">
                We invite you to experience Keeth House — where every corner tells a story, and every stay feels like
                home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
