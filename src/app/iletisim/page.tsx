"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import emailjs from "@emailjs/browser";

// ============================================================
// EmailJS Yapılandırması
// 1. https://www.emailjs.com adresine gidip ücretsiz hesap açın
// 2. Email Services > Add New Service > Gmail veya SMTP ile info@taytech.com.tr bağlayın
// 3. Email Templates > Create New Template ile şablon oluşturun
//    Şablonda şu değişkenleri kullanın:
//    {{from_name}}, {{from_email}}, {{phone}}, {{company}}, {{subject}}, {{message}}
// 4. Aşağıdaki 3 değeri kendi hesabınızdan alın:
// ============================================================
const EMAILJS_SERVICE_ID = "service_taytech";     // Email Services sayfasından
const EMAILJS_TEMPLATE_ID = "template_contact";   // Email Templates sayfasından
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";      // Account > API Keys > Public Key

export default function IletisimPage() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  
  const subjectOptions = [
    { value: "urun", label: t("contact.subject.urun") },
    { value: "teknik", label: t("contact.subject.teknik") },
    { value: "satis", label: t("contact.subject.satis") },
    { value: "isbirligi", label: t("contact.subject.isbirligi") },
    { value: "diger", label: t("contact.subject.diger") }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("sending");
    
    try {
      const subjectLabel = subjectOptions.find(o => o.value === formData.subject)?.label || formData.subject;
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: subjectLabel,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
      
      // 5 saniye sonra başarı mesajını kaldır
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-[200vh] bg-white">
      
      {/* Hero Image with Text */}
      <div className="w-full pt-12 relative">
        <Image
          src="/gradyan1.png"
          alt="Gradient"
          width={1920}
          height={600}
          className="w-full h-auto"
          style={{ filter: 'hue-rotate(140deg) saturate(1.2)' }}
          priority
        />
        
        {/* Hero Title */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: '100px' }}>
          <h1 className="text-5xl md:text-6xl font-semibold text-black">
            {t("contact.hero")}
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
          {t("contact.intro")}<br />
          {t("contact.intro2")}
        </p>

        <div 
          className="bg-[rgb(245,245,247)] rounded-xl border border-[rgb(210,210,215)]"
          style={{ padding: '50px 70px' }}
        >
          <h2 
            className="text-2xl font-medium text-center"
            style={{ color: 'rgb(29, 29, 31)', marginBottom: '40px' }}
          >
            {t("contact.formTitle")}
          </h2>

          {/* Başarı Mesajı */}
          {status === "success" && (
            <div style={{
              padding: "16px 24px",
              backgroundColor: "#dcfce7",
              border: "1px solid #86efac",
              borderRadius: "12px",
              marginBottom: "24px",
              textAlign: "center"
            }}>
              <p style={{ color: "#166534", fontSize: "15px", fontWeight: 500 }}>
                ✓ {t("contact.success")}
              </p>
            </div>
          )}

          {/* Hata Mesajı */}
          {status === "error" && (
            <div style={{
              padding: "16px 24px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fca5a5",
              borderRadius: "12px",
              marginBottom: "24px",
              textAlign: "center"
            }}>
              <p style={{ color: "#991b1b", fontSize: "15px", fontWeight: 500 }}>
                ✕ {t("contact.error")}
              </p>
            </div>
          )}
          
          <form ref={formRef} onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {/* Ad Soyad */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                  {t("contact.name")} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{
                    width: '100%', padding: '12px 14px', fontSize: '15px', fontWeight: 400,
                    color: 'rgb(29, 29, 31)', backgroundColor: 'white',
                    border: '1px solid rgb(210, 210, 215)', borderRadius: '10px',
                    outline: 'none', transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(29, 29, 31)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgb(210, 210, 215)'}
                />
              </div>
              
              {/* E-posta */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                  {t("contact.email")} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    width: '100%', padding: '12px 14px', fontSize: '15px', fontWeight: 400,
                    color: 'rgb(29, 29, 31)', backgroundColor: 'white',
                    border: '1px solid rgb(210, 210, 215)', borderRadius: '10px',
                    outline: 'none', transition: 'border-color 0.2s ease'
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
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    width: '100%', padding: '12px 14px', fontSize: '15px', fontWeight: 400,
                    color: 'rgb(29, 29, 31)', backgroundColor: 'white',
                    border: '1px solid rgb(210, 210, 215)', borderRadius: '10px',
                    outline: 'none', transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(29, 29, 31)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgb(210, 210, 215)'}
                />
              </div>
              
              {/* Şirket */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                  {t("contact.company")}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{
                    width: '100%', padding: '12px 14px', fontSize: '15px', fontWeight: 400,
                    color: 'rgb(29, 29, 31)', backgroundColor: 'white',
                    border: '1px solid rgb(210, 210, 215)', borderRadius: '10px',
                    outline: 'none', transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(29, 29, 31)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgb(210, 210, 215)'}
                />
              </div>
            </div>

            {/* Konu */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgb(29, 29, 31)', marginBottom: '6px' }}>
                {t("contact.subject")}
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                  style={{
                    width: '100%', padding: '12px 14px', fontSize: '15px', fontWeight: 400,
                    color: formData.subject ? 'rgb(29, 29, 31)' : 'rgb(142, 142, 147)',
                    backgroundColor: 'white',
                    border: `1px solid ${isSubjectOpen ? 'rgb(29, 29, 31)' : 'rgb(210, 210, 215)'}`,
                    borderRadius: isSubjectOpen ? '10px 10px 0 0' : '10px',
                    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <span>{formData.subject ? subjectOptions.find(o => o.value === formData.subject)?.label : t("contact.subjectPlaceholder")}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ transform: isSubjectOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
                  >
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="rgb(142, 142, 147)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {isSubjectOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0,
                    backgroundColor: 'white', border: '1px solid rgb(29, 29, 31)',
                    borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden', zIndex: 10
                  }}>
                    {subjectOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => { setFormData({...formData, subject: option.value}); setIsSubjectOpen(false); }}
                        style={{
                          padding: '12px 14px', fontSize: '15px', fontWeight: 400, color: 'rgb(29, 29, 31)',
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
                {t("contact.message")} *
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={5}
                style={{
                  width: '100%', padding: '12px 14px', fontSize: '15px', fontWeight: 400,
                  color: 'rgb(29, 29, 31)', backgroundColor: 'white',
                  border: '1px solid rgb(210, 210, 215)', borderRadius: '10px',
                  outline: 'none', resize: 'vertical', transition: 'border-color 0.2s ease', fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgb(29, 29, 31)'}
                onBlur={(e) => e.target.style.borderColor = 'rgb(210, 210, 215)'}
              />
            </div>

            {/* Gönder */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  backgroundColor: status === "sending" ? 'rgb(142, 142, 147)' : 'rgb(29, 29, 31)',
                  color: 'white', fontSize: '16px', fontWeight: 450,
                  padding: '12px 40px', borderRadius: '980px', border: 'none',
                  cursor: status === "sending" ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease',
                  minWidth: '180px'
                }}
                onMouseOver={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = 'rgb(50, 50, 54)'; }}
                onMouseOut={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = 'rgb(29, 29, 31)'; }}
              >
                {status === "sending" ? t("contact.sending") : t("contact.send")}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CTA */}
      <div style={{ paddingLeft: '300px', paddingRight: '300px', marginBottom: '20px' }}>
        <p style={{ fontSize: '24px', fontWeight: 550, color: 'rgb(29, 29, 31)', lineHeight: '1.4' }}>
          {t("contact.cta")}
        </p>
      </div>

      {/* Kurumsal Bilgiler */}
      <div style={{ paddingLeft: '300px', paddingRight: '300px', paddingBottom: '40px' }}>
        <div 
          className="bg-[rgb(245,245,247)] rounded-xl border border-[rgb(210,210,215)] p-12"
          style={{ minHeight: '800px' }}
        >
          <h2 
            className="text-3xl font-medium text-center"
            style={{ color: 'rgb(29, 29, 31)', marginTop: '50px' }}
          >
            {t("contact.corporate")}
          </h2>
          
          <div className="text-center" style={{ color: 'rgb(29, 29, 31)', marginTop: '50px' }}>
            <div style={{ marginBottom: '35px' }}>
              <p style={{ fontSize: '18px', fontWeight: 500 }}>{t("contact.companyName")}</p>
            </div>
            
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>{t("contact.hq")}</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>{t("contact.hqAddr1")}</p>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>{t("contact.hqAddr2")}</p>
            </div>
            
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>{t("contact.phoneLabel")}</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>{t("contact.phone1")}</p>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>{t("contact.phone2")}</p>
            </div>
            
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>{t("contact.fax")}</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>{t("contact.faxNum")}</p>
            </div>
            
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>{t("contact.emailLabel")}</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>{t("contact.emailAddr")}</p>
            </div>
            
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>{t("contact.factory")}</h3>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>{t("contact.factoryAddr1")}</p>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>{t("contact.factoryAddr2")}</p>
              <p style={{ fontSize: '18px', fontWeight: 450 }}>{t("contact.factoryAddr3")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bizi Ziyaret Edin */}
      <div style={{ paddingLeft: '300px', paddingRight: '300px', marginTop: '40px', marginBottom: '20px' }}>
        <p style={{ fontSize: '24px', fontWeight: 550, color: 'rgb(29, 29, 31)', textAlign: 'left' }}>
          {t("contact.visit")}
        </p>
      </div>

      {/* Harita */}
      <div style={{ paddingLeft: '300px', paddingRight: '300px', paddingBottom: '64px' }}>
        <div className="bg-[rgb(245,245,247)] rounded-xl border border-[rgb(210,210,215)] overflow-hidden">
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

      <Footer theme="light" />
    </div>
  );
}
