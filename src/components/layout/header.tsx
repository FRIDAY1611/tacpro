'use client'

import { useState, useEffect } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { Locale } from '@/i18n/config'
import { Menu, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { localeNames, locales, isRTL } from '@/i18n/config'

interface HeaderProps {
  locale: Locale
  messages: {
    nav: {
      home: string
      products: string
      cases: string
      blog: string
      about: string
      contact: string
      inquiry: string
    }
    buttons: {
      inquireNow: string
    }
  }
}

export function Header({ locale, messages }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: messages.nav.home },
    { href: '/products', label: messages.nav.products },
    { href: '/cases', label: messages.nav.cases },
    { href: '/blog', label: messages.nav.blog },
    { href: '/about', label: messages.nav.about },
    { href: '/contact', label: messages.nav.contact },
  ]

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className={`text-2xl font-bold tracking-tight ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              TACPRO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href)
                    ? scrolled ? 'text-gray-900' : 'text-white'
                    : scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className={scrolled ? 'text-gray-600' : 'text-white'}>
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((loc) => (
                  <DropdownMenuItem key={loc}>
                    <a href={`/${loc}${pathname !== '/' ? pathname : ''}`}>
                      {localeNames[loc]}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Link href="/inquiry" className="hidden md:block">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                {messages.buttons.inquireNow}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger className="lg:hidden">
                <Button variant="ghost" size="icon" className={scrolled ? 'text-gray-600' : 'text-white'}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL(locale) ? 'left' : 'right'} className="w-80">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-medium ${
                        isActive(link.href) ? 'text-primary' : 'text-gray-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/inquiry">
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
                      {messages.buttons.inquireNow}
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
