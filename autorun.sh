git pull
docker rm -f $(docker ps -aq)
docker build -t dexterquazi/ecom  --no-cache .
docker run -itd --name ecom -p 80:80 dexterquazi/ecom 