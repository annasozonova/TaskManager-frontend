# Используем официальный Node.js образ в качестве базового
FROM node:16-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Строим приложение
RUN npm run build

# Прокси-сервер (если нужно) или указываем команду для старта сервера
CMD ["npm", "start"]

# Открываем порт для доступа
EXPOSE 3000
