/*
 * moleculer-ncore
 * Copyright (c) 2021 Zoltan Kakuk (https://github.com/kalacs/moleculer-ncore)
 * MIT Licensed
 */

"use strict";

module.exports = {

	name: "ncore",

	/**
	 * Default settings
	 */
	settings: {

	},

	/**
	 * Actions
	 */
	actions: {
		test(ctx) {
			return "Hello " + (ctx.params.name || "Anonymous");
		}
	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};