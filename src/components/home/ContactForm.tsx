"use client";

import { useState } from "react";

const FIELD =
  "w-full bg-transparent border-b border-white/15 py-3 text-[#ECECEE] placeholder:text-[#5A5A63] focus:border-violet-400 focus:outline-none transition-colors";
const LABEL =
  "font-code text-[11px] uppercase tracking-[0.18em] text-[#8A8A94]";

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
      `Hi, my name is ${formData.name} (email: ${formData.email}).\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div className="space-y-2">
          <label htmlFor="name" className={LABEL}>
            Name
          </label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={FIELD}
            placeholder="Your name"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={FIELD}
            placeholder="you@email.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className={LABEL}>
          Subject
        </label>
        <input
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          className={FIELD}
          placeholder="What's this about?"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className={LABEL}>
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          className={`${FIELD} min-h-32 resize-none`}
          placeholder="Tell me about it."
          required
        />
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-2 bg-[#ECECEE] text-[#0B0C10] px-7 py-3 font-code text-sm uppercase tracking-[0.15em] hover:bg-violet-400 hover:text-white transition-colors"
      >
        Send message
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
