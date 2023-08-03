# Use a image Node.js com LTS (Long Term Support)
FROM node:lts as client-build

# Defina o diretório de trabalho para o cliente
WORKDIR /usr/src/knights/app/

# Copie os arquivos de configuração e dependências do projeto
COPY package*.json ./
RUN npm install

# Copie o código do cliente
COPY . .

# Construa o aplicativo Vue.js
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]
