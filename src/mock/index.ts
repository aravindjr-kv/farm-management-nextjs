// Farm Management Mock Data
export interface Farm {
  id: string;
  farm_name: string;
  location: string;
  owner: string;
  total_acreage: number;
  active_crops: string[];
  annual_yield: number; // in kg
  established_date: string;
  certifications: string[];
  total_revenue: number; // in USD
}

export interface FarmWithTopCrop extends Farm {
  topCrop: Crop;
}

export interface Crop {
  id: string;
  farm_id: string;
  crop_name: string;
  season: "Spring" | "Summer" | "Fall" | "Winter";
  area_planted: number; // in acres
  expected_yield: number; // in kg
  actual_yield: number; // in kg
  price_per_kg: number; // in USD
  status: "harvested" | "in progress" | "planted" | "germinating";
  planting_date: string;
  harvest_date?: string;
}

export interface CropsByFarmIdResponse {
  crops: Crop[];
  topCrop: Crop;
}

export interface FarmMetrics {
  totalFarms: number;
  totalAcreage: number;
  totalAnnualYield: number;
  averageYieldPerAcre: number;
}

export interface FarmDetailMetrics {
  annualYield: number;
  topCrop: string;
  totalRevenue: number;
  averageYieldPerAcre: number;
}

// Mock Farms Data
export const mockFarms: Farm[] = [
  {
    id: "farm-001",
    farm_name: "Green Valley Organic Farm",
    location: "Salinas Valley, California",
    owner: "Maria Rodriguez",
    total_acreage: 150,
    active_crops: ["Tomatoes", "Lettuce", "Carrots", "Spinach"],
    annual_yield: 45000,
    established_date: "2015-03-15",
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Fair Trade"],
    total_revenue: 180000,
  },
  {
    id: "farm-002",
    farm_name: "Sunrise Agriculture",
    location: "Central Valley, California",
    owner: "John Chen",
    total_acreage: 320,
    active_crops: ["Wheat", "Corn", "Soybeans", "Alfalfa"],
    annual_yield: 125000,
    established_date: "2008-07-22",
    certifications: ["USDA Organic", "California Certified Organic Farmers"],
    total_revenue: 320000,
  },
  {
    id: "farm-003",
    farm_name: "Mountain View Ranch",
    location: "Boulder, Colorado",
    owner: "Sarah Thompson",
    total_acreage: 85,
    active_crops: ["Potatoes", "Onions", "Garlic", "Herbs"],
    annual_yield: 28000,
    established_date: "2019-05-10",
    certifications: ["USDA Organic", "Rocky Mountain Organic"],
    total_revenue: 95000,
  },
  {
    id: "farm-004",
    farm_name: "Riverside Produce Co.",
    location: "Yakima Valley, Washington",
    owner: "Ahmed Hassan",
    total_acreage: 200,
    active_crops: ["Apples", "Cherries", "Pears", "Peaches"],
    annual_yield: 75000,
    established_date: "2012-09-03",
    certifications: ["USDA Organic", "Washington State Organic"],
    total_revenue: 250000,
  },
  {
    id: "farm-005",
    farm_name: "Prairie Winds Farm",
    location: "Des Moines, Iowa",
    owner: "Robert Johnson",
    total_acreage: 500,
    active_crops: ["Corn", "Soybeans", "Oats", "Barley"],
    annual_yield: 200000,
    established_date: "2005-04-12",
    certifications: ["USDA Organic", "Iowa Organic Association"],
    total_revenue: 450000,
  },
  {
    id: "farm-006",
    farm_name: "Coastal Gardens",
    location: "Monterey Bay, California",
    owner: "Elena Martinez",
    total_acreage: 75,
    active_crops: ["Strawberries", "Artichokes", "Broccoli", "Cauliflower"],
    annual_yield: 22000,
    established_date: "2020-02-28",
    certifications: ["USDA Organic", "California Certified Organic Farmers"],
    total_revenue: 85000,
  },
  {
    id: "farm-007",
    farm_name: "Highland Harvest",
    location: "Asheville, North Carolina",
    owner: "David Wilson",
    total_acreage: 120,
    active_crops: [
      "Blueberries",
      "Blackberries",
      "Raspberries",
      "Elderberries",
    ],
    annual_yield: 18000,
    established_date: "2017-06-15",
    certifications: ["USDA Organic", "Carolina Farm Stewardship Association"],
    total_revenue: 120000,
  },
  {
    id: "farm-008",
    farm_name: "Desert Bloom Farm",
    location: "Phoenix, Arizona",
    owner: "Lisa Park",
    total_acreage: 90,
    active_crops: ["Citrus", "Dates", "Pomegranates", "Figs"],
    annual_yield: 35000,
    established_date: "2014-11-08",
    certifications: ["USDA Organic", "Arizona Organic"],
    total_revenue: 140000,
  },
];

// Mock Crops Data
export const mockCrops: Crop[] = [
  // Green Valley Organic Farm crops
  {
    id: "crop-001",
    farm_id: "farm-001",
    crop_name: "Tomatoes",
    season: "Summer",
    area_planted: 25,
    expected_yield: 15000,
    actual_yield: 16200,
    price_per_kg: 4.5,
    status: "harvested",
    planting_date: "2024-03-15",
    harvest_date: "2024-08-20",
  },
  {
    id: "crop-002",
    farm_id: "farm-001",
    crop_name: "Lettuce",
    season: "Spring",
    area_planted: 15,
    expected_yield: 8000,
    actual_yield: 8500,
    price_per_kg: 3.2,
    status: "harvested",
    planting_date: "2024-02-10",
    harvest_date: "2024-05-15",
  },
  {
    id: "crop-003",
    farm_id: "farm-001",
    crop_name: "Carrots",
    season: "Fall",
    area_planted: 20,
    expected_yield: 12000,
    actual_yield: 0,
    price_per_kg: 2.8,
    status: "in progress",
    planting_date: "2024-08-01",
  },
  {
    id: "crop-004",
    farm_id: "farm-001",
    crop_name: "Spinach",
    season: "Winter",
    area_planted: 10,
    expected_yield: 5000,
    actual_yield: 0,
    price_per_kg: 4.0,
    status: "planted",
    planting_date: "2024-10-15",
  },

  // Sunrise Agriculture crops
  {
    id: "crop-005",
    farm_id: "farm-002",
    crop_name: "Wheat",
    season: "Spring",
    area_planted: 100,
    expected_yield: 45000,
    actual_yield: 48000,
    price_per_kg: 0.35,
    status: "harvested",
    planting_date: "2024-02-20",
    harvest_date: "2024-07-10",
  },
  {
    id: "crop-006",
    farm_id: "farm-002",
    crop_name: "Corn",
    season: "Summer",
    area_planted: 150,
    expected_yield: 60000,
    actual_yield: 0,
    price_per_kg: 0.28,
    status: "in progress",
    planting_date: "2024-04-15",
  },
  {
    id: "crop-007",
    farm_id: "farm-002",
    crop_name: "Soybeans",
    season: "Summer",
    area_planted: 50,
    expected_yield: 15000,
    actual_yield: 0,
    price_per_kg: 0.45,
    status: "in progress",
    planting_date: "2024-05-01",
  },
  {
    id: "crop-008",
    farm_id: "farm-002",
    crop_name: "Alfalfa",
    season: "Spring",
    area_planted: 20,
    expected_yield: 5000,
    actual_yield: 5200,
    price_per_kg: 0.25,
    status: "harvested",
    planting_date: "2024-03-01",
    harvest_date: "2024-06-15",
  },

  // Mountain View Ranch crops
  {
    id: "crop-009",
    farm_id: "farm-003",
    crop_name: "Potatoes",
    season: "Spring",
    area_planted: 30,
    expected_yield: 18000,
    actual_yield: 19500,
    price_per_kg: 1.2,
    status: "harvested",
    planting_date: "2024-03-20",
    harvest_date: "2024-08-30",
  },
  {
    id: "crop-010",
    farm_id: "farm-003",
    crop_name: "Onions",
    season: "Spring",
    area_planted: 25,
    expected_yield: 6000,
    actual_yield: 6500,
    price_per_kg: 2.1,
    status: "harvested",
    planting_date: "2024-03-10",
    harvest_date: "2024-07-25",
  },
  {
    id: "crop-011",
    farm_id: "farm-003",
    crop_name: "Garlic",
    season: "Fall",
    area_planted: 20,
    expected_yield: 2000,
    actual_yield: 0,
    price_per_kg: 8.5,
    status: "in progress",
    planting_date: "2024-09-15",
  },
  {
    id: "crop-012",
    farm_id: "farm-003",
    crop_name: "Herbs",
    season: "Summer",
    area_planted: 10,
    expected_yield: 500,
    actual_yield: 0,
    price_per_kg: 25.0,
    status: "germinating",
    planting_date: "2024-06-01",
  },

  // Riverside Produce Co. crops
  {
    id: "crop-013",
    farm_id: "farm-004",
    crop_name: "Apples",
    season: "Fall",
    area_planted: 80,
    expected_yield: 40000,
    actual_yield: 0,
    price_per_kg: 3.5,
    status: "in progress",
    planting_date: "2024-03-01",
  },
  {
    id: "crop-014",
    farm_id: "farm-004",
    crop_name: "Cherries",
    season: "Summer",
    area_planted: 40,
    expected_yield: 15000,
    actual_yield: 16800,
    price_per_kg: 6.8,
    status: "harvested",
    planting_date: "2024-02-15",
    harvest_date: "2024-06-20",
  },
  {
    id: "crop-015",
    farm_id: "farm-004",
    crop_name: "Pears",
    season: "Fall",
    area_planted: 50,
    expected_yield: 12000,
    actual_yield: 0,
    price_per_kg: 4.2,
    status: "in progress",
    planting_date: "2024-03-01",
  },
  {
    id: "crop-016",
    farm_id: "farm-004",
    crop_name: "Peaches",
    season: "Summer",
    area_planted: 30,
    expected_yield: 8000,
    actual_yield: 9200,
    price_per_kg: 5.5,
    status: "harvested",
    planting_date: "2024-02-20",
    harvest_date: "2024-07-15",
  },

  // Prairie Winds Farm crops
  {
    id: "crop-017",
    farm_id: "farm-005",
    crop_name: "Corn",
    season: "Summer",
    area_planted: 250,
    expected_yield: 100000,
    actual_yield: 0,
    price_per_kg: 0.28,
    status: "in progress",
    planting_date: "2024-04-20",
  },
  {
    id: "crop-018",
    farm_id: "farm-005",
    crop_name: "Soybeans",
    season: "Summer",
    area_planted: 150,
    expected_yield: 45000,
    actual_yield: 0,
    price_per_kg: 0.45,
    status: "in progress",
    planting_date: "2024-05-05",
  },
  {
    id: "crop-019",
    farm_id: "farm-005",
    crop_name: "Oats",
    season: "Spring",
    area_planted: 75,
    expected_yield: 30000,
    actual_yield: 32000,
    price_per_kg: 0.4,
    status: "harvested",
    planting_date: "2024-03-01",
    harvest_date: "2024-07-20",
  },
  {
    id: "crop-020",
    farm_id: "farm-005",
    crop_name: "Barley",
    season: "Spring",
    area_planted: 25,
    expected_yield: 25000,
    actual_yield: 0,
    price_per_kg: 0.35,
    status: "in progress",
    planting_date: "2024-03-15",
  },

  // Coastal Gardens crops
  {
    id: "crop-021",
    farm_id: "farm-006",
    crop_name: "Strawberries",
    season: "Spring",
    area_planted: 20,
    expected_yield: 8000,
    actual_yield: 9200,
    price_per_kg: 8.5,
    status: "harvested",
    planting_date: "2024-02-01",
    harvest_date: "2024-05-30",
  },
  {
    id: "crop-022",
    farm_id: "farm-006",
    crop_name: "Artichokes",
    season: "Spring",
    area_planted: 15,
    expected_yield: 3000,
    actual_yield: 3200,
    price_per_kg: 12.0,
    status: "harvested",
    planting_date: "2024-01-15",
    harvest_date: "2024-05-15",
  },
  {
    id: "crop-023",
    farm_id: "farm-006",
    crop_name: "Broccoli",
    season: "Fall",
    area_planted: 25,
    expected_yield: 6000,
    actual_yield: 0,
    price_per_kg: 3.8,
    status: "in progress",
    planting_date: "2024-08-01",
  },
  {
    id: "crop-024",
    farm_id: "farm-006",
    crop_name: "Cauliflower",
    season: "Fall",
    area_planted: 15,
    expected_yield: 3000,
    actual_yield: 0,
    price_per_kg: 4.2,
    status: "in progress",
    planting_date: "2024-08-15",
  },

  // Highland Harvest crops
  {
    id: "crop-025",
    farm_id: "farm-007",
    crop_name: "Blueberries",
    season: "Summer",
    area_planted: 40,
    expected_yield: 8000,
    actual_yield: 9200,
    price_per_kg: 15.0,
    status: "harvested",
    planting_date: "2024-03-01",
    harvest_date: "2024-07-15",
  },
  {
    id: "crop-026",
    farm_id: "farm-007",
    crop_name: "Blackberries",
    season: "Summer",
    area_planted: 30,
    expected_yield: 5000,
    actual_yield: 5800,
    price_per_kg: 12.5,
    status: "harvested",
    planting_date: "2024-03-15",
    harvest_date: "2024-07-30",
  },
  {
    id: "crop-027",
    farm_id: "farm-007",
    crop_name: "Raspberries",
    season: "Summer",
    area_planted: 25,
    expected_yield: 3000,
    actual_yield: 0,
    price_per_kg: 18.0,
    status: "in progress",
    planting_date: "2024-03-20",
  },
  {
    id: "crop-028",
    farm_id: "farm-007",
    crop_name: "Elderberries",
    season: "Fall",
    area_planted: 25,
    expected_yield: 2000,
    actual_yield: 0,
    price_per_kg: 20.0,
    status: "planted",
    planting_date: "2024-09-01",
  },

  // Desert Bloom Farm crops
  {
    id: "crop-029",
    farm_id: "farm-008",
    crop_name: "Citrus",
    season: "Winter",
    area_planted: 35,
    expected_yield: 20000,
    actual_yield: 0,
    price_per_kg: 2.8,
    status: "in progress",
    planting_date: "2024-01-01",
  },
  {
    id: "crop-030",
    farm_id: "farm-008",
    crop_name: "Dates",
    season: "Fall",
    area_planted: 25,
    expected_yield: 8000,
    actual_yield: 0,
    price_per_kg: 8.5,
    status: "in progress",
    planting_date: "2024-02-01",
  },
  {
    id: "crop-031",
    farm_id: "farm-008",
    crop_name: "Pomegranates",
    season: "Fall",
    area_planted: 20,
    expected_yield: 5000,
    actual_yield: 0,
    price_per_kg: 6.0,
    status: "in progress",
    planting_date: "2024-02-15",
  },
  {
    id: "crop-032",
    farm_id: "farm-008",
    crop_name: "Figs",
    season: "Summer",
    area_planted: 10,
    expected_yield: 2000,
    actual_yield: 0,
    price_per_kg: 12.0,
    status: "in progress",
    planting_date: "2024-03-01",
  },
];

// Helper functions to calculate metrics
export const calculateFarmMetrics = (): FarmMetrics => {
  const totalFarms = mockFarms.length;
  const totalAcreage = mockFarms.reduce(
    (sum, farm) => sum + farm.total_acreage,
    0
  );
  const totalAnnualYield = mockFarms.reduce(
    (sum, farm) => sum + farm.annual_yield,
    0
  );
  const averageYieldPerAcre =
    totalAcreage > 0 ? totalAnnualYield / totalAcreage : 0;

  return {
    totalFarms,
    totalAcreage,
    totalAnnualYield,
    averageYieldPerAcre: Math.round(averageYieldPerAcre * 100) / 100,
  };
};

export const calculateFarmDetailMetrics = (
  farmId: string
): FarmDetailMetrics => {
  const farm = mockFarms.find((f) => f.id === farmId);
  if (!farm) {
    throw new Error(`Farm with id ${farmId} not found`);
  }

  const farmCrops = mockCrops.filter((crop) => crop.farm_id === farmId);
  const harvestedCrops = farmCrops.filter(
    (crop) => crop.status === "harvested"
  );

  const annualYield = harvestedCrops.reduce(
    (sum, crop) => sum + crop.actual_yield,
    0
  );

  // Find top crop by actual yield
  const topCrop = harvestedCrops.reduce(
    (top, crop) => (crop.actual_yield > top.actual_yield ? crop : top),
    harvestedCrops[0] || { crop_name: "N/A", actual_yield: 0 }
  ).crop_name;

  const totalRevenue = farm.total_revenue;
  const averageYieldPerAcre =
    farm.total_acreage > 0 ? annualYield / farm.total_acreage : 0;

  return {
    annualYield,
    topCrop,
    totalRevenue,
    averageYieldPerAcre: Math.round(averageYieldPerAcre * 100) / 100,
  };
};

// API simulation functions
export const getFarms = async (): Promise<Farm[]> => {
  return mockFarms;
};

export const getFarmById = async (
  id: string
): Promise<FarmWithTopCrop | null> => {
  const farm = mockFarms.find((farm) => farm.id === id) || null;
  if (!farm) {
    return null;
  }
  const { topCrop } = await getCropsByFarmId(id);
  return { ...farm, topCrop };
};

export const getCropsByFarmId = async (
  farmId: string
): Promise<CropsByFarmIdResponse> => {
  const crops = mockCrops.filter((crop) => crop.farm_id === farmId);
  // find crop with highest actual yield
  const highestYieldCrop = crops.reduce(
    (max, crop) => (crop.actual_yield > max.actual_yield ? crop : max),
    crops[0] || { actual_yield: 0 }
  );
  // sort crops by actual yield
  crops.sort((a, b) => b.actual_yield - a.actual_yield);
  return { crops, topCrop: highestYieldCrop };
};

export const getFarmMetrics = async (): Promise<FarmMetrics> => {
  return calculateFarmMetrics();
};

export const getFarmDetailMetrics = async (
  farmId: string
): Promise<FarmDetailMetrics> => {
  return calculateFarmDetailMetrics(farmId);
};

export function getAverageYieldPerAcre() {
  const totalAnnualYield = mockFarms.reduce(
    (acc, farm) => acc + farm.annual_yield,
    0
  );
  const totalAcreage = mockFarms.reduce(
    (acc, farm) => acc + farm.total_acreage,
    0
  );
  return totalAnnualYield / totalAcreage;
}
