'use client';

import { BackToTop } from '@/components/back-to-top';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <motion.div
        className='mx-auto max-w-5xl px-6 py-16'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 1.1,
          ease: 'easeOut',
        }}
      >
        <motion.h1
          className='mb-4 text-4xl font-bold'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            delay: 1.2,
            ease: 'easeOut',
          }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className='mb-8 text-zinc-600'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            delay: 1.3,
            ease: 'easeOut',
          }}
        >
          Last updated: February 9, 2025
        </motion.p>

        <motion.div
          className='prose max-w-none'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            delay: 1.4,
            ease: 'easeOut',
          }}
        >
          <section className='mb-12'>
            <p className='mb-4 leading-relaxed text-zinc-700'>
              We are gtfol, LLC ("Company," "we," "us," "our"), a company registered in Delaware, United States at 131
              Continental Dr, Suite 305, Newark, DE 19713.
            </p>
            <p className='mb-4 leading-relaxed text-zinc-700'>
              We operate Remove People From Photos, accessible from{' '}
              <Link href='/' className='text-primary hover:text-primary-hover'>
                https://removepeoplefromphotos.com
              </Link>
              , as well as any other related products and services that refer or link to these legal terms (the "Legal
              Terms") (collectively, the "Services"). This privacy policy explains how we collect, use, and protect the
              personal information of users who use our Services. By using our Services, you agree to the collection and
              use of information in accordance with this policy.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>1. Information We Collect</h2>
            <p className='mb-4 text-zinc-700'>
              We collect several types of information to provide and improve our service, including:
            </p>
            <ul className='list-disc space-y-2 pl-6 text-zinc-700'>
              <li>
                <strong>Personal Information:</strong> When you register on our Site, we may ask for personal
                information such as your name, email address, phone number, and billing details.
              </li>
              <li>
                <strong>Usage Data:</strong> We may collect information about how the Site is accessed and used. This
                may include your IP address, browser type, pages visited, and the time and date of your visit.
              </li>
              <li>
                <strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to track user
                behavior and store certain information to improve your experience on our Site.
              </li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>2. How We Use Your Information</h2>
            <p className='mb-4 text-zinc-700'>We use the collected data for various purposes:</p>
            <ul className='list-disc space-y-2 pl-6 text-zinc-700'>
              <li>To provide and maintain our services</li>
              <li>To notify you of changes to our services</li>
              <li>To provide customer support</li>
              <li>To gather analytics and valuable insights to improve our services</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>3. Sharing Your Information</h2>
            <p className='mb-4 text-zinc-700'>
              We do not sell, rent, or share your personal information with third parties except in the following cases:
            </p>
            <ul className='list-disc space-y-2 pl-6 text-zinc-700'>
              <li>To comply with legal obligations</li>
              <li>To protect and defend the rights or property of Vly Labs Inc.</li>
              <li>With service providers who assist in operating the Site, subject to confidentiality agreements</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>4. Data Security</h2>
            <p className='text-zinc-700'>
              We are committed to protecting your personal information. We use a variety of security measures, including
              encryption and secure servers, to ensure the safety of your data. However, no method of transmission over
              the internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>5. Data Retention</h2>
            <p className='text-zinc-700'>
              We retain your personal data only for as long as necessary for the purposes set out in this policy, unless
              a longer retention period is required by law.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>6. Your Rights</h2>
            <p className='mb-4 text-zinc-700'>You have the right to:</p>
            <ul className='list-disc space-y-2 pl-6 text-zinc-700'>
              <li>Access and receive a copy of your personal data</li>
              <li>Request the correction of inaccurate or incomplete information</li>
              <li>Request the deletion of your personal data, subject to certain conditions</li>
              <li>Object to the processing of your personal data for marketing purposes</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>7. Third-Party Links</h2>
            <p className='text-zinc-700'>
              Our Site may contain links to other websites. We are not responsible for the privacy practices of
              third-party sites. We encourage you to read their privacy policies.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>8. Children's Privacy</h2>
            <p className='text-zinc-700'>
              Our services are not intended for anyone under the age of 13. We do not knowingly collect personally
              identifiable information from children under 13.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>9. Changes to This Privacy Policy</h2>
            <p className='text-zinc-700'>
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new
              policy on this page.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='mb-6 text-2xl font-bold'>Contact Us</h2>
            <p className='mb-4 text-zinc-700'>
              If you have any questions or concerns about this Privacy Policy, please contact us:
            </p>
            <address className='not-italic text-zinc-700'>
              <p className='mb-1'>gtfol, LLC</p>
              <p className='mb-1'>1950 Washington St. Apt. 3A</p>
              <p className='mb-1'>Boston, MA 02118</p>
              <p className='mb-1'>United States</p>
              <p>
                <a href='mailto:rpfp@gtfol.dev' className='text-primary hover:text-primary-hover'>
                  rpfp@gtfol.dev
                </a>
              </p>
            </address>
          </section>
        </motion.div>
      </motion.div>
      <BackToTop />
      <Footer />
    </>
  );
}
