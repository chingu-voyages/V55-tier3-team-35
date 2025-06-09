import { ArrowRight } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import ChartCard from './ChartCard';
import StarryBackground from './StarryBackground';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <StarryBackground count={20} />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-8 nebula-pill">
            <CreditCard className="w-4 h-4 mr-2" />
            <span>Smart financial tracking for students</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 glow-text text-white">
            Track Expenses. Build Habits. <br />
            <span className="text-white">Reach for the Stars.</span>
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-2xl">
            The student-friendly finance tracker that makes expense tracking and
            budget projection easy, intuitive, and visually engaging with a
            cosmic twist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              className="bg-white text-black px-8 py-6 text-lg hover:bg-gray-200 transition-colors"
              onClick={() => {
                navigate('/register');
              }}
            >
              Start Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <ChartCard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
