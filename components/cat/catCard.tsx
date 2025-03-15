import React from 'react'
import { Card } from "@/components/ui/card";

import { Cat } from "@/types/Cat";
export default function catCard({cat}: {cat: Cat}) {
  return (
    <Card key={cat.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9">
                {cat.image?.url ? (
                  <img
                    src={cat.image.url}
                    alt={cat.name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{cat.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{cat.description}</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Origin:</span> {cat.origin}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Temperament:</span> {cat.temperament}
                  </p>
                </div>
              </div>
            </Card>
  )
}
