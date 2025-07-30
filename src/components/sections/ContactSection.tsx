"use client";

import React, { useState } from "react";
import DotGrid from "@/components/DotGrid";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormData {
  fullName: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  message?: string;
}

interface FormState {
  idle: "idle";
  loading: "loading";
  success: "success";
  error: "error";
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<keyof FormState>("idle");
  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

  // Animated globe particles animation
  const particleAnimation = {
    y: [0, -20, 0],
    opacity: [0.4, 1, 0.4],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string) => {
    const errors: FormErrors = {};
    
    switch (name) {
      case "fullName":
        if (!value.trim()) errors.fullName = "Full name is required";
        break;
      case "email":
        if (!value.trim()) errors.email = "Email is required";
        else if (!validateEmail(value)) errors.email = "Invalid email format";
        break;
      case "company":
        if (!value.trim()) errors.company = "Company name is required";
        break;
      case "message":
        if (!value.trim()) errors.message = "Message is required";
        else if (value.trim().length < 10) errors.message = "Message must be at least 10 characters";
        break;
    }
    
    return errors;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const fieldErrors = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name as keyof FormErrors],
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedFields(prev => new Set([...prev, fieldName]));
  };

  const handleBlur = (fieldName: string) => {
    if (!formData[fieldName as keyof FormData]) {
      setFocusedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(fieldName);
        return newSet;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const allErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const fieldErrors = validateField(key, formData[key as keyof FormData]);
      Object.assign(allErrors, fieldErrors);
    });
    
    if (Object.keys(allErrors).length > 0) {
      setFormErrors(allErrors);
      return;
    }
    
    setFormState("loading");
    
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      setFormData({ fullName: "", email: "", company: "", message: "" });
      setFocusedFields(new Set());
      
      // Reset to idle after 3 seconds
      setTimeout(() => setFormState("idle"), 3000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const contactDetails = [
    { icon: Mail, label: "Email", value: "hello@admybrand.ai" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Address", value: "San Francisco, CA" },
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background gradient + DotGrid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#5227FF"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      </div>
      
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Visual & Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Animated Globe Visual */}
            <div className="relative h-64 w-full rounded-2xl bg-gradient-to-br from-card/50 to-accent/30 backdrop-blur-sm border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central glow */}
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary opacity-60 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Floating particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/60"
                    style={{
                      left: `${20 + (i * 60) % 60}%`,
                      top: `${20 + (i * 30) % 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3 
                    }}
                  />
                ))}
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" />
                    </linearGradient>
                  </defs>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.line
                      key={i}
                      x1={`${20 + i * 15}%`}
                      y1={`${30 + i * 10}%`}
                      x2={`${60 + i * 10}%`}
                      y2={`${70 - i * 15}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      opacity="0"
                      animate={{ opacity: [0, 0.8, 0] }}
                      transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Let's Build the{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Future Together
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Ready to transform your agency with AI? Get in touch and let's discuss how ADmyBRAND can amplify your success.
              </p>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={itemVariants} className="space-y-6">
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 group cursor-pointer"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <detail.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{detail.label}</p>
                    <p className="text-foreground font-medium">{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="relative">
                  <motion.label
                    className={`absolute transition-all duration-200 pointer-events-none ${
                      focusedFields.has("fullName") || formData.fullName
                        ? "text-xs text-primary -top-2 left-3 bg-card px-2"
                        : "text-muted-foreground top-3 left-3"
                    }`}
                    animate={{
                      y: focusedFields.has("fullName") || formData.fullName ? -8 : 0,
                      scale: focusedFields.has("fullName") || formData.fullName ? 0.85 : 1,
                    }}
                  >
                    Full Name
                  </motion.label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    onFocus={() => handleFocus("fullName")}
                    onBlur={() => handleBlur("fullName")}
                    className={`w-full h-12 px-3 bg-transparent border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      formErrors.fullName ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  {formErrors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive mt-1"
                    >
                      {formErrors.fullName}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <motion.label
                    className={`absolute transition-all duration-200 pointer-events-none ${
                      focusedFields.has("email") || formData.email
                        ? "text-xs text-primary -top-2 left-3 bg-card px-2"
                        : "text-muted-foreground top-3 left-3"
                    }`}
                    animate={{
                      y: focusedFields.has("email") || formData.email ? -8 : 0,
                      scale: focusedFields.has("email") || formData.email ? 0.85 : 1,
                    }}
                  >
                    Email Address
                  </motion.label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    className={`w-full h-12 px-3 bg-transparent border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      formErrors.email ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  {formErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive mt-1"
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </div>

                {/* Company */}
                <div className="relative">
                  <motion.label
                    className={`absolute transition-all duration-200 pointer-events-none ${
                      focusedFields.has("company") || formData.company
                        ? "text-xs text-primary -top-2 left-3 bg-card px-2"
                        : "text-muted-foreground top-3 left-3"
                    }`}
                    animate={{
                      y: focusedFields.has("company") || formData.company ? -8 : 0,
                      scale: focusedFields.has("company") || formData.company ? 0.85 : 1,
                    }}
                  >
                    Company Name
                  </motion.label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    onFocus={() => handleFocus("company")}
                    onBlur={() => handleBlur("company")}
                    className={`w-full h-12 px-3 bg-transparent border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      formErrors.company ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  {formErrors.company && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive mt-1"
                    >
                      {formErrors.company}
                    </motion.p>
                  )}
                </div>

                {/* Message */}
                <div className="relative">
                  <motion.label
                    className={`absolute transition-all duration-200 pointer-events-none ${
                      focusedFields.has("message") || formData.message
                        ? "text-xs text-primary -top-2 left-3 bg-card px-2"
                        : "text-muted-foreground top-3 left-3"
                    }`}
                    animate={{
                      y: focusedFields.has("message") || formData.message ? -8 : 0,
                      scale: focusedFields.has("message") || formData.message ? 0.85 : 1,
                    }}
                  >
                    Message
                  </motion.label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                    rows={4}
                    className={`w-full px-3 py-3 bg-transparent border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                      formErrors.message ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  {formErrors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive mt-1"
                    >
                      {formErrors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-200 hover:shadow-glow-primary disabled:opacity-50"
                >
                  <motion.div
                    className="flex items-center justify-center space-x-2"
                    animate={{ scale: formState === "success" ? [1, 1.1, 1] : 1 }}
                  >
                    {formState === "loading" && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {formState === "success" && (
                      <Check className="w-4 h-4 text-success" />
                    )}
                    {formState === "idle" && <Send className="w-4 h-4" />}
                    <span>
                      {formState === "loading" && "Sending..."}
                      {formState === "success" && "Success!"}
                      {formState === "idle" && "Send Message"}
                    </span>
                  </motion.div>
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;