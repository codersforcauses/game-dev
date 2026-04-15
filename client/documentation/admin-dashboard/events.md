## Events

URL: `/admin/game_dev/event/add`

Event instances that are displayed on the landing and events pages

## Fields

**Name:** Required character field for the event's name.

**Date:** Required field for the event date and time. Must be a valid date and time. Uses either ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ) or American format (MM-DD-YYYY HH:MM) for date and time representation.

**Description:** Optional character field for a description of the event.

**Publication Date:** Required field for the date the event is published. Uses either ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ) or American format (MM-DD-YYYY HH:MM) for date and time representation.

**Cover Image:** Optional field to upload a cover image for the event, which will otherwise display the event's name.

**Location:** Required field for the event location.

## Other Notes

An Event object can referenced in a Game object's 'Event' field, which is also a foreign key. On the events page, events will either show up under past or upcoming depending on their date, and each Event object can be directly routed to at /events/{id} (integer uid).
