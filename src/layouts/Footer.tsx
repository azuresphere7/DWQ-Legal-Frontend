import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <main className="flex flex-col w-full">
      <div className="flex justify-center w-full bg-gray-800">
        <div className="container flex flex-col md:flex-row justify-between w-full p-8 text-sm md:text-base">
          <div className="flex flex-col justify-between w-full py-6 md:py-0">
            <div className="flex flex-col">
              <Link to={"/"} className="font-bold text-2xl mb-4">DWQ Legal LLC</Link>

              <Link to={"/privacy-policy"} className="text-gray-300 hover:text-white py-1">Privacy & Policy</Link>
              <Link to={"/terms-and-conditions"} className="text-gray-300 hover:text-white py-1">Terms & Conditions</Link>
            </div>

            <div>
              <p className="py-1">info@dwq.legal</p>
              <p className="py-1">+1 (234) 567-9801</p>
              <p className="py-1">Santa Clara, California, United States</p>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50732.91768094404!2d-122.0087520556621!3d37.370734967844385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7815c08c193%3A0xe475a47ca3c0bfc0!2sSanta%20Clara%2C%20CA!5e0!3m2!1sen!2sus!4v1705694114209!5m2!1sen!2sus"
            className="w-full h-60 border-none"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex justify-center items-center w-full p-6 bg-gray-900">
        DWQ Legal, LLC © All rights reserved 2024
      </div>
    </main>

  );
}
