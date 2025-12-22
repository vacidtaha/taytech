"use client";

export default function MobileBlocker() {
  return (
    <div className="h-screen bg-white text-black overflow-hidden fixed inset-0">
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full sm:w-10/12 md:w-8/12 text-center">
              <div
                className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain"
                aria-hidden="true"
              />

              <div className="mt-[-50px]">
                <h3 className="text-xl sm:text-2xl md:text-3xl text-[#1d1d1f] font-semibold mb-4"
                    style={{ fontFamily: "'Neue Haas Display', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
                  Mobil Deneyim Yakında
                </h3>
                <p className="mb-6 text-[#86868b] sm:mb-5 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-4"
                   style={{ fontFamily: "'Neue Haas Display', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
                  Mobil sitemiz şu anda geliştirme aşamasındadır.
                  <br />
                  En iyi deneyim için lütfen masaüstü cihazdan ziyaret edin.
                </p>

                <div className="mt-8 sm:mt-12">
                  <p className="text-[#86868b] text-sm"
                     style={{ fontFamily: "'Neue Haas Display', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
                    © 2024 Taytech - Tüm hakları saklıdır
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


