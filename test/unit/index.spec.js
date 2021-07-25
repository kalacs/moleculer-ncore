"use strict";

const { ServiceBroker } = require("moleculer");
const Service = require("../../src");
const createNCoreApi = require("ncore-api");

jest.mock("ncore-api");
const mockGetMovies = jest.fn();
const mockGetMovie = jest.fn();
const mockGetMovieByImdb = jest.fn();
const mockGetTorrentFile = jest.fn();

createNCoreApi.mockImplementation(() => ({
	getMovies: mockGetMovies,
	getMovie: mockGetMovie,
	getMovieByImdb: mockGetMovieByImdb,
	getTorrentFile: mockGetTorrentFile
}));

describe("Service", () => {
	describe("settings", () => {
		it("should not be created if username and password is not set", () => {
			const broker = new ServiceBroker({ logger: false });
			broker.createService({
				mixins: [Service]
			});
			return expect(broker.start()).rejects.toThrow("username and password is required");
		});

		it("should be created", () => {
			const broker = new ServiceBroker({ logger: false });
			broker.createService({
				mixins: [Service],
				settings: {
					username: "test",
					password: "test"
				}
			});
			return expect(broker.start()).resolves.toBe(undefined);
		});
	});

	describe("actions", () => {
		const broker = new ServiceBroker({ logger: false, validator: true });
		broker.createService({
			mixins: [Service],
			settings: {
				username: "test",
				password: "test"
			}
		});
		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		describe("ncore.getMovies", () => {
			it("should throw validation error", () => {
				return Promise.all([
					expect(
						broker.call("ncore.getMovies", {
							genresssss: ["sport"],
							sortBy: "uploaded",
							sortDirection: "ASC"
						})
					).rejects.toThrow("Parameters validation error!"),
					expect(
						broker.call("ncore.getMovies", {
							genres: ["sport"],
							sortBy: "uploaded",
							sortDirection: 1
						})
					).rejects.toThrow("Parameters validation error!"),
					expect(
						broker.call("ncore.getMovies", {
							genres: ["sport", 1],
							sortBy: "uploaded",
							sortDirection: "DESC"
						})
					).rejects.toThrow("Parameters validation error!")
				]);
			});

			it("should be called with parameters", () => {
				const params = {
					genres: ["sport"],
					sortDirection: "ASC",
					sortBy: "uploaded"
				};
				return broker.call("ncore.getMovies", params).then(() => {
					expect(mockGetMovies).toHaveBeenCalledWith(params);
				});
			});
		});
		describe("ncore.getMovieById", () => {
			it("should throw validation error", () => {
				return Promise.all([
					expect(
						broker.call("ncore.getMovieById", {
							sortBy: "uploaded"
						})
					).rejects.toThrow("Parameters validation error!"),
					expect(broker.call("ncore.getMovieById", {})).rejects.toThrow(
						"Parameters validation error!"
					),
					expect(
						broker.call("ncore.getMovieById", {
							id: 1
						})
					).rejects.toThrow("Parameters validation error!")
				]);
			});

			it("should be called with parameters", () => {
				const params = {
					id: "2342324"
				};
				return broker.call("ncore.getMovieById", params).then(() => {
					expect(mockGetMovie).toHaveBeenCalledWith(params.id);
				});
			});
		});
		describe("ncore.getMovieByImdbId", () => {
			it("should throw validation error", () => {
				return Promise.all([
					expect(
						broker.call("ncore.getMovieByImdb", {
							sortBy: "uploaded"
						})
					).rejects.toThrow("Parameters validation error!"),
					expect(broker.call("ncore.getMovieByImdb", {})).rejects.toThrow(
						"Parameters validation error!"
					),
					expect(
						broker.call("ncore.getMovieByImdb", {
							imdbId: 1
						})
					).rejects.toThrow("Parameters validation error!")
				]);
			});

			it("should be called with parameters", () => {
				const params = {
					imdbId: "2342324"
				};
				return broker.call("ncore.getMovieByImdb", params).then(() => {
					expect(mockGetMovieByImdb).toHaveBeenCalledWith(params.imdbId);
				});
			});
		});
		describe("ncore.getTorrentFile", () => {
			it("should throw validation error", () => {
				return Promise.all([
					expect(
						broker.call("ncore.getTorrentFile", {
							sortBy: "uploaded"
						})
					).rejects.toThrow("Parameters validation error!"),
					expect(broker.call("ncore.getTorrentFile", {})).rejects.toThrow(
						"Parameters validation error!"
					),
					expect(
						broker.call("ncore.getTorrentFile", {
							id: 1
						})
					).rejects.toThrow("Parameters validation error!")
				]);
			});

			it("should be called with parameters", () => {
				const params = {
					id: "2342324"
				};
				return broker.call("ncore.getTorrentFile", params).then(() => {
					expect(mockGetTorrentFile).toHaveBeenCalledWith(params.id);
				});
			});
		});
	});
});
