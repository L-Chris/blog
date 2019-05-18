# Nginx

## 前言
> 是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务

## 一、部署 - Docker
```bash
docker run \
  --name nginx \
  --privileged=true \
  -u root \
  --rm \
  -d \
  -p 80:80 \
  -p 443:443 \
  -v $HOME/nginx/conf.d:/etc/nginx/conf.d \
  -v $HOME/nginx/logs:/var/log/nginx \
  nginx
```