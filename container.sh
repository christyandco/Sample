docker build -t customer-support-app -f .container/dockerfile .  
docker run --name customer-support-app -p 3001:3000 -t customer-support-app