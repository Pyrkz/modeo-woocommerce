import Link from 'next/link';

const BrandSection = () => {
  const features = [
    'Bezpłatna dostawa od 200 zł',
    'Płatność BLIK i kartą',
    '14 dni na zwrot'
  ];

  return (
    <div className="md:col-span-1">
      <Link href="/" className="inline-block mb-4">
        <h3 className="text-2xl font-bold text-gray-900">Modeo</h3>
      </Link>
      <p className="text-gray-600 mb-4">
        Nowoczesny sklep internetowy z najlepszymi produktami w Polsce. 
        Szybka dostawa, bezpieczne płatności.
      </p>
      <div className="space-y-2 text-sm text-gray-600">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSection;