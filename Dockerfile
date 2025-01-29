FROM node:18

RUN apt-get update && apt-get install -y \
    build-essential \
    python3

WORKDIR /app

COPY package*.json ./

RUN npm ci  # Використовуємо npm ci для чистої установки

COPY . .

RUN npm rebuild bcrypt --build-from-source  # Перебудовуємо bcrypt для середовища Docker

EXPOSE 5000

ENV PORT=5000 \
    DB_URL=mongodb+srv://Mikasa:sivs1827@cluster0.oabrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 \
    JWT_ACCESS_SECRET=Pisp2iUOBBKaCtvcfcH8JrvbbBvoFSyD \
    JWT_REFRESH_SECRET=Pisa2iUOBBKaCkvcfcH8JrvbbBvoFSyD \
    SMTP_HOST=smtp.gmail.com \
    SMTP_PORT=587 \
    SMTP_USER=flamecorporationxd@gmail.com \
    SMTP_PASSWORD=vduwgguinvgvvpfu \
    API_URL=http://localhost:5000 \
    CLIENT_URL=http://localhost:5173

CMD ["npm", "start"]
