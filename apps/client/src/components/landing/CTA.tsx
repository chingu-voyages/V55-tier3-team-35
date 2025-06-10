import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import StarryBackground from './StarryBackground';

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section id="cta" className="py-20 relative">
      <StarryBackground count={7} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center cosmic-card p-12 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Navigate Your Financial Universe?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students already using FinTrack to track
              expenses, build healthy money habits, and reach their financial
              goals.
            </p>
            <Button
              className="bg-white text-black px-8 py-6 text-lg hover:bg-gray-200 transition-opacity"
              onClick={() => {
                navigate('/register');
              }}
            >
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
