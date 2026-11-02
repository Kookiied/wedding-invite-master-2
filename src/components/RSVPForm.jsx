import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { saveRSVP } from '../services/rsvpService';
import { useTheme } from '../context/ThemeContext';

export default function RSVPForm() {
  const { theme } = useTheme();
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
    <section className="relative w-full bg-pink-paper-pattern text-[#2D2D2D] pt-36 sm:pt-44 md:pt-48 pb-24 md:pb-32 px-4 transition-colors duration-500">
      
      {/* Seamless Overlapping Floral Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none flex justify-center">
        <img 
          src="/flowers-divider.png" 
          alt="Floral Divider" 
          className="w-full scale-110 h-auto object-contain" 
        />
      </div>

      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span 
            className="font-sans text-xs uppercase tracking-[0.3em] font-semibold block mb-2 opacity-80 transition-colors duration-500"
            style={{ color: theme.colors.textTitle }}
          >
            Confirm Your Attendance
          </span>
          <h2 
            className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-wide font-medium transition-colors duration-500"
            style={{ color: theme.colors.textTitle }}
          >
            RSVP
          </h2>
          <div 
            className="w-12 h-0.5 mx-auto mt-3 rounded-full opacity-70 transition-colors duration-500" 
            style={{ backgroundColor: theme.colors.border }}
          />
        </div>

        {submitted ? (
          /* Success Message Overlay */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border rounded-2xl p-8 shadow-xl text-center transition-colors duration-500"
            style={{ borderColor: theme.colors.borderLight }}
          >
            <div 
              className="w-16 h-16 rounded-full border flex items-center justify-center mx-auto mb-4 shadow-lg transition-colors duration-500"
              style={{
                backgroundColor: theme.colors.darkAccent,
                borderColor: theme.colors.border,
                color: theme.colors.textLight
              }}
            >
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 
              className="font-serif text-2xl font-bold mb-2 transition-colors duration-500"
              style={{ color: theme.colors.textTitle }}
            >
              Response Recorded!
            </h3>
            <p className="font-sans text-xs text-[#2D2D2D]/80 max-w-xs mx-auto leading-relaxed mb-6">
              Thank you, {formData.fullName || 'Guest'}. Your RSVP details and ID proof have been saved. Vivek & Indira look forward to celebrating with you at Raj Vilas!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-sans font-semibold uppercase tracking-widest underline underline-offset-4 cursor-pointer transition-colors duration-500"
              style={{ color: theme.colors.textTitle }}
            >
              Update RSVP Details
            </button>
          </motion.div>
        ) : (
          /* Scrollable Form Cards Stack */
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            
            {/* CARD 1: Personal Details */}
            <div 
              className="bg-white border rounded-2xl p-6 md:p-8 shadow-md relative transition-all duration-500"
              style={{ borderColor: theme.colors.borderLight }}
            >
              <h3 
                className="font-serif text-lg md:text-xl italic text-center mb-6 transition-colors duration-500"
                style={{ color: theme.colors.darkAccent }}
              >
                Personal Details
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label 
                    className="block font-sans text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: theme.colors.textTitle }}
                  >
                    Full Name
                  </label>
                  <input 
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none transition-colors placeholder:text-gray-400"
                    style={{ borderColor: `${theme.colors.border}80` }}
                  />
                </div>

                <div>
                  <label 
                    className="block font-sans text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: theme.colors.textTitle }}
                  >
                    WhatsApp Number
                  </label>
                  <input 
                    type="tel"
                    name="whatsapp"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none transition-colors placeholder:text-gray-400"
                    style={{ borderColor: `${theme.colors.border}80` }}
                  />
                </div>

                <div>
                  <label 
                    className="block font-sans text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: theme.colors.textTitle }}
                  >
                    Email Address
                  </label>
                  <input 
                    type="email"
                    name="email"
                    required
                    placeholder="yourname@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none transition-colors placeholder:text-gray-400"
                    style={{ borderColor: `${theme.colors.border}80` }}
                  />
                </div>
              </div>
            </div>

            {/* CARD 2: Guest Count */}
            <div 
              className="bg-white border rounded-2xl p-6 md:p-8 shadow-md relative transition-all duration-500"
              style={{ borderColor: theme.colors.borderLight }}
            >
              <h3 
                className="font-serif text-lg md:text-xl italic text-center mb-6 transition-colors duration-500"
                style={{ color: theme.colors.darkAccent }}
              >
                Guest Count
              </h3>
              
              <div>
                <label 
                  className="block font-sans text-[10px] uppercase tracking-widest font-semibold mb-1"
                  style={{ color: theme.colors.textTitle }}
                >
                  Number of Guests Attending
                </label>
                <select 
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none transition-colors cursor-pointer"
                  style={{ borderColor: `${theme.colors.border}80` }}
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="5+">5+ Persons</option>
                </select>
              </div>
            </div>

            {/* CARD 3: Travel Information */}
            <div 
              className="bg-white border rounded-2xl p-6 md:p-8 shadow-md relative transition-all duration-500"
              style={{ borderColor: theme.colors.borderLight }}
            >
              <h3 
                className="font-serif text-lg md:text-xl italic text-center mb-6 transition-colors duration-500"
                style={{ color: theme.colors.darkAccent }}
              >
                Travel Information
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label 
                    className="block font-sans text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: theme.colors.textTitle }}
                  >
                    Arrival Date
                  </label>
                  <select 
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none transition-colors cursor-pointer"
                    style={{ borderColor: `${theme.colors.border}80` }}
                  >
                    <option value="" disabled>Select date of arrival</option>
                    <option value="24 October 2026">24 October 2026</option>
                    <option value="25 October 2026">25 October 2026</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block font-sans text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: theme.colors.textTitle }}
                  >
                    Arrival Time
                  </label>
                  <input 
                    type="text"
                    name="arrivalTime"
                    placeholder="e.g. 12:00 PM"
                    value={formData.arrivalTime}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none transition-colors placeholder:text-gray-400"
                    style={{ borderColor: `${theme.colors.border}80` }}
                  />
                </div>

                <div>
                  <label 
                    className="block font-sans text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: theme.colors.textTitle }}
                  >
                    Mode of Travel
                  </label>
                  <select 
                    name="travelMode"
                    value={formData.travelMode}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none transition-colors cursor-pointer"
                    style={{ borderColor: `${theme.colors.border}80` }}
                  >
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block font-sans text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: theme.colors.textTitle }}
                  >
                    Flight / Train Number
                  </label>
                  <input 
                    type="text"
                    name="travelNumber"
                    placeholder="e.g. AI-101 or 12345"
                    value={formData.travelNumber}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b py-2 font-sans text-xs text-[#2D2D2D] focus:outline-none transition-colors placeholder:text-gray-400"
                    style={{ borderColor: `${theme.colors.border}80` }}
                  />
                </div>
              </div>
            </div>

            {/* CARD 4: Hotel Check-in */}
            <div 
              className="bg-white border rounded-2xl p-6 md:p-8 shadow-md relative transition-all duration-500"
              style={{ borderColor: theme.colors.borderLight }}
            >
              <h3 
                className="font-serif text-lg md:text-xl italic text-center mb-6 transition-colors duration-500"
                style={{ color: theme.colors.darkAccent }}
              >
                Hotel Check-in
              </h3>
              
              <div className="space-y-4">
                <label 
                  className="block font-sans text-[10px] uppercase tracking-widest font-semibold mb-1"
                  style={{ color: theme.colors.textTitle }}
                >
                  Upload ID for Check-in (All members from your group)
                </label>
                
                <div className="flex items-center gap-3">
                  <label 
                    className="px-4 py-2 border rounded-lg text-[11px] font-sans font-semibold hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                    style={{
                      backgroundColor: theme.colors.lightBg,
                      borderColor: theme.colors.border,
                      color: theme.colors.textTitle
                    }}
                  >
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
              className="w-full py-4 rounded-full border font-serif font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center cursor-pointer hover:brightness-110 transition-all"
              style={{
                background: `linear-gradient(to right, ${theme.colors.darkAccent}, ${theme.colors.darkRich}, ${theme.colors.darkAccent})`,
                color: theme.colors.textLight,
                borderColor: theme.colors.borderLight
              }}
            >
              Submit
            </motion.button>

          </form>
        )}

      </div>

    </section>
  );
}
