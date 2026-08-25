// ============================================================
// PF Claim Decoder — Official Source Registry
// ============================================================
// Sources are for GROUNDING only.
// If a source does not establish a fact, write:
//   "Not established by the available official source."
// ============================================================

import { OfficialSource } from './types';

export const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: 'epfo_citizens_charter',
    title: 'EPFO Citizens\' Charter',
    url: 'https://www.epfindia.gov.in/site_docs/PDFs/Downloads/CitizensCharter.pdf',
    officialDomain: 'epfindia.gov.in',
    checkedDate: '2026-08-01',
    supportedClaim: 'Service timelines, member rights, and grievance redressal procedures',
  },
  {
    id: 'epfo_faq',
    title: 'EPFO Frequently Asked Questions',
    url: 'https://www.epfindia.gov.in/site_en/FAQ.php',
    officialDomain: 'epfindia.gov.in',
    checkedDate: '2026-08-01',
    supportedClaim: 'General EPF/EPS claim procedures, KYC requirements, and transfer processes',
  },
  {
    id: 'epfo_member_info',
    title: 'EPFO Member Information',
    url: 'https://www.epfindia.gov.in/site_en/For_Employees.php',
    officialDomain: 'epfindia.gov.in',
    checkedDate: '2026-08-01',
    supportedClaim: 'Member services, online claim submission, KYC update procedures',
  },
  {
    id: 'epfo_employer_info',
    title: 'EPFO Employer Information',
    url: 'https://www.epfindia.gov.in/site_en/For_Employers.php',
    officialDomain: 'epfindia.gov.in',
    checkedDate: '2026-08-01',
    supportedClaim: 'Employer obligations, exit date updating, and claim attestation requirements',
  },
  {
    id: 'epfo_grievance_contact',
    title: 'EPFO Official Contact / Grievance Page',
    url: 'https://www.epfindia.gov.in/site_en/Contact.php',
    officialDomain: 'epfindia.gov.in',
    checkedDate: '2026-08-01',
    supportedClaim: 'Regional office contacts and grievance filing procedures',
  },
  {
    id: 'epfigms',
    title: 'EPFiGMS — EPFO Grievance Management System',
    url: 'https://epfigms.gov.in/',
    officialDomain: 'epfigms.gov.in',
    checkedDate: '2026-08-01',
    supportedClaim: 'Official platform for filing PF-related grievances',
  },
  {
    id: 'rti_online',
    title: 'RTI Online — Government of India',
    url: 'https://rtionline.gov.in/',
    officialDomain: 'rtionline.gov.in',
    checkedDate: '2026-08-01',
    supportedClaim: 'Official platform for filing Right to Information requests to central government bodies',
  },
];

/** Get a source by ID */
export function getSource(id: string): OfficialSource | undefined {
  return OFFICIAL_SOURCES.find((s) => s.id === id);
}

/** Get portal URL for grievance filing */
export function getGrievancePortalUrl(): string {
  return 'https://epfigms.gov.in/';
}

/** Get portal URL for RTI filing */
export function getRtiPortalUrl(): string {
  return 'https://rtionline.gov.in/';
}
