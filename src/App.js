import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound'; // Assuming you'll create this later

/**
 * Main application component.
 * Sets up routing and the main layout structure (Header + Content).
 *
 * @returns {JSX.Element} The main application layout.
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        
        {/* Header (fixed at the top for navigation/logo) */}
        <Header />

        <main className="pt-16"> {/* Add padding equal to the header height */}
          <div className="flex">
            
            {/* Sidebar (Main navigation, typically hidden on mobile) */}
            {/* Note: In a true Netflix clone, the sidebar might only appear on hover/menu click. 
               We include it here for structure, but it might be integrated differently later. */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 p-4 md:p-6 lg:p-8">
              <Routes>
                {/* Home/Dashboard - The main browsing page */}
                <Route path="/" element={<Dashboard />} />
                
                {/* Future Routes (e.g., Movie details, TV show details, My List) */}
                {/* <Route path="/browse/:category" element={<BrowsePage />} /> */}
                {/* <Route path="/title/:id" element={<DetailsPage />} /> */}
                {/* <Route path="/mylist" element={<MyListPage />} /> */}

                {/* 404 Not Found Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;