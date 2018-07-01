# Salien Cheat Service
The goal of this project was to be able to to provide a platform to host
other SalienCheat bot 24/7 for others. One of the motivation for this
project was the inability to use Heroku workers after a mass suspension.

![DemoImage](https://raw.githubusercontent.com/lamdaV/SalienCheatService/master/demo.png?token=AK60HfKg-GoEmDjHuU2eze3wj7A5HcKaks5bQf0ywA%3D%3D)

This project relies on
- [SteamDB/SalienCheat](https://github.com/SteamDatabase/SalienCheat).

# Install
You need to have a device with a public ip and, preferably, a -nix based
operating system.

Create a `.env` file with
```
REACT_APP_BACKEND_URL=public-ip-or-url-of-backend-server
SALIEN_CHEAT_DIRECTORY=path-to-SalienCheat
SECRET=some-secret-to-limit-access
HTTP_PORT=port-to-host-bot
```

Then, execute
```
yarn setup // set up log directory
yarn build // construct minified frontend with backend url environment variable
yarn serve // start the server
```

Now, you can visit your public ip or url and provide your steam token
and custom secret.

*Note:* This is all that is needed to be done; however, setting up a web server
is a non-trivial task for those without experience. The bare minimum requirement
is `php` and `node`. The rest is up to you on how you want to set up a public ip
or url.
