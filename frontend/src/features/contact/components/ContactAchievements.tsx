'use client';

export function ContactAchievements() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-sm text-red-600 font-semibold mb-3 tracking-wider uppercase">
            Nasze osiągnięcia
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Liczby, które mówią same za siebie
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Ponad 30 lat na rynku to nie tylko doświadczenie, ale przede wszystkim tysiące zadowolonych 
            klientów i miliony wyprodukowanych sztuk odzieży.
          </p>
        </div>

        {/* Google Maps */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.408832264095!2d19.129713113351627!3d50.80506357154383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710b5c737792e31%3A0x5339c91f1427b2d8!2sModeo%20s.c.%20Hurtownia%20Tekstylna!5e0!3m2!1spl!2spl!4v1756754498609!5m2!1spl!2spl"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[500px]"
            ></iframe>
          </div>
          
          {/* Map Info */}
          <div className="mt-8 text-center">
            <div className="rounded-xl p-6 max-w-lg mx-auto">
              <div className="flex items-center gap-3 justify-center mb-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-800 font-medium">
                  Modeo - Park Handlowy Warta, Krakowska 45 Częstochowa
                </span>
              </div>
              <button 
                onClick={() => window.open('https://maps.app.goo.gl/VwmMY9pkUP3RK8Md8', '_blank')}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                Otwórz w Google Maps →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}