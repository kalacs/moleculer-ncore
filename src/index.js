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
		username: "",
		password: "",
		url: "https://ncore.pro"
	},

	/**
	 * Actions
	 */
	actions: {
		getMovies(ctx) {
			return ncoreApi.getMovies();
		},
		getMovie(ctx) {
			return ncoreApi.getMovie(ctx.params);
		},
		downloadTorrentFile(ctx) {
			return ncoreApi.getTorrentFile(ctx.params);
		},
		getMovieByImdb(ctx) {
			return ncoreApi.getMovieByImdb(ctx.params);
		}
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
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
