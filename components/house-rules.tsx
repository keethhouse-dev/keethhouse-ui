"use client"
import {
  Cigarette,
  Leaf,
  VolumeX,
  Wine,
  Footprints,
  Camera,
  Armchair,
  PawPrint,
  Baby,
  Shield,
  Flame,
} from "lucide-react"
import { SmoothFadeElement } from "./smooth-fade-element"

export function HouseRules() {
  const houseRules = [
    {
      icon: Cigarette,
      title: "No Smoking",
      description:
        "No smoking or drug use inside the cottages or anywhere on the property, except in designated smoking areas.",
    },
    {
      icon: Wine,
      title: "Alcohol Policy",
      description: "We do not sell alcohol, but guests are welcome to bring their own and consume it responsibly.",
    },
    {
      icon: Footprints,
      title: "No Shoes Indoors",
      description: "No shoes inside the cottages or the Tree House—let's keep the indoor spaces clean and cozy.",
    },
    {
      icon: Armchair,
      title: "Furniture Arrangement",
      description: "Please do not move furniture around, as each setup is carefully curated for comfort and flow.",
    },
    {
      icon: Camera,
      title: "Photography Policy",
      description: "No commercial shoots or vlogging without prior written approval from the host.",
    },
    {
      icon: VolumeX,
      title: "Noise Policy",
      description: "This is a noise-free zone—please avoid loud music or disturbances, especially in the evenings.",
    },
    {
      icon: Leaf,
      title: "Environmental Care",
      description: "Help us care for the environment by avoiding plastic and not using food delivery apps.",
    },
  ]

  const safetyMeasures = [
    {
      icon: PawPrint,
      title: "Pet Policy",
      description:
        "Pets are allowed only in exceptional cases, with prior written approval from the host. Please refer to our FAQs for detailed pet guidelines.",
    },
    {
      icon: Baby,
      title: "Child Safety",
      description:
        "Children must be supervised by parents at all times, especially around the Tree House, bathtubs, and swimming pool areas.",
    },
    {
      icon: Leaf,
      title: "Wildlife Respect",
      description:
        "Do not harm or disturb the wildlife, including frogs, spiders, and other creatures. They are part of our natural ecosystem and should be respected.",
    },
    {
      icon: Flame,
      title: "Fire Safety",
      description:
        "Fire extinguishers are placed around the premises. Please use them if needed, and always remain cautious when near open flames.",
    },
    {
      icon: Shield,
      title: "General Safety",
      description:
        "Your safety and the well-being of all guests are very important to us. Thank you for being mindful and respectful during your stay.",
    },
  ]

  return (
    <section className="py-16 md:py-24 [background-color:var(--story-paper)] relative" id="house-rules">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <SmoothFadeElement direction="up">
            <p
              className="uppercase text-[var(--story-ink)]/85 mb-5"
              style={{
                letterSpacing: "0.32em",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Stay With Care
            </p>
          </SmoothFadeElement>
          <SmoothFadeElement direction="up" delay={0.05}>
            <h2
              className="text-[var(--story-ink)] mb-5"
              style={{
                fontSize: "clamp(1.45rem, 2.2vw, 1.9rem)",
                fontWeight: 500,
                letterSpacing: "0.005em",
                lineHeight: 1.15,
              }}
            >
              House Rules & Safety Measures
            </h2>
          </SmoothFadeElement>
          <SmoothFadeElement direction="up" delay={0.1}>
            <div aria-hidden className="h-px bg-[var(--story-ink)]/15 mx-auto mb-6 w-10" />
          </SmoothFadeElement>
          <SmoothFadeElement direction="up" delay={0.2}>
            <p className="max-w-xl mx-auto text-[13px] leading-[1.65] text-[var(--story-ink)]/90">
              To ensure a peaceful, safe, and respectful environment for all guests, we kindly ask you to follow these
              guidelines during your stay.
            </p>
          </SmoothFadeElement>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* House Rules Section */}
          <SmoothFadeElement direction="up" delay={0.3}>
            <h3
              className="text-[var(--story-ink)] mb-6 text-center"
              style={{
                fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                fontWeight: 500,
                letterSpacing: "0.005em",
                lineHeight: 1.25,
              }}
            >
              House Rules
            </h3>
          </SmoothFadeElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mb-14">
            {houseRules.map((rule, index) => (
              <SmoothFadeElement
                key={rule.title}
                direction="up"
                delay={0.1 + index * 0.05}
                className="pt-5 border-t border-[var(--story-ink)]/15"
              >
                <div className="flex items-start">
                  <rule.icon className="h-4 w-4 mr-3 mt-1 text-[var(--story-ink)]/60 flex-shrink-0" />
                  <div>
                    <h3
                      className="text-[var(--story-ink)] mb-2"
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.25,
                      }}
                    >
                      {rule.title}
                    </h3>
                    <p className="text-[13px] leading-[1.65] text-[var(--story-ink)]/90">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </SmoothFadeElement>
            ))}
          </div>

          {/* Safety Measures Section */}
          <SmoothFadeElement direction="up" delay={0.4}>
            <h3
              className="text-[var(--story-ink)] mb-6 text-center"
              style={{
                fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                fontWeight: 500,
                letterSpacing: "0.005em",
                lineHeight: 1.25,
              }}
            >
              Safety Measures
            </h3>
          </SmoothFadeElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {safetyMeasures.map((measure, index) => (
              <SmoothFadeElement
                key={measure.title}
                direction="up"
                delay={0.1 + index * 0.05}
                className="pt-5 border-t border-[var(--story-ink)]/15"
              >
                <div className="flex items-start">
                  <measure.icon className="h-4 w-4 mr-3 mt-1 text-[var(--story-ink)]/60 flex-shrink-0" />
                  <div>
                    <h3
                      className="text-[var(--story-ink)] mb-2"
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.25,
                      }}
                    >
                      {measure.title}
                    </h3>
                    <p className="text-[13px] leading-[1.65] text-[var(--story-ink)]/90">
                      {measure.description}
                    </p>
                  </div>
                </div>
              </SmoothFadeElement>
            ))}
          </div>

          <SmoothFadeElement direction="up" delay={0.5} className="mt-14 text-center">
            <div aria-hidden className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto mb-6" />
            <p
              className="text-[13px] leading-[1.7] text-[var(--story-ink)]/85 max-w-2xl mx-auto italic"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Your cooperation with these rules helps us maintain the tranquil atmosphere and natural beauty of Keeth
              House for everyone to enjoy.
            </p>
          </SmoothFadeElement>
        </div>
      </div>

    </section>
  )
}
