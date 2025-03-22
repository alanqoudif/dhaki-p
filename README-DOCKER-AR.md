# تعليمات Docker لتطبيق ذكي

## خطوات سريعة لبناء ورفع صورة Docker

### 1. تأكد من وجود Docker مثبت على جهازك
```bash
docker --version
```

### 2. ملف البيئة
تم تحديث ملف `.env.docker` ليحتوي على المفاتيح الفعلية المستخدمة في التطبيق. نظرًا لأن هذه الصورة ستكون خاصة بك وستعمل فقط على الخادم الخاص بك، فهذا آمن بالنسبة للاستخدام الشخصي.

إذا كنت تريد تغيير أي من المفاتيح، يمكنك تعديل ملف `.env.docker` قبل بناء الصورة.

### 3. بناء صورة Docker
```bash
docker build -t faisalanqoudi/dhaki:latest .
```

### 4. تسجيل الدخول إلى Docker Hub
```bash
docker login
```

### 5. رفع الصورة إلى Docker Hub
```bash
docker push faisalanqoudi/dhaki:latest
```

### 6. اختبار الصورة محليًا (اختياري)
```bash
docker run -d -p 3000:3000 --name dhaki-app-test faisalanqoudi/dhaki:latest
```

### 7. على الخادم: سحب الصورة
```bash
docker pull faisalanqoudi/dhaki:latest
```

### 8. على الخادم: تشغيل التطبيق
```bash
docker run -d -p 3000:3000 --name dhaki-app faisalanqoudi/dhaki:latest
```

## أو استخدام الملف النصي التلقائي

لتبسيط العملية، يمكنك استخدام الملف النصي المرفق:
```bash
chmod +x build-and-push.sh
./build-and-push.sh
```

يقوم هذا الملف النصي تلقائيًا بـ:
1. بناء الصورة
2. تسجيل الدخول إلى Docker Hub
3. رفع الصورة
4. اختبار الصورة محليًا (اختياري)

## ملفات مهمة

- **Dockerfile**: ملف تكوين Docker
- **.env.docker**: ملف متغيرات البيئة مع المفاتيح الفعلية
- **docker-compose.yml**: ملف تكوين Docker Compose
- **DOCKER-README.md**: توثيق مفصل
- **docker-commands.txt**: أوامر Docker المفيدة

## ملاحظات هامة

- تم تضمين مفاتيح API الحقيقية في ملف `.env.docker` نظرًا لأن الصورة خاصة بك
- إذا كنت ستشارك الصورة مع الآخرين، فقم بتعديل ملف `.env.docker` لإزالة المفاتيح الحساسة
- يمكنك تغيير المنفذ من 3000 إلى أي منفذ آخر حسب احتياجاتك 