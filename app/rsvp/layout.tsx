import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSVP | Shannon & Austin",
  description: "RSVP for Shannon & Austin's wedding on August 8, 2026.",
};

export default function RSVPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
