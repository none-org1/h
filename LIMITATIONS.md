# Limitations & Boundary Disclosures — PF Claim Decoder

To ensure transparency, legal compliance, and safe citizen usage, this document outlines the operational and architectural limitations of the **PF Claim Decoder & Action Pack** prototype.

---

## 1. No Live Government System Integration
- The prototype is **not connected** to live EPFO databases, the Unified Member Portal, UIDAI Aadhaar verification services, Income Tax PAN databases, or bank account verification APIs.
- The prototype cannot verify whether a member's records on live official servers match or differ.

## 2. Synthetic Data Only
- The prototype is designed exclusively for synthetic, demonstration, and educational purposes.
- It actively detects and discourages the entry of real Personally Identifiable Information (Aadhaar, PAN, UAN, Bank Account Numbers, OTPs, or passwords).

## 3. Deterministic Matching Scope
- The taxonomy consists of **12 fixed categories**. If a remark does not contain sufficient signals matching any of the 11 specific categories, the system safely falls back to `other_unclear` or `verification_pending`.
- The engine intentionally refuses to guess specific underlying causes from generic terms such as `"pending"`.

## 4. No Automated Government Submission
- The prototype **never automatically files** grievances or RTI applications on behalf of the user.
- The user must copy or download their generated action pack and submit it independently on official portals ([epfigms.gov.in](https://epfigms.gov.in/) or [rtionline.gov.in](https://rtionline.gov.in/)).

## 5. RTI vs. Grievance Redressal Limitations
- An **RTI Application** under the RTI Act, 2005 requests official records, daily file progress notes, and designations of dealing assistants. **Filing an RTI does not in itself approve, settle, or disburse PF funds.**
- A **Grievance** filed on EPFiGMS requests administrative action or employer intervention.
- The prototype advises users on which document type is recommended, but final discretion rests with the citizen.

## 6. AI Enhancement Fallback & Guardrails
- When OpenAI is enabled, the model is strictly constrained to grounded explanations and legal drafts. The model **cannot change the matched category** or invent new categories.
- If the OpenAI API is unreachable or times out (15s), the system seamlessly delivers grounded deterministic templates without breaking the user journey.

## 7. Legal Disclaimer
- This prototype does not provide formal legal advice or substitute for official EPFO member assistance.
- Citizens should always cross-reference advice with the nearest EPFO Regional Office or the official helpline (1800-118-005).
