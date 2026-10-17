// Content for the home page stats band, project map and case studies.
//
// The stats and case studies are SAMPLE content written to show the design.
// The project map mixes real projects (from the project register) with a few
// marked sample entries; see PROJECTS below.

export interface Stat {
  /** Number the counter animates up to */
  value: number;
  /** Text shown after the number, e.g. "+" or " km" */
  suffix?: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 12000, suffix: '+ km', label: 'Power lines inspected' },
  { value: 450, suffix: '+ MW', label: 'Solar capacity surveyed' },
  { value: 2500, suffix: '+', label: 'Telecom towers assessed' },
  { value: 18, suffix: '', label: 'States flown' },
];

export type Sector = 'Power' | 'Renewables' | 'Roads' | 'Telecom' | 'Mapping';

export interface Project {
  /** Short name of the asset, shown in bold on the list and map card */
  title: string;
  place: string;
  sector: Sector;
  /** Kind of work, e.g. "Thermal inspection"; shown as the map card's label */
  service: string;
  /** Short result shown on the list and map card, e.g. "818 towers · 201 km" */
  metric: string;
  client?: string;
  /** Rishika Infra's project code from the project register, e.g. "TI-01" */
  code?: string;
  /** True for placeholder entries that are not real projects yet */
  sample?: boolean;
  lon: number;
  lat: number;
}

// Real projects from PROJECT DETAILS.xlsx (Oct 2026), one entry per row.
// Pins on the same line are spread along its corridor so they do not overlap.
const REAL_PROJECTS: Project[] = [
  { code: 'VI-01', title: '765 kV D/C Bhadla-II to Sikar-II (2nd)', client: 'L&T Construction', service: 'Visual inspection', place: 'Rajasthan', sector: 'Power', metric: '818 towers · 201 km', lon: 72.4, lat: 27.6 },
  { code: 'TI-01', title: '765 kV D/C Bhadla-II to Sikar-II (2nd)', client: 'L&T Construction', service: 'Thermal inspection', place: 'Rajasthan', sector: 'Power', metric: '526 towers, 231 MSJ & RS · 201 km', lon: 73.1, lat: 28.1 },
  { code: 'TI-06', title: '765 kV D/C Bhadla-III to Sikar-II (Part I)', client: 'Bajel Projects', service: 'Thermal inspection', place: 'Rajasthan', sector: 'Power', metric: '48 towers, 115 MSJ & RS · 109.37 km', lon: 73.4, lat: 27.2 },
  { code: 'TI-08', title: '765 kV D/C Bhadla-III to Sikar-II (Part I)', client: 'Skipper Limited', service: 'Thermal inspection', place: 'Rajasthan', sector: 'Power', metric: '136 towers, 137 MSJ & RS · 109.47 km', lon: 74.1, lat: 27.8 },
  { code: 'TI-07', title: '765 kV D/C Bhadla-III to Sikar-II (Part II)', client: 'KEC International', service: 'Thermal inspection', place: 'Rajasthan', sector: 'Power', metric: '71 towers, 131 MSJ & RS · 106.3 km', lon: 74.8, lat: 27.3 },
  { code: 'VI-03', title: '765 kV Navsari to Padghe line', client: 'L&T Construction', service: 'Visual inspection', place: 'Valsad, Gujarat', sector: 'Power', metric: '357 towers · 129.19 km', lon: 72.5, lat: 21.0 },
  { code: 'TI-03', title: '765 kV Navsari to Padghe line', client: 'L&T Construction', service: 'Thermal inspection', place: 'Valsad, Gujarat', sector: 'Power', metric: '357 towers, 69 MSJ, RS & EW · 129.19 km', lon: 73.3, lat: 20.6 },
  { code: 'VI-02', title: '765 kV Navsari to Padghe line', client: 'Bajel Projects', service: 'Visual inspection', place: 'Maharashtra', sector: 'Power', metric: '263 towers · 96.71 km', lon: 72.6, lat: 19.6 },
  { code: 'TI-02', title: '765 kV Navsari to Padghe line', client: 'Bajel Projects', service: 'Thermal inspection', place: 'Maharashtra', sector: 'Power', metric: '263 towers, 88 MSJ & RS · 96.71 km', lon: 73.5, lat: 19.2 },
  { code: 'VI-05', title: '765 kV D/C Kurnool-II PS to Maheshwaram SS (TW-03)', client: 'L&T Construction', service: 'Visual inspection', place: 'Telangana', sector: 'Power', metric: '336 towers · 125.6 km', lon: 77.9, lat: 17.0 },
  { code: 'TI-05', title: '765 kV D/C Kurnool-II PS to Maheshwaram SS (TW-03)', client: 'L&T Construction', service: 'Thermal inspection', place: 'Telangana', sector: 'Power', metric: '336 towers, 168 MSJ & RS · 124.97 km', lon: 78.8, lat: 16.6 },
  { code: 'TI-04', title: '765 kV Kurnool-III to Oravakal SS (TW-01)', client: 'Skipper Limited', service: 'Thermal inspection', place: 'Kurnool, Andhra Pradesh', sector: 'Power', metric: '301 towers, MSJ, RS & EW · 112.76 km', lon: 77.6, lat: 15.6 },
  { code: 'TI-04', title: '765 kV Kurnool-III to Oravakal SS (TW-02)', client: 'Skipper Limited', service: 'Thermal inspection', place: 'Kurnool, Andhra Pradesh', sector: 'Power', metric: '128.92 km', lon: 78.5, lat: 15.2 },
];

// SAMPLE entries (about 30% of the list) showing the other services.
// Replace with real projects when they are available.
const SAMPLE_PROJECTS: Project[] = [
  { sample: true, title: 'Solar park inspection', service: 'Solar thermography', place: 'Madhya Pradesh', sector: 'Renewables', metric: '150 MW scanned', lon: 81.3, lat: 24.5 },
  { sample: true, title: 'Substation thermography', service: 'Thermal inspection', place: 'Uttar Pradesh', sector: 'Power', metric: '14 substations', lon: 80.9, lat: 26.8 },
  { sample: true, title: 'LiDAR terrain model', service: 'Geospatial & LiDAR', place: 'Uttarakhand', sector: 'Mapping', metric: '95 km² modelled', lon: 79.0, lat: 30.1 },
  { sample: true, title: 'Transmission line stringing check', service: 'Visual inspection', place: 'Odisha', sector: 'Power', metric: '180 km', lon: 84.5, lat: 20.5 },
  { sample: true, title: 'Telecom tower audit', service: 'Telecom inspection', place: 'Assam', sector: 'Telecom', metric: '220 towers', lon: 92.9, lat: 26.2 },
  { sample: true, title: 'Wind farm blade inspection', service: 'Wind turbine inspection', place: 'Tamil Nadu', sector: 'Renewables', metric: '60 turbines', lon: 77.6, lat: 9.2 },
];

export const PROJECTS: Project[] = [...REAL_PROJECTS, ...SAMPLE_PROJECTS];

export interface CaseStudy {
  sector: Sector;
  title: string;
  /** Who the client is, described without naming them */
  client: string;
  problem: string;
  approach: string;
  result: string;
  /** Headline number and its label, e.g. "70%" + "faster than ground crews" */
  metric: { value: string; label: string };
  /** Site image under src/assets/images, referenced as /images/... */
  image: string;
  href: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    sector: 'Power',
    title: 'Finding hotspots on a live 400 kV line',
    client: 'National transmission utility',
    problem: 'Ground patrols could not see joint heating on long spans without an outage.',
    approach: 'Radiometric thermal and zoom RGB flights along the energised corridor.',
    result: 'Critical joints flagged and repaired in the next maintenance window.',
    metric: { value: '70%', label: 'faster than ground patrols' },
    image: '/images/our solutions/powerGridInspection/rotationimages/ThermalInspectionDrone.webp',
    href: '/services/powerline-inspection',
  },
  {
    sector: 'Renewables',
    title: 'Module-level fault map for a solar park',
    client: 'Utility-scale solar developer',
    problem: 'Underperforming strings were hard to trace across thousands of modules.',
    approach: 'Thermal mapping of every row with geotagged anomaly reports.',
    result: 'Faulty modules located to the exact row and position.',
    metric: { value: '2 days', label: 'to scan the full site' },
    image: '/images/our solutions/solarinspection/solarpanel.jpg',
    href: '/services/solar-inspection',
  },
  {
    sector: 'Roads',
    title: 'Survey-grade mapping for a highway DPR',
    client: 'Highway EPC contractor',
    problem: 'Conventional topographic survey was slow on a long, busy corridor.',
    approach: 'RTK drone photogrammetry with ground control points.',
    result: 'Orthomosaic, DTM and contours delivered for design.',
    metric: { value: '5 cm', label: 'mapping accuracy' },
    image: '/images/our solutions/roadsandinfra/dprSurvey.jpg',
    href: '/services/infrastructure-roads',
  },
  {
    sector: 'Telecom',
    title: 'Climb-free audits of telecom towers',
    client: 'Tower infrastructure company',
    problem: 'Manual climbs made antenna audits slow and risky.',
    approach: 'Orbit flights capturing every antenna, mount and joint.',
    result: 'Digital audit records for every tower, with no climbs.',
    metric: { value: '0', label: 'climbs needed' },
    image: '/images/our solutions/telecomInspection/telecomtower.jpg',
    href: '/services/telecom-inspection',
  },
];
