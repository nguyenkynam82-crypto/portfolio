export function generateMailtoLink(selectedPackage?: string) {
  const subject = `Partnership Proposal / Strategic Collaboration Inquiry – [Your Name/Your Company]`;
  const body = `Dear Mr. DonQuaan,

I hope this email finds you well.

My name is [Your Name], and I am writing to you on behalf of [Your Company/Organization Name - if applicable], where I serve as [Your Job Title/Role]. We have been closely following your work and are highly impressed by your expertise and achievements in [Mention DonQuaan's field or a specific project of his, e.g., content creation, digital media, design].

Given your strong track record and our shared alignment in [Mention a common goal or industry focus, e.g., innovation, youth culture, high-quality production], I would like to formally propose a strategic collaboration between us.

We believe that combining your unique capabilities with our resources in [Mention your strength, e.g., multimedia production, marketing execution, technical development] could create substantial mutual value and result in a highly successful partnership. Specifically, we see an opportunity to collaborate on [Briefly mention the core idea or project type, e.g., upcoming campaigns, joint ventures, specialized projects]${selectedPackage ? ` (Package: ${selectedPackage})` : ''}.

To discuss how we might work together and explore this potential synergy in greater detail, I would appreciate the opportunity to schedule a brief introductory call or virtual meeting at your earliest convenience.

Thank you for your time and consideration. I look forward to the possibility of collaborating with you.

Sincerely,
[Your Name]
[Your Job Title]
[Your Company/Organization Name]
[Link to Portfolio/Website]
[Your Phone Number]
[Your Email Address]`;

  // Provide a Gmail compose link which is much more reliable for users wanting specifically "gmail"
  // Fallback to mailto if needed, but mail.google.com is explicitly for Gmail.
  return `https://mail.google.com/mail/?view=cm&fs=1&to=contact.donquaan@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
