import { ProjectStaticInfo } from "@/types/project";
import { supportedChainIds } from "../chains";
import { supportedDexes } from "../swap/dex";

export const bscProjects: ProjectStaticInfo[] = [
  // AI Healthcare Technology Project
  {
    address: "0x42ed8781f42b91e0250b5159c072d4cc9d2c116e",
    slug: "ai-healthcare-diagnostics",
  imageDesktop: "https://picsum.photos/seed/ai-healthcare/800/600",
  imageMobile: "https://picsum.photos/seed/ai-healthcare-mobile/400/300",
  logo: "https://picsum.photos/seed/ai-healthcare-logo/100/100",
    chainId: supportedChainIds.bsc,
    id: "aihd",
    name: "AI Healthcare Diagnostics Platform",
    symbol: "AIHD",
    status: "deployed",
    description:
      "Revolutionary AI-powered diagnostic platform that reduces medical diagnosis time by 80% while improving accuracy to 99.2%",
    detailedOverview:
      "Our platform leverages advanced machine learning algorithms trained on over 10 million medical cases to provide instant, accurate diagnoses. The system integrates seamlessly with existing hospital infrastructure and provides real-time decision support to healthcare professionals.",
    problemStatement:
      "Current medical diagnosis processes are slow, expensive, and prone to human error, leading to delayed treatments and increased healthcare costs.",
    solution:
      "AI-powered diagnostic engine that analyzes medical data in real-time, providing instant recommendations with 99.2% accuracy.",
    targetMarket:
      "Healthcare institutions, diagnostic centers, and telemedicine platforms globally - $240B market opportunity",
    category: "Healthcare Technology",
    tags: ["AI", "Healthcare", "Diagnostics", "Machine Learning"],
    link: "/project/ai-healthcare-diagnostics",
    socials: [
      { twitter: "https://twitter.com/aihealthcare" },
      { linkedin: "https://linkedin.com/company/ai-healthcare" },
    ],
  pitchDeckUrl: "https://www.africau.edu/images/default/sample.pdf",
  demoVideoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    websiteUrl: "https://www.who.int/health-topics/digital-health",
  whitePaperUrl: "https://www.africau.edu/images/default/sample.pdf",
    team: [
      {
        name: "Dr. Sarah Chen",
        role: "CEO & Co-founder",
        bio: "Former Head of AI at Mayo Clinic, 15+ years in medical AI research, published 50+ papers in Nature and NEJM",
  avatar: "https://i.pravatar.cc/150?u=sarah-chen",
        linkedIn: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/drsarahchen",
      },
      {
        name: "Michael Rodriguez",
        role: "CTO & Co-founder",
        bio: "Ex-Google AI engineer, PhD in Machine Learning from Stanford, led development of TensorFlow Medical",
  avatar: "https://i.pravatar.cc/150?u=michael-rodriguez",
        linkedIn: "https://linkedin.com/in/michaelrodriguez",
      },
      {
        name: "Dr. James Wilson",
        role: "Chief Medical Officer",
        bio: "Board-certified radiologist, 20+ years clinical experience, former Johns Hopkins faculty",
  avatar: "https://i.pravatar.cc/150?u=james-wilson",
        linkedIn: "https://linkedin.com/in/drjameswilson",
      },
    ],
    fundingGoal: "2500000",
    useOfFunds: [
      {
        category: "R&D",
        percentage: 40,
        description: "AI model development and training infrastructure",
      },
      {
        category: "Regulatory",
        percentage: 25,
        description: "FDA approval and international compliance",
      },
      {
        category: "Marketing",
        percentage: 20,
        description: "Go-to-market strategy and partnerships",
      },
      {
        category: "Operations",
        percentage: 15,
        description: "Team expansion and operational infrastructure",
      },
    ],
    milestones: [
      {
        title: "MVP Launch",
        description: "Beta version deployed with 5 partner hospitals",
        targetDate: new Date("2025-06-01"),
        completed: true,
      },
      {
        title: "FDA Approval",
        description: "Regulatory approval for US market",
        targetDate: new Date("2025-12-01"),
        completed: false,
      },
      {
        title: "International Expansion",
        description: "Launch in EU and Asian markets",
        targetDate: new Date("2026-03-01"),
        completed: false,
      },
    ],
    holders: [
      { address: "0x141...b4c91", share: "18.96%" },
      { address: "0x2a3...c5d92", share: "12.45%" },
      { address: "0x7f8...e9a12", share: "8.73%" },
    ],
    bornDate: new Date("2025-01-15"),
    expiryDate: new Date("2026-01-15"),
    marketData: {
      marketCap: "2100000",
      tvl: "1800000",
      volume: "450000",
      price: "0.84",
      holdersCount: 3200,
      fundingProgress: 84,
      totalFunded: "2100000",
    },
    swapInfo: {
      dex: supportedDexes.uniswapV3,
      fee: 3000,
    },
  },

  // Sustainable Energy Project
  {
    address: "0x42ed8781f42b91e0250b5159c072d4cc9d2c116e",
    slug: "solar-blockchain-grid",
  imageDesktop: "https://picsum.photos/seed/solar-grid/800/600",
  imageMobile: "https://picsum.photos/seed/solar-grid-mobile/400/300",
  logo: "https://picsum.photos/seed/solar-grid-logo/100/100",
    chainId: supportedChainIds.bsc,
    id: "dseg",
    name: "Decentralized Solar Energy Grid",
    symbol: "DSEG",
    status: "deployed",
    description:
      "Blockchain-powered peer-to-peer solar energy trading platform that enables homeowners to sell excess solar energy directly to neighbors",
    detailedOverview:
      "Our platform creates a decentralized energy marketplace where solar panel owners can automatically sell excess energy to nearby consumers through smart contracts. The system reduces energy costs by 30% while promoting renewable energy adoption.",
    problemStatement:
      "Traditional energy grids are inefficient, centralized, and don't incentivize renewable energy production at the household level.",
    solution:
      "Blockchain-based energy trading platform with IoT integration for automated energy transactions and grid optimization.",
    targetMarket:
      "Residential solar owners and energy consumers in deregulated markets - $50B opportunity",
    category: "Clean Energy",
    tags: ["Blockchain", "Solar", "Energy", "Sustainability", "IoT"],
    link: "/project/solar-blockchain-grid",
    socials: [
      { twitter: "https://twitter.com/solargrid" },
      { linkedin: "https://linkedin.com/company/solar-blockchain-grid" },
    ],
  pitchDeckUrl: "https://www.africau.edu/images/default/sample.pdf",
  demoVideoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    websiteUrl: "https://www.energy.gov/eere/solar/solar-energy-technologies-office",
    team: [
      {
        name: "Alex Thompson",
        role: "Founder & CEO",
        bio: "Former Tesla Energy executive, 12 years in renewable energy sector, led $500M+ energy projects",
  avatar: "https://i.pravatar.cc/150?u=alex-thompson",
        linkedIn: "https://linkedin.com/in/alexthompson",
      },
      {
        name: "Dr. Priya Patel",
        role: "Chief Technology Officer",
        bio: "Blockchain researcher, PhD in Electrical Engineering from MIT, 8 patents in energy systems",
  avatar: "https://i.pravatar.cc/150?u=priya-patel",
        linkedIn: "https://linkedin.com/in/priyapatel",
      },
    ],
    fundingGoal: "1800000",
    useOfFunds: [
      {
        category: "Technology",
        percentage: 45,
        description: "IoT devices and blockchain infrastructure",
      },
      {
        category: "Partnerships",
        percentage: 25,
        description: "Utility company integrations and pilot programs",
      },
      {
        category: "Marketing",
        percentage: 20,
        description: "Community outreach and user acquisition",
      },
      {
        category: "Operations",
        percentage: 10,
        description: "Team and operational costs",
      },
    ],
    milestones: [
      {
        title: "Pilot Program",
        description: "100-home pilot in California",
        targetDate: new Date("2025-04-01"),
        completed: true,
      },
      {
        title: "Grid Integration",
        description: "Integration with 3 major utilities",
        targetDate: new Date("2025-09-01"),
        completed: false,
      },
    ],
    holders: [
      { address: "0x3b2...d6e83", share: "22.15%" },
      { address: "0x9c4...f7a94", share: "15.67%" },
    ],
    bornDate: new Date("2025-02-01"),
    expiryDate: new Date("2026-02-01"),
    marketData: {
      marketCap: "1650000",
      tvl: "1200000",
      volume: "320000",
      price: "0.92",
      holdersCount: 1800,
      fundingProgress: 92,
      totalFunded: "1656000",
    },
    swapInfo: {
      dex: supportedDexes.uniswapV3,
      fee: 3000,
    },
  },

  // Fintech Project
  {
    address: "0x42ed8781f42b91e0250b5159c072d4cc9d2c116e",
    slug: "defi-lending-protocol",
  imageDesktop: "https://picsum.photos/seed/defi-lending/800/600",
  imageMobile: "https://picsum.photos/seed/defi-lending-mobile/400/300",
  logo: "https://picsum.photos/seed/defi-lending-logo/100/100",
    chainId: supportedChainIds.bsc,
    id: "dlp",
    name: "DeFi Micro-Lending Protocol",
    symbol: "DLP",
    status: "deployed",
    description:
      "Decentralized lending protocol that provides micro-loans to underbanked populations using alternative credit scoring",
    detailedOverview:
      "Our protocol uses machine learning to assess creditworthiness based on on-chain behavior, social signals, and alternative data sources. This enables financial inclusion for 2 billion underbanked individuals globally.",
    problemStatement:
      "Traditional banking excludes 2 billion people worldwide due to lack of credit history, while existing DeFi protocols require significant collateral.",
    solution:
      "AI-powered credit scoring system that enables uncollateralized micro-loans based on alternative data and reputation systems.",
    targetMarket:
      "Underbanked populations in emerging markets - $200B+ addressable market",
    category: "Financial Services",
    tags: ["DeFi", "Lending", "Financial Inclusion", "AI", "Credit"],
    link: "/project/defi-lending-protocol",
    socials: [
      { twitter: "https://twitter.com/defilending" },
      { linkedin: "https://linkedin.com/company/defi-lending" },
    ],
    pitchDeckUrl: "https://example.com/defi-lending-pitch.pdf",
  demoVideoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    websiteUrl: "https://defilending.finance",
    team: [
      {
        name: "Maria Santos",
        role: "CEO & Co-founder",
        bio: "Former Goldman Sachs VP, 10+ years in emerging markets finance, Harvard MBA",
  avatar: "https://i.pravatar.cc/150?u=maria-santos",
        linkedIn: "https://linkedin.com/in/mariasantos",
      },
      {
        name: "David Kim",
        role: "CTO & Co-founder",
        bio: "Ex-Coinbase engineer, built lending systems at Scale AI, MIT Computer Science",
  avatar: "https://i.pravatar.cc/150?u=david-kim",
        linkedIn: "https://linkedin.com/in/davidkim",
      },
    ],
    fundingGoal: "3200000",
    useOfFunds: [
      {
        category: "Technology",
        percentage: 35,
        description: "Smart contract development and security audits",
      },
      {
        category: "Compliance",
        percentage: 30,
        description: "Regulatory compliance across multiple jurisdictions",
      },
      {
        category: "Partnerships",
        percentage: 20,
        description: "Local partner integrations and data providers",
      },
      {
        category: "Operations",
        percentage: 15,
        description: "Team expansion and operational infrastructure",
      },
    ],
    milestones: [
      {
        title: "Protocol Launch",
        description: "Mainnet deployment with basic lending features",
        targetDate: new Date("2025-03-15"),
        completed: true,
      },
      {
        title: "Credit Scoring Integration",
        description: "AI credit scoring system integration",
        targetDate: new Date("2025-08-01"),
        completed: false,
      },
    ],
    holders: [
      { address: "0x5d6...e8f91", share: "25.43%" },
      { address: "0xa1b...c2d34", share: "18.92%" },
    ],
    bornDate: new Date("2025-03-15"),
    expiryDate: new Date("2026-03-15"),
    marketData: {
      marketCap: "2800000",
      tvl: "2200000",
      volume: "680000",
      price: "0.88",
      holdersCount: 4500,
      fundingProgress: 88,
      totalFunded: "2816000",
    },
    swapInfo: {
      dex: supportedDexes.uniswapV3,
      fee: 3000,
    },
  },

  // Biotech Project
  {
    slug: "precision-medicine-platform",
  imageDesktop: "https://picsum.photos/seed/precision-medicine/800/600",
  imageMobile: "https://picsum.photos/seed/precision-medicine-mobile/400/300",
  logo: "https://picsum.photos/seed/precision-medicine-logo/100/100",
    chainId: supportedChainIds.bsc,
    id: "pmp",
    name: "Precision Medicine Platform",
    symbol: "PMP",
    status: "upcoming",
    description:
      "Personalized treatment platform using genomic data and AI to optimize drug selection and dosing for individual patients",
    detailedOverview:
      "Our platform analyzes patient genomic profiles to predict drug responses and optimize treatment protocols. Clinical trials show 40% improvement in treatment outcomes and 60% reduction in adverse reactions.",
    problemStatement:
      "One-size-fits-all medicine leads to treatment failures and adverse reactions in 30-50% of patients, costing healthcare systems billions annually.",
    solution:
      "Genomic analysis platform that personalizes treatment selection and dosing based on individual genetic profiles and biomarkers.",
    targetMarket:
      "Hospitals, oncology centers, and pharmaceutical companies - $150B precision medicine market",
    category: "Biotechnology",
    tags: ["Biotech", "Genomics", "Precision Medicine", "AI", "Healthcare"],
    link: "/project/precision-medicine-platform",
    socials: [
      { twitter: "https://twitter.com/precisionmed" },
      { linkedin: "https://linkedin.com/company/precision-medicine" },
    ],
    pitchDeckUrl: "https://example.com/precision-medicine-pitch.pdf",
  demoVideoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    websiteUrl: "https://precisionmed.bio",
    team: [
      {
        name: "Dr. Emily Zhang",
        role: "CEO & Co-founder",
        bio: "Former Genentech research director, PhD in Genomics from UCSF, 20+ publications in Cell and Nature",
  avatar: "https://i.pravatar.cc/150?u=emily-zhang",
        linkedIn: "https://linkedin.com/in/emilyzhang",
      },
      {
        name: "Dr. Robert Johnson",
        role: "Chief Scientific Officer",
        bio: "Oncologist and researcher, 15+ years in precision medicine, led clinical trials at MD Anderson",
  avatar: "https://i.pravatar.cc/150?u=robert-johnson",
        linkedIn: "https://linkedin.com/in/robertjohnson",
      },
    ],
    fundingGoal: "4500000",
    useOfFunds: [
      {
        category: "Clinical Trials",
        percentage: 50,
        description: "Phase II/III clinical trials and regulatory approval",
      },
      {
        category: "R&D",
        percentage: 25,
        description: "Platform development and genomic database expansion",
      },
      {
        category: "Partnerships",
        percentage: 15,
        description: "Hospital and pharmaceutical partnerships",
      },
      {
        category: "Operations",
        percentage: 10,
        description: "Team expansion and facilities",
      },
    ],
    milestones: [
      {
        title: "Platform Beta",
        description: "Beta platform with 10 partner hospitals",
        targetDate: new Date("2025-09-01"),
        completed: false,
      },
      {
        title: "Clinical Trial Results",
        description: "Phase II trial results publication",
        targetDate: new Date("2026-02-01"),
        completed: false,
      },
    ],
    holders: [
      { address: "0x8e9...f0a12", share: "30.25%" },
      { address: "0x4c5...d6e78", share: "20.15%" },
    ],
    launchDate: new Date("2025-06-01"),
  },

  // Space Technology Project
  {
    address: "0x42ed8781f42b91e0250b5159c072d4cc9d2c116e",
    slug: "satellite-internet-mesh",
  imageDesktop: "https://picsum.photos/seed/satellite-mesh/800/600",
  imageMobile: "https://picsum.photos/seed/satellite-mesh-mobile/400/300",
  logo: "https://picsum.photos/seed/satellite-mesh-logo/100/100",
    chainId: supportedChainIds.bsc,
    id: "sim",
    name: "Decentralized Satellite Internet Mesh",
    symbol: "SIM",
    status: "deployed",
    description:
      "Low-cost satellite constellation providing global internet access through decentralized mesh networking",
    detailedOverview:
      "Our constellation of 500 small satellites creates a decentralized internet infrastructure that provides high-speed connectivity to underserved regions. The mesh network is self-healing and resistant to censorship.",
    problemStatement:
      "3.7 billion people lack reliable internet access, while traditional satellite internet is expensive and controlled by centralized entities.",
    solution:
      "Decentralized satellite mesh network with community-owned ground stations and blockchain-based routing protocols.",
    targetMarket:
      "Rural and underserved communities globally - $400B+ connectivity market",
    category: "Space Technology",
    tags: ["Satellite", "Internet", "Decentralized", "Space", "Connectivity"],
    link: "/project/satellite-internet-mesh",
    socials: [
      { twitter: "https://twitter.com/satellitemesh" },
      { linkedin: "https://linkedin.com/company/satellite-mesh" },
    ],
    pitchDeckUrl: "https://example.com/satellite-mesh-pitch.pdf",
  demoVideoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    websiteUrl: "https://satellitemesh.space",
    team: [
      {
        name: "Dr. Lisa Chen",
        role: "CEO & Co-founder",
        bio: "Former SpaceX engineer, PhD in Aerospace Engineering from Caltech, led satellite deployment missions",
  avatar: "https://i.pravatar.cc/150?u=lisa-chen",
        linkedIn: "https://linkedin.com/in/lisachen",
      },
      {
        name: "Marcus Williams",
        role: "CTO & Co-founder",
        bio: "Ex-NASA systems engineer, 15+ years in satellite communications, MIT Electrical Engineering",
  avatar: "https://i.pravatar.cc/150?u=marcus-williams",
        linkedIn: "https://linkedin.com/in/marcuswilliams",
      },
    ],
    fundingGoal: "8500000",
    useOfFunds: [
      {
        category: "Satellite Manufacturing",
        percentage: 60,
        description: "Production and launch of 500 satellites",
      },
      {
        category: "Ground Infrastructure",
        percentage: 20,
        description: "Ground stations and mesh network equipment",
      },
      {
        category: "Regulatory",
        percentage: 10,
        description: "International spectrum licensing and compliance",
      },
      {
        category: "Operations",
        percentage: 10,
        description: "Mission control and customer support",
      },
    ],
    milestones: [
      {
        title: "First Constellation",
        description: "Launch first 50 satellites",
        targetDate: new Date("2025-08-01"),
        completed: false,
      },
      {
        title: "Beta Service",
        description: "Beta internet service in 5 regions",
        targetDate: new Date("2025-12-01"),
        completed: false,
      },
    ],
    holders: [
      { address: "0x1a2...b3c45", share: "28.75%" },
      { address: "0x6d7...e8f90", share: "22.30%" },
    ],
    bornDate: new Date("2025-04-01"),
    expiryDate: new Date("2026-04-01"),
    marketData: {
      marketCap: "7200000",
      tvl: "5800000",
      volume: "1200000",
      price: "0.85",
      holdersCount: 8900,
      fundingProgress: 85,
      totalFunded: "7225000",
    },
    swapInfo: {
      dex: supportedDexes.uniswapV3,
      fee: 3000,
    },
  },

  // Gaming/VR Project
  {
    slug: "metaverse-education-platform",
  imageDesktop: "https://picsum.photos/seed/metaverse-edu/800/600",
  imageMobile: "https://picsum.photos/seed/metaverse-edu-mobile/400/300",
  logo: "https://picsum.photos/seed/metaverse-edu-logo/100/100",
    chainId: supportedChainIds.bsc,
    id: "mep",
    name: "Metaverse Education Platform",
    symbol: "MEP",
    status: "upcoming",
    description:
      "Immersive VR/AR education platform that makes learning interactive and accessible through virtual classrooms and gamified experiences",
    detailedOverview:
      "Our platform transforms traditional education through immersive virtual reality experiences. Students can explore ancient Rome, conduct virtual chemistry experiments, or collaborate in 3D design spaces, improving learning outcomes by 65%.",
    problemStatement:
      "Traditional education methods fail to engage digital natives, leading to poor learning outcomes and high dropout rates.",
    solution:
      "Immersive VR/AR platform with gamified learning experiences, virtual laboratories, and collaborative 3D environments.",
    targetMarket:
      "Educational institutions and corporate training - $350B global education technology market",
    category: "Education Technology",
    tags: ["VR", "AR", "Education", "Metaverse", "Gaming", "Learning"],
    link: "/project/metaverse-education-platform",
    socials: [
      { twitter: "https://twitter.com/metaverseedu" },
      { linkedin: "https://linkedin.com/company/metaverse-education" },
    ],
    pitchDeckUrl: "https://example.com/metaverse-edu-pitch.pdf",
  demoVideoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    websiteUrl: "https://metaverseedu.com",
    team: [
      {
        name: "Jennifer Park",
        role: "CEO & Co-founder",
        bio: "Former Oculus education lead, Stanford Education PhD, pioneered VR learning methodologies",
  avatar: "https://i.pravatar.cc/150?u=jennifer-park",
        linkedIn: "https://linkedin.com/in/jenniferpark",
      },
      {
        name: "Alex Rodriguez",
        role: "CTO & Co-founder",
        bio: "Ex-Unity Technologies senior engineer, 12+ years in VR/AR development, Carnegie Mellon CS",
  avatar: "https://i.pravatar.cc/150?u=alex-rodriguez",
        linkedIn: "https://linkedin.com/in/alexrodriguez",
      },
      {
        name: "Dr. Sarah Kim",
        role: "Chief Learning Officer",
        bio: "Educational psychologist, 20+ years in curriculum design, Harvard Graduate School of Education",
  avatar: "https://i.pravatar.cc/150?u=sarah-kim",
        linkedIn: "https://linkedin.com/in/sarahkim",
      },
    ],
    fundingGoal: "5200000",
    useOfFunds: [
      {
        category: "Content Development",
        percentage: 40,
        description: "VR/AR educational content and curriculum creation",
      },
      {
        category: "Technology",
        percentage: 30,
        description: "Platform development and infrastructure",
      },
      {
        category: "Partnerships",
        percentage: 20,
        description: "School district and university partnerships",
      },
      {
        category: "Marketing",
        percentage: 10,
        description: "User acquisition and brand building",
      },
    ],
    milestones: [
      {
        title: "Platform Alpha",
        description: "Alpha release with 10 educational modules",
        targetDate: new Date("2025-07-01"),
        completed: false,
      },
      {
        title: "Pilot Program",
        description: "Pilot with 50 schools across 5 states",
        targetDate: new Date("2025-11-01"),
        completed: false,
      },
    ],
    holders: [
      { address: "0x9f0...a1b23", share: "35.60%" },
      { address: "0x4c5...d6e78", share: "24.80%" },
    ],
    launchDate: new Date("2025-05-15"),
  },

  // Agriculture Technology Project
  {
    address: "0x42ed8781f42b91e0250b5159c072d4cc9d2c116e",
    slug: "smart-farming-iot",
  imageDesktop: "https://picsum.photos/seed/smart-farming/800/600",
  imageMobile: "https://picsum.photos/seed/smart-farming-mobile/400/300",
  logo: "https://picsum.photos/seed/smart-farming-logo/100/100",
    chainId: supportedChainIds.bsc,
    id: "sfi",
    name: "Smart Farming IoT Network",
    symbol: "SFI",
    status: "deployed",
    description:
      "AI-powered IoT network that optimizes crop yields through precision agriculture, reducing water usage by 40% and increasing productivity by 25%",
    detailedOverview:
      "Our network of smart sensors and AI algorithms provides real-time crop monitoring, automated irrigation, and predictive analytics. Farmers using our system report 25% higher yields with 40% less water consumption.",
    problemStatement:
      "Traditional farming methods waste resources and produce suboptimal yields, while climate change threatens global food security.",
    solution:
      "IoT sensor network with AI-driven analytics for precision agriculture, automated resource management, and predictive crop optimization.",
    targetMarket:
      "Commercial farms and agricultural cooperatives - $12B precision agriculture market",
    category: "Agriculture Technology",
    tags: ["IoT", "Agriculture", "AI", "Sustainability", "Precision Farming"],
    link: "/project/smart-farming-iot",
    socials: [
      { twitter: "https://twitter.com/smartfarming" },
      { linkedin: "https://linkedin.com/company/smart-farming-iot" },
    ],
    pitchDeckUrl: "https://example.com/smart-farming-pitch.pdf",
  demoVideoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    websiteUrl: "https://smartfarming.ag",
    team: [
      {
        name: "Dr. Miguel Santos",
        role: "CEO & Co-founder",
        bio: "Agricultural engineer, 18+ years in precision farming, former John Deere innovation director",
  avatar: "https://i.pravatar.cc/150?u=miguel-santos",
        linkedIn: "https://linkedin.com/in/miguelsantos",
      },
      {
        name: "Rachel Thompson",
        role: "CTO & Co-founder",
        bio: "IoT systems architect, 12+ years in sensor networks, UC Davis Agricultural Engineering PhD",
  avatar: "https://i.pravatar.cc/150?u=rachel-thompson",
        linkedIn: "https://linkedin.com/in/rachelthompson",
      },
    ],
    fundingGoal: "2800000",
    useOfFunds: [
      {
        category: "Hardware",
        percentage: 45,
        description: "IoT sensors and monitoring equipment manufacturing",
      },
      {
        category: "Software",
        percentage: 25,
        description: "AI platform development and mobile applications",
      },
      {
        category: "Partnerships",
        percentage: 20,
        description: "Farm partnerships and distribution network",
      },
      {
        category: "Operations",
        percentage: 10,
        description: "Team expansion and customer support",
      },
    ],
    milestones: [
      {
        title: "Commercial Launch",
        description: "Launch with 100 partner farms",
        targetDate: new Date("2025-05-01"),
        completed: true,
      },
      {
        title: "International Expansion",
        description: "Expand to Latin America and Asia",
        targetDate: new Date("2025-10-01"),
        completed: false,
      },
    ],
    holders: [
      { address: "0x2b3...c4d56", share: "26.45%" },
      { address: "0x7e8...f9a01", share: "19.80%" },
    ],
    bornDate: new Date("2025-05-01"),
    expiryDate: new Date("2026-05-01"),
    marketData: {
      marketCap: "2520000",
      tvl: "1980000",
      volume: "420000",
      price: "0.90",
      holdersCount: 2800,
      fundingProgress: 90,
      totalFunded: "2520000",
    },
    swapInfo: {
      dex: supportedDexes.uniswapV3,
      fee: 3000,
    },
  },
];
