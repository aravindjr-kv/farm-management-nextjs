import { delay } from "@/lib/utils";
import {
  getCropsByFarmId,
  getFarmById,
  getFarmDetailMetrics,
  getFarmMetrics,
  getFarms,
} from "@/mock";

export async function fetchFarms() {
  await delay(5000);
  return getFarms();
}

export async function fetchFarmById(id: string) {
  await delay(3000);
  return getFarmById(id);
}

export async function fetchDashboardMetrics() {
  await delay(3000);
  return getFarmMetrics();
}

export function fetchFarmDetailMetrics(id: string) {
  return getFarmDetailMetrics(id);
}

export async function fetchCropsByFarmId(id: string) {
  await delay(3000);
  return getCropsByFarmId(id);
}
