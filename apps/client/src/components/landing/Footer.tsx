import { Target } from 'lucide-react';

import GitHub from '@/components/icons/GitHub';

const teamMembers = [
  {
    name: 'Syed Affan',
    github: 'http://github.com/affan880',
  },
  {
    name: 'Dorene St.Marthe',
    github: 'https://github.com/Dorene-StMarthe',
  },
  {
    name: 'Steffi Saint-Pierre',
    github: 'https://github.com/stefley1509',
  },
  {
    name: 'Shaimaa',
    github: 'https://github.com/Shaimaa01',
  },
  {
    name: 'Jack Li',
    github: 'https://github.com/jackli921',
  },
  {
    name: 'Michael',
    github: 'https://github.com/kayoMichael',
  },
];

const Footer = () => {
  return (
    <footer id="team" className="pt-16 pb-12 bg-[#0F0F0F]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column - Brand section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">FinTrack</h2>
            </div>
            <p className="text-white/70 mb-8 max-w-md leading-relaxed">
              Making financial management simple, intuitive, and effective for
              students. Track expenses, set budgets, and achieve your financial
              goals.
            </p>

            <a
              href="https://github.com/chingu-voyages/V55-tier3-team-35"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 bg-[#1A1A1A] hover:bg-[#222] rounded-lg text-white transition-all duration-300"
            >
              <GitHub className="w-5 h-5" />
              <span>Project Repository</span>
            </a>
          </div>

          {/* Right column - Team & Links */}
          <div>
            <h3 className="text-xl text-white font-semibold mb-6">Team</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <div className="flex items-center gap-2 p-1.5 rounded-md transition-all duration-200 group-hover:bg-white/10">
                    <a
                      className="flex gap-1 items-center"
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <GitHub className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
                      <span className="text-white">{member.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 text-center text-white/50 text-sm">
          © 2025 FinTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
