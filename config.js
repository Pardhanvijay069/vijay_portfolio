/*
 * FORM CONFIGURATION
 *
 * This file exposes two configuration objects for contact form handling:
 *
 * 1) EMAILJS_CONFIG - credentials for EmailJS (https://www.emailjs.com/)
 * 2) FORM_CONFIG    - selects provider and/or Formspree endpoint
 *
 * Usage:
 * - Keep this file private (don't commit real secret keys to public repos).
 * - Replace placeholder values with your provider values.
 *
 * EmailJS Setup:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create a service (Gmail, SMTP, etc.) and a template using variables
 *    like {{from_name}}, {{from_email}}, {{message}}, {{to_name}}.
 * 3. Copy your Public Key, Service ID and Template ID into EMAILJS_CONFIG.
 *
 * Formspree Setup (simpler, no client SDK):
 * 1. Sign up at https://formspree.io/ and create a form endpoint
 * 2. Set FORM_CONFIG.provider = 'formspree' and provide the full endpoint URL
 *
 * SECURITY NOTE:
 * - Public keys are safe to use in client-side code (EmailJS public key).
 * - Do NOT put private SMTP credentials in this file. Use server-side mail
 *   forwarding or a secure function if you need confidentiality.
 */

// EmailJS configuration (replace placeholders)
window.EMAILJS_CONFIG = {
    PUBLIC_KEY: '8uJoJ57L4NSVS1NQJ',   // e.g. 'user_xxx' (public key)
    SERVICE_ID: 'service_pelc6xd',   // e.g. 'service_xxx'
    TEMPLATE_ID: 'template_dx5r8w9'  // e.g. 'template_xxx'
};

// Form configuration: choose provider = 'emailjs' | 'formspree' | 'none'
// If provider is 'formspree', set `formspreeEndpoint` to the full POST URL.
window.FORM_CONFIG = {
    provider: 'emailjs', // 'emailjs' or 'formspree' or 'none'
    // For Formspree use a full endpoint like: 'https://formspree.io/f/abcd1234'
    formspreeEndpoint: '',
};

// Convenience: export for CommonJS if used in tooling
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMAILJS_CONFIG: window.EMAILJS_CONFIG, FORM_CONFIG: window.FORM_CONFIG };
}
