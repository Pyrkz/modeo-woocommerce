import Image from 'next/image';

const PaymentMethods = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-auto h-8">
        <Image
          src="/platnosci/loga.webp"
          alt="Akceptowane metody płatności: Visa, Apple Pay, Google Pay, Klarna, Mastercard, PayPal"
          width={200}
          height={32}
          className="h-8 w-auto object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PaymentMethods;