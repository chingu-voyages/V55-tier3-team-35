import { Target } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    className={cn(
      'text-white/80 hover:text-white transition-colors font-medium',
      className,
    )}
  >
    {children}
  </a>
);

const Nav = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed w-full top-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">FinTrack</h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <NavLink href="#cta">Get Started</NavLink>
          <NavLink href="#team">Team</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className=" md:flex text-white hover:text-gray-300 transition-colors"
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          <Button
            className="bg-white text-black hover:bg-gray-200 transition-colors"
            onClick={() => navigate('/register')}
          >
            Sign Up Free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
