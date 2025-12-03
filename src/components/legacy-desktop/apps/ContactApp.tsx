"use client";

import React from 'react';
import ContactForm from '@/components/home/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';

export const ContactApp = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-2">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Get in Touch</h2>
          <p className="text-gray-400">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Email</h3>
              <a href="mailto:mikhailharitz@gmail.com" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                mikhailharitz@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Location</h3>
              <p className="text-sm text-gray-400">
                Jakarta, Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <ContactForm />
      </div>
    </div>
  );
};
