# admin-dashboard / art

## Purpose
Add and manage artwork items shown on the site, including optional links to a source game and featured artwork sections.

## Create a new Art entry (Admin: Art)
Fields to fill:
- `Name`: The public title displayed on artwork cards and detail pages.
- `Description`: Short description shown on cards and details.
- `Source game` (optional): Link this art to a game. If set, the artwork card shows “from game” and links to that game. If empty, the card shows “No associated game.”
- `Media`: The actual artwork image file. Required.
- `Active`: Currently not used in the frontend filtering; it does not hide or show items by itself.

Contributor entries (inline “Art Contributors”):
- `Member`: The club member who contributed the art.
- `Role`: Their role (e.g. Artist, Designer, Illustrator). Each member can only be added once per art item.

## Feature artwork on the site (Admin: Art Showcase)
To make art appear in the “Featured” section:
- Create an Art Showcase entry.
- Fields:
  - `Art`: Select the artwork to feature (one showcase per artwork).
  - `Description`: Text shown as `showcase_description` in the API.
  - When featuring new art, delete the old featured item; otherwise the app picks the lowest `id` (ascending order).

Important behavior:
- The frontend “Featured” section only pulls artworks that have a related Art Showcase entry. If you want to remove a featured item, delete its Art Showcase record.

## Removing or hiding art
- To unfeature: delete the Art Showcase entry for that artwork.
- To remove entirely: delete the Art item (also removes its contributors and showcase).

## itch.io data
- Not applicable for art entries. No itch.io fields are used for artwork.