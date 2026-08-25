// ============================================================
// PF Claim Decoder — Action Recommendation Engine
// ============================================================
// Generates a structured action plan based on the matched category,
// claim age, and synthetic input conditions.
// ============================================================

import { ActionPlan, ClaimInput, MatchResult } from './types';
import { getTaxonomyEntry } from './taxonomy';

export function buildActionPlan(
  input: ClaimInput,
  match: MatchResult
): ActionPlan {
  const entry = getTaxonomyEntry(match.categoryId);

  if (!entry) {
    return {
      nextAction: 'Seek official clarification via EPFiGMS or RTI Online.',
      nextActionHi: 'EPFiGMS या RTI Online के माध्यम से आधिकारिक स्पष्टीकरण प्राप्त करें।',
      actionOwner: 'unknown',
      reason: 'The remark could not be matched with high confidence to a known category.',
      reasonHi: 'रिमार्क को किसी ज्ञात श्रेणी से उच्च विश्वास के साथ मेल नहीं किया जा सका।',
      checklist: [
        'Review the full remark text on the official portal',
        'Verify KYC status on the UAN member portal',
        'Check submission date and reference number',
      ],
      checklistHi: [
        'आधिकारिक पोर्टल पर पूर्ण रिमार्क पाठ की समीक्षा करें',
        'UAN सदस्य पोर्टल पर KYC स्थिति सत्यापित करें',
        'जमा करने की तिथि और संदर्भ संख्या जांचें',
      ],
      whatNotToDo: [
        'Do not assume any specific failure without official clarification',
        'Do not submit multiple conflicting claims',
      ],
      whatNotToDoHi: [
        'आधिकारिक स्पष्टीकरण के बिना किसी विशिष्ट विफलता का अनुमान न लगाएं',
        'एकाधिक परस्पर विरोधी दावे प्रस्तुत न करें',
      ],
      recommendedDoc: 'rti',
      limitations: 'The prototype cannot verify internal EPFO processing status.',
      limitationsHi: 'प्रोटोटाइप आंतरिक EPFO प्रसंस्करण स्थिति को सत्यापित नहीं कर सकता।',
    };
  }

  // Determine dynamic next action depending on category and input
  let nextAction = '';
  let nextActionHi = '';
  let reason = '';
  let reasonHi = '';

  switch (entry.id) {
    case 'aadhaar_mismatch':
      nextAction = 'Cross-verify spelling and date of birth across Aadhaar and EPF member portal.';
      nextActionHi = 'आधार और EPF सदस्य पोर्टल में वर्तनी और जन्म तिथि का मिलान करें।';
      reason = 'The remark suggests discrepancy in name or demographic details with Aadhaar-linked records.';
      reasonHi = 'रिमार्क आधार-लिंक्ड रिकॉर्ड के साथ नाम या जनसांख्यिकीय विवरण में विसंगति का संकेत देता है।';
      break;

    case 'employer_non_approval':
      nextAction = 'Follow up with employer HR/Accounts team to approve claim on EPFO Employer Portal.';
      nextActionHi = 'EPFO नियोक्ता पोर्टल पर दावे को स्वीकृत करने के लिए नियोक्ता HR/लेखा टीम से संपर्क करें।';
      reason = 'Claim processing requires digital signature/attestation from the establishment.';
      reasonHi = 'दावा प्रसंस्करण के लिए प्रतिष्ठान से डिजिटल हस्ताक्षर/प्रमाणन की आवश्यकता है।';
      break;

    case 'eps_eligibility_gap':
      nextAction = 'Audit total pensionable service in passbook and verify Form 10D vs Form 19/10C requirements.';
      nextActionHi = 'पासबुक में कुल पेंशन योग्य सेवा की जांच करें और फॉर्म 10D बनाम फॉर्म 19/10C आवश्यकताओं का सत्यापन करें।';
      reason = 'Remark points towards insufficient service years or pension scheme criteria.';
      reasonHi = 'रिमार्क अपर्याप्त सेवा वर्षों या पेंशन योजना मानदंडों की ओर संकेत करता है।';
      break;

    case 'kyc_incomplete':
      nextAction = 'Submit/update missing KYC documents on UAN portal and get employer approval.';
      nextActionHi = 'UAN पोर्टल पर छूटे हुए KYC दस्तावेज जमा/अपडेट करें और नियोक्ता की स्वीकृति प्राप्त करें।';
      reason = 'Aadhaar, PAN, or Bank KYC is missing or unapproved in member profile.';
      reasonHi = 'सदस्य प्रोफ़ाइल में आधार, पैन, या बैंक KYC अनुपस्थित या अस्वीकृत है।';
      break;

    case 'bank_ifsc_mismatch':
      nextAction = 'Re-upload valid bank passbook/cancelled cheque with verified IFSC on member portal.';
      nextActionHi = 'सदस्य पोर्टल पर सत्यापित IFSC के साथ वैध बैंक पासबुक/रद्द चेक पुनः अपलोड करें।';
      reason = 'Bank account number or branch IFSC code could not be validated for NEFT settlement.';
      reasonHi = 'NEFT निपटान के लिए बैंक खाता संख्या या शाखा IFSC कोड को सत्यापित नहीं किया जा सका।';
      break;

    case 'duplicate_claim_flagged':
      nextAction = 'Check previous claim tracking history and wait for settlement or formal rejection.';
      nextActionHi = 'पिछले दावे का ट्रैकिंग इतिहास जांचें और निपटान या औपचारिक अस्वीकृति की प्रतीक्षा करें।';
      reason = 'An existing claim under the same category or member ID was already detected.';
      reasonHi = 'समान श्रेणी या सदस्य ID के तहत एक मौजूदा दावा पहले ही पाया गया था।';
      break;

    case 'missing_exit_date':
      nextAction = 'Request previous employer to update Date of Exit (DOE) on unified portal.';
      nextActionHi = 'एकीकृत पोर्टल पर निकास तिथि (DOE) अपडेट करने के लिए पिछले नियोक्ता से अनुरोध करें।';
      reason = 'Full PF withdrawal/settlement requires recorded separation date.';
      reasonHi = 'पूर्ण PF निकासी/निपटान के लिए दर्ज अलगाव तिथि की आवश्यकता होती है।';
      break;

    case 'dues_arrears_pending':
      nextAction = 'Contact employer regarding unpaid contributions or file grievance citing non-deposit.';
      nextActionHi = 'अदत्त अंशदान के संबंध में नियोक्ता से संपर्क करें या जमा न करने का हवाला देते हुए शिकायत दर्ज करें।';
      reason = 'Outstanding employer contribution or challan deposition pending.';
      reasonHi = 'बकाया नियोक्ता अंशदान या चालान जमा लंबित है।';
      break;

    case 'multiple_uan_conflict':
      nextAction = 'File online transfer (Form 13) to consolidate prior member IDs into current active UAN.';
      nextActionHi = 'पूर्व सदस्य IDs को वर्तमान सक्रिय UAN में समेकित करने के लिए ऑनलाइन ट्रांसफर (फॉर्म 13) दाखिल करें।';
      reason = 'Multiple UANs or un-transferred balances detected across previous employments.';
      reasonHi = 'पिछले रोजगारों में एकाधिक UAN या गैर-स्थानांतरित शेष राशि का पता चला है।';
      break;

    case 'verification_pending':
      nextAction = 'Track portal status for 3–5 working days; file RTI if prolonged without clear reason.';
      nextActionHi = '3-5 कार्य दिवसों के लिए पोर्टल स्थिति ट्रैक करें; यदि बिना स्पष्ट कारण के लंबा हो तो RTI दाखिल करें।';
      reason = 'Generic status provided by EPFO without specific underlying cause.';
      reasonHi = 'EPFO द्वारा बिना किसी विशिष्ट अंतर्निहित कारण के सामान्य स्थिति प्रदान की गई।';
      break;

    case 'past_20_day_no_response':
      nextAction = 'File an RTI application seeking exact processing status and reason for delay beyond Citizens’ Charter.';
      nextActionHi = 'नागरिक चार्टर से अधिक देरी का सटीक प्रसंस्करण स्थिति और कारण जानने के लिए RTI आवेदन दाखिल करें।';
      reason = 'Claim has exceeded the standard 20-day service charter without formal settlement or rejection.';
      reasonHi = 'दावा औपचारिक निपटान या अस्वीकृति के बिना मानक 20-दिवसीय सेवा चार्टर को पार कर गया है।';
      break;

    default:
      nextAction = 'File an RTI request for detailed case notes and exact reason for claim pendency.';
      nextActionHi = 'विस्तृत केस नोट्स और दावा लंबित रहने के सटीक कारण के लिए RTI अनुरोध दाखिल करें।';
      reason = 'Unclear or ambiguous remark text.';
      reasonHi = 'अस्पष्ट या संदिग्ध रिमार्क पाठ।';
      break;
  }

  return {
    nextAction,
    nextActionHi,
    actionOwner: entry.actionOwner,
    reason,
    reasonHi,
    checklist: entry.checklist,
    checklistHi: entry.checklistHi,
    whatNotToDo: entry.whatNotToDo,
    whatNotToDoHi: [
      'आधिकारिक स्पष्टीकरण के बिना किसी विफलता का अनुमान न लगाएं',
      'असुरक्षित चैनलों पर कभी भी आधार, पैन या बैंक विवरण साझा न करें',
    ],
    recommendedDoc: entry.recommendedDoc,
    limitations:
      'This recommendation is generated from synthetic demo inputs. It does not constitute official legal advice or live EPFO verification.',
    limitationsHi:
      'यह अनुशंसा सिंथेटिक डेमो इनपुट से उत्पन्न होती है। यह आधिकारिक कानूनी सलाह या लाइव EPFO सत्यापन का गठन नहीं करती है।',
  };
}
