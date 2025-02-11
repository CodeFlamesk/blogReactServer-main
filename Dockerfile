FROM node:18

RUN apt-get update && apt-get install -y \
    build-essential \
    python3

WORKDIR /app

COPY package*.json ./

RUN npm ci  

COPY . .

RUN npm rebuild bcrypt --build-from-source  
EXPOSE 5000



CMD ["npm", "start"]
