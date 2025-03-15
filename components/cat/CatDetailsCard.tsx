import React from 'react'
import { Card } from "@/components/ui/card";
import { Cat } from '@/types/cat';

export default function CatDetailsCard({cat}: {cat: Cat}) {
  return (
    <Card 
      key={cat.id} 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-sm mx-auto sm:mx-0 sm:max-w-none sm:w-full md:max-w-md lg:max-w-lg"
    >
      <div className="aspect-w-16 aspect-h-9">
        {cat.image?.url ? (
          <img
            src={cat.image.url}
            alt={cat.name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
        ) : (
          <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm sm:text-base">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{cat.name}</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">{cat.description}</p>
        <div className="space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm text-gray-500">
            <span className="font-medium">Origin:</span> {cat.origin}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            <span className="font-medium">Temperament:</span> {cat.temperament}
          </p>
        </div>
      </div>
    </Card>
  )
}