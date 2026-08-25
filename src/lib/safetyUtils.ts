// ============================================================
// PF Claim Decoder — Safety & Sensitive Data Utilities
// ============================================================
// Detects potential real PII in input and flags warnings.
// Never persists sensitive data.
// ============================================================

export interface SensitiveDataCheck {
  hasSensitiveData: boolean;
  detectedTypes: string[];
  warningMessage: string;
  warningMessageHi: string;
}

/**
 * Regex patterns for common Indian sensitive data
 */
const PATTERNS = {
  // 12-digit Aadhaar pattern (with optional spaces/hyphens)
  aadhaar: /\b[2-9]\d{3}[\s-]?\d{4}[\s-]?\d{4}\b/,
  // 10-character PAN pattern (5 letters, 4 digits, 1 letter)
  pan: /\b[A-Z]{5}[0-9]{4}[A-Z]\b/i,
  // 12-digit UAN pattern (starts with 10)
  uan: /\b10\d{10}\b/,
  // Standard Indian bank account numbers (9-18 digits)
  bankAccount: /\b\d{9,18}\b/,
  // 11-character Indian IFSC code (4 letters, 0, 6 chars)
  ifsc: /\b[A-Z]{4}0[A-Z0-9]{6}\b/i,
  // 4-8 digit OTP mentions
  otp: /\b(?:otp|one time password|pin|cvv)\s*(?:is|:|=)?\s*\d{4,8}\b/i,
  // Passwords / credentials
  password: /\b(?:password|pwd|passcode)\s*(?:is|:|=)?\s*\S+/i,
};

/**
 * Check a string for sensitive information patterns
 */
export function checkSensitiveData(input: string): SensitiveDataCheck {
  const detectedTypes: string[] = [];

  if (!input || !input.trim()) {
    return {
      hasSensitiveData: false,
      detectedTypes: [],
      warningMessage: '',
      warningMessageHi: '',
    };
  }

  if (PATTERNS.aadhaar.test(input)) detectedTypes.push('Aadhaar number');
  if (PATTERNS.pan.test(input)) detectedTypes.push('PAN number');
  if (PATTERNS.uan.test(input)) detectedTypes.push('UAN');
  if (PATTERNS.otp.test(input)) detectedTypes.push('OTP / PIN');
  if (PATTERNS.password.test(input)) detectedTypes.push('Password / Passcode');
  if (PATTERNS.ifsc.test(input)) detectedTypes.push('Bank IFSC');

  const hasSensitiveData = detectedTypes.length > 0;

  const warningMessage = hasSensitiveData
    ? `For safety, please remove real ${detectedTypes.join(', ')}. Use synthetic demo values only.`
    : '';

  const warningMessageHi = hasSensitiveData
    ? `सुरक्षा के लिए, कृपया वास्तविक ${detectedTypes.join(', ')} हटा दें। केवल सिंथेटिक डेमो मानों का उपयोग करें।`
    : '';

  return {
    hasSensitiveData,
    detectedTypes,
    warningMessage,
    warningMessageHi,
  };
}

/**
 * Check if the input is empty or just whitespace
 */
export function isEmptyInput(input: string): boolean {
  return !input || input.trim().length === 0;
}
