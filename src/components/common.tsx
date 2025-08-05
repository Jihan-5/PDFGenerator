import React from 'react';

export const NuqiEthosphereLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#2d3748" stroke="#D69E2E" strokeWidth="4"/>
        <text x="50" y="62" fontFamily="Lora, serif" fontSize="40" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">NE</text>
    </svg>
);

export const PlayStoreIcon: React.FC = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.1,2.5l9.2,9.2L3.1,20.8c-0.6-0.3-1-1-1-1.7V4.2C2.1,3.5,2.5,2.8,3.1,2.5z M4.6,22.1l11.7-6.7l-4.5-4.5L4.6,22.1z M20.9,10.1l-4.5,4.5l-7.2-7.2l7.2-7.2C17.3,0,18.5,0.2,19.5,1l-6.8,6.8l8.2,4.7C21.1,11.8,21.1,10.8,20.9,10.1z M13.1,12.3l4.5-4.5l-11.7-6.7C5.6,1,5.3,1,5,1.1L13.1,12.3z"/></svg>
);

export const AppStoreIcon: React.FC = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.7,13.3c0-1.5,1.1-2.4,1.2-2.5c-0.9-1.4-2.3-1.7-2.8-1.7c-1.3,0-2.5,0.8-3.1,0.8s-2.1-0.8-3.5-0.8c-1.5,0-2.9,0.9-3.7,2.3c-1.6,2.8-0.4,6.9,1.1,9.1c0.8,1.1,1.7,2.4,2.9,2.3c1.1,0,1.5-0.7,3-0.7s1.8,0.7,3.1,0.7c1.3,0,2-1,2.8-2.1c0.6-0.8,1-1.9,1.1-1.9C18.7,18.4,18.7,13.4,18.7,13.3z M15.5,5.8c0.6-0.8,1.1-1.9,0.9-3c-1,0.1-2.2,0.8-2.8,1.6c-0.6,0.7-1.1,1.9-0.9,2.9C13.7,7.4,14.9,6.6,15.5,5.8z"/></svg>
);

export const ImpactIconUp: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`w-6 h-6 text-green-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19V5m0 0L7 10m5-5l5 5"></path>
    </svg>
);

export const ImpactIconNeutral: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`w-6 h-6 text-gray-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14"></path>
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>);
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314 1.65 20.644.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.423.164-1.06.36-2.23.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.82-1.381-.896-.164-.423-.36-1.06-.413-2.23-.057-1.265-.07-1.646-.07-4.85s.015-3.585.07-4.85c.055-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.415 2.175 8.797 2.16 12 2.16zm0 5.482A4.356 4.356 0 1 0 12 16.35a4.356 4.356 0 0 0 0-8.708zm0 7.21a2.854 2.854 0 1 1 0-5.708 2.854 2.854 0 0 1 0 5.708zM16.965 5.58a1.323 1.323 0 1 0 0 2.646 1.323 1.323 0 0 0 0-2.646z"/></svg>);
const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>);
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>);
const SpotifyIcon: React.FC<{ className?: string }> = ({ className }) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.839 16.335a.499.499 0 0 1-.688.161c-1.841-1.116-4.145-1.36-6.842-.74a.5.5 0 0 1-.57-.433c-.066-.32.327-.58.643-.645 2.97-.68 5.553-.399 7.647.88a.499.499 0 0 1 .161.688zm.92-2.223a.624.624 0 0 1-.853.201c-2.125-1.306-5.22-1.625-7.665-.89a.625.625 0 0 1-.703-.538c-.08-.396.402-.72.798-.799 2.76-.51 6.136-.145 8.532 1.343a.624.624 0 0 1 .201.853zm.128-2.31a.75.75 0 0 1-1.026.242C14.017 10.39 9.844 9.99 5.862 11.13a.75.75 0 0 1-.84-.666c-.1-4.75.64-1.066.824-1.15 4.332-1.25 8.925-.79 12.333 1.57a.75.75 0 0 1 .242 1.026z"/></svg>);
const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>);
const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.143 8.24l-1.437 6.685c-.15 1.034-.632 1.29-1.51 0.784l-2.074-1.524-1.008 1.023c-.112.112-.224.224-.448.224l.15-2.115 3.99-3.623c.335-.336-.057-.504-.492-.168L7.04 13.99l-2.02-.63c-1.012-.326-1.023-1.023.203-1.53l11.16-4.364c.895-.336 1.647.203 1.343.999z"/></svg>);
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}><title>WhatsApp</title><path d="M12.04 2.02c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.29 4.88L2 22l5.25-1.38c1.41.78 3.02 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM12.05 3.6c4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23h-.01c-1.54 0-3.03-.42-4.31-1.18l-.31-.18-3.21.84.86-3.13-.2-.32c-.82-1.32-1.28-2.85-1.28-4.45 0-4.54 3.69-8.23 8.23-8.23zm4.52 10.2c-.25-.12-1.47-.72-1.7-.8s-.39-.12-.56.12c-.17.25-.64.8-.79.96-.15.17-.3.19-.56.06s-1.06-.39-2.02-1.25c-.75-.67-1.25-1.49-1.4-1.75-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31s-.86.84-.86 2.05c0 1.21.88 2.37 1 2.53s1.75 2.66 4.24 3.73c.59.25 1.05.4 1.41.51.58.19 1.11.16 1.52.1.48-.07 1.47-.6 1.67-1.18s.21-1.09.18-1.18c-.04-.08-.14-.13-.25-.25z"/></svg>);

const SocialIcon: React.FC<{ children: React.ReactNode, bgColor: string, hoverColor: string }> = ({ children, bgColor, hoverColor }) => (
    <a href="#" className={`w-10 h-10 ${bgColor} ${hoverColor} text-white flex items-center justify-center rounded-full cursor-pointer transition-colors p-2`}>
        {children}
    </a>
);

export const SocialIcons = () => (
    <div className="flex justify-center space-x-3">
        <SocialIcon bgColor="bg-gray-700" hoverColor="hover:bg-black"><XIcon /></SocialIcon>
        <SocialIcon bgColor="bg-pink-600" hoverColor="hover:bg-pink-700"><InstagramIcon /></SocialIcon>
        <SocialIcon bgColor="bg-red-600" hoverColor="hover:bg-red-700"><YouTubeIcon /></SocialIcon>
        <SocialIcon bgColor="bg-blue-800" hoverColor="hover:bg-blue-900"><FacebookIcon /></SocialIcon>
        <SocialIcon bgColor="bg-green-500" hoverColor="hover:bg-green-600"><SpotifyIcon /></SocialIcon>
        <SocialIcon bgColor="bg-blue-700" hoverColor="hover:bg-blue-800"><LinkedinIcon /></SocialIcon>
        <SocialIcon bgColor="bg-blue-500" hoverColor="hover:bg-blue-600"><TelegramIcon /></SocialIcon>
        <SocialIcon bgColor="bg-green-600" hoverColor="hover:bg-green-700"><WhatsAppIcon /></SocialIcon>
    </div>
);

export const CandleStickChartSVG = () => (
    <svg width="100%" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#FFFFFF"/>
      {/* Grid lines */}
      <line x1="0" y1="40" x2="400" y2="40" stroke="#E5E7EB" strokeWidth="0.5"/>
      <line x1="0" y1="80" x2="400" y2="80" stroke="#E5E7EB" strokeWidth="0.5"/>
      <line x1="0" y1="120" x2="400" y2="120" stroke="#E5E7EB" strokeWidth="0.5"/>
      <line x1="0" y1="160" x2="400" y2="160" stroke="#E5E7EB" strokeWidth="0.5"/>
      {/* Moving Averages */}
      <path d="M 20 100 C 80 90, 150 120, 220 110 S 350 140, 380 130" stroke="#D69E2E" fill="none" strokeWidth="1.5"/>
      <path d="M 20 130 C 80 120, 150 150, 220 140 S 350 170, 380 160" stroke="#4A5568" fill="none" strokeWidth="1.5" strokeDasharray="4 2"/>
      {/* Candlesticks */}
      <line x1="30" y1="90" x2="30" y2="120" stroke="#E53E3E" strokeWidth="1"/>
      <rect x="25" y="100" width="10" height="15" fill="#E53E3E"/>
      <line x1="50" y1="80" x2="50" y2="105" stroke="#38A169" strokeWidth="1"/>
      <rect x="45" y="85" width="10" height="15" fill="#38A169"/>
      <line x1="70" y1="95" x2="70" y2="125" stroke="#38A169" strokeWidth="1"/>
      <rect x="65" y="100" width="10" height="20" fill="#38A169"/>
      <line x1="90" y1="110" x2="90" y2="140" stroke="#E53E3E" strokeWidth="1"/>
      <rect x="85" y="120" width="10" height="15" fill="#E53E3E"/>
      <line x1="280" y1="60" x2="280" y2="90" stroke="#38A169" strokeWidth="1"/>
      <rect x="275" y="65" width="10" height="20" fill="#38A169"/>
      <line x1="300" y1="50" x2="300" y2="80" stroke="#E53E3E" strokeWidth="1"/>
      <rect x="295" y="60" width="10" height="15" fill="#E53E3E"/>
      <line x1="320" y1="70" x2="320" y2="100" stroke="#38A169" strokeWidth="1"/>
      <rect x="315" y="75" width="10" height="20" fill="#38A169"/>
      <line x1="340" y1="80" x2="340" y2="110" stroke="#E53E3E" strokeWidth="1"/>
      <rect x="335" y="90" width="10" height="15" fill="#E53E3E"/>
      <line x1="360" y1="95" x2="360" y2="125" stroke="#38A169" strokeWidth="1"/>
      <rect x="355" y="100" width="10" height="20" fill="#38A169"/>
      {/* Axis Labels */}
      <text x="385" y="42" fill="#718096" fontSize="10">25600</text>
      <text x="385" y="82" fill="#718096" fontSize="10">25200</text>
      <text x="385" y="122" fill="#718096" fontSize="10">24800</text>
      <text x="385" y="162" fill="#718096" fontSize="10">24400</text>
    </svg>
);

export const Page: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`w-[800px] bg-white shadow-xl p-8 rounded-lg mx-auto mb-8 print-page ${className || ''}`}>
        {children}
    </div>
);

export const Header: React.FC = () => (
    <div className="flex justify-between items-center pb-5 border-b-2 border-gray-100 mb-6">
        <div className="flex items-center space-x-3">
            <NuqiEthosphereLogo className="w-12 h-12" />
            <span className="text-xl font-bold font-heading text-[#2d3748] tracking-wider">NUQI ETHOSPHERE</span>
        </div>
        <h1 className="text-3xl font-bold font-heading text-[#2d3748]">Daily News</h1>
    </div>
);

export const Footer: React.FC = () => (
    <div className="mt-8 pt-4 border-t border-gray-200 text-right">
        <p className="text-xs text-gray-400">Source: Bloomberg, NSE, NSDL, BSE, Nuqi Ethosphere Research</p>
        <p className="text-xs text-gray-400">Data sourced from internal database.</p>
    </div>
);

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-xl font-bold font-heading text-[#2d3748] mt-6 mb-4 pb-2 border-b-2 border-[#D69E2E]">{children}</h3>
);

export const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start space-x-3 mb-3">
        <span className="text-[#D69E2E] mt-1.5 text-xs">&#9679;</span>
        <p className="text-gray-700 flex-1 leading-relaxed">{children}</p>
    </div>
);