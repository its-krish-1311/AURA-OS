"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Custom hook to sync state with localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Data Types
export interface CareerJob {
  id: string;
  company: string;
  role: string;
  status: string; // Wishlist, Applied, Interview, Offer, Rejected
  date: string;
  salary: string;
  location: string;
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
  type?: string;
  dueDate?: string;
}

export interface FinanceTransaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface FinanceAsset {
  id: string;
  ticker: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
}

export interface HealthWorkout {
  id: string;
  title: string;
  duration: number; // minutes
  calories: number;
  type: "Strength" | "Cardio" | "Yoga" | "HIIT";
  date: string;
}

export interface HealthMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  date: string;
}

export interface TravelItineraryItem {
  id: string;
  title: string;
  type: "Flight" | "Hotel" | "Activity" | "Restaurant";
  date: string;
  time: string;
  location: string;
  details: string;
}

export interface TravelPackingItem {
  id: string;
  name: string;
  category: "Clothing" | "Electronics" | "Documents" | "Toiletries";
  packed: boolean;
}

export interface DevTask {
  id: string;
  title: string;
  status: "Backlog" | "In Progress" | "In Review" | "Done";
  priority: "High" | "Medium" | "Low";
  type: "Feature" | "Bug" | "Tech Debt";
}

export interface DevSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
}

export interface DevApi {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  status: number;
}

export interface BizClient {
  id: string;
  name: string;
  company: string;
  status: "Lead" | "Active" | "Completed";
  value: number;
  email: string;
}

export interface BizInvoice {
  id: string;
  clientId: string;
  amount: number;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  dueDate: string;
  number: string;
}

export interface BizMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  client: string;
  type: "Pitch" | "Sync" | "Review";
}

export interface FashionItem {
  id: string;
  name: string;
  category: "Top" | "Bottom" | "Outerwear" | "Shoes" | "Accessory";
  brand: string;
  color: string;
  image: string;
}

export interface FashionOutfit {
  id: string;
  name: string;
  season: "Spring" | "Summer" | "Fall" | "Winter";
  style: "Casual" | "Formal" | "Streetwear" | "Athleisure";
  itemIds: string[];
}

export interface GoalsVisionItem {
  id: string;
  title: string;
  category: "Career" | "Lifestyle" | "Health" | "Wealth";
  imageUrl: string;
}

export interface GoalsOKR {
  id: string;
  objective: string;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  progress: number; // 0-100
  keyResults: { id: string, text: string, done: boolean }[];
}

export interface GoalsHabit {
  id: string;
  name: string;
  streak: number;
  lastCompletedDate: string; // YYYY-MM-DD
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  totalPages: number;
  pagesRead: number;
  status: "Reading" | "Completed" | "Want to Read";
  rating: number; // 0-5
}

export interface LibraryMovie {
  id: string;
  title: string;
  type: "Movie" | "TV Show";
  posterUrl: string;
  status: "Watching" | "Completed" | "Plan to Watch";
  rating: number; // 0-5
}

export interface LibraryPodcast {
  id: string;
  title: string;
  host: string;
  coverUrl: string;
  episodesListened: number;
}

export interface AutoWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  active: boolean;
  lastRun: string; // Time/Date string
}

export interface AutoIntegration {
  id: string;
  name: string;
  icon: string; // lucide icon string name or url
  status: "Connected" | "Disconnected" | "Error";
  lastSync: string;
}

export interface AutoLog {
  id: string;
  workflowId: string;
  workflowName: string;
  status: "Success" | "Failed";
  timestamp: string;
  details: string;
}

// Initial Data
const initialJobs: CareerJob[] = [
  { id: "1", company: "Google", role: "Frontend Engineer", status: "Interview", date: "Oct 22", salary: "$150k - $180k", location: "Remote" },
  { id: "2", company: "Stripe", role: "Full Stack Developer", status: "Applied", date: "Oct 15", salary: "$160k - $200k", location: "San Francisco" },
  { id: "3", company: "Vercel", role: "UI/UX Designer", status: "Interview", date: "Oct 18", salary: "$140k", location: "Remote" },
  { id: "4", company: "OpenAI", role: "AI Engineer", status: "Wishlist", date: "Oct 10", salary: "Competitive", location: "San Francisco" },
  { id: "5", company: "Meta", role: "Product Manager", status: "Offer", date: "Oct 05", salary: "$180k", location: "Menlo Park" },
];

const initialStudyTasks: Task[] = [
  { id: "s1", title: "Read Chapter 4 of Physics", done: true },
  { id: "s2", title: "Complete ML Dataset Prep", done: false },
  { id: "s3", title: "Review Flashcards (50 items)", done: false },
];

const initialCareerTasks: Task[] = [
  { id: "c1", title: "Update LinkedIn Profile", done: true },
  { id: "c2", title: "Send Thank You email to Vercel", done: false },
  { id: "c3", title: "Complete System Design practice", done: false },
];

const initialTransactions: FinanceTransaction[] = [
  { id: "t1", type: "income", amount: 8500, category: "Salary", date: "2026-10-01", description: "Vercel Direct Deposit" },
  { id: "t2", type: "expense", amount: 2400, category: "Housing", date: "2026-10-02", description: "SF Apartment Rent" },
  { id: "t3", type: "expense", amount: 120, category: "Software", date: "2026-10-05", description: "GitHub Copilot + Vercel Pro" },
];

const initialAssets: FinanceAsset[] = [
  { id: "a1", ticker: "AAPL", name: "Apple Inc.", shares: 50, avgPrice: 150, currentPrice: 185 },
  { id: "a2", ticker: "MSFT", name: "Microsoft Corp.", shares: 30, avgPrice: 280, currentPrice: 340 },
  { id: "a3", ticker: "BTC", name: "Bitcoin", shares: 0.5, avgPrice: 35000, currentPrice: 62000 },
];

const initialWorkouts: HealthWorkout[] = [
  { id: "w1", title: "Upper Body Power", duration: 45, calories: 320, type: "Strength", date: "2026-10-20" },
  { id: "w2", title: "Morning Run", duration: 30, calories: 400, type: "Cardio", date: "2026-10-19" },
];

const initialMeals: HealthMeal[] = [
  { id: "m1", name: "Oatmeal & Protein Shake", calories: 450, protein: 35, carbs: 50, fat: 10, type: "Breakfast", date: "2026-10-20" },
  { id: "m2", name: "Grilled Chicken Salad", calories: 380, protein: 42, carbs: 15, fat: 18, type: "Lunch", date: "2026-10-20" },
];

const initialItinerary: TravelItineraryItem[] = [
  { id: "tr1", title: "Flight to Tokyo (JL 001)", type: "Flight", date: "2026-11-15", time: "10:30 AM", location: "SFO Terminal 2", details: "Seat 12A, Non-stop" },
  { id: "tr2", title: "Check-in at Aman Tokyo", type: "Hotel", date: "2026-11-16", time: "02:00 PM", location: "Otemachi Tower", details: "Confirmation #88392" },
];

const initialPacking: TravelPackingItem[] = [
  { id: "p1", name: "Passport", category: "Documents", packed: true },
  { id: "p2", name: "Universal Adapter", category: "Electronics", packed: false },
  { id: "p3", name: "Winter Jacket", category: "Clothing", packed: false },
];

const initialDevTasks: DevTask[] = [
  { id: "dt1", title: "Implement Global Search", status: "In Progress", priority: "High", type: "Feature" },
  { id: "dt2", title: "Fix memory leak in Context", status: "Backlog", priority: "High", type: "Bug" },
  { id: "dt3", title: "Refactor API routes", status: "Done", priority: "Medium", type: "Tech Debt" },
];

const initialDevSnippets: DevSnippet[] = [
  { id: "ds1", title: "useLocalStorage Hook", language: "TypeScript", description: "Custom hook for persisting state to localStorage", code: `function useLocalStorage<T>(key: string, initialValue: T) {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    if (typeof window === "undefined") return initialValue;\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      console.warn(error);\n      return initialValue;\n    }\n  });\n  // ...\n}` },
];

const initialDevApis: DevApi[] = [
  { id: "da1", name: "Fetch User Profile", method: "GET", endpoint: "https://api.auraos.dev/v1/users/me", status: 200 },
];

const initialBizClients: BizClient[] = [
  { id: "bc1", name: "Sarah Jenkins", company: "Acme Corp", status: "Active", value: 12000, email: "sarah@acme.com" },
  { id: "bc2", name: "Michael Chen", company: "TechFlow", status: "Lead", value: 45000, email: "michael@techflow.io" },
];

const initialBizInvoices: BizInvoice[] = [
  { id: "bi1", clientId: "bc1", amount: 4000, status: "Paid", dueDate: "2026-10-01", number: "INV-2026-001" },
  { id: "bi2", clientId: "bc1", amount: 4000, status: "Sent", dueDate: "2026-11-01", number: "INV-2026-002" },
  { id: "bi3", clientId: "bc2", amount: 15000, status: "Draft", dueDate: "2026-11-15", number: "INV-2026-003" },
];

const initialBizMeetings: BizMeeting[] = [
  { id: "bm1", title: "Project Kickoff", date: "2026-10-25", time: "10:00 AM", client: "Acme Corp", type: "Sync" },
  { id: "bm2", title: "Q4 Proposal Review", date: "2026-10-26", time: "02:00 PM", client: "TechFlow", type: "Pitch" },
];

const initialFashionItems: FashionItem[] = [
  { id: "fi1", name: "Oversized Vintage Tee", category: "Top", brand: "Urban", color: "Faded Black", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: "fi2", name: "Wide Leg Cargo Pants", category: "Bottom", brand: "Aura", color: "Olive", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: "fi3", name: "Chunky Sneakers", category: "Shoes", brand: "Nike", color: "White/Grey", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=200&h=200" },
];

const initialFashionOutfits: FashionOutfit[] = [
  { id: "fo1", name: "City Explorer", season: "Fall", style: "Streetwear", itemIds: ["fi1", "fi2", "fi3"] },
];

const initialGoalsVision: GoalsVisionItem[] = [
  { id: "gv1", title: "Dream Workspace", category: "Career", imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400" },
  { id: "gv2", title: "Porsche 911 GT3", category: "Lifestyle", imageUrl: "https://images.unsplash.com/photo-1503376712351-561b36585145?auto=format&fit=crop&q=80&w=400" },
];

const initialGoalsOkrs: GoalsOKR[] = [
  { 
    id: "okr1", 
    objective: "Achieve Peak Physical Fitness", 
    quarter: "Q1", 
    progress: 33, 
    keyResults: [
      { id: "kr1", text: "Hit 225lbs Bench Press", done: false },
      { id: "kr2", text: "Run 5K under 25 mins", done: true },
      { id: "kr3", text: "Track macros 6 days/week", done: false }
    ] 
  }
];

const initialGoalsHabits: GoalsHabit[] = [
  { id: "gh1", name: "Read 10 pages", streak: 12, lastCompletedDate: new Date().toISOString().split('T')[0] },
  { id: "gh2", name: "Meditate 10 mins", streak: 4, lastCompletedDate: "2026-07-19" },
];

const initialLibraryBooks: LibraryBook[] = [
  { id: "lb1", title: "Atomic Habits", author: "James Clear", coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400", totalPages: 320, pagesRead: 145, status: "Reading", rating: 0 },
  { id: "lb2", title: "Steve Jobs", author: "Walter Isaacson", coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400", totalPages: 656, pagesRead: 656, status: "Completed", rating: 5 },
];

const initialLibraryMovies: LibraryMovie[] = [
  { id: "lm1", title: "Interstellar", type: "Movie", posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400", status: "Completed", rating: 5 },
  { id: "lm2", title: "Succession", type: "TV Show", posterUrl: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=400", status: "Watching", rating: 0 },
];

const initialLibraryPodcasts: LibraryPodcast[] = [
  { id: "lp1", title: "Lex Fridman Podcast", host: "Lex Fridman", coverUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400", episodesListened: 42 },
];

const initialAutoWorkflows: AutoWorkflow[] = [
  { id: "aw1", name: "Morning Briefing", description: "Fetch weather and calendar events", trigger: "08:00 AM Daily", action: "Send Email", active: true, lastRun: "Today, 08:00 AM" },
  { id: "aw2", name: "Backup Data", description: "Sync local OS data to Cloud", trigger: "On App Exit", action: "Cloud Sync", active: false, lastRun: "Yesterday, 11:45 PM" },
];

const initialAutoIntegrations: AutoIntegration[] = [
  { id: "ai1", name: "Google Calendar", icon: "Calendar", status: "Connected", lastSync: "2 mins ago" },
  { id: "ai2", name: "Stripe", icon: "CreditCard", status: "Disconnected", lastSync: "N/A" },
];

const initialAutoLogs: AutoLog[] = [
  { id: "al1", workflowId: "aw1", workflowName: "Morning Briefing", status: "Success", timestamp: "Today, 08:00 AM", details: "Fetched 3 events, 1 weather update. Email sent." },
];

// Context Interface
interface OSDataContextType {
  careerJobs: CareerJob[];
  addCareerJob: (job: CareerJob) => void;
  updateJobStatus: (jobId: string, newStatus: string) => void;
  deleteCareerJob: (jobId: string) => void;

  studyTasks: Task[];
  addStudyTask: (task: Task) => void;
  toggleStudyTask: (taskId: string) => void;

  careerTasks: Task[];
  addCareerTask: (task: Task) => void;
  toggleCareerTask: (taskId: string) => void;

  financeTransactions: FinanceTransaction[];
  addTransaction: (tx: FinanceTransaction) => void;
  deleteTransaction: (id: string) => void;

  financeAssets: FinanceAsset[];
  addAsset: (asset: FinanceAsset) => void;

  healthWorkouts: HealthWorkout[];
  addWorkout: (workout: HealthWorkout) => void;

  healthMeals: HealthMeal[];
  addMeal: (meal: HealthMeal) => void;

  travelItinerary: TravelItineraryItem[];
  addItineraryItem: (item: TravelItineraryItem) => void;

  travelPacking: TravelPackingItem[];
  addPackingItem: (item: TravelPackingItem) => void;
  togglePackingItem: (id: string) => void;

  devTasks: DevTask[];
  addDevTask: (task: DevTask) => void;
  updateDevTaskStatus: (taskId: string, newStatus: string) => void;

  devSnippets: DevSnippet[];
  addDevSnippet: (snippet: DevSnippet) => void;

  devApis: DevApi[];
  addDevApi: (api: DevApi) => void;

  bizClients: BizClient[];
  addBizClient: (client: BizClient) => void;
  updateBizClientStatus: (id: string, status: string) => void;

  bizInvoices: BizInvoice[];
  addBizInvoice: (invoice: BizInvoice) => void;
  updateBizInvoiceStatus: (id: string, status: string) => void;

  bizMeetings: BizMeeting[];
  addBizMeeting: (meeting: BizMeeting) => void;

  fashionWardrobe: FashionItem[];
  addFashionItem: (item: FashionItem) => void;
  deleteFashionItem: (id: string) => void;

  fashionOutfits: FashionOutfit[];
  addFashionOutfit: (outfit: FashionOutfit) => void;
  deleteFashionOutfit: (id: string) => void;

  goalsVision: GoalsVisionItem[];
  addGoalsVision: (item: GoalsVisionItem) => void;
  deleteGoalsVision: (id: string) => void;

  goalsOkrs: GoalsOKR[];
  addGoalsOkr: (okr: GoalsOKR) => void;
  updateGoalsOkrProgress: (id: string, progress: number) => void;
  toggleGoalsKr: (okrId: string, krId: string) => void;

  goalsHabits: GoalsHabit[];
  addGoalsHabit: (habit: GoalsHabit) => void;
  completeGoalsHabit: (id: string) => void;

  libraryBooks: LibraryBook[];
  addLibraryBook: (book: LibraryBook) => void;
  updateLibraryBookProgress: (id: string, pagesRead: number) => void;

  libraryMovies: LibraryMovie[];
  addLibraryMovie: (movie: LibraryMovie) => void;
  updateLibraryMovieStatus: (id: string, status: string) => void;

  libraryPodcasts: LibraryPodcast[];
  addLibraryPodcast: (podcast: LibraryPodcast) => void;

  autoWorkflows: AutoWorkflow[];
  addAutoWorkflow: (workflow: AutoWorkflow) => void;
  toggleAutoWorkflow: (id: string) => void;

  autoIntegrations: AutoIntegration[];
  connectAutoIntegration: (id: string) => void;

  autoLogs: AutoLog[];
  addAutoLog: (log: AutoLog) => void;
}

const OSDataContext = createContext<OSDataContextType | undefined>(undefined);

export function OSDataProvider({ children }: { children: React.ReactNode }) {
  const [careerJobs, setCareerJobs] = useLocalStorage<CareerJob[]>("aura_career_jobs", initialJobs);
  const [studyTasks, setStudyTasks] = useLocalStorage<Task[]>("aura_study_tasks", initialStudyTasks);
  const [careerTasks, setCareerTasks] = useLocalStorage<Task[]>("aura_career_tasks", initialCareerTasks);
  const [financeTransactions, setFinanceTransactions] = useLocalStorage<FinanceTransaction[]>("aura_finance_transactions", initialTransactions);
  const [financeAssets, setFinanceAssets] = useLocalStorage<FinanceAsset[]>("aura_finance_assets", initialAssets);
  const [healthWorkouts, setHealthWorkouts] = useLocalStorage<HealthWorkout[]>("aura_health_workouts", initialWorkouts);
  const [healthMeals, setHealthMeals] = useLocalStorage<HealthMeal[]>("aura_health_meals", initialMeals);
  const [travelItinerary, setTravelItinerary] = useLocalStorage<TravelItineraryItem[]>("aura_travel_itinerary", initialItinerary);
  const [travelPacking, setTravelPacking] = useLocalStorage<TravelPackingItem[]>("aura_travel_packing", initialPacking);

  const [devTasks, setDevTasks] = useLocalStorage<DevTask[]>("aura_dev_tasks", initialDevTasks);
  const [devSnippets, setDevSnippets] = useLocalStorage<DevSnippet[]>("aura_dev_snippets", initialDevSnippets);
  const [devApis, setDevApis] = useLocalStorage<DevApi[]>("aura_dev_apis", initialDevApis);

  const [bizClients, setBizClients] = useLocalStorage<BizClient[]>("aura_biz_clients", initialBizClients);
  const [bizInvoices, setBizInvoices] = useLocalStorage<BizInvoice[]>("aura_biz_invoices", initialBizInvoices);
  const [bizMeetings, setBizMeetings] = useLocalStorage<BizMeeting[]>("aura_biz_meetings", initialBizMeetings);

  const [fashionWardrobe, setFashionWardrobe] = useLocalStorage<FashionItem[]>("aura_fashion_wardrobe", initialFashionItems);
  const [fashionOutfits, setFashionOutfits] = useLocalStorage<FashionOutfit[]>("aura_fashion_outfits", initialFashionOutfits);

  const addCareerJob = (job: CareerJob) => setCareerJobs(prev => [...prev, job]);
  const updateJobStatus = (jobId: string, newStatus: string) => {
    setCareerJobs(prev => prev.map(job => job.id === jobId ? { ...job, status: newStatus } : job));
  };
  const deleteCareerJob = (jobId: string) => setCareerJobs(prev => prev.filter(job => job.id !== jobId));

  const addStudyTask = (task: Task) => setStudyTasks(prev => [...prev, task]);
  const toggleStudyTask = (taskId: string) => {
    setStudyTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const addCareerTask = (task: Task) => setCareerTasks(prev => [...prev, task]);
  const toggleCareerTask = (taskId: string) => {
    setCareerTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const addTransaction = (tx: FinanceTransaction) => setFinanceTransactions(prev => [tx, ...prev]);
  const deleteTransaction = (id: string) => setFinanceTransactions(prev => prev.filter(t => t.id !== id));
  
  const addAsset = (asset: FinanceAsset) => setFinanceAssets(prev => [...prev, asset]);

  const addWorkout = (workout: HealthWorkout) => setHealthWorkouts(prev => [workout, ...prev]);
  const addMeal = (meal: HealthMeal) => setHealthMeals(prev => [meal, ...prev]);

  const addItineraryItem = (item: TravelItineraryItem) => setTravelItinerary(prev => [...prev, item].sort((a,b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime()));
  
  const addPackingItem = (item: TravelPackingItem) => setTravelPacking(prev => [...prev, item]);
  const togglePackingItem = (id: string) => setTravelPacking(prev => prev.map(i => i.id === id ? { ...i, packed: !i.packed } : i));

  const addDevTask = (task: DevTask) => setDevTasks(prev => [...prev, task]);
  const updateDevTaskStatus = (taskId: string, newStatus: string) => {
    setDevTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus as any } : t));
  };

  const addDevSnippet = (snippet: DevSnippet) => setDevSnippets(prev => [...prev, snippet]);
  const addDevApi = (api: DevApi) => setDevApis(prev => [...prev, api]);

  const addBizClient = (client: BizClient) => setBizClients(prev => [...prev, client]);
  const updateBizClientStatus = (id: string, status: string) => setBizClients(prev => prev.map(c => c.id === id ? { ...c, status: status as any } : c));
  
  const addBizInvoice = (invoice: BizInvoice) => setBizInvoices(prev => [...prev, invoice]);
  const updateBizInvoiceStatus = (id: string, status: string) => setBizInvoices(prev => prev.map(i => i.id === id ? { ...i, status: status as any } : i));

  const addBizMeeting = (meeting: BizMeeting) => setBizMeetings(prev => [...prev, meeting].sort((a,b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime()));

  const addFashionItem = (item: FashionItem) => setFashionWardrobe(prev => [...prev, item]);
  const deleteFashionItem = (id: string) => setFashionWardrobe(prev => prev.filter(i => i.id !== id));

  const addFashionOutfit = (outfit: FashionOutfit) => setFashionOutfits(prev => [...prev, outfit]);
  const deleteFashionOutfit = (id: string) => setFashionOutfits(prev => prev.filter(o => o.id !== id));

  // Goals OS State
  const [goalsVision, setGoalsVision] = useLocalStorage<GoalsVisionItem[]>("aura_goals_vision", initialGoalsVision);
  const [goalsOkrs, setGoalsOkrs] = useLocalStorage<GoalsOKR[]>("aura_goals_okrs", initialGoalsOkrs);
  const [goalsHabits, setGoalsHabits] = useLocalStorage<GoalsHabit[]>("aura_goals_habits", initialGoalsHabits);

  const addGoalsVision = (item: GoalsVisionItem) => setGoalsVision(prev => [...prev, item]);
  const deleteGoalsVision = (id: string) => setGoalsVision(prev => prev.filter(i => i.id !== id));
  
  const addGoalsOkr = (okr: GoalsOKR) => setGoalsOkrs(prev => [...prev, okr]);
  const updateGoalsOkrProgress = (id: string, progress: number) => setGoalsOkrs(prev => prev.map(o => o.id === id ? { ...o, progress } : o));
  const toggleGoalsKr = (okrId: string, krId: string) => {
    setGoalsOkrs(prev => prev.map(okr => {
      if (okr.id === okrId) {
        return {
          ...okr,
          keyResults: okr.keyResults.map(kr => kr.id === krId ? { ...kr, done: !kr.done } : kr)
        };
      }
      return okr;
    }));
  };

  const addGoalsHabit = (habit: GoalsHabit) => setGoalsHabits(prev => [...prev, habit]);
  const completeGoalsHabit = (id: string) => {
    setGoalsHabits(prev => prev.map(h => {
      if (h.id === id) {
        const today = new Date().toISOString().split('T')[0];
        if (h.lastCompletedDate !== today) {
          return { ...h, streak: h.streak + 1, lastCompletedDate: today };
        }
      }
      return h;
    }));
  };

  // Library OS State
  const [libraryBooks, setLibraryBooks] = useLocalStorage<LibraryBook[]>("aura_library_books", initialLibraryBooks);
  const [libraryMovies, setLibraryMovies] = useLocalStorage<LibraryMovie[]>("aura_library_movies", initialLibraryMovies);
  const [libraryPodcasts, setLibraryPodcasts] = useLocalStorage<LibraryPodcast[]>("aura_library_podcasts", initialLibraryPodcasts);

  const addLibraryBook = (book: LibraryBook) => setLibraryBooks(prev => [...prev, book]);
  const updateLibraryBookProgress = (id: string, pagesRead: number) => {
    setLibraryBooks(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, pagesRead, status: pagesRead >= b.totalPages ? "Completed" : "Reading" };
      }
      return b;
    }));
  };

  const addLibraryMovie = (movie: LibraryMovie) => setLibraryMovies(prev => [...prev, movie]);
  const updateLibraryMovieStatus = (id: string, status: string) => setLibraryMovies(prev => prev.map(m => m.id === id ? { ...m, status: status as any } : m));
  
  const addLibraryPodcast = (podcast: LibraryPodcast) => setLibraryPodcasts(prev => [...prev, podcast]);

  // Automation OS State
  const [autoWorkflows, setAutoWorkflows] = useLocalStorage<AutoWorkflow[]>("aura_auto_workflows", initialAutoWorkflows);
  const [autoIntegrations, setAutoIntegrations] = useLocalStorage<AutoIntegration[]>("aura_auto_integrations", initialAutoIntegrations);
  const [autoLogs, setAutoLogs] = useLocalStorage<AutoLog[]>("aura_auto_logs", initialAutoLogs);

  const addAutoWorkflow = (workflow: AutoWorkflow) => setAutoWorkflows(prev => [...prev, workflow]);
  const toggleAutoWorkflow = (id: string) => setAutoWorkflows(prev => prev.map(w => w.id === id ? { ...w, active: !w.active } : w));
  
  const connectAutoIntegration = (id: string) => setAutoIntegrations(prev => prev.map(i => i.id === id ? { ...i, status: "Connected", lastSync: "Just now" } : i));
  const addAutoLog = (log: AutoLog) => setAutoLogs(prev => [log, ...prev]);

  return (
    <OSDataContext.Provider value={{
      careerJobs, addCareerJob, updateJobStatus, deleteCareerJob,
      studyTasks, addStudyTask, toggleStudyTask,
      careerTasks, addCareerTask, toggleCareerTask,
      financeTransactions, addTransaction, deleteTransaction,
      financeAssets, addAsset,
      healthWorkouts, addWorkout,
      healthMeals, addMeal,
      travelItinerary, addItineraryItem,
      travelPacking, addPackingItem, togglePackingItem,
      devTasks, addDevTask, updateDevTaskStatus,
      devSnippets, addDevSnippet,
      devApis, addDevApi,
      bizClients, addBizClient, updateBizClientStatus,
      bizInvoices, addBizInvoice, updateBizInvoiceStatus,
      bizMeetings, addBizMeeting,
      fashionWardrobe, addFashionItem, deleteFashionItem,
      fashionOutfits, addFashionOutfit, deleteFashionOutfit,
      goalsVision, addGoalsVision, deleteGoalsVision,
      goalsOkrs, addGoalsOkr, updateGoalsOkrProgress, toggleGoalsKr,
      goalsHabits, addGoalsHabit, completeGoalsHabit,
      libraryBooks, addLibraryBook, updateLibraryBookProgress,
      libraryMovies, addLibraryMovie, updateLibraryMovieStatus,
      libraryPodcasts, addLibraryPodcast,
      autoWorkflows, addAutoWorkflow, toggleAutoWorkflow,
      autoIntegrations, connectAutoIntegration,
      autoLogs, addAutoLog
    }}>
      {children}
    </OSDataContext.Provider>
  );
}

export function useOSData() {
  const context = useContext(OSDataContext);
  if (context === undefined) {
    throw new Error("useOSData must be used within an OSDataProvider");
  }
  return context;
}
