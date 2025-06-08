"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import HostStory from "@/components/host-story";
import { Star, Award, Trophy } from "lucide-react";
import TeamSection from "@/components/team-section";
import { useSimpleParallax } from "@/hooks/use-simple-parallax";
import { motion } from "framer-motion";

export default function OurStoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const { y: parallaxY } = useSimpleParallax({ speed: 0.3 });

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SmoothScrollProvider>
      <div
        style={{ opacity: isMounted ? 1 : 0, transition: "opacity 0.5s" }}
        className="flex flex-col min-h-screen"
      >
        {/* Hero Section */}
        <section
          ref={containerRef}
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Background Image with Simple Parallax Effect */}
          <div
            className="absolute inset-0 z-0"
            style={{
              transform: `translateY(${parallaxY}px)`,
              transition: "transform 0.1s linear",
            }}
          >
            <Image
              src="/images/our-story/people.jpeg"
              alt="Keeth House Team Members"
              fill
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"
              style={{ opacity: isMounted ? 1 : 0, transition: "opacity 1.5s" }}
            />

            {/* Simple dot overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255, 255, 255, 0.1) 0.4px, transparent 0.4px)",
                backgroundSize: "3px 3px",
                opacity: isMounted ? 1 : 0,
                transition: "opacity 1.5s",
              }}
            />
          </div>

          {/* Content with simplified animations */}
          <div className="container mx-auto px-4 relative z-10 pt-20">
            <div
              className="max-w-4xl mx-auto text-center"
              style={{
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s, transform 0.8s",
              }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                Our Journey
              </h1>

              <div
                className="h-1 bg-primary mx-auto mb-8"
                style={{
                  width: isMounted ? "100px" : "0",
                  transition: "width 1s ease",
                }}
              />

              <p className="text-xl md:text-2xl text-primary mb-8">
                "FROM VISION TO REALITY"
              </p>

              <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
                Discover how Keeth House evolved from a dream to a sanctuary of
                natural living, built by hand with traditional techniques and a
                deep respect for nature.
              </p>

              <Button
                onClick={scrollToStory}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white hover-scale px-8 py-6 text-lg"
              >
                <span className="flex items-center">
                  Discover Our Story
                  <ArrowDown className="ml-2 h-5 w-5 animate-pulse" />
                </span>
              </Button>
            </div>
          </div>

          {/* Simple scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="text-white text-sm font-medium mb-2 tracking-wider"
              >
                Scroll to explore
              </motion.span>
              <motion.div
                className="h-16 w-10 border border-white/50 rounded-full flex justify-center p-2 backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(255, 255, 255, 0)",
                    "0 0 0 4px rgba(255, 255, 255, 0.1)",
                    "0 0 0 0 rgba(255, 255, 255, 0)",
                  ],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                    height: ["20%", "40%", "20%"],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="bg-primary w-1 rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Story Section */}
        <section ref={storyRef} className="py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-2 opacity-0 animate-slide-up"
                  style={{
                    animationPlayState: isMounted ? "running" : "paused",
                  }}
                >
                  Our Story
                </h2>
                <div
                  className="h-1 bg-primary mx-auto mb-12 w-0 transition-all duration-500"
                  style={{ width: isMounted ? "5rem" : "0" }}
                />
              </div>

              <div className="space-y-32">
                {/* Chapter 1: The Beginning */}
                <StoryChapter
                  title="The Beginning"
                  content="Every story has a beginning, and ours started with a yearning to escape the chaos of city life. After years in the corporate world, our founder Sankar felt a deep calling to return to his roots in Tamil Nadu. He discovered a pristine piece of land near Auroville, where the air was fresh and the sounds of nature replaced the constant hum of urban life."
                  imageSrc="/images/our-story/beginning.jpeg"
                  imageAlt="Sankar working with power tools during the early construction of Keeth House"
                  imagePosition="right"
                />

                {/* Chapter 2: The Keeth */}
                <StoryChapter
                  title="The Keeth"
                  content="'Keeth' refers to the traditional thatch roofing that has been used in Tamil villages for centuries. This ancient technique not only provides natural cooling but also connects us to the wisdom of our ancestors. Working with local artisans, we revived these forgotten building methods, using bamboo, thatch, and other natural materials to create structures that breathe with the environment."
                  imageSrc="/images/our-story/keeth.jpeg"
                  imageAlt="Local artisans preparing traditional thatch materials for Keeth House roofing"
                  imagePosition="left"
                />

                {/* Chapter 3: The Land */}
                <StoryChapter
                  title="The Land"
                  content="Our land is more than just a property; it's a living ecosystem that we've carefully nurtured. What began as a barren plot has transformed into a lush haven of biodiversity. We've planted hundreds of native trees, created water harvesting systems, and established organic gardens. The land has responded generously, blessing us with clean air, abundant bird life, and a sense of peace that's increasingly rare in our modern world."
                  imageSrc="/images/our-story/land.jpeg"
                  imageAlt="Aerial view of Keeth House property nestled in lush greenery"
                  imagePosition="right"
                />

                {/* Chapter 4: The People */}
                <StoryChapter
                  title="The People"
                  content="Keeth House is built on relationships. From the skilled craftsmen who shaped each bamboo pole to the local farmers who supply our kitchen, we've created a community bound by shared values. Our guests become part of this story too, bringing their own experiences and leaving with new perspectives. We believe that in an age of digital disconnection, these authentic human connections are more valuable than ever."
                  imageSrc="/images/our-story/people.jpeg"
                  imageAlt="Local craftsmen working on traditional thatched roofing for Keeth House"
                  imagePosition="left"
                />

                {/* Chapter 5: The Experience */}
                <StoryChapter
                  title="The Experience"
                  content="What began as a personal sanctuary gradually evolved into Keeth House as we know it today. We don't offer luxury in the conventional sense, but something far more precious – a genuine connection with nature, a slower pace of life, and the simple joy of waking up to birdsong. Each cottage tells its own story, inviting you to become part of a narrative that stretches back through generations while creating new memories that will last a lifetime."
                  imageSrc="/images/our-story/experience.jpeg"
                  imageAlt="Woman in yellow dress experiencing the serene atmosphere of Keeth House"
                  imagePosition="right"
                />
              </div>

              <HostStory />

              <TeamSection />

              {/* Recognition and Awards Section */}
              <section
                id="recognition"
                className="mt-32 py-16 bg-gray-50 rounded-3xl"
              >
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2
                      className="text-3xl sm:text-4xl font-bold mb-2 opacity-0 animate-slide-up"
                      style={{
                        animationPlayState: isMounted ? "running" : "paused",
                      }}
                    >
                      Recognition & Awards
                    </h2>
                    <div
                      className="h-1 bg-primary mx-auto mb-6 w-0 transition-all duration-500"
                      style={{ width: isMounted ? "5rem" : "0" }}
                    />
                    <p
                      className="max-w-2xl mx-auto text-foreground/80 opacity-0 animate-fade-in"
                      style={{
                        animationDelay: "0.3s",
                        animationFillMode: "forwards",
                        animationPlayState: isMounted ? "running" : "paused",
                      }}
                    >
                      Discover how Keeth House has been recognized across
                      leading booking platforms for our commitment to
                      sustainable living and exceptional guest experiences.
                    </p>
                  </div>

                  {/* Booking Platform Awards - Airbnb and Make My Trip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Airbnb Award */}
                    <div
                      className="bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-6 flex items-center opacity-0 animate-slide-up hover-shadow"
                      style={{
                        animationDelay: "0.1s",
                        animationFillMode: "forwards",
                        animationPlayState: isMounted ? "running" : "paused",
                      }}
                    >
                      <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 mr-4 md:mr-6">
                        <Image
                          src="/images/airbnb-logo.svg"
                          alt="Airbnb logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Airbnb</h3>
                        <div className="flex items-center mb-2">
                          <Award className="h-4 w-4 text-primary mr-1" />
                          <p className="text-gray-700 font-medium">
                            Superhost Status
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-primary fill-primary"
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 font-medium">4.9/5</p>
                        </div>
                      </div>
                    </div>

                    {/* Make My Trip Award */}
                    <div
                      className="bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-6 flex items-center opacity-0 animate-slide-up hover-shadow"
                      style={{
                        animationDelay: "0.2s",
                        animationFillMode: "forwards",
                        animationPlayState: isMounted ? "running" : "paused",
                      }}
                    >
                      <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 mr-4 md:mr-6">
                        <Image
                          src="/images/mt-award.jpeg"
                          alt="Make My Trip Unique Homestay of the Year 2022 Award for Keeth House"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Make My Trip</h3>
                        <div className="flex items-center mb-2">
                          <Award className="h-4 w-4 text-primary mr-1" />
                          <p className="text-gray-700 font-medium">
                            Unique Homestay of the Year 2022
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-primary fill-primary"
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 font-medium">
                            Exceptional
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Airbnb Feature */}
                  <div
                    className="mt-12 bg-primary/10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto opacity-0 animate-slide-up hover-shadow"
                    style={{
                      animationDelay: "0.3s",
                      animationFillMode: "forwards",
                      animationPlayState: isMounted ? "running" : "paused",
                    }}
                  >
                    <div className="flex items-start mb-4">
                      <Trophy className="h-10 w-10 text-primary mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-xl mb-2">
                          Airbnb Featured Property
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          Keeth House I was the first property from India to be
                          featured on Airbnb's Social Media Platforms which drew
                          global attention to Keeth House and maintaining a
                          Superhost title for around 6 years now.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-primary hover-scale">
                        Keeth House I
                      </div>
                      <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-primary hover-scale">
                        First from India
                      </div>
                      <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-primary hover-scale">
                        Superhost for 6 Years
                      </div>
                    </div>
                  </div>

                  {/* Award Description */}
                  <div
                    className="mt-8 bg-primary/10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto opacity-0 animate-slide-up hover-shadow"
                    style={{
                      animationDelay: "0.4s",
                      animationFillMode: "forwards",
                      animationPlayState: isMounted ? "running" : "paused",
                    }}
                  >
                    <div className="flex items-start mb-4">
                      <Trophy className="h-10 w-10 text-primary mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-xl mb-2">
                          Award-Winning Properties
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          Awarded twice by Times of India and Make My Trip for
                          Keeth House II and The Khaya Nest under top 10 unique
                          homestays in India out of 7500 properties.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-primary hover-scale">
                        Keeth House II
                      </div>
                      <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-primary hover-scale">
                        The Khaya Nest
                      </div>
                      <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-primary hover-scale">
                        Top 10 Unique Homestays
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div
                className="mt-32 text-center opacity-0 animate-slide-up"
                style={{
                  animationDelay: "0.5s",
                  animationFillMode: "forwards",
                  animationPlayState: isMounted ? "running" : "paused",
                }}
              >
                <Link href="/">
                  <Button
                    size="lg"
                    onClick={() => window.scrollTo(0, 0)}
                    className="bg-primary hover:bg-primary/90 text-white hover-scale px-8 py-6 text-lg"
                  >
                    <span className="flex items-center">
                      Explore Our Houses
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ScrollToTop />
    </SmoothScrollProvider>
  );
}

// Story Chapter Component - Simplified
function StoryChapter({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "right",
}: {
  title: string;
  content: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"
      } gap-12 md:gap-16 items-center`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s, transform 0.8s",
      }}
    >
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          {title}
        </h3>
        <p className="text-lg text-foreground/80">{content}</p>
      </div>
      <div className="w-full md:w-1/2 relative">
        <div className="relative overflow-hidden rounded-xl hover-scale">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={600}
            height={450}
            className="object-cover w-full h-full hover-brightness"
          />
        </div>

        {/* Simplified decorative elements */}
        <div
          className={`absolute -z-10 w-full h-full rounded-full border-2 border-primary/30 ${
            imagePosition === "right" ? "-top-6 -left-6" : "-top-6 -right-6"
          }`}
        />

        <div
          className={`absolute ${
            imagePosition === "right" ? "-bottom-4 right-8" : "-bottom-4 left-8"
          } w-16 h-16 bg-primary/20 rounded-full -z-10`}
        />
      </div>
    </div>
  );
}
