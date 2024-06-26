FROM node:18.19.1

#criando/definindo o diretório de trabalho dentro do container
WORKDIR /app

#copiando o package.json/package-lock.json para o diretório de trabalho
COPY package*.json ./

#instalando dependencias do projeto
RUN npm install

#copiando todos os arquivos do diretório atual para o diretório de trabalho no container
COPY . .

#porta que o aplicativo Node.js está sendo executado
EXPOSE 3000

#inicializando o aplicativo
CMD ["node", "server.js"]

