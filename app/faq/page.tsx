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
          question: "What is the check-in and check-out time?",
          answer:
            "Check-In is at 12:00 PM and Check-Out is at 10:00 AM. Early check-in or late check-out may be arranged based on availability.",
        },
        {
          question: "How far in advance should I book?",
          answer:
            "We recommend booking at least 2-3 months in advance, especially during peak season (October to March). For weekends and holidays, booking even earlier is advisable.",
        },
        {
          question: "What is your cancellation policy?",
          answer:
            "Cancellations made 14 days or more before check-in receive a full refund. Cancellations made 7-13 days before check-in receive a 50% refund. Cancellations made less than 7 days before check-in are non-refundable.",
        },
        {
          question: "Can I modify my reservation dates?",
          answer:
            "Yes, reservation modifications are possible subject to availability. Please contact us at least 7 days before your scheduled arrival to request changes.",
        },
      ],
    },
    {
      title: "Accommodations & Amenities",
      faqs: [
        {
          question: "Is there Wi-Fi available?",
          answer:
            "Yes, we provide free Wi-Fi in all our houses, except the Tree House. The connection is strong enough for remote work in most spaces. However, please note that due to our natural surroundings and eco-friendly construction, signal strength may vary slightly in some corners.",
        },
        {
          question: "Are meals included?",
          answer:
            "Meals are not included with your stay, but we offer fresh, organic vegetarian breakfast and lunch at an additional cost.\n\nBreakfast: ₹400 per couple | Timing: 8:30 AM – 10:00 AM\n\nLunch: ₹700 per couple | Timing: 12:30 PM – 1:30 PM\n\nAll meals are prepared using locally-sourced ingredients. Please place your orders in advance so we can serve you better.",
        },
        {
          question: "Do the cottages have air conditioning?",
          answer:
            "Our cottages are designed with natural cooling in mind. Most come with ceiling fans and thatch roofing, which provides excellent natural insulation. For guests who prefer air conditioning, Villa I and Villa II are equipped with eco-friendly AC units",
        },
        {
          question: "Are bathroom facilities private?",
          answer:
            "Yes, all our cottages have private bathrooms. Some feature outdoor showers or open-to-sky bathing areas for a unique nature experience, but all are completely private.",
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
          answer: "We love animals and have a few friendly dogs and cats living on the property. While we generally do not allow pets due to the surrounding wildlife and natural waterbodies, we can consider exceptions on a case-by-case basis. \n\n If you're planning to bring a pet, please ensure the following: \n\n Your pet must be kept on a leash when outdoors \n\n Bring your own pet cage/crate and food \n\n Pets are not allowed on beds or carpets \n\n They must not disturb other guests, wildlife, or our waterbodies \n\n Please reach out to us in advance if you'd like to request an exception.",
        },
        {
          question: "Is Keeth House suitable for children?",
          answer:
            "Yes, children are welcome at Keeth House. However, please note that some cottages may be more suitable than others for families. We recommend discussing your specific needs when booking.",
        },
        {
          question: "Do you accommodate special dietary requirements?",
          answer:
            "Yes, we can accommodate various dietary requirements including vegan, gluten-free, and allergies. Please inform us of any special needs when booking.",
        },
        {
          question: "Can I host a small event at Keeth House?",
          answer:
            "We’re open to hosting small, mindful gatherings such as yoga retreats or conscious travel groups. The possibility depends on the size and nature of the event, as we aim to maintain the peaceful atmosphere of our space. \n\n Please contact us directly to discuss your ideas and requirements—we’d love to see if it’s a good fit!",
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
            src="/images/faq.jpg"
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-primary mb-6">Everything you need to know about Keeth House</p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Find answers to common questions about our eco-friendly cottages, amenities, booking process, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-lg text-gray-600 mb-12">
              Browse through our comprehensive FAQ section to find answers to the most common questions about staying at
              Keeth House. If you can't find what you're looking for, please don't hesitate to{" "}
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
                    className="text-2xl font-bold mb-6 text-primary"
                  >
                    {category.title}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Accordion type="single" collapsible className="bg-white rounded-lg border shadow-sm mb-8">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem
                          key={`${categoryIndex}-${faqIndex}`}
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border-b last:border-b-0"
                        >
                          <AccordionTrigger className="px-4 py-4 hover:text-primary text-base font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 text-gray-600 whitespace-pre-line">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Still Have Questions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 p-8 bg-primary/10 rounded-xl text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Please feel free to contact our friendly team.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:hello@keethhouse.com"
                  className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  Email Us
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 bg-white border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors"
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
