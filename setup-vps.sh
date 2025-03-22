#!/bin/bash

# سكريبت لتثبيت وتشغيل تطبيق ذكي على خادم VPS
# Author: Claude 3.7 Sonnet
# Version: 1.0

# ألوان للإخراج
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== تثبيت وتشغيل تطبيق ذكي على خادم VPS ===${NC}"

# تحقق من وجود Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker غير مثبت. جاري تثبيت Docker...${NC}"
    
    # تثبيت Docker
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg lsb-release
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # إضافة المستخدم الحالي إلى مجموعة docker
    sudo usermod -aG docker $USER
    
    echo -e "${GREEN}تم تثبيت Docker بنجاح!${NC}"
    echo -e "${YELLOW}قد تحتاج إلى تسجيل الخروج وإعادة تسجيل الدخول حتى تتمكن من استخدام Docker بدون sudo.${NC}"
else
    echo -e "${GREEN}Docker مثبت بالفعل على النظام.${NC}"
fi

# تحقق من وجود Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose غير مثبت. جاري تثبيت Docker Compose...${NC}"
    
    # تثبيت Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    echo -e "${GREEN}تم تثبيت Docker Compose بنجاح!${NC}"
else
    echo -e "${GREEN}Docker Compose مثبت بالفعل على النظام.${NC}"
fi

# سحب صورة Docker الخاصة بتطبيق ذكي
echo -e "${YELLOW}جاري سحب صورة Docker الخاصة بتطبيق ذكي...${NC}"
docker pull faisalanqoudi/dhaki:latest

# إيقاف وإزالة الحاوية السابقة إن وجدت
echo -e "${YELLOW}جاري إيقاف وإزالة الحاوية السابقة إن وجدت...${NC}"
docker stop dhaki-app 2>/dev/null
docker rm dhaki-app 2>/dev/null

# تشغيل تطبيق ذكي
echo -e "${YELLOW}جاري تشغيل تطبيق ذكي...${NC}"
docker run -d -p 3000:3000 --name dhaki-app --restart unless-stopped faisalanqoudi/dhaki:latest

# التحقق من نجاح التشغيل
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ فشل في تشغيل تطبيق ذكي.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ تم تشغيل تطبيق ذكي بنجاح!${NC}"
echo -e "${BLUE}🌐 يمكنك الوصول إلى التطبيق عبر: http://$(curl -s ifconfig.me):3000${NC}"

# عرض معلومات الحاوية
echo -e "${BLUE}📋 معلومات الحاوية:${NC}"
docker ps --filter "name=dhaki-app"

echo -e "${GREEN}✨ اكتملت عملية التثبيت بنجاح!${NC}"
echo -e "${BLUE}📝 لعرض سجلات التطبيق: ${YELLOW}docker logs dhaki-app${NC}"
echo -e "${BLUE}📝 لمتابعة سجلات التطبيق: ${YELLOW}docker logs -f dhaki-app${NC}"
echo -e "${BLUE}🛑 لإيقاف التطبيق: ${YELLOW}docker stop dhaki-app${NC}"
echo -e "${BLUE}🔄 لإعادة تشغيل التطبيق: ${YELLOW}docker restart dhaki-app${NC}"

exit 0 