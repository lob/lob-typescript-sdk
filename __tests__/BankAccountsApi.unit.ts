import {Configuration} from "../configuration";

import {BankAccountVerify, BankAccountWritable, BankTypeEnum} from "../models";
import {BankAccountsApi} from "../api/bank-accounts-api";

import axios from "axios";

import {debugLog, fail} from "./testUtilities";

const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock("axios", () => ({
    request: jest.fn(),
}));

describe("BankAccountsApi", () => {
    const config: Configuration = new Configuration({
        username: "Totally Fake Key",
    });
    const configWithBaseOptions = new Configuration({
        username: "Totally Fake Key",
        baseOptions: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });

    it("BankAccounts API can be instantiated", () => {
        const bankAccountsApi = new BankAccountsApi(config);
        expect(bankAccountsApi).toBeDefined();
        expect(typeof bankAccountsApi).toEqual("object");
        expect(bankAccountsApi).toBeInstanceOf(BankAccountsApi);
    });

    it("BankAccounts API can be instantiated with base options", () => {
        const bankAccountsApi = new BankAccountsApi(configWithBaseOptions);
        expect(bankAccountsApi).toBeDefined();
        expect(typeof bankAccountsApi).toEqual("object");
        expect(bankAccountsApi).toBeInstanceOf(BankAccountsApi);
    });

    describe("bankAccountCreate", () => {
        const bankAccountCreate: BankAccountWritable = {
            routing_number: 'fake routing',
            account_number: 'fake account',
            account_type: BankTypeEnum.Individual,
            signatory: 'fake signatory'
        };

        it("exists", () => {
            // ToDo: https://lobsters.atlassian.net/browse/DXP-608
            // the function names are inconsistent between Apis

            const bankAccountsApi = new BankAccountsApi(config);
            expect(bankAccountsApi.bankAccountCreate).toBeDefined();
            expect(typeof bankAccountsApi.bankAccountCreate).toEqual("function");
        });

        it("handles errors returned by the api", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw {
                    message: "error",
                    response: { data: { error: { message: "error reported by API" } }}
                };
            });

            try {
                await new BankAccountsApi(config).bankAccountCreate(
                    bankAccountCreate
                );
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("error reported by API");
            }
        });

        it("handles errors in making the request", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw new Error("Unknown Error");
            });

            try {
                await new BankAccountsApi(config).bankAccountCreate(
                    bankAccountCreate
                );
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("Unknown Error");
            }
        });

        it("creates a new bank account", async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: { id: "fake id" },
            }));

            const bankAccount = await new BankAccountsApi(config).bankAccountCreate(
                bankAccountCreate
            );
            expect(bankAccount).toBeDefined();
            expect(bankAccount?.id).toBeDefined();
        });

        it("includes custom headers while it creates a new bank account", async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: { id: "fake id" },
            }));

            const bankAccount = await new BankAccountsApi(configWithBaseOptions).bankAccountCreate(
                bankAccountCreate
            );
            expect(bankAccount).toBeDefined();
            expect(bankAccount?.id).toBeDefined();
        });
    });

    describe("bankAccountDelete", () => {
        it("exists", () => {
            const bankAccountsApi = new BankAccountsApi(config);
            expect(bankAccountsApi.bankAccountDelete).toBeDefined();
            expect(typeof bankAccountsApi.bankAccountDelete).toEqual("function");
        });

        it("deletes a bank account", async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: {
                    id: "fake id",
                    deleted: true,
                },
            }));
            const bankAccount = await new BankAccountsApi(config).bankAccountDelete(
                "fake id"
            );
            expect(bankAccount?.deleted).toEqual(true);
        });

        it("includes custom headers while it deletes a bank account", async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: {
                    id: "fake id",
                    deleted: true,
                },
            }));
            const bankAccount = await new BankAccountsApi(configWithBaseOptions).bankAccountDelete(
                "fake id"
            );
            expect(bankAccount?.deleted).toEqual(true);
        });

        it("handles errors returned by the api", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw {
                    message: "error",
                    response: { data: { error: { message: "error reported by API" } }}
                };
            });

            try {
                await new BankAccountsApi(config).bankAccountDelete(
                    "fake id"
                );
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("error reported by API");
            }
        });

        it("handles errors in making the request", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw new Error("Unknown Error");
            });

            try {
                await new BankAccountsApi(config).bankAccountDelete(
                    "fake id"
                );
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("Unknown Error");
            }
        });
    });

    describe("bankAccountRetrieve", () => {
        it("exists", () => {
            const bankAccountsApi = new BankAccountsApi(config);
            expect(bankAccountsApi.bankAccountRetrieve).toBeDefined();
            expect(typeof bankAccountsApi.bankAccountRetrieve).toEqual("function");
        });

        it("retrieves a bank account", async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: { id: 'different fake id' }
            }));

            const bankAccount = await new BankAccountsApi(config).bankAccountRetrieve("fake id");
            expect(bankAccount?.id).toEqual('different fake id');
        });

        it("includes custom headers while it retrieves an address", async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: { id: 'different fake id' }
            }));

            const bankAccount = await new BankAccountsApi(configWithBaseOptions).bankAccountRetrieve("fake id");
            expect(bankAccount?.id).toEqual('different fake id');
        });

        it("handles errors returned by the api", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw {
                    message: "error",
                    response: { data: { error: { message: "error reported by API" } }}
                };
            });

            try {
                await new BankAccountsApi(config).bankAccountRetrieve(
                    "fake id"
                );
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("error reported by API");
            }
        });

        it("handles errors in making the request", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw new Error("Unknown Error");
            });

            try {
                await new BankAccountsApi(config).bankAccountRetrieve(
                    "fake id"
                );
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("Unknown Error");
            }
        });
    });

    describe("bankAccountVerify", () => {
        it("exists", () => {
            const bankAccountsApi = new BankAccountsApi(config);
            expect(bankAccountsApi.bankAccountVerify).toBeDefined();
            expect(typeof bankAccountsApi.bankAccountVerify).toEqual("function");
        });

        it('verifies a bank account', async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: { id: 'fake id' },
            }));

            const verify: BankAccountVerify = {
                amounts: [1, 2]
            };
            const bankAccount = await new BankAccountsApi(config).bankAccountVerify("an id", verify);
            expect(bankAccount).toBeDefined();
            expect(bankAccount?.id).toEqual('fake id');
        });

        it('includes custom headers while verifies a bank account', async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: { id: 'fake id' },
            }));

            const verify: BankAccountVerify = {
                amounts: [1, 2]
            };
            const bankAccount = await new BankAccountsApi(configWithBaseOptions).bankAccountVerify("an id", verify);
            expect(bankAccount).toBeDefined();
            expect(bankAccount?.id).toEqual('fake id');
        });

        it("handles errors returned by the api", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw {
                    message: "error",
                    response: { data: { error: { message: "error reported by API" } }}
                };
            });

            try {
                const verify: BankAccountVerify = {
                    amounts: [1, 2]
                };
                await new BankAccountsApi(config).bankAccountVerify("an id", verify);
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("error reported by API");
            }
        });

        it("handles errors in making the request", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw new Error("Unknown Error");
            });

            try {
                const verify: BankAccountVerify = {
                    amounts: [1, 2]
                };
                await new BankAccountsApi(config).bankAccountVerify("an id", verify);
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("Unknown Error");
            }
        });
    });

    describe("bankAccountsList", () => {
        it("exists", () => {
            const bankAccountsApi = new BankAccountsApi(config);
            expect(bankAccountsApi.bankAccountsList).toBeDefined();
            expect(typeof bankAccountsApi.bankAccountsList).toEqual("function");
        });

        it("lists bankAccount", async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
            }));

            const response = await new BankAccountsApi(config).bankAccountsList();
            expect(response).toBeDefined();
            expect(response?.data).toBeDefined();
            expect(response?.data?.length).toEqual(2);
        });

        it("includes custom headers while it lists bankAccounts", async () => {
            axiosRequest.mockImplementationOnce(async () => ({
                data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
            }));

            const response = await new BankAccountsApi(configWithBaseOptions).bankAccountsList();
            expect(response).toBeDefined();
            expect(response?.data).toBeDefined();
            expect(response?.data?.length).toEqual(2);
        });

        it("handles errors returned by the api", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw {
                    message: "error",
                    response: { data: { error: { message: "error reported by API" } }}
                };
            });

            try {
                await new BankAccountsApi(config).bankAccountsList();
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("error reported by API");
            }
        });

        it("handles errors in making the request", async () => {
            axiosRequest.mockImplementationOnce(async () => {
                throw new Error("Unknown Error");
            });

            try {
                await new BankAccountsApi(config).bankAccountsList();
                fail("Should throw");
            } catch (err: any) {
                expect(err.message).toEqual("Unknown Error");
            }
        });

        it("lists bankAccounts with a limit parameter", async () => {
            axiosRequest.mockImplementationOnce(async (request) => {
                expect(request.url.split("?")[1]).toEqual("limit=10");
                return {
                    data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
                }
            });

            const response = await new BankAccountsApi(config).bankAccountsList(
                10
            );
            expect(response).toBeDefined();
            expect(response?.data).toBeDefined();
            expect(response?.data?.length).toEqual(2);
        });

        it("lists bankAccounts with a before parameter", async () => {
            axiosRequest.mockImplementationOnce(async (request) => {
                expect(request.url.split("?")[1]).toEqual("before=before");
                return {
                    data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
                }
            });

            const response = await new BankAccountsApi(config).bankAccountsList(
                undefined,
                "before"
            );
            expect(response).toBeDefined();
            expect(response?.data).toBeDefined();
            expect(response?.data?.length).toEqual(2);
        });

        it("lists bankAccounts with an after parameter", async () => {
            axiosRequest.mockImplementationOnce(async (request) => {
                expect(request.url.split("?")[1]).toEqual("after=after");
                return {
                    data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
                }
            });

            const response = await new BankAccountsApi(config).bankAccountsList(
                undefined,
                undefined,
                "after"
            );
            expect(response).toBeDefined();
            expect(response?.data).toBeDefined();
            expect(response?.data?.length).toEqual(2);
        });

        it.skip("lists bankAccounts with an include parameter", async () => {
            // ToDo: https://lobsters.atlassian.net/browse/DXP-607
            //  currently is resulting in "'https://api.lob.com/v1/bankAccount?include=%5Bobject+Object%5D'"
            // This is wrong
            axiosRequest.mockImplementationOnce(async (request) => {
                console.log(request);
                expect(request.url.split("?")[1]).toEqual("after=after");
                return {
                    data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
                }
            });

            const response = await new BankAccountsApi(config).bankAccountsList(
                undefined,
                undefined,
                undefined,
                { what: "this" }
            );
            expect(response).toBeDefined();
            expect(response?.data).toBeDefined();
            expect(response?.data?.length).toEqual(2);
        });

        it.skip("lists bankAccounts with a dateCreated parameter", async () => {
            // ToDo: https://lobsters.atlassian.net/browse/DXP-607
            axiosRequest.mockImplementationOnce(async (request) => {
                expect(request.url.split("?")[1]).toEqual("after=after");
                return {
                    data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
                }
            });

            const response = await new BankAccountsApi(config).bankAccountsList(
                undefined,
                undefined,
                undefined,
                undefined,
                { what: 'this' }
            );
            expect(response).toBeDefined();
            expect(response?.data).toBeDefined();
            expect(response?.data?.length).toEqual(2);
        });

        it.skip("lists bankAccounts with a metadata parameter", async () => {
            // ToDo: https://lobsters.atlassian.net/browse/DXP-607
            axiosRequest.mockImplementationOnce(async (request) => {
                expect(request.url.split("?")[1]).toEqual("after=after");
                return {
                    data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
                }
            });

            const response = await new BankAccountsApi(config).bankAccountsList(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                { what: 'this' }
            );
            expect(response).toBeDefined();
            expect(response?.data).toBeDefined();
            expect(response?.data?.length).toEqual(2);
        });

        it("lists bankAccounts with multiple parameters", async () => {
            axiosRequest.mockImplementationOnce(async (request) => {
                expect(request.url.split("?")[1]).toEqual("limit=10&after=after");
                return {
                    data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
                }
            });

            const response = await new BankAccountsApi(config).bankAccountsList(
                10,
                undefined,
                "after"
            );
            expect(response).toBeDefined();
            expect(response?.data).toBeDefined();
            expect(response?.data?.length).toEqual(2);
        });
    });
});