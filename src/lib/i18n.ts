// ============================================================
// PF Claim Decoder — Internationalization (EN / HI)
// ============================================================

import { Language } from './types';

export const TRANSLATIONS = {
  en: {
    // Brand & Header
    appName: 'PF Claim Decoder & Action Pack',
    appSubtitle: 'Translate ambiguous PF remarks into verified facts and structured action plans',
    tagline: 'Stop guessing why your PF claim is stuck. Get verified facts, missing evidence checklists, and official grievance/RTI drafts in 60 seconds.',
    independentNotice: 'Independent citizen assistance prototype — not affiliated with or endorsed by EPFO.',
    syntheticNotice: 'SYNTHETIC DEMO DATA ONLY — No live EPFO system, Aadhaar, PAN, bank account, OTP, or private government API is connected.',

    // Navigation & Stepper
    step1: 'Input',
    step2: 'Decode',
    step3: 'Verify Matrix',
    step4: 'Action Plan',
    step5: 'Documents',
    step6: 'Official Handoff',

    // Landing Page
    tryDemoBtn: 'Try Demo Scenario',
    pasteRemarkBtn: 'Paste Claim Remark',
    howItWorksTitle: 'How PF Claim Decoder Works',
    step1Desc: 'Enter synthetic claim remark and tracking details',
    step2Desc: 'Deterministic matching maps remark to 12 official categories',
    step3Desc: 'Four-tier verification matrix separates knowns from unknowns',
    step4Desc: 'Generate tailored Grievance and RTI drafts ready for official portals',
    featuresTitle: 'Key Principles & Safety Boundaries',
    feature1Title: 'Deterministic Taxonomy',
    feature1Desc: '12 fixed EPFO categories. AI cannot hallucinate reasons or alter diagnosis.',
    feature2Title: 'Rigorous Verification Matrix',
    feature2Desc: 'Distinguishes "Verified from Input" vs "Possible Issue" vs "Not Verified". Never treats omission as verified.',
    feature3Title: 'Official Portal Handoff',
    feature3Desc: 'Clean break: drafts can be copied and exported, but submissions occur directly on EPFiGMS or RTI Online.',

    // Input Page
    inputTitle: 'Enter Synthetic Claim Details',
    inputSubtitle: 'Select a pre-loaded demo scenario or test with custom synthetic remark text.',
    demoSelectLabel: 'Quick Load Demo Scenario',
    demoSelectPlaceholder: '-- Choose a test scenario --',
    claimantNameLabel: 'Synthetic Claimant Name',
    claimantNamePlaceholder: 'e.g. Aarav Mehta',
    claimRefLabel: 'Synthetic Claim Reference No.',
    claimRefPlaceholder: 'e.g. DEMO-CLM-2026-001',
    claimTypeLabel: 'Claim Type',
    claimRemarkLabel: 'Claim Remark Text (as shown on portal)',
    claimRemarkPlaceholder: 'Paste the exact remark text here...',
    submissionDateLabel: 'Submission Date',
    employerStateLabel: 'Employer Attestation State',
    kycStateLabel: 'KYC Seeding State',
    sectorLabel: 'Industry Sector (Optional)',
    analyzeBtn: 'Decode Claim Remark',
    charCount: 'characters',

    // Decode Page
    decodeTitle: 'Diagnostic Assessment',
    matchedCategory: 'Matched Category',
    confidenceLevel: 'Matching Confidence',
    whatRemarkSuggests: 'What this Remark Suggests',
    whatNotVerified: 'What the Prototype Cannot Verify',
    cautionTitle: 'Important Caution',
    aiEnhanceBtn: 'Enhance with AI Explainer',
    aiEnhancing: 'Analyzing with AI...',
    sourcesTitle: 'Grounded in Official Sources',

    // Verify Page
    verifyTitle: '4-Tier Verification Matrix',
    verifySubtitle: 'A structured breakdown of what the input establishes versus what remains unverified or unknown.',
    matrixColCondition: 'Condition / Parameter',
    matrixColStatus: 'Verification Status',
    matrixColMeaning: 'Evidentiary Meaning',
    legendTitle: 'Status Definitions',
    statusVerifiedFromInput: 'Verified from Input',
    statusVerifiedFromInputDesc: 'Explicitly stated in supplied synthetic parameters (not verified against official live databases).',
    statusPossibleIssue: 'Possible Issue',
    statusPossibleIssueDesc: 'Directly flagged in remark text or matched category.',
    statusNotVerified: 'Not Verified',
    statusNotVerifiedDesc: 'Cannot be determined without live EPFO or UIDAI system access.',
    statusUnknown: 'Unknown',
    statusUnknownDesc: 'Not mentioned or established by provided input.',

    // Action Page
    actionTitle: 'Strategic Action Plan',
    nextActionTitle: 'Recommended Next Step',
    actionOwnerTitle: 'Likely Action Owner',
    evidenceChecklistTitle: 'Evidence & Checklist',
    whatNotToDoTitle: 'What NOT To Do (Avoid Delays)',
    limitationsTitle: 'Process Limitations',

    // Document Page
    docTitle: 'Action Document Generator',
    docSubtitle: 'Generated draft documents ready to be reviewed, edited, copied, and submitted via official channels.',
    tabGrievance: 'EPFiGMS Grievance Draft',
    tabRti: 'RTI Application Draft',
    copyDocBtn: 'Copy to Clipboard',
    copiedBtn: 'Copied!',
    downloadDocBtn: 'Download Text File',
    missingFieldsWarning: 'Missing Fields Required for Submission:',

    // Handoff Page
    handoffTitle: 'Official Government Portal Handoff',
    handoffSubtitle: 'The prototype stops here. Copy your prepared action drafts and proceed to the official government portals.',
    openEpfigmsBtn: 'Open EPFiGMS Portal (Grievance)',
    openRtiBtn: 'Open RTI Online Portal (RTI Application)',
    downloadActionPackBtn: 'Download Full Action Pack (.txt)',
    startOverBtn: 'Start New Diagnosis',
    handoffWarningTitle: 'Official Submission Instructions',
    handoffWarningBody: 'Please review all drafts carefully. Fill in any missing details before pasting into the official government forms. Never share passwords or OTPs.',

    // Common
    nextBtn: 'Next Step',
    backBtn: 'Previous Step',
    languageToggle: 'हिन्दी',
  },
  hi: {
    // Brand & Header
    appName: 'PF दावा डिकोडर और एक्शन पैक',
    appSubtitle: 'अस्पष्ट PF रिमार्क्स को सत्यापित तथ्यों और संरचित कार्य योजनाओं में बदलें',
    tagline: 'PF दावा क्यों अटका है, इसका अनुमान लगाना बंद करें। 60 सेकंड में सत्यापित तथ्य, छूटे हुए साक्ष्य की चेकलिस्ट और आधिकारिक शिकायत/RTI ड्राफ्ट प्राप्त करें।',
    independentNotice: 'स्वतंत्र नागरिक सहायता प्रोटोटाइप — EPFO द्वारा संबद्ध या समर्थित नहीं।',
    syntheticNotice: 'केवल सिंथेटिक डेमो डेटा — कोई लाइव EPFO सिस्टम, आधार, पैन, बैंक खाता, OTP या निजी सरकारी API कनेक्ट नहीं है।',

    // Navigation & Stepper
    step1: 'इनपुट',
    step2: 'डिकोड',
    step3: 'सत्यापन मैट्रिक्स',
    step4: 'कार्य योजना',
    step5: 'दस्तावेज़',
    step6: 'आधिकारिक हैंडऑफ',

    // Landing Page
    tryDemoBtn: 'डेमो परिदृश्य आज़माएं',
    pasteRemarkBtn: 'दावा रिमार्क पेस्ट करें',
    howItWorksTitle: 'PF दावा डिकोडर कैसे काम करता है',
    step1Desc: 'सिंथेटिक दावा रिमार्क और ट्रैकिंग विवरण दर्ज करें',
    step2Desc: 'नियत मिलान रिमार्क को 12 आधिकारिक श्रेणियों से जोड़ता है',
    step3Desc: 'चार-स्तरीय सत्यापन मैट्रिक्स ज्ञात और अज्ञात को अलग करता है',
    step4Desc: 'आधिकारिक पोर्टलों के लिए तैयार शिकायत और RTI ड्राफ्ट तैयार करें',
    featuresTitle: 'मुख्य सिद्धांत और सुरक्षा सीमाएं',
    feature1Title: 'नियत वर्गीकरण (Deterministic)',
    feature1Desc: '12 निश्चित EPFO श्रेणियां। AI कारणों को मनगढ़ंत नहीं कर सकता।',
    feature2Title: 'कठोर सत्यापन मैट्रिक्स',
    feature2Desc: '"इनपुट से सत्यापित" बनाम "संभावित समस्या" बनाम "असत्यापित" में भेद। चूक को कभी सत्यापित नहीं मानता।',
    feature3Title: 'आधिकारिक पोर्टल हैंडऑफ',
    feature3Desc: 'स्पष्ट सीमा: ड्राफ्ट कॉपी और निर्यात किए जा सकते हैं, लेकिन प्रस्तुतियां केवल EPFiGMS या RTI Online पर होंगी।',

    // Input Page
    inputTitle: 'सिंथेटिक दावा विवरण दर्ज करें',
    inputSubtitle: 'पहले से लोड किए गए डेमो परिदृश्य का चयन करें या कस्टम रिमार्क के साथ परीक्षण करें।',
    demoSelectLabel: 'डेमो परिदृश्य चुनें',
    demoSelectPlaceholder: '-- एक परीक्षण परिदृश्य चुनें --',
    claimantNameLabel: 'सिंथेटिक दावेदार का नाम',
    claimantNamePlaceholder: 'उदा. आरव मेहता',
    claimRefLabel: 'सिंथेटिक दावा संदर्भ संख्या',
    claimRefPlaceholder: 'उदा. DEMO-CLM-2026-001',
    claimTypeLabel: 'दावे का प्रकार',
    claimRemarkLabel: 'दावा रिमार्क पाठ (पोर्टल पर जैसा दिखता है)',
    claimRemarkPlaceholder: 'सटीक रिमार्क पाठ यहाँ पेस्ट करें...',
    submissionDateLabel: 'जमा करने की तिथि',
    employerStateLabel: 'नियोक्ता प्रमाणन स्थिति',
    kycStateLabel: 'KYC सीडिंग स्थिति',
    sectorLabel: 'उद्योग क्षेत्र (वैकल्पिक)',
    analyzeBtn: 'दावा रिमार्क डिकोड करें',
    charCount: 'वर्ण',

    // Decode Page
    decodeTitle: 'नैदानिक मूल्यांकन (Diagnostic Assessment)',
    matchedCategory: 'मेल खाई श्रेणी',
    confidenceLevel: 'मिलान विश्वास',
    whatRemarkSuggests: 'यह रिमार्क क्या दर्शाता है',
    whatNotVerified: 'प्रोटोटाइप क्या सत्यापित नहीं कर सकता',
    cautionTitle: 'महत्वपूर्ण सावधानी',
    aiEnhanceBtn: 'AI व्याख्याता से समृद्ध करें',
    aiEnhancing: 'AI के साथ विश्लेषण जारी...',
    sourcesTitle: 'आधिकारिक स्रोतों पर आधारित',

    // Verify Page
    verifyTitle: '4-स्तरीय सत्यापन मैट्रिक्स',
    verifySubtitle: 'प्रदत्त इनपुट क्या स्थापित करता है और क्या असत्यापित या अज्ञात रहता है, इसका संरचित विवरण।',
    matrixColCondition: 'शर्त / पैरामीटर',
    matrixColStatus: 'सत्यापन स्थिति',
    matrixColMeaning: 'साक्ष्यगत अर्थ',
    legendTitle: 'स्थिति परिभाषाएं',
    statusVerifiedFromInput: 'इनपुट से सत्यापित',
    statusVerifiedFromInputDesc: 'प्रदान किए गए सिंथेटिक मापदंडों में स्पष्ट रूप से बताया गया है (लाइव डेटाबेस पर सत्यापित नहीं)।',
    statusPossibleIssue: 'संभावित समस्या',
    statusPossibleIssueDesc: 'सीधे रिमार्क टेक्स्ट या संबंधित श्रेणी में चिह्नित।',
    statusNotVerified: 'असत्यापित',
    statusNotVerifiedDesc: 'लाइव EPFO या UIDAI सिस्टम एक्सेस के बिना निर्धारित नहीं किया जा सकता।',
    statusUnknown: 'अज्ञात',
    statusUnknownDesc: 'प्रदान किए गए इनपुट द्वारा उल्लेखित या स्थापित नहीं।',

    // Action Page
    actionTitle: 'रणनीतिक कार्य योजना',
    nextActionTitle: 'अनुशंसित अगला कदम',
    actionOwnerTitle: 'संभावित कार्रवाई स्वामी',
    evidenceChecklistTitle: 'साक्ष्य और चेकलिस्ट',
    whatNotToDoTitle: 'क्या न करें (देरी से बचें)',
    limitationsTitle: 'प्रक्रिया की सीमाएं',

    // Document Page
    docTitle: 'एक्शन डॉक्यूमेंट जेनरेटर',
    docSubtitle: 'आधिकारिक चैनलों के माध्यम से समीक्षा, संपादन, कॉपी और सबमिट करने के लिए तैयार ड्राफ्ट।',
    tabGrievance: 'EPFiGMS शिकायत ड्राफ्ट',
    tabRti: 'RTI आवेदन ड्राफ्ट',
    copyDocBtn: 'क्लिपबोर्ड पर कॉपी करें',
    copiedBtn: 'कॉपी हो गया!',
    downloadDocBtn: 'टेक्स्ट फ़ाइल डाउनलोड करें',
    missingFieldsWarning: 'प्रस्तुतीकरण के लिए आवश्यक छूटे हुए विवरण:',

    // Handoff Page
    handoffTitle: 'आधिकारिक सरकारी पोर्टल हैंडऑफ',
    handoffSubtitle: 'प्रोटोटाइप यहाँ समाप्त होता है। अपने तैयार ड्राफ्ट कॉपी करें और आधिकारिक सरकारी पोर्टलों पर आगे बढ़ें।',
    openEpfigmsBtn: 'EPFiGMS पोर्टल खोलें (शिकायत)',
    openRtiBtn: 'RTI Online पोर्टल खोलें (RTI आवेदन)',
    downloadActionPackBtn: 'पूर्ण एक्शन पैक डाउनलोड करें (.txt)',
    startOverBtn: 'नया विश्लेषण शुरू करें',
    handoffWarningTitle: 'आधिकारिक सबमिशन निर्देश',
    handoffWarningBody: 'कृपया सभी ड्राफ्ट की सावधानीपूर्वक समीक्षा करें। सरकारी फॉर्म में पेस्ट करने से पहले छूटे हुए विवरण भरें। कभी भी पासवर्ड या OTP साझा न करें।',

    // Common
    nextBtn: 'अगला कदम',
    backBtn: 'पिछला कदम',
    languageToggle: 'English',
  },
};

export function getTranslation(lang: Language = 'en') {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
