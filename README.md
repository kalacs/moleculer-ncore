![Moleculer logo](http://moleculer.services/images/banner.png)

[![Build Status](https://travis-ci.org/kalacs/moleculer-ncore.svg?branch=master)](https://travis-ci.org/kalacs/moleculer-ncore)
[![Coverage Status](https://coveralls.io/repos/github/kalacs/moleculer-ncore/badge.svg)](https://coveralls.io/github/kalacs/moleculer-ncore)
[![Known Vulnerabilities](https://snyk.io/test/github/kalacs/moleculer-ncore/badge.svg)](https://snyk.io/test/github/kalacs/moleculer-ncore)
[![NPM version](https://img.shields.io/npm/v/moleculer-ncore.svg)](https://www.npmjs.com/package/moleculer-ncore)

# Moleculer-ncore

This service provides actions for accessing nCore torrent provider. It
utilizes the file streaming capabilities of the moleculer framework for downloading torrent file.

## Features

The following list details which features are implemented

-   Sign in to nCore website
-   Get movies according to filter criterias
-   Get movie details and versions by nCore or IMDB id
-   Download a torrent file

## Install

```
npm install moleculer-ncore --save
```

## Usage

```js
const { ServiceBroker } = require("moleculer");
const NcoreService = require("moleculer-ncore");
const broker = new ServiceBroker({ logger: console });

// Create a service
broker.createService({
	mixins: NcoreService,
	settings: {
		username: "*******",
		password: "*******",
		url: "https://ncore.pro"
	}
});
```

## Settings

| Property   | Type     | Default             | Description                  |
| ---------- | -------- | ------------------- | ---------------------------- |
| `username` | `String` | **required**        | The username for nCore login |
| `password` | `String` | **required**        | The password for nCore login |
| `url`      | `String` | `https://ncore.pro` | The url of the nCore website |

## Actions

### `getMovies`

List movies

#### Parameters

| Property        | Type     | Default    | Description                           |
| --------------- | -------- | ---------- | ------------------------------------- |
| `genres`        | `array`  | `[]`       | The genres of the movies              |
| `sortBy`        | `string` | `uploaded` | The attribute to be used for ordering |
| `sortDirection` | `string` | `DESC`     | The direction of the ordering         |

#### Results

**Type:** `PromiseLike.<(Array.<Object>|Error)>`

### `getMovieById`

Get a movie by nCore id.

#### Parameters

| Property | Type     | Default      | Description           |
| -------- | -------- | ------------ | --------------------- |
| `id`     | `string` | **required** | nCore id of the movie |

#### Results

**Type:** `PromiseLike.<(object|Error)>`

### `getMovieByImdb`

Get a movie by IMDB id.

#### Parameters

| Property | Type     | Default      | Description          |
| -------- | -------- | ------------ | -------------------- |
| `imdbId` | `string` | **required** | IMDB id of the movie |

#### Results

**Type:** `PromiseLike.<(object|Error)>`

### `getTorrentFile`

Get a Node stream that represents the downloadable torrent file of the given movie.

#### Parameters

| Property | Type     | Default      | Description           |
| -------- | -------- | ------------ | --------------------- |
| `id`     | `string` | **required** | nCore id of the movie |

#### Results

**Type:** `PromiseLike.<(stream|Error)>`

## Test

```
$ npm test
```

In development with watching

```
$ npm run ci
```

## Contribution

Please send pull requests improving the usage and fixing bugs, improving documentation and providing better examples, or providing some testing, because these things are important.

## License

The project is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact

Copyright (c) 2021 Zoltan Kakuk

[![@MoleculerJS](https://img.shields.io/badge/github-moleculerjs-green.svg)](https://github.com/moleculerjs) [![@MoleculerJS](https://img.shields.io/badge/twitter-MoleculerJS-blue.svg)](https://twitter.com/MoleculerJS)
