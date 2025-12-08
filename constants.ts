
import { ChartData, Message, StatData, InsightAlert, TableRow, ReportItem } from './types';

export const ENGAGEMENT_DATA: ChartData[] = [
  { name: 'Jan', value: 30, fullValue: '154,203', change: '+5.2%' },
  { name: 'Feb', value: 45, fullValue: '210,500', change: '+8.1%' },
  { name: 'Mar', value: 35, fullValue: '185,120', change: '-2.4%' },
  { name: 'Apr', value: 85, fullValue: '379,502', change: '+12.8%' },
  { name: 'May', value: 50, fullValue: '245,800', change: '+4.3%' },
  { name: 'Jun', value: 65, fullValue: '315,900', change: '+15.4%' },
];

export const MESSAGES: Message[] = [
  {
    id: '1',
    name: 'Theresa Webb',
    avatar: 'https://picsum.photos/seed/theresa/100/100',
    message: 'Hi Robert, I\'d like to invite yo...',
    time: '3 min',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Marvin McKinney',
    avatar: 'https://picsum.photos/seed/marvin/100/100',
    message: 'I\'ve send you my portfolio, pl...',
    time: '13:09',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Jenny Wilson',
    avatar: 'https://picsum.photos/seed/jenny/100/100',
    message: 'I\'m looking for a designer fo...',
    time: 'Jun 27',
    isOnline: true,
  }
];

export const STATS: StatData[] = [
  {
    title: 'Visits',
    value: '975,124',
    change: '+42.8% from previous week',
    isPositive: true,
    theme: 'dark'
  },
  {
    title: 'Engagement',
    value: '296,241',
    change: '+26.3% from previous week',
    isPositive: true,
    theme: 'dark'
  },
  {
    title: 'Company',
    value: '76,314',
    change: '-18.4% from previous week',
    isPositive: false,
    theme: 'lime'
  }
];

// --- New Data for Insights ---

export const INSIGHT_ALERTS: InsightAlert[] = [
  {
    title: 'Viral Potential',
    description: 'Your recent video is performing 3x better than average.',
    type: 'success',
    change: '+300%'
  },
  {
    title: 'Retention Risk',
    description: 'User drop-off after 30 seconds increased slightly.',
    type: 'warning',
    change: '-5%'
  },
  {
    title: 'Audience Shift',
    description: 'Significant traffic spike from Brazil region.',
    type: 'info',
    change: 'New'
  }
];

export const GROWTH_DATA: ChartData[] = [
  { name: 'Mon', value: 400, value2: 240 },
  { name: 'Tue', value: 300, value2: 139 },
  { name: 'Wed', value: 200, value2: 980 },
  { name: 'Thu', value: 278, value2: 390 },
  { name: 'Fri', value: 189, value2: 480 },
  { name: 'Sat', value: 239, value2: 380 },
  { name: 'Sun', value: 349, value2: 430 },
];

export const SENTIMENT_DATA = [
  { name: 'Positive', value: 65, fill: '#D1F366' },
  { name: 'Neutral', value: 25, fill: '#A855F7' },
  { name: 'Negative', value: 10, fill: '#3F3F46' },
];

// --- New Data for Analytics ---

export const TRAFFIC_DATA: ChartData[] = [
  { name: '00:00', value: 400, value2: 240 },
  { name: '04:00', value: 300, value2: 139 },
  { name: '08:00', value: 200, value2: 980 },
  { name: '12:00', value: 278, value2: 390 },
  { name: '16:00', value: 189, value2: 480 },
  { name: '20:00', value: 239, value2: 380 },
  { name: '23:59', value: 349, value2: 430 },
];

export const DEVICE_DATA = [
  { name: 'Mobile', value: 55, fill: '#D1F366' },
  { name: 'Desktop', value: 35, fill: '#A855F7' },
  { name: 'Tablet', value: 10, fill: '#FFFFFF' },
];

export const GEO_DATA = [
  { name: 'USA', value: 45 },
  { name: 'India', value: 25 },
  { name: 'UK', value: 15 },
  { name: 'Brazil', value: 10 },
  { name: 'Other', value: 5 },
];

export const TOP_PAGES: TableRow[] = [
  { page: '/home', views: '125,403', bounce: '32%', duration: '2m 14s' },
  { page: '/products/neon-ui', views: '84,320', bounce: '24%', duration: '4m 30s' },
  { page: '/blog/design-trends', views: '43,100', bounce: '45%', duration: '1m 50s' },
  { page: '/pricing', views: '21,040', bounce: '15%', duration: '3m 20s' },
];

// --- New Data for Audiences ---

export const AGE_DISTRIBUTION: ChartData[] = [
  { name: '18-24', value: 15, fill: '#3F3F46' },
  { name: '25-34', value: 45, fill: '#D1F366' },
  { name: '35-44', value: 25, fill: '#A855F7' },
  { name: '45+', value: 15, fill: '#3F3F46' },
];

export const GENDER_DISTRIBUTION = [
  { name: 'Female', value: 54, fill: '#D1F366' },
  { name: 'Male', value: 42, fill: '#A855F7' },
  { name: 'Other', value: 4, fill: '#FFFFFF' },
];

export const INTERESTS_DATA = [
  { subject: 'Design', A: 120, fullMark: 150 },
  { subject: 'Tech', A: 98, fullMark: 150 },
  { subject: 'Business', A: 86, fullMark: 150 },
  { subject: 'Art', A: 99, fullMark: 150 },
  { subject: 'Crypto', A: 85, fullMark: 150 },
  { subject: 'Travel', A: 65, fullMark: 150 },
];

// --- New Data for Reports ---

export const REPORTS_LIST: ReportItem[] = [
  { id: 'R-1001', name: 'Monthly Engagement Summary', date: 'Oct 01, 2023', size: '2.4 MB', type: 'PDF', status: 'Ready' },
  { id: 'R-1002', name: 'Q3 Financial Overview', date: 'Oct 01, 2023', size: '5.1 MB', type: 'PDF', status: 'Ready' },
  { id: 'R-1003', name: 'User Growth Raw Data', date: 'Sep 28, 2023', size: '840 KB', type: 'CSV', status: 'Ready' },
  { id: 'R-1004', name: 'Campaign Performance - "Summer Sale"', date: 'Sep 25, 2023', size: '1.2 MB', type: 'PDF', status: 'Ready' },
  { id: 'R-1005', name: 'Audit Log - September', date: 'Sep 25, 2023', size: '-- ', type: 'CSV', status: 'Processing' },
];
