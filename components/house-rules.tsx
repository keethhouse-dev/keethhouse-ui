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
    <section className="py-16 md:py-20 bg-white relative" id="house-rules">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <SmoothFadeElement direction="up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">House Rules & Safety Measures</h2>
          </SmoothFadeElement>
          <SmoothFadeElement direction="up" delay={0.1}>
            <div className="h-1 bg-primary mx-auto mb-6 w-20" />
          </SmoothFadeElement>
          <SmoothFadeElement direction="up" delay={0.2}>
            <p className="max-w-2xl mx-auto text-foreground/80">
              To ensure a peaceful, safe, and respectful environment for all guests, we kindly ask you to follow these
              guidelines during your stay.
            </p>
          </SmoothFadeElement>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* House Rules Section */}
          <SmoothFadeElement direction="up" delay={0.3}>
            <h3 className="text-2xl font-semibold mb-6 text-primary text-center">House Rules</h3>
          </SmoothFadeElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {houseRules.map((rule, index) => (
              <SmoothFadeElement
                key={rule.title}
                direction="up"
                delay={0.1 + index * 0.05}
                className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                    <rule.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{rule.title}</h3>
                    <p className="text-sm text-foreground/70">{rule.description}</p>
                  </div>
                </div>
              </SmoothFadeElement>
            ))}
          </div>

          {/* Safety Measures Section */}
          <SmoothFadeElement direction="up" delay={0.4}>
            <h3 className="text-2xl font-semibold mb-6 text-primary text-center">Safety Measures</h3>
          </SmoothFadeElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyMeasures.map((measure, index) => (
              <SmoothFadeElement
                key={measure.title}
                direction="up"
                delay={0.1 + index * 0.05}
                className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                    <measure.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{measure.title}</h3>
                    <p className="text-sm text-foreground/70">{measure.description}</p>
                  </div>
                </div>
              </SmoothFadeElement>
            ))}
          </div>

          <SmoothFadeElement direction="up" delay={0.5} className="mt-10 p-6 bg-primary/10 rounded-xl text-center">
            <p className="text-foreground/80 font-medium">
              Your cooperation with these rules helps us maintain the tranquil atmosphere and natural beauty of Keeth
              House for everyone to enjoy.
            </p>
          </SmoothFadeElement>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full border border-primary/10 -z-10"></div>
    </section>
  )
}
