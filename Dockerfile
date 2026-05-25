FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY . .

CMD ["npx", "playwright", "test", "--config=playwright.config.ts"]