import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, User, MessageSquare } from 'lucide-react';
import { FadeIn } from '@/components/Layout/animations';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'support',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h1 className="text-3xl font-bold text-bleached-flax mb-2">Contact Support</h1>
          <p className="text-dormant-husk mb-8">Reach out for field support, technical issues, or partnership inquiries.</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            {[
              { icon: MapPin, label: 'Site Address', value: '184 Buncombe Road, Middle Tennessee' },
              { icon: Mail, label: 'Email', value: 'ops@aggrogeo.studio' },
              { icon: Phone, label: 'Emergency Line', value: '+1 (615) 555-0142' },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={0.1 * i}>
                <div className="p-4 bg-silage-gray rounded-lg border border-dormant-husk/10">
                  <div className="flex items-center gap-2 text-neon-sprout mb-2">
                    <item.icon size={16} />
                    <span className="text-xs font-mono uppercase tracking-wider">{item.label}</span>
                  </div>
                  <div className="text-sm text-bleached-flax">{item.value}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="md:col-span-2">
            <form onSubmit={handleSubmit} className="p-6 bg-silage-gray rounded-lg border border-dormant-husk/10 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-dormant-husk flex items-center gap-2">
                    <User size={12} /> Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-loam border border-dormant-husk/20 rounded-lg text-bleached-flax text-sm focus:outline-none focus:border-neon-sprout/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-dormant-husk flex items-center gap-2">
                    <Mail size={12} /> Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-loam border border-dormant-husk/20 rounded-lg text-bleached-flax text-sm focus:outline-none focus:border-neon-sprout/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-dormant-husk">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-deep-loam border border-dormant-husk/20 rounded-lg text-bleached-flax text-sm focus:outline-none focus:border-neon-sprout/50 transition-colors"
                >
                  <option value="support">Field Support</option>
                  <option value="technical">Technical Issue</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-dormant-husk flex items-center gap-2">
                  <MessageSquare size={12} /> Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 bg-deep-loam border border-dormant-husk/20 rounded-lg text-bleached-flax text-sm focus:outline-none focus:border-neon-sprout/50 transition-colors resize-none"
                  placeholder="Describe your issue or inquiry..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neon-sprout text-deep-loam rounded-lg font-semibold hover:bg-neon-sprout/90 transition-colors"
              >
                {submitted ? (
                  <>Message Sent</>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
