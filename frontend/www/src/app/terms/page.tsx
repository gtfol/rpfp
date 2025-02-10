"use client";

import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

export default function TermsPage() {
  return (
    <>
      <NavBar shouldAnimate={false} isFixed={true} />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-8 text-zinc-600">Last updated: February 9, 2025</p>

        <div className="prose">
          <p className="mb-4 text-zinc-600">Welcome to gtfol, LLC.</p>
          <p className="mb-4">
            We operate Remove People From Photos, accessible from{" "}
            <a
              href="https://removepeoplefromphotos.com"
              className="text-primary hover:brightness-110"
            >
              removepeoplefromphotos.com
            </a>
            , as well as any other related products and services that refer or
            link to these legal terms (the "Legal Terms") (collectively, the
            "Services").
          </p>
          <p className="mb-8 text-zinc-600">
            These Terms of Service ("Terms") govern your access to and use of{" "}
            <a
              href="https://gtfol.dev"
              className="text-primary hover:brightness-110"
            >
              gtfol.dev
            </a>{" "}
            (the "Site") and the services provided by gtfol, LLC, a company
            registered in Delaware, United States at 131 Continental Dr, Suite
            305, Newark, DE 19713 ("we", "our", or "us"). By accessing or using
            the Site, you agree to be bound by these Terms. If you do not agree
            to these Terms, do not use our services.
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">
              1. Use of the Site and Services
            </h2>
            <p className="mb-4 text-zinc-600">
              By using the Site and our services, you agree to:
            </p>
            <ul className="mb-4 list-disc pl-6 text-zinc-600">
              <li>
                Use our services for lawful purposes only and in compliance with
                all applicable laws.
              </li>
              <li>
                Provide accurate and complete information when registering or
                purchasing services from us.
              </li>
              <li>
                Not engage in any activity that disrupts or interferes with our
                services, networks, or systems.
              </li>
              <li>
                Not attempt to access unauthorized areas of the Site or our
                systems.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">2. User Accounts</h2>
            <p className="text-zinc-600">
              To use certain features of our services, you may be required to
              create an account. You are responsible for safeguarding the
              password and account information and for any activity that occurs
              under your account. If you suspect unauthorized access to your
              account, please notify us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">3. Payment and Billing</h2>
            <p className="text-zinc-600">
              When you purchase services from gtfol, LLC., you agree to provide
              accurate billing information and to pay all applicable fees.
              Prices for services are subject to change at our discretion, and
              you will be informed of any such changes before your next billing
              cycle. Failure to pay may result in termination of your access to
              the services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">
              4. Intellectual Property
            </h2>
            <p className="text-zinc-600">
              All content on the Site, including but not limited to text,
              graphics, logos, images, software, and code, is the property of
              gtfol, LLC. and is protected by intellectual property laws. You
              may not use, copy, reproduce, or distribute any part of the Site
              without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">5. Restrictions</h2>
            <p className="mb-4 text-zinc-600">You agree not to:</p>
            <ul className="list-disc pl-6 text-zinc-600">
              <li>
                Modify, reverse-engineer, or attempt to derive the source code
                of the software used in our services.
              </li>
              <li>
                Use our services to transmit any content that is unlawful,
                harmful, threatening, or otherwise objectionable.
              </li>
              <li>
                Attempt to interfere with or compromise the security or
                integrity of our services or servers.
              </li>
              <li>
                Impersonate any person or entity or falsely state or
                misrepresent your affiliation with a person or entity.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">6. Termination</h2>
            <p className="text-zinc-600">
              We reserve the right to terminate or suspend your account and
              access to our services at any time, with or without notice, for
              any reason, including if you breach these Terms. Upon termination,
              you must cease all use of the Site and any associated services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">
              7. Disclaimer of Warranties
            </h2>
            <p className="text-zinc-600">
              Our services are provided on an "as is" and "as available" basis.
              We do not warrant that the services will be uninterrupted or
              error-free, and we make no representations or warranties of any
              kind, express or implied, regarding the accuracy, reliability, or
              availability of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">
              8. Limitation of Liability
            </h2>
            <p className="text-zinc-600">
              To the fullest extent permitted by law, gtfol, LLC. shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of the Site
              or services. In no event shall our total liability to you exceed
              the amount you paid to us for services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">9. Indemnification</h2>
            <p className="text-zinc-600">
              You agree to indemnify, defend, and hold harmless gtfol, LLC. and
              its affiliates, officers, directors, employees, and agents from
              and against any claims, liabilities, damages, losses, and expenses
              (including reasonable attorney's fees) arising out of or related
              to your use of the Site or breach of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">
              10. Changes to the Terms
            </h2>
            <p className="text-zinc-600">
              We may update these Terms from time to time. We will notify you of
              any changes by posting the new Terms on the Site. Your continued
              use of the Site after any changes to the Terms constitutes your
              acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">11. Governing Law</h2>
            <p className="text-zinc-600">
              These Terms shall be governed and construed in accordance with the
              laws of the State of Delaware, without regard to its conflict of
              law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">12. Contact Information</h2>
            <p className="mb-4 text-zinc-600">
              If you have any questions or concerns about this Privacy Policy,
              please contact us:
            </p>
            <address className="not-italic text-zinc-600">
              <p className="mb-1">gtfol, LLC</p>
              <p className="mb-1">1950 Washington St. Apt. 3A</p>
              <p className="mb-1">Boston, MA 02118</p>
              <p className="mb-1">United States</p>
              <p>
                <a
                  href="mailto:rpfp@gtfol.dev"
                  className="text-primary hover:brightness-110"
                >
                  rpfp@gtfol.dev
                </a>
              </p>
            </address>
          </section>
        </div>
      </div>
      <BackToTop />
      <Footer />
    </>
  );
}
