// ============================================================
// PF Claim Decoder & Action Pack — Fixed 12-Category Taxonomy
// ============================================================
// This taxonomy is STATIC and DETERMINISTIC.
// The AI model must NEVER create new categories.
// ============================================================

import { TaxonomyEntry } from './types';

export const TAXONOMY: TaxonomyEntry[] = [
  // ── 1. Aadhaar / name mismatch ──────────────────────────
  {
    id: 'aadhaar_mismatch',
    label: 'Aadhaar / Name Mismatch',
    labelHi: 'आधार / नाम में विसंगति',
    keywords: [
      'aadhaar', 'aadhar', 'adhar', 'name mismatch', 'name does not match',
      'name discrepancy', 'aadhaar linked', 'aadhaar record', 'aadhaar number',
      'name verification', 'aadhaar name', 'uidai', 'mismatch in name',
      'name not matching', 'aadhaar mismatch',
    ],
    phrases: [
      'mismatch in name with aadhaar',
      'name does not match with aadhaar',
      'aadhaar name mismatch',
      'name mismatch with aadhaar-linked records',
      'claim returned due to mismatch in name',
    ],
    explanationTemplate:
      'The supplied synthetic remark suggests a possible name mismatch between the member record and Aadhaar-linked records. This does not confirm that Aadhaar is invalid or that the name is wrong — only that a discrepancy was flagged.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क से पता चलता है कि सदस्य रिकॉर्ड और आधार-लिंक्ड रिकॉर्ड में नाम में संभावित विसंगति हो सकती है। इसका मतलब यह नहीं है कि आधार अमान्य है — केवल यह कि एक विसंगति फ्लैग की गई है।',
    checklist: [
      'Check if the name on your Aadhaar card matches your EPF member record exactly',
      'Look for spelling differences, middle name presence/absence, or initials',
      'If names differ, consider applying for Aadhaar correction at the nearest enrolment centre',
      'Alternatively, request employer to update member name in ECR/portal',
      'Gather: Aadhaar card copy, PAN card, any official name change document',
    ],
    checklistHi: [
      'जांचें कि आपके आधार कार्ड पर नाम EPF सदस्य रिकॉर्ड से बिल्कुल मेल खाता है',
      'वर्तनी में अंतर, मध्य नाम की उपस्थिति/अनुपस्थिति, या आद्याक्षर देखें',
      'यदि नाम अलग हैं, तो निकटतम नामांकन केंद्र पर आधार सुधार के लिए आवेदन करें',
      'वैकल्पिक रूप से, नियोक्ता से ECR/पोर्टल में सदस्य नाम अपडेट करने का अनुरोध करें',
      'एकत्र करें: आधार कार्ड कॉपी, पैन कार्ड, कोई भी आधिकारिक नाम परिवर्तन दस्तावेज',
    ],
    recommendedDoc: 'grievance',
    actionOwner: 'member',
    notVerifiedConditions: [
      'Whether the official member record and Aadhaar-linked name actually differ',
      'Whether Aadhaar is valid or linked to the UAN',
      'Whether the employer has updated member details',
    ],
    whatNotToDo: [
      'Do not assume Aadhaar is invalid',
      'Do not create a new UAN',
      'Do not submit multiple correction requests simultaneously',
    ],
  },

  // ── 2. Employer non-approval ────────────────────────────
  {
    id: 'employer_non_approval',
    label: 'Employer Non-Approval',
    labelHi: 'नियोक्ता स्वीकृति लंबित',
    keywords: [
      'employer', 'employer approval', 'employer pending', 'employer not approved',
      'employer verification', 'establishment', 'employer sign', 'employer attestation',
      'employer has not', 'awaiting employer', 'employer action',
    ],
    phrases: [
      'pending for employer approval',
      'employer has not approved',
      'awaiting employer verification',
      'employer approval pending',
      'claim pending employer',
    ],
    explanationTemplate:
      'The supplied synthetic remark indicates the claim may be pending employer approval or attestation. The employer has not yet approved or attested the claim in the EPFO system.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क से पता चलता है कि दावा नियोक्ता की स्वीकृति या प्रमाणन के लिए लंबित हो सकता है। नियोक्ता ने अभी तक EPFO सिस्टम में दावे को स्वीकृत नहीं किया है।',
    checklist: [
      'Contact your employer\'s HR or accounts department',
      'Request employer to log into the EPFO employer portal and approve the claim',
      'Note the date you contacted the employer for your records',
      'If employer is unresponsive after reasonable time, consider filing a grievance',
      'Gather: Employer contact details, date of claim submission, any communication records',
    ],
    checklistHi: [
      'अपने नियोक्ता के HR या लेखा विभाग से संपर्क करें',
      'नियोक्ता से EPFO नियोक्ता पोर्टल पर लॉग इन करके दावे को स्वीकृत करने का अनुरोध करें',
      'अपने रिकॉर्ड के लिए नियोक्ता से संपर्क की तारीख नोट करें',
      'यदि नियोक्ता उचित समय बाद भी अनुत्तरदायी है, तो शिकायत दर्ज करने पर विचार करें',
      'एकत्र करें: नियोक्ता संपर्क विवरण, दावा प्रस्तुत करने की तारीख, कोई भी संचार रिकॉर्ड',
    ],
    recommendedDoc: 'grievance',
    actionOwner: 'employer',
    notVerifiedConditions: [
      'Whether the employer has received the approval request',
      'Whether the employer portal shows the claim',
      'Whether there is a specific reason for non-approval',
    ],
    whatNotToDo: [
      'Do not assume the employer is deliberately withholding approval',
      'Do not file a new claim while the current one is pending',
      'Do not bypass employer — some claim types require employer attestation',
    ],
  },

  // ── 3. EPS eligibility gap ──────────────────────────────
  {
    id: 'eps_eligibility_gap',
    label: 'EPS Eligibility Gap',
    labelHi: 'EPS पात्रता में कमी',
    keywords: [
      'eps', 'pension', 'eligibility', 'service', 'years of service',
      'pension eligibility', 'eps 95', 'pension scheme', 'eps eligibility',
      'minimum service', 'pensionable service', 'not eligible for pension',
    ],
    phrases: [
      'not eligible for pension',
      'eps eligibility',
      'pension service requirement',
      'minimum pensionable service not met',
      'eps scheme eligibility',
    ],
    explanationTemplate:
      'The supplied synthetic remark suggests a possible gap in EPS (Employees\' Pension Scheme) eligibility. This may relate to minimum service years or other pension scheme requirements.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क से पता चलता है कि EPS (कर्मचारी पेंशन योजना) पात्रता में संभावित कमी हो सकती है। यह न्यूनतम सेवा वर्षों या अन्य पेंशन योजना आवश्यकताओं से संबंधित हो सकता है।',
    checklist: [
      'Check your total pensionable service years',
      'Verify if you meet the minimum 10 years of service requirement for pension',
      'Check if all employers have contributed to EPS correctly',
      'Gather: Service history, Form 10D if applicable, salary slips showing EPS deduction',
      'Consider whether withdrawal benefit (for <10 years) or scheme certificate applies',
    ],
    checklistHi: [
      'अपने कुल पेंशन योग्य सेवा वर्षों की जांच करें',
      'सत्यापित करें कि आप पेंशन के लिए न्यूनतम 10 वर्ष की सेवा आवश्यकता पूरी करते हैं',
      'जांचें कि सभी नियोक्ताओं ने EPS में सही ढंग से योगदान दिया है',
      'एकत्र करें: सेवा इतिहास, फॉर्म 10D यदि लागू हो, EPS कटौती दिखाने वाली वेतन पर्ची',
      'विचार करें कि निकासी लाभ (<10 वर्ष) या योजना प्रमाणपत्र लागू होता है या नहीं',
    ],
    recommendedDoc: 'grievance',
    actionOwner: 'member',
    notVerifiedConditions: [
      'Whether the actual service years meet the eligibility threshold',
      'Whether all service periods are correctly recorded',
      'Whether EPS contributions were made for the entire service period',
    ],
    whatNotToDo: [
      'Do not assume you are ineligible without checking service records',
      'Do not confuse EPF withdrawal with EPS pension claim',
      'Do not withdraw EPS amount if you may reach 10 years with future service',
    ],
  },

  // ── 4. KYC incomplete ──────────────────────────────────
  {
    id: 'kyc_incomplete',
    label: 'KYC Incomplete',
    labelHi: 'KYC अधूरा',
    keywords: [
      'kyc', 'kyc incomplete', 'kyc pending', 'kyc not verified',
      'kyc verification', 'kyc update', 'kyc approval', 'kyc mismatch',
      'know your customer', 'identity verification', 'kyc not approved',
      'kyc rejected', 'kyc documents',
    ],
    phrases: [
      'kyc incomplete',
      'kyc pending',
      'kyc not verified',
      'kyc verification pending',
      'complete your kyc',
      'kyc documents not approved',
    ],
    explanationTemplate:
      'The supplied synthetic remark suggests that KYC (Know Your Customer) verification may be incomplete or pending. This could involve Aadhaar, PAN, bank details, or other identity documents not being verified in the system.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क से पता चलता है कि KYC (अपने ग्राहक को जानें) सत्यापन अधूरा या लंबित हो सकता है। इसमें आधार, पैन, बैंक विवरण, या अन्य पहचान दस्तावेज शामिल हो सकते हैं।',
    checklist: [
      'Log into the EPFO member portal and check KYC status',
      'Verify that Aadhaar, PAN, and bank account are linked and approved',
      'If KYC is pending employer approval, contact employer to approve',
      'Ensure bank account is in your name and IFSC is correct',
      'Gather: Aadhaar, PAN, bank passbook/statement, cancelled cheque',
    ],
    checklistHi: [
      'EPFO सदस्य पोर्टल पर लॉग इन करें और KYC स्थिति जांचें',
      'सत्यापित करें कि आधार, पैन और बैंक खाता लिंक और स्वीकृत हैं',
      'यदि KYC नियोक्ता स्वीकृति के लिए लंबित है, तो नियोक्ता से स्वीकृत करने का अनुरोध करें',
      'सुनिश्चित करें कि बैंक खाता आपके नाम पर है और IFSC सही है',
      'एकत्र करें: आधार, पैन, बैंक पासबुक/स्टेटमेंट, रद्द चेक',
    ],
    recommendedDoc: 'grievance',
    actionOwner: 'member',
    notVerifiedConditions: [
      'Which specific KYC document is incomplete or rejected',
      'Whether the employer has approved the KYC update',
      'Whether the uploaded documents are legible and valid',
    ],
    whatNotToDo: [
      'Do not submit a claim while KYC is incomplete',
      'Do not upload expired documents',
      'Do not create a new UAN to bypass KYC requirements',
    ],
  },

  // ── 5. Bank / IFSC mismatch ─────────────────────────────
  {
    id: 'bank_ifsc_mismatch',
    label: 'Bank / IFSC Mismatch',
    labelHi: 'बैंक / IFSC विसंगति',
    keywords: [
      'bank', 'ifsc', 'bank mismatch', 'bank account', 'bank details',
      'ifsc code', 'bank verification', 'bank not matching', 'account number',
      'bank name mismatch', 'bank ifsc', 'incorrect bank', 'wrong bank',
    ],
    phrases: [
      'bank account mismatch',
      'ifsc code mismatch',
      'bank details do not match',
      'incorrect bank account',
      'bank verification failed',
    ],
    explanationTemplate:
      'The supplied synthetic remark suggests a possible mismatch in bank account details or IFSC code. The bank details on file may not match the verified records.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क से पता चलता है कि बैंक खाता विवरण या IFSC कोड में संभावित विसंगति हो सकती है।',
    checklist: [
      'Verify your bank account number and IFSC code in the EPFO member portal',
      'Cross-check with your bank passbook or latest bank statement',
      'If bank has merged or branch IFSC has changed, update the new IFSC',
      'Ensure the account is active and in your name',
      'Gather: Bank passbook, cancelled cheque, latest bank statement',
    ],
    checklistHi: [
      'EPFO सदस्य पोर्टल में अपना बैंक खाता नंबर और IFSC कोड सत्यापित करें',
      'अपनी बैंक पासबुक या नवीनतम बैंक स्टेटमेंट से क्रॉस-चेक करें',
      'यदि बैंक का विलय हुआ है या शाखा IFSC बदला है, तो नया IFSC अपडेट करें',
      'सुनिश्चित करें कि खाता सक्रिय है और आपके नाम पर है',
      'एकत्र करें: बैंक पासबुक, रद्द चेक, नवीनतम बैंक स्टेटमेंट',
    ],
    recommendedDoc: 'grievance',
    actionOwner: 'member',
    notVerifiedConditions: [
      'Whether the bank account is active',
      'Whether the IFSC code corresponds to the correct branch',
      'Whether the name on the bank account matches the EPF record',
    ],
    whatNotToDo: [
      'Do not provide someone else\'s bank account',
      'Do not use a closed or dormant account',
      'Do not ignore IFSC changes due to bank mergers',
    ],
  },

  // ── 6. Duplicate claim flagged ──────────────────────────
  {
    id: 'duplicate_claim_flagged',
    label: 'Duplicate Claim Flagged',
    labelHi: 'डुप्लिकेट दावा चिह्नित',
    keywords: [
      'duplicate', 'duplicate claim', 'already exists', 'duplicate request',
      'multiple claims', 'claim already', 'previous claim', 'existing claim',
      'same claim', 'repeated claim',
    ],
    phrases: [
      'duplicate claim already exists',
      'duplicate claim flagged',
      'claim already exists for this member',
      'previous claim pending',
      'multiple claims detected',
    ],
    explanationTemplate:
      'The supplied synthetic remark suggests that a duplicate claim may have been flagged. This could mean a previous claim for the same purpose is already pending or processed.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क से पता चलता है कि एक डुप्लिकेट दावा चिह्नित किया गया हो सकता है। इसका मतलब यह हो सकता है कि उसी उद्देश्य के लिए पिछला दावा पहले से लंबित या संसाधित है।',
    checklist: [
      'Check the EPFO member portal for any existing pending claims',
      'Verify if a previous claim was submitted and its status',
      'If a previous claim was rejected, check if it needs to be resolved first',
      'Do not submit another claim until the duplicate flag is resolved',
      'Gather: Previous claim reference numbers, submission dates',
    ],
    checklistHi: [
      'EPFO सदस्य पोर्टल पर किसी भी मौजूदा लंबित दावे की जांच करें',
      'सत्यापित करें कि क्या पिछला दावा जमा किया गया था और उसकी स्थिति',
      'यदि पिछला दावा अस्वीकृत था, तो जांचें कि क्या उसे पहले हल करना होगा',
      'डुप्लिकेट फ्लैग हल होने तक एक और दावा जमा न करें',
      'एकत्र करें: पिछले दावा संदर्भ नंबर, जमा करने की तारीखें',
    ],
    recommendedDoc: 'grievance',
    actionOwner: 'member',
    notVerifiedConditions: [
      'Whether a previous claim actually exists',
      'Whether the previous claim was processed or is still pending',
      'Whether the duplicate flag is an error',
    ],
    whatNotToDo: [
      'Do not submit yet another claim while the duplicate flag exists',
      'Do not ignore the previous claim status',
      'Do not assume the system made an error without checking',
    ],
  },

  // ── 7. Missing exit date ────────────────────────────────
  {
    id: 'missing_exit_date',
    label: 'Missing Exit Date',
    labelHi: 'निकास तिथि गायब',
    keywords: [
      'exit date', 'date of exit', 'leaving date', 'exit not updated',
      'exit date missing', 'date of leaving', 'separation date',
      'exit not marked', 'no exit date',
    ],
    phrases: [
      'exit date not updated',
      'date of exit missing',
      'exit date not available',
      'employer has not updated exit date',
      'date of leaving not marked',
    ],
    explanationTemplate:
      'The supplied synthetic remark suggests the date of exit (date of leaving) may not be updated in the system. The employer typically needs to mark the exit date before certain claims can be processed.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क से पता चलता है कि निकास तिथि (छोड़ने की तारीख) सिस्टम में अपडेट नहीं हो सकती है। कुछ दावों को संसाधित करने से पहले नियोक्ता को आमतौर पर निकास तिथि अंकित करनी होती है।',
    checklist: [
      'Contact your previous employer to update the exit date in the EPFO portal',
      'Provide the employer with your last working date',
      'If employer is non-responsive, file a grievance mentioning the missing exit date',
      'Check the EPFO member portal to confirm exit date status',
      'Gather: Resignation letter/acceptance, relieving letter, last working date proof',
    ],
    checklistHi: [
      'EPFO पोर्टल में निकास तिथि अपडेट करने के लिए अपने पिछले नियोक्ता से संपर्क करें',
      'नियोक्ता को अपनी अंतिम कार्य तिथि प्रदान करें',
      'यदि नियोक्ता अनुत्तरदायी है, तो गायब निकास तिथि का उल्लेख करते हुए शिकायत दर्ज करें',
      'EPFO सदस्य पोर्टल पर निकास तिथि स्थिति की पुष्टि करें',
      'एकत्र करें: इस्तीफा पत्र/स्वीकृति, राहत पत्र, अंतिम कार्य तिथि का प्रमाण',
    ],
    recommendedDoc: 'grievance',
    actionOwner: 'employer',
    notVerifiedConditions: [
      'Whether the exit date is actually missing in the EPFO system',
      'Whether the employer has been contacted',
      'Whether the employer is still operational',
    ],
    whatNotToDo: [
      'Do not update the exit date yourself if only employer can do it',
      'Do not submit a new claim without resolving exit date issue',
      'Do not assume the employer will update without being contacted',
    ],
  },

  // ── 8. Dues / arrears pending ───────────────────────────
  {
    id: 'dues_arrears_pending',
    label: 'Dues / Arrears Pending',
    labelHi: 'बकाया / एरियर लंबित',
    keywords: [
      'dues', 'arrears', 'outstanding', 'pending dues', 'unpaid',
      'employer dues', 'contribution pending', 'arrears pending',
      'outstanding balance', 'dues not paid', 'challan',
    ],
    phrases: [
      'dues pending',
      'arrears pending from employer',
      'employer has outstanding dues',
      'contribution not deposited',
      'pending challan',
    ],
    explanationTemplate:
      'The supplied synthetic remark suggests there may be pending dues or arrears from the employer. This could delay claim processing until the employer deposits the outstanding contributions.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क से पता चलता है कि नियोक्ता से बकाया या एरियर लंबित हो सकते हैं। नियोक्ता द्वारा बकाया योगदान जमा करने तक दावा प्रसंस्करण में देरी हो सकती है।',
    checklist: [
      'Check your passbook on the EPFO member portal for recent contributions',
      'Contact your employer about any outstanding PF contributions',
      'If employer has closed, mention this in your grievance',
      'Check if the regional PF office can process the claim despite pending dues',
      'Gather: EPF passbook, salary slips showing PF deduction, employer communication',
    ],
    checklistHi: [
      'हाल के योगदानों के लिए EPFO सदस्य पोर्टल पर अपनी पासबुक जांचें',
      'किसी भी बकाया PF योगदान के बारे में अपने नियोक्ता से संपर्क करें',
      'यदि नियोक्ता बंद हो गया है, तो अपनी शिकायत में इसका उल्लेख करें',
      'जांचें कि क्या क्षेत्रीय PF कार्यालय बकाया के बावजूद दावा संसाधित कर सकता है',
      'एकत्र करें: EPF पासबुक, PF कटौती दिखाने वाली वेतन पर्ची, नियोक्ता संचार',
    ],
    recommendedDoc: 'grievance',
    actionOwner: 'employer',
    notVerifiedConditions: [
      'Whether dues are actually pending',
      'The amount of outstanding dues',
      'Whether the employer has been notified',
    ],
    whatNotToDo: [
      'Do not assume your claim will be rejected permanently',
      'Do not pay the employer\'s share of dues yourself',
      'Do not ignore — pending dues may affect your final settlement amount',
    ],
  },

  // ── 9. Transfer — multiple UAN conflict ─────────────────
  {
    id: 'multiple_uan_conflict',
    label: 'Transfer — Multiple UAN Conflict',
    labelHi: 'ट्रांसफर — एकाधिक UAN विवाद',
    keywords: [
      'transfer', 'uan', 'multiple uan', 'uan conflict', 'uan merge',
      'member id', 'previous uan', 'uan mismatch', 'transfer claim',
      'consolidation', 'uan consolidation', 'two uan', 'duplicate uan',
    ],
    phrases: [
      'multiple uan',
      'uan conflict',
      'transfer pending due to uan',
      'uan merge required',
      'duplicate uan detected',
      'consolidate uan',
    ],
    explanationTemplate:
      'The supplied synthetic remark suggests a conflict involving multiple UANs (Universal Account Numbers). This may require UAN consolidation or a transfer between accounts before the claim can proceed.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क से पता चलता है कि एकाधिक UAN (यूनिवर्सल अकाउंट नंबर) से जुड़ा विवाद हो सकता है। दावे को आगे बढ़ने से पहले UAN एकीकरण या खातों के बीच ट्रांसफर की आवश्यकता हो सकती है।',
    checklist: [
      'Identify all UANs associated with your Aadhaar/PAN',
      'Determine which UAN should be the primary/active one',
      'Request employer to initiate UAN merge/consolidation through the employer portal',
      'Submit a transfer claim (Form 13) if balances need to be consolidated',
      'Gather: All UAN numbers, previous employer details, member IDs',
    ],
    checklistHi: [
      'अपने आधार/पैन से जुड़े सभी UAN की पहचान करें',
      'निर्धारित करें कि कौन सा UAN प्राथमिक/सक्रिय होना चाहिए',
      'नियोक्ता से नियोक्ता पोर्टल के माध्यम से UAN मर्ज/एकीकरण शुरू करने का अनुरोध करें',
      'यदि शेष राशि को समेकित करने की आवश्यकता है तो ट्रांसफर दावा (फॉर्म 13) जमा करें',
      'एकत्र करें: सभी UAN नंबर, पिछले नियोक्ता विवरण, सदस्य ID',
    ],
    recommendedDoc: 'both',
    actionOwner: 'member',
    notVerifiedConditions: [
      'How many UANs exist for this member',
      'Whether a transfer request has been submitted',
      'Whether previous employer cooperation is needed',
    ],
    whatNotToDo: [
      'Do not create yet another UAN',
      'Do not submit claims from multiple UANs simultaneously',
      'Do not ignore — unresolved UAN conflicts can delay all claims',
    ],
  },

  // ── 10. Generic "verification pending" ──────────────────
  {
    id: 'verification_pending',
    label: 'Generic "Verification Pending"',
    labelHi: 'सामान्य "सत्यापन लंबित"',
    keywords: [
      'verification', 'verification pending', 'under verification',
      'under process', 'being verified', 'under review',
    ],
    phrases: [
      'verification pending',
      'under verification',
      'claim under process',
      'being verified',
    ],
    explanationTemplate:
      'The supplied synthetic remark states "verification pending" without specifying what verification is pending or why. This is a generic status that does not establish whether the issue is related to Aadhaar, KYC, bank, employer, or any other specific factor. The prototype cannot determine the specific cause from this remark alone.',
    explanationTemplateHi:
      'सिंथेटिक रिमार्क "सत्यापन लंबित" कहता है बिना यह बताए कि कौन सा सत्यापन लंबित है या क्यों। यह एक सामान्य स्थिति है जो यह स्थापित नहीं करती कि समस्या आधार, KYC, बैंक, नियोक्ता, या किसी अन्य विशिष्ट कारक से संबंधित है।',
    checklist: [
      'Note: The remark does not specify what is being verified',
      'Check the EPFO member portal for any additional status details',
      'Verify that your KYC details are complete and approved',
      'If status has not changed for an extended period, consider filing an RTI to request specific information',
      'Gather: Claim reference number, submission date, any previous communication',
    ],
    checklistHi: [
      'ध्यान दें: रिमार्क यह नहीं बताता कि क्या सत्यापित किया जा रहा है',
      'किसी भी अतिरिक्त स्थिति विवरण के लिए EPFO सदस्य पोर्टल जांचें',
      'सत्यापित करें कि आपका KYC विवरण पूर्ण और स्वीकृत है',
      'यदि स्थिति लंबे समय से नहीं बदली है, तो विशिष्ट जानकारी के लिए RTI दाखिल करने पर विचार करें',
      'एकत्र करें: दावा संदर्भ नंबर, जमा करने की तारीख, कोई भी पिछला संचार',
    ],
    recommendedDoc: 'rti',
    actionOwner: 'EPFO',
    notVerifiedConditions: [
      'What specific verification is pending',
      'Whether Aadhaar, KYC, bank, or employer approval is the issue',
      'Whether any action by the member or employer is required',
      'The expected timeline for verification completion',
    ],
    whatNotToDo: [
      'Do not assume Aadhaar, KYC, bank, or employer failure',
      'Do not submit a duplicate claim',
      'Do not assume no action is needed — check portal for details',
    ],
  },

  // ── 11. Past 20-day service timeline, no response ──────
  {
    id: 'past_20_day_no_response',
    label: 'Past Stated 20-Day Timeline — No Response',
    labelHi: 'निर्धारित 20-दिन की समयसीमा पार — कोई जवाब नहीं',
    keywords: [
      '20 day', '20 days', 'service timeline', 'no response', 'no update',
      'no action', 'delayed', 'delay', 'overdue', 'timeline exceeded',
      'no meaningful response', 'stated timeline', 'service standard',
    ],
    phrases: [
      'no meaningful response after the stated service timeline',
      'past 20 day timeline',
      'exceeded service timeline',
      'no response after 20 days',
      'claim delayed beyond timeline',
    ],
    explanationTemplate:
      'The supplied synthetic scenario indicates the claim may have exceeded the stated 20-day service timeline without a meaningful response. The EPFO Citizens\' Charter mentions a service timeline, but this prototype cannot verify official processing dates or determine the official reason for delay.',
    explanationTemplateHi:
      'सिंथेटिक परिदृश्य इंगित करता है कि दावा बिना किसी सार्थक प्रतिक्रिया के निर्धारित 20-दिन की सेवा समयसीमा को पार कर गया हो सकता है। EPFO नागरिक चार्टर एक सेवा समयसीमा का उल्लेख करता है, लेकिन यह प्रोटोटाइप आधिकारिक प्रसंस्करण तिथियों को सत्यापित नहीं कर सकता।',
    checklist: [
      'Note the date of original claim submission',
      'Calculate the number of days since submission',
      'Check if any intermediate status updates were provided',
      'Consider filing an RTI request to know the specific reason for delay',
      'A grievance may also be appropriate if the delay is unreasonable',
      'Gather: Claim submission confirmation, dates, any status screenshots',
    ],
    checklistHi: [
      'मूल दावा जमा करने की तारीख नोट करें',
      'जमा करने के बाद से दिनों की संख्या गिनें',
      'जांचें कि क्या कोई मध्यवर्ती स्थिति अपडेट प्रदान किया गया था',
      'देरी का विशिष्ट कारण जानने के लिए RTI अनुरोध दाखिल करने पर विचार करें',
      'यदि देरी अनुचित है तो शिकायत भी उचित हो सकती है',
      'एकत्र करें: दावा जमा करने की पुष्टि, तारीखें, कोई भी स्थिति स्क्रीनशॉट',
    ],
    recommendedDoc: 'rti',
    actionOwner: 'EPFO',
    notVerifiedConditions: [
      'The official date the claim was received by EPFO',
      'Whether any internal processing has occurred',
      'The official reason for the delay',
      'Whether additional information was requested but not communicated',
    ],
    whatNotToDo: [
      'Do not declare a legal violation — this prototype cannot make legal determinations',
      'Do not claim official wrongdoing',
      'Do not file multiple grievances about the same issue simultaneously',
    ],
  },

  // ── 12. Other / unclear ─────────────────────────────────
  {
    id: 'other_unclear',
    label: 'Other / Unclear',
    labelHi: 'अन्य / अस्पष्ट',
    keywords: [],
    phrases: [],
    explanationTemplate:
      'No specific reason can be established from this remark. The remark does not clearly indicate whether the issue is related to Aadhaar, KYC, bank, employer, pension eligibility, or any other specific factor. Do not assume any particular cause.',
    explanationTemplateHi:
      'इस रिमार्क से कोई विशिष्ट कारण स्थापित नहीं किया जा सकता। रिमार्क स्पष्ट रूप से यह नहीं बताता कि समस्या आधार, KYC, बैंक, नियोक्ता, पेंशन पात्रता, या किसी अन्य विशिष्ट कारक से संबंधित है।',
    checklist: [
      'Review the full remark carefully for any additional clues',
      'Check the EPFO member portal for more detailed status',
      'Verify all KYC details are complete and approved',
      'Consider filing an RTI request for specific information about your claim',
      'Gather: Claim reference, submission date, full remark text, any previous correspondence',
    ],
    checklistHi: [
      'किसी भी अतिरिक्त सुराग के लिए पूर्ण रिमार्क की सावधानीपूर्वक समीक्षा करें',
      'अधिक विस्तृत स्थिति के लिए EPFO सदस्य पोर्टल जांचें',
      'सत्यापित करें कि सभी KYC विवरण पूर्ण और स्वीकृत हैं',
      'अपने दावे के बारे में विशिष्ट जानकारी के लिए RTI अनुरोध दाखिल करने पर विचार करें',
      'एकत्र करें: दावा संदर्भ, जमा करने की तारीख, पूर्ण रिमार्क टेक्स्ट, कोई भी पिछला पत्र-व्यवहार',
    ],
    recommendedDoc: 'rti',
    actionOwner: 'unknown',
    notVerifiedConditions: [
      'The specific reason for the claim status',
      'Whether any action by the member is required',
      'Whether any action by the employer is required',
      'The expected timeline for resolution',
    ],
    whatNotToDo: [
      'Do not assume Aadhaar, bank, KYC, or employer failure',
      'Do not take action based on assumed causes',
      'Do not ignore the status — seek clarification through official channels',
    ],
  },
];

/** Lookup a taxonomy entry by ID */
export function getTaxonomyEntry(id: string): TaxonomyEntry | undefined {
  return TAXONOMY.find((entry) => entry.id === id);
}

/** Get all taxonomy IDs */
export function getAllCategoryIds(): string[] {
  return TAXONOMY.map((entry) => entry.id);
}
