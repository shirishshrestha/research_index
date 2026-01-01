"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormInputField,
  FormTextareaField,
  FormSelectField,
} from "@/components/form";
import { useState } from "react";
import { contactSchema } from "../utils/formSchema";

type ContactFormData = z.infer<typeof contactSchema>;

const enquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Support" },
  { value: "partnership", label: "Partnership & Services" },
  { value: "research", label: "Research Collaboration" },
  { value: "other", label: "Other" },
];

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contactNumber: "",
      institutionName: "",
      enquiryType: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual form submission
      console.log("Form data:", data);
      alert("Thank you for contacting us! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <FormInputField
          control={form.control}
          name="fullName"
          label="Your Full Name"
          placeholder="Enter your full name"
          maxLength={35}
        />

        {/* Email Address */}
        <FormInputField
          control={form.control}
          name="email"
          label="Your Email Address"
          placeholder="Enter your email"
          type="email"
          maxLength={35}
        />

        {/* Contact Number */}
        <FormInputField
          control={form.control}
          name="contactNumber"
          label="Your Contact Number"
          placeholder="Enter your contact number"
          maxLength={35}
        />

        {/* Institution Name */}
        <FormInputField
          control={form.control}
          name="institutionName"
          label="Your Institution Name"
          placeholder="Enter your institution name"
          maxLength={35}
        />

        {/* Enquiry Type */}
        <FormSelectField
          control={form.control}
          name="enquiryType"
          label="Enquiry Type"
          placeholder="Select enquiry type"
          options={enquiryTypes}
        />

        {/* Subject */}
        <FormInputField
          control={form.control}
          name="subject"
          label="Subject"
          placeholder="Enter subject"
          maxLength={35}
        />

        {/* Message */}
        <FormTextareaField
          control={form.control}
          name="message"
          label="Your Message"
          placeholder="Enter your message"
          maxLength={500}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 w-full sm:w-auto px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
