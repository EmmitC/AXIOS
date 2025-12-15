import React from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { useTheme } from '../../context/ThemeContext';
import { languages } from '../../data/products';

const LanguageDropdown: React.FC = () => {
  const { language, setLanguage } = useTheme();

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all">
          <Globe className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#0d0d0d] border-2 border-[#1a1a1a] min-w-[200px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={`cursor-pointer font-['Roboto_Condensed'] text-white hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] ${
              language === lang.code ? 'bg-[#1a1a1a] border-l-2 border-[#e50914]' : ''
            }`}
          >
            <span className="mr-3 text-lg">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
