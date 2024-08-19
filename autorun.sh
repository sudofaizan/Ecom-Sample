git pull
docker build -t dexterquazi/ecom  --no-cache .
docker build -t dexterquazi/ecom --no-cache -f ops/Dockerfile .
docker rm -f $(docker ps -aq)
docker run -itd --name ecom -p 80:80 dexterquazi/ecom 