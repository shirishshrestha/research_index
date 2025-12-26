import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #023B8B 25.96%, #012558 70.66%)",
      }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Top Section with Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contributors */}
          <div>
            <h3
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              Contributors
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/authors"
                  className="text-white hover:text-white/80 text-sm transition-colors"
                >
                  Authors
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/institutions"
                  className="text-white hover:text-white/80 text-sm transition-colors"
                >
                  Institutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Libraries */}
          <div>
            <h3
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              Libraries
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/articles"
                  className="text-white hover:text-white/80 text-sm transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/journals"
                  className="text-white hover:text-white/80 text-sm transition-colors"
                >
                  Journals
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/search"
                  className="text-white hover:text-white/80 text-sm transition-colors"
                >
                  Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              About
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/about"
                  className="text-white hover:text-white/80 text-sm transition-colors"
                >
                  About Platform
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/contact"
                  className="text-white hover:text-white/80 text-sm transition-colors"
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
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center">
                <div className="relative">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="3" fill="white" />
                    <circle cx="15" cy="20" r="2" fill="white" />
                    <circle cx="45" cy="20" r="2" fill="white" />
                    <circle cx="15" cy="40" r="2" fill="white" />
                    <circle cx="45" cy="40" r="2" fill="white" />
                    <circle cx="30" cy="10" r="2" fill="white" />
                    <circle cx="30" cy="50" r="2" fill="white" />
                    <circle cx="10" cy="30" r="2" fill="white" />
                    <circle cx="50" cy="30" r="2" fill="white" />
                  </svg>
                </div>
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  RESEARCH INDEX
                </h2>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-2">
              © Nepal Research Index {currentYear} — All Rights Reserved
            </p>
            <div className="flex items-center flex-wrap gap-2 text-sm text-white/80">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <span>|</span>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link
                href="/code-of-conduct"
                className="hover:text-white transition-colors"
              >
                Code of Conduct
              </Link>
              <span>|</span>
              <Link
                href="/media"
                className="hover:text-white transition-colors"
              >
                Media NRIP Research Labs
              </Link>
            </div>
          </div>

          {/* Right: License Information */}
          <div className="text-white/90 text-sm space-y-3">
            <div className="flex items-start space-x-2">
              <div className="flex space-x-1 pt-1">
                <span className="inline-block px-1 py-0.5 border border-white rounded text-xs">
                  CC
                </span>
                <span className="inline-block px-1 py-0.5 border border-white rounded text-xs">
                  BY
                </span>
                <span className="inline-block px-1 py-0.5 border border-white rounded text-xs">
                  SA
                </span>
              </div>
              <p>
                Content on this site is licensed under a{" "}
                <Link
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  className="underline hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Creative Commons Attribution-ShareAlike 4.0 International (CC
                  BY-SA 4.0) license
                </Link>
                .
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="flex space-x-1 pt-1">
                <span className="inline-block px-1 py-0.5 border border-white rounded text-xs">
                  CC
                </span>
                <span className="inline-block px-1 py-0.5 border border-white rounded text-xs">
                  0
                </span>
              </div>
              <p>
                Copyrights and related rights for article metadata waived via{" "}
                <Link
                  href="https://creativecommons.org/publicdomain/zero/1.0/"
                  className="underline hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CC0 1.0 Universal (CC0) Public Domain Dedication
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
