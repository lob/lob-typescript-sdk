import {
  IntlComponents,
  IntlVerification,
  IntlVerifications,
  IntlVerificationDeliverabilityEnum,
  IntlVerificationObjectEnum,
  IntlVerificationStatusEnum,
  IntlVerificationsPayload,
  IntlVerificationOrError,
  MultipleComponentsIntl,
  MultipleComponentsList,
  CountryExtended,
  LobError,
  MultipleComponents,
  UsVerifications,
  IntlVerificationWritable,
  IntlVerificationOrErrorCodeEnum,
} from "../models";

describe("Intl Verifications Models", () => {
  describe("IntlVerification", () => {
    it("can be created", () => {
      const rec = new IntlVerification();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "intl_ver_fakeId"],
      ["recipient", "fake recipient"],
      ["primary_line", "fake primary"],
      ["secondary_line", "fake secondary"],
      ["last_line", "fake last"],
      ["country", "fake country"],
      ["coverage", "fake coverage"],
      ["deliverability", IntlVerificationDeliverabilityEnum.Deliverable],
      [
        "deliverability",
        IntlVerificationDeliverabilityEnum.DeliverableMissingInfo,
      ],
      ["deliverability", IntlVerificationDeliverabilityEnum.NoMatch],
      ["deliverability", IntlVerificationDeliverabilityEnum.Undeliverable],
      ["status", IntlVerificationStatusEnum.Lv4],
      ["status", IntlVerificationStatusEnum.Lv3],
      ["status", IntlVerificationStatusEnum.Lv2],
      ["status", IntlVerificationStatusEnum.Lv1],
      ["status", IntlVerificationStatusEnum.Lf4],
      ["status", IntlVerificationStatusEnum.Lf3],
      ["status", IntlVerificationStatusEnum.Lf2],
      ["status", IntlVerificationStatusEnum.Lf1],
      ["status", IntlVerificationStatusEnum.Lm4],
      ["status", IntlVerificationStatusEnum.Lm3],
      ["status", IntlVerificationStatusEnum.Lm2],
      ["status", IntlVerificationStatusEnum.Lu1],
      ["components", new IntlComponents()],
      ["object", IntlVerificationObjectEnum.IntlVerification],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new IntlVerification(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new IntlVerification();
      expect(rec.id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid id provided");
        }
      }
    });

    it("allows setting valid values for id", () => {
      const rec = new IntlVerification();
      expect(rec.id).not.toBeDefined();

      const validValues = ["intl_ver_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("IntlVerifications", () => {
    it("can be created", () => {
      const rec = new IntlVerifications();
      expect(rec).toBeDefined();
    });

    it.each([
      ["addresses", [new IntlVerification({ id: "intl_ver_fakeId" })]],
      ["errors", true],
      ["errors", false],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new IntlVerifications(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("sorts LobError objects into a secondary array", () => {
      const rec = new IntlVerifications({
        addresses: [new LobError({ status_code: 500 })],
      });
      expect(rec).toBeDefined();
      expect(rec.addresses.length).toEqual(0);
      expect(rec.errorAddresses.length).toEqual(1);
    });
  });

  describe("IntlComponents", () => {
    it("can be created", () => {
      const rec = new IntlComponents();
      expect(rec).toBeDefined();
    });

    it.each([
      ["primary_number", "fake prmary number"],
      ["street_name", "fake street"],
      ["city", "fake city"],
      ["state", "fake state"],
      ["postal_code", "fake postal"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new IntlComponents(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("IntlVerificationsPayload", () => {
    it("can be created", () => {
      const rec = new IntlVerificationsPayload();
      expect(rec).toBeDefined();
    });

    it.each([["addresses", [new MultipleComponentsIntl()]]])(
      "can be created with a provided %s value",
      (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new IntlVerificationsPayload(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
      }
    );
  });

  describe("IntlVerificationWritable", () => {
    it("can be created", () => {
      const rec = new IntlVerificationWritable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["recipient", "fake recipient"],
      ["primary_line", "fake primary"],
      ["secondary_line", "fake secondary"],
      ["country", "fake country"],
      ["city", "fake city"],
      ["state", "fake state"],
      ["postal_code", "fake postal_code"],
      ["address", "fake address"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new IntlVerificationWritable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("IntlVerificationOrError", () => {
    it("can be created", () => {
      const rec = new IntlVerificationOrError();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "intl_ver_fakeId"],
      ["recipient", "fake recipient"],
      ["primary_line", "fake primary"],
      ["secondary_line", "fake secondary"],
      ["last_line", "fake last"],
      ["country", "fake country"],
      ["coverage", "fake coverage"],
      ["deliverability", IntlVerificationDeliverabilityEnum.Deliverable],
      [
        "deliverability",
        IntlVerificationDeliverabilityEnum.DeliverableMissingInfo,
      ],
      ["deliverability", IntlVerificationDeliverabilityEnum.NoMatch],
      ["deliverability", IntlVerificationDeliverabilityEnum.Undeliverable],
      ["status", IntlVerificationStatusEnum.Lv4],
      ["status", IntlVerificationStatusEnum.Lv3],
      ["status", IntlVerificationStatusEnum.Lv2],
      ["status", IntlVerificationStatusEnum.Lv1],
      ["status", IntlVerificationStatusEnum.Lf4],
      ["status", IntlVerificationStatusEnum.Lf3],
      ["status", IntlVerificationStatusEnum.Lf2],
      ["status", IntlVerificationStatusEnum.Lf1],
      ["status", IntlVerificationStatusEnum.Lm4],
      ["status", IntlVerificationStatusEnum.Lm3],
      ["status", IntlVerificationStatusEnum.Lm2],
      ["status", IntlVerificationStatusEnum.Lu1],
      ["components", new IntlComponents()],
      ["object", IntlVerificationObjectEnum.IntlVerification],
      ["message", "fake message"],
      ["status_code", 500],
      ["code", IntlVerificationOrErrorCodeEnum.AddressLengthExceedsLimit],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new IntlVerificationOrError(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new IntlVerificationOrError();
      expect(rec.id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid id provided");
        }
      }
    });

    it("allows setting valid values for id", () => {
      const rec = new IntlVerificationOrError();
      expect(rec.id).not.toBeDefined();

      const validValues = ["intl_ver_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("MultipleComponentsIntl", () => {
    it("can be created", () => {
      const rec = new MultipleComponentsIntl();
      expect(rec).toBeDefined();
    });

    it.each([
      ["recipient", "fake recipient"],
      ["recipient", null],
      ["primary_line", "fake primary_line"],
      ["secondary_line", "fake secondary_line"],
      ["city", "fake city"],
      ["state", "fake state"],
      ["postal_code", "fake postal_code"],
      ["country", CountryExtended.Ad],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop as string] = val;

      const rec = new MultipleComponentsIntl(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop as string]).toEqual(val);
    });
  });

  describe("MultipleComponents", () => {
    it("can be created", () => {
      const rec = new MultipleComponents();
      expect(rec).toBeDefined();
    });

    it.each([
      ["recipient", "fake recipient"],
      ["primary_line", "fake primary_line"],
      ["secondary_line", "fake secondary_line"],
      ["urbanization", "fake urbanization"],
      ["city", "fake city"],
      ["state", "fake state"],
      ["zip_code", "11111"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new MultipleComponents(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for zip_code", () => {
      const rec = new MultipleComponents();
      expect(rec.zip_code).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.zip_code = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid zip_code provided");
        }
      }
    });

    it("allows setting valid values for zip_code", () => {
      const rec = new MultipleComponents();
      expect(rec.zip_code).not.toBeDefined();

      const validValues = ["11111"];
      for (const val of validValues) {
        rec.zip_code = val;
        expect(rec.zip_code).toBeDefined();
        expect(rec.zip_code).toEqual(val);
      }
    });
  });

  describe("MultipleComponentsList", () => {
    it("can be created", () => {
      const rec = new MultipleComponentsList();
      expect(rec).toBeDefined();
    });

    it.each([["addresses", [new MultipleComponents()]]])(
      "can be created with a provided %s value",
      (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new MultipleComponentsList(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
      }
    );
  });
});
