import React from "react";
import { Link } from "react-router-dom";

export default function TermsConditionsPage() {
  return (
    <div className="flex justify-center w-full">
      <main className="container px-4 py-12 [&>h2]:mt-8 [&>h2]:mb-2 [&>h2]:font-bold">
        <h1 className="font-bold text-2xl mb-12">DWQ Legal Terms and Conditions</h1>

        Welcome to DWQ Legal! These Terms and Conditions govern your use of our website, services, and products. By accessing or using DWQ Legal, you agree to comply with these terms. Please read them carefully.

        <h2>1. Acceptance of Terms:</h2>
        By using DWQ Legal, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using our services.

        <h2>2. User Eligibility:</h2>
        You must be at least 18 years old to use DWQ Legal. By using our services, you confirm that you are of legal age and capable of entering into a binding agreement.

        <h2>3. User Account:</h2>
        To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and agree to notify us immediately of any unauthorized use.

        <h2>4. Content and Intellectual Property:</h2>
        All content on DWQ Legal, including text, graphics, logos, and images, is the property of DWQ Legal or its licensors and is protected by copyright, trademark, and other intellectual property laws.

        <h2>5. Prohibited Conduct:</h2>
        You agree not to engage in any conduct that violates these terms, including but not limited to unauthorized access, use of automated systems, or interference with the proper functioning of DWQ Legal.

        <h2>6. Payments:</h2>
        Certain features or services may require payment. By making a payment, you agree to the terms of the payment provider and acknowledge that all information you provide is accurate and complete.

        <h2>7. Disclaimer of Warranties:</h2>
        DWQ Legal is provided &apos;as is&apos; without any warranties, expressed or implied. We do not guarantee the accuracy, completeness, or reliability of our services.

        <h2>8. Limitation of Liability:</h2>
        DWQ Legal and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of our services.

        <h2>9. Governing Law:</h2>
        These Terms and Conditions are governed by the laws of [Your Jurisdiction]. Any disputes arising from these terms will be resolved in the courts of [Your Jurisdiction].

        <h2>10. Changes to Terms:</h2>
        DWQ Legal reserves the right to update these Terms and Conditions at any time. Continued use of our services after changes constitutes acceptance of the revised terms.

        <h2>Contact Us:</h2>
        If you have any questions or concerns about these Terms and Conditions, please contact us at support@dwq.legal.

        <div className="mt-16 mb-4">
          <Link to="/" className="hover:text-blue-500">Go back to Homepage</Link>
        </div>
      </main>
    </div>
  );
}
