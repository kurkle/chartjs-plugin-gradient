import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

// The minified bundle must not be re-instrumented or re-registered by the
// unit-test setup, so this suite deliberately runs without test/setup.js and
// without coverage: coverage of a terser-mangled bundle is noise, not signal.
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
      screenshotFailures: false,
    },
    globals: true,
    include: ['test/integration/min-bundle/*.spec.js'],
  },
})
