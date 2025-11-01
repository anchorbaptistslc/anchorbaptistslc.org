import { schedule } from "@netlify/functions";

/**
 * Scheduled function to trigger a Netlify build every Tuesday at 8am Mountain Standard Time (3pm UTC).
 * This ensures expired events are removed from the site and any pending content updates are published.
 *
 * Schedule: Every Tuesday at 3pm UTC (8am MST / 7am MDT)
 * Cron expression: 0 15 * * 2
 *
 * Required Environment Variable:
 * - NETLIFY_BUILD_HOOK_URL: The full Netlify build hook URL
 */

const handler = async (event) => {
  console.log("Scheduled deploy triggered at:", new Date().toISOString());

  const BUILD_HOOK_URL = process.env.NETLIFY_BUILD_HOOK_URL;

  if (!BUILD_HOOK_URL) {
    console.error("NETLIFY_BUILD_HOOK_URL environment variable is not set");
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Configuration error: NETLIFY_BUILD_HOOK_URL is not set",
        timestamp: new Date().toISOString(),
      }),
    };
  }

  try {
    // Trigger the Netlify build hook
    const response = await fetch(BUILD_HOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Build hook failed with status: ${response.status}`);
    }

    const result = await response.json();

    console.log("Build triggered successfully:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Build triggered successfully",
        timestamp: new Date().toISOString(),
        buildInfo: result,
      }),
    };
  } catch (error) {
    console.error("Error triggering build:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to trigger build",
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

// Schedule the function to run every Tuesday at 3pm UTC (8am MST)
export default schedule("0 15 * * 2", handler);
