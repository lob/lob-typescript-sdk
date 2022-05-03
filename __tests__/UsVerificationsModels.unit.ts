import {
  DeliverabilityAnalysis,
  DeliverabilityAnalysisDpvActiveEnum,
  DeliverabilityAnalysisDpvCmraEnum,
  DeliverabilityAnalysisDpvConfirmationEnum,
  DeliverabilityAnalysisDpvVacantEnum,
  DeliverabilityAnalysisLacsIndicatorEnum,
  DeliverabilityAnalysisSuiteReturnCodeEnum,
  DpvFootnote,
  LobConfidenceScore,
  UsComponents,
  UsComponentsAddressTypeEnum,
  UsComponentsCarrierRouteTypeEnum,
  UsComponentsRecordTypeEnum,
  UsComponentsStreetPostdirectionEnum,
  UsComponentsStreetPredirectionEnum,
  UsVerification,
  UsVerifications,
  UsVerificationDeliverabilityEnum,
  UsVerificationOrError,
  UsVerificationsWritable,
  ZipCodeType,
  LobError,
  BulkError,
  Suggestions,
  LobConfidenceScoreLevelEnum,
} from "../models";

describe("Us Verifications Models", () => {
  describe("DeliverabilityAnalysis", () => {
    it("can be created", () => {
      const rec = new DeliverabilityAnalysis();
      expect(rec).toBeDefined();
    });

    it.each([
      ["dpv_confirmation", DeliverabilityAnalysisDpvConfirmationEnum.N],
      ["dpv_confirmation", DeliverabilityAnalysisDpvConfirmationEnum.S],
      ["dpv_confirmation", DeliverabilityAnalysisDpvConfirmationEnum.Y],
      ["dpv_confirmation", DeliverabilityAnalysisDpvConfirmationEnum.Empty],
      ["dpv_confirmation", DeliverabilityAnalysisDpvConfirmationEnum.D],
      ["dpv_cmra", DeliverabilityAnalysisDpvCmraEnum.Y],
      ["dpv_cmra", DeliverabilityAnalysisDpvCmraEnum.N],
      ["dpv_cmra", DeliverabilityAnalysisDpvCmraEnum.Empty],
      ["dpv_vacant", DeliverabilityAnalysisDpvVacantEnum.Y],
      ["dpv_vacant", DeliverabilityAnalysisDpvVacantEnum.N],
      ["dpv_vacant", DeliverabilityAnalysisDpvVacantEnum.Empty],
      ["dpv_active", DeliverabilityAnalysisDpvActiveEnum.Y],
      ["dpv_active", DeliverabilityAnalysisDpvActiveEnum.N],
      ["dpv_active", DeliverabilityAnalysisDpvActiveEnum.Empty],
      ["dpv_footnotes", DpvFootnote.Aa],
      ["dpv_footnotes", DpvFootnote.A1],
      ["dpv_footnotes", DpvFootnote.Bb],
      ["dpv_footnotes", DpvFootnote.Cc],
      ["dpv_footnotes", DpvFootnote.N1],
      ["dpv_footnotes", DpvFootnote.F1],
      ["dpv_footnotes", DpvFootnote.G1],
      ["dpv_footnotes", DpvFootnote.U1],
      ["dpv_footnotes", DpvFootnote.M1],
      ["dpv_footnotes", DpvFootnote.M3],
      ["dpv_footnotes", DpvFootnote.P1],
      ["dpv_footnotes", DpvFootnote.P3],
      ["dpv_footnotes", DpvFootnote.R1],
      ["dpv_footnotes", DpvFootnote.R7],
      ["dpv_footnotes", DpvFootnote.Rr],
      ["ews_match", true],
      ["ews_match", false],
      ["lacs_indicator", DeliverabilityAnalysisLacsIndicatorEnum.Y],
      ["lacs_indicator", DeliverabilityAnalysisLacsIndicatorEnum.N],
      ["lacs_indicator", DeliverabilityAnalysisLacsIndicatorEnum.Empty],
      ["lacs_return_code", "fake return code"],
      ["suite_return_code", DeliverabilityAnalysisSuiteReturnCodeEnum.Empty],
      ["suite_return_code", DeliverabilityAnalysisSuiteReturnCodeEnum.A],
      ["suite_return_code", DeliverabilityAnalysisSuiteReturnCodeEnum._00],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new DeliverabilityAnalysis(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("UsVerification", () => {
    it("can be created", () => {
      const rec = new UsVerification();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "us_ver_fakeId"],
      ["recipient", "fake recipient"],
      ["primary_line", "fake primary"],
      ["secondary_line", "fake secondary"],
      ["urbanization", "fake urbanization"],
      ["last_line", "fake last"],
      ["deliverability", UsVerificationDeliverabilityEnum.Deliverable],
      [
        "deliverability",
        UsVerificationDeliverabilityEnum.DeliverableIncorrectUnit,
      ],
      [
        "deliverability",
        UsVerificationDeliverabilityEnum.DeliverableMissingUnit,
      ],
      [
        "deliverability",
        UsVerificationDeliverabilityEnum.DeliverableUnnecessaryUnit,
      ],
      ["deliverability", UsVerificationDeliverabilityEnum.Undeliverable],
      ["components", new UsComponents()],
      ["deliverability_analysis", new DeliverabilityAnalysis()],
      ["lob_confidence_score", new LobConfidenceScore()],
      ["object", "US Verification"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new UsVerification(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new UsVerification();
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
      const rec = new UsVerification();
      expect(rec.id).not.toBeDefined();

      const validValues = ["us_ver_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("UsVerifications", () => {
    it("can be created", () => {
      const rec = new UsVerifications();
      expect(rec).toBeDefined();
    });

    it.each([
      ["addresses", [new UsVerification({ id: "us_ver_fakeId" })]],
      ["errors", true],
      ["errors", false],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new UsVerifications(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("sorts BulkError objects into a secondary array", () => {
      const rec = new UsVerifications({
        addresses: [new BulkError({ status_code: 500 })],
      });
      expect(rec).toBeDefined();
      expect(rec.addresses.length).toEqual(0);
      expect(rec.errorAddresses.length).toEqual(1);
    });

    it("rejects invalid values for id", () => {
      const rec = new UsVerification();
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
      const rec = new UsVerification();
      expect(rec.id).not.toBeDefined();

      const validValues = ["us_ver_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("UsVerificationsWritable", () => {
    it("can be created", () => {
      const rec = new UsVerificationsWritable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["address", "fake address"],
      ["recipient", "fake recipient"],
      ["primary_line", "fake primary"],
      ["secondary_line", "fake secondary"],
      ["urbanization", "fake urbanization"],
      ["city", "fake city"],
      ["state", "fake state"],
      ["zip_code", "78725"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new UsVerificationsWritable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new UsVerification();
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

    it("rejects invalid values for zip_code", () => {
      const rec = new UsVerificationsWritable();
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

    it("allows setting valid values for id", () => {
      const rec = new UsVerification();
      expect(rec.id).not.toBeDefined();

      const validValues = ["us_ver_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("UsVerificationOrError", () => {
    it("can be created", () => {
      const rec = new UsVerificationOrError();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "us_ver_fakeId"],
      ["recipient", "fake recipient"],
      ["primary_line", "fake primary"],
      ["secondary_line", "fake secondary"],
      ["urbanization", "fake urbanization"],
      ["last_line", "fake last"],
      ["deliverability", UsVerificationDeliverabilityEnum.Deliverable],
      [
        "deliverability",
        UsVerificationDeliverabilityEnum.DeliverableIncorrectUnit,
      ],
      [
        "deliverability",
        UsVerificationDeliverabilityEnum.DeliverableMissingUnit,
      ],
      [
        "deliverability",
        UsVerificationDeliverabilityEnum.DeliverableUnnecessaryUnit,
      ],
      ["deliverability", UsVerificationDeliverabilityEnum.Undeliverable],
      ["components", new UsComponents()],
      ["deliverability_analysis", new DeliverabilityAnalysis()],
      ["lob_confidence_score", new LobConfidenceScore()],
      ["object", "US Verification"],
      ["message", "fake message"],
      ["status_code", 403],
      ["code", "address_length_exceeds_limit"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new UsVerificationOrError(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new UsVerificationOrError();
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

    it("sorts BulkError objects into a secondary array", () => {
      const rec = new UsVerifications({
        addresses: [new BulkError({ status_code: 500 })],
      });
      expect(rec).toBeDefined();
      expect(rec.addresses.length).toEqual(0);
      expect(rec.errorAddresses.length).toEqual(1);
    });

    it("rejects invalid values for id", () => {
      const rec = new UsVerification();
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
      const rec = new UsVerification();
      expect(rec.id).not.toBeDefined();

      const validValues = ["us_ver_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("UsComponents", () => {
    it("can be created", () => {
      const rec = new UsComponents();
      expect(rec).toBeDefined();
    });

    it.each([
      ["primary_number", "fake prmary number"],
      ["street_predirection", UsComponentsStreetPredirectionEnum.N],
      ["street_predirection", UsComponentsStreetPredirectionEnum.S],
      ["street_predirection", UsComponentsStreetPredirectionEnum.E],
      ["street_predirection", UsComponentsStreetPredirectionEnum.W],
      ["street_predirection", UsComponentsStreetPredirectionEnum.Nw],
      ["street_predirection", UsComponentsStreetPredirectionEnum.Ne],
      ["street_predirection", UsComponentsStreetPredirectionEnum.Sw],
      ["street_predirection", UsComponentsStreetPredirectionEnum.Se],
      ["street_predirection", UsComponentsStreetPredirectionEnum.Empty],
      ["street_name", "fake name"],
      ["street_suffix", "fake suffix"],
      ["street_postdirection", UsComponentsStreetPostdirectionEnum.N],
      ["street_postdirection", UsComponentsStreetPostdirectionEnum.S],
      ["street_postdirection", UsComponentsStreetPostdirectionEnum.E],
      ["street_postdirection", UsComponentsStreetPostdirectionEnum.W],
      ["street_postdirection", UsComponentsStreetPostdirectionEnum.Nw],
      ["street_postdirection", UsComponentsStreetPostdirectionEnum.Ne],
      ["street_postdirection", UsComponentsStreetPostdirectionEnum.Sw],
      ["street_postdirection", UsComponentsStreetPostdirectionEnum.Se],
      ["street_postdirection", UsComponentsStreetPostdirectionEnum.Empty],
      ["secondary_designator", "fake designator"],
      ["secondary_number", "fake secondary number"],
      ["pmb_designator", "fake pmb designator"],
      ["pmb_number", "fake pmb number"],
      ["extra_secondary_designator", "fake extra designator"],
      ["extra_secondary_number", "fake extra number"],
      ["city", "fake city"],
      ["state", "fake state"],
      ["zip_code", "11111"],
      ["zip_code_plus_4", "1111"],
      ["zip_code_type", ZipCodeType.Empty],
      ["zip_code_type", ZipCodeType.PoBox],
      ["zip_code_type", ZipCodeType.Military],
      ["zip_code_type", ZipCodeType.Unique],
      ["zip_code_type", ZipCodeType.Standard],
      ["delivery_point_barcode", "fake barcode"],
      ["address_type", UsComponentsAddressTypeEnum.Empty],
      ["address_type", UsComponentsAddressTypeEnum.Commercial],
      ["address_type", UsComponentsAddressTypeEnum.Residential],
      ["record_type", UsComponentsRecordTypeEnum.Empty],
      ["record_type", UsComponentsRecordTypeEnum.PoBox],
      ["record_type", UsComponentsRecordTypeEnum.Firm],
      ["record_type", UsComponentsRecordTypeEnum.Highrise],
      ["record_type", UsComponentsRecordTypeEnum.Street],
      ["record_type", UsComponentsRecordTypeEnum.GeneralDelivery],
      ["record_type", UsComponentsRecordTypeEnum.RuralRoute],
      ["default_building_address", true],
      ["default_building_address", false],
      ["county", "fake country"],
      ["county_fips", "11111"],
      ["carrier_route", "fake route"],
      ["carrier_route_type", UsComponentsCarrierRouteTypeEnum.RuralRoute],
      ["carrier_route_type", UsComponentsCarrierRouteTypeEnum.GeneralDelivery],
      ["carrier_route_type", UsComponentsCarrierRouteTypeEnum.PoBox],
      ["carrier_route_type", UsComponentsCarrierRouteTypeEnum.CityDelivery],
      ["carrier_route_type", UsComponentsCarrierRouteTypeEnum.HighwayContract],
      ["latitude", 123],
      ["latitude", null],
      ["longitude", 123],
      ["longitude", null],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new UsComponents(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for zip_code", () => {
      const rec = new UsComponents();
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
      const rec = new UsComponents();
      expect(rec.zip_code).not.toBeDefined();

      const validValues = ["11111"];
      for (const val of validValues) {
        rec.zip_code = val;
        expect(rec.zip_code).toBeDefined();
        expect(rec.zip_code).toEqual(val);
      }
    });

    it("rejects invalid values for zip_code_plus_4", () => {
      const rec = new UsComponents();
      expect(rec.zip_code_plus_4).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.zip_code_plus_4 = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid zip_code_plus_4 provided");
        }
      }
    });

    it("allows setting valid values for zip_code_plus_4", () => {
      const rec = new UsComponents();
      expect(rec.zip_code_plus_4).not.toBeDefined();

      const validValues = ["1111"];
      for (const val of validValues) {
        rec.zip_code_plus_4 = val;
        expect(rec.zip_code_plus_4).toBeDefined();
        expect(rec.zip_code_plus_4).toEqual(val);
      }
    });

    it("rejects invalid values for county_fips", () => {
      const rec = new UsComponents();
      expect(rec.county_fips).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.county_fips = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid county_fips provided");
        }
      }
    });

    it("allows setting valid values for county_fips", () => {
      const rec = new UsComponents();
      expect(rec.county_fips).not.toBeDefined();

      const validValues = ["11111"];
      for (const val of validValues) {
        rec.county_fips = val;
        expect(rec.county_fips).toBeDefined();
        expect(rec.county_fips).toEqual(val);
      }
    });
  });

  describe("Suggestions", () => {
    it("can be created", () => {
      const rec = new Suggestions();
      expect(rec).toBeDefined();
    });

    it.each([
      ["primary_line", ""],
      ["city", ""],
      ["state", ""],
      ["zip_code", 11111],
      ["object", "us_autocompletion"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new Suggestions(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("allows setting valid values for zip_code", () => {
      const rec = new Suggestions();
      expect(rec.zip_code).not.toBeDefined();

      const validValues = ["11111"];
      for (const val of validValues) {
        rec.zip_code = val;
        expect(rec.zip_code).toBeDefined();
        expect(rec.zip_code).toEqual(val);
      }
    });
  });

  describe("LobConfidenceScore", () => {
    it("can be created", () => {
      const rec = new LobConfidenceScore();
      expect(rec).toBeDefined();
    });

    it.each([
      ["score", 12],
      ["level", LobConfidenceScoreLevelEnum.Low],
      ["level", LobConfidenceScoreLevelEnum.Empty],
      ["level", LobConfidenceScoreLevelEnum.High],
      ["level", LobConfidenceScoreLevelEnum.Medium],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new LobConfidenceScore(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });
});
