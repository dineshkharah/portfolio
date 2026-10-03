// Every piece of text on the page lives here. Edit this file by hand to change
// any wording, add a project, or update a link. Nothing else needs touching.

export const profile = {
  name: 'Dinesh Kharah',
  role: 'Full Stack Engineer',
  tagline: 'I build backend systems and write down why.',
  intro: [
    'I am a Computer Engineering graduate from Thakur College, Mumbai, who finished in May 2025. I have been building with JavaScript for about four years, and about five months of that was inside a company across two internships.',
    'Most of what I can point to is work nobody assigned me. A personal finance app with field level encryption and a receipt scanner, an agent that answers questions about that same data, and a React Native app I built in two days having never written React Native before.',
    'I am looking for full stack or backend work where I own features end to end rather than picking tickets off a board.',
  ],
  location: 'Mumbai, India',
  availability: 'Open to full-time roles, available immediately',
  email: 'dineshkharah007@gmail.com',
  links: {
    github: 'https://github.com/dineshkharah',
    linkedin: 'https://www.linkedin.com/in/dinesh-kharah/',
    resume: '/resume.pdf',
  },
}

export const projects = [
  {
    slug: 'trackr',
    name: 'Trackr',
    blurb: 'A personal finance app with a bill scanner that turns a photo of a receipt into a transaction.',
    year: '2025',
    role: 'Solo',
    status: 'Live',
    problem: 'Personal finance apps fail at the same point. Entering a transaction is tedious enough that you stop doing it after a week, and once there are gaps the totals are worthless. Trackr tracks the usual things, income, expenses, recurring payments, debts and savings, but the part I actually cared about was making entry fast enough to survive, which is where photographing a bill came from.',
    decisions: [
      {
        title: 'Field level encryption, and the aggregation it made impossible',
        detail: 'Every transaction amount is encrypted with AES-256-CBC using a random IV per value. That is the right call for financial data, and it means MongoDB cannot sum, sort or range filter any of it. A random IV also means two identical amounts do not look alike once stored. So every dashboard total filters on the plaintext fields first, pulls the matching rows, decrypts in the application layer, then computes. Correct, but the work grows with row count instead of staying in the database. At my data volumes it does not matter and I have not fixed it. If it needed to scale, the options are a plaintext rollup for the aggregates, or deterministic encryption on the fields that need searching. The real cost arrived months later, when I built an agent over the same data and it needed exactly the aggregations the database could not do.',
        seeAlso: { slug: 'spending-agent', label: 'The other side of this, in Spending Agent' },
      },
      {
        title: 'One multimodal call instead of OCR plus a model',
        detail: 'The scanner sends the image to Gemini in a single call rather than running OCR first and feeding the text to a model. OCR returns characters with no structure, so you still have to work out which number is the total across wildly varying layouts, which becomes brittle regex or a second model call anyway. The stronger argument is error compounding: if OCR misreads 450 as 45O, the downstream model never sees the image and cannot recover. A multimodal call reads layout, not just characters. The two step approach wins if you need raw text for audit, or at volume where OCR is cheaper per unit. I did not benchmark them.',
      },
      {
        title: 'MongoDB rather than Postgres',
        detail: 'The honest reason is that it was the M in MERN and the stack I was fastest in. The access pattern did not argue against it: every transaction belongs to one user, there are no joins, and queries always filter by user and date. The flexible schema also absorbed the bill scanning fields later without a migration. That said, financial data is relational and ACID matters more when money is involved, so Postgres is the defensible choice and I would consider it if I rebuilt this.',
      },
      {
        title: 'Asking the model for JSON instead of enforcing it',
        detail: 'The prompt demands a strict five key JSON object and every field is revalidated server side before saving rather than trusted. What I got wrong is that the format is prompt coaxed, not constrained. Months after shipping I found a regex in my own code stripping markdown code fences off the response before parsing, which I had written and forgotten. It exists because the model is free to wrap the JSON in a code block whenever it likes. The real fix is responseMimeType and responseSchema, which makes the structure a constraint and the regex unnecessary. I have not changed it yet.',
      },
    ],
    outcome: '',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Ant Design', 'JWT', 'Gemini API', 'PWA'],
    links: {
      live: 'https://trackr-finance.vercel.app',
      repo: 'https://github.com/dineshkharah/expense-tracker-react',
      caseStudy: '',
    },
    coldStart: true,
    image: null,
    featured: true,
  },
  {
    slug: 'spending-agent',
    name: 'Spending Agent',
    blurb: 'A terminal agent that answers questions about spending in plain English by deciding which tools to call.',
    year: '2026',
    role: 'Solo',
    status: 'Public repo',
    problem: 'An interviewer told me my AI work was integration rather than agents. That was fair, so I spent that week fixing it.',
    decisions: [
      {
        title: 'Four tools, and the agent decides which to call',
        detail: 'The agent has summarize_spending, top_transactions, query_transactions and list_categories_and_wallets. It runs across multiple rounds, where one call\'s arguments depend on what the previous call returned, rather than resolving a question in a single lookup. The README carries full traces of it choosing between them.',
      },
      {
        title: 'The encryption constraint shaped every tool',
        detail: 'Because Trackr encrypts amounts with a random IV, MongoDB cannot aggregate them. So every tool filters on the plaintext fields, pulls rows, decrypts in the application layer, then computes. A decision I made correctly in the first project made the second one harder, and there was no way to see that coming at the time.',
        seeAlso: { slug: 'trackr', label: 'Where this constraint came from, in Trackr' },
      },
    ],
    outcome: '',
    stack: ['Node.js', 'LangGraph', 'MongoDB'],
    links: { live: '', repo: 'https://github.com/dineshkharah/spending-agent', caseStudy: '' },
    coldStart: false,
    image: null,
    featured: true,
  },
  {
    slug: 'submission-tracker',
    name: 'Submission Tracker',
    blurb: 'A coursework dashboard where students acknowledge submissions and professors see who has not.',
    year: '2026',
    role: 'Solo',
    status: 'Live',
    problem: 'Built as a technical assessment, which the repo already says plainly, so the page says it too.',
    decisions: [
      {
        title: 'An acknowledgment belongs to whoever is accountable',
        detail: 'Assignments can be individual or group. The obvious approach is to copy an acknowledgment to every group member when the leader submits. I made the acknowledgment belong to the accountable party instead: a student for individual work, the group itself for group work. The leader writes one row and every member reads it. Nothing is copied, so nothing has to be kept in sync and nothing goes stale if the membership changes.',
      },
      {
        title: 'A JWT shaped token that is not a JWT',
        detail: 'There is no backend. The sign in flow issues a token with the shape of a real JWT and keeps it in localStorage, but nothing is signed and nothing is verified. The README says that plainly rather than implying otherwise, because a reviewer finding it themselves is worse than being told.',
      },
    ],
    outcome: '',
    stack: ['React', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'react-router', 'localStorage'],
    links: {
      live: 'https://submission-tracker-ruby.vercel.app',
      repo: 'https://github.com/dineshkharah/submission-tracker',
      caseStudy: '',
    },
    coldStart: false,
    image: null,
    featured: true,
  },
  {
    slug: 'expense-tracker-native',
    name: 'Expense Tracker (React Native)',
    blurb: 'A five screen React Native expense tracker, built in two days having never written React Native.',
    year: '2026',
    role: 'Solo',
    status: 'Public repo',
    problem: 'I was handed a React Native assignment with a 48 hour deadline and had never written a line of it.',
    decisions: [
      {
        title: 'Runtime Tailwind classes never render',
        detail: 'I needed progress bars with widths calculated at runtime, wrote the class as w-pct-63, and nothing appeared. Tailwind scans your source files at build time to decide which classes to generate, so a class name assembled while the app is running was never compiled and does not exist. I generated w-pct-0 through w-pct-100 into the theme and safelisted the pattern, so every width is built and available whatever number comes out at runtime.',
      },
      {
        title: 'Indian digit grouping written by hand',
        detail: 'toLocaleString with en-IN does not reliably work, because Hermes does not always ship full locale data on device and the call can silently fall back to plain thousands grouping. So the grouping is written manually: the regex commas every two digits outside the last three, with a word boundary check that stops a comma landing at the start.',
      },
      {
        title: 'Dates split by hand rather than parsed',
        detail: 'new Date("2026-09-08") is parsed as UTC midnight, which renders as the previous day on any device behind UTC. Rather than reach for a date library for one format, formatDate splits the YYYY-MM-DD string itself.',
      },
    ],
    outcome: '',
    stack: ['React Native', 'Expo', 'NativeWind', 'React Navigation'],
    links: { live: '', repo: 'https://github.com/dineshkharah/kravix-expense-tracker', caseStudy: '' },
    coldStart: false,
    image: null,
    featured: true,
  },
  {
    slug: 'find-my-crew',
    name: 'Find My Crew',
    blurb: 'A crowd finder for concerts and festivals. Join a crew with a short code and a live arrow points at whichever friend you pick, with the distance under it.',
    year: '2026',
    role: 'Solo',
    status: 'Live',
    problem: 'Groups get separated at concerts and nobody can describe where they are standing. AirTag style precision needs a UWB chip and only works between iPhones, so none of that is available on the web. This is the same idea built from the two sensors every phone browser already exposes, GPS and the compass, which lands around five to ten metres of accuracy. That is not good enough to find a dropped key and is entirely good enough to find a person.',
    decisions: [
      {
        title: 'The realtime server cannot be serverless',
        detail: 'Socket.io holds an open connection per member and keeps each crew in memory, so the process has to stay alive between requests. Vercel runs serverless functions that start for one request and are torn down after it, which leaves nowhere for a socket or a crew to live. So the Next app deploys to Vercel and the realtime server runs separately on a host that keeps a process up. The split is the cost: two deploys, CORS between them, and a free tier server that sleeps when idle, which is why the first connect shows a waking up state instead of pretending to be instant.',
      },
      {
        title: 'Showing staleness instead of a dot that looks alive',
        detail: 'A phone that loses signal leaves its last position behind, and the easy version keeps drawing a confident dot there. That dot is a lie, and in a crowd it sends someone walking to where their friend used to be. So a position has three states rather than one. Under about fifteen seconds it is fresh and drawn normally. Past that it dims and carries a last seen time underneath. Past ten minutes it leaves the map, and the SONAR screen says it is pointing at a last known spot rather than at a person. The name stays in the crew list marked offline, because the member has not left, only their signal has.',
      },
      {
        title: 'Below fifteen metres the arrow is a lie, so it hides',
        detail: 'Browser GPS is accurate to roughly five to ten metres. At a hundred metres that error is irrelevant, but at ten metres it is larger than the gap itself, so the bearing swings and the arrow spins while the phone sits still. A spinning arrow reads as broken even when the maths behind it is right. So under about fifteen metres the arrow is replaced by a look around state with a pulsing circle and one vibration as the threshold is crossed. Android gets the buzz and iOS does not, because navigator.vibrate is not implemented there.',
      },
      {
        title: 'No database, and crews that expire on their own',
        detail: 'There is no database. A crew lives in the server process as an object and dies by itself, one hour after the last member disconnects or twenty four hours after it was created, whichever comes first. Nobody owns a crew and nobody can delete one. That makes the privacy claim simple to state honestly, because there is no location history stored anywhere to leak, and it removes accounts and signup entirely. The trade is that a server restart drops every live crew, which is acceptable for something people use for one evening.',
      },
    ],
    outcome: '',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Socket.io', 'Node.js', 'Express', 'Leaflet', 'OpenStreetMap', 'Geolocation API', 'DeviceOrientation API', 'PWA'],
    links: {
      live: 'https://find-my-crew-app.vercel.app',
      repo: 'https://github.com/dineshkharah/find-my-crew',
      caseStudy: '',
    },
    coldStart: true,
    image: null,
    featured: true,
  },
]

export const skills = [
  { group: 'Languages', items: [
    { name: 'JavaScript', level: 'Strong' },
    { name: 'TypeScript', level: 'Working' },
    { name: 'Python', level: 'Working' },
  ]},
  { group: 'Backend', items: [
    { name: 'Node.js', level: 'Strong' },
    { name: 'Express', level: 'Strong' },
    { name: 'REST API design', level: 'Strong' },
    { name: 'JWT authentication', level: 'Strong' },
    { name: 'WebSockets (Socket.io)', level: 'Working' },
  ]},
  { group: 'Frontend', items: [
    { name: 'React', level: 'Strong' },
    { name: 'HTML & CSS', level: 'Strong' },
    { name: 'Tailwind CSS', level: 'Strong' },
    { name: 'Ant Design', level: 'Strong' },
    { name: 'React Native', level: 'Working' },
    { name: 'Next.js', level: 'Working' },
  ]},
  { group: 'Data', items: [
    { name: 'MongoDB', level: 'Strong' },
    { name: 'MySQL', level: 'Working' },
    { name: 'SQL', level: 'Working' },
    { name: 'PostgreSQL', level: 'Familiar' },
  ]},
  { group: 'AI', items: [
    { name: 'LLM API integration', level: 'Working' },
    { name: 'LangGraph', level: 'Working' },
    { name: 'Prompt and structured output', level: 'Working' },
  ]},
  { group: 'Tooling', items: [
    { name: 'Git & GitHub', level: 'Strong' },
    { name: 'Vercel', level: 'Strong' },
  ]},
]

export const education = [
  {
    title: 'B.E. Computer Engineering',
    org: 'Thakur College of Engineering and Technology, Mumbai',
    period: 'Dec 2021 – May 2025',
    note: 'CGPA 9.13',
  },
]

export const experience = [
  {
    title: 'Full Stack Intern',
    org: 'Krishna Valley Power Pvt Ltd, Mumbai',
    period: 'Dec 2024 – Jan 2025',
    note: 'Built full-stack features in React and Node/Express inside an existing production codebase, and fixed integration failures between React components and REST endpoints.',
  },
  {
    title: 'SDE Intern',
    org: 'Krishna Valley Power Pvt Ltd, Mumbai',
    period: 'Jan 2024 – Mar 2024',
    note: 'Built reusable React UI components for an internal JavaScript tool, and did functional testing across releases.',
  },
]

export const recognition = [
  'Presented 4 research papers across 3 topics at Multicon-W (2022–2025), the annual college research conference.',
  'Technovate Hackathon: led a team to 2nd runner-up with an AI platform that scans utility bills to compute per-user EcoScores with a gamified recycling marketplace.',
  'Smart India Hackathon: cleared college-level selection with Briefify, an AI meeting summariser with action-point extraction.',
  'Solo National Hackathon: built a drag-and-drop no-code website builder.',
]

export const site = {
  url: 'https://dineshkharah.vercel.app',
  title: 'Dinesh Kharah, Full Stack Engineer',
  description:
    'Full stack engineer in Mumbai. Deployed applications in React and Node, including a finance app with field level encryption and an LLM agent over its data.',
  ogImage: '/og.png',
}
