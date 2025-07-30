'use client';
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API", href: "#" },
      { name: "Documentation", href: "#" }
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Status", href: "#" },
      { name: "Security", href: "#" }
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Compliance", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  return (
    <footer className="border-t border-border/50 bg-background/90 backdrop-blur-lg">
      <motion.div
        className="container px-6 py-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="rounded-3xl bg-white/5 border border-border/30 shadow-2xl p-8 lg:p-14 grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-2 flex flex-col justify-between"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <motion.h3
                className="text-2xl font-extrabold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                ADmyBRAND AI Suite
              </motion.h3>
              <motion.p
                className="text-muted-foreground mt-4 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Revolutionizing brand management with artificial intelligence. Build, manage, and scale your brand with confidence.
              </motion.p>
            </div>
            {/* Social Links */}
            <motion.div
              className="flex gap-4 mt-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-primary/30 hover:to-secondary/30 flex items-center justify-center transition-all duration-300 group shadow-sm hover:scale-110"
                    whileHover={{ scale: 1.13, rotate: -8 + index * 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Footer Links Columns */}
          {Object.entries(footerLinks).map(([section, links], idx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-6 first-letter:uppercase bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-block"
                      whileHover={{ scale: 1.07, x: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;