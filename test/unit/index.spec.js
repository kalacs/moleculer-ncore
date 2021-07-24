"use strict";

const { ServiceBroker } = require("moleculer");
const MyService = require("../../src");

describe("Test MyService", () => {
	const broker = new ServiceBroker({ logger: false });
	let service;

	/* 	beforeEach(() => {
		service = broker.createService({
			mixins: [MyService],
			settings: {
				username: "test",
				password: "test"
			}
		});
		return broker.start();
	});
 */
	afterEach(() => {
		broker.destroyService(service);
		return broker.stop();
	});

	it("should not be created if username and password is not set", () => {
		service = broker.createService({
			mixins: [MyService]
		});
		return expect(broker.start()).rejects.toThrow("username and password is required");
	});

	it("should be created", () => {
		service = broker.createService({
			mixins: [MyService],
			settings: {
				username: "test",
				password: "test"
			}
		});
		return expect(broker.start()).resolved;
	});
	// TODO mock ncore-api
	it("should return with 'Hello Anonymous'", () => {
		return broker.call("ncore.test").then(res => {
			expect(res).toBe("Hello Anonymous");
		});
	});

	/* 	it("should return with 'Hello John'", () => {
		return broker.call("ncore.test", { name: "John" }).then(res => {
			expect(res).toBe("Hello John");
		});
	});
 */
});
