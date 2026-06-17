"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackLeadEvent, type LeadAction } from "@/lib/tracking";

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  eventName: LeadAction;
  eventLabel?: string;
  service?: string;
};

export default function TrackedLink({
  eventName,
  eventLabel,
  service,
  href,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        trackLeadEvent(eventName, {
          label: eventLabel,
          destination: typeof href === "string" ? href : undefined,
          service,
        });
        onClick?.(event);
      }}
      {...props}
    />
  );
}
