/*
 * moleculer-ncore
 * Copyright (c) 2021 Zoltan Kakuk (https://github.com/kalacs/moleculer-ncore)
 * MIT Licensed
 */

"use strict";
const createNCoreApi = require("ncore-api");
let ncoreApi;

module.exports = {
	name: "ncore",
	/**
	 * Default settings
	 */
	settings: {
		//		$secureSettings: ["username", "password"],
		username: "",
		password: "",
		url: "https://ncore.pro"
	},

	/**
	 * Actions
	 */
	actions: {
		getMovies: {
			params: {
				$$strict: true,
				genres: {
					type: "array",
					items: "string",
					default: []
				},
				sortBy: {
					type: "string",
					default: "uploaded"
				},
				sortDirection: {
					type: "string",
					default: "DESC"
				}
			},
			handler(ctx) {
				return ncoreApi.getMovies(ctx.params);
			}
		},
		getMovieById: {
			params: {
				id: {
					type: "string"
				}
			},
			handler(ctx) {
				return ncoreApi.getMovie(ctx.params.id);
			}
		},
		getTorrentFile: {
			params: {
				id: {
					type: "string"
				}
			},
			handler(ctx) {
				return ncoreApi.getTorrentFile(ctx.params.id);
			}
		},
		getMovieByImdb: {
			params: {
				imdbId: {
					type: "string"
				}
			},
			handler(ctx) {
				return ncoreApi.getMovieByImdb(ctx.params.imdbId);
			}
		}
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		if (!this.settings.username || !this.settings.password) {
			throw new Error("username and password is required");
		}

		try {
			ncoreApi = await createNCoreApi({
				username: this.settings.username,
				password: this.settings.password,
				url: this.settings.url
			});
			this.logger.info("Successfully logged in to nCore");
		} catch (error) {
			this.logger.error(error);
		}
	}
};
