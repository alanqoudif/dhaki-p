# تطبيق ذكي

## تشغيل التطبيق باستخدام Docker

### المتطلبات الأساسية
- تثبيت Docker على الخادم الخاص بك
- تثبيت Docker Compose (اختياري، يُستخدم لتبسيط عملية التشغيل)

### طريقة التشغيل

#### الطريقة 1: باستخدام صورة Docker المبنية مسبقًا

يمكنك سحب الصورة مباشرة من Docker Hub واستخدامها:

```bash
# سحب الصورة من Docker Hub
docker pull faisalanqoudi/dhaki:latest

# تشغيل التطبيق على المنفذ 3000
docker run -d --name dhaki-app -p 3000:3000 faisalanqoudi/dhaki:latest
```

#### الطريقة 2: باستخدام Docker Compose

1. ملف `.env.docker` تم تحديثه بالفعل ليحتوي على المفاتيح الحقيقية التي تستخدمها في التطبيق
2. قم بتشغيل الأمر التالي:

```bash
docker-compose up -d
```

هذا سيقوم بتشغيل التطبيق في الخلفية على المنفذ 3000.

### إعدادات متغيرات البيئة

تم تضمين المفاتيح الفعلية في ملف `.env.docker` بما في ذلك:

- `XAI_API_KEY`: مفتاح API لخدمة XAI (Grok)
- `GROQ_API_KEY`: مفتاح API لخدمة Groq
- `TAVILY_API_KEY`: مفتاح API لخدمة Tavily
- `EXA_API_KEY`: مفتاح API لخدمة Exa
- `YT_ENDPOINT`: نقطة نهاية لخدمة YouTube

بما أن هذه الصورة خاصة بك وستستخدم فقط على خوادمك الشخصية، فإن تضمين هذه المفاتيح آمن.

### التخصيص

#### تغيير المنفذ

إذا كنت ترغب في تشغيل التطبيق على منفذ مختلف، قم بتعديل ملف `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # سيتم تشغيل التطبيق على المنفذ 8080 بدلاً من 3000
```

#### تحديث الصور والملفات الثابتة

يمكنك تحديث محتويات مجلد `public` من خلال استخدام volume:

```yaml
volumes:
  - ./my-custom-public:/app/public
```

### مراقبة التطبيق

للتحقق من حالة التطبيق:

```bash
docker ps
```

لعرض سجلات التطبيق:

```bash
docker logs dhaki-app
```

### إيقاف التطبيق

```bash
# إذا كنت تستخدم docker run
docker stop dhaki-app
docker rm dhaki-app

# إذا كنت تستخدم docker-compose
docker-compose down
```

## بناء صورة Docker خاصة بك

إذا كنت ترغب في إجراء تعديلات ثم بناء صورة Docker خاصة بك:

```bash
# بناء الصورة
docker build -t my-dhaki-app .

# تشغيل الصورة
docker run -d --name my-dhaki-app -p 3000:3000 my-dhaki-app
```

## دفع الصورة إلى Docker Hub

لدفع الصورة إلى Docker Hub الخاص بك:

```bash
# تسجيل الدخول إلى Docker Hub
docker login

# وضع علامة على الصورة
docker tag my-dhaki-app yourusername/dhaki:latest

# دفع الصورة
docker push yourusername/dhaki:latest
```

### ملاحظة مهمة حول الأمان

إذا كنت تخطط لمشاركة هذه الصورة عامة في المستقبل، فتأكد من حذف المفاتيح الحساسة من ملف `.env.docker` قبل الدفع إلى Docker Hub. 