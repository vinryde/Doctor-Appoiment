import { google } from "googleapis";
import { v4 as uuidv4 } from "uuid"; // Recommended for generating unique request IDs

/**
 * Creates a Google Calendar event with a Google Meet link using a service account.
 *
 * This function requires the following environment variables to be set:
 * - GOOGLE_SERVICE_ACCOUNT_KEY: A stringified JSON object of the service account credentials.
 * - GOOGLE_CALENDAR_ID: The ID of the target calendar (e.g., "primary" or "your-calendar@group.calendar.google.com").
 * - (Optional) GOOGLE_IMPERSONATE_EMAIL: A Google Workspace user's email to act as the event organizer. Requires Domain-Wide Delegation.
 *
 * @param {{
 * doctor: { email?: string|null, name?: string|null },
 * patient: { email?: string|null, name?: string|null },
 * startTime: Date,
 * endTime: Date,
 * description?: string|null
 * }} params - The event details.
 * @returns {Promise<{hangoutLink: string|null, id: string|null}>} An object containing the Google Meet link and the event ID, or null values if creation fails.
 */
export async function createGoogleMeetEvent({
  doctor,
  patient,
  startTime,
  endTime,
  description,
}) {
  try {
    // 1. Validate and Parse Service Account Key
    const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!rawKey) {
      console.error("CRITICAL: GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set.");
      return { hangoutLink: null, id: null };
    }

    const keyObj = JSON.parse(rawKey);
    // The private key from env vars often has escaped newlines; this fixes them.
    if (keyObj.private_key && keyObj.private_key.includes("\\n")) {
      keyObj.private_key = keyObj.private_key.replace(/\\n/g, "\n");
    }

    // 2. Authenticate and Authorize
    const auth = new google.auth.GoogleAuth({
      credentials: keyObj,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    // Impersonation allows the service account to act "on behalf of" a real user.
    // This requires Domain-Wide Delegation to be configured in your Google Workspace.
    const subject = process.env.GOOGLE_IMPERSONATE_EMAIL;
    const authClient = await auth.getClient();
    if (subject && authClient instanceof google.auth.JWT) {
      authClient.subject = subject;
    }

    const calendar = google.calendar({ version: "v3", auth: authClient });
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
        console.error("CRITICAL: GOOGLE_CALENDAR_ID environment variable is not set.");
        return { hangoutLink: null, id: null };
    }

    // 3. Construct the Event Resource Payload
    const eventResource = {
      summary: `Appointment: ${patient?.name || 'Patient'} with Dr. ${doctor?.name || 'Doctor'}`,
      description: description || "Telehealth consultation.",
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "UTC", // Using UTC is best practice for consistency
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "UTC",
      },
      conferenceData: {
        createRequest: {
          requestId: uuidv4(),
        },
      },
    };

    // 4. Insert the Event into the Calendar
    const res = await calendar.events.insert({
      calendarId: calendarId,
      resource: eventResource,
      conferenceDataVersion: 1, // Required to generate conference data
      sendUpdates: "none",
    });

    // 5. Extract and Return the Meet Link and Event ID
    const eventId = res.data?.id || null;

    // ✅ ROBUST EXTRACTION: Check both hangoutLink and the entryPoints array.
    const meetFromEntryPoints = res.data?.conferenceData?.entryPoints?.find(
        (e) => e.entryPointType === "video"
    )?.uri;

    const hangoutLink = res.data?.hangoutLink || meetFromEntryPoints || null;

    if (!hangoutLink) {
        console.warn("Event was created successfully, but a hangoutLink could not be found. Please check your Google Calendar settings to ensure 'Automatically add video conferences' is enabled.", res.data);
    }

    return {
      hangoutLink: hangoutLink,
      id: eventId,
    };
  } catch (err) {
    console.error("Error creating Google Meet event (service account):", err.message);
    // Log the detailed error from the Google API if available
    if (err.response && err.response.data) {
      console.error("Google API Error Details:", JSON.stringify(err.response.data, null, 2));
    }
    return { hangoutLink: null, id: null };
  }
}
