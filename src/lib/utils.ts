import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get first 2 initials of farm name
export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

// Format date as DD MMM YYYY
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

// Format currency as GBP with comma separators (£12,345)
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format number with en-GB commas (1,234)
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-GB").format(num);
};

// Format percentage with 0 decimal places
export const formatPercentage = (value: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value / 100);
};

export const getApiUrl = (path: string) => {
  return `${process.env.NEXT_APP_URL}api/${path}`;
};