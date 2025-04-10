import sharp from "sharp";

export async function GET(req: Request) {
  try {
    // Log all Request properties
    console.log("=== REQUEST INFORMATION ===");
    console.log("Request URL:", req.url);
    console.log("Request method:", req.method);
    console.log("Request cache:", req.cache);
    console.log("Request credentials:", req.credentials);
    console.log("Request destination:", req.destination);
    console.log("Request integrity:", req.integrity);
    console.log("Request keepalive:", req.keepalive);
    console.log("Request mode:", req.mode);
    console.log("Request redirect:", req.redirect);
    console.log("Request referrer:", req.referrer);
    console.log("Request referrerPolicy:", req.referrerPolicy);
    console.log("Request bodyUsed:", req.bodyUsed);

    // Note: We don't log req.body directly as it's a ReadableStream
    // and req.signal as it's an AbortSignal object

    // Parse URL to extract search parameters
    const url = new URL(req.url);

    // Extract width and height from query parameters, default to 200 if not provided
    const width = parseInt(url.searchParams.get("width") || "200", 10);
    const height = parseInt(url.searchParams.get("height") || "200", 10);

    // Validate dimensions to prevent excessive resource usage
    const maxDimension = 2000; // Set a reasonable limit
    const validWidth = Math.min(Math.max(1, width), maxDimension);
    const validHeight = Math.min(Math.max(1, height), maxDimension);

    console.log(
      `Generating image with dimensions: ${validWidth}x${validHeight}`
    );

    // Log all headers from the request
    console.log("=== Request headers ===");
    const headers: Record<string, any> = {};
    req.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
      headers[key] = value;
    });

    // Log search parameters
    console.log("=== Search parameters ===");
    url.searchParams.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    // Create an image with the requested dimensions
    const imageBuffer = await sharp({
      create: {
        width: validWidth,
        height: validHeight,
        channels: 3,
        background: { r: 0, g: 0, b: 255 }, // RGB for blue
      },
    })
      .png() // Output format
      .toBuffer();

    // Set headers and return the image
    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400", // Cache for 1 day
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
