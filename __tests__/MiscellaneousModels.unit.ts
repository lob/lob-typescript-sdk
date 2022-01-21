import {
    LobError, LobErrorCodeEnum, LobErrorStatusCodeEnum,
    Thumbnail
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
});