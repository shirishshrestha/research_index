"use client";

import Link from "next/link";
import { LayoutDashboard, LogIn, Menu, Search } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useAppSelector } from "@/store";

// Navigation data structure
const contributorsItems: { title: string; href: string }[] = [
  {
    title: "Authors",
    href: "/authors",
  },
  {
    title: "Institutions",
    href: "/institutions",
  },
];

const librariesItems: { title: string; href: string }[] = [
  {
    title: "Articles",
    href: "/articles",
  },
  {
    title: "Journals",
    href: "/journals",
  },
  {
    title: "Topics",
    href: "/topics",
  },
];

const mainLinks: { title: string; href: string }[] = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const supportItems: { title: string; href: string }[] = [
  {
    title: "Institutional Supporter Model",
    href: "/support/institutional-supporter-model",
  },
  {
    title: "Author Supporter Model",
    href: "/support/author-supporter-model",
  },
  {
    title: "Sponsorship & Partnership",
    href: "/support/sponsorship-partnership",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = useAppSelector(
    (state) => state?.auth?.isAuthenticated
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="bg-primary ">
        <div className="wrapper flex items-center justify-between text-white text-sm">
          <div></div>
          <div className="flex gap-2 items-center">
            <Link
              href="/search"
              className="hover:text-white/80 transition-colors flex gap-1.5 px-4 items-center"
            >
              Search
              <Search size={17} />
            </Link>

            {!isAuthenticated ? (
              <Link
                href="/login"
                className="hover:text-white/80 transition-colors flex gap-1.5 px-4 items-center"
              >
                Login
                <LogIn size={17} />
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="hover:text-white/80 transition-colors flex gap-1.5 px-4 items-center"
              >
                Dasboard
                <LayoutDashboard size={17} />
              </Link>
            )}

            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    size={17}
                    className="bg-primary! cursor-pointer text-white! text-sm font-normal flex items-center px-4 py-0!"
                  >
                    Support
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-auto right-0 w-56 z-1 ">
                    <ul className="grid w-56 gap-1">
                      {supportItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink
                            className="cursor-pointer"
                            asChild
                          >
                            <Link
                              href={item.href}
                              className="block text-primary select-none rounded-md p-2 text-sm leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="wrapper flex items-center justify-between py-2.5">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={191} height={60} />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Contributors Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[16px] cursor-pointer bg-transparent! font-normal hover:text-accent! text-primary! ">
                  Contributors
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-50 gap-1">
                    {contributorsItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink className="cursor-pointer" asChild>
                          <Link
                            href={item.href}
                            className="block select-none text-primary rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Libraries Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[16px] bg-transparent! cursor-pointer font-normal text-primary! transition-colors hover:text-accent!">
                  Libraries
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-50 gap-1">
                    {librariesItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink className="cursor-pointer" asChild>
                          <Link
                            href={item.href}
                            className="block text-primary select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Main Links */}
              {mainLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className="text-[16px]  text-primary transition-colors hover:text-accent! h-9 px-4 py-2 inline-flex items-center justify-center bg-transparent! focus:text-primary "
                    >
                      {link.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="text-primary hover:text-primary/80">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-85 p-4 sm:w-100">
                <SheetHeader className="p-0!">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 ">
                  {/* Contributors Section */}
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      Contributors
                    </h3>
                    <ul className="space-y-2 ml-4">
                      {contributorsItems.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-[16px] hover:text-primary transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Libraries Section */}
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      Libraries
                    </h3>
                    <ul className="space-y-2 ml-4">
                      {librariesItems.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-[16px] hover:text-primary transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Main Links */}
                  <div className="border-t pt-4">
                    {mainLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-base hover:text-accent! "
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>

                  {/* Login */}
                  <div className="border-t pt-4">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-[16px] text-primary hover:text-primary/80 transition-colors"
                    >
                      Login
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
