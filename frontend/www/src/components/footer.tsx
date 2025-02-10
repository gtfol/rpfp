'use client';

import GitHub from '@/assets/icons/socials/github';
import Instagram from '@/assets/icons/socials/instagram';
import X from '@/assets/icons/socials/x';
import { scrollToTop } from '@/lib/utils';
import Link from 'next/link';

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
    href: 'https://github.com/gtfol',
    icon: GitHub,
    ariaLabel: 'GitHub',
  },
  {
    href: 'https://x.com/gtfol_dev',
    icon: X,
    ariaLabel: 'X',
  },
  {
    href: 'https://instagram.com/gtfol_dev',
    icon: Instagram,
    ariaLabel: 'Instagram',
  },
];

const FOOTER_LINKS: FooterLinks = {
  legal: [
    {
      href: '/privacy',
      label: 'privacy policy',
    },
    {
      href: '/terms',
      label: 'terms of service',
    },
  ],
};

export const Footer = () => {
  return (
    <footer className='mt-12 border-t border-zinc-800'>
      <div className='mx-auto max-w-5xl px-6 py-12'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-0'>
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-col gap-y-4'>
              <button onClick={scrollToTop} className='focus:outline-zinc-800'>
                <img src='/icon.png' alt='gtfol' className='h-6 w-fit flex-shrink-0' />
              </button>
              <span className='text-xs text-zinc-500'>get the f**k off localhost</span>
            </div>
            <div className='flex gap-x-6'>
              {SOCIAL_LINKS.map(({ href, icon: Icon, ariaLabel }) => (
                <a key={href} href={href} aria-label={ariaLabel} className='focus:outline-zinc-800'>
                  <Icon className='hover:fill-zinc-500-hover h-4 w-4 fill-zinc-500 transition-colors' />
                </a>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-y-4'>
            {FOOTER_LINKS.legal.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className='hover:text-zinc-500-hover text-xs text-zinc-500 transition-colors'
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className='mt-12 flex flex-col items-center justify-between border-t border-[#252525] pt-8 sm:flex-row'>
          <div className='mb-4 text-xs text-[#50555c] sm:mb-0'>
            {`© 2024-${new Date().getFullYear()} gtfol, LLC. All rights reserved.`}
          </div>
        </div>
      </div>
    </footer>
  );
};
