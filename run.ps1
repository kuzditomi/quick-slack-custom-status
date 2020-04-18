docker rm -f quick-slack-status
docker run -p 5000:80 --env-file .env --name quick-slack-status quick-slack-status