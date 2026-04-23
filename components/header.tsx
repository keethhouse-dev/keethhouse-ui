"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { phaseData } from "@/lib/house-data"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Primary: IntersectionObserver on a sentinel at document top
    const node = sentinelRef.current
    let observer: IntersectionObserver | null = null
    if (node) {
      observer = new IntersectionObserver(
        ([entry]) => setIsScrolled(!entry.isIntersecting),
        { threshold: 0 },
      )
      observer.observe(node)
    }

    // Backup: capture-phase scroll listeners catch scroll on ANY element
    const check = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      if (y > 4) setIsScrolled(true)
      else if (y === 0) setIsScrolled(false)
    }
    check()
    window.addEventListener("scroll", check, { passive: true, capture: true })
    document.addEventListener("scroll", check, { passive: true, capture: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener("scroll", check, true)
      document.removeEventListener("scroll", check, true)
    }
  }, [])

  // Pages that open on a light background (no dark hero).
  // Header should render opaque from the top so nav stays legible.
  const lightTopRoutes = ["/contact"]
  const isLightTop = lightTopRoutes.some((p) => pathname === p || pathname.startsWith(p + "/"))
  const useOpaqueHeader = isScrolled || isLightTop

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Revert back to the original menu order with "Stays" first
  const navLinks = [
    {
      title: "Houses",
      href: "/",
      onClick: () => window.scrollTo(0, 0),
    },
    {
      title: "Our Story",
      href: "/our-story",
      onClick: () => window.scrollTo(0, 0),
    },
    {
      title: "Before You Arrive",
      href: "/before-you-arrive",
      onClick: () => window.scrollTo(0, 0),
    },
    {
      title: "Contact",
      href: "/contact",
      onClick: () => window.scrollTo(0, 0),
    },
  ]

  // Animation variants
  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const menuItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      x: 20,
      opacity: 0,
    },
  }

  return (
    <>
      {/* Sentinel at the very top — when it leaves the viewport, we know user scrolled */}
      <div
        ref={sentinelRef}
        aria-hidden
        className="absolute top-0 left-0 h-1 w-full pointer-events-none"
      />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 md:py-6 flex items-center transition-[background-color,border-color,box-shadow] duration-200",
          useOpaqueHeader
            ? "!bg-white border-b border-[var(--story-ink)]/15 shadow-[0_2px_16px_-6px_rgba(29,25,20,0.18)]"
            : "!bg-transparent border-b border-transparent",
        )}
        style={
          useOpaqueHeader
            ? { backgroundColor: "#ffffff" }
            : { backgroundColor: "transparent" }
        }
      >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="relative z-10">
            <Image
              src={useOpaqueHeader ? "/logo.svg" : "/logo.png"}
              alt="Keeth House Logo"
              width={180}
              height={100}
              className="h-12 md:h-16 w-auto"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center space-x-10"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="flex items-center"
            >
              <Link
                href={link.href}
                onClick={link.onClick}
                className={cn(
                  "text-base font-medium transition-colors duration-200 hover:text-primary relative",
                  pathname === link.href ? "text-primary" : useOpaqueHeader ? "text-foreground" : "text-white",
                )}
              >
                {link.title}
                {pathname === link.href && (
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                    layoutId="underline"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            ref={dropdownRef}
            className="relative"
          >
            <button
              className="flex flex-row items-center group relative bg-primary/10 hover:bg-primary/30 rounded-full py-2 px-6 transition-all duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span
                className={`text-base font-medium text-primary transition-colors duration-200 group-hover:text-primary/80`}
              >
                Our Houses
              </span>
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform text-primary group-hover:text-primary/80 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 mt-3 bg-white overflow-hidden z-50 w-[520px] shadow-[0_18px_48px_-20px_rgba(29,25,20,0.25)] border border-[var(--story-ink)]/10"
                >
                  <div className="grid grid-cols-2">
                    {phaseData
                      .filter((phase) => phase.id !== "phase-1")
                      .map((phase, i) => {
                        const accent =
                          phase.id === "phase-2"
                            ? "var(--story-moss)"
                            : "var(--story-terra)";
                        const shortLabel =
                          phase.id === "phase-2" ? "Phase II" : "Phase III";
                        return (
                          <div
                            key={phase.id}
                            className={`relative px-7 py-7 ${
                              i === 0
                                ? "border-r border-[var(--story-ink)]/10"
                                : ""
                            }`}
                          >
                            {/* phase eyebrow with leading color mark */}
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                aria-hidden
                                className="inline-block w-4 h-px"
                                style={{ backgroundColor: accent }}
                              />
                              <p
                                className="uppercase"
                                style={{
                                  color: accent,
                                  letterSpacing: "0.32em",
                                  fontSize: "10px",
                                  fontWeight: 600,
                                }}
                              >
                                {shortLabel}
                              </p>
                            </div>
                            <h3
                              className="text-[var(--story-ink)] mb-5"
                              style={{
                                fontWeight: 500,
                                fontSize: "15px",
                                letterSpacing: "0.005em",
                                lineHeight: 1.25,
                              }}
                            >
                              {phase.title}
                            </h3>
                            <ul className="space-y-1.5">
                              {phase?.houses?.map((house) => (
                                <li key={house.id}>
                                  <Link
                                    href={`/stays/${house.id}`}
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="group/link relative inline-flex items-center py-0.5 text-[12.5px] text-[var(--story-ink)]/80 transition-colors"
                                    onMouseEnter={(e) => {
                                      (
                                        e.currentTarget as HTMLElement
                                      ).style.color = accent;
                                    }}
                                    onMouseLeave={(e) => {
                                      (
                                        e.currentTarget as HTMLElement
                                      ).style.color = "";
                                    }}
                                  >
                                    <span
                                      aria-hidden
                                      className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-2 h-px opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                                      style={{ backgroundColor: accent }}
                                    />
                                    {house.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-3 rounded-full touch-target shadow-sm ${useOpaqueHeader ? "text-white bg-[var(--story-ink)]" : "text-[var(--story-ink)] bg-white/90 backdrop-blur-sm"}`}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-white z-40 md:hidden pt-20 overflow-y-auto"
          >
            <motion.nav className="flex flex-col items-center space-y-4 p-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.title}
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsOpen(false)
                      link.onClick && link.onClick()
                    }}
                    className="text-lg font-medium hover:text-primary block py-5 text-center w-full border-b border-gray-100 mobile-nav-item touch-target"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} className="w-full pt-6 relative" ref={dropdownRef}>
                <button
                  className="flex flex-col items-center w-full py-4 text-center bg-primary/10 rounded-full mb-4 relative"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={`text-lg font-medium text-primary ${isDropdownOpen ? "font-bold" : ""}`}>
                    Our Houses
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 mt-1 transition-transform text-primary ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 right-0 mt-2 bg-white overflow-hidden z-50 border border-[var(--story-ink)]/10 shadow-[0_16px_36px_-14px_rgba(29,25,20,0.2)]"
                    >
                      <div className="grid grid-cols-2 divide-x divide-[var(--story-ink)]/10">
                        {phaseData
                          .filter((phase) => phase.id !== "phase-1")
                          .map((phase) => {
                            const accent =
                              phase.id === "phase-2"
                                ? "var(--story-moss)"
                                : "var(--story-terra)"
                            const shortLabel =
                              phase.id === "phase-2" ? "Phase II" : "Phase III"
                            return (
                              <div key={phase.id} className="relative px-4 py-4">
                                <div
                                  aria-hidden
                                  className="absolute top-0 left-0 right-0 h-[3px]"
                                  style={{ backgroundColor: accent }}
                                />
                                <p
                                  className="uppercase mb-1.5"
                                  style={{
                                    color: accent,
                                    letterSpacing: "0.32em",
                                    fontSize: "9.5px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {shortLabel}
                                </p>
                                <h3
                                  className="text-[var(--story-ink)] mb-2.5"
                                  style={{
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    letterSpacing: "0.005em",
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {phase.title}
                                </h3>
                                <ul className="space-y-1">
                                  {phase?.houses?.map((house) => (
                                    <li key={house.id}>
                                      <Link
                                        href={`/stays/${house.id}`}
                                        onClick={() => {
                                          setIsDropdownOpen(false)
                                          setIsOpen(false)
                                        }}
                                        className="block py-0.5 text-[12px] text-[var(--story-ink)]/80"
                                      >
                                        {house.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}

export default Header
