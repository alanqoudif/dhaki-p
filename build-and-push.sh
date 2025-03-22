#!/bin/bash
# سكريبت لبناء ورفع صورة Docker لتطبيق ذكي
# Author: Claude 3.7 Sonnet
# Version: 1.0
# Date: 2024

# ألوان للإخراج
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== بدء عملية بناء ونشر تطبيق ذكي ===${NC}"

# تحقق من وجود Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker غير مثبت. الرجاء تثبيت Docker أولاً.${NC}"
    exit 1
fi

# تعيين المتغيرات
IMAGE_NAME="faisalanqoudi/dhaki"
IMAGE_TAG="latest"
FULL_IMAGE_NAME="${IMAGE_NAME}:${IMAGE_TAG}"

echo -e "${YELLOW}📦 جاري بناء صورة Docker: ${FULL_IMAGE_NAME}${NC}"

# بناء صورة Docker
docker build -t ${FULL_IMAGE_NAME} .

# التحقق من نجاح البناء
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ فشل في بناء صورة Docker.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ تم بناء صورة Docker بنجاح!${NC}"

# سؤال المستخدم عما إذا كان يريد دفع الصورة إلى Docker Hub
echo -e "${YELLOW}هل تريد دفع الصورة إلى Docker Hub؟ (y/n)${NC}"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo -e "${YELLOW}🔑 جاري تسجيل الدخول إلى Docker Hub...${NC}"
    docker login

    # التحقق من نجاح تسجيل الدخول
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ فشل في تسجيل الدخول إلى Docker Hub.${NC}"
        exit 1
    fi

    echo -e "${YELLOW}📤 جاري دفع الصورة إلى Docker Hub...${NC}"
    docker push ${FULL_IMAGE_NAME}

    # التحقق من نجاح الدفع
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ فشل في دفع الصورة إلى Docker Hub.${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ تم دفع الصورة بنجاح إلى Docker Hub!${NC}"
    echo -e "${BLUE}🔗 يمكن الوصول إلى الصورة الآن عبر: ${FULL_IMAGE_NAME}${NC}"
fi

# سؤال المستخدم عما إذا كان يريد اختبار الصورة محليًا
echo -e "${YELLOW}هل تريد اختبار الصورة محليًا؟ (y/n)${NC}"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    CONTAINER_NAME="dhaki-app-test"
    PORT="3000"
    
    # إيقاف وإزالة الحاوية إذا كانت موجودة
    docker stop ${CONTAINER_NAME} 2>/dev/null
    docker rm ${CONTAINER_NAME} 2>/dev/null
    
    echo -e "${YELLOW}🚀 جاري تشغيل صورة Docker محليًا على المنفذ ${PORT}...${NC}"
    docker run -d -p ${PORT}:3000 --name ${CONTAINER_NAME} ${FULL_IMAGE_NAME}
    
    # التحقق من نجاح التشغيل
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ فشل في تشغيل صورة Docker محليًا.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ تم تشغيل الصورة بنجاح محليًا!"
    echo -e "🌐 يمكنك الوصول إلى التطبيق عبر: http://localhost:${PORT}${NC}"
    
    echo -e "${BLUE}📋 معلومات الحاوية:${NC}"
    docker ps --filter "name=${CONTAINER_NAME}"
fi

echo -e "${GREEN}✨ اكتملت العملية بنجاح!${NC}"
echo -e "${BLUE}📝 لعرض سجلات التطبيق: ${YELLOW}docker logs dhaki-app-test${NC}"
echo -e "${BLUE}🛑 لإيقاف التطبيق: ${YELLOW}docker stop dhaki-app-test${NC}"
echo -e "${BLUE}🔄 لإعادة تشغيل التطبيق: ${YELLOW}docker restart dhaki-app-test${NC}"

echo -e "${BLUE}=== للتشغيل على الخادم VPS === ${NC}"
echo -e "${YELLOW}docker pull ${FULL_IMAGE_NAME}${NC}"
echo -e "${YELLOW}docker run -d -p 3000:3000 --name dhaki-app --restart unless-stopped ${FULL_IMAGE_NAME}${NC}"

# النهاية
exit 0 