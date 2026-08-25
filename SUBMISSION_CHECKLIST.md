# Hackathon Submission Checklist — PF Claim Decoder

**Track**: Build What Moves India  
**Project**: PF Claim Decoder & Action Pack  

---

## 📋 Evaluation Checklist & Verification

### 1. Public Links & Access
- [x] **Public Live URL Placeholder**: `https://pf-claim-decoder.vercel.app` (configured for instant Vercel/Netlify deployment)
- [x] **3-Minute Demo Video Placeholder**: Video link in README and script ready in `DEMO_SCRIPT.md`
- [x] **GitHub Repository**: Clean public codebase, standard Next.js directory structure
- [x] **No Access Gates**: No login, sign-up, password, or OAuth required to test all journeys

### 2. Disqualification & Safety Guardrails
- [x] **No Live Government Endpoints**: Zero scraping, zero unauthorized API calls, zero reverse engineering
- [x] **Synthetic Data Only**: All demo fixtures use synthetic names (*Aarav Mehta*, *Priya Sharma*) and references (`DEMO-CLM-2026-001`)
- [x] **PII Protection**: Active client-side regex detection filters Aadhaar, PAN, UAN, Bank Account, OTP, and Password inputs
- [x] **No Automated Submission**: Clean break handoff; submissions occur only by the citizen on official portals ([epfigms.gov.in](https://epfigms.gov.in/), [rtionline.gov.in](https://rtionline.gov.in/))
- [x] **No Official Logo / Endorsement Claims**: Prominently displays independent prototype notices and disclaimers on every screen
- [x] **No Hardcoded Secrets**: `OPENAI_API_KEY` stored exclusively in `.env` and read server-side only

### 3. Core Technical & Product Invariants
- [x] **Deterministic Taxonomy**: Exactly 12 static categories. Zero dynamic category creation by AI.
- [x] **4-Tier Verification Matrix**: Strict adherence to *"Not mentioned ≠ Verified"*. Explicitly separates `verified_from_input`, `possible_issue`, `not_verified`, and `unknown`.
- [x] **Action Owner & Checklist**: Assigns clear responsibility (Member, Employer, EPFO) with checkable evidence items.
- [x] **Legal Distinction**: Explicitly educates citizens on EPFiGMS Grievances (remedy/action) vs. RTI Section 6(1) (records/file notings).
- [x] **Resilient AI Fallback**: 15-second timeout and local deterministic template fallback ensure 100% offline functionality if OpenAI is unreachable.
- [x] **Bilingual Support**: Instant toggle between English and Hindi (हिन्दी) across all 6 screens.
- [x] **Responsive Viewport Support**: Tested and verified across Mobile (320px–480px), Tablet (768px–1024px), and Desktop viewports.

### 4. Verified Demo Scenarios
- [x] **Scenario 1**: *Aadhaar Name Mismatch* (`aadhaar_mismatch`) -> High confidence, Grievance draft
- [x] **Scenario 2**: *Employer Approval Pending* (`employer_non_approval`) -> High confidence, Employer action owner
- [x] **Scenario 3**: *Generic Verification Pending* (`verification_pending`) -> Refuses to infer Aadhaar/bank failure, recommends RTI for official notes
- [x] **Scenario 4**: *Past 20-Day Timeline* (`past_20_day_no_response`) -> Recommends RTI citing Citizens' Charter breach
- [x] **Scenario 5**: *Duplicate Claim Flagged* (`duplicate_claim_flagged`) -> Member action owner, warns against re-filing

### 5. Automated Tests
- [x] Taxonomy matching tests (all 12 categories, punctuation, isolated pending)
- [x] 4-tier verification matrix test cases
- [x] Sensitive PII regex filter test cases
- [x] Document template slot replacement & mandatory footer test cases
- [x] All 30 automated assertions passed (0 failures)
