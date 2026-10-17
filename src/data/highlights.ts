// Content for the home page stats band, project map and case studies.
//
// SAMPLE CONTENT: every figure, project and case study below is a placeholder
// written to show the design. Replace it with Rishika Infra's real numbers and
// projects before releasing to production (master). Keep client names out unless
// the client has agreed to be named.

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
  title: string;
  place: string;
  sector: Sector;
  /** Short result shown on the map card, e.g. "320 km surveyed" */
  metric: string;
  lon: number;
  lat: number;
}

export const PROJECTS: Project[] = [
  { title: '765 kV line corridor survey', place: 'Madhya Pradesh', sector: 'Power', metric: '320 km surveyed', lon: 77.4, lat: 23.3 },
  { title: 'Substation thermography', place: 'Uttar Pradesh', sector: 'Power', metric: '14 substations', lon: 80.9, lat: 26.8 },
  { title: 'Solar park inspection', place: 'Rajasthan', sector: 'Renewables', metric: '150 MW scanned', lon: 71.9, lat: 27.0 },
  { title: 'Wind farm blade inspection', place: 'Gujarat', sector: 'Renewables', metric: '60 turbines', lon: 70.2, lat: 22.8 },
  { title: 'Highway DPR mapping', place: 'Maharashtra', sector: 'Roads', metric: '210 km mapped', lon: 75.3, lat: 19.9 },
  { title: 'Tower structural audit', place: 'Karnataka', sector: 'Telecom', metric: '400 towers', lon: 76.6, lat: 14.5 },
  { title: 'LiDAR terrain model', place: 'Uttarakhand', sector: 'Mapping', metric: '95 km² modelled', lon: 79.0, lat: 30.1 },
  { title: 'Transmission line stringing check', place: 'Odisha', sector: 'Power', metric: '180 km', lon: 84.5, lat: 20.5 },
  { title: 'Tower inspections', place: 'Assam', sector: 'Telecom', metric: '220 towers', lon: 92.9, lat: 26.2 },
  { title: 'Urban corridor survey', place: 'Tamil Nadu', sector: 'Roads', metric: '75 km mapped', lon: 78.7, lat: 11.1 },
];

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
