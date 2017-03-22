# Setup instruction


1. Yarn (install for linux)

```shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update && sudo apt-get install yarn
```

or visit website : https://yarnpkg.com/en/docs/install


3. Install webpack

```shell
yarn add --dev webpack
```

4. To install all the dependencies run:

```shell
yarn
```

OR

```shell
yarn install
```

5. For single, headless tests use:

```shell
yarn run test:headless
```

6. To run code in a browser user:

```shell
yarn start
```