'use client';
import React, { useState, useEffect } from 'react';
import { Cat } from '@/types/Cat';
import CatCard from '@/components/cat/catCard';

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const catsPerPage = 6; // Number of cats per page

  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      try {
        // Use the API's pagination parameters
        // page (0-based index) and limit parameters
        const response = await fetch(
          `https://api.thecatapi.com/v1/breeds?page=${currentPage - 1}&limit=${catsPerPage}`, 
          {
            headers: {
              'x-api-key': 'DEMO-API-KEY'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch cats');
        }
        
        const data = await response.json();
        setCats(data);
        
        // Get total count from headers if available
        const totalCount = response.headers.get('pagination-count') || '0';
        const calculatedTotalPages = Math.ceil(parseInt(totalCount) / catsPerPage);
        
        // Fallback if header is not available - estimate based on API knowledge
        // TheCatAPI has about 67 breeds total
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 11);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCats();
  }, [currentPage, catsPerPage]); // Re-fetch when page changes
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading cats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Cat Breeds</h1>
        
        {/* Display current page information */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing page {currentPage} of {totalPages}
          </p>
        </div>
        
        {/* Cat cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
        
        {/* Show message if no cats found */}
        {cats.length === 0 && !loading && (
          <div className="text-center text-gray-600 my-12">
            No cats found on this page.
          </div>
        )}
        
        {/* Pagination controls */}
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {/* Page numbers */}
            <div className="hidden md:flex">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                        currentPage === page
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))
              }
            </div>

            {/* Mobile page indicator */}
            <span className="relative md:hidden inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              {currentPage} / {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </main>
  );
}