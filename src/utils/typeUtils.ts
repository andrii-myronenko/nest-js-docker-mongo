export function assertNotNil<T extends any>(
    value: T,
    reason = 'No reason specified',
): asserts value is NonNullable<T> {
    if (!value) {
        throw new Error(reason);
    }
}
