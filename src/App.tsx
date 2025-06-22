import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type College = {
  id: number;
  name: string;
  location: string;
  established: number;
  type: string;
  image: string;
};

const collegeData: College[] = [
  { id: 1, name: "University of Rajasthan", location: "Jaipur", established: 1947, type: "Public", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=500&h=300" },
  { id: 2, name: "Rajasthan Technical University", location: "Kota", established: 2006, type: "Technical", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=500&h=300" },
  { id: 3, name: "Maharana Pratap University of Agriculture and Technology", location: "Udaipur", established: 1999, type: "Agriculture", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=500&h=300" },
  { id: 4, name: "Jai Narain Vyas University", location: "Jodhpur", established: 1962, type: "Public", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=500&h=300" },
  { id: 5, name: "Mohanlal Sukhadia University", location: "Udaipur", established: 1962, type: "Public", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=500&h=300" },
  { id: 6, name: "Malaviya National Institute of Technology", location: "Jaipur", established: 1963, type: "Technical", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=500&h=300" },
];

const App: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>(collegeData);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  useEffect(() => {
    const filtered = collegeData.filter(college => 
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === 'All' || college.type === filter)
    );
    setColleges(filtered);
  }, [searchTerm, filter]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (type: string) => {
    setFilter(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-purple-100 font-sans">
      <header className="bg-white bg-opacity-90 shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">Rajasthan Education Portal</h1>
          <nav>
            <button className="px-4 py-2 text-purple-600 hover:text-purple-800">About</button>
            <button className="px-4 py-2 text-purple-600 hover:text-purple-800">Contact</button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 z-0"></div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 text-center"
          >
            <h2 className="text-5xl font-extrabold text-purple-900 mb-6 leading-tight">
              Discover Rajasthan's
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Top Colleges
              </span>
            </h2>
            <p className="text-xl text-purple-800 mb-8 max-w-2xl mx-auto">
              Explore a world of opportunities in higher education across the vibrant state of Rajasthan
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full sm:w-64"
              >
                <input
                  type="text"
                  placeholder="Search colleges..."
                  className="p-3 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none w-full shadow-md"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex gap-2 flex-wrap justify-center"
              >
                {['All', 'Public', 'Technical', 'Agriculture'].map(type => (
                  <button
                    key={type}
                    className={`px-4 py-2 rounded-full ${filter === type ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'} hover:bg-purple-700 hover:text-white transition-colors shadow-md`}
                    onClick={() => handleFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-orange-100 to-transparent"></div>
        </section>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {colleges.map(college => (
              <motion.div
                key={college.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedCollege(college)}
              >
                <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">{college.name}</h3>
                  <p className="text-gray-600"><span className="font-semibold">Location:</span> {college.location}</p>
                  <p className="text-gray-600"><span className="font-semibold">Established:</span> {college.established}</p>
                  <p className="text-gray-600"><span className="font-semibold">Type:</span> {college.type}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedCollege && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCollege(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-purple-700 mb-4">{selectedCollege.name}</h3>
              <img src={selectedCollege.image} alt={selectedCollege.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <p className="text-gray-700 mb-2"><span className="font-semibold">Location:</span> {selectedCollege.location}</p>
              <p className="text-gray-700 mb-2"><span className="font-semibold">Established:</span> {selectedCollege.established}</p>
              <p className="text-gray-700 mb-4"><span className="font-semibold">Type:</span> {selectedCollege.type}</p>
              <button
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => setSelectedCollege(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-white mt-8 py-4 text-center text-gray-600">
        <p>&copy; 2023 Rajasthan Government. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;