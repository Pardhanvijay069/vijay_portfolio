// config.js
export const EMAILJS_CONFIG = {
  PUBLIC_ID: import.meta.env.VITE_EMAILJS_PUBLIC_ID,
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID
};

export const FORM_CONFIG = {
  provider: 'emailjs',
  formspreeEndpoint: ''
};

// Convenience: export for CommonJS if used in tooling
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMAILJS_CONFIG: window.EMAILJS_CONFIG, FORM_CONFIG: window.FORM_CONFIG };
}

