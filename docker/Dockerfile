# cnpm install && npm run build && tar -cf docker/dist.tar -C dist .
# node_modules
FROM nginx:alpine

ADD nginx.conf /etc/nginx/nginx.conf
ADD dist.tar   /www/data
#ADD  ../dist   /www/data

EXPOSE 80

CMD nginx -g "daemon off;"