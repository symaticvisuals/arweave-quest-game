export async function GET() {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "API-Key": process.env.DATA_API_KEY || "",
  };

  const res = await fetch("https://data.mongodb-api.com/...", { headers });
  const data = await res.json();

  return Response.json({ data });
}
