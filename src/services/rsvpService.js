import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const LOCAL_STORAGE_KEY = 'wedding_rsvps_data';

// Helper to save data to local storage fallback
const saveToLocalStorage = (data) => {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    existing.unshift(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
};

// Helper to get local storage data
const getFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  } catch (err) {
    return [];
  }
};

/**
 * Saves a new guest RSVP form submission
 */
export async function saveRSVP(formData) {
  const rsvpRecord = {
    name: formData.name || 'Anonymous Guest',
    email: formData.email || '',
    phone: formData.phone || '',
    attending: formData.attending || 'yes',
    guestCount: parseInt(formData.guestCount || 1, 10),
    dietary: formData.dietary || 'veg',
    message: formData.message || '',
    events: formData.events || ['wedding'],
    idFileName: formData.idFileName || '',
    idFileData: formData.idFileData || '',
    submittedAt: new Date().toISOString()
  };

  // Always save locally so data is never lost
  saveToLocalStorage(rsvpRecord);

  // Try saving to Cloud Firestore
  try {
    const rsvpsRef = collection(db, 'rsvps');
    await addDoc(rsvpsRef, {
      ...rsvpRecord,
      timestamp: serverTimestamp()
    });
    console.log('RSVP successfully saved to Cloud Firestore!');
  } catch (error) {
    console.warn('Firestore write notice (using local storage fallback):', error.message);
  }

  return rsvpRecord;
}

/**
 * Retrieves all guest RSVP submissions for the Admin Dashboard
 */
export async function getAllRSVPs() {
  let firestoreRSVPs = [];

  try {
    const rsvpsRef = collection(db, 'rsvps');
    const q = query(rsvpsRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);

    firestoreRSVPs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt || (doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString())
    }));
  } catch (error) {
    console.warn('Firestore fetch notice (using local storage data):', error.message);
  }

  const localRSVPs = getFromLocalStorage();

  // Combine and remove duplicates by matching timestamp & name
  const combinedMap = new Map();
  [...firestoreRSVPs, ...localRSVPs].forEach(item => {
    const key = `${item.name}-${item.submittedAt?.slice(0, 16)}`;
    if (!combinedMap.has(key)) {
      combinedMap.set(key, item);
    }
  });

  return Array.from(combinedMap.values());
}

/**
 * Downloads all collected RSVPs as a CSV Excel file
 */
export function exportRSVPsToCSV(rsvps) {
  if (!rsvps || rsvps.length === 0) {
    alert('No RSVP data available to export yet!');
    return;
  }

  const headers = ['Guest Name', 'Attending', 'Guests Count', 'Dietary Preference', 'Phone', 'Email', 'ID Proof File Name', 'Message', 'Submitted Date'];
  
  const rows = rsvps.map(r => [
    `"${(r.name || '').replace(/"/g, '""')}"`,
    `"${r.attending === 'yes' ? 'Attending' : 'Regretfully Decline'}"`,
    `"${r.guestCount || 1}"`,
    `"${(r.dietary || '').toUpperCase()}"`,
    `"${(r.phone || '').replace(/"/g, '""')}"`,
    `"${(r.email || '').replace(/"/g, '""')}"`,
    `"${(r.idFileName || 'No File Uploaded').replace(/"/g, '""')}"`,
    `"${(r.message || '').replace(/"/g, '""')}"`,
    `"${r.submittedAt ? new Date(r.submittedAt).toLocaleString() : ''}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Vivek_Indira_Wedding_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
