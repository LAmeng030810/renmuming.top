import { describe, expect, it } from 'vitest'

describe('i18n messages', () => {
  it('should load all languages', async () => {
    const modules = import.meta.glob('./messages/*.{ts,js}', { eager: true })
    const messages: Record<string, any> = {}

    for (const path in modules) {
      const fileName = path.replace(/^\.\/messages\/(.*)\.(ts|js)$/, '$1')
      messages[fileName] = (modules[path] as any).default
    }

    expect(Object.keys(messages)).toContain('zh_CN')
    expect(Object.keys(messages)).toContain('en')
  })
})
