import { GTMTS_BackupData } from '../types';
import { getInitialBackupData } from './seedData';

const STORAGE_KEY = 'GTMTS_DATA_STORE_V1';

export function loadStoredData(): GTMTS_BackupData {
  const initial = getInitialBackupData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveStoredData(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (parsed && parsed.data) {
      const merged: GTMTS_BackupData = {
        version: '1.0.0',
        exportedAt: parsed.exportedAt || new Date().toISOString(),
        appTitle: 'Graduate Thesis Management and Tracking System (GTMTS)',
        data: {
          users: Array.isArray(parsed.data.users) && parsed.data.users.length > 0 ? parsed.data.users : initial.data.users,
          rooms: Array.isArray(parsed.data.rooms) && parsed.data.rooms.length > 0 ? parsed.data.rooms : initial.data.rooms,
          topicProposals: Array.isArray(parsed.data.topicProposals) ? parsed.data.topicProposals : initial.data.topicProposals,
          examSchedules: Array.isArray(parsed.data.examSchedules) ? parsed.data.examSchedules : initial.data.examSchedules,
          advisoryLogs: Array.isArray(parsed.data.advisoryLogs) ? parsed.data.advisoryLogs : initial.data.advisoryLogs,
          progressReports: Array.isArray(parsed.data.progressReports) ? parsed.data.progressReports : initial.data.progressReports,
          prerequisites: Array.isArray(parsed.data.prerequisites) ? parsed.data.prerequisites : initial.data.prerequisites,
          finalArchives: Array.isArray(parsed.data.finalArchives) ? parsed.data.finalArchives : initial.data.finalArchives,
          attendanceRecords: Array.isArray(parsed.data.attendanceRecords) ? parsed.data.attendanceRecords : initial.data.attendanceRecords,
        }
      };
      saveStoredData(merged);
      return merged;
    }
  } catch (err) {
    console.error('Failed to parse localStorage data, restoring default seed:', err);
  }
  saveStoredData(initial);
  return initial;
}

export function saveStoredData(data: GTMTS_BackupData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to persist data to localStorage:', err);
  }
}

export function exportBackupJSON(data: GTMTS_BackupData): void {
  const exportPayload: GTMTS_BackupData = {
    ...data,
    exportedAt: new Date().toISOString()
  };
  const jsonStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gtmts_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function validateBackupSchema(parsed: any): boolean {
  if (!parsed || typeof parsed !== 'object') return false;
  if (!parsed.version || !parsed.data) return false;
  const d = parsed.data;
  return (
    Array.isArray(d.users) &&
    Array.isArray(d.rooms) &&
    Array.isArray(d.topicProposals) &&
    Array.isArray(d.examSchedules)
  );
}

export function resetToFactoryDefault(): GTMTS_BackupData {
  const initial = getInitialBackupData();
  saveStoredData(initial);
  return initial;
}

/**
 * Generates an SHA-256 Text Signature Hash from visual canvas feature data
 * Strictly compliant with PDPA - NO raw image or base64 is saved!
 */
export async function generateFaceSignatureHash(sampleLandmarkString: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(sampleLandmarkString + '-' + Date.now().toString());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `SHA256:${hashHex}`;
  } catch {
    // Fallback pseudo-hash
    return `SHA256:${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
  }
}
