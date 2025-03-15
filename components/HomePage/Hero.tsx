import React from 'react';
import Button from './Button';

export default function Hero() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/images/BackGround.jpg')" }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      <div className="text-center text-white p-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg text-yellow-300">
          Welcome to Cat Breeds
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md text-gray-100 mb-10">
          Discover fascinating felines from around the world and find your perfect companion.
        </p>

        {/* Arrow button to scroll to cats section */}
        <div className="cursor-pointer  inline-block animate-bounce mt-6">
          <div className="flex flex-col items-center">
          <p className="text-white font-medium mb-2 text-lg">Click Arrow</p>

          
            <Button />
            
          </div>
        </div>
      </div>
    </div>
  );
}