FROM node
RUN git clone https://github.com/logoclapp/MOK-MD-.git /root/MOK-MD/
WORKDIR /root/LyFE/
RUN yarn install
CMD ["npm", "start"]
