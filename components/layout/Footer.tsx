import { ChevronRight, CreativeCommons } from "lucide-react";
import Link from "next/link";
import { Icon } from "../shared";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-blue">
      <div className="wrapper py-12.5">
        {/* Top Section with Links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-15 mb-8">
          {/* Contributors */}
          <div>
            <h3 className="text-lg font-semibold leading-8.75 text-white mb-2.5">
              Contributors
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2.5">
                <ChevronRight size={20} color="white" strokeWidth={"1.5"} />
                <Link
                  href="/authors"
                  className="text-white hover:underline underline-offset-2   text-sm transition-colors"
                >
                  Authors
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <ChevronRight size={20} color="white" strokeWidth={"1.5"} />
                <Link
                  href="/institutions"
                  className="text-white hover:underline underline-offset-2  text-sm transition-colors"
                >
                  Institutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Libraries */}
          <div>
            <h3 className="text-lg font-semibold  leading-8.75 text-white mb-2.5">
              Libraries
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2.5">
                <ChevronRight size={20} color="white" strokeWidth={"1.5"} />
                <Link
                  href="/articles"
                  className="text-white hover:underline underline-offset-2  text-sm transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <ChevronRight size={20} color="white" strokeWidth={"1.5"} />
                <Link
                  href="/journals"
                  className="text-white hover:underline underline-offset-2 text-sm transition-colors"
                >
                  Journals
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <ChevronRight size={20} color="white" strokeWidth={"1.5"} />
                <Link
                  href="/search"
                  className="text-white hover:underline underline-offset-2 text-sm transition-colors"
                >
                  Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold leading-8.75 text-white mb-2.5">
              About
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2.5">
                <ChevronRight size={20} color="white" strokeWidth={"1.5"} />
                <Link
                  href="/about"
                  className="text-white hover:underline underline-offset-2 text-sm transition-colors"
                >
                  About Platform
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <ChevronRight size={20} color="white" strokeWidth={"1.5"} />
                <Link
                  href="/contact"
                  className="text-white hover:underline underline-offset-2 text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-8"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Logo and Copyright */}
          <div className="space-y-5">
            <div className="flex flex-col items-start gap-3 space-x-3 mb-4">
              <Link href="/">
                <Image
                  src="/logo-white.png"
                  width={255}
                  height={80}
                  alt="Logo"
                />
              </Link>
              <p className="text-white text-sm mb-2">
                © Nepal Research Index {currentYear} — All Rights Reserved
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap text-sm text-white">
              <Link
                href="/privacy"
                className="hover:underline underline-offset-2"
              >
                Privacy
              </Link>
              <span>|</span>
              <Link
                href="/terms"
                className="hover:underline underline-offset-2"
              >
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link
                href="/code-of-conduct"
                className="hover:underline underline-offset-2"
              >
                Code of Conduct
              </Link>
              <span>|</span>
              <Link
                href="/media"
                className="hover:underline underline-offset-2"
              >
                Media NRIP Research Labs
              </Link>
            </div>
          </div>

          {/* Right: License Information */}
          <div className="text-white/90 text-sm space-y-6.25">
            <div className="flex flex-col gap-3 items-start space-x-2">
              <div className="flex space-x-1 pt-1">
                <Icon name="Creative-Commons" size={20} color="white" />
                <Icon name="by-content-sign" size={20} color="white" />
                <Icon name="Sa-Content-Sign" size={20} color="white" />
              </div>
              <div className="space-y-0.5">
                <p className="flex flex-col">
                  Content on this site is licensed under a
                </p>
                <p>
                  Creative Commons{" "}
                  <Link
                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                    className="underline underline-offset-3 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
                    license.
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-start space-x-2">
              <div className="flex space-x-1 pt-1">
                <Icon name="Creative-Commons" size={20} color="white" />
                <Icon name="Zero-Content-Sign" size={20} color="white" />
              </div>
              <div className="space-y-0.5">
                {" "}
                <p>
                  Copyrights and related rights for article metadata waived via{" "}
                </p>
                <p>
                  {" "}
                  <Link
                    href="https://creativecommons.org/publicdomain/zero/1.0/"
                    className="underline underline-offset-3 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CC0 1.0 Universal (CC0) Public Domain Dedication.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
