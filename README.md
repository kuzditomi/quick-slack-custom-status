# quick-slack-custom-status
A project to quickly set your Slack status for one of the predefined statuses.
Available at https://slack-status.kuzditomi.com

# Development
For development, you will need
- dotnet core 3.1 sdk
- docker

You will need to run the web app and the reverse proxy for development.
After starting them, you can reach the app on https://localhost

### Setup
You need two environment variables for the app to run:
- `SlackStatusUpdate:ClientId` is the slack app's client id
- `SlackStatusUpdate:ClientSecret` is the slack app's client secret

You either specify them on your machine for development, or use an `.env` file when running in docker

### Running the web app
```
cd QuickSlackStatusUpdate
dotnet run
```

## Running the reverse-proxy
```
cd reverse-proxy
docker-compose up -d
```

# Deployment
To build a new docker image, use `.\build.ps1`. You have to change the image's name of course if you wish to use your own modified version.
If you wish to check the built image you can run it with `docker-compose up -d`  after completing the `.env` file.