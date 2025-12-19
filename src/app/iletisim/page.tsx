"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useRef } from "react";

export default function IletisimPage() {
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  
  const subjectOptions = [
    { value: "urun", label: "Ürün Bilgisi" },
    { value: "teknik", label: "Teknik Destek" },
    { value: "satis", label: "Satış" },
    { value: "isbirligi", label: "İş Birliği" },
    { value: "diger", label: "Diğer" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-[200vh] bg-white">
      <Header theme="light" />
      
      {/* Hero Image with Text */}
      <div className="w-full pt-12 relative">
        <Image
          src="/gradyan1.png"
          alt="Gradient"
          width={1920}
          height={600}
          className="w-full h-auto"
          priority
        />
        
        {/* Hero Title */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: '100px' }}>
          <h1 className="text-5xl md:text-6xl font-semibold text-black">
            TayTech ile iletişim
          </h1>
        </div>
      </div>

      {/* İletişim Formu */}
      <div 
        style={{ 
          paddingLeft: '300px', 
          paddingRight: '300px',
          marginTop: '-80px',
          marginBottom: '50px'
        }}
      >
        {/* Form Üstü Açıklama */}
        <p style={{ 
          fontSize: '18px', 
          fontWeight: 450, 
          color: 'rgb(29, 29, 31)', 
          lineHeight: '1.5',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          Süreçlerinizi optimize etmek, enerji verimliliğinizi artırmak ve işletmenizi akıllı teknolojilerle donatmak için doğru adrestesiniz.<br />
          Taytech uzmanlığıyla tanışmak ve teknik detayları görüşmek için formu doldurabilir veya doğrudan bize ulaşabilirsiniz.
        </p>

        <div 
          ref={formRef}
          className="bg-[rgb(245,245,247)] rounded-xl border border-[rgb(210,210,215)]"
          style={{ padding: '50px 70px' }}
        >
          <h2 
            className="text-2xl font-medium text-center"
            style={{ color: 'rgb(29, 29, 31)', marginBottom: '40px' }}
          >
            İletişim Formu
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {/* Ad Soyad */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgb(29, 29, 31)',
                    backgroundColor: 'white',
                    border: '1px solid rgb(210, 210, 215)',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(29, 29, 31)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgb(210, 210, 215)'}
                />
              </div>
              
              {/* E-posta */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                  E-posta
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgb(29, 29, 31)',
                    backgroundColor: 'white',
                    border: '1px solid rgb(210, 210, 215)',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(29, 29, 31)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgb(210, 210, 215)'}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {/* Telefon */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                  Telefon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgb(29, 29, 31)',
                    backgroundColor: 'white',
                    border: '1px solid rgb(210, 210, 215)',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(29, 29, 31)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgb(210, 210, 215)'}
                />
              </div>
              
              {/* Şirket */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                  Şirket
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgb(29, 29, 31)',
                    backgroundColor: 'white',
                    border: '1px solid rgb(210, 210, 215)',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(29, 29, 31)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgb(210, 210, 215)'}
                />
              </div>
            </div>

            {/* Konu - Custom Dropdown */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                Konu
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: formData.subject ? 'rgb(29, 29, 31)' : 'rgb(142, 142, 147)',
                    backgroundColor: 'white',
                    border: `1px solid ${isSubjectOpen ? 'rgb(29, 29, 31)' : 'rgb(210, 210, 215)'}`,
                    borderRadius: isSubjectOpen ? '10px 10px 0 0' : '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <span>{formData.subject ? subjectOptions.find(o => o.value === formData.subject)?.label : 'Seçiniz'}</span>
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                    style={{ 
                      transform: isSubjectOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="rgb(142, 142, 147)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {isSubjectOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid rgb(29, 29, 31)',
                    borderTop: 'none',
                    borderRadius: '0 0 10px 10px',
                    overflow: 'hidden',
                    zIndex: 10
                  }}>
                    {subjectOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setFormData({...formData, subject: option.value});
                          setIsSubjectOpen(false);
                        }}
                        style={{
                          padding: '12px 14px',
                          fontSize: '15px',
                          fontWeight: 400,
                          color: 'rgb(29, 29, 31)',
                          cursor: 'pointer',
                          backgroundColor: formData.subject === option.value ? 'rgb(245, 245, 247)' : 'white',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgb(245, 245, 247)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = formData.subject === option.value ? 'rgb(245, 245, 247)' : 'white'}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mesaj */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                Mesajınız
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'rgb(29, 29, 31)',
                  backgroundColor: 'white',
                  border: '1px solid rgb(210, 210, 215)',
                  borderRadius: '10px',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgb(29, 29, 31)'}
                onBlur={(e) => e.target.style.borderColor = 'rgb(210, 210, 215)'}
              />
            </div>

            {/* Gönder Butonu */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: 'rgb(29, 29, 31)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 450,
                  padding: '12px 40px',
                  borderRadius: '980px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgb(50, 50, 54)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgb(29, 29, 31)'}
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Description Text */}
      <div style={{ paddingLeft: '300px', paddingRight: '300px', marginBottom: '20px' }}>
        <p style={{ fontSize: '24px', fontWeight: 550, color: 'rgb(29, 29, 31)', lineHeight: '1.4' }}>
          Taytech ürünleri, servisleri veya iş birliği fırsatları hakkında<br />
          bilgi almak için ekibimize ulaşın.
        </p>
      </div>

      {/* Content Box */}
      <div style={{ paddingLeft: '300px', paddingRight: '300px', paddingBottom: '40px' }}>
        <div 
          className="bg-[rgb(245,245,247)] rounded-xl border border-[rgb(210,210,215)] p-12"
          style={{ minHeight: '800px' }}
        >
          <h2 
            className="text-3xl font-medium text-center"
            style={{ color: 'rgb(29, 29, 31)', marginTop: '50px' }}
          >
            Kurumsal Bilgiler
          </h2>
          
          {/* İletişim Bilgileri */}
          <div className="text-center" style={{ color: 'rgb(29, 29, 31)', marginTop: '50px' }}>
            {/* Şirket Adı */}
            <div style={{ marginBottom: '35px' }}>
              <p style={{ fontSize: '18px', fontWeight: 500 }}>Taytech Otomasyon ve Bilişim A.Ş.</p>
            </div>
            
            {/* Merkez */}
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Merkez</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>Ataşehir Atatürk, Ataşehir Bulvarı No:16/53</p>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>Ataşehir, İstanbul</p>
            </div>
            
            {/* Telefon */}
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Telefon</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>(0262) 502 51 49</p>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>(0262) 502 51 50</p>
            </div>
            
            {/* Fax */}
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Fax</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>(0262) 502 51 52</p>
            </div>
            
            {/* E-mail */}
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>E-mail</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>info@taytech.com.tr</p>
            </div>
            
            {/* Fabrika */}
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Fabrika</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>İnönü Mahallesi Gebze Plastikçiler OSB</p>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>Atatürk Bulvarı No:7/2</p>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>Gebze/KOCAELİ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bizi Ziyaret Edin */}
      <div style={{ paddingLeft: '300px', paddingRight: '300px', marginTop: '40px', marginBottom: '20px' }}>
        <p style={{ fontSize: '24px', fontWeight: 550, color: 'rgb(29, 29, 31)', textAlign: 'left' }}>
          Bizi Ziyaret Edin
        </p>
      </div>

      {/* Harita */}
      <div style={{ paddingLeft: '300px', paddingRight: '300px', paddingBottom: '64px' }}>
        <div 
          className="bg-[rgb(245,245,247)] rounded-xl border border-[rgb(210,210,215)] overflow-hidden"
        >
          <iframe
            src="https://www.google.com/maps?q=İnönü+Mahallesi+Atatürk+Bulvarı+No:7+D:2+Gebze+Kocaeli+Taytech&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Footer */}
      <Footer theme="light" />
    </div>
  );
}
