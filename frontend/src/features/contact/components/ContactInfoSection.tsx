'use client';

import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export function ContactInfoSection() {
  return (
    <div className="bg-transparent">
      {/* Header */}
      <div className="mb-12">
        <div className="text-sm text-red-600 font-semibold mb-3 tracking-wider uppercase">
          Informacje kontaktowe
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Modeo s.c. Hurtownia Tekstylna
        </h2>
      </div>

      {/* Contact Details */}
      <div className="space-y-10">
        {/* Address */}
        <div className="group">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Adres</h3>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 group-hover:bg-red-50 transition-colors duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
              <MapPinIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
            </div>
            <div className="text-gray-700 leading-relaxed text-lg">
              <div className="font-medium">Modeo - Park Handlowy Warta</div>
              <div>Krakowska 45</div>
              <div>42-202 Częstochowa</div>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="group">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Telefon</h3>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 group-hover:bg-red-50 transition-colors duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
              <PhoneIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
            </div>
            <a 
              href="tel:+48664733063" 
              className="text-red-600 hover:text-red-700 font-bold text-xl transition-colors duration-300"
            >
              +48 664 733 063
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Email</h3>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 group-hover:bg-red-50 transition-colors duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
              <EnvelopeIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
            </div>
            <a 
              href="mailto:sklep@modeo.pl" 
              className="text-red-600 hover:text-red-700 font-bold text-xl transition-colors duration-300"
            >
              sklep@modeo.pl
            </a>
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="mt-16">
        <div className="text-sm text-red-600 font-semibold mb-6 tracking-wider uppercase">
          Godziny otwarcia
        </div>
        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-200 hover:bg-white rounded-lg px-4 transition-colors duration-200">
            <span className="text-gray-800 font-medium">Poniedziałek</span>
            <span className="text-gray-900 font-bold">08:00 – 16:00</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 hover:bg-white rounded-lg px-4 transition-colors duration-200">
            <span className="text-gray-800 font-medium">Wtorek</span>
            <span className="text-gray-900 font-bold">08:00 – 16:00</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 hover:bg-white rounded-lg px-4 transition-colors duration-200">
            <span className="text-gray-800 font-medium">Środa</span>
            <span className="text-gray-900 font-bold">08:00 – 16:00</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 hover:bg-white rounded-lg px-4 transition-colors duration-200">
            <span className="text-gray-800 font-medium">Czwartek</span>
            <span className="text-gray-900 font-bold">08:00 – 16:00</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 hover:bg-white rounded-lg px-4 transition-colors duration-200">
            <span className="text-gray-800 font-medium">Piątek</span>
            <span className="text-gray-900 font-bold">08:00 – 16:00</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 hover:bg-red-50 rounded-lg px-4 transition-colors duration-200">
            <span className="text-gray-800 font-medium">Sobota</span>
            <span className="text-red-600 font-bold">Zamknięte</span>
          </div>
          <div className="flex justify-between py-2 hover:bg-red-50 rounded-lg px-4 transition-colors duration-200">
            <span className="text-gray-800 font-medium">Niedziela</span>
            <span className="text-red-600 font-bold">Zamknięte</span>
          </div>
        </div>
      </div>
    </div>
  );
}