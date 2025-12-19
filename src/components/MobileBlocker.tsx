"use client";

export default function MobileBlocker() {
  return (
    <div className="h-screen bg-white text-black overflow-hidden fixed inset-0">
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full sm:w-10/12 md:w-8/12 text-center">
              {/* Selamlama - GIF'in üstünde */}
              <p className="text-black text-lg sm:text-xl md:text-2xl font-medium mb-4 px-4"
                 style={{ fontFamily: "'Neue Haas Display', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
                Seyrani Bey, Tayfun Bey, merhabalar efenim 😄 Masaüstünden deneyin, umarım beğenirsiniz yeni sitenizi.
              </p>

              <div
                className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain"
                aria-hidden="true"
              />

              <div className="mt-[-50px]">
                <h3 className="text-xl sm:text-2xl md:text-3xl text-black font-light mb-4"
                    style={{ fontFamily: "'Neue Haas Display', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
                  Hop hop hemşerim, nereye böyle?
                </h3>
                <p className="mb-6 text-gray-600 sm:mb-5 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-4"
                   style={{ fontFamily: "'Neue Haas Display', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
                  Mobil sitemizi mükemmelleştiriyoruz, şu an biraz dağınık durumda.
                  <br />
                  Ama masaüstü sitemiz hazır, bilgisayardan gir de boyunu posunu görelim bi.
                </p>

                <div className="mt-8 sm:mt-12">
                  <p className="text-gray-500 text-sm"
                     style={{ fontFamily: "'Neue Haas Display', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
                    © 2024 TayTech - Tüm hakları saklıdır
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

