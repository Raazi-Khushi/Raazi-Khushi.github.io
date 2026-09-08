export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-foreground">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last Updated: 8 September 2026</p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed">
        <p>
          At Raazi Khushi, we value your privacy and are committed to protecting the personal
          information you share with us. This Privacy Policy explains how Raazi Khushi / Sab Raazi
          Khushi Pvt. Ltd. (&ldquo;Raazi Khushi&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) collects, uses, stores and protects your personal information when you
          visit our website, interact with our social media pages or advertisements, submit an
          enquiry or use our matchmaking services.
        </p>
        <p>
          By using our website or providing your information to us, you acknowledge that you have
          read and understood this Privacy Policy.
        </p>

        <Section title="1. Information We Collect">
          <p>Depending on how you interact with Raazi Khushi, we may collect information such as:</p>
          <List
            items={[
              "Full name",
              "Age or date of birth",
              "Gender",
              "Phone number",
              "Email address",
              "City or location",
              "Information about whether you are looking for a match for yourself, your son, daughter, or another family member",
              "Matchmaking preferences and requirements",
              "Information voluntarily provided through enquiry or lead forms",
              "Information provided while communicating with our team",
              "Any other information you voluntarily choose to share with us",
            ]}
          />
          <p>
            We may also automatically collect certain technical information when you visit our
            website, such as browser type, device information, IP address, pages visited and
            general website usage information.
          </p>
        </Section>

        <Section title="2. Information Collected Through Advertisements and Lead Forms">
          <p>Raazi Khushi may advertise on platforms including Facebook and Instagram.</p>
          <p>
            If you interact with one of our advertisements and submit a lead form, the information
            you provide may be shared with Raazi Khushi. For example, we may receive your name,
            contact details and responses to questions included in the lead form.
          </p>
          <p>
            We use this information to understand your requirements and contact you regarding Raazi
            Khushi&rsquo;s matchmaking services.
          </p>
          <p>
            Information collected through third-party platforms may also be subject to those
            platforms&rsquo; respective privacy policies.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We may use your personal information to:</p>
          <List
            items={[
              "Respond to your enquiries",
              "Contact you regarding your interest in Raazi Khushi",
              "Understand your matchmaking requirements",
              "Provide and improve our matchmaking services",
              "Help you explore suitable matchmaking options",
              "Schedule consultations or follow-ups",
              "Communicate important information regarding our services",
              "Improve our website, advertising, products, and customer experience",
              "Measure and understand the effectiveness of our marketing campaigns",
              "Prevent misuse, fraud, or unauthorised activity",
              "Comply with applicable legal and regulatory requirements",
            ]}
          />
        </Section>

        <Section title="4. How We Communicate With You">
          <p>
            If you provide your contact information or submit an enquiry, our team may contact you
            through channels such as:
          </p>
          <List items={["Phone calls", "WhatsApp", "SMS", "Email", "Other communication channels you have provided or authorised"]} />
          <p>You can request that we stop sending promotional communications to you at any time.</p>
        </Section>

        <Section title="5. Sharing of Personal Information">
          <p>We do not sell or rent your personal information to third parties.</p>
          <p>
            We may share information where reasonably necessary with trusted service providers,
            technology partners, communication providers, marketing or analytics partners and other
            parties who assist us in operating our business and providing our services.
          </p>
          <p>
            We may also disclose information where required by law, legal proceedings, governmental
            authorities or where necessary to protect the rights, safety or security of Raazi
            Khushi, our users or others.
          </p>
        </Section>

        <Section title="6. Matchmaking Information">
          <p>
            Raazi Khushi operates in the matchmaking space, and some information you voluntarily
            provide may relate to your personal preferences and requirements for finding a suitable
            match.
          </p>
          <p>We will use such information for legitimate matchmaking and service-related purposes.</p>
          <p>
            We encourage users to share only information that they are comfortable providing and to
            avoid submitting unnecessary sensitive personal information through enquiry forms or
            other communication channels.
          </p>
        </Section>

        <Section title="7. Data Security">
          <p>
            We take reasonable measures to protect the personal information entrusted to us against
            unauthorised access, loss, misuse, alteration or disclosure.
          </p>
          <p>
            However, no method of transmission over the internet or method of electronic storage can
            be guaranteed to be completely secure.
          </p>
        </Section>

        <Section title="8. Data Retention">
          <p>
            We retain personal information only for as long as reasonably necessary for the purposes
            described in this Privacy Policy, including providing our services, maintaining business
            records, resolving disputes, complying with legal obligations and enforcing our
            agreements.
          </p>
          <p>
            When information is no longer required, we may delete or securely dispose of it, subject
            to applicable legal and operational requirements.
          </p>
        </Section>

        <Section title="9. Third-Party Websites and Services">
          <p>
            Our website, advertisements or communications may contain links to third-party websites,
            platforms or services.
          </p>
          <p>
            Raazi Khushi is not responsible for the privacy practices, security or content of
            third-party websites.
          </p>
          <p>We recommend reviewing the privacy policies of any third-party service you choose to use.</p>
        </Section>

        <Section title="10. Cookies and Tracking Technologies">
          <p>
            Our website may use cookies, pixels, analytics tools and similar technologies to improve
            website functionality, understand website usage, measure advertising performance and
            provide a better user experience.
          </p>
          <p>
            You may be able to control or restrict cookies through your browser settings. Disabling
            certain cookies may affect some website functionality.
          </p>
        </Section>

        <Section title="11. Your Rights and Choices">
          <p>
            Depending on applicable law, you may have rights relating to your personal information,
            including the ability to:
          </p>
          <List
            items={[
              "Request access to information we hold about you",
              "Request correction of inaccurate information",
              "Request deletion of your information where applicable",
              "Withdraw consent where processing is based on consent",
              "Opt out of certain promotional communications",
              "Raise questions or concerns regarding the way your information is handled",
            ]}
          />
          <p>
            To exercise any applicable rights or raise a privacy-related concern, you can contact us
            using the details provided below.
          </p>
        </Section>

        <Section title="12. Adult's Privacy">
          <p>
            Our services are intended for adults who are legally capable of using matchmaking
            services i.e. the adult needs to be minimum 18 years old or above. We do not knowingly
            collect personal information directly from children.
          </p>
          <p>
            If you believe that a child has provided personal information to us, please contact us
            so that we can take appropriate steps.
          </p>
        </Section>

        <Section title="13. Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our services,
            technology, business practices or applicable laws.
          </p>
          <p>When we make changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this page.</p>
          <p>We encourage you to review this page periodically.</p>
        </Section>

        <Section title="14. Contact Us">
          <p>
            If you have questions, concerns or requests regarding this Privacy Policy or the way we
            handle your personal information, please contact us:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="font-medium">Raazi Khushi</p>
            <p>Legal Entity: Sab Raazi Khushi Pvt. Ltd.</p>
            <p>
              Email:{" "}
              <a href="mailto:info@raazikhuhsi.com" className="underline underline-offset-2">
                info@raazikhuhsi.com
              </a>
            </p>
            <p>
              Website:{" "}
              <a href="https://www.raazikhushi.com" className="underline underline-offset-2">
                www.raazikhushi.com
              </a>
            </p>
          </div>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}