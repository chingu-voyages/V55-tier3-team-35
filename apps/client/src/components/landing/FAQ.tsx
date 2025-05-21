import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is FinTrack really free?',
    answer:
      'Yes! FinTrack is completely free for all users. We believe in making financial tools accessible to all students.',
  },
  {
    question: 'How secure is my financial data?',
    answer:
      'Your data is encrypted using bank-level security standards. We never sell your personal information and you can export or delete your data at any time.',
  },
  {
    question: 'Can I connect my bank account?',
    answer:
      'Yes, FinTrack can securely connect to thousands of financial institutions for automatic transaction importing.',
  },
  {
    question: 'Is there a mobile app?',
    answer:
      "Not yet — but possibly in the future! We're exploring the idea of launching a mobile app for iOS and Android so you can track your finances on the go. Stay tuned!",
  },
  {
    question: 'How is FinTrack different from other financial apps?',
    answer:
      'FinTrack  is specifically designed for students with an intuitive interface, student-specific categories, and budget templates tailored to student life. Plus, our cosmic theme makes finance actually fun!',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-70" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need to know about FinTrack
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="cosmic-card border border-white/10 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-white hover:text-gray-300 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
