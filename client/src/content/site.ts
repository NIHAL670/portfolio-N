// Everything shown on the site lives in this file.
// Edit the text here; the components only handle layout.

export const site = {
  url: "https://portfolio-n-5uz6.vercel.app",
  name: "Nihal Yadav",
  role: "Machine Learning Engineer",
  location: "Ghaziabad, India",
  timezone: "IST, UTC+5:30",
  email: "ynihal494@gmail.com",
  // To update: replace client/public/Nihal-Yadav-Resume.pdf with the new file.
  resumeUrl: "/Nihal-Yadav-Resume.pdf",
  availability: "Open to remote ML and backend roles",
  headline: "I build machine learning systems and the backends that serve them.",
  intro:
    "I train models and build the services that run them: data pipelines, inference APIs, and the small interfaces people use to check the results. Computer science student at AKGEC, currently interning as an ML engineer at Mirai School of Technology.",
  socials: [
    { label: "GitHub", href: "https://github.com/NIHAL670", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nihal-yadav-5131582b8",
      icon: "linkedin",
    },
    { label: "Hugging Face", href: "https://huggingface.co/NIHAL670", icon: "huggingface" },
    { label: "LeetCode", href: "https://leetcode.com/u/n3qEbroOHI/", icon: "leetcode" },
  ],
};

export const stats = [
  { value: "1500", label: "LeetCode max rating" },
  { value: "360+", label: "LeetCode problems solved" },
  { value: "Pupil", label: "Codeforces rank" },
  { value: "4", label: "Internships and roles" },
];

export type Experience = {
  company: string;
  logo?: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    company: "Handshake AI",
    logo: "handshake",
    role: "LLM Evaluator",
    period: "Sep 2026 — Nov 2026",
    location: "Remote",
    points: [
      "Evaluating large language model responses for correctness, reasoning and instruction-following against detailed rubrics.",
      "Writing difficult computer science and machine learning prompts to find where models fail, with written explanations of each failure.",
      "Comparing and ranking alternative model answers, with justifications that feed into model improvement.",
    ],
    stack: ["LLM evaluation", "Prompt design", "Python"],
  },
  {
    company: "Mirai School of Technology",
    role: "Machine Learning Intern",
    period: "Jun 2026 — Present",
    location: "Remote",
    points: [
      "Designing and tuning deep neural networks for computer vision tasks in agriculture automation pipelines.",
      "Deploying model inference endpoints with FastAPI and Docker on AWS.",
      "Cut data preprocessing time by about 40% with parallel processing and vectorised queries.",
    ],
    stack: ["Python", "TensorFlow", "FastAPI", "Docker", "AWS"],
  },
  {
    company: "GeeksforGeeks",
    logo: "geeksforgeeks",
    role: "Campus Mantri",
    period: "Jan 2026 — May 2026",
    location: "AKGEC, Ghaziabad",
    points: [
      "Selected as the campus technical ambassador to grow the coding and competitive programming community at AKGEC.",
      "Ran coding contests, algorithm study groups and placement preparation sessions.",
      "Received a letter of recommendation from GeeksforGeeks for leading the campus community.",
    ],
  },
  {
    company: "Infosys Springboard",
    logo: "infosys",
    role: "Machine Learning Intern",
    period: "Nov 2025 — Jan 2026",
    location: "Remote",
    points: [
      "Built an end-to-end cryptocurrency price prediction system with LSTM/RNN and Random Forest models, deployed as a live Streamlit app.",
      "Engineered time-series features from historical OHLCV data via the Yahoo Finance API, with sliding-window preprocessing and MinMax scaling for the LSTM inputs.",
      "Benchmarked LSTM, GRU, Random Forest and XGBoost on RMSE and MAE and shipped the best performer per forecast window.",
      "Completed the internship with distinction.",
    ],
    stack: ["Python", "TensorFlow", "scikit-learn", "XGBoost", "Streamlit"],
  },
];

export type Project = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  points: string[];
  decision?: { title: string; body: string };
  stack: string[];
  links: { label: string; href: string }[];
  // Shown as a row of figures under the project. Leave the array empty to hide it.
  metrics: { value: string; label: string }[];
  // Either a screenshot of the live app, or the pipeline drawn as steps.
  image?: string;
  pipeline?: string[];
};

export const projects: Project[] = [
  {
    slug: "ironwall",
    title: "IronWall AI",
    context: "Audio deepfake detection · Team X-01",
    summary:
      "Listens to an uploaded clip or a live microphone and decides whether the voice is human or AI-generated, with a confidence score and a short written explanation of the verdict.",
    points: [
      "TensorFlow model on a multilingual wav2vec2-XLSR-53 backbone, served from FastAPI. Supports English, Hindi, Tamil, Telugu and Malayalam.",
      "Audio is scored in overlapping 5-second windows, so a short synthetic segment can't hide inside otherwise real speech.",
      "The inference server batches chunks from concurrent requests into a single model call.",
    ],
    decision: {
      title: "Run-length verdicts instead of max(score) > threshold",
      body: "A single window spiking on a cough or a clipped sample was enough to flag a whole clip. Deciding on the share and persistence of flagged windows, plus a trimmed mean for the reported score, removed most of those false positives.",
    },
    stack: ["TensorFlow", "Hugging Face", "FastAPI", "React", "Docker"],
    metrics: [
      { value: "5", label: "Languages supported" },
      { value: "5 s", label: "Analysis window" },
      // { value: "—", label: "Test accuracy" },
      // { value: "— ms", label: "Latency per 5 s chunk" },
    ],
    links: [
      { label: "Source", href: "https://github.com/NIHAL670/DEEP-FAKE-DETECTION-MODEL" },
    ],
    pipeline: [
      "Upload or live mic",
      "5 s overlapping windows",
      "wav2vec2-XLSR-53",
      "Cross-request batching",
      "Run-length verdict",
    ],
  },
  {
    slug: "smart-agriculture",
    title: "Smart Agriculture AI",
    context: "Crop recommendation and plant disease detection",
    summary:
      "One tool for crop selection, fertilizer advice and leaf disease detection, deployed on Hugging Face Spaces with Docker.",
    points: [
      "Multi-class crop classifier trained on soil NPK, pH, temperature, humidity and rainfall. Returns the top three crops with confidence scores.",
      "CNN leaf disease detector for rice, maize, cotton, banana, tomato and potato, with treatment suggestions for each detected disease.",
    ],
    decision: {
      title: "Calibrated probabilities over raw softmax",
      body: "Calibration needed a held-out set, which cost about 15% of the training data. For advice that can cost a farmer a season, a confidence score that matches real accuracy was worth more than the extra data.",
    },
    stack: ["scikit-learn", "TensorFlow", "Keras", "Streamlit", "Docker"],
    metrics: [
      { value: "7", label: "Crop types" },
      { value: "6", label: "Plant species" },
      // { value: "—%", label: "Top-3 crop accuracy" },
      // { value: "—%", label: "Disease detection accuracy" },
    ],
    links: [
      {
        label: "Live demo",
        href: "https://ai-powered-crop-prediction-and-disease-detection-model-akzxt96.streamlit.app/",
      },
      {
        label: "Source",
        href: "https://github.com/NIHAL670/AI-powered-crop-prediction-and-disease-detection-model",
      },
    ],
    image: "/work/crop.webp",
  },
  {
    slug: "voxledger",
    title: "VoxLedger AI",
    context: "Voice commands for spreadsheets",
    summary:
      "Say a plain-English command against a ledger. VoxLedger writes the Pandas code, runs it in a sandbox, shows a before/after view and exports a matching Excel VBA macro.",
    points: [
      "Speech is transcribed with Whisper on Groq. Llama 3.3 70B generates the code with the sheet's live schema and sample rows in the prompt.",
      "Groq JSON mode and Pydantic validate every response before anything runs. Generated code executes in a restricted namespace.",
      "The sample data follows Indian accounting conventions: April–March financial year, GST and TDS columns.",
    ],
    stack: ["Python", "Pandas", "Pydantic", "Streamlit"],
    metrics: [
      // { value: "—", label: "Commands that ran first try" },
      // { value: "— s", label: "Voice to result" },
    ],
    links: [
      {
        label: "Live demo",
        href: "https://capstone-project1-ui6559rsmwwdymgffm5nxr.streamlit.app",
      },
      { label: "Source", href: "https://github.com/NIHAL670/Capstone-project1" },
    ],
    image: "/work/vox.webp",
  },
  {
    slug: "crypto",
    title: "Crypto Price Forecasting",
    context: "Infosys Springboard internship",
    summary:
      "Multi-step price forecasts for major cryptocurrencies with confidence intervals, so the uncertainty is visible next to the prediction.",
    points: [
      "Features engineered from historical OHLCV data. Sliding-window sequences feed the recurrent models.",
      "Interactive dashboard to pick a coin, set the horizon and compare models.",
    ],
    decision: {
      title: "Benchmark four models before choosing one",
      body: "Sweeping LSTM, GRU, Random Forest and XGBoost took four times the training time, but it showed Random Forest beating LSTM on short windows. That changed which model the app uses by default.",
    },
    stack: ["TensorFlow", "Keras", "scikit-learn", "Streamlit"],
    metrics: [
      { value: "4", label: "Models benchmarked" },
      // { value: "—", label: "Best RMSE (BTC, test set)" },
      // { value: "— days", label: "Forecast horizon" },
    ],
    links: [
      {
        label: "Live demo",
        href: "https://cryptoppredictionmodel-cqxjzk68cpcugixbppt8vt.streamlit.app",
      },
      { label: "Source", href: "https://github.com/NIHAL670/cryptop_prediction_model" },
    ],
    pipeline: [
      "Yahoo Finance OHLCV",
      "Sliding windows, MinMax",
      "LSTM · GRU · RF · XGBoost",
      "RMSE / MAE benchmark",
      "Forecast with intervals",
    ],
  },
];

export const otherProjects = [
  {
    title: "Sarsa Digital",
    description:
      "Co-founded a small web studio building fast, custom React sites for local businesses.",
    href: "https://www.sarsadigital.com",
    image: "/work/sarsa.webp",
  },
  {
    title: "NovaCart",
    description: "E-commerce storefront in TypeScript with categories, deals and a product grid.",
    href: "https://nova-ecart.vercel.app",
    image: "/work/nova.webp",
  },
  {
    title: "Agentic News Verifier",
    description:
      "Meta PyTorch OpenEnv hackathon environment where an LLM agent must search for evidence before labelling a headline true or false. FastAPI, Docker, Qwen2.5-72B.",
    href: "https://github.com/NIHAL670/Agentic-News-Verifier",
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "C++", "JavaScript", "C", "SQL"] },
  {
    group: "Machine learning",
    items: ["TensorFlow", "Keras", "scikit-learn", "XGBoost", "Pandas", "NumPy", "OpenCV"],
  },
  { group: "LLMs", items: ["Hugging Face", "Groq", "Pydantic", "Structured outputs"] },
  { group: "Backend", items: ["FastAPI", "Node.js", "Express", "REST", "WebSockets"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis"] },
  {
    group: "Tooling",
    items: ["Docker", "AWS", "Git", "GitHub Actions", "Streamlit", "React", "Tailwind CSS"],
  },
];

export const achievements = [
  {
    title: "LeetCode",
    icon: "leetcode",
    detail: "Max rating 1500 · 360+ problems solved",
    href: "https://leetcode.com/u/n3qEbroOHI/",
  },
  {
    title: "Codeforces",
    icon: "codeforces",
    detail: "Pupil, max rating 902 · 118+ problems solved",
  },
  {
    title: "GeeksforGeeks",
    icon: "geeksforgeeks",
    detail: "Letter of recommendation for leading the campus technical community",
  },
  {
    title: "Infosys Springboard",
    icon: "infosys",
    detail: "ML internship completed with distinction",
  },
];

export const education = {
  school: "Ajay Kumar Garg Engineering College",
  degree: "B.Tech, Computer Science",
  period: "2024 — 2028",
  detail: "CGPA 7.8 / 10 · Data structures, algorithms, OOP",
};

export const nav = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
