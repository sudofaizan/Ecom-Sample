git pull
rm -rf ~/.docker/config.json
if docker build -t dexterquazi/ecom --no-cache -f ops/Dockerfile .
then
docker rm -f $(docker ps -aq)
docker run -itd --name ecom -p 80:80 dexterquazi/ecom 
else
echo "ERROR: job fail in building"
fi