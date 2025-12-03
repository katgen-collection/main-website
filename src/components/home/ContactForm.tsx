"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mailtoLink = `mailto:mikhailharitz@gmail.com?subject=${encodeURIComponent(
        formData.subject
    )}&body=${encodeURIComponent(
        `Hi, my name is ${formData.name} (%EMAIL%: ${formData.email}).\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
};

  return (
    <motion.div
      variants={childVariants}
      className="md:col-span-3"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 rounded-lg border border-white/10 p-6 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium block">
              Name
            </label>
            <input
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-white/10 bg-white/5 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium block">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-white/10 bg-white/5 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
              placeholder="Your email"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium block">
            Subject
          </label>
          <input
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-white/10 bg-white/5 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
            placeholder="Subject"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium block">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-white/10 bg-white/5 text-white min-h-32 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
            placeholder="Your message"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-md bg-purple-400 px-5 py-3 text-sm font-medium text-white hover:bg-purple-500 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all"
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
}
