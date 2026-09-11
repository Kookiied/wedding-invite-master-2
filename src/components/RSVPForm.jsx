import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { saveRSVP } from '../services/rsvpService';

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    guestCount: '',
    arrivalDate: '',
    arrivalTime: '',
    travelMode: 'Flight',
    travelNumber: '',
    idFileName: '',
    idFileData: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          idFileName: file.name,
          idFileData: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save to Cloud Firestore & LocalStorage
    await saveRSVP({
      name: formData.fullName,
      phone: formData.whatsapp,
      email: formData.email,
      guestCount: formData.guestCount || 1,
      attending: 'yes',
      message: `Travel: ${formData.travelMode} ${formData.travelNumber || ''} | Arrival Date: ${formData.arrivalDate || 'N/A'} | Arrival Time: ${formData.arrivalTime || 'N/A'}`,
      idFileName: formData.idFileName || '',
      idFileData: formData.idFileData || ''
    });

    setSubmitted(true);
  };

  return (
    <section className="relative w-full bg-pink-paper-pattern text-[#2D2D2D] pt-24 pb-16 px-4">
      
      {/* Seamless Overlapping Floral Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none flex justify-center">
        <img 
          src="/flowers-divider.png" 
          alt="Floral Divider" 
          className="w-full scale-110 h-auto object-contain" 
        />
      </div>

      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#5E0B2B]/70 font-semibold block mb-2">
            Confirm Your Attendance
          </span>
          <h2 className="font-serif text-5xl text-[#5E0B2B] tracking-wide font-medium">
            RSVP
          </h2>
          <div className="w-12 h-0.5 bg-[#E6A4B4]/70 mx-auto mt-3 rounded-full" />
        </div>

        {submitted ? (
          /* Success Message Overlay */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#E6A4B4]/50 rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#5E0B2B] text-[#F8C8DC] border border-[#E6A4B4]/60 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#5E0B2B] mb-2">
              Response Recorded!
            </h3>
            <p className="font-sans text-xs text-[#2D2D2D]/80 max-w-xs mx-auto leading-relaxed mb-6">
              Thank you, {formData.fullName || 'Guest'}. Your RSVP details and ID proof have been saved. Vivek & Indira look forward to celebrating with you at Raj Vilas!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-sans font-semibold text-[#5E0B2B] uppercase tracking-widest underline underline-offset-4 cursor-pointer"
            >
              Update RSVP Details
            </button>
          </motion.div>
        ) : (
          /* Scrollable Form Cards Stack */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* CARD 1: Personal Details */}
            <div className="bg-white border border-[#E6A4B4]/45 rounded-2xl p-6 shadow-md relative">
              <h3 className="font-serif text-lg italic text-[#B83B5E] text-center mb-6">
                Personal Details
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-semibold mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#E6A4B4]/50 py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5E0B2B] transition-colors placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-semibold mb-1">
                    WhatsApp Number
                  </label>
                  <input 
                    type="tel"
                    name="whatsapp"
                    required
                    placeholder="+91 00000 00000"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#E6A4B4]/50 py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5E0B2B] transition-colors placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-semibold mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#E6A4B4]/50 py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5E0B2B] transition-colors placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* CARD 2: Guest Details */}
            <div className="bg-white border border-[#E6A4B4]/45 rounded-2xl p-6 shadow-md relative">
              <h3 className="font-serif text-lg italic text-[#B83B5E] text-center mb-6">
                Guest Details
              </h3>
              
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-semibold mb-1">
                  Number of Pax (From Your Group)
                </label>
                <select 
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#E6A4B4]/50 py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5E0B2B] transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select number of guests</option>
                  <option value="1">1 (Self)</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6+">6+ Guests</option>
                </select>
              </div>
            </div>

            {/* CARD 3: Travel Details */}
            <div className="bg-white border border-[#E6A4B4]/45 rounded-2xl p-6 shadow-md relative">
              <h3 className="font-serif text-lg italic text-[#B83B5E] text-center mb-6">
                Travel Details
              </h3>
              
              <div className="space-y-5">
                {/* Date of Arrival */}
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-semibold mb-1">
                    Date of Arrival
                  </label>
                  <select 
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#E6A4B4]/50 py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5E0B2B] transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Select date of arrival</option>
                    <option value="24 October 2026">24 October 2026</option>
                    <option value="25 October 2026">25 October 2026</option>
                  </select>
                </div>

                {/* Arrival Time */}
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-semibold mb-1">
                    Arrival Time
                  </label>
                  <input 
                    type="text"
                    name="arrivalTime"
                    placeholder="e.g. 12:00 PM"
                    value={formData.arrivalTime}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#E6A4B4]/50 py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5E0B2B] transition-colors placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-semibold mb-1">
                    Mode of Travel
                  </label>
                  <select 
                    name="travelMode"
                    value={formData.travelMode}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#E6A4B4]/50 py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5E0B2B] transition-colors cursor-pointer"
                  >
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-semibold mb-1">
                    Flight / Train Number
                  </label>
                  <input 
                    type="text"
                    name="travelNumber"
                    placeholder="e.g. AI-101 or 12345"
                    value={formData.travelNumber}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#E6A4B4]/50 py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5E0B2B] transition-colors placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* CARD 4: Hotel Check-in */}
            <div className="bg-white border border-[#E6A4B4]/45 rounded-2xl p-6 shadow-md relative">
              <h3 className="font-serif text-lg italic text-[#B83B5E] text-center mb-6">
                Hotel Check-in
              </h3>
              
              <div className="space-y-4">
                <label className="block font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-semibold mb-1">
                  Upload ID for Check-in (All members from your group)
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-[#FFF0F5] border border-[#E6A4B4]/60 rounded-lg text-[11px] font-sans font-semibold text-[#5E0B2B] hover:bg-[#F8C8DC]/30 transition-colors cursor-pointer shrink-0">
                    Choose Files
                    <input 
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="font-sans text-[11px] text-[#2D2D2D]/70 font-medium truncate">
                    {formData.idFileName ? formData.idFileName : "no files selected"}
                  </span>
                </div>

                <p className="font-sans text-[10px] text-[#2D2D2D]/55 leading-relaxed pt-2">
                  Files will be securely saved with your RSVP to speed up your hotel check-in.
                </p>
              </div>
            </div>

            {/* Submit Button Stacked at Bottom */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#5E0B2B] via-[#700933] to-[#5E0B2B] text-[#FFF0F5] border border-[#E6A4B4]/60 font-serif font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center cursor-pointer hover:brightness-110 transition-all"
            >
              Submit
            </motion.button>

          </form>
        )}

      </div>

    </section>
  );
}
