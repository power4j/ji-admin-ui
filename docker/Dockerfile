FROM nginx:1.18
ENV LANG en_US.UTF-8
COPY ./dist /www-data/dist/
RUN rm /etc/nginx/conf.d/default.conf
ADD nginx.conf /etc/nginx/conf.d/
EXPOSE 80
EXPOSE 443
