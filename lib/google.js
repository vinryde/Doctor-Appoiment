import { google } from "googleapis";

/**
 * Creates a Google Calendar event with a Meet link using an access token.
 * @param {string} accessToken
 * @param {{summary: string, description?: string, start: Date, end: Date, attendees?: {email: string}[]}} details
 * @returns {Promise<{hangoutLink: string|null, id: string|null}>}
 */
export async function createGoogleMeetEvent(accessToken, details) {
  if (!accessToken) {
    console.warn("createGoogleMeetEvent called without access token");
    return { hangoutLink: null, id: null };
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth });

    const event = {
      summary: details.summary,
      description: details.description || "",
      start: { dateTime: new Date(details.start).toISOString() },
      end: { dateTime: new Date(details.end).toISOString() },
      attendees: details.attendees ?? [],
      conferenceData: {
        createRequest: {
          requestId: String(Date.now()),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const res = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: "all", // ensures invites go out
    });

    return {
      hangoutLink: res.data.hangoutLink || null,
      id: res.data.id || null,
    };
  } catch (err) {
    console.error("Error creating Google Meet event:", err);
    return { hangoutLink: null, id: null };
  }
}
