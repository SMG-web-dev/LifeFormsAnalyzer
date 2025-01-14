import { Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="relative bg-forest-900/50 border-b border-forest-800/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-forest-400/5 via-transparent to-forest-400/5" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/" className="flex items-center">
                            <div className="p-2 bg-forest-800/50 rounded-xl backdrop-blur-sm 
                              transition-all duration-300 hover:bg-forest-800/70 
                              group animate-pulse-soft">
                                <Microscope className="h-8 w-8 text-forest-400 transition-colors 
                                       duration-300 group-hover:text-forest-300" />
                            </div>
                            <h1 className="ml-3 text-2xl font-bold text-forest-100 
                             transition-all duration-300 hover:text-forest-50">
                                Life Forms Analyzer
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

