import { Sparkles, Star, BarChart3, Rocket, Tag, Wallet } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: <BarChart3 className="h-10 w-10 text-white" />,
    title: 'Smart Budget Forecasting',
    description:
      'AI-powered prediction of your spending patterns and future expenses based on your habits.',
  },
  {
    icon: <Sparkles className="h-10 w-10 text-white" />,
    title: 'Visual Financial Journey',
    description:
      'Beautiful cosmic-themed charts and graphs that make tracking your finances fun and insightful.',
  },
  {
    icon: <Tag className="h-10 w-10 text-white" />,
    title: 'Expense Categorization',
    description:
      'Automatically categorize your spending with smart tagging and custom categories.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-white" />,
    title: 'Financial Goals',
    description:
      'Set and track your financial goals with visual progress indicators and milestone celebrations.',
  },
  {
    icon: <Wallet className="h-10 w-10 text-white" />,
    title: 'Bill Reminders',
    description:
      'Never miss a payment with customizable notifications for upcoming bills and expenses.',
  },
  {
    icon: <Star className="h-10 w-10 text-white" />,
    title: '100% Free',
    description:
      'FinTrack is completely free to use. No hidden fees, no premium tiers, just a great financial tool for students.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-70" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Features
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Tools designed specifically for students to take control of their
            finances with ease and clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="cosmic-card border-white/10 overflow-hidden group hover:border-white/30 transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-white group-hover:text-gray-200 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70">
                  {feature.description}
                </CardDescription>
              </CardContent>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-white group-hover:w-full transition-all duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
