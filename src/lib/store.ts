import { featuredProjects, type Project } from "@/data/projects";
import { certifications, innovations, type Certification, type Innovation } from "@/data/milestones";
import { siteConfig } from "@/data/site";

const KEYS = {
  projects: "rg_projects",
  certifications: "rg_certifications",
  innovations: "rg_innovations",
  siteConfig: "rg_siteconfig",
} as const;

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── Projects ───────────────────────────────────────────────────────────────

export function getProjects(): Project[] {
  return readStorage<Project[]>(KEYS.projects, featuredProjects);
}

export function saveProjects(projects: Project[]): void {
  writeStorage(KEYS.projects, projects);
}

// ─── Certifications ──────────────────────────────────────────────────────────

export function getCertifications(): Certification[] {
  return readStorage<Certification[]>(KEYS.certifications, certifications);
}

export function saveCertifications(certs: Certification[]): void {
  writeStorage(KEYS.certifications, certs);
}

// ─── Innovations ─────────────────────────────────────────────────────────────

export function getInnovations(): Innovation[] {
  return readStorage<Innovation[]>(KEYS.innovations, innovations);
}

export function saveInnovations(invs: Innovation[]): void {
  writeStorage(KEYS.innovations, invs);
}

// ─── Site Config ─────────────────────────────────────────────────────────────

export type SiteConfigType = typeof siteConfig;

export function getSiteConfig(): SiteConfigType {
  return readStorage<SiteConfigType>(KEYS.siteConfig, siteConfig);
}

export function saveSiteConfig(config: SiteConfigType): void {
  writeStorage(KEYS.siteConfig, config);
}

// ─── Utilities ───────────────────────────────────────────────────────────────

export function resetAllToDefaults(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
