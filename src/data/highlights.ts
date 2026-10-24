// Content for the home page stats band and case studies.
//
// The stats and case studies are SAMPLE content written to show the design.
// The "Where we fly" project map and its data live on the archive/project-map branch.

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
