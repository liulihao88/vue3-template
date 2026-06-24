import { getConfig } from '@/config'

type AnalyticsPrimitive = string | number | boolean | null | undefined
type AnalyticsValue = AnalyticsPrimitive | AnalyticsPrimitive[] | Record<string, AnalyticsPrimitive>

export type AnalyticsPayload = Record<string, AnalyticsValue>

export type AnalyticsEvent = {
  name: string
  payload?: AnalyticsPayload
}

export type PageViewPayload = {
  path: string
  fullPath: string
  title?: string
  referrer?: string
}

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void
  pageview(payload: PageViewPayload): void
}

const ANALYTICS_DEBUG_PREFIX = '[analytics]'

class ConsoleAnalyticsProvider implements AnalyticsProvider {
  track(event: AnalyticsEvent) {
    console.info(`${ANALYTICS_DEBUG_PREFIX} event`, event)
  }

  pageview(payload: PageViewPayload) {
    console.info(`${ANALYTICS_DEBUG_PREFIX} pageview`, payload)
  }
}

class NoopAnalyticsProvider implements AnalyticsProvider {
  track() {}

  pageview() {}
}

let provider: AnalyticsProvider = new NoopAnalyticsProvider()

function isAnalyticsEnabled() {
  return import.meta.env.VITE_ANALYTICS_ENABLED === 'true'
}

function shouldUseConsoleProvider() {
  if (import.meta.env.VITE_ANALYTICS_DEBUG === 'true') {
    return true
  }

  const analyticsDebug = getConfig('Analytics.Debug') as unknown as boolean | undefined
  return analyticsDebug === true
}

export function setupAnalytics() {
  if (!isAnalyticsEnabled()) {
    provider = new NoopAnalyticsProvider()
    return provider
  }

  provider = shouldUseConsoleProvider() ? new ConsoleAnalyticsProvider() : new NoopAnalyticsProvider()
  return provider
}

export function trackEvent(name: string, payload?: AnalyticsPayload) {
  provider.track({ name, payload })
}

export function trackPageView(payload: PageViewPayload) {
  provider.pageview(payload)
}
