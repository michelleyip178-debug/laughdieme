export const AGENCIES: Record<string, { short: string; color: string }> = {
  GovTech: { short: "GT",  color: "#6d28d9" },
  MOH:     { short: "MOH", color: "#2dd4bf" },
  HDB:     { short: "HDB", color: "#ff5d73" },
  MOE:     { short: "MOE", color: "#ffd166" },
  IRAS:    { short: "IRAS",color: "#9b5cf6" },
  LTA:     { short: "LTA", color: "#176e9b" },
  MSF:     { short: "MSF", color: "#257645" },
  URA:     { short: "URA", color: "#c2a8ff" },
};

export const TYPE_STYLES: Record<string, { bg: string; fg: string; emoji: string }> = {
  Gig:        { bg: "#ffd166", fg: "#5c3d00", emoji: "⚡" },
  Secondment: { bg: "#2dd4bf", fg: "#06403a", emoji: "🔁" },
  Project:    { bg: "#c2a8ff", fg: "#3a1475", emoji: "🚀" },
  Mentorship: { bg: "#ff5d73", fg: "#fff",    emoji: "🤝" },
};

export interface Opportunity {
  id: string;
  title: string;
  agency: string;
  type: string;
  duration: string;
  commitment: string;
  location: string;
  posted: string;
  applicants: number;
  skills: string[];
  summary: string;
  about: string;
  responsibilities: string[];
  lead: { name: string; role: string };
}

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "o1", title: "Product Designer for the next LifeSG release",
    agency: "GovTech", type: "Secondment", duration: "3 months", commitment: "Full-time",
    location: "Hybrid · Mapletree Business City", posted: "2 days ago", applicants: 14,
    skills: ["UX Research", "Figma", "Prototyping", "Design Systems"],
    summary: "Join the LifeSG product team to redesign the appointments journey used by 2M+ residents.",
    about: "You'll work alongside engineers and policy leads to research, prototype, and ship a new appointments flow. We're looking for someone who can hold both the craft and the citizen empathy — and who's excited to design at national scale.",
    responsibilities: ["Run discovery interviews with residents and frontline officers", "Prototype and test 2–3 directions for the appointments flow", "Contribute patterns back to the LifeSG design system"],
    lead: { name: "Priya Menon", role: "Lead Product Designer, GovTech" },
  },
  {
    id: "o2", title: "Data Analyst — preventive health dashboard",
    agency: "MOH", type: "Gig", duration: "6 weeks", commitment: "~8 hrs / week",
    location: "Remote", posted: "5 days ago", applicants: 9,
    skills: ["SQL", "Tableau", "Statistics", "Health Data"],
    summary: "Build a dashboard tracking Healthier SG enrolment across polyclinics.",
    about: "A short, high-impact gig to stand up a dashboard the senior management team will use weekly. Great for an analyst who wants exposure to population-health data.",
    responsibilities: ["Model enrolment and follow-up data", "Design 4–5 exec-ready Tableau views", "Document the data pipeline for handover"],
    lead: { name: "Daniel Tan", role: "Senior Statistician, MOH" },
  },
  {
    id: "o3", title: "Policy writer for the Forward SG town halls",
    agency: "MSF", type: "Project", duration: "4 months", commitment: "Part-time",
    location: "Hybrid · MSF Building", posted: "1 week ago", applicants: 21,
    skills: ["Policy Analysis", "Writing", "Stakeholder Engagement"],
    summary: "Synthesise community feedback into actionable policy recommendations.",
    about: "Help translate thousands of resident conversations into a clear set of recommendations for senior leadership. A strong fit if you love turning messy input into sharp prose.",
    responsibilities: ["Synthesise feedback from 12 town halls", "Draft and refine the recommendations paper", "Brief directors ahead of the cabinet readout"],
    lead: { name: "Aisha Rahman", role: "Deputy Director, MSF" },
  },
  {
    id: "o4", title: "Frontend engineer — HDB resale portal refresh",
    agency: "HDB", type: "Secondment", duration: "5 months", commitment: "Full-time",
    location: "On-site · HDB Hub, Toa Payoh", posted: "3 days ago", applicants: 7,
    skills: ["React", "TypeScript", "Accessibility", "Next.js"],
    summary: "Modernise the resale flat application flow for 50k+ users a year.",
    about: "Rebuild the most-used journey in the HDB portal with a modern, accessible stack. You'll pair with designers from the GovTech team and own the front-end architecture.",
    responsibilities: ["Rebuild the application wizard in React", "Hit WCAG 2.1 AA across the flow", "Mentor two junior engineers"],
    lead: { name: "Marcus Lee", role: "Engineering Lead, HDB" },
  },
  {
    id: "o5", title: "UX researcher — student support services",
    agency: "MOE", type: "Gig", duration: "8 weeks", commitment: "~10 hrs / week",
    location: "Hybrid", posted: "6 days ago", applicants: 11,
    skills: ["User Interviews", "Synthesis", "Service Design"],
    summary: "Map the support journey for students with additional learning needs.",
    about: "A research-led gig to surface friction in how students and parents access support. Output is a journey map and a prioritised list of opportunities.",
    responsibilities: ["Interview 15 families and educators", "Build a service blueprint", "Present opportunities to the division"],
    lead: { name: "Grace Wong", role: "Service Designer, MOE" },
  },
  {
    id: "o6", title: "Mentorship — break into data science",
    agency: "IRAS", type: "Mentorship", duration: "Ongoing", commitment: "1 hr / fortnight",
    location: "Remote", posted: "1 day ago", applicants: 5,
    skills: ["Career Guidance", "Python", "Machine Learning"],
    summary: "A senior data scientist offering 1:1 mentorship to officers moving into data roles.",
    about: "Open to any public officer curious about a data career. We'll set goals together and meet fortnightly to work through real problems from your own agency.",
    responsibilities: ["Set a 3-month learning plan together", "Review a portfolio project", "Make warm intros within the data community"],
    lead: { name: "Kumar Subramaniam", role: "Principal Data Scientist, IRAS" },
  },
];

export const ME = {
  name: "Mei Ling Chua",
  initials: "ML",
  role: "Senior Policy Officer",
  agency: "URA",
  location: "Singapore",
  openToGigs: true,
  tagline: "Policy by training, product by curiosity. Always up for a cross-agency project.",
  about: "I've spent six years in urban planning policy at URA, and lately I've been drawn to how digital services actually reach residents. Looking for gigs and secondments where I can pair policy thinking with hands-on product work.",
  skills: ["Policy Analysis", "Stakeholder Engagement", "Urban Planning", "Writing", "UX Research", "Workshop Facilitation"],
  interests: ["Digital services", "Citizen experience", "Data-informed policy"],
  stats: { applications: 4, saved: 7, connections: 38 },
  activity: [
    { emoji: "🚀", text: "Applied to Policy writer for the Forward SG town halls", when: "2 days ago" },
    { emoji: "🔖", text: "Saved Product Designer for the next LifeSG release", when: "3 days ago" },
    { emoji: "🤝", text: "Connected with Daniel Tan (MOH)", when: "1 week ago" },
  ],
};

export const NAV = [
  { id: "home",         emoji: "🏠", label: "Home" },
  { id: "browse",       emoji: "🔎", label: "Browse" },
  { id: "applications", emoji: "📨", label: "Applications" },
  { id: "messages",     emoji: "💬", label: "Messages" },
  { id: "people",       emoji: "🤝", label: "People" },
  { id: "saved",        emoji: "🔖", label: "Saved" },
  { id: "upload",       emoji: "📤", label: "Upload" },
  { id: "profile",      emoji: "🪪", label: "Profile" },
];

export const FILTERS = {
  type: ["Gig", "Secondment", "Project", "Mentorship"],
  agency: ["GovTech", "MOH", "HDB", "MOE", "IRAS", "MSF"],
};

export const SORTS = ["Best match", "Most recent", "Fewest applicants"];

export interface Person {
  id: string;
  name: string;
  initials: string;
  role: string;
  agency: string;
  skills: string[];
  blurb: string;
  connected: boolean;
  mutuals: number;
}

export const PEOPLE: Person[] = [
  { id: "p1", name: "Daniel Tan",       initials: "DT", role: "Senior Statistician",   agency: "MOH",     skills: ["SQL", "Statistics", "Health Data"],           blurb: "Population-health data, dashboards, and the occasional R rant.", connected: true,  mutuals: 6 },
  { id: "p2", name: "Priya Menon",      initials: "PM", role: "Lead Product Designer",  agency: "GovTech", skills: ["UX Research", "Design Systems", "Figma"],      blurb: "Designing citizen services at national scale. Always hiring secondees.", connected: true,  mutuals: 11 },
  { id: "p3", name: "Aisha Rahman",     initials: "AR", role: "Deputy Director",        agency: "MSF",     skills: ["Policy Analysis", "Stakeholder Engagement"],   blurb: "Social policy, community engagement, Forward SG.", connected: true,  mutuals: 4 },
  { id: "p4", name: "Marcus Lee",       initials: "ML", role: "Engineering Lead",       agency: "HDB",     skills: ["React", "TypeScript", "Accessibility"],        blurb: "Rebuilding the resale portal. Mentor to two juniors.", connected: false, mutuals: 3 },
  { id: "p5", name: "Grace Wong",       initials: "GW", role: "Service Designer",       agency: "MOE",     skills: ["Service Design", "User Interviews"],           blurb: "Mapping student journeys so support actually reaches families.", connected: false, mutuals: 2 },
  { id: "p6", name: "Kumar Subramaniam",initials: "KS", role: "Principal Data Scientist",agency: "IRAS",   skills: ["Python", "Machine Learning", "Mentorship"],    blurb: "Open to mentoring officers moving into data roles.", connected: false, mutuals: 5 },
];

export interface AppRecord {
  id: string;
  oppId: string;
  status: string;
  appliedOn: string;
  note: string;
}

export const APPLICATIONS: AppRecord[] = [
  { id: "a1", oppId: "o3", status: "In review",   appliedOn: "2 days ago",  note: "Application with the MSF policy team." },
  { id: "a2", oppId: "o1", status: "Shortlisted", appliedOn: "5 days ago",  note: "Priya wants to chat — check Messages." },
  { id: "a3", oppId: "o5", status: "Submitted",   appliedOn: "1 day ago",   note: "Awaiting first review." },
  { id: "a4", oppId: "o2", status: "Closed",      appliedOn: "3 weeks ago", note: "Role filled internally. Better luck next time!" },
];

export const APP_STATUS: Record<string, { color: string; bg: string; emoji: string }> = {
  Submitted:   { color: "#176e9b", bg: "#f0f8fc", emoji: "📨" },
  "In review": { color: "#98590c", bg: "#fdf6e9", emoji: "👀" },
  Shortlisted: { color: "#257645", bg: "#effcf4", emoji: "⭐" },
  Closed:      { color: "#686868", bg: "#f2f2f2", emoji: "🔒" },
};

export interface Message { from: "me" | "them"; text: string; when: string; }
export interface Conversation {
  id: string; personId: string; unread: number; lastWhen: string; preview: string;
  messages: Message[];
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1", personId: "p2", unread: 2, lastWhen: "10:24",
    preview: "Loved your application — free for a quick chat this week?",
    messages: [
      { from: "them", text: "Hi Mei Ling! Thanks for applying to the LifeSG designer secondment 🙌", when: "Yesterday" },
      { from: "them", text: "Your URA policy background is exactly the citizen-empathy we want on the team.", when: "Yesterday" },
      { from: "me",   text: "Thank you Priya! I've been hoping to get closer to product — this looks perfect.", when: "Yesterday" },
      { from: "them", text: "Loved your application — free for a quick chat this week?", when: "10:24" },
      { from: "them", text: "Wed or Thu afternoon both work on my side.", when: "10:24" },
    ],
  },
  {
    id: "c2", personId: "p1", unread: 0, lastWhen: "Mon",
    preview: "You: Happy to share the Tableau templates we used.",
    messages: [
      { from: "them", text: "Saw you saved the MOH dashboard gig — happy to answer anything.", when: "Mon" },
      { from: "me",   text: "Happy to share the Tableau templates we used.", when: "Mon" },
    ],
  },
  {
    id: "c3", personId: "p3", unread: 0, lastWhen: "Last week",
    preview: "Aisha: Great, I'll add you to the town-hall channel.",
    messages: [
      { from: "me",   text: "Just applied to the Forward SG policy-writer project — excited!", when: "Last week" },
      { from: "them", text: "Great, I'll add you to the town-hall channel.", when: "Last week" },
    ],
  },
];

export const NOTIFICATIONS = [
  { id: "n1", emoji: "⭐", text: "You were shortlisted for Product Designer for the next LifeSG release", when: "1h",  unread: true },
  { id: "n2", emoji: "💬", text: "Priya Menon sent you a message",                                        when: "2h",  unread: true },
  { id: "n3", emoji: "🚀", text: "3 new Project opportunities match your competencies",                     when: "1d",  unread: true },
  { id: "n4", emoji: "🤝", text: "Daniel Tan accepted your connection",                                    when: "3d",  unread: false },
  { id: "n5", emoji: "👀", text: "MSF is reviewing your application",                                      when: "5d",  unread: false },
];
