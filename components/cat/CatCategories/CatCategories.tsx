'use client';
import React, { useState, useEffect } from 'react';
import { Cat } from '@/types/cat';
import CatDetailsCard from '@/components/cat/CatDetailsCard';

export default function CatCategoriesSection() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const catsPerPage = 12;

  // Selected cat for details view
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/breeds?page=${currentPage - 1}&limit=${catsPerPage}`,
          {
            headers: {
              'x-api-key': 'DEMO-API-KEY',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch cats');
        }

        const data = await response.json();
        setCats(data);

        const totalCount = response.headers.get('pagination-count') || '0';
        const calculatedTotalPages = Math.ceil(parseInt(totalCount) / catsPerPage);
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 6);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [currentPage, catsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectedCat(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatSelect = (cat: Cat) => {
    setSelectedCat(cat);
  };

  const handleBackToList = () => {
    setSelectedCat(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 flex items-center justify-center">
        <div className="text-xl text-yellow-400 animate-pulse">Loading cats... 🐾</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 flex items-center justify-center">
        <div className="text-xl text-red-300">Error: {error} 😿</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8" id="catCategory">
      <div className="max-w-7xl mx-auto">
        {selectedCat ? (
          // Details view
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-yellow-200">
            <button
              onClick={handleBackToList}
              className="mb-4 flex items-center text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span className="font-medium">Back to List</span>
            </button>

            <CatDetailsCard cat={selectedCat} />
          </div>
        ) : (
          // List view
          <>
            {/* Display current page information */}
            <div className="text-center mb-6">
              <p className="text-lg text-yellow-300 font-medium">
                Showing page {currentPage} of {totalPages} 🐱
              </p>
            </div>

            {/* Cat names grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cats.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleCatSelect(cat)}
                  className="bg-white p-5 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-yellow-100 hover:border-yellow-300"
                >
                  <h2 className="text-lg font-semibold text-gray-900 text-center">{cat.name}</h2>
                </div>
              ))}
            </div>

            {/* Show message if no cats found */}
            {cats.length === 0 && !loading && (
              <div className="text-center text-yellow-300 my-12 text-lg">
                No cats found on this page. 😿
              </div>
            )}

            {/* Pagination controls */}
            <div className="flex justify-center mt-10">
              <nav className="inline-flex rounded-lg shadow-lg bg-gray-800 p-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-yellow-200 bg-gray-700 text-sm font-medium text-yellow-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>

                {/* Page numbers */}
                <div className="hidden md:flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    )
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="relative inline-flex items-center px-4 py-2 border border-yellow-200 bg-gray-800 text-sm font-medium text-yellow-300">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`relative inline-flex items-center px-4 py-2 border border-yellow-200 text-sm font-medium ${
                            currentPage === page
                              ? 'bg-yellow-500 text-black'
                              : 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                          } transition-colors duration-200`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}
                </div>

                {/* Mobile page indicator */}
                <span className="relative md:hidden inline-flex items-center px-4 py-2 border border-yellow-200 bg-gray-800 text-sm font-medium text-yellow-300">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-4 py-2 rounded-r-lg border border-yellow-200 bg-gray-700 text-sm font-medium text-yellow-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </nav>
            </div>
          </>
        )}
      </div>
    </main>
  );
}