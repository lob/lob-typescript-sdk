import {
    AddressTypes,
    BankAccountTypes,
    CheckTypes,
    Events,
    EventType,
    EventTypeResourceEnum,
    LetterTypes,
    LobError,
    LobErrorCodeEnum,
    LobErrorStatusCodeEnum,
    PostcardTypes,
    SelfMailerTypes,
    SortBy,
    SortBy1,
    SortBy2,
    SortBy3,
    SortBy4,
    SortBy5,
    SortByDateCreatedEnum,
    SortBySendDateEnum,
    SortBy1DateCreatedEnum,
    SortBy1SendDateEnum,
    SortBy2DateCreatedEnum,
    SortBy2SendDateEnum,
    SortBy3DateCreatedEnum,
    SortBy3SendDateEnum,
    SortBy4DateCreatedEnum,
    SortBy4SendDateEnum,
    SortBy5DateCreatedEnum,
    SortBy5SendDateEnum,
    Thumbnail,
    SingleLineAddressIntl,
    CountryExtended,
    SingleLineAddress,
    TrackingEventCertified,
    TrackingEventCertifiedTypeEnum,
    TrackingEventCertifiedNameEnum,
    TrackingEventDetails,
    TrackingEventDetailsEventEnum,
    TrackingEventNormal,
    TrackingEventNormalTypeEnum,
    TrackingEventNormalNameEnum,
    TrackingEventNormalDetailsEnum,
    Location
} from "../models";
import {URL_VALID_LIST} from "./testFixtures";

describe("LobError", () => {
    it("can be created", () => {
        const rec = new LobError();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "message", "fake message" ],
        [ "status_code", LobErrorStatusCodeEnum.NUMBER_401 ],
        [ "status_code", LobErrorStatusCodeEnum.NUMBER_403 ],
        [ "status_code", LobErrorStatusCodeEnum.NUMBER_404 ],
        [ "status_code", LobErrorStatusCodeEnum.NUMBER_413 ],
        [ "status_code", LobErrorStatusCodeEnum.NUMBER_422 ],
        [ "status_code", LobErrorStatusCodeEnum.NUMBER_429 ],
        [ "status_code", LobErrorStatusCodeEnum.NUMBER_500 ],
        [ "code", LobErrorCodeEnum.BadRequest ],
        [ "code", LobErrorCodeEnum.Conflict ],
        [ "code", LobErrorCodeEnum.FeatureLimitReached ],
        [ "code", LobErrorCodeEnum.InternalServerError ],
        [ "code", LobErrorCodeEnum.Invalid ],
        [ "code", LobErrorCodeEnum.NotDeletable ],
        [ "code", LobErrorCodeEnum.NotFound ],
        [ "code", LobErrorCodeEnum.RequestTimeout ],
        [ "code", LobErrorCodeEnum.ServiceUnavailable ],
        [ "code", LobErrorCodeEnum.UnrecognizedEndpoint ],
        [ "code", LobErrorCodeEnum.UnsupportedLobVersion ],
        [ "code", LobErrorCodeEnum.AddressLengthExceedsLimit ],
        [ "code", LobErrorCodeEnum.BankAccountAlreadyVerified ],
        [ "code", LobErrorCodeEnum.BankError ],
        [ "code", LobErrorCodeEnum.CustomEnvelopeInventoryDepleted ],
        [ "code", LobErrorCodeEnum.DeletedBankAccount ],
        [ "code", LobErrorCodeEnum.FailedDeliverabilityStrictness ],
        [ "code", LobErrorCodeEnum.FilePagesBelowMin ],
        [ "code", LobErrorCodeEnum.FilePagesExceedMax ],
        [ "code", LobErrorCodeEnum.FileSizeExceedsLimit ],
        [ "code", LobErrorCodeEnum.ForeignReturnAddress ],
        [ "code", LobErrorCodeEnum.InconsistentPageDimensions ],
        [ "code", LobErrorCodeEnum.InvalidBankAccount ],
        [ "code", LobErrorCodeEnum.InvalidBankAccountVerification ],
        [ "code", LobErrorCodeEnum.InvalidCheckInternational ],
        [ "code", LobErrorCodeEnum.InvalidCountryCovid ],
        [ "code", LobErrorCodeEnum.InvalidFile ],
        [ "code", LobErrorCodeEnum.InvalidFileDimensions ],
        [ "code", LobErrorCodeEnum.InvalidFileDownloadTime ],
        [ "code", LobErrorCodeEnum.InvalidFileUrl ],
        [ "code", LobErrorCodeEnum.InvalidImageDpi ],
        [ "code", LobErrorCodeEnum.InvalidInternationalFeature ],
        [ "code", LobErrorCodeEnum.InvalidPerforationReturnEnvelope ],
        [ "code", LobErrorCodeEnum.InvalidTemplateHtml ],
        [ "code", LobErrorCodeEnum.MergeVariableRequired ],
        [ "code", LobErrorCodeEnum.MergeVariableWhitespace ],
        [ "code", LobErrorCodeEnum.PaymentMethodUnverified ],
        [ "code", LobErrorCodeEnum.PdfEncrypted ],
        [ "code", LobErrorCodeEnum.SpecialCharactersRestricted ],
        [ "code", LobErrorCodeEnum.UnembeddedFonts ],
        [ "code", LobErrorCodeEnum.EmailRequired ],
        [ "code", LobErrorCodeEnum.InvalidApiKey ],
        [ "code", LobErrorCodeEnum.PublishableKeyNotAllowed ],
        [ "code", LobErrorCodeEnum.RateLimitExceeded ],
        [ "code", LobErrorCodeEnum.Unauthorized ],
        [ "code", LobErrorCodeEnum.UnauthorizedToken ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new LobError(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });
});

describe("Thumbnail", () => {
    it("can be created", () => {
        const rec = new Thumbnail();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "small", URL_VALID_LIST ],
        [ "medium", URL_VALID_LIST ],
        [ "large", URL_VALID_LIST ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new Thumbnail(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for small", () => {
        const rec = new Thumbnail();
        expect(rec.small).not.toBeDefined();

        const invalidValues = ["Nope"];
        for (const val of invalidValues) {
            try {
                rec.small = val;
                throw new Error("Should Throw");
            } catch (err: any) {
                expect(err.message).toEqual("Invalid small provided");
            }
        }
    });

    it("allows setting valid values for small", () => {
        const rec = new Thumbnail();
        expect(rec.small).not.toBeDefined();

        for (const val of URL_VALID_LIST) {
            rec.small = val;
            expect(rec.small).toBeDefined();
            expect(rec.small).toEqual(val);
        }
    });

    it("rejects invalid values for medium", () => {
        const rec = new Thumbnail();
        expect(rec.medium).not.toBeDefined();

        const invalidValues = ["Nope"];
        for (const val of invalidValues) {
            try {
                rec.medium = val;
                throw new Error("Should Throw");
            } catch (err: any) {
                expect(err.message).toEqual("Invalid medium provided");
            }
        }
    });

    it("allows setting valid values for medium", () => {
        const rec = new Thumbnail();
        expect(rec.medium).not.toBeDefined();

        for (const val of URL_VALID_LIST) {
            rec.medium = val;
            expect(rec.medium).toBeDefined();
            expect(rec.medium).toEqual(val);
        }
    });

    it("rejects invalid values for large", () => {
        const rec = new Thumbnail();
        expect(rec.large).not.toBeDefined();

        const invalidValues = ["Nope"];
        for (const val of invalidValues) {
            try {
                rec.large = val;
                throw new Error("Should Throw");
            } catch (err: any) {
                expect(err.message).toEqual("Invalid large provided");
            }
        }
    });

    it("allows setting valid values for large", () => {
        const rec = new Thumbnail();
        expect(rec.large).not.toBeDefined();

        for (const val of URL_VALID_LIST) {
            rec.large = val;
            expect(rec.large).toBeDefined();
            expect(rec.large).toEqual(val);
        }
    });
});

describe("Events", () => {
    it("can be created", () => {
        const rec = new Events();
        expect(rec).toBeDefined();
    });

    it.each([
    [ "id", "evt_fakeId" ],
    [ "body", {} ],
    [ "reference_id", "fake reference id" ],
    [ "event_type", new EventType() ],
    [ "date_created", new Date().toISOString() ],
    [ "object", "Event" ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new Events(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
        const rec = new Events();
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
        const rec = new Events();
        expect(rec.id).not.toBeDefined();

        const validValues = ["evt_1234"];
        for (const val of validValues) {
            rec.id = val;
            expect(rec.id).toBeDefined();
            expect(rec.id).toEqual(val);
        }
    });
});

describe("EventType", () => {
    it("can be created", () => {
        const rec = new EventType();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "id", PostcardTypes.Created ],
        [ "id", PostcardTypes.RenderedPdf ],
        [ "id", PostcardTypes.RenderedThumbnails ],
        [ "id", PostcardTypes.Deleted ],
        [ "id", PostcardTypes.Mailed ],
        [ "id", PostcardTypes.InTransit ],
        [ "id", PostcardTypes.InLocalArea ],
        [ "id", PostcardTypes.ProcessedForDelivery ],
        [ "id", PostcardTypes.ReRouted ],
        [ "id", PostcardTypes.ReturnedToSender ],
        [ "id", SelfMailerTypes.Created ],
        [ "id", SelfMailerTypes.RenderedPdf ],
        [ "id", SelfMailerTypes.RenderedThumbnails ],
        [ "id", SelfMailerTypes.Deleted ],
        [ "id", SelfMailerTypes.Mailed ],
        [ "id", SelfMailerTypes.InTransit ],
        [ "id", SelfMailerTypes.InLocalArea ],
        [ "id", SelfMailerTypes.ProcessedForDelivery ],
        [ "id", SelfMailerTypes.ReRouted ],
        [ "id", SelfMailerTypes.ReturnedToSender ],
        [ "id", LetterTypes.Created ],
        [ "id", LetterTypes.RenderedPdf ],
        [ "id", LetterTypes.RenderedThumbnails ],
        [ "id", LetterTypes.Deleted ],
        [ "id", LetterTypes.Mailed ],
        [ "id", LetterTypes.InTransit ],
        [ "id", LetterTypes.InLocalArea ],
        [ "id", LetterTypes.ProcessedForDelivery ],
        [ "id", LetterTypes.ReRouted ],
        [ "id", LetterTypes.ReturnedToSender ],
        [ "id", LetterTypes.CertifiedMailed ],
        [ "id", LetterTypes.CertifiedInTransit ],
        [ "id", LetterTypes.CertifiedInLocalArea ],
        [ "id", LetterTypes.CertifiedProcessedForDelivery ],
        [ "id", LetterTypes.CertifiedReRouted ],
        [ "id", LetterTypes.CertifiedReturnedToSender ],
        [ "id", LetterTypes.CertifiedDelivered ],
        [ "id", LetterTypes.CertifiedPickupAvailable ],
        [ "id", LetterTypes.CertifiedIssue ],
        [ "id", LetterTypes.ReturnEnvelopeCreated ],
        [ "id", LetterTypes.ReturnEnvelopeInTransit ],
        [ "id", LetterTypes.ReturnEnvelopeInLocalArea ],
        [ "id", LetterTypes.ReturnEnvelopeProcessedForDelivery ],
        [ "id", LetterTypes.ReturnEnvelopeReRouted ],
        [ "id", LetterTypes.ReturnEnvelopeReturnedToSender ],
        [ "id", CheckTypes.Created ],
        [ "id", CheckTypes.RenderedPdf ],
        [ "id", CheckTypes.RenderedThumbnails ],
        [ "id", CheckTypes.Deleted ],
        [ "id", CheckTypes.Mailed ],
        [ "id", CheckTypes.InTransit ],
        [ "id", CheckTypes.InLocalArea ],
        [ "id", CheckTypes.ProcessedForDelivery ],
        [ "id", CheckTypes.ReRouted ],
        [ "id", CheckTypes.ReturnedToSender ],
        [ "id", AddressTypes.Created ],
        [ "id", AddressTypes.Deleted ],
        [ "id", BankAccountTypes.Created ],
        [ "id", BankAccountTypes.Deleted ],
        [ "id", BankAccountTypes.Verified ],
        [ "enabled_for_test", true ],
        [ "enabled_for_test", false ],
        [ "resource", EventTypeResourceEnum.Addresses ],
        [ "resource", EventTypeResourceEnum.Checks ],
        [ "resource", EventTypeResourceEnum.BankAccounts ],
        [ "resource", EventTypeResourceEnum.Letters ],
        [ "resource", EventTypeResourceEnum.Postcards ],
        [ "resource", EventTypeResourceEnum.SelfMailers ],
        [ "object", "event_type" ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new EventType(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
        const rec = new Events();
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
        const rec = new Events();
        expect(rec.id).not.toBeDefined();

        const validValues = ["evt_1234"];
        for (const val of validValues) {
            rec.id = val;
            expect(rec.id).toBeDefined();
            expect(rec.id).toEqual(val);
        }
    });
});

describe("TrackingEventCertified", () => {
    it("can be created", () => {
        const rec = new TrackingEventCertified();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "type", TrackingEventCertifiedTypeEnum.Certified ],
        [ "name", TrackingEventCertifiedNameEnum.InTransit ],
        [ "name", TrackingEventCertifiedNameEnum.Mailed ],
        [ "name", TrackingEventCertifiedNameEnum.InTransit ],
        [ "name", TrackingEventCertifiedNameEnum.InLocalArea ],
        [ "name", TrackingEventCertifiedNameEnum.ProcessedForDelivery ],
        [ "name", TrackingEventCertifiedNameEnum.PickupAvailable ],
        [ "name", TrackingEventCertifiedNameEnum.Delivered ],
        [ "name", TrackingEventCertifiedNameEnum.ReRouted ],
        [ "name", TrackingEventCertifiedNameEnum.ReturnedToSender ],
        [ "name", TrackingEventCertifiedNameEnum.Issue ],
        [ "details", new TrackingEventDetails() ],
        [ "location", "fake location" ],
        [ "id", "evnt_fakeId" ],
        [ "time", "fake time" ],
        [ "date_created", new Date().toString() ],
        [ "date_modified", new Date().toString() ],
        [ "object", "tracking_event" ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new TrackingEventCertified(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
        const rec = new TrackingEventCertified();
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
        const rec = new TrackingEventCertified();
        expect(rec.id).not.toBeDefined();

        const validValues = ["evnt_1234"];
        for (const val of validValues) {
            rec.id = val;
            expect(rec.id).toBeDefined();
            expect(rec.id).toEqual(val);
        }
    });
});

describe("TrackingEventDetails", () => {
    it("can be created", () => {
        const rec = new TrackingEventDetails();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "event", TrackingEventDetailsEventEnum.Delivered ],
        [ "event", TrackingEventDetailsEventEnum.PackageAccepted ],
        [ "event", TrackingEventDetailsEventEnum.PackageArrived ],
        [ "event", TrackingEventDetailsEventEnum.PackageDeparted ],
        [ "event", TrackingEventDetailsEventEnum.PackageProcessing ],
        [ "event", TrackingEventDetailsEventEnum.PackageProcessed ],
        [ "event", TrackingEventDetailsEventEnum.PackageInLocalArea ],
        [ "event", TrackingEventDetailsEventEnum.DeliveryScheduled ],
        [ "event", TrackingEventDetailsEventEnum.OutForDelivery ],
        [ "event", TrackingEventDetailsEventEnum.PickupAvailable ],
        [ "event", TrackingEventDetailsEventEnum.Delivered ],
        [ "event", TrackingEventDetailsEventEnum.PackageForwarded ],
        [ "event", TrackingEventDetailsEventEnum.ReturnedToSender ],
        [ "event", TrackingEventDetailsEventEnum.AddressIssue ],
        [ "event", TrackingEventDetailsEventEnum.ContactCarrier ],
        [ "event", TrackingEventDetailsEventEnum.Delayed ],
        [ "event", TrackingEventDetailsEventEnum.DeliveryAttempted ],
        [ "event", TrackingEventDetailsEventEnum.DeliveryRescheduled ],
        [ "event", TrackingEventDetailsEventEnum.LocationInaccessible ],
        [ "event", TrackingEventDetailsEventEnum.NoticeLeft ],
        [ "event", TrackingEventDetailsEventEnum.PackageDamaged ],
        [ "event", TrackingEventDetailsEventEnum.PackageDisposed ],
        [ "event", TrackingEventDetailsEventEnum.PackageHeld ],
        [ "event", TrackingEventDetailsEventEnum.PackageLost ],
        [ "event", TrackingEventDetailsEventEnum.PackageUnclaimed ],
        [ "event", TrackingEventDetailsEventEnum.PackageUndeliverable ],
        [ "event", TrackingEventDetailsEventEnum.RescheduleDelivery ],
        [ "event", TrackingEventDetailsEventEnum.Other ],
        [ "description", "fake description" ],
        [ "notes", "fake notes" ],
        [ "action_required", true ],
        [ "action_required", false ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new TrackingEventDetails(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });
});

describe("TrackingEventNormal", () => {
    it("can be created", () => {
        const rec = new TrackingEventNormal();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "id", "evnt_fakeId" ],
        [ "type", TrackingEventNormalTypeEnum.Normal ],
        [ "name", TrackingEventNormalNameEnum.InTransit ],
        [ "name", TrackingEventNormalNameEnum.Mailed ],
        [ "name", TrackingEventNormalNameEnum.ReRouted ],
        [ "name", TrackingEventNormalNameEnum.ProcessedForDelivery ],
        [ "name", TrackingEventNormalNameEnum.InLocalArea ],
        [ "name", TrackingEventNormalNameEnum.ReturnedToSender ],
        [ "details", TrackingEventNormalDetailsEnum.Null ],
        [ "location", "fake location" ],
        [ "location", null ],
        [ "time", "fake time" ],
        [ "date_created", new Date().toString() ],
        [ "date_modified", new Date().toString() ],
        [ "object", "tracking_event" ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new TrackingEventNormal(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
        const rec = new TrackingEventNormal();
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
        const rec = new TrackingEventNormal();
        expect(rec.id).not.toBeDefined();

        const validValues = ["evnt_1234"];
        for (const val of validValues) {
            rec.id = val;
            expect(rec.id).toBeDefined();
            expect(rec.id).toEqual(val);
        }
    });
});

describe("Sort Criteria", () => {
    describe("SortBy", () => {
        it("can be created", () => {
            const rec = new SortBy();
            expect(rec).toBeDefined();
        });

        it.each([
            [ "date_created", SortByDateCreatedEnum.Asc ],
            [ "date_created", SortByDateCreatedEnum.Desc ],
            [ "send_date", SortBySendDateEnum.Asc ],
            [ "send_date", SortBySendDateEnum.Desc ]
        ])("can be created with a provided %s value", (prop, val) => {
            const input = {};
            (input as any)[prop] = val;

            const rec = new SortBy(input);

            expect(rec).toBeDefined();
            expect((rec as any)[prop]).toEqual(val);
        });
    });

    describe("SortBy1", () => {
        it("can be created", () => {
            const rec = new SortBy1();
            expect(rec).toBeDefined();
        });

        it.each([
            [ "date_created", SortBy1DateCreatedEnum.Asc ],
            [ "date_created", SortBy1DateCreatedEnum.Desc ],
            [ "send_date", SortBy1SendDateEnum.Asc ],
            [ "send_date", SortBy1SendDateEnum.Desc ]
        ])("can be created with a provided %s value", (prop, val) => {
            const input = {};
            (input as any)[prop] = val;

            const rec = new SortBy1(input);

            expect(rec).toBeDefined();
            expect((rec as any)[prop]).toEqual(val);
        });
    });

    describe("SortBy2", () => {
        it("can be created", () => {
            const rec = new SortBy1();
            expect(rec).toBeDefined();
        });

        it.each([
            [ "date_created", SortBy2DateCreatedEnum.Asc ],
            [ "date_created", SortBy2DateCreatedEnum.Desc ],
            [ "send_date", SortBy2SendDateEnum.Asc ],
            [ "send_date", SortBy2SendDateEnum.Desc ]
        ])("can be created with a provided %s value", (prop, val) => {
            const input = {};
            (input as any)[prop] = val;

            const rec = new SortBy2(input);

            expect(rec).toBeDefined();
            expect((rec as any)[prop]).toEqual(val);
        });
    });

    describe("SortBy3", () => {
        it("can be created", () => {
            const rec = new SortBy3();
            expect(rec).toBeDefined();
        });

        it.each([
            [ "date_created", SortBy3DateCreatedEnum.Asc ],
            [ "date_created", SortBy3DateCreatedEnum.Desc ],
            [ "send_date", SortBy3SendDateEnum.Asc ],
            [ "send_date", SortBy3SendDateEnum.Desc ]
        ])("can be created with a provided %s value", (prop, val) => {
            const input = {};
            (input as any)[prop] = val;

            const rec = new SortBy3(input);

            expect(rec).toBeDefined();
            expect((rec as any)[prop]).toEqual(val);
        });
    });

    describe("SortBy4", () => {
        it("can be created", () => {
            const rec = new SortBy4();
            expect(rec).toBeDefined();
        });

        it.each([
            [ "date_created", SortBy4DateCreatedEnum.Asc ],
            [ "date_created", SortBy4DateCreatedEnum.Desc ],
            [ "send_date", SortBy4SendDateEnum.Asc ],
            [ "send_date", SortBy4SendDateEnum.Desc ]
        ])("can be created with a provided %s value", (prop, val) => {
            const input = {};
            (input as any)[prop] = val;

            const rec = new SortBy4(input);

            expect(rec).toBeDefined();
            expect((rec as any)[prop]).toEqual(val);
        });
    });

    describe("SortBy5", () => {
        it("can be created", () => {
            const rec = new SortBy5();
            expect(rec).toBeDefined();
        });

        it.each([
            [ "date_created", SortBy5DateCreatedEnum.Asc ],
            [ "date_created", SortBy5DateCreatedEnum.Desc ],
            [ "send_date", SortBy5SendDateEnum.Asc ],
            [ "send_date", SortBy5SendDateEnum.Desc ]
        ])("can be created with a provided %s value", (prop, val) => {
            const input = {};
            (input as any)[prop] = val;

            const rec = new SortBy5(input);

            expect(rec).toBeDefined();
            expect((rec as any)[prop]).toEqual(val);
        });
    });
});

describe("SingleLineAddress", () => {
    it("can be created", () => {
        const rec = new SingleLineAddress();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "address", "fake address" ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new SingleLineAddress(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });
});

describe("SingleLineAddressIntl", () => {
    it("can be created", () => {
        const rec = new SingleLineAddressIntl();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "address", "fake address" ],
        [ "country", CountryExtended.Ad ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new SingleLineAddressIntl(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });
});

describe("Location", () => {
    it("can be created", () => {
        const rec = new Location();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "latitude", 1 ],
        [ "longitude", 2 ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new Location(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });
});
