import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Download, RefreshCw, X, Users, CheckCircle, XCircle, Utensils, FileText } from 'lucide-react';
import { getAllRSVPs, exportRSVPsToCSV } from '../services/rsvpService';
import { useTheme } from '../context/ThemeContext';

export default function AdminDashboard({ isOpen, onClose }) {
  const { theme } = useTheme();
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PIN = '25102026'; // Admin Password set to 25102026

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
      fetchData();
    } else {
      setPinError(true);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await getAllRSVPs();
    setRsvps(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchData();
    }
  }, [isAuthenticated, isOpen]);

  // Escape key and background scroll lock for butter-smooth modal UX
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Robust Mobile-Friendly ID Download & View Handler
  const handleDownloadID = (e, record) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!record.idFileData) {
      alert('No file data available for this record.');
      return;
    }

    const fileData = record.idFileData;
    const fileName = record.idFileName || 'Guest_ID_Proof.png';

    try {
      if (fileData.startsWith('data:')) {
        const arr = fileData.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          // On mobile Safari & Chrome, opening Blob URL in a new tab allows full preview and native save/download
          const win = window.open(blobUrl, '_blank');
          if (!win) {
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } else {
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        window.open(fileData, '_blank');
      }
    } catch (err) {
      console.error('Download error:', err);
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<iframe src="${fileData}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
      }
    }
  };

  // Analytics Math
  const totalSubmissions = rsvps.length;
  const attendingList = rsvps.filter(r => r.attending === 'yes');
  const totalAttendingGuests = attendingList.reduce((acc, curr) => acc + (parseInt(curr.guestCount) || 1), 0);
  const vegCount = attendingList.filter(r => r.dietary === 'veg').reduce((acc, curr) => acc + (parseInt(curr.guestCount) || 1), 0);
  const nonVegCount = attendingList.filter(r => r.dietary === 'non-veg').reduce((acc, curr) => acc + (parseInt(curr.guestCount) || 1), 0);
  const declinedCount = rsvps.filter(r => r.attending === 'no').length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="admin-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto"
        >
          <motion.div 
            key="admin-modal-content"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="relative w-full max-w-5xl border-2 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            style={{
              backgroundColor: theme.colors.lightBg,
              borderColor: theme.colors.border,
              boxShadow: `0 25px 60px -15px ${theme.colors.glowShadow}`
            }}
          >
          {/* Header Bar */}
          <div 
            className="p-4 sm:p-5 border-b flex items-center justify-between transition-colors duration-500"
            style={{
              background: `linear-gradient(to right, ${theme.colors.darkRich}, ${theme.colors.darkAccent}, ${theme.colors.darkRich})`,
              borderColor: theme.colors.borderLight,
              color: theme.colors.textLightMuted
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-full border transition-colors duration-500"
                style={{
                  backgroundColor: `${theme.colors.lightAccent}26`,
                  borderColor: theme.colors.borderLight
                }}
              >
                <Lock className="w-5 h-5" style={{ color: theme.colors.textLight }} />
              </div>
              <div>
                <h2 
                  className="font-serif text-base sm:text-lg font-bold transition-colors duration-500"
                  style={{ color: theme.colors.textLight }}
                >
                  RSVP Management Portal
                </h2>
                <p 
                  className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest opacity-80"
                  style={{ color: theme.colors.textLightMuted }}
                >
                  Vivek & Indira Wedding Database
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              style={{ color: theme.colors.textLightMuted }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Login Screen (If not authenticated) */}
          {!isAuthenticated ? (
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
              <div 
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 shadow-lg transition-colors duration-500"
                style={{
                  backgroundColor: theme.colors.darkAccent,
                  borderColor: theme.colors.border,
                  color: theme.colors.textLight
                }}
              >
                <Lock className="w-8 h-8" />
              </div>
              
              <h3 
                className="font-serif text-2xl font-bold mb-1 transition-colors duration-500"
                style={{ color: theme.colors.textTitle }}
              >
                Admin Access
              </h3>
              <p className="font-sans text-xs text-[#2D2D2D]/70 mb-6 max-w-xs">
                Enter your password to view guest RSVP responses and download Excel reports.
              </p>

              <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col gap-3">
                <input 
                  type="password"
                  placeholder="Enter Password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border-2 text-center font-bold tracking-widest text-lg focus:outline-none transition-all bg-white text-[#2D2D2D]"
                  style={{ borderColor: theme.colors.border }}
                />

                {pinError && (
                  <p className="text-rose-600 text-xs font-bold">
                    Incorrect Password. Please enter the valid admin password.
                  </p>
                )}

                <button 
                  type="submit"
                  className="w-full py-3 rounded-full border font-serif font-bold text-xs uppercase tracking-widest shadow-lg cursor-pointer hover:brightness-110 transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, ${theme.colors.darkAccent}, ${theme.colors.darkRich})`,
                    color: theme.colors.textLight,
                    borderColor: theme.colors.borderLight
                  }}
                >
                  Unlock Portal
                </button>
              </form>
            </div>
          ) : (
            /* Main Dashboard Content (Smooth Touch Scrolling Enabled) */
            <div className="p-3 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 sm:gap-6 touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
              
              {/* Action Bar */}
              <div 
                className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 transition-colors duration-500"
                style={{ borderColor: `${theme.colors.border}4D` }}
              >
                <div className="flex items-center gap-2">
                  <button 
                    onClick={fetchData}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border text-xs font-bold shadow-sm hover:brightness-95 transition-all cursor-pointer"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.textTitle
                    }}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Data
                  </button>
                </div>

                <button 
                  onClick={() => exportRSVPsToCSV(rsvps)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold shadow-md hover:brightness-110 transition-all cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${theme.colors.darkAccent}, ${theme.colors.darkRich})`,
                    color: theme.colors.textLight,
                    borderColor: theme.colors.borderLight
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download Excel (.CSV)
                </button>
              </div>

              {/* Analytics Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                
                {/* Total Attending */}
                <div 
                  className="bg-white border rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col transition-colors duration-500"
                  style={{ borderColor: `${theme.colors.border}66` }}
                >
                  <div className="flex items-center justify-between mb-1" style={{ color: theme.colors.textTitle }}>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D]/60">Total Attending</span>
                    <Users className="w-4 h-4" style={{ color: theme.colors.accentPop }} />
                  </div>
                  <span 
                    className="font-serif text-2xl sm:text-3xl font-bold transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    {totalAttendingGuests}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#2D2D2D]/50 mt-0.5">Confirmed Guests</span>
                </div>

                {/* Vegetarian */}
                <div className="bg-white border border-emerald-200 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between text-emerald-700 mb-1">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D]/60">Vegetarian</span>
                    <Utensils className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800">
                    {vegCount}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-emerald-600 mt-0.5">Veg Meals Needed</span>
                </div>

                {/* Non-Vegetarian */}
                <div className="bg-white border border-amber-200 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between text-amber-700 mb-1">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D]/60">Non-Veg</span>
                    <Utensils className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-800">
                    {nonVegCount}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-amber-600 mt-0.5">Non-Veg Meals Needed</span>
                </div>

                {/* Declined */}
                <div className="bg-white border border-rose-200 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between text-rose-700 mb-1">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D]/60">Declined</span>
                    <XCircle className="w-4 h-4 text-rose-600" />
                  </div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-rose-800">
                    {declinedCount}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-rose-600 mt-0.5">Unable to Attend</span>
                </div>

              </div>

              {/* Responses Data Table Container */}
              <div 
                className="bg-white border rounded-2xl shadow-sm overflow-hidden flex-1 flex flex-col min-h-[300px] transition-colors duration-500"
                style={{ borderColor: `${theme.colors.border}66` }}
              >
                <div 
                  className="p-3 sm:p-4 border-b flex items-center justify-between transition-colors duration-500"
                  style={{
                    backgroundColor: theme.colors.lightSubtle,
                    borderColor: `${theme.colors.border}33`
                  }}
                >
                  <h4 
                    className="font-serif font-bold text-xs sm:text-sm transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    All Submissions ({totalSubmissions})
                  </h4>
                </div>

                <div className="overflow-x-auto overflow-y-auto max-h-[55vh] sm:max-h-80 touch-pan-x touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <table className="w-full text-left border-collapse text-xs min-w-[650px]">
                    <thead>
                      <tr 
                        className="uppercase text-[10px] tracking-wider sticky top-0 z-10 font-serif transition-colors duration-500"
                        style={{
                          backgroundColor: theme.colors.darkAccent,
                          color: theme.colors.textLight
                        }}
                      >
                        <th className="p-3">Guest Name</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-center">Count</th>
                        <th className="p-3">Diet</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">ID Proof File</th>
                        <th className="p-3">Wishes / Travel</th>
                        <th className="p-3 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {rsvps.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="p-8 text-center text-[#2D2D2D]/50 italic">
                            No RSVPs received yet. New guest submissions will appear here automatically!
                          </td>
                        </tr>
                      ) : (
                        rsvps.map((record, index) => (
                          <tr key={record.id || index} className="hover:bg-black/5 transition-colors">
                            <td 
                              className="p-3 font-semibold whitespace-nowrap transition-colors duration-500"
                              style={{ color: theme.colors.textTitle }}
                            >
                              {record.name}
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              {record.attending === 'yes' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                  <CheckCircle className="w-3 h-3" /> Attending
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                                  <XCircle className="w-3 h-3" /> Declined
                                </span>
                              )}
                            </td>

                            <td className="p-3 text-center font-bold">
                              {record.attending === 'yes' ? record.guestCount || 1 : 0}
                            </td>

                            <td className="p-3 uppercase font-bold text-[10px]">
                              {record.dietary === 'veg' ? (
                                <span className="text-emerald-700">Veg</span>
                              ) : (
                                <span className="text-amber-700">Non-Veg</span>
                              )}
                            </td>

                            <td className="p-3 text-[#2D2D2D]/70 whitespace-nowrap">
                              {record.phone || record.email || '-'}
                            </td>

                            {/* ID Proof File Column with Cross-Platform Handler */}
                            <td className="p-3 whitespace-nowrap">
                              {record.idFileData ? (
                                <button 
                                  onClick={(e) => handleDownloadID(e, record)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold shadow-xs hover:brightness-110 transition-all cursor-pointer"
                                  style={{
                                    backgroundColor: theme.colors.darkAccent,
                                    color: theme.colors.textLight,
                                    borderColor: theme.colors.border
                                  }}
                                  title="Click to view or download ID proof"
                                >
                                  <FileText className="w-3 h-3" style={{ color: theme.colors.textLight }} />
                                  <span className="max-w-[85px] truncate">{record.idFileName || 'View ID'}</span>
                                  <Download className="w-2.5 h-2.5" style={{ color: theme.colors.textLight }} />
                                </button>
                              ) : record.idFileName ? (
                                <span 
                                  className="text-[10px] font-semibold transition-colors duration-500"
                                  style={{ color: theme.colors.textTitle }}
                                >
                                  {record.idFileName}
                                </span>
                              ) : (
                                <span className="text-[10px] text-gray-400 italic">No ID File</span>
                              )}
                            </td>

                            <td className="p-3 max-w-xs truncate text-[#2D2D2D]/80 italic">
                              {record.message ? `"${record.message}"` : '-'}
                            </td>

                            <td className="p-3 text-right text-[#2D2D2D]/50 text-[10px] whitespace-nowrap">
                              {record.submittedAt ? new Date(record.submittedAt).toLocaleDateString() : ''}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
