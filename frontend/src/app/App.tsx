import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Terminal,
  Cloud,
  BrainCircuit,
  Workflow,
  Monitor,
  Server,
  Network,
  Shield,
  Bot,
  Globe,
  Smartphone,
  GitBranch,
  Layers,
  Laptop,
  FolderGit2,
  Code2,
  BookOpen,
  ArrowRight,
  Database,
  Container,
  Boxes,
  ChevronRight,
  Map,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  CheckCircle2,
  Circle,
  Cpu,
  GraduationCap,
  Star,
  FileText,
  Download,
  ExternalLink,
  Sparkles,
  Zap,
  Mail,
  Rocket,
  Target,
} from "lucide-react";

// ─── types ─────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  count: number;
  accentFrom: string;
  accentTo: string;
  iconColor: string;
  glowColor: string;
  borderHover: string;
  tag: string;
}

interface Roadmap {
  id: string;
  title: string;
  subtitle: string;
  steps: { label: string; done: boolean; tag?: string }[];
  accentColor: string;
  barColor: string;
  glowColor: string;
  borderColor: string;
}

interface SearchSuggestion {
  label: string;
  category: string;
  categoryColor: string;
}

// ─── data ──────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "linux",
    icon: <Terminal size={20} />,
    label: "Linux",
    description: "Filesystem, shell scripting, permissions, process management, networking commands, and sysadmin essentials.",
    count: 148,
    accentFrom: "#f97316",
    accentTo: "#ea580c",
    iconColor: "text-orange-400",
    glowColor: "rgba(249,115,22,0.15)",
    borderHover: "hover:border-orange-500/40",
    tag: "Most Popular",
  },
  {
    id: "aws",
    icon: <Cloud size={20} />,
    label: "AWS",
    description: "EC2, S3, Lambda, IAM, VPC, RDS, CloudFormation and the full cloud architecture playbook.",
    count: 112,
    accentFrom: "#38bdf8",
    accentTo: "#0284c7",
    iconColor: "text-sky-400",
    glowColor: "rgba(56,189,248,0.15)",
    borderHover: "hover:border-sky-500/40",
    tag: "Cloud",
  },
  {
    id: "dsa",
    icon: <BrainCircuit size={20} />,
    label: "DSA",
    description: "Arrays, trees, graphs, dynamic programming, sorting — with annotated solutions and complexity analysis.",
    count: 203,
    accentFrom: "#a78bfa",
    accentTo: "#7c3aed",
    iconColor: "text-violet-400",
    glowColor: "rgba(167,139,250,0.15)",
    borderHover: "hover:border-violet-500/40",
    tag: "Essential",
  },
  {
    id: "fullstack",
    icon: <Layers size={20} />,
    label: "Full Stack",
    description: "React, Node.js, REST APIs, databases, authentication, deployment — end-to-end web development.",
    count: 176,
    accentFrom: "#34d399",
    accentTo: "#059669",
    iconColor: "text-emerald-400",
    glowColor: "rgba(52,211,153,0.15)",
    borderHover: "hover:border-emerald-500/40",
    tag: "Trending",
  },
  {
    id: "projects",
    icon: <FolderGit2 size={20} />,
    label: "Projects",
    description: "Real-world project walkthroughs with source code, architecture diagrams, and deployment guides.",
    count: 64,
    accentFrom: "#f472b6",
    accentTo: "#db2777",
    iconColor: "text-pink-400",
    glowColor: "rgba(244,114,182,0.15)",
    borderHover: "hover:border-pink-500/40",
    tag: "Hands-on",
  },
  {
    id: "interview",
    icon: <Code2 size={20} />,
    label: "Interview Prep",
    description: "Curated FAANG questions, system design, behavioral patterns, and company-specific preparation.",
    count: 89,
    accentFrom: "#fbbf24",
    accentTo: "#d97706",
    iconColor: "text-amber-400",
    glowColor: "rgba(251,191,36,0.15)",
    borderHover: "hover:border-amber-500/40",
    tag: "Must Read",
  },
];

const roadmaps: Roadmap[] = [
  {
    id: "rm1",
    title: "Linux Mastery",
    subtitle: "From zero to sysadmin",
    accentColor: "text-orange-400",
    barColor: "bg-orange-500",
    glowColor: "rgba(249,115,22,0.2)",
    borderColor: "border-orange-500/20",
    steps: [
      { label: "Shell basics & navigation", done: true, tag: "Done" },
      { label: "File permissions & users", done: true, tag: "Done" },
      { label: "Process & job management", done: false },
      { label: "Networking tools & SSH", done: false },
      { label: "Shell scripting & cron", done: false },
      { label: "System monitoring & logs", done: false },
    ],
  },
  {
    id: "rm2",
    title: "AWS Solutions Architect",
    subtitle: "Cloud infrastructure path",
    accentColor: "text-sky-400",
    barColor: "bg-sky-500",
    glowColor: "rgba(56,189,248,0.2)",
    borderColor: "border-sky-500/20",
    steps: [
      { label: "IAM, Policies & Roles", done: true, tag: "Done" },
      { label: "VPC, Subnets & Security Groups", done: true, tag: "Done" },
      { label: "EC2, ASG & Load Balancers", done: false },
      { label: "RDS, DynamoDB & ElastiCache", done: false },
      { label: "Lambda & Serverless", done: false },
      { label: "CloudFormation & CDK", done: false },
    ],
  },
  {
    id: "rm3",
    title: "DSA for Interviews",
    subtitle: "Crack FAANG with patterns",
    accentColor: "text-violet-400",
    barColor: "bg-violet-500",
    glowColor: "rgba(167,139,250,0.2)",
    borderColor: "border-violet-500/20",
    steps: [
      { label: "Arrays, Strings & Hashing", done: true, tag: "Done" },
      { label: "Linked Lists & Stacks", done: true, tag: "Done" },
      { label: "Trees & Binary Search", done: true, tag: "Done" },
      { label: "Graphs & Traversals", done: false },
      { label: "Dynamic Programming", done: false },
      { label: "Advanced Patterns", done: false },
    ],
  },
  {
    id: "rm4",
    title: "Full Stack Dev",
    subtitle: "Build real products",
    accentColor: "text-emerald-400",
    barColor: "bg-emerald-500",
    glowColor: "rgba(52,211,153,0.2)",
    borderColor: "border-emerald-500/20",
    steps: [
      { label: "HTML, CSS & JavaScript", done: true, tag: "Done" },
      { label: "React & Component Design", done: false },
      { label: "Node.js & REST APIs", done: false },
      { label: "SQL & NoSQL Databases", done: false },
      { label: "Authentication & Security", done: false },
      { label: "Deployment & DevOps", done: false },
    ],
  },
];

const searchSuggestions: SearchSuggestion[] = [
  { label: "Linux file permissions chmod", category: "Linux", categoryColor: "text-orange-400" },
  { label: "AWS Lambda cold starts", category: "AWS", categoryColor: "text-sky-400" },
  { label: "Binary search tree traversal", category: "DSA", categoryColor: "text-violet-400" },
  { label: "React useEffect patterns", category: "Full Stack", categoryColor: "text-emerald-400" },
  { label: "System design interview guide", category: "Interview Prep", categoryColor: "text-amber-400" },
  { label: "SSH key setup and config", category: "Linux", categoryColor: "text-orange-400" },
  { label: "VPC subnet architecture", category: "AWS", categoryColor: "text-sky-400" },
  { label: "Dynamic programming memoization", category: "DSA", categoryColor: "text-violet-400" },
  { label: "JWT authentication flow", category: "Full Stack", categoryColor: "text-emerald-400" },
  { label: "Behavioral interview STAR method", category: "Interview Prep", categoryColor: "text-amber-400" },
];

const navLinks = [
  { label: "Linux", href: "#linux" },
  { label: "AWS", href: "#aws" },
  { label: "DSA", href: "#dsa" },
  { label: "Full Stack", href: "#fullstack" },
  { label: "Projects", href: "#projects" },
  { label: "Interview Prep", href: "#interview" },
];

// ─── RoadmapCard ───────────────────────────────────────────────────────────────



// ─── CategoryCard ─────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  notes,
}: {
  cat: any;
  notes: any[];
}) {


  const categoryIcons: any = {
  // Linux / OS
  Linux: Terminal,
  Ubuntu: Terminal,
  Unix: Terminal,
  OperatingSystem: Terminal,
  OS: Terminal,

  // Cloud
  AWS: Cloud,
  Azure: Cloud,
  GCP: Cloud,
  Cloud: Cloud,
  CloudComputing: Cloud,

  // DevOps
  DevOps: Workflow,
  Docker: Boxes,
  Kubernetes: Boxes,
  Jenkins: Workflow,
  CI_CD: Workflow,
  Terraform: Workflow,
  Ansible: Workflow,

  // Programming
  Python: Code2,
  Java: Code2,
  C: Code2,
  CPP: Code2,
  JavaScript: Code2,
  TypeScript: Code2,
  Programming: Code2,

  // DSA
  DSA: BrainCircuit,
  Algorithms: BrainCircuit,
  DataStructures: BrainCircuit,
  CompetitiveProgramming: BrainCircuit,

  // Full Stack
  FullStack: Layers,
  Frontend: Monitor,
  Backend: Server,
  MERN: Layers,
  MEAN: Layers,
  React: Layers,
  Angular: Layers,
  Vue: Layers,
  NodeJS: Server,
  Express: Server,

  // Database
  Database: Database,
  SQL: Database,
  MySQL: Database,
  PostgreSQL: Database,
  MongoDB: Database,
  NoSQL: Database,

  // Networking
  Networking: Network,
  ComputerNetworks: Network,
  CCNA: Network,

  // Cyber Security
  CyberSecurity: Shield,
  Security: Shield,
  EthicalHacking: Shield,
  PenTesting: Shield,

  // AI / ML
  AI: Bot,
  ML: Bot,
  MachineLearning: Bot,
  DeepLearning: Bot,
  DataScience: Bot,
  GenAI: Bot,

  // Embedded / ECE
  Embedded: Cpu,
  IoT: Cpu,
  Arduino: Cpu,
  ESP32: Cpu,
  VLSI: Cpu,
  Electronics: Cpu,

  // Web
  WebDevelopment: Globe,
  HTML: Globe,
  CSS: Globe,

  // Mobile
  Android: Smartphone,
  Flutter: Smartphone,
  ReactNative: Smartphone,

  // Git
  Git: GitBranch,
  GitHub: GitBranch,

  // Projects
  Projects: Rocket,
  MiniProjects: Rocket,
  MajorProjects: Rocket,

  // Interview
  InterviewPrep: BrainCircuit,
  PlacementPrep: BrainCircuit,
  Aptitude: BrainCircuit,
};

  const colors = [
  {
    border: "rgba(34,197,94,0.35)",
    bg: "rgba(34,197,94,0.15)",
    text: "#22c55e",
  },
  {
    border: "rgba(14,165,233,0.35)",
    bg: "rgba(14,165,233,0.15)",
    text: "#0ea5e9",
  },
  {
    border: "rgba(168,85,247,0.35)",
    bg: "rgba(168,85,247,0.15)",
    text: "#a855f7",
  },
  {
    border: "rgba(249,115,22,0.35)",
    bg: "rgba(249,115,22,0.15)",
    text: "#f97316",
  },
  {
    border: "rgba(236,72,153,0.35)",
    bg: "rgba(236,72,153,0.15)",
    text: "#ec4899",
  },
];

const theme =
  colors[
    cat.name.length %
      colors.length
  ];
  const categoryName =
  cat.name.toLowerCase();

let Icon = BookOpen;

if (categoryName.includes("linux")) Icon = Terminal;
else if (categoryName.includes("aws")) Icon = Cloud;
else if (categoryName.includes("azure")) Icon = Cloud;
else if (categoryName.includes("cloud")) Icon = Cloud;
else if (categoryName.includes("devops")) Icon = Workflow;
else if (categoryName.includes("docker")) Icon = Boxes;
else if (categoryName.includes("kubernetes")) Icon = Boxes;
else if (categoryName.includes("python")) Icon = Code2;
else if (categoryName.includes("java")) Icon = Code2;
else if (categoryName.includes("dsa")) Icon = BrainCircuit;
else if (categoryName.includes("algorithm")) Icon = BrainCircuit;
else if (categoryName.includes("react")) Icon = Layers;
else if (categoryName.includes("full")) Icon = Layers;
else if (categoryName.includes("database")) Icon = Database;
else if (categoryName.includes("sql")) Icon = Database;
else if (categoryName.includes("mongo")) Icon = Database;
else if (categoryName.includes("network")) Icon = Network;
else if (categoryName.includes("security")) Icon = Shield;
else if (categoryName.includes("ai")) Icon = Bot;
else if (categoryName.includes("ml")) Icon = Bot;
else if (categoryName.includes("iot")) Icon = Cpu;
else if (categoryName.includes("vlsi")) Icon = Cpu;
else if (categoryName.includes("git")) Icon = GitBranch;
else if (categoryName.includes("project")) Icon = Rocket;
  return (
    <div
      className="group relative flex flex-col gap-4 rounded-2xl border p-6 cursor-pointer transition-all duration-300 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(8,15,30,0.95) 100%)",
        backdropFilter: "blur(16px)",
        borderColor:theme.border,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow =
          "0 0 40px rgba(99,102,241,0.25), 0 12px 40px rgba(0,0,0,0.5)";
        el.style.borderColor = "rgba(99,102,241,0.4)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "none";
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.transform = "translateY(0)";
      }}
      onClick={() =>
        (window.location.href = `/category/${cat.name}`)
      }
    >
      {/* Glow Effect */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35), transparent)",
        }}
      />

      <div className="relative">
        <div
  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
  style={{
    background: theme.bg,
    color: theme.text,
  }}
>
  <Icon size={24} />
</div>
        {/*<div
  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
  style={{
    background:
      "rgba(99,102,241,0.15)",
    color: "#818cf8"
  }}
>
  
</div>*/}
        <h3 className="font-bold text-2xl text-white mb-2">
          {cat.name}
        </h3>

        <p
          className="text-sm text-slate-500 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {cat.description || "No description available"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-500 font-mono">
  {
    notes.filter(
      (note) =>
        note.category === cat.name
    ).length
  } Notes
</span>

        <button
  className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
  style={{ color: "#818cf8" }}
>
  Explore →
</button>
      </div>
    </div>
  );
}


const getRoadmapColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return {
        border: "rgba(34,197,94,0.35)",
        badge: "bg-green-500/20 text-green-400",
        bar: "bg-green-500",
        glow: "rgba(34,197,94,0.35)",
        text: "text-green-400",
      };

    case "Intermediate":
      return {
        border: "rgba(14,165,233,0.35)",
        badge: "bg-sky-500/20 text-sky-400",
        bar: "bg-sky-500",
        glow: "rgba(14,165,233,0.35)",
        text: "text-sky-400",
      };

    case "Advanced":
      return {
        border: "rgba(249,115,22,0.35)",
        badge: "bg-orange-500/20 text-orange-400",
        bar: "bg-orange-500",
        glow: "rgba(249,115,22,0.35)",
        text: "text-orange-400",
      };

    case "Expert":
      return {
        border: "rgba(168,85,247,0.35)",
        badge: "bg-purple-500/20 text-purple-400",
        bar: "bg-purple-500",
        glow: "rgba(168,85,247,0.35)",
        text: "text-purple-400",
      };

    case "Beginner → Intermediate":
      return {
        border: "rgba(6,182,212,0.35)",
        badge: "bg-cyan-500/20 text-cyan-400",
        bar: "bg-cyan-500",
        glow: "rgba(6,182,212,0.35)",
        text: "text-cyan-400",
      };

    case "Intermediate → Advanced":
      return {
        border: "rgba(59,130,246,0.35)",
        badge: "bg-blue-500/20 text-blue-400",
        bar: "bg-blue-500",
        glow: "rgba(59,130,246,0.35)",
        text: "text-blue-400",
      };

    case "Advanced → Expert":
      return {
        border: "rgba(236,72,153,0.35)",
        badge: "bg-pink-500/20 text-pink-400",
        bar: "bg-pink-500",
        glow: "rgba(236,72,153,0.35)",
        text: "text-pink-400",
      };

    case "Beginner → Advanced":
      return {
        border: "rgba(245,158,11,0.35)",
        badge: "bg-amber-500/20 text-amber-400",
        bar: "bg-amber-500",
        glow: "rgba(245,158,11,0.35)",
        text: "text-amber-400",
      };

    case "Beginner → Expert":
      return {
        border: "rgba(239,68,68,0.35)",
        badge: "bg-red-500/20 text-red-400",
        bar: "bg-red-500",
        glow: "rgba(239,68,68,0.35)",
        text: "text-red-400",
      };

    default:
      return {
        border: "rgba(99,102,241,0.35)",
        badge: "bg-indigo-500/20 text-indigo-400",
        bar: "bg-indigo-500",
        glow: "rgba(99,102,241,0.35)",
        text: "text-indigo-400",
      };
  }
};
// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroQuery, setHeroQuery] = useState("");
  const [showHeroSuggestions, setShowHeroSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
 
  const [topics, setTopics] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [learningPaths, setLearningPaths] = useState<any[]>([]);
  const [roadmapProgress, setRoadmapProgress] =
  useState<any>({});
  const [completedStepsMap, setCompletedStepsMap] =
  useState<any>({});
  const totalCategories = topics.length;
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const totalNotes = notes.length;
  const totalRoadmaps = learningPaths.length;
  
  useEffect(() => {
    axios.get("http://localhost:5000/categories")
      .then(res => setTopics(res.data));

    axios.get("http://localhost:5000/notes")
      .then(res => setNotes(res.data));

    axios
  .get("http://localhost:5000/roadmaps")
  .then((res) => {

  setLearningPaths(res.data);

 const progressMap: any = {};
const completedMap: any = {};

  res.data.forEach((roadmap: any) => {

    const saved =
      localStorage.getItem(
        `roadmap-${roadmap._id}`
      );

    const completed =
      saved
        ? JSON.parse(saved)
        : [];

    completedMap[
      roadmap._id
    ] = completed;

    progressMap[
      roadmap._id
    ] = Math.round(
      (completed.length /
        roadmap.steps.length) *
        100
    );
  });

  setRoadmapProgress(
    progressMap
  );

  setCompletedStepsMap(
    completedMap
  );
});
  }, []);

  // Always dark
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.background = "#05080f";
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (heroSearchRef.current && !heroSearchRef.current.contains(e.target as Node)) {
        setShowHeroSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
const heroSuggestions = (() => {

  const allItems = [

    ...topics.map((t) => ({
      label: t.name,
      category: "Category",
      categoryColor: "text-cyan-400",
    })),

    ...notes.map((n) => ({
      label: n.title,
      category: "Note",
      categoryColor: "text-green-400",
    })),

    ...learningPaths.map((r) => ({
      label: r.title,
      category: "Roadmap",
      categoryColor: "text-amber-400",
    })),
  ];

  if (!heroQuery.trim()) {
    return allItems
      .slice()
      .reverse()
      .slice(0, 5);
  }

  const words =
    heroQuery
      .toLowerCase()
      .split(" ");

  return allItems
  .filter(
    (item) =>
      words.some((word) =>
        item.label
          .toLowerCase()
          .includes(word)
      )
  )
  .slice(0, 8);
})();
const matchesSearch = (
  text: string
) => {

  if (!heroQuery.trim())
    return true;

  const words =
    heroQuery
      .toLowerCase()
      .split(" ");

  return words.some((word) =>
    text
      .toLowerCase()
      .includes(word)
  );
};

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <div
      className="min-h-screen text-slate-200"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: "linear-gradient(135deg, #05080f 0%, #080d1a 50%, #05080f 100%)",
      }}
    >
      {/* ── Global ambient glow ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #4f46e5 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #0ea5e9 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Navbar ── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(5,8,15,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            {/* Logo */}
<button
  type="button"
  onClick={() =>
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  className="flex items-center gap-2.5 shrink-0 cursor-pointer transition-all duration-200 hover:opacity-80"
>
  <div
    className="w-8 h-8 rounded-lg flex items-center justify-center"
    style={{
      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    }}
  >
    <BookOpen size={15} className="text-white" />
  </div>

  <div className="leading-none whitespace-nowrap">
    <span className="font-extrabold text-[15px] tracking-tight text-white">
      Manju
    </span>

    <span
      className="font-extrabold text-[15px] tracking-tight ml-1"
      style={{
        background: "linear-gradient(90deg,#818cf8,#a78bfa)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Gowda L
    </span>
  </div>
</button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {[
                { label: "Categories", target: "categories" },
                { label: "Roadmaps", target: "roadmaps" },
              ].map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                  className="px-3 py-1.5 rounded-lg text-[13px] text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/*Navbar search
            <div className="hidden sm:block relative" ref={searchRef}>
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Search size={14} className="text-slate-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Search notes…"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  className="bg-transparent text-[13px] outline-none placeholder:text-slate-600 w-36 text-slate-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <kbd className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded text-slate-600" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  ⌘K
                </kbd>
              </div>
              {/* Suggestions dropdown */}
              {/*{showSuggestions && navbarSuggestions.length > 0 && (
                <div
                  className="absolute top-full mt-2 right-0 w-72 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "rgba(10,15,30,0.98)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="px-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">Suggestions</span>
                  </div>
                  {navbarSuggestions.map((s, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
                      onClick={() => { setQuery(s.label); setShowSuggestions(false); }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Search size={11} className="text-slate-600 shrink-0" />
                        <span className="text-[13px] text-slate-300 truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{s.label}</span>
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 ${s.categoryColor}`}>{s.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>*/}

            {/* Mobile menu btn */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div
            className="lg:hidden px-4 pb-4 pt-2 flex flex-col gap-1"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(5,8,15,0.98)" }}
          >
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-2"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Search size={14} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search notes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent text-sm outline-none placeholder:text-slate-600 flex-1 text-slate-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-slate-400 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-colors font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(79,70,229,0.12)",
              border: "1px solid rgba(79,70,229,0.25)",
              color: "#a78bfa",
            }}
          >
            <Sparkles size={14} />
            Curated Notes for Curious Minds
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-3 max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-white">
              A Builder's{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 40%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Knowledge
              </span>
              <br />
              Library
            </h1>
            <p
              className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mt-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
             A growing collection of notes, roadmaps, cheat sheets, and project learnings documented during my engineering journey.</p>
          </div>

          {/* Hero search */}
          <div className="w-full max-w-2xl" ref={heroSearchRef}>
            <div className="relative">
              <div
                className="flex items-center gap-3 rounded-2xl px-5 py-4 transition-all"
                style={{
                  background: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 0 60px rgba(79,70,229,0.1), 0 8px 32px rgba(0,0,0,0.4)",
                }}
                onFocus={() => setShowHeroSuggestions(true)}
              >
                <Search size={18} className="text-slate-500 shrink-0" />
                <input
                  type="text"
                  placeholder='Search notes, roadmaps, cheat sheets...'
                  value={heroQuery}
                  onChange={(e) => { setHeroQuery(e.target.value); setShowHeroSuggestions(true); }}
                  onFocus={() => setShowHeroSuggestions(true)}
                  className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-slate-600 text-slate-200 min-w-0"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <button
                  onClick={() => {
                  setShowHeroSuggestions(false);
                }}
                  className="shrink-0 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                >
                  Search
                </button>
              </div>

              {/* Hero suggestions dropdown */}
              {showHeroSuggestions && heroSuggestions.length > 0 && (
                <div
                  className="absolute top-full mt-2 left-0 right-0 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "rgba(8,12,24,0.99)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(24px)",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
                  }}
                >
                  <div className="px-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
                      {heroQuery.length > 0 ? "Search results" : "Popular searches"}
                    </span>
                  </div>
                  {heroSuggestions.map((s, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center justify-between gap-4 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                      onClick={() => {

  setHeroQuery(s.label);

  setShowHeroSuggestions(false);

  const note =
    notes.find(
      (n) => n.title === s.label
    );

  const roadmap =
    learningPaths.find(
      (r) => r.title === s.label
    );

  if (note) {
    navigate(`/note/${note._id}`);
  }

  if (roadmap) {
    navigate(
      `/roadmap/${roadmap._id}`
    );
  }
}}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Search size={13} className="text-slate-700 shrink-0" />
                        <span className="text-[14px] text-slate-300 truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{s.label}</span>
                      </div>
                      <span className={`text-[11px] font-mono shrink-0 px-2 py-0.5 rounded-full bg-white/5 ${s.categoryColor}`}>{s.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div
            className="flex flex-wrap items-center justify-center gap-8 text-sm mt-2 px-6 py-4 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {[
             { icon: <FileText size={14} />, value: totalNotes, label: "Notes" },
              { icon: <Map size={14} />, value: totalRoadmaps, label: "Roadmaps" },
              { icon: <Star size={14} />, value: totalCategories, label: "Categories" },
              { icon: <Download size={14} />, value: "Free", label: "Downloads" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="text-indigo-400">{s.icon}</span>
                <span className="font-bold text-white font-mono">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Categories ── */}
        <section id="categories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: "#818cf8" }}>
                Browse by Topic
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Categories</h2>
              <p className="text-slate-500 text-sm mt-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Each category expands automatically as new notes are published.
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors font-medium shrink-0">
              All categories <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {topics.filter((topic) =>
  matchesSearch(
    topic.name +
    " " +
    (topic.description || "")
  )
).length === 0 ? (

  <div className="col-span-full text-center py-10 text-slate-500">
    No results found
  </div>

) : (

  topics
    .filter((topic) =>
      matchesSearch(
        topic.name +
        " " +
        (topic.description || "")
      )
    )
    .map((topic) => (
      <CategoryCard
        key={topic._id}
        cat={topic}
        notes={notes}
      />
    ))

)}

        </div>
        </section>

        {selectedCategory && (
  <section className="max-w-7xl mx-auto px-4 py-10">
    <h2 className="text-2xl font-bold text-white mb-6">
      {selectedCategory} Notes
    </h2>

    <div className="grid gap-4">

      {notes
  .filter(
    (note) =>
      note.category === selectedCategory
  )
  .filter(
    (note) =>
      matchesSearch(
        note.title +
        " " +
        (note.description || "")
      )
  )
        .map((note) => (
          <div
            key={note._id}
            className="p-4 rounded-xl border border-slate-800 bg-slate-900"
          >
            <h3 className="text-white font-semibold">
              {note.title}
            </h3>

            <p className="text-slate-400 mt-2">
              {note.description}
            </p>
          </div>
      ))}

    </div>
  </section>
)}

        {/* ── Roadmaps ── */}
        {/* ── Roadmaps ── */}

<section
  id="roadmaps"
  className="py-16"
  style={{
    borderTop: "1px solid rgba(255,255,255,0.04)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: "rgba(255,255,255,0.01)",
  }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-end justify-between mb-10 gap-4">
      <div>
        <p
          className="text-xs font-mono font-semibold uppercase tracking-widest mb-2"
          style={{ color: "#818cf8" }}
        >
          Structured Learning
        </p>


    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
      Learning Roadmaps
    </h2>

    <p
      className="text-slate-500 text-sm mt-1.5"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      Follow curated paths from fundamentals to advanced mastery.
    </p>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

  {learningPaths.filter((roadmap) =>
  matchesSearch(
    roadmap.title
  )
).length === 0 ? (

  <div className="col-span-full text-center py-10 text-slate-500">
    No roadmaps found
  </div>

) : (

  learningPaths
    .filter((roadmap) =>
      matchesSearch(
        roadmap.title
      )
    )
    .map((roadmap) => (
  <div
    key={roadmap._id}
    onClick={() =>
      navigate(`/roadmap/${roadmap._id}`)
    }
    className="group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 overflow-hidden cursor-pointer"
    style={{
      background:
        "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(8,15,30,1) 100%)",

      borderColor:
        roadmap.level === "Beginner"
          ? "rgba(34,197,94,0.35)"
          : roadmap.level === "Intermediate"
          ? "rgba(14,165,233,0.35)"
          : roadmap.level === "Advanced"
          ? "rgba(249,115,22,0.35)"
          : roadmap.level === "Expert"
          ? "rgba(168,85,247,0.35)"
          : roadmap.level === "Beginner → Intermediate"
          ? "rgba(6,182,212,0.35)"
          : roadmap.level === "Intermediate → Advanced"
          ? "rgba(59,130,246,0.35)"
          : roadmap.level === "Advanced → Expert"
          ? "rgba(236,72,153,0.35)"
          : roadmap.level === "Beginner → Advanced"
          ? "rgba(245,158,11,0.35)"
          : "rgba(239,68,68,0.35)",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLElement;

      el.style.transform = "translateY(-8px) scale(1.02)";

      el.style.boxShadow =
        roadmap.level === "Beginner"
          ? "0 0 25px rgba(34,197,94,0.5),0 0 80px rgba(34,197,94,0.35)"
          : roadmap.level === "Intermediate"
          ? "0 0 25px rgba(14,165,233,0.5),0 0 80px rgba(14,165,233,0.35)"
          : roadmap.level === "Advanced"
          ? "0 0 25px rgba(249,115,22,0.5),0 0 80px rgba(249,115,22,0.35)"
          : roadmap.level === "Expert"
          ? "0 0 25px rgba(168,85,247,0.5),0 0 80px rgba(168,85,247,0.35)"
          : roadmap.level === "Beginner → Intermediate"
          ? "0 0 25px rgba(6,182,212,0.5),0 0 80px rgba(6,182,212,0.35)"
          : roadmap.level === "Intermediate → Advanced"
          ? "0 0 25px rgba(59,130,246,0.5),0 0 80px rgba(59,130,246,0.35)"
          : roadmap.level === "Advanced → Expert"
          ? "0 0 25px rgba(236,72,153,0.5),0 0 80px rgba(236,72,153,0.35)"
          : roadmap.level === "Beginner → Advanced"
          ? "0 0 25px rgba(245,158,11,0.5),0 0 80px rgba(245,158,11,0.35)"
          : "0 0 25px rgba(239,68,68,0.5),0 0 80px rgba(239,68,68,0.35)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "translateY(0) scale(1)";
      el.style.boxShadow = "none";
    }}
  >
    <div
     
      className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[90px] opacity-60 pointer-events-none"
      style={{
        background:
          roadmap.level === "Beginner"
            ? "rgba(34,197,94,0.25)"
            : roadmap.level === "Intermediate"
            ? "rgba(14,165,233,0.25)"
            : roadmap.level === "Advanced"
            ? "rgba(249,115,22,0.25)"
            : roadmap.level === "Expert"
            ? "rgba(168,85,247,0.25)"
            : roadmap.level === "Beginner → Intermediate"
            ? "rgba(6,182,212,0.25)"
            : roadmap.level === "Intermediate → Advanced"
            ? "rgba(59,130,246,0.25)"
            : roadmap.level === "Advanced → Expert"
            ? "rgba(236,72,153,0.25)"
            : roadmap.level === "Beginner → Advanced"
            ? "rgba(245,158,11,0.25)"
            : "rgba(239,68,68,0.25)",
      }}
    />

    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-white font-bold text-xl">
          {roadmap.title}
        </h3>

        <span
  className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold
  ${
    roadmap.level === "Beginner"
      ? "bg-green-500/20 text-green-400"
      : roadmap.level === "Intermediate"
      ? "bg-sky-500/20 text-sky-400"
      : roadmap.level === "Advanced"
      ? "bg-orange-500/20 text-orange-400"
      : roadmap.level === "Expert"
      ? "bg-purple-500/20 text-purple-400"
      : roadmap.level === "Beginner → Intermediate"
      ? "bg-cyan-500/20 text-cyan-400"
      : roadmap.level === "Intermediate → Advanced"
      ? "bg-blue-500/20 text-blue-400"
      : roadmap.level === "Advanced → Expert"
      ? "bg-pink-500/20 text-pink-400"
      : roadmap.level === "Beginner → Advanced"
      ? "bg-amber-500/20 text-amber-400"
      : "bg-red-500/20 text-red-400"
  }`}
>  {roadmap.level}
        </span>
      </div>

      <span className="text-white font-black text-2xl">
  {roadmapProgress[
    roadmap._id
  ] || 0}%
</span>
    </div>

    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-5">
      <div
        className={`h-full rounded-full
${
  roadmap.level === "Beginner"
    ? "bg-green-500"
    : roadmap.level === "Intermediate"
    ? "bg-sky-500"
    : roadmap.level === "Advanced"
    ? "bg-orange-500"
    : roadmap.level === "Expert"
    ? "bg-purple-500"
    : roadmap.level === "Beginner → Intermediate"
    ? "bg-cyan-500"
    : roadmap.level === "Intermediate → Advanced"
    ? "bg-blue-500"
    : roadmap.level === "Advanced → Expert"
    ? "bg-pink-500"
    : roadmap.level === "Beginner → Advanced"
    ? "bg-amber-500"
    : "bg-red-500"
}
`}
        style={{
  width: `${
    roadmapProgress[
      roadmap._id
    ] || 0
  }%`
}}
      />
    </div>

    <div className="mt-5 flex flex-col gap-3 flex-1">
      {roadmap.steps.slice(0, 4).map((step: any) => (
        <div
          key={step._id}
          className="flex items-center gap-3"
        >
          <div
  className={`
    w-4 h-4
    rounded-full
    border
    flex
    items-center
    justify-center
    text-[10px]

    ${
      (completedStepsMap as any)[
  roadmap._id
]?.includes(step._id)
        ? "bg-green-500 border-green-500 text-white"
        : "border-slate-500"
    }
  `}
>
  {
    (completedStepsMap as any)[
  roadmap._id
]?.includes(step._id)
      ? "✓"
      : ""
  }
</div>
          <span className="text-slate-300 text-sm">
            {step.title}
          </span>
        </div>
      ))}
    </div>

    <button
  className={`mt-6 font-bold text-lg self-start
  ${
    roadmap.level === "Beginner"
      ? "text-green-400"
      : roadmap.level === "Intermediate"
      ? "text-sky-400"
      : roadmap.level === "Advanced"
      ? "text-orange-400"
      : roadmap.level === "Expert"
      ? "text-purple-400"
      : roadmap.level === "Beginner → Intermediate"
      ? "text-cyan-400"
      : roadmap.level === "Intermediate → Advanced"
      ? "text-blue-400"
      : roadmap.level === "Advanced → Expert"
      ? "text-pink-400"
      : roadmap.level === "Beginner → Advanced"
      ? "text-amber-400"
      : "text-red-400"
  }`}
>
  Start Roadmap →
</button>
  </div>
))
  )}
</div>


  </div>
</section>


        {/* ── About the Author ── */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <div
              className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(12,18,40,0.95) 0%, rgba(8,12,28,0.98) 100%)",
                border: "1px solid rgba(79,70,229,0.2)",
                boxShadow: "0 0 80px rgba(79,70,229,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Background decoration */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(79,70,229,0.12), transparent 70%)" }}
              />
              <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)" }}
              />

              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar */}
                <div className="shrink-0 flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="relative">
  <div
  className="p-1 rounded-full"
  style={{
    background:
      "linear-gradient(135deg,#4f46e5,#7c3aed,#0ea5e9)",
  }}
>
  <img
    src="/avatar.png"
    alt="Manju"
    className="w-28 h-28 rounded-full object-cover"
  />
</div>

  <div
    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2"
    style={{
      background: "#22c55e",
      borderColor: "#0a0f1e",
    }}
  />
</div>
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2"
                      style={{ background: "#22c55e", borderColor: "#0a0f1e" }}
                    />
                  </div>
                  <div className="flex gap-2">
                    {[
                    {
                      Icon: Github,
                      link: "https://github.com/manjugowda-l",
                    },
                    {
                      Icon: Mail,
                      link: "mailto:manjugowda200523@gmail.com",
                    },
                    {
                      Icon: Linkedin,
                      link: "https://www.linkedin.com/in/manjugowda-l",
                    },
                  ].map(({ Icon, link }, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-white transition-all hover:bg-white/10"
                      style={{
                        border:
                          "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon size={13} />
                    </a>
                  ))}
                                    </div>


         
         
                                     <div className="text-center max-w-[180px]">
        
        <p className="text-s text-slate-500 italic leading-relaxed">
          
          "The best way to predict the future is to build it."
        </p>

        <p
          className="mt-2 text-s font-mono"
          style={{ color: "#818cf8" }}
        >
          — Alan Kay
        </p>
      </div>
                                  </div>

                

               


                {/* Bio */}
                <div className="flex flex-col gap-4 text-center md:text-left">
                  <div>
                    <h2 className="text-2xl font-black text-white">Manju L</h2>
                    <div className="flex items-center gap-2 mt-1 justify-center md:justify-start flex-wrap">
                      <div className="flex items-center gap-1.5" style={{ color: "#818cf8" }}>
                        <GraduationCap size={14} />
                        <span className="text-sm font-mono font-semibold">Software Developer • Cloud & DevOps Enthusiast</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-slate-400 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <p>
                     Hi, I'm Manju. I enjoy learning new technologies and exploring how things work behind the scenes.

                I'm interested in Linux, Cloud Computing, DevOps, Full-Stack Development, and Data Structures & Algorithms. I like learning by building projects, solving problems, and trying out new tools.</p>
                    <p>
                    This platform is where I share my notes and learning journey. My goal is to keep things simple, practical, and easy to understand so that others can learn faster and find useful resources in one place.</p>
                  </div>

                  

                  {/* CTA row */}
                  <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap mt-1">
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                       onClick={() =>
                        document
                          .getElementById("roadmaps")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          })
                      }
                    >
                      <Zap size={13} />
                      View Roadmaps
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                     onClick={() =>
                      document
                        .getElementById("categories")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        })
                    }
                    >
                      <ExternalLink size={13} />
                      Explore Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      {/* ── Footer ── */}
<footer
  style={{
    borderTop: "1px solid rgba(255,255,255,0.05)",
    background: "rgba(5,8,15,0.9)",
  }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">

      {/* Brand */}
      <div className="col-span-2 flex flex-col gap-4">

        <div className="flex items-center gap-2.5">

          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg,#4f46e5,#7c3aed)",
            }}
          >
            <BookOpen
              size={14}
              className="text-white"
            />
          </div>

          <span className="font-extrabold text-[15px] tracking-tight">

            <span className="text-white">
              Manju
            </span>

            <span
              style={{
                background:
                  "linear-gradient(90deg,#818cf8,#a78bfa)",
                WebkitBackgroundClip:
                  "text",
                WebkitTextFillColor:
                  "transparent",
              }}
            >
               {" "}Gowda L
            </span>

            <span className="ml-2 text-[10px] font-mono text-slate-500">
              v1.0
            </span>

          </span>

        </div>

        <p
          className="text-[13px] text-slate-600 leading-relaxed max-w-xs"
          style={{
            fontFamily:
              "'Inter', sans-serif",
          }}
        >
          A personal knowledge hub where I
          share practical notes, roadmaps,
          and resources on Linux, Cloud,
          DevOps, DSA, and Full-Stack
          Development — making learning
          simpler, structured, and
          accessible for everyone.
        </p>

        {/* Social */}
        <div className="flex gap-2">

          {[
            {
              Icon: Github,
              link:
                "https://github.com/manjugowda-l",
            },
            {
              Icon: Mail,
              link:
                "mailto:manjugowda200523@gmail.com",
            },
            {
              Icon: Linkedin,
              link:
                "https://linkedin.com/in/manjugowda-l",
            },
          ].map(
            ({ Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-white transition-all hover:bg-white/10"
                style={{
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Icon size={13} />
              </a>
            )
          )}

        </div>

      </div>

      {/* Topics */}

      <div className="flex flex-col gap-3">

        <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          Topics
        </p>

        <ul className="flex flex-col gap-2">

          {topics.map((topic: any) => (

            <li key={topic._id}>

              <a
                href={`#category-${topic.name}`}
                className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
                style={{
                  fontFamily:
                    "'Inter', sans-serif",
                }}
              >
                {topic.name}
              </a>

            </li>

          ))}

        </ul>

      </div>

      {/* Resources */}

      <div className="flex flex-col gap-3">

        <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          Resources
        </p>

        <ul className="flex flex-col gap-2">

          <li>
            <a
              href="#roadmaps"
              className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
            >
              Roadmaps
            </a>
          </li>

          <li>
            <a
              href="#categories"
              className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
            >
              Categories
            </a>
          </li>

          <li>
            <a
              href="#categories"
              className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
            >
              Latest Notes
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={() =>
                document
                  .querySelector("input")
                  ?.focus()
              }
              className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
            >
              Search Notes
            </a>
          </li>

        </ul>

      </div>

      {/* Connect */}

      <div className="flex flex-col gap-3">

        <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          Connect
        </p>

        <ul className="flex flex-col gap-2">

          <li>
            <a
              href="#about"
              className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="https://github.com/manjugowda-l"
              target="_blank"
              className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
            >
              GitHub
            </a>
          </li>

          <li>
            <a
              href="https://linkedin.com/in/manjugowda-l"
              target="_blank"
              className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
            >
              LinkedIn
            </a>
          </li>

          <li>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=manjugowda200523@gmail.com"
             
              className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
            >
              Email
            </a>
          </li>

        </ul>

      </div>

    </div>

    {/* Bottom */}

    <div
      className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-700"
      style={{
        borderTop:
          "1px solid rgba(255,255,255,0.05)",
        fontFamily:
          "'Inter', sans-serif",
      }}
    >

      <span
  className="text-slate-500"
  style={{ fontFamily: "'Inter', sans-serif" }}
>
  <span
    style={{
      background: "linear-gradient(90deg,#818cf8,#a78bfa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: 700,
    }}
  >
    © 2026 Manju Gowda L
  </span>{" "}
  Open-source learning. Free forever.
</span>

      <span className="font-mono flex items-center gap-1.5">

        <Cpu
          size={11}
          className="text-indigo-600"
        />

        Designed & Developed by
        <span className="text-slate-400">
          Manju L
        </span>

      </span>

    </div>

  </div>
</footer>
    </div>
  );
}
