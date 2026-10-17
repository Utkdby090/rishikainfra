export const SITE_CONFIG = {
  name: "Rishika Infra",
  tagline: "Professional Aerial Inspection, GIS & Asset Management Solutions",
  description: "Enterprise drone inspections, LiDAR geospatial mapping, and radiometric thermal diagnostics for powerlines, renewables, and civil infrastructure.",
  contact: {
    address: "C-914, Bhutani Alphathum, Sector-90, Noida, Uttar Pradesh, 201304",
    phone: "+91 9811331744",
    email: "info@rishikainfra.com",
    website: "https://rishikainfra.com",
  },
  clients: [
    { name: "POWERGRID", domain: "Transmission" },
    { name: "L&T Construction", domain: "Infrastructure" },
    { name: "KEC International", domain: "Infrastructure" },
    { name: "Bajel Projects", domain: "Power" },
    { name: "Skipper Limited", domain: "Towers & Structures" },
  ],
  services: [
    {
      id: "powerline",
      title: "Power Transmission & Substation Inspection",
      description: "EHV/HV/MV transmission line diagnostics, insulator defect detection, conductor wear monitoring, and transformer thermal audits.",
      features: ["EHV & HV Corridor Audits", "Thermal Anomaly Mapping", "Vegetation Encroachment", "Corrosion & Hardware Checks"],
    },
    {
      id: "geospatial",
      title: "LiDAR & Geospatial Mapping",
      description: "End-to-end 3D terrain modeling, contour generation, DTM/DSM, and high-density point cloud acquisition for NHAI highway and rail corridors.",
      features: ["Orthomosaic Mapping", "Digital Elevation Models (DEM)", "Stockpile Volume Estimation", "Right-of-Way (ROW) Mapping"],
    },
    {
      id: "solar-thermal",
      title: "Solar Power Plant Thermography",
      description: "String-level aerial radiometric thermal inspection to identify defective cells, bypassed diodes, and hot spots to preserve energy yield.",
      features: ["Cell-Level Hotspot Detection", "Panel Degradation Audits", "String Fault Identification", "GIS-Tagged Defect Logs"],
    },
    {
      id: "traffic-ai",
      title: "AI-Powered Traffic & Corridor Analytics",
      description: "Automated traffic pattern telemetry, speed tracking, acceleration profiles, post-encroachment time (PET), and collision risk assessment.",
      features: ["Speed & Acceleration Telemetry", "Time to Collision Analysis", "Peak Flow Analytics", "Safety Compliance Data"],
    },
  ],
  fleet: [
    { name: "Type-Certified SURVEYXK", type: "UAV Platform" },
    { name: "RTK / PPK Precision Drones", type: "Sub-Centimeter Surveying" },
    { name: "High-Resolution Radiometric Thermal Sensors", type: "Thermography" },
    { name: "Mobile & Aerial LiDAR Scanners", type: "Elevation & Point Cloud" },
  ]
};