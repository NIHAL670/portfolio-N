export const personalInfo = {
  name: "Nihal Yadav",
  tagline: "I build ML systems that ship as production backend software.",
  valueProposition:
    "Machine Learning Engineer and Backend Developer who designs, trains, and deploys ML models behind real APIs — not notebooks that stay on a laptop.",
  roles: ["ML Engineer", "Backend Developer", "Python Developer"],
  email: "ynihal494@gmail.com",
  phone: "+91 6378155393",
  socials: {
    linkedin: "https://www.linkedin.com/in/nihal-yadav-5131582b8?",
    github: "https://github.com/NIHAL670",
    huggingface: "https://huggingface.co/NIHAL670",
    leetcode: "https://leetcode.com/u/n3qEbroOHI/",
  },
  resumeUrl: "https://drive.google.com/file/d/1AZrOJEUvDmP1hpU8oHpMCDhHNbImNJOz/view?usp=drivesdk",
  availability: "Available for remote roles & freelance",
};

export const bio = [
  "I build ML pipelines end-to-end: from feature engineering and model training to wrapping everything in a clean REST API that actually handles traffic.",
  "My recent work includes multi-class crop recommendation systems and time-series crypto forecasting — both deployed and live. I'm a B.Tech CS student at AKGEC (graduating 2028) who writes Python for models and Node.js/Express for the services around them.",
  "I'm looking for remote ML or backend roles where I ship real software, not slide decks.",
];

export const stats = [
  { value: "6+", label: "ML Systems Deployed" },
  { value: "360+", label: "LeetCode Problems" },
  { value: "1500", label: "LeetCode Peak Rating" },
  { value: "4", label: "Models Benchmarked" },
];

export const skills = [
  {
    name: "Languages",
    items: ["Python", "C++", "JavaScript", "C"],
  },
  {
    name: "ML & Data",
    items: [
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "OpenCV",
      "LSTM / RNN",
      "CNNs",
      "XGBoost",
      "Random Forest",
    ],
  },
  {
    name: "Backend & APIs",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "FastAPI"],
  },
  {
    name: "Cloud & DevOps",
    items: ["AWS", "Docker", "CI/CD", "Git", "GitHub", "Streamlit", "Hugging Face"],
  },
  {
    name: "Databases",
    items: ["MongoDB", "PostgreSQL", "Redis"],
  },
];

export const projects = [
  {
    id: "smart-agriculture",
    title: "Smart Agriculture AI System",
    summary:
      "Multi-module AI platform combining crop recommendation, fertilizer optimization, and plant disease detection. Serves predictions with calibrated confidence scores across 7 crop types and 6 plant species.",
    problem:
      "Smallholder farmers lack access to agronomic expertise. They need data-driven crop selection based on soil conditions, optimized fertilizer recommendations, and early plant disease detection — in one unified tool, not three separate apps.",
    role: "Solo developer. Designed the system architecture, trained all ML models, built the web interface, containerized with Docker, and deployed to Hugging Face Spaces.",
    tech: [
      "Python",
      "scikit-learn",
      "TensorFlow / Keras",
      "CNN",
      "Streamlit",
      "Docker",
      "Hugging Face",
    ],
    keyDecision: {
      title: "Probability calibration over raw softmax scores",
      tradeoff:
        "Calibration adds a post-processing step and requires a held-out calibration set, reducing usable training data by ~15%. But it gives users confidence scores that actually map to real-world accuracy — unlike raw softmax which is notoriously overconfident. For a farming tool where wrong advice costs a growing season, trustworthy confidence matters more than extra training data.",
    },
    metrics: [
      { label: "Crop Types", value: "7" },
      { label: "Plant Species", value: "6" },
      { label: "Accuracy", value: "—", flag: "Measure with classification_report()" },
      { label: "Inference", value: "—", flag: "Time the predict() calls" },
    ],
    liveUrl: "#", // TODO: add real URL
    githubUrl: "#", // TODO: add real URL
  },
  {
    id: "crypto-predictor",
    title: "Crypto Price Predictor",
    summary:
      "ML-driven cryptocurrency price forecasting using LSTM/RNN and Random Forest models. Features multi-step forecasting with confidence interval visualization. Built during Infosys Springboard internship.",
    problem:
      "Cryptocurrency markets are volatile and non-stationary. Retail traders need accessible forecasting tools that surface prediction uncertainty, not just point estimates.",
    role: "Solo developer during Infosys Springboard internship. End-to-end ownership: data pipeline, feature engineering, model training, benchmarking, and deployment.",
    tech: [
      "Python",
      "TensorFlow / Keras",
      "LSTM",
      "GRU",
      "scikit-learn",
      "XGBoost",
      "Yahoo Finance API",
      "Streamlit",
    ],
    keyDecision: {
      title: "Full 4-model benchmark instead of single-model commitment",
      tradeoff:
        "Benchmarking LSTM, GRU, Random Forest, and XGBoost with hyperparameter sweeps quadrupled training time. But crypto data is non-stationary — a model that works on BTC may fail on ETH. The benchmark revealed that Random Forest outperformed LSTM on shorter windows, which changed the default model selection logic. Shipping without this comparison would have meant shipping the wrong model for half the use cases.",
    },
    metrics: [
      { label: "Models Compared", value: "4" },
      { label: "Architectures", value: "LSTM, GRU, RF, XGB" },
      { label: "RMSE", value: "—", flag: "Run evaluation on test set" },
      { label: "Forecast Steps", value: "—", flag: "Document the horizon" },
    ],
    liveUrl: "#", // TODO: add real URL
    githubUrl: "#", // TODO: add real URL
  },
  {
    id: "sarsa-digital",
    title: "Sarsa Digital Agency",
    summary:
      "Co-founded and engineered a high-performance web development agency. Designed and shipped custom React architectures, speed optimizations, and SEO integrations for client websites.",
    problem:
      "Modern businesses require premium, custom digital web structures that load fast and rank well on Google, but they lack the massive budget to pay corporate tech agency overhead fees.",
    role: "Co-founder and Technical Lead. Responsible for custom front-end framework configurations, domain setups, asset compression algorithms, and client delivery.",
    tech: [
      "React",
      "Vite",
      "TailwindCSS",
      "Node.js",
      "Express",
      "Google PageSpeed API",
      "Cloudflare DNS"
    ],
    keyDecision: {
      title: "Modular Custom Code over Page Builder Templates",
      tradeoff:
        "Using WordPress or Page Builders would have allowed us to launch in 2 days. However, builders inject up to 3MB of bloated JS. By building custom lightweight React environments, we co-engineered websites that load in under 600ms, achieving perfect 99%+ mobile Core Web Vitals score ratios and saving clients thousands in cloud host requirements."
    },
    metrics: [
      { label: "PageSpeed Index", value: "98/100" },
      { label: "Active Clients", value: "3+" },
      { label: "Page Load Time", value: "< 0.6s" },
      { label: "Time To First Byte", value: "< 120ms" }
    ],
    liveUrl: "https://www.sarsadigital.com",
    githubUrl: "#"
  }
];

export const experience = [
  {
    title: "Machine Learning Intern",
    company: "Mirai School of Technology",
    period: "Jun 2026 – Present",
    type: "Remote",
    highlights: [
      "Designing and optimizing deep neural networks for computer vision tasks in agriculture automation pipelines",
      "Deploying high-throughput model inference endpoints using FastAPI, Docker, and AWS ECS configurations",
      "Accelerating data preprocessing stages by 40% through parallel processing and vectorized database queries",
    ],
  },
  {
    title: "Machine Learning Intern",
    company: "Infosys Springboard",
    period: "Nov 2025 – Jan 2026",
    type: "Remote",
    highlights: [
      "Built end-to-end Cryptocurrency Price Prediction system with LSTM/RNN and Random Forest models",
      "Engineered time-series features from historical OHLCV data via Yahoo Finance API",
      "Applied sliding-window preprocessing and MinMax normalization for LSTM input sequences",
      "Benchmarked 4 architectures (LSTM, GRU, RF, XGBoost) and selected best-performing on RMSE/MAE",
      "Built interactive dashboard with real-time crypto selection and confidence interval visualization",
    ],
  },
  {
    title: "Campus Tech Ambassador",
    company: "GeeksforGeeks",
    period: "Jan 2026 – May 2026",
    type: "Leadership",
    highlights: [
      "Selected as campus tech ambassador to promote coding culture and competitive programming",
      "Organized coding contests, algorithm study groups, and placement preparation sessions",
    ],
  },
];

export const education = {
  school: "Ajay Kumar Garg Engineering College",
  degree: "B.Tech in Computer Science",
  location: "Ghaziabad, U.P.",
  period: "2024 – 2028 (Expected)",
  gpa: "8.0 / 10 CGPA",
};

export const achievements = [
  {
    icon: "trophy",
    title: "LeetCode",
    detail: "Max Rating 1500 · 260+ problems solved",
    link: "#", // TODO: add real URL
  },
  {
    icon: "certificate",
    title: "Infosys Springboard",
    detail:
      "ML Internship completed with distinction. Built and deployed production ML application recognized by program mentors.",
  },
  {
    icon: "letter",
    title: "Letter of Recommendation",
    detail:
      "From GeeksforGeeks for outstanding leadership as Team Lead, managing campus technical community for 6+ months.",
  },
  {
    icon: "brain",
    title: "Core CS Foundation",
    detail:
      "Strong foundation in Data Structures & Algorithms and Object-Oriented Programming. Active competitive programmer.",
  },
];

export const navLinks = [
  { id: "about", name: "About" },
  { id: "skills", name: "Skills" },
  { id: "projects", name: "Projects" },
  { id: "experience", name: "Experience" },
  { id: "contact", name: "Contact" },
];
