export type Tone = "Formal" | "Friendly" | "Persuasive";

export const emailMocks: Record<Tone, { subject: string; body: string }> = {
  Formal: {
    subject: "Q3 Project Timeline — Requested Revisions & Next Steps",
    body: `Dear Ms. Naidoo,

I hope this message finds you well. Following our review of the current Q3 delivery schedule, I am writing to confirm the revisions discussed and to outline the next steps for approval.

We propose shifting the integration milestone from 14 September to 21 September to accommodate the additional QA cycle. All downstream deliverables remain unchanged, and the final handover date is unaffected.

Kindly confirm your acceptance of the revised timeline by close of business Friday. Should you require a detailed breakdown, I would be pleased to circulate the updated project plan in advance.

Thank you for your continued collaboration.

Kind regards,
Lukhanyo Manciya
Delivery Lead, RockWorth`,
  },
  Friendly: {
    subject: "Quick update on the Q3 timeline 🙌",
    body: `Hi Thandi,

Hope your week's going well! Just a quick one on the Q3 schedule.

We're going to nudge the integration milestone out by a week (to 21 Sept) so QA has proper breathing room. Nothing else moves — the final handover date stays exactly where it is.

If that works for you, just give me a thumbs up and I'll lock it in. Happy to jump on a quick 10-minute call if you'd rather talk it through.

Thanks a mil,
Lukhanyo`,
  },
  Persuasive: {
    subject: "One week now saves three weeks later — Q3 timeline",
    body: `Hi Thandi,

I want to make a straightforward case for a one-week shift on the integration milestone, from 14 to 21 September.

Here's why it pays off: the extra QA cycle catches the exact class of defects that cost us three weeks of rework last quarter. We keep the final handover date intact, we protect the client demo, and we ship with a defect rate we can actually stand behind.

The cost is one week of internal slack. The return is a launch that doesn't need a rescue plan.

I'd like to confirm this by Friday so the team can re-sequence cleanly. Can I count on your sign-off?

Best,
Lukhanyo Manciya
Delivery Lead, RockWorth`,
  },
};

export const summaryMock = {
  executive: `The team reviewed Q3 delivery progress and agreed the integration milestone requires an additional QA cycle before release. Budget remains within the approved envelope, with a modest reallocation from contingency to cover extended testing. Client communication will be handled proactively this week, and the final handover date is unchanged. Two open risks — vendor API latency and staffing over the September leave period — were assigned owners for follow-up.`,
  items: [
    { label: "Move integration milestone from 14 Sept to 21 Sept", meta: "Decision · Approved by Thandi N." },
    { label: "Draft revised project plan and circulate to stakeholders", meta: "Action · Lukhanyo · Due Fri 22 Aug" },
    { label: "Reallocate R48,000 from contingency to extended QA", meta: "Decision · Finance notified" },
    { label: "Benchmark vendor API latency across 3 regions", meta: "Action · Sipho · Due Wed 27 Aug" },
    { label: "Confirm September leave cover for the QA pod", meta: "Action · Reneilwe · Due Mon 25 Aug" },
    { label: "Send client-facing timeline note before Friday standup", meta: "Deadline · 22 Aug, 09:00" },
  ],
};

export const scheduleBuckets = [
  {
    title: "High Priority / Morning",
    window: "08:00 – 11:30 · Deep focus block",
    tone: "high" as const,
    fallback: [
      "Finalise the revised Q3 project plan",
      "Prep the client timeline note and send before standup",
    ],
  },
  {
    title: "Medium Priority / Afternoon",
    window: "13:00 – 16:00 · Collaboration block",
    tone: "medium" as const,
    fallback: ["Review QA test coverage with Sipho", "Update the risk register"],
  },
  {
    title: "Low Priority / Tomorrow",
    window: "Deferred · Batch into one session",
    tone: "low" as const,
    fallback: ["Archive Q2 retro documents", "Refresh the team onboarding checklist"],
  },
];