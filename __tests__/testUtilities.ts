export const TEN_MINUTES = 1000 * 60 * 10;

export function fail(reason: string = "fail was called in a test."): void {
    throw new Error(reason);
}