# ذكي

<div dir="rtl">

## نظرة عامة
"ذكي" هو تطبيق ويب مستوحى من محرك [Perplexity](https://www.perplexity.ai/) وقائم على الذكاء الاصطناعي، يوفر إمكانية البحث الذكي والإجابة على الأسئلة باللغتين العربية والإنجليزية.

## المميزات
- دعم اللغة العربية الكامل
- واجهة مستخدم سهلة الاستخدام
- بحث ذكي في متعدد المصادر
- دعم البحث في YouTube
- الاستجابة السريعة للاستفسارات
- واجهة مستخدم متوافقة مع الهاتف المحمول
- يدعم كلا الاتجاهين (RTL و LTR)

## التشغيل السريع مع Docker

### الطريقة 1: استخدام صورة Docker الجاهزة

```bash
# سحب الصورة من Docker Hub
docker pull faisalanqoudi/dhaki:latest

# تشغيل التطبيق
docker run -d -p 3000:3000 --name dhaki-app faisalanqoudi/dhaki:latest
```

### الطريقة 2: باستخدام Docker Compose

1. قم بإنشاء ملف `docker-compose.yml`:

```yaml
version: '3'

services:
  dhaki:
    image: faisalanqoudi/dhaki:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

2. قم بتشغيل التطبيق باستخدام Docker Compose:

```bash
docker-compose up -d
```

## التثبيت على خادم VPS

### الطريقة السريعة (تشغيل السكريبت التلقائي)

قم بتنفيذ السكريبت التالي على خادم VPS الخاص بك:

```bash
curl -sSL https://raw.githubusercontent.com/alanqoudif/dhaki-p/main/setup-vps.sh | bash
```

هذا السكريبت سيقوم تلقائيًا بـ:
1. تثبيت Docker إذا لم يكن موجودًا
2. تثبيت Docker Compose إذا لم يكن موجودًا
3. سحب صورة تطبيق ذكي من Docker Hub
4. تشغيل التطبيق على المنفذ 3000

### تثبيت يدوي على الخادم

#### 1. تثبيت Docker
```bash
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

#### 2. تثبيت Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 3. تشغيل تطبيق ذكي
```bash
docker pull faisalanqoudi/dhaki:latest
docker run -d -p 3000:3000 --name dhaki-app --restart unless-stopped faisalanqoudi/dhaki:latest
```

## للمزيد من التفاصيل

يمكنك الاطلاع على المستندات التفصيلية:
- `README-DOCKER-AR.md` - دليل سريع باللغة العربية
- `DOCKER-README.md` - دليل تفصيلي باللغة العربية
- `docker-commands.txt` - قائمة أوامر Docker المفيدة
- `setup-vps.sh` - سكريبت التثبيت التلقائي

## الترخيص
جميع الحقوق محفوظة © 2024

</div>
