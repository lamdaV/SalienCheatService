# Salien Cheat Service
The goal of this project was to be able to to provide a platform to host
other SalienCheat bot 24/7 for others. One of the motivation for this
project was the inability to use Heroku workers after a mass suspension.

![DemoImage](https://raw.githubusercontent.com/lamdaV/SalienCheatService/master/demo.png?token=AK60HfKg-GoEmDjHuU2eze3wj7A5HcKaks5bQf0ywA%3D%3D)

You can visit the demo [here](http://www.worker1.lamdav.com). Make sure
it is `http` as I have not gotten around to setting up `https`.
**Note:** Be warn that your secret over `http` is insecure and exposed.

This project relies on
- [SteamDB/SalienCheat](https://github.com/SteamDatabase/SalienCheat).

This project will store your data within `local-storage` so to ease your next
visit.

# Install
You need to have a device with a public ip and, preferably, a -nix based
operating system.

Create a `.env` file with
```
REACT_APP_DEFAULT_MESSAGE_LIMIT=one-of-100-500-1000
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

# Registration
Registration is available and controlled via means of a `SECRET`. This `SECRET`
is the same one specified in the `.env` file. This is mainly for the server
maintainer to have the ability to selective register specific user via their
specified token.

To do so, the server maintainer must have another user's steam token and the
server secret. Enter the credentials in their appropriate fields and click
register. This will create a token-bound secret. The server maintainer can
provide this to the newly registered user for the user to control and monitor
their bot.

In the case that the user forgets their secret, the server maintainer can redo
the above process. This will kill any running bots before issuing a new
registration token.

With the server secret, the server maintainer can monitor any steam bot given
that the maintainer has recollection of the token used.

# Credential Storage
Upon submitting any credentials, the token and secret will be saved in
local storage to ease future visits.
