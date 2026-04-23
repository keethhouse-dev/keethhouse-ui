"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, Shield, Cookie, FileText, Lock, Eye, UserCheck } from "lucide-react"

export default function PrivacyPolicyPage() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  // Sections for the table of contents
  const sections = [
    { id: "information-collection", title: "Information Collection", icon: FileText },
    { id: "information-usage", title: "How We Use Your Information", icon: Eye },
    { id: "data-protection", title: "Data Protection", icon: Shield },
    { id: "cookies", title: "Cookies Policy", icon: Cookie },
    { id: "third-parties", title: "Third-Party Services", icon: UserCheck },
    { id: "your-rights", title: "Your Rights", icon: Lock },
    { id: "updates", title: "Updates to This Policy", icon: Calendar },
    { id: "contact", title: "Contact Us", icon: Mail },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
    setMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const lastUpdated = "March 15, 2025"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={containerRef} className="relative h-[40vh] md:h-[50vh] flex items-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
        >
          <Image
            src="/images/privacy-policy.webp"
            alt="Keeth House Privacy Policy"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
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
              Your privacy matters
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
              Privacy Policy
            </h1>
            <div aria-hidden className="h-px bg-white/35 w-10 mx-auto mb-5" />
            <p className="text-[13px] leading-[1.65] text-white/90 max-w-2xl mx-auto">
              How we collect, use, and protect your personal information.
            </p>
            <p
              className="uppercase text-white/60 mt-6"
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.22em",
                fontWeight: 500,
              }}
            >
              Last updated {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar — Table of Contents */}
            <div className="lg:w-1/4">
              <div className="sticky top-32 border-l border-[var(--story-ink)]/15 pl-6">
                <p
                  className="uppercase text-[var(--story-ink)]/85 mb-4"
                  style={{
                    letterSpacing: "0.32em",
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  Contents
                </p>
                <ul className="space-y-2.5">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className="flex items-start text-left w-full text-[13px] text-[var(--story-ink)]/75 hover:text-[var(--story-ink)] transition-colors"
                      >
                        <section.icon className="h-3.5 w-3.5 mr-2.5 mt-[3px] flex-shrink-0 text-[var(--story-ink)]/60" />
                        <span>{section.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="max-w-none text-[13px] leading-[1.75] text-[var(--story-ink)]/90 [&_p]:mb-4 [&_ul]:mb-6 [&_ul]:space-y-1 [&_li]:leading-[1.75] [&_strong]:font-medium [&_strong]:text-[var(--story-ink)]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[13px] leading-[1.75] text-[var(--story-ink)] mb-10">
                    At Keeth House, we are committed to protecting your privacy and ensuring the security of your
                    personal information. This Privacy Policy outlines our practices regarding the collection, use, and
                    disclosure of your information when you use our services.
                  </p>

                  <div className="border-l-2 border-[var(--story-ink)]/20 pl-6 mb-14">
                    <p
                      className="uppercase text-[var(--story-ink)]/85 mb-4"
                      style={{
                        letterSpacing: "0.32em",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      Quick Summary
                    </p>
                    <ul className="space-y-2 text-[13px] leading-[1.65] text-[var(--story-ink)]/90">
                      <li>We collect information you provide when making reservations or contacting us.</li>
                      <li>We use your information to process bookings and enhance your stay experience.</li>
                      <li>We implement security measures to protect your personal data.</li>
                      <li>We use cookies to improve website functionality and user experience.</li>
                      <li>You have rights regarding your personal information, including access and deletion.</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Information Collection Section */}
                <section id="information-collection" className="mb-12 scroll-mt-32">
                  <div className="flex items-center mb-4">
                    <FileText className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <h2
                      className="inline-flex text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.2,
                      }}
                    >Information Collection</h2>
                  </div>
                  <div className="pl-9">
                    <p>
                      We collect several types of information from and about users of our website and services,
                      including:
                    </p>

                    <h3
                      className="mt-8 mb-3 text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.3,
                      }}
                    >Personal Information</h3>
                    <p>When you make a reservation or contact us, we may collect:</p>
                    <ul className="list-disc pl-6 space-y-1 mb-6">
                      <li>Name, email address, phone number, and postal address</li>
                      <li>Payment information (processed securely through our payment providers)</li>
                      <li>Identification details for check-in purposes</li>
                      <li>Special requests or preferences related to your stay</li>
                      <li>Communication records when you contact our customer service</li>
                    </ul>

                    <h3
                      className="mt-8 mb-3 text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.3,
                      }}
                    >Automatically Collected Information</h3>
                    <p>When you visit our website, we automatically collect:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>IP address and device information</li>
                      <li>Browser type and operating system</li>
                      <li>Pages visited and time spent on our website</li>
                      <li>Referring websites or sources</li>
                      <li>Location information (if enabled on your device)</li>
                    </ul>
                  </div>
                </section>

                {/* Information Usage Section */}
                <section id="information-usage" className="mb-12 scroll-mt-32">
                  <div className="flex items-center mb-4">
                    <Eye className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <h2
                      className="inline-flex text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.2,
                      }}
                    >How We Use Your Information</h2>
                  </div>
                  <div className="pl-9">
                    <p>We use the information we collect for various purposes, including:</p>

                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>
                        <strong>Reservation Processing:</strong> To confirm and manage your booking, process payments,
                        and provide customer service.
                      </li>
                      <li>
                        <strong>Communication:</strong> To respond to your inquiries, send booking confirmations, and
                        provide important information about your stay.
                      </li>
                      <li>
                        <strong>Personalization:</strong> To customize your experience and provide tailored
                        recommendations based on your preferences.
                      </li>
                      <li>
                        <strong>Improvement:</strong> To analyze usage patterns and improve our website, services, and
                        overall guest experience.
                      </li>
                      <li>
                        <strong>Marketing:</strong> With your consent, to send promotional materials about special
                        offers or events. You can opt out of marketing communications at any time.
                      </li>
                      <li>
                        <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal
                        processes.
                      </li>
                    </ul>

                    <p>
                      We will only retain your personal information for as long as necessary to fulfill the purposes for
                      which it was collected, including for legal, accounting, or reporting requirements.
                    </p>
                  </div>
                </section>

                {/* Data Protection Section */}
                <section id="data-protection" className="mb-12 scroll-mt-32">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <h2
                      className="inline-flex text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.2,
                      }}
                    >Data Protection</h2>
                  </div>
                  <div className="pl-9">
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal
                      information against unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h3
                      className="mt-8 mb-3 text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.3,
                      }}
                    >Security Measures</h3>
                    <ul className="list-disc pl-6 space-y-1 mb-6">
                      <li>Secure Socket Layer (SSL) encryption for data transmission</li>
                      <li>Regular security assessments and updates</li>
                      <li>Access controls and authentication procedures</li>
                      <li>Staff training on data protection and privacy practices</li>
                      <li>Physical security measures at our properties and offices</li>
                    </ul>

                    <p>
                      While we strive to protect your personal information, no method of transmission over the Internet
                      or electronic storage is 100% secure. We cannot guarantee absolute security but continuously work
                      to enhance our protective measures.
                    </p>
                  </div>
                </section>

                {/* Cookies Policy Section */}
                <section id="cookies" className="mb-12 scroll-mt-32">
                  <div className="flex items-center mb-4">
                    <Cookie className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <h2
                      className="inline-flex text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.2,
                      }}
                    >Cookies Policy</h2>
                  </div>
                  <div className="pl-9">
                    <p>
                      Our website uses cookies and similar technologies to enhance your browsing experience and analyze
                      website traffic.
                    </p>

                    <h3
                      className="mt-8 mb-3 text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.3,
                      }}
                    >Types of Cookies We Use</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>
                        <strong>Essential Cookies:</strong> Required for basic website functionality and security.
                      </li>
                      <li>
                        <strong>Preference Cookies:</strong> Remember your settings and preferences for future visits.
                      </li>
                      <li>
                        <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.
                      </li>
                      <li>
                        <strong>Marketing Cookies:</strong> Track visitors across websites to display relevant
                        advertisements.
                      </li>
                    </ul>

                    <p>
                      You can control cookies through your browser settings. However, disabling certain cookies may
                      limit your ability to use some features of our website.
                    </p>
                  </div>
                </section>

                {/* Third-Party Services Section */}
                <section id="third-parties" className="mb-12 scroll-mt-32">
                  <div className="flex items-center mb-4">
                    <UserCheck className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <h2
                      className="inline-flex text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.2,
                      }}
                    >Third-Party Services</h2>
                  </div>
                  <div className="pl-9">
                    <p>
                      We may use third-party service providers to assist us in operating our website, conducting our
                      business, or providing services to you.
                    </p>

                    <h3
                      className="mt-8 mb-3 text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.3,
                      }}
                    >Our Partners Include</h3>
                    <ul className="list-disc pl-6 space-y-1 mb-6">
                      <li>Payment processors for secure transaction handling</li>
                      <li>Booking platforms and reservation systems</li>
                      <li>Analytics providers to help us improve our website</li>
                      <li>Email service providers for communication</li>
                      <li>Customer support tools</li>
                    </ul>

                    <p>
                      These third parties have access to your personal information only to perform specific tasks on our
                      behalf and are obligated not to disclose or use it for any other purpose. They have their own
                      privacy policies which we encourage you to review.
                    </p>
                  </div>
                </section>

                {/* Your Rights Section */}
                <section id="your-rights" className="mb-12 scroll-mt-32">
                  <div className="flex items-center mb-4">
                    <Lock className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <h2
                      className="inline-flex text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.2,
                      }}
                    >Your Rights</h2>
                  </div>
                  <div className="pl-9">
                    <p>Depending on your location, you may have certain rights regarding your personal information:</p>

                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>
                        <strong>Access:</strong> You can request copies of your personal information we hold.
                      </li>
                      <li>
                        <strong>Rectification:</strong> You can ask us to correct inaccurate or incomplete information.
                      </li>
                      <li>
                        <strong>Erasure:</strong> You can request that we delete your personal information in certain
                        circumstances.
                      </li>
                      <li>
                        <strong>Restriction:</strong> You can ask us to restrict the processing of your information.
                      </li>
                      <li>
                        <strong>Data Portability:</strong> You can request a copy of your data in a machine-readable
                        format.
                      </li>
                      <li>
                        <strong>Objection:</strong> You can object to our processing of your personal information.
                      </li>
                    </ul>

                    <p>
                      To exercise any of these rights, please contact us using the details provided in the Contact
                      section. We will respond to your request within the timeframe required by applicable law.
                    </p>
                  </div>
                </section>

                {/* Updates to Policy Section */}
                <section id="updates" className="mb-12 scroll-mt-32">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <h2
                      className="inline-flex text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.2,
                      }}
                    >Updates to This Policy</h2>
                  </div>
                  <div className="pl-9">
                    <p>
                      We may update this Privacy Policy from time to time to reflect changes in our practices or for
                      other operational, legal, or regulatory reasons.
                    </p>

                    <p className="mt-4">
                      When we make changes, we will update the "Last Updated" date at the top of this policy and notify
                      you through a notice on our website or by email if the changes are significant.
                    </p>

                    <p className="mt-4">
                      We encourage you to review this policy periodically to stay informed about how we protect your
                      information.
                    </p>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="mb-12 scroll-mt-32">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <h2
                      className="inline-flex text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.2,
                      }}
                    >Contact Us</h2>
                  </div>
                  <div className="pl-9">
                    <p>
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                      practices, please contact us at:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mt-4 mb-6">
                      <p className="font-medium">Keeth House</p>
                      <p>Near Auroville, Tamil Nadu, India</p>
                      <p>
                        Email:{" "}
                        <a href="mailto:reservations@keethhouse.in" className="text-primary hover:underline">
                          reservations@keethhouse.in
                        </a>
                      </p>
                      <p>Phone: +91 8124338124</p>
                    </div>
                    <p>
                      We will make every effort to respond to your inquiry promptly and address your concerns
                      thoroughly.
                    </p>
                  </div>
                </section>

                {/* Final Note — editorial close */}
                <div className="mt-16 pt-8 border-t border-[var(--story-ink)]/15 text-center">
                  <p
                    className="max-w-xl mx-auto text-[13px] leading-[1.65] text-[var(--story-ink)]/90 italic"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    By using our website and services, you acknowledge that you have read and understood this Privacy
                    Policy.
                  </p>
                </div>

                {/* Back to Top */}
                <div className="text-center mt-12">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="inline-flex items-center uppercase text-[var(--story-ink)] border-b border-[var(--story-ink)]/30 pb-1 hover:text-primary hover:border-primary transition-colors"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.28em",
                      fontWeight: 500,
                    }}
                  >
                    Back to Top
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
