"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function FAQPage() {
  const [mounted, setMounted] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<string | null>("item-0")
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    window.scrollTo(0, 0)
    setMounted(true)
  }, [])

  // FAQ categories
const faqCategories = [
  {
    title: "Booking & Reservations",
    faqs: [
      {
        question: "What are the check-in and check-out timings?",
        answer:
          "Check-in time is 12 pm and Check-out time is 10 am.",
      },
      {
        question: "Is early check-in possible?",
        answer:
          "Your early check-in request is important to us, and we would love to accommodate it based on the availability. Kindly check with us a day prior to the reservation. However, please note that we might have a booking scheduled prior to your arrival, which means we can only provide you with access to the house by 12 pm. \n\nWe kindly request your understanding and cooperation in planning your arrival accordingly for 12pm. Your cooperation is greatly appreciated.",
      },
      {
        question: "How early should I book my stay at Keeth House?",
        answer:
          "We recommend booking a month or 2 in advance, especially during the peak season (October to March). For weekends and holidays, it’s best to book even earlier to ensure availability.",
      },
      {
        question: "What is the cancellation policy?",
        answer:
          "If cancellation is done 14 or more days prior to arrival, then 10% of the booking amount will be charged. If cancellation is done within 14 days of arrival, then full amount will be charged.",
      },
      {
        question: "Can I change my booking dates after confirmation?",
        answer:
          "Date Amendment Policy \n\nIf a date change is requested 14 or more days prior to arrival, we will do our best to accommodate the change, subject to availability. If the request is made within 14 days of arrival, no amendments can be made.",
      },
    ],
  },
  {
    title: "Accommodations & Amenities",
    faqs: [
      {
        question: "Is there Wi-Fi available?",
        answer:
          "Yes, we offer Wi-Fi in all our houses, except the Khaya Nest, where the connectivity is limited. In most areas, the connection is suitable for remote work.",
      },
      {
        question: "Are meals included in the stay?",
        answer:
          "We’re delighted to offer South Indian breakfast and lunch. \n\n• Breakfast: ₹400 per couple \n• Lunch: ₹700 per couple \n\nPlease inform us at least a day in advance so we can prepare your meals with care. \n\nWe’d also be glad to suggest some excellent cafés in Auroville and Pondicherry for you to explore during your stay.",
      },
      {
        question: "What’s the weather like at Keeth House?",
        answer:
          "Keeth House is designed with eco-conscious materials that help maintain comfort even during warm days. While afternoons can be slightly hot, the evenings are pleasant. Surrounded by trees, the natural setting creates a noticeable temperature drop at night—perfect for a relaxing and restful stay.\n\nFor added comfort, de Villa I and de Villa II in Keeth House Phase III are equipped with air-conditioning.",
      },
      {
        question: "Does Keeth House have private bathrooms?",
        answer:
          "Yes, all our houses have private bathrooms. Some feature open-to-sky showers and bathtubs for a unique and refreshing experience with nature, while still ensuring complete privacy.",
      },
    ],
  },
  {
    title: "Location & Transportation",
    faqs: [
      {
        question: "How do I get to Keeth House?",
        answer:
          "We are located near Auroville, Tamil Nadu. Detailed directions will be provided after booking. Airport transfers can be arranged at an additional cost.",
      },
      {
        question: "How far is Keeth House from Pondicherry?",
        answer:
          "We are approximately 15-25 minutes from Pondicherry by car, depending on which phase of Keeth House you're staying at.",
      },
      {
        question: "Is there parking available?",
        answer: "Yes, we offer free parking for our guests. The parking area is located near the reception.",
      },
      {
        question: "Can you arrange transportation for local sightseeing?",
        answer:
          "Yes, we can arrange taxis, auto-rickshaws, or scooter rentals for local sightseeing. Please inform the reception in advance to make arrangements.",
      },
    ],
  },
  {
    title: "Activities & Experiences",
    faqs: [
      {
        question: "What activities are available?",
        answer:
          "We offer yoga sessions, nature walks, bird watching, cooking classes, and cultural experiences. Auroville and nearby beaches are also easily accessible.",
      },
      {
        question: "Can I book activities in advance?",
        answer:
          "Yes, we recommend booking activities at least 24 hours in advance. Some seasonal activities may require earlier booking.",
      },
      {
        question: "Are there any nearby attractions?",
        answer:
          "Yes, Auroville, Pondicherry's French Quarter, Matrimandir, and several beaches are within easy reach. We can provide recommendations based on your interests.",
      },
    ],
  },
  {
    title: "Policies & Special Requests",
    faqs: [
      {
        question: "Are pets allowed?",
        answer: "Unfortunately, we’re not a pet-friendly property, as we already have resident animals at Keeth House. In rare cases, pets may be allowed only with prior host approval and upon agreeing to clear guidelines and additional charges.\n\nThank you for understanding and helping us maintain a respectful environment for all.",
      },
      {
        question: "Is Keeth House suitable for children?",
        answer:
          "Yes, children are welcome and Keeth House is safe under parental supervision. Some cottages are more family-friendly than others, so we recommend discussing your needs with us while booking.",
      },
      {
        question: "Do you accommodate special dietary requirements?",
        answer:
          "We can accommodate dietary preferences, including vegan, and allergy-specific needs. Please share your requirements with us when booking.",
      },
      {
        question: "Can I host a small event at Keeth House?",
        answer:
          "We’re open to hosting small, mindful gatherings such as yoga retreats or conscious travel groups. To maintain the peaceful atmosphere of Keeth House, events are considered based on nature and group size.\n\nPlease contact us directly to discuss your vision—we’d love to explore if it’s a good fit.",
      },
      {
        question: "Can I do a photoshoot at Keeth House?",
        answer:
          "Photoshoots are allowed only with prior approval and after discussing the guidelines with our team. A fee of ₹5,000 applies, and shoots are limited to Keeth House – Phase II and Phase III.\n\nKey guidelines include:\n\n– Max team size of 5 (including guests/photographers)\n– No plug-in lighting or decorations\n– Shoots must be limited to the booked house only\n– Common areas are not permitted for shoots\n– Furniture must not be moved\n\nNon-compliance will lead to immediate cancellation of the shoot without refund.",
      },
    ],
  },
]


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={containerRef} className="relative h-[50vh] md:h-[60vh] flex items-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
        >
          <Image
            src="/images/faq.webp"
            alt="Keeth House FAQ Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p
              className="uppercase text-white/80 mb-5"
              style={{
                letterSpacing: "0.32em",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Guest Guide
            </p>
            <h1
              className="text-white mb-5"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                fontWeight: 500,
                letterSpacing: "0.005em",
                lineHeight: 1.1,
              }}
            >
              Frequently Asked Questions
            </h1>
            <div aria-hidden className="h-px bg-white/35 w-10 mx-auto mb-5" />
            <p className="text-[13px] leading-[1.65] text-white/90 max-w-2xl mx-auto">
              Everything you need to know about our eco-friendly cottages, amenities, and booking process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-[13px] leading-[1.65] text-[var(--story-ink)]/90 mb-14 max-w-2xl mx-auto">
              Browse through our FAQ to find answers to the most common questions about staying at Keeth House. If you
              can&apos;t find what you&apos;re looking for, please{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact us
              </a>
              .
            </p>

            {/* FAQ Categories */}
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-[var(--story-ink)] mb-5"
                    style={{
                      fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                      fontWeight: 500,
                      letterSpacing: "0.005em",
                      lineHeight: 1.25,
                    }}
                  >
                    {category.title}
                  </motion.h2>
                  <div aria-hidden className="h-px bg-[var(--story-ink)]/15 w-8 mb-6" />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Accordion type="single" collapsible className="mb-10">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem
                          key={`${categoryIndex}-${faqIndex}`}
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border-b border-[var(--story-ink)]/12 last:border-b-0"
                        >
                          <AccordionTrigger
                            className="py-4 hover:text-primary text-[var(--story-ink)]"
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                              letterSpacing: "0.005em",
                            }}
                          >
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-5 text-[13px] leading-[1.65] text-[var(--story-ink)]/90 whitespace-pre-line">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Still Have Questions — editorial close */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-20 text-center"
            >
              <div aria-hidden className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto mb-6" />
              <h2
                className="text-[var(--story-ink)] mb-4"
                style={{
                  fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                  fontWeight: 500,
                  letterSpacing: "0.005em",
                  lineHeight: 1.2,
                }}
              >
                Still have questions?
              </h2>
              <p className="text-[13px] leading-[1.65] text-[var(--story-ink)]/90 max-w-xl mx-auto mb-7">
                Can&apos;t find the answer you&apos;re looking for? Please feel free to reach out to our team.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:reservations@keethhouse.in"
                  className="inline-flex items-center justify-center uppercase px-6 py-3 bg-[var(--story-ink)] text-white hover:bg-[var(--story-ink)]/90 transition-colors"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.28em",
                    fontWeight: 500,
                  }}
                >
                  Email Us
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center uppercase px-6 py-3 border border-[var(--story-ink)]/30 text-[var(--story-ink)] hover:border-[var(--story-ink)] transition-colors"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.28em",
                    fontWeight: 500,
                  }}
                >
                  Contact Page
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
