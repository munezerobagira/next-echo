import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Log all properties of the NextRequest object

    console.log("=== REQUEST INFORMATION ===");
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Request nextUrl:", req.nextUrl);
    console.log("Request integrity:", req.integrity);
    console.log("Request referrerPolicy:", req.referrerPolicy);
    console.log("Request keepalive:", req.keepalive);
    console.log("Request mode:", req.mode);
    console.log("Request redirect:", req.redirect);
    console.log("Request referrer:", req.referrer);
    console.log("Request bodyUsed:", req.bodyUsed);

    console.log("Request cookies:", req.cookies);
    console.log("Request credentials:", req.credentials);
    console.log("Request cache:", req.cache);
    console.log("Request destination:", req.destination);
    console.log("Request headers (object):", Object.fromEntries(req.headers));
    const url = new URL(req.url);

    // Start building the HTTP request string
    let httpRequestString = `${req.method} ${url.pathname}${url.search} HTTP/1.1\r\n`;

    // Add all headers

    // Note: We don't log req.body directly as it's a ReadableStream
    // and req.signal as it's an AbortSignal object

    // Parse URL to extract search parameters

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

    // Set headers and return the image
    // Add headers to the string representation
    req.headers.forEach((value, key) => {
      httpRequestString += `${key}: ${value}\r\n`;
    });

    // Add a blank line to separate headers from body
    httpRequestString += "\r\n";

    // Build full HTTP request information including all logged details
    const fullRequestInfo = `=== REQUEST INFORMATION ===
Request method: ${req.method}
Request URL: ${req.url}
Request nextUrl: ${req.nextUrl}
Request integrity: ${req.integrity}
Request referrerPolicy: ${req.referrerPolicy}
Request keepalive: ${req.keepalive}
Request mode: ${req.mode}
Request redirect: ${req.redirect}
Request referrer: ${req.referrer}
Request bodyUsed: ${req.bodyUsed}
Request cookies: ${JSON.stringify(req.cookies)}
Request credentials: ${req.credentials}
Request cache: ${req.cache}
Request destination: ${req.destination}
Request headers: ${JSON.stringify(Object.fromEntries(req.headers))}

=== Raw HTTP Request ===
${httpRequestString}`;

    // Return all the request information
    return new Response(fullRequestInfo, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
