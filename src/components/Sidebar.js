import React, { useState } from 'react';

// --- Icon Placeholders (Assuming these would be imported from a library like lucide-react or react-icons) ---
const HomeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const TVIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>;
const MovieIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>;
const SparkleIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ListIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const SettingsIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44C9.72 2 8 3.73 8 5.83v.35c-1.33.8-2.5 2.15-3.32 3.73-.83 1.6-1.18 3.39-1.07 5.17.11 1.78.69 3.48 1.7 4.88s2.32 2.47 3.9 3.09c1.58.62 3.35.8 5.09.47 1.74-.33 3.36-1.18 4.6-2.45 1.25-1.27 2.07-2.9 2.4-4.66.33-1.76.15-3.54-.47-5.12-.62-1.58-1.84-2.83-3.32-3.63v-.35C16 3.73 14.28 2 12.22 2z"/><circle cx="12" cy="12" r="3"/></svg>;
// ------------------------------------------------------------------------------------------------------------------

const navItems = [
    { name: 'Home', icon: HomeIcon, path: '/', isActive: true },
    { name: 'TV Shows', icon: TVIcon, path: '/tv-shows', isActive: false },
    { name: 'Movies', icon: MovieIcon, path: '/movies', isActive: false },
    { name: 'New & Popular', icon: SparkleIcon, path: '/latest', isActive: false },
    { name: 'My List', icon: ListIcon, path: '/my-list', isActive: false },
];

const Sidebar = () => {
    // State to control expansion on hover
    const [isExpanded, setIsExpanded] = useState(false);

    const baseWidth = 'w-16'; // Collapsed width (icons only)
    const expandedWidth = 'w-56'; // Expanded width
    const transitionClass = 'transition-all duration-300 ease-in-out';

    const handleMouseEnter = () => setIsExpanded(true);
    const handleMouseLeave = () => setIsExpanded(false);

    return (
        // The sidebar is fixed, sticky to the left, visible only on large screens (lg:)
        <nav
            className={`hidden lg:block fixed left-0 top-0 h-full bg-black/90 text-white z-40 p-4 pt-24 shadow-2xl 
                ${isExpanded ? expandedWidth : baseWidth} 
                ${transitionClass}
                border-r border-gray-800
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Primary navigation"
        >
            <ul className="space-y-4 mt-6">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <a
                            href={item.path}
                            className={`flex items-center p-2 rounded-lg group text-sm font-medium
                                ${item.isActive 
                                    ? 'bg-red-700 hover:bg-red-600 text-white' 
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800/70'
                                }
                            `}
                        >
                            <item.icon className={`h-6 w-6 shrink-0 ${item.isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-500'}`} />
                            
                            {/* Text label, conditionally rendered based on expansion state */}
                            <span
                                className={`ml-4 whitespace-nowrap overflow-hidden ${transitionClass} 
                                    ${isExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-full w-0'}
                                `}
                            >
                                {item.name}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>

            {/* Footer/Utility link area */}
            <div className={`absolute bottom-4 left-4 ${isExpanded ? 'w-[calc(100%-2rem)]' : 'w-auto'}`}>
                <a 
                    href="/settings"
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-800/70 text-gray-300 hover:text-white group`}
                >
                    <SettingsIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-white" />

                    <span
                        className={`ml-4 whitespace-nowrap overflow-hidden ${transitionClass} 
                            ${isExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-full w-0'}
                            text-sm font-medium
                        `}
                    >
                        Settings & More
                    </span>
                </a>
            </div>
        </nav>
    );
};

export default Sidebar;