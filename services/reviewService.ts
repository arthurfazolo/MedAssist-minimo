import { ReviewHistoryEntry } from '../types';
import { db, OperationType, handleFirestoreError } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export type ReviewContentType = 'disease' | 'protocol' | 'medication' | 'calculator' | 'prescription';

export interface GlobalReviewIntervals {
  protocol: number;
  disease: number;
  medication: number;
  calculator: number;
  prescription: number;
}

// Global default settings
let globalSettings: GlobalReviewIntervals = {
  protocol: 12,
  disease: 36,
  medication: 36,
  calculator: 12,
  prescription: 12
};

const STORAGE_KEY = 'medassist_global_review_settings';

// Load from local storage initially
try {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    globalSettings = { ...globalSettings, ...JSON.parse(cached) };
  }
} catch (e) {}

// Subscribe to Firestore for real-time config updates if any exist
export const startReviewSettingsSync = () => {
  onSnapshot(doc(db, 'review_settings', 'global'), (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data() as Partial<GlobalReviewIntervals>;
      globalSettings = {
        protocol: typeof data.protocol === 'number' ? data.protocol : 12,
        disease: typeof data.disease === 'number' ? data.disease : 36,
        medication: typeof data.medication === 'number' ? data.medication : 36,
        calculator: typeof data.calculator === 'number' ? data.calculator : 12,
        prescription: typeof data.prescription === 'number' ? data.prescription : 12,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(globalSettings));
      window.dispatchEvent(new CustomEvent('medassist:review-settings-updated'));
    }
  }, (err) => {
    console.error("Error loading global review settings:", err);
  });
};

// Auto-start sync
startReviewSettingsSync();

export const getGlobalReviewSettings = (): GlobalReviewIntervals => {
  return { ...globalSettings };
};

export const saveGlobalReviewSettings = async (settings: GlobalReviewIntervals): Promise<void> => {
  try {
    await setDoc(doc(db, 'review_settings', 'global'), settings);
    globalSettings = { ...settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalSettings));
    window.dispatchEvent(new CustomEvent('medassist:review-settings-updated'));
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'review_settings/global');
  }
};

export const addMonthsToDateString = (dateStr: string, months: number): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
};

export const calculateNextReviewAt = (
  type: ReviewContentType,
  lastReviewedAtStr: string,
  customMonths?: number
): string => {
  const months = typeof customMonths === 'number' && customMonths > 0 
    ? customMonths 
    : globalSettings[type];
  return addMonthsToDateString(lastReviewedAtStr, months);
};

export const computeReviewStatus = (
  nextReviewAtStr: string,
  currentStatus?: 'up_to_date' | 'review_due' | 'overdue' | 'under_review'
): 'up_to_date' | 'review_due' | 'overdue' | 'under_review' => {
  if (currentStatus === 'under_review') {
    return 'under_review';
  }

  const nextReview = new Date(nextReviewAtStr);
  if (isNaN(nextReview.getTime())) {
    return 'up_to_date';
  }

  const today = new Date();
  
  // Compare year/month/day to prevent timezone edge cases
  const todayResetStr = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const todayReset = new Date(todayResetStr);
  
  const nextReviewResetStr = new Date(nextReview.getFullYear(), nextReview.getMonth(), nextReview.getDate()).toISOString();
  const nextReviewReset = new Date(nextReviewResetStr);

  if (todayReset > nextReviewReset) {
    return 'overdue';
  }

  const diffTime = nextReviewReset.getTime() - todayReset.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) {
    return 'review_due';
  }

  return 'up_to_date';
};

export const migrateItemReviewFields = <T extends Record<string, any>>(item: T, type: ReviewContentType): T => {
  const lastReviewedAt = item.lastReviewedAt || item.updatedAt || item.createdAt || new Date().toISOString();
  const nextReviewAt = item.nextReviewAt || calculateNextReviewAt(type, lastReviewedAt, item.customReviewIntervalMonths);
  const calculatedStatus = computeReviewStatus(nextReviewAt, item.reviewStatus);

  const migrated: any = {
    ...item,
    lastReviewedAt,
    nextReviewAt,
    reviewStatus: calculatedStatus,
    reviewNotes: item.reviewNotes || '',
    reviewedBy: item.reviewedBy || '',
    reviewPriority: item.reviewPriority || 'medium',
    createdAt: item.createdAt || lastReviewedAt,
    updatedAt: item.updatedAt || new Date().toISOString(),
    reviewHistory: item.reviewHistory || []
  };

  return migrated as T;
};

// Help sort queues
export const reviewQueueSorter = (a: any, b: any): number => {
  const statusWeights = {
    overdue: 1,
    review_due: 2,
    up_to_date: 3,
    under_review: 4
  };

  const statusA = a.reviewStatus || 'up_to_date';
  const statusB = b.reviewStatus || 'up_to_date';

  const weightA = statusWeights[statusA as keyof typeof statusWeights] || 3;
  const weightB = statusWeights[statusB as keyof typeof statusWeights] || 3;

  if (weightA !== weightB) {
    return weightA - weightB;
  }

  // Sub-sorting: oldest lastReviewedAt first
  const dateA = new Date(a.lastReviewedAt || 0).getTime();
  const dateB = new Date(b.lastReviewedAt || 0).getTime();
  return dateA - dateB;
};

// Create a review history entry and update the content status
export const performReviewOnItem = <T extends Record<string, any>>(
  item: T,
  type: ReviewContentType,
  reviewedBy: string,
  changesSummary: string,
  notes: string,
  nextStatusChoice?: 'up_to_date' | 'under_review',
  reviewPriority?: 'low' | 'medium' | 'high'
): T => {
  const now = new Date().toISOString();
  
  // Create history entry
  const historyEntry: ReviewHistoryEntry = {
    id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    date: now,
    reviewedBy,
    changesSummary,
    notes
  };

  const history = Array.isArray(item.reviewHistory) ? [...item.reviewHistory] : [];
  history.push(historyEntry);

  const lastReviewedAt = now;
  const nextReviewAt = calculateNextReviewAt(type, lastReviewedAt, item.customReviewIntervalMonths);
  
  const statusToUse = nextStatusChoice || 'up_to_date';
  const finalStatus = computeReviewStatus(nextReviewAt, statusToUse);

  return {
    ...item,
    lastReviewedAt,
    nextReviewAt,
    reviewStatus: finalStatus,
    reviewNotes: notes,
    reviewedBy,
    reviewPriority: reviewPriority || item.reviewPriority || 'medium',
    updatedAt: now,
    reviewHistory: history
  } as T;
};

// Get remaining days
export const getReviewRemainingDays = (nextReviewAtStr: string): number => {
  const nextReview = new Date(nextReviewAtStr);
  if (isNaN(nextReview.getTime())) {
    return 0;
  }
  const today = new Date();
  
  // Calculate distinct day diff to avoid hourly fractions
  const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const nextReviewReset = new Date(nextReview.getFullYear(), nextReview.getMonth(), nextReview.getDate());
  
  const diffTime = nextReviewReset.getTime() - todayReset.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
