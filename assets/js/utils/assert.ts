export default function assert(condition: unknown, msg?: string): asserts condition {
    if (!condition) {
        throw msg || 'assert error';
    }
}