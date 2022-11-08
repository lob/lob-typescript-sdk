// import {
//     CONFIG_FOR_INTEGRATION,
//     FILE_LOCATION,
//     FILE_LOCATION_4X6,
//     FILE_LOCATION_6X18,
//   } from "./testFixtures";
//   import { BuckslipsApi } from "../api/buckslips-api";
//   import { BuckslipEditable, BuckslipEditableSizeEnum } from "../models";
//   import FormData from "form-data";
//   import fs from "fs";

//   describe("BuckSlipsApi", () => {
//     it.skip("Buckslips API can be instantiated", () => {
//       const buckslipsApi = new BuckslipsApi(CONFIG_FOR_INTEGRATION);
//       expect(buckslipsApi).toBeDefined();
//       expect(typeof buckslipsApi).toEqual("object");
//       expect(buckslipsApi).toBeInstanceOf(BuckslipsApi);
//     });

//     it("all individual Buckslips functions exists", () => {
//       const buckslipsApi = new BuckslipsApi(CONFIG_FOR_INTEGRATION);
//       expect(buckslipsApi.create).toBeDefined();
//       expect(typeof buckslipsApi.create).toEqual("function");

//       expect(buckslipsApi.get).toBeDefined();
//       expect(typeof buckslipsApi.get).toEqual("function");

//       expect(buckslipsApi.update).toBeDefined();
//       expect(typeof buckslipsApi.update).toEqual("function");

//       expect(buckslipsApi.delete).toBeDefined();
//       expect(typeof buckslipsApi.delete).toEqual("function");
//     });

//     describe("performs single-buckslips operations", () => {
//       const createBe = new BuckslipEditable({
//         description: "Test Buckslip",
//         front:
//           'lobster.pdf"',
//         back: FILE_LOCATION_6X18,
//         size: BuckslipEditableSizeEnum._875x375,
//       });

//       it("creates, updates, and gets a buckslip", async () => {
//         const buckslipsApi = new BuckslipsApi(CONFIG_FOR_INTEGRATION);
//         // Create
//         let data = new FormData();
//         data.append(
//           "front",
//           fs.createReadStream(
//             "lobster.pdf"
//           )
//         );
//         data.append("description", "Test Buckslip");

//         const createdBe = await buckslipsApi.create(createBe, { data });
//         expect(createdBe.id).toBeDefined();
//         expect(createdBe.description).toEqual(createBe.description);

//         //   // Get
//         //   const retrievedBe = await buckslipsApi.get(createdBe.id as string);
//         //   expect(retrievedBe).toBeDefined();
//         //   expect(retrievedBe.id).toEqual(createdBe.id);

//         //   // Update
//         //   const updates = new BuckslipEditable({
//         //     description: "updated buckslip",
//         //   });
//         //   const updatedBg = await buckslipsApi.update(
//         //     retrievedBe.id as string,
//         //     updates
//         //   );
//         //   expect(updatedBg).toBeDefined();
//         //   expect(updatedBg.description).toEqual("updated buckslip");
//       });
//     });

//     //   describe("list billing groups", () => {
//     //     let createdBillingGroups: BillingGroup[] = [];

//     //     beforeAll(async () => {
//     //       // ensure there are at least 3 billing groups present, to test pagination
//     //       const bg1 = new BillingGroupEditable({
//     //         description: "Billing Group 1",
//     //         name: "TestBillingGroup1",
//     //       });
//     //       const bg2 = new BillingGroupEditable(
//     //         Object.assign({}, bg1, {
//     //           description: "Billing Group 2",
//     //           name: "TestBillingGroup2",
//     //         })
//     //       );
//     //       const bg3 = new BillingGroupEditable(
//     //         Object.assign({}, bg1, {
//     //           description: "Billing Group 3",
//     //           name: "TestBillingGroup2",
//     //         })
//     //       );

//     //       const billingGroupsApi = new BillingGroupsApi(CONFIG_FOR_INTEGRATION);
//     //       await Promise.all([
//     //         billingGroupsApi.create(bg1),
//     //         billingGroupsApi.create(bg2),
//     //         billingGroupsApi.create(bg3),
//     //       ])
//     //         .then((creationResults) => {
//     //           expect(creationResults.length).toEqual(3);
//     //           createdBillingGroups = createdBillingGroups.concat(creationResults);
//     //         })
//     //         .catch((err) => {
//     //           throw err;
//     //         });
//     //     });

//     //     it("exists", () => {
//     //       const billingGroupsApi = new BillingGroupsApi(CONFIG_FOR_INTEGRATION);
//     //       expect(billingGroupsApi.list).toBeDefined();
//     //       expect(typeof billingGroupsApi.list).toEqual("function");
//     //     });

//     //     it("lists billing groups", async () => {
//     //       const response = await new BillingGroupsApi(
//     //         CONFIG_FOR_INTEGRATION
//     //       ).list();
//     //       expect(response.data).toBeDefined();
//     //       expect(response.data?.length).toBeGreaterThan(0);
//     //     });
//   });
//   // });
