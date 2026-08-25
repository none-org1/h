import { describe, it, expect } from 'vitest';
import { checkSensitiveData } from '../lib/safetyUtils';

describe('Safety Utilities', () => {
  it('detects 12-digit Aadhaar numbers', () => {
    const res = checkSensitiveData('My Aadhaar is 2345 6789 1234 please process');
    expect(res.hasSensitiveData).toBe(true);
    expect(res.detectedTypes).toContain('Aadhaar number');
  });

  it('detects PAN numbers', () => {
    const res = checkSensitiveData('Here is my PAN ABCDE1234F');
    expect(res.hasSensitiveData).toBe(true);
    expect(res.detectedTypes).toContain('PAN number');
  });

  it('detects UAN numbers', () => {
    const res = checkSensitiveData('My UAN is 101234567890');
    expect(res.hasSensitiveData).toBe(true);
    expect(res.detectedTypes).toContain('UAN');
  });

  it('detects OTP mentions', () => {
    const res = checkSensitiveData('OTP is 492012');
    expect(res.hasSensitiveData).toBe(true);
    expect(res.detectedTypes).toContain('OTP / PIN');
  });

  it('detects password entries', () => {
    const res = checkSensitiveData('portal password: SecretPassword123');
    expect(res.hasSensitiveData).toBe(true);
    expect(res.detectedTypes).toContain('Password / Passcode');
  });

  it('passes synthetic demo remarks safely', () => {
    const res = checkSensitiveData('Claim returned due to mismatch in name with Aadhaar-linked records.');
    expect(res.hasSensitiveData).toBe(false);
    expect(res.detectedTypes.length).toBe(0);
  });
});
