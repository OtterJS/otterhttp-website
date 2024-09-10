export function arrayShallowEquals(first: unknown[], second: unknown[]) {
  if (!Array.isArray(first)) return false
  if (!Array.isArray(second)) return false
  if (first.length !== second.length) return false
  return first.every((value, index) => value === second[index])
}
