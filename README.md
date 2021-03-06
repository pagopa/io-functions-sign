# io-functions-sign ✍️

## <a name="installation-and-usage"></a>Installation and Usage

Prerequisites:

- [Node.js](https://nodejs.org/) (`16.x`)
- [npm](https://www.npmjs.com) (`8.x`)
- [Docker desktop](https://www.docker.com/products/docker-desktop/) or equivalent container runtime

Install dependencies using `npm`

```sh
npm install
```

And create the `local.settings.json` file with the following content

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```

Now you can build the TypeScript sources using

```sh
npm run build
```

And run the project with

```sh
npm start
```

### Test Azure Services locally

This project requires various backing services provided by Microsoft Azure in order to function.

Specifically, we are currently using

- Azure Functions, which serves as a REST over HTTP transport layer - Azure Cosmos DB, which stores entities
- Azure Blob Storage, which is used to store PDF documents associated with signature requests.

These services can be tested locally for development purposes using Microsoft's official Azure emulators.

The instructions for configuring and starting the configured emulators are provided below.

#### Cosmos DB

To test Cosmos DB locally, we use the 'Linux Emulator' distributed by Microsoft via container.
Simply install `docker` and `docker-compose` and run the following command from the project root to get started.

```sh
docker-compose up -d cosmos-db
```

As specified in the `docker-compose.yml` configuration file, this launches a small instance of Cosmos DB on port 8081.

After that, simply navigate to `https:/localhost:8081/_explorer/index.html` to access the Data Explorer.

You can find the `Primary Connection String` to add to your `local.settings.json` file on this page.

```json
{
  // ... other props
  "Values": {
    // ... other settings
    "CosmosDbConnectionString": "HERE-THE-PRIMARY-CONNECTION-STRING",
    "CosmosDbName": "HERE-THE-COSMOS-DB-NAME"
  }
}
```

##### Configure SSL

The SSL certificate generated by the emulator must be registered and authorized on the system keychain at the start.
The steps to take vary depending on the operating system; they are detailed in the [official Microsoft documentation](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator?tabs=ssl-netstd21#import-certificate).

##### Use the emulator via the VSC extension

Because the emulator's SSL certificate is _self-signed_, it is automatically rejected by Visual Studio Code when we attempt to connect to the emulator.

To resolve this issue, disable the VSCode `proxyStrictSSL` option.

To accomplish this, simply add the following property to the personal `settings.json` file.

```json
{
  "http.proxyStrictSSL": false
}
```

Please care of this setting, as it exposes the editor to potential security issues with third-party extensions.
