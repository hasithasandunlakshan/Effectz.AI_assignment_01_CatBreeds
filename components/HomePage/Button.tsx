"use client"
import React from 'react'

export default function Button() {

    const scrollToCategories = () => {
        // Find the cat category section by ID
        const categorySection = document.getElementById('catCategory');
        
        // Scroll to that section if it exists
        if (categorySection) {
          categorySection.scrollIntoView({ behavior: 'smooth' });
        }
      };
  return (
   
     <div className="absolute bottom-8 animate-bounce cursor-pointer" onClick={scrollToCategories}>
     <svg 
       className="w-10 h-10 text-amber-400 drop-shadow-lg" 
       fill="none" 
       stroke="currentColor" 
       viewBox="0 0 24 24" 
       xmlns="http://www.w3.org/2000/svg"
     >
       <path 
         strokeLinecap="round" 
         strokeLinejoin="round" 
         strokeWidth="2" 
         d="M19 14l-7 7m0 0l-7-7m7 7V3"
       >
       </path>
     </svg>
   </div>
  )
}
