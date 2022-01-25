export function fail(reason: string = "fail was called in a test."): void {
  throw new Error(reason);
}

export function debugLog(...message: any[]) {
  if (process.env.DEBUG_LOG_TESTS === "true") {
    console.log(...message);
  }
}
