type Ga4EventParams = Record<string, string | number | boolean | undefined>;

export async function sendGa4ServerEvent({
  clientId,
  name,
  params,
}: {
  clientId?: string;
  name: string;
  params: Ga4EventParams;
}): Promise<boolean> {
  const measurementId =
    process.env.GA4_MEASUREMENT_ID ?? process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret || !clientId) return false;

  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );

  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name, params: safeParams }],
      }),
    }
  );

  if (!response.ok) {
    console.error(`[ga4] ${name} event failed with ${response.status}`);
  }
  return response.ok;
}
