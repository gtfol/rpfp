"use client";

import Discord from "@/assets/icons/socials/discord";
import GitHub from "@/assets/icons/socials/github";
import X from "@/assets/icons/socials/x";
import { scrollToTop } from "@/lib/utils";
import Link from "next/link";

interface SocialLink {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  ariaLabel: string;
}

interface FooterLink {
  href: string;
  label: string;
}

interface FooterLinks {
  legal: FooterLink[];
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://twitter.com/textfully_dev",
    icon: X,
    ariaLabel: "Twitter",
  },
  {
    href: "https://github.com/textfully",
    icon: GitHub,
    ariaLabel: "GitHub",
  },
  {
    href: "https://discord.gg/Ct6FDCpFBU",
    icon: Discord,
    ariaLabel: "Discord",
  },
];

const FOOTER_LINKS: FooterLinks = {
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-[#dededc]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-12 sm:flex-row sm:flex-wrap sm:gap-24">
          <div className="flex w-full flex-row items-center justify-between sm:w-auto sm:flex-col sm:items-start sm:justify-start sm:space-y-8">
            <button className="flex items-center gap-x-2" onClick={scrollToTop}>
              <div className="h-5 w-5">
                <img
                  src="/icon.png"
                  alt="Remove People from Photos"
                  className="h-5 w-5"
                />
              </div>
              <p className="font-general text-base font-semibold text-primary">
                Remove People From Photos
              </p>
            </button>
            <div className="flex gap-x-6">
              {SOCIAL_LINKS.map(({ href, icon: Icon, ariaLabel }) => (
                <a key={href} href={href} aria-label={ariaLabel}>
                  <Icon className="h-4 w-4 fill-zinc-600 transition-colors hover:fill-zinc-800" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-8 sm:flex-1 sm:grid-cols-4">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h3 className="font-general mb-4 font-[550] capitalize">
                  {section}
                </h3>
                <ul className="space-y-2">
                  {links.map(({ href, label }: FooterLink) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="text-sm text-zinc-600 transition-colors hover:text-zinc-800"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#dededc] pt-8 sm:flex-row">
          <div className="mb-4 text-sm text-[#909090] sm:mb-0">
            {`© ${new Date().getFullYear()} gtfol, LLC. All rights reserved.`}
          </div>
        </div>
      </div>
    </footer>
  );
};
