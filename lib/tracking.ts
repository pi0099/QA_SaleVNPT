export type LeadAction =
  | "phone_click"
  | "zalo_click"
  | "messenger_click"
  | "package_register_click"
  | "landing_cta_click";

type LeadEventPayload = {
  label?: string;
  path?: string;
  destination?: string;
  service?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __googleAdsSendTo?: string;
  }
}

function toMetaEvent(action: LeadAction) {
  if (action === "phone_click" || action === "messenger_click") return "Contact";
  return "Lead";
}

function getGoogleAdsSendTo() {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SEND_TO ||
    window.__googleAdsSendTo
  );
}

export function trackLeadEvent(action: LeadAction, payload: LeadEventPayload = {}) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event_category: "lead",
    event_label: payload.label,
    page_path: payload.path ?? window.location.pathname,
    destination: payload.destination,
    service: payload.service,
  };

  window.dataLayer?.push({
    event: "lead_action",
    lead_action: action,
    ...eventPayload,
  });

  window.gtag?.("event", action, eventPayload);

  const googleAdsSendTo = getGoogleAdsSendTo();

  if (googleAdsSendTo) {
    window.gtag?.("event", "conversion", {
      send_to: googleAdsSendTo,
      value: 1,
      currency: "VND",
      ...eventPayload,
    });
  }

  window.fbq?.("track", toMetaEvent(action), {
    content_name: payload.label,
    content_category: payload.service,
    page_path: eventPayload.page_path,
    destination: payload.destination,
  });
}
