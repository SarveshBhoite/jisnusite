"use client"

import { Shield, Lock, Eye, CheckCircle2, Mail, Phone, MapPin } from "lucide-react"

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 2, 2026"

  return (
    <main className="min-h-screen pt-24 bg-background">
      {/* Hero Header */}
      <section className="py-20 border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At Jisnu Digital Solutions, we value your trust and are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose dark:prose-invert max-w-none space-y-12">
            
            {/* Introduction */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold flex items-center gap-3 text-foreground">
                <Lock className="w-5 h-5 text-primary" />
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to <strong>Jisnu Digital Solutions Pvt. Ltd.</strong> ("Company", "we", "our", or "us"). We operate the website <a href="https://jisnudigital.com" className="text-primary hover:underline font-medium">jisnudigital.com</a> (the "Service").
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our Privacy Policy governs your visit to our website and explains how we collect, safeguard, and disclose information that results from your use of our Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Information Collection */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold flex items-center gap-3 text-foreground">
                <Eye className="w-5 h-5 text-primary" />
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect several different types of information for various purposes to provide and improve our Service to you:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>
                  <strong>Personal Data:</strong> While using our Service (for example, through contact forms, lead generation, or account registration), we may ask you to provide us with certain personally identifiable information, including but not limited to your Name, Email address, Phone number, and Company Name.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device. This includes your IP address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, and other diagnostic data.
                </li>
                <li>
                  <strong>Cookies & Tracking:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information to improve user experience.
                </li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold flex items-center gap-3 text-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                3. Use of Data
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Jisnu Digital Solutions uses the collected data for various purposes:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>To provide and maintain our Service.</li>
                <li>To notify you about changes to our Service or special digital marketing offers.</li>
                <li>To allow you to participate in interactive features of our Service.</li>
                <li>To provide customer support and respond to enquiries.</li>
                <li>To gather analysis or valuable information so that we can improve our Service.</li>
                <li>To monitor the usage of our Service and detect, prevent, and address technical issues.</li>
              </ul>
            </div>

            {/* Data Protection & Security */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold flex items-center gap-3 text-foreground">
                <Shield className="w-5 h-5 text-primary" />
                4. Security of Data
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>

            {/* Third-Party Service Providers */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold flex items-center gap-3 text-foreground">
                <Lock className="w-5 h-5 text-primary" />
                5. Disclosure & Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your Personal Data to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
              </p>
            </div>

            {/* Contact Us Section */}
            <div className="p-8 rounded-2xl border border-border bg-muted/30 space-y-6">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Contacting Us
              </h3>
              <p className="text-sm text-muted-foreground">
                If there are any questions regarding this privacy policy, you may contact us using the information below:
              </p>
              <div className="grid gap-6 sm:grid-cols-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="truncate">
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:info.jdsolutions2018@gmail.com" className="hover:text-primary transition">
                      info.jdsolutions2018@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="whitespace-nowrap">+91 7709936965</p>
                    <p className="whitespace-nowrap">020 47246321</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p>Pune, Maharashtra,</p>
                    <p>India</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
