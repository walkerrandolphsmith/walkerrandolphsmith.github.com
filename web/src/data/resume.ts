// Resume content. The resume page renders it, and the build serializes it
// for llms.txt, llms-full.txt, and the WebMCP tools, so all of them stay in
// step. Contact details are deliberately not part of this module.

export const resumeSummary =
  'I have 12 years of engineering experience. I make large platforms fast and safe for teams to change. I direct engineering at Blue Line Solutions.'

export type Role = { title: string; dates: string; highlights: string[] }
export type Job = {
  company: string
  dates: string
  title?: string
  highlights?: string[]
  // A company with more than one role lists each role under one heading.
  roles?: Role[]
}

export const jobs: Job[] = [
  {
    company: 'Blue Line Solutions',
    dates: '2025 – Present',
    roles: [
      {
        title: 'Director of Engineering',
        dates: '2025 – Present',
        highlights: [
          'Direct engineering for NewGuard, a CJIS-compliant SaaS platform for 200+ law enforcement agencies across the US. Promoted from Staff Engineer within 8 months.',
          'Led the CJIS audit to final NLETS approval. Each environment has its own tenant, a VNet with private endpoints, and Istio encryption end to end, so CJIS data stays inside it.',
          'Grew the engineering organization by an engineering manager and two software engineers, from identifying the need through hiring and onboarding. Established the SRE role, an on-call rotation, and a 5-level career ladder. Every new engineer met every 30-60-90 day milestone.',
        ],
      },
      {
        title: 'Staff Engineer',
        dates: '2025',
        highlights: [
          'Migrated a nationally deployed platform that processes millions of IoT events each day to AKS with zero dropped events. Led the year-long move off an end-of-life data center. Proved each step with new performance, reliability, and data-loss tests in on-demand ephemeral environments with isolated data.',
          'Increased releases 14x and removed release downtime with a GitOps delivery model. Teams made 999 automated releases in one quarter, versus 71 legacy releases that each required an outage.',
          'Cut build times 67%, from 12 to 4 minutes, by consolidating 45 service pipelines into an Nx monorepo. Custom CI queue batching and isolated ephemeral environments let teams release AI-generated code safely at volume.',
          'Removed 150+ static secrets across 15+ services with managed identity and auto-rotating certificates through a shared library. Put single sign-on in front of all internal tools.',
        ],
      },
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Microsoft',
    dates: '2021 – 2025',
    highlights: [
      'Architected and implemented a distributed event-driven platform across five organizations. It powers CMS systems for support.microsoft.com, Office, and Windows, with 2B+ users and 1B+ requests each month.',
      'Reclaimed about 1,300 developer hours each year by making CI 6x faster.',
      'Reduced rollbacks by 30% with ephemeral environments that enable full end-to-end testing across a distributed system.',
      'Improved Lighthouse scores from 48 to 100 and cut page load time by 5 seconds at 2B+ user scale. Used Incremental Static Regeneration driven by system events.',
      'Reduced content publication latency from 2 hours to 1 minute. Led the design and rollout of the new event-driven system.',
      'Launched a Work in Progress series for 50+ engineers. Contributors and reviewers learn from each other across teams.',
      'Led a team of six to build a RAG pipeline that enforces editorial standards for help content. It improved customer satisfaction scores and opened governed contributions from the technical writing team to all Microsoft employees.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Digital.ai (formerly VersionOne)',
    dates: '2018 – 2021',
    highlights: [
      'Scaled a commercial value stream management and CI/CD platform that served 53% of the Fortune 100 and millions of users.',
      'Core contributor to the VersionOne JavaScript SDK, with 200+ weekly downloads. Enterprise customers use it to build against the product suite.',
      'Led development of a scalable webhooks feature. Hundreds of engineering teams used it to build custom integrations and automate workflows.',
      'Removed week-long manual regression cycles across three teams with Cypress end-to-end tests.',
      'Reduced front-end development costs by 40% with a shared component library for 6 teams across two merged products.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'smash.gg',
    dates: '2017 – 2018',
    highlights: [
      'Led development of the Event Check-in feature, which moved the company from in-person to online esports. The change made the company the market leader and opened a high-growth revenue stream.',
      'Defined the Software Engineer in Test role and hired two engineers to automate critical user flows with Cypress.',
      'Eliminated human error in Firebase security rules by introducing the Bolt compiler.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'VersionOne',
    dates: '2014 – 2017',
    highlights: [
      'Brought React to the team as an early adopter.',
      'Turned a vanilla JavaScript codebase with implicit script loading into a tested, modular build. Introduced unit, integration, and Cypress end-to-end tests, linting, ES modules, and webpack.',
      'Set up CI to run every test suite, including the first unit tests for a Python backend that had none.',
      'Delivered Delivery at a Glance, which showed rework on items that returned to development, release composition, and work items split across release boundaries.',
    ],
  },
]

export const community = [
  'Conducted a hands-on Redux workshop at Connect.Tech, the largest multi-framework conference in the US.',
  'Presented at React ATL, a 4K-member meetup, on functional programming and engineering practices.',
  'Open source contributor to Cypress, Azure Functions, JsonEditor, Kafdrop, react-treeview, and jsreport.',
  'Co-admin of a curated, invite-only software engineering community. It runs resume reviews, mock interviews, hack nights, and show-and-tells.',
]

export const skills: [string, string][] = [
  [
    'Architecture & Design',
    'Distributed Systems, Microservices, Monorepo (Nx), Cloud Architecture',
  ],
  [
    'Cloud & Infrastructure',
    'Azure, Terraform, FluxCD, Istio, Kubernetes, Helm, Docker, AWS',
  ],
  ['Compliance', 'CJIS, SOC 2, NLETS, FIPS 140-3'],
  [
    'Security',
    'Entra ID, RBAC / ABAC, Managed Identity, Workload Identity Federation, Azure Key Vault, External Secrets Operator, Azure Firewall, WAF, mTLS, Policy-as-Code (Azure Policy, Kyverno, Cloud Custodian), SBOM',
  ],
  [
    'Observability & Messaging',
    'OpenTelemetry, Prometheus, Grafana, Azure Service Bus, RabbitMQ',
  ],
  [
    'Testing & Quality',
    'Playwright, Cypress, Jest, xUnit, k6, Visual Regression, Ephemeral Environments',
  ],
  [
    'Agentic Engineering',
    'Claude Code, multi-agent orchestration (firstmate), RAG',
  ],
  [
    'Machine Learning',
    'PyTorch, Transformers, CNNs, NLP, scikit-learn, pandas, NumPy, Matplotlib, Jupyter',
  ],
  [
    'Data & Databases',
    'SQL Server, Azure Cosmos DB, MongoDB, ClickHouse, Apache Spark, Azure Data Factory',
  ],
  [
    'CI/CD',
    'Azure DevOps, GitHub Actions, Nx (affected builds), Skopeo, OCI Artifacts, Kustomize, Bash',
  ],
  [
    'Languages & Frameworks',
    'C#, Python, TypeScript, Node.js, React, Next.js, GraphQL',
  ],
]

export const education = {
  degrees: [
    {
      degree: 'M.S. Machine Learning',
      school: 'Columbus State University',
      year: '2026',
      note: 'AI and Machine Learning Track Award',
    },
    {
      degree: 'B.S. Computer Science',
      school: 'Columbus State University',
      year: '2014',
    },
  ],
  publication: {
    title:
      'Deriving Entrepreneurial Insights from Open-Ended and Unstructured Survey Data Using NLP Techniques',
    venue: 'MDPI',
    date: 'November 2024',
    href: 'https://www.mdpi.com/2079-9292/13/23/4725',
  },
}
