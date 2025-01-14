import { Github, Linkedin, GalleryHorizontalEnd } from 'lucide-react';

interface FooterProps {
    linkedinUrl?: string;
    githubUrl?: string;
}

export function Footer({
    linkedinUrl = "https://linkedin.com/in/smg-web-dev",
    githubUrl = "https://github.com/SMG-web-dev"
}: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto bg-forest-950 border-t border-forest-800/50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Branding Section */}
                    <div className="space-y-4 col-span-2">
                        <div className="flex items-center space-x-2">
                            <GalleryHorizontalEnd className="w-6 h-6 text-forest-400" />
                            <span className="text-xl font-semibold text-forest-100">
                                Life Forms Analyzer
                            </span>
                        </div>
                        <p className="text-forest-300 text-sm leading-relaxed">
                            Powered by Google's Gemini Vision API.
                            Advanced specimen identification using state-of-the-art
                            artificial intelligence.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="space-y-4 md:text-right">
                        <h3 className="text-forest-100 font-semibold">Connect</h3>
                        <div className="flex space-x-4 md:justify-end">
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group transition-transform duration-300 hover:scale-110"
                            >
                                <div className="p-3 rounded-full bg-forest-800/50 backdrop-blur-sm 
                            transition-all duration-300 group-hover:bg-forest-700/50 
                            group-hover:shadow-lg group-hover:shadow-forest-500/10">
                                    <Github className="w-5 h-5 text-forest-400 transition-colors 
                                 duration-300 group-hover:text-forest-300" />
                                </div>
                            </a>
                            <a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group transition-transform duration-300 hover:scale-110"
                            >
                                <div className="p-3 rounded-full bg-forest-800/50 backdrop-blur-sm 
                            transition-all duration-300 group-hover:bg-forest-700/50 
                            group-hover:shadow-lg group-hover:shadow-forest-500/10">
                                    <Linkedin className="w-5 h-5 text-forest-400 transition-colors 
                                   duration-300 group-hover:text-forest-300" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-forest-800/50">
                    <div className="flex justify-center items-center">
                        <div className="text-sm text-forest-400">
                            © {currentYear} smg-dev. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

