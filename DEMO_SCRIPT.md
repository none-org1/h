# 3-Minute Demonstration Script — PF Claim Decoder

**Target Duration**: 180 seconds (3:00)  
**Presenter**: Solo / Pair presentation  
**Audience**: Hackathon Judges, Civic Tech Evaluators  

---

## ⏱️ Timeline & Step-by-Step Script

### 0:00 – 0:25 | The Citizen Problem
* **Screen**: Landing Page (`/`)
* **Action**: Show landing page, highlight tagline and persistent synthetic notice.
* **Narration**:
  > *"Every year, millions of Indian workers face delayed or rejected PF claims, receiving cryptic remarks like 'Verification pending' or 'Aadhaar mismatch'. Without clarity on what is actually broken or what remains unverified, citizens often make hasty duplicate submissions or file vague complaints that overwhelm official grievance queues.*
  >
  > *Today, we present **PF Claim Decoder & Action Pack** — an independent prototype that translates opaque remarks into verified facts, evidentiary checklists, and tailored legal drafts in under a minute."*

---

### 0:25 – 0:55 | Input & Synthetic Privacy Guardrails
* **Screen**: Input Screen (`/input`)
* **Action**: Click "Try Demo Scenario" -> select **Scenario 1: Aadhaar Name Mismatch** (`DEMO-CLM-2026-001`). Show character count and safety notice. Type a fake 12-digit number to trigger the real-time PII warning banner, then clear it.
* **Narration**:
  > *"On the input screen, we select a pre-loaded synthetic scenario for Aarav Mehta. Notice our strict safety guardrails: the system actively detects and warns against real PII like Aadhaar or bank numbers. No live government APIs or private citizen data are ever connected or stored."*
* **Action**: Click **"Decode Claim Remark"**.

---

### 0:55 – 1:30 | Deterministic Diagnostic Assessment
* **Screen**: Decode Screen (`/decode`)
* **Action**: Point out the matched category (`Aadhaar / Name Mismatch`), confidence badge (`High`), and matched signals (`aadhaar`, `mismatch in name`).
* **Narration**:
  > *"Here is step 2: The diagnosis. Unlike a generic chatbot that might hallucinate a reason, our engine runs a 100% deterministic 12-category matcher. It identifies that the remark suggests a name discrepancy, but clearly notes what it CANNOT verify: whether the Aadhaar is actually invalid. We can also optionally enrich the explanation via OpenAI GPT-4o-mini while strictly preserving the deterministic category."*
* **Action**: Click **"Next Step (Verify Matrix)"**.

---

### 1:30 – 2:05 | The 4-Tier Verification Matrix
* **Screen**: Verification Matrix Screen (`/verify`)
* **Action**: Scroll through the color-coded matrix table. Highlight the status definitions.
* **Narration**:
  > *"This is our core differentiator: the **4-Tier Verification Matrix**. Most citizens assume that if a remark only mentions name mismatch, their bank and employer records are verified. Our matrix enforces the golden rule: **'Not mentioned does not equal verified.'**
  >
  > It separates what is verified from input, what is a possible issue, what is not verified, and what remains unknown."*
* **Action**: Click **"Next Step (Action Plan)"**.

---

### 2:05 – 2:35 | Strategic Action Plan & Document Drafting
* **Screen**: Action Plan (`/action`) -> Documents (`/document`)
* **Action**: Check 2 items on the interactive evidence checklist. Point out the Action Owner badge (`Member`). Click through to `/document`. Toggle between the **EPFiGMS Grievance** tab and the **RTI Application** tab. Click **Copy to Clipboard** and **Download Draft**.
* **Narration**:
  > *"In the Action Plan, we assign an explicit Action Owner—in this case, the Member—along with a checkable evidence audit and a list of 'What NOT to do'.
  >
  > Step 5 generates structured, editable drafts for EPFiGMS grievances and RTI Online applications, explaining the legal distinction between seeking administrative relief and requesting official file notings under Section 6(1) of the RTI Act."*
* **Action**: Click **"Next Step (Official Handoff)"**.

---

### 2:35 – 3:00 | Official Handoff & Wrap-Up
* **Screen**: Handoff Screen (`/handoff`)
* **Action**: Show external portal buttons (`EPFiGMS` and `RTI Online`). Click **"Download Full Action Pack (.txt)"**.
* **Narration**:
  > *"Finally, step 6: The Official Handoff. The prototype cleanly stops here. The citizen downloads their complete action pack and proceeds independently to the official government portals with all required evidence ready.
  >
  > With deterministic taxonomy matching, rigorous evidentiary boundaries, full bilingual support in English and Hindi, and responsive design across all devices, PF Claim Decoder empowers citizens while reducing frivolous grievance filings. Thank you!"*
