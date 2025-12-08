
export type ViewType = 'overview' | 'insights' | 'analytics' | 'audiences' | 'reports';

export interface ChartData {
  name: string;
  value: number;
  value2?: number; // For comparison charts
  fill?: string;
  fullValue?: string; // Formatted value for display (e.g., "379,502")
  change?: string; // Percentage change string (e.g., "+12.8%")
}

export interface Message {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  isOnline?: boolean;
}

export interface StatData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  theme: 'dark' | 'lime';
}

export interface InsightAlert {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
  change?: string;
}

export interface TableRow {
  page: string;
  views: string;
  bounce: string;
  duration: string;
}

export interface ReportItem {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'PDF' | 'CSV';
  status: 'Ready' | 'Processing';
}
