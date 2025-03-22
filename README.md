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

## للمزيد من التفاصيل

يمكنك الاطلاع على المستندات التفصيلية:
- `README-DOCKER-AR.md` - دليل سريع باللغة العربية
- `DOCKER-README.md` - دليل تفصيلي باللغة العربية

## الترخيص
جميع الحقوق محفوظة © 2024

</div>
