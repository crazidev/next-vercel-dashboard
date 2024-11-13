export async function GET() {
  // Return the manifest as JSON
  return new Response(JSON.stringify({}), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
