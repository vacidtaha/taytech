# TayTech Website - Sunucu Kurulum Rehberi

Bu rehber, TayTech web sitesini sıfırdan bir VPS veya sunucuya nasıl kuracağınızı adım adım anlatmaktadır.

---

## 📋 İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Sunucu Hazırlığı](#sunucu-hazırlığı)
3. [Node.js Kurulumu](#nodejs-kurulumu)
4. [Proje Kurulumu](#proje-kurulumu)
5. [PM2 ile Uygulama Yönetimi](#pm2-ile-uygulama-yönetimi)
6. [Nginx Reverse Proxy Kurulumu](#nginx-reverse-proxy-kurulumu)
7. [SSL Sertifikası (HTTPS)](#ssl-sertifikası-https)
8. [Domain Yönlendirme](#domain-yönlendirme)
9. [Güncelleme İşlemleri](#güncelleme-işlemleri)
10. [Sorun Giderme](#sorun-giderme)

---

## Gereksinimler

### Minimum Sunucu Özellikleri
- **RAM:** 1 GB (Önerilen: 2 GB)
- **CPU:** 1 vCPU (Önerilen: 2 vCPU)
- **Disk:** 20 GB SSD
- **İşletim Sistemi:** Ubuntu 22.04 LTS (Önerilen)

### Yazılım Gereksinimleri
- Node.js 20.x veya üzeri
- npm 10.x veya üzeri
- Nginx
- PM2 (Process Manager)
- Git

---

## Sunucu Hazırlığı

### 1. Sunucuya SSH ile Bağlanma

```bash
ssh root@SUNUCU_IP_ADRESI
```

### 2. Sistemi Güncelleme

```bash
apt update && apt upgrade -y
```

### 3. Gerekli Paketleri Yükleme

```bash
apt install -y curl wget git build-essential
```

### 4. Yeni Kullanıcı Oluşturma (Güvenlik için önerilir)

```bash
# Yeni kullanıcı oluştur
adduser taytech

# Sudo yetkisi ver
usermod -aG sudo taytech

# Yeni kullanıcıya geç
su - taytech
```

---

## Node.js Kurulumu

### NodeSource Kullanarak Node.js 20.x Kurulumu

```bash
# NodeSource repository ekle
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Node.js kur
sudo apt install -y nodejs

# Versiyonları kontrol et
node --version  # v20.x.x olmalı
npm --version   # 10.x.x olmalı
```

---

## Proje Kurulumu

### 1. Proje Dizini Oluşturma

```bash
# Web uygulamaları için dizin oluştur
sudo mkdir -p /var/www/taytech
sudo chown -R $USER:$USER /var/www/taytech
cd /var/www/taytech
```

### 2. Proje Dosyalarını Sunucuya Aktarma

#### Seçenek A: Git ile (Önerilen)

Eğer projeniz GitHub/GitLab'da ise:

```bash
git clone https://github.com/KULLANICI_ADI/taytech.git .
```

#### Seçenek B: SCP ile Lokal Bilgisayardan

Lokal bilgisayarınızda (Mac/Linux terminal):

```bash
# Proje klasörünüzün olduğu yerde çalıştırın
scp -r /Users/tahavacid/Desktop/taytech/* taytech@SUNUCU_IP:/var/www/taytech/
```

#### Seçenek C: SFTP ile (FileZilla vb.)

1. FileZilla'yı açın
2. Host: `SUNUCU_IP`, Username: `taytech`, Port: `22`
3. Dosyaları `/var/www/taytech/` dizinine yükleyin

### 3. Bağımlılıkları Yükleme

```bash
cd /var/www/taytech
npm install
```

### 4. Production Build Oluşturma

```bash
npm run build
```

Bu işlem birkaç dakika sürebilir. Başarılı olursa `.next` klasörü oluşacaktır.

### 5. Test Çalıştırma

```bash
npm run start
```

Tarayıcıda `http://SUNUCU_IP:3000` adresine giderek kontrol edin.
Çalışıyorsa `Ctrl+C` ile durdurun.

---

## PM2 ile Uygulama Yönetimi

PM2, Node.js uygulamalarını arka planda çalıştırır ve sunucu yeniden başladığında otomatik başlatır.

### 1. PM2 Kurulumu

```bash
sudo npm install -g pm2
```

### 2. Uygulamayı PM2 ile Başlatma

```bash
cd /var/www/taytech

# Uygulamayı başlat
pm2 start npm --name "taytech" -- start

# Durumu kontrol et
pm2 status
```

### 3. PM2'yi Sistem Başlangıcına Ekleme

```bash
pm2 startup systemd
# Çıkan komutu kopyalayıp çalıştırın

# Mevcut process listesini kaydet
pm2 save
```

### PM2 Temel Komutları

```bash
pm2 status              # Durum görüntüle
pm2 logs taytech        # Logları görüntüle
pm2 restart taytech     # Yeniden başlat
pm2 stop taytech        # Durdur
pm2 delete taytech      # Sil
pm2 monit               # Canlı izleme
```

---

## Nginx Reverse Proxy Kurulumu

Nginx, 80 ve 443 portlarından gelen istekleri Node.js uygulamasına yönlendirir.

### 1. Nginx Kurulumu

```bash
sudo apt install -y nginx
```

### 2. Nginx Yapılandırması

```bash
sudo nano /etc/nginx/sites-available/taytech
```

Aşağıdaki içeriği yapıştırın:

```nginx
server {
    listen 80;
    server_name taytech.com.tr www.taytech.com.tr;
    
    # Gzip sıkıştırma
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout ayarları
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Statik dosyalar için cache
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }
    
    # Public klasörü için cache
    location /public {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=31536000";
    }
}
```

### 3. Yapılandırmayı Aktifleştirme

```bash
# Sembolik link oluştur
sudo ln -s /etc/nginx/sites-available/taytech /etc/nginx/sites-enabled/

# Default site'ı kaldır (opsiyonel)
sudo rm /etc/nginx/sites-enabled/default

# Yapılandırmayı test et
sudo nginx -t

# Nginx'i yeniden başlat
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## SSL Sertifikası (HTTPS)

Let's Encrypt ile ücretsiz SSL sertifikası alın.

### 1. Certbot Kurulumu

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. SSL Sertifikası Alma

```bash
sudo certbot --nginx -d taytech.com.tr -d www.taytech.com.tr
```

Sorulara cevap verin:
- E-posta adresinizi girin
- Şartları kabul edin (Y)
- HTTP'yi HTTPS'e yönlendirmeyi seçin (2)

### 3. Otomatik Yenileme Testi

```bash
sudo certbot renew --dry-run
```

Sertifika otomatik olarak yenilenecektir.

---

## Domain Yönlendirme

### DNS Ayarları

Domain sağlayıcınızın (GoDaddy, Namecheap, vb.) DNS panelinde:

| Tip | İsim | Değer | TTL |
|-----|------|-------|-----|
| A | @ | SUNUCU_IP_ADRESI | 3600 |
| A | www | SUNUCU_IP_ADRESI | 3600 |

DNS değişikliklerinin yayılması 24 saate kadar sürebilir.

---

## Güncelleme İşlemleri

Site güncellemesi yapmanız gerektiğinde:

### Git ile Güncelleme

```bash
cd /var/www/taytech

# Değişiklikleri çek
git pull origin main

# Bağımlılıkları güncelle (gerekirse)
npm install

# Yeniden build al
npm run build

# PM2 ile yeniden başlat
pm2 restart taytech
```

### Manuel Güncelleme (SCP ile)

```bash
# Lokal bilgisayardan (önce build alın)
npm run build

# Sunucuya gönder
scp -r .next/* taytech@SUNUCU_IP:/var/www/taytech/.next/
scp -r public/* taytech@SUNUCU_IP:/var/www/taytech/public/

# Sunucuda yeniden başlat
ssh taytech@SUNUCU_IP "pm2 restart taytech"
```

---

## Sorun Giderme

### Uygulama Başlamıyor

```bash
# PM2 loglarını kontrol et
pm2 logs taytech --lines 50

# Port kullanımını kontrol et
sudo lsof -i :3000

# Node.js versiyonunu kontrol et
node --version
```

### Nginx Hataları

```bash
# Nginx error loglarını kontrol et
sudo tail -f /var/log/nginx/error.log

# Yapılandırmayı test et
sudo nginx -t
```

### 502 Bad Gateway Hatası

```bash
# PM2 çalışıyor mu kontrol et
pm2 status

# Uygulama 3000 portunda mı
curl http://127.0.0.1:3000
```

### Disk Alanı Kontrolü

```bash
df -h
```

### Memory Kullanımı

```bash
free -m
htop  # Detaylı görünüm
```

---

## Güvenlik Önerileri

### 1. Firewall Ayarları

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

### 2. SSH Güvenliği

```bash
sudo nano /etc/ssh/sshd_config
```

Önerilen ayarlar:
```
PermitRootLogin no
PasswordAuthentication no  # SSH key kullanıyorsanız
```

### 3. Fail2Ban Kurulumu

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## Önerilen VPS Sağlayıcıları

| Sağlayıcı | Minimum Fiyat | Lokasyon |
|-----------|---------------|----------|
| DigitalOcean | $6/ay | Amsterdam, Frankfurt |
| Hetzner | €4/ay | Almanya, Finlandiya |
| Vultr | $6/ay | Amsterdam, Frankfurt |
| Contabo | €5/ay | Almanya |
| Turhost | ₺99/ay | İstanbul |

---

## Hızlı Kurulum Scripti

Tüm kurulumu tek seferde yapmak için:

```bash
#!/bin/bash
# taytech-install.sh

# Sistem güncelle
sudo apt update && sudo apt upgrade -y

# Node.js kur
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# PM2 kur
sudo npm install -g pm2

# Dizin oluştur
sudo mkdir -p /var/www/taytech
sudo chown -R $USER:$USER /var/www/taytech

echo "Kurulum tamamlandı! Şimdi proje dosyalarını /var/www/taytech dizinine yükleyin."
```

---

## İletişim & Destek

Kurulum sırasında sorun yaşarsanız:
- **E-posta:** info@taytech.com.tr
- **Telefon:** +90 XXX XXX XX XX

---

**Son Güncelleme:** Aralık 2024
**Versiyon:** 1.0

