"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScrollProvider>
      <div
        className="flex flex-col min-h-screen"
        style={{ backgroundColor: "var(--story-paper)" }}
      >
        {/* ═════════ CONTACT — image + card, Evolve Back style ═════════ */}
        <section className="relative pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
              {/* Left — landscape image */}
              <FadeIn className="md:col-span-7">
                <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                  <img
                    src="/images/contact/hero.jpg"
                    alt="The Keeth House signpost among the fields of Auroville"
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </FadeIn>

              {/* Right — contact tile */}
              <FadeIn delay={0.08} className="md:col-span-5">
                <div
                  className="h-full px-6 md:px-8 lg:px-10 py-8 md:py-10"
                  style={{ backgroundColor: "#faf4e4" }}
                >
                  {/* Brand mark — Our Story typographic voice */}
                  <div className="text-center mb-6 md:mb-8">
                    <h1
                      className="text-[var(--story-ink)]"
                      style={{
                        fontSize: "clamp(1.4rem, 2vw, 1.7rem)",
                        fontWeight: 500,
                        letterSpacing: "0.005em",
                        lineHeight: 1.2,
                      }}
                    >
                      Keeth House
                    </h1>
                    <div
                      aria-hidden
                      className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto mt-5"
                    />
                  </div>

                  {/* Channels */}
                  <div className="space-y-3 text-center text-[13px] leading-[1.65] text-[var(--story-ink)]/90">
                    <ChannelRow
                      label="Whatsapp"
                      value="+91 8124338124"
                      href="https://wa.me/918124338124"
                      external
                    />
                    <ChannelRow
                      label="Email"
                      value="reservations@keethhouse.in"
                      href="mailto:reservations@keethhouse.in"
                    />
                  </div>

                  {/* Gentle availability note */}
                  <p
                    className="mt-5 text-center italic text-[var(--story-ink)]/70 leading-[1.6] text-[13px]"
                  >
                    We&apos;re available only on WhatsApp and email for
                    reservations and enquiries. As a small, hands-on team,
                    responses may take a couple of days.
                  </p>

                  <div
                    aria-hidden
                    className="h-px bg-[var(--story-ink)]/10 w-full my-7"
                  />

                  {/* Addresses */}
                  <div>
                    <p
                      className="uppercase text-[var(--story-ink)]/85 text-center mb-5"
                      style={{
                        letterSpacing: "0.38em",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      Address
                    </p>

                    <div className="grid grid-cols-2 gap-5 md:gap-6">
                      <AddressRow
                        title="Keeth House Phase II"
                        lines={[
                          "117, Edayanchavadi Road",
                          "near Red Earth Riding School",
                          "Irumbai, Auroville",
                          "Tamil Nadu 605111, India",
                        ]}
                        mapHref="https://maps.app.goo.gl/XU2mB2xnxno23KVS8"
                      />
                      <AddressRow
                        title="Keeth House Phase III"
                        subtitle="Main Office"
                        lines={[
                          "118, Cross Road",
                          "near Red Earth Riding School",
                          "Edayanchavadi, Auroville",
                          "Tamil Nadu 605111, India",
                        ]}
                        mapHref="https://maps.app.goo.gl/yjh3P49suiYNaVHS7"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </div>
      <ScrollToTop />
    </SmoothScrollProvider>
  );
}

function ChannelRow({
  label,
  value,
  href,
  external = false,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <p className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
      <span
        className="uppercase text-[var(--story-ink)]/70"
        style={{
          letterSpacing: "0.28em",
          fontSize: "10.5px",
          fontWeight: 500,
        }}
      >
        {label}:
      </span>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-[var(--story-ink)] hover:text-primary transition-colors"
        style={{ fontWeight: 500 }}
      >
        {value}
      </a>
    </p>
  );
}

function AddressRow({
  title,
  subtitle,
  lines,
  mapHref,
}: {
  title: string;
  subtitle?: string;
  lines: string[];
  mapHref?: string;
}) {
  return (
    <div className="text-center">
      <h3
        className="text-[var(--story-ink)]"
        style={{
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.005em",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      {subtitle ? (
        <p
          className="uppercase text-[var(--story-ink)]/60 mt-1"
          style={{
            letterSpacing: "0.28em",
            fontSize: "9.5px",
            fontWeight: 500,
          }}
        >
          {subtitle}
        </p>
      ) : (
        <div aria-hidden style={{ height: "calc(9.5px * 1.4 + 0.25rem)" }} />
      )}
      <div
        aria-hidden
        className="h-px bg-[var(--story-ink)]/15 w-6 mx-auto mt-3 mb-3"
      />
      <address className="not-italic space-y-1 text-[13px] leading-[1.65] text-[var(--story-ink)]/80">
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </address>
      {mapHref ? (
        <a
          href={mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center uppercase mt-4 text-[var(--story-ink)] border-b border-[var(--story-ink)]/30 pb-0.5 hover:text-primary hover:border-primary transition-colors"
          style={{
            fontSize: "10.5px",
            letterSpacing: "0.24em",
            fontWeight: 500,
          }}
        >
          Get Directions
        </a>
      ) : null}
    </div>
  );
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      {children}
    </div>
  );
}
