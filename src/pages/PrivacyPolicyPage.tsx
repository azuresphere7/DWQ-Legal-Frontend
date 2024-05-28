import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex justify-center w-full">
      <main className="container px-4 py-12 [&>h2]:mt-8 [&>h2]:mb-2 [&>h2]:font-bold">
        <h1 className="font-bold text-2xl mb-12">DWQ Legal Privacy Policy</h1>

        Welcome to DWQ Legal! This Privacy Policy outlines our commitment to protecting your privacy and describes how we collect, use, and share your personal information when you interact with our website, services, and products. By using DWQ Legal, you agree to the terms outlined in this policy.

        <h2>Information We Collect:</h2>
        We collect various types of information to provide and improve our services. This includes personal information you provide directly, such as your name, contact information, and payment details. We also collect information automatically, such as your IP address, device information, and usage data.

        <h2>How We Use Your Information:</h2>
        We use your information to deliver, maintain, and enhance our services. This includes processing transactions, providing customer support, and personalizing your experience. We may also use your information for analytics, research, and marketing purposes, but always in compliance with applicable laws.

        <h2>Sharing Your Information:</h2>
        We may share your personal information with trusted third parties for specific purposes, such as processing payments or providing customer support. We do not sell your information to third parties. We may also share aggregated and anonymized data for analytical purposes.

        <h2>Cookies and Similar Technologies:</h2>
        DWQ Legal uses cookies and similar technologies to enhance your browsing experience. You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect the functionality of our website.

        <h2>Security:</h2>
        We prioritize the security of your information and employ industry-standard measures to protect it. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.

        <h2>Your Choices:</h2>
        You have the right to access, correct, or delete your personal information. You can also choose to opt out of certain communications. To exercise these rights, please contact us using the information provided below.

        <h2>Changes to this Privacy Policy:</h2>
        We may update this Privacy Policy to reflect changes in our practices or for legal reasons. We encourage you to review this page periodically for the latest information.

        <h2>Contact Us:</h2>
        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at support@dwq.legal.

        <div className="mt-16 mb-4">
          <Link to="/" className="hover:text-blue-500">Go back to Homepage</Link>
        </div>
      </main>
    </div>
  );
}
