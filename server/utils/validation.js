export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  export function validatePhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  }
  
  export function formatPhoneNumber(phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) return phone;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  