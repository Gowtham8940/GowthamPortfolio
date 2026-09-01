import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Gowtham",
  description:
    "Privacy policy for Gowtham's personal Gmail automation tool and this website.",
};

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
      >
        &larr; Back to home
      </Link>

      <h1 className="mt-8 text-2xl font-bold text-foreground md:text-3xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: 1 September 2026
      </p>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        This policy covers this website and a personal-use Gmail automation tool
        (&ldquo;the App&rdquo;) operated by Gowtham J. The App is not a commercial
        product and is used only by its operator.
      </p>

      <Section title="What the App accesses">
        <p>
          With your explicit Google authorization, the App accesses your Gmail
          account through the Gmail API using the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            gmail.modify
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            gmail.settings.basic
          </code>{" "}
          scopes. It uses this access solely to:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>read message metadata and content to organize the mailbox;</li>
          <li>add or remove labels and archive messages;</li>
          <li>create draft emails;</li>
          <li>read and create Gmail filters.</li>
        </ul>
        <p>
          The App does not send email on your behalf and does not permanently
          delete any messages.
        </p>
      </Section>

      <Section title="Data storage">
        <p>
          The App runs locally on the operator&rsquo;s own computer. OAuth tokens
          are stored locally on that machine and are used only to authenticate
          with Google. No email content, metadata, or personal data is
          transmitted to, stored on, or shared with any third-party server. No
          analytics or tracking are used by the App.
        </p>
      </Section>

      <Section title="Data sharing">
        <p>
          No data is sold, shared, or disclosed to any third party. The
          App&rsquo;s use of information received from Google APIs adheres to the{" "}
          <a
            className="underline underline-offset-2 hover:text-foreground"
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
      </Section>

      <Section title="Data retention and deletion">
        <p>
          Stored OAuth tokens can be revoked at any time from{" "}
          <a
            className="underline underline-offset-2 hover:text-foreground"
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Account permissions
          </a>
          . Revoking access immediately and permanently ends the App&rsquo;s
          ability to access the data.
        </p>
      </Section>

      <Section title="This website">
        <p>
          This site is a static portfolio. A contact form, if submitted, sends
          the name, email, and message you provide directly to the operator by
          email so he can reply. That information is not used for any other
          purpose.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions:{" "}
          <a
            className="underline underline-offset-2 hover:text-foreground"
            href="mailto:gowthamjaganthan@gmail.com"
          >
            gowthamjaganthan@gmail.com
          </a>
        </p>
      </Section>
    </main>
  );
}
