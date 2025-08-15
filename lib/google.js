// lib/google.js
import { google } from "googleapis";

/**
 * Creates a Google Calendar event with a Meet link using an access token.
 * @param {string} accessToken
 * @param {{summary: string, start: string, end: string, attendees?: {email: string}[]}} details
 * @returns {Promise<{hangoutLink: string, eventId: string}>}
 */
export async function createGoogleMeetEvent(accessToken, details) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: details.summary,
    start: { dateTime: details.start },
    end: { dateTime: details.end },
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
  });

  return {
    hangoutLink: res.data.hangoutLink,
    eventId: res.data.id,
  };
}
