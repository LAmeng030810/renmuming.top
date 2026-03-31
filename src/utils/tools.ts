/**
 * 验证值是否在常量数组中
 * @param value - 要判断的值
 * @param constArray - as const 定义的常量数组
 * @returns 验证通过返回该值，否则返回 undefined
 */
export function validateIncludes<T extends readonly unknown[]>(
  value: unknown,
  constArray: T,
): T[number] | undefined {
  return constArray.includes(value as T[number])
    ? (value as T[number])
    : undefined
}
