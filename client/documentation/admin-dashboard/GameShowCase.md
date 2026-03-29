# Showcase Page Maintenance Guide

> This document is intended for website administrators to help maintain the content of the Game and Art Showcase tables.

## Game Showcase

The Game Showcase page is managed by administrators to highlight outstanding individual games. It serves as the featured section of the game library.

## Prerequisites

1. **Add a Game**
     - Path: `/admin/game_dev/game/add/`
     - Required fields: name, description, completion status, host URL, thumbnail, event, etc.

2. **Add Game Contributors**
     - Path: `/admin/game_dev/gamecontributor/add/`
     - Link club members to individual games. Each contributor must first be created in the `/admin/game_dev/member/` member panel.

## Add Game Showcase

1. Navigate to: `/admin/game_dev/gameshowcase/add/`
2. Use the search function to find the desired game, then click the game ID to populate the value.
3. Enter the committee's recommendation in the "Description" field.
4. Save your changes and review the showcase page to ensure the content is correct.


## Page Elements Maintenance

- **Game Title**
    - Edit at: `/admin/game_dev/game/`

- **Recommendation (Committee Advice)**
    - Edit at: `/admin/game_dev/gameshowcase/`, under the field "Description"
    - This recommendation appears directly under the game title as advice from the committee.

- **Game Description**
    - Edit at: `/admin/game_dev/game/`
    - The description is shown below the cover image and contributor section, and matches the content on the individual game page.

- **Cover Image**
    - Uses the thumbnail uploaded when adding the game.
    - Edit at: `/admin/game_dev/game/`


## Art Showcase

The Art Showcase page is managed by administrators to highlight outstanding individual artworks. It serves as the featured section of the art library.

## Prerequisites

1. **Add an Art Object**
     - Path: `/admin/game_dev/art/add/`
     - Required fields: name, description, source_game, media, active

2. **Add Art Contributors**
     - Path: `/admin/game_dev/artcontributor/add/`
     - Link club members to individual artworks. Each contributor must first be created in the `/admin/game_dev/member/` member panel.

## Add Art Showcase

1. Navigate to: `/admin/game_dev/artshowcase/add/`
2. Use the search function to find the desired art object, then click the art ID to populate the value.
3. Enter the committee's recommendation in the "Description" field.
4. Save your changes and review the showcase page to ensure the content is correct.

## Page Elements Maintenance

- **Art Name**
    - Edit at: `/admin/game_dev/art/`

- **Recommendation (Committee Advice)**
    - Edit at: `/admin/game_dev/artshowcase/`, under the field "Description"
    - This recommendation appears directly under the art name as advice from the committee.

- **Art Description**
    - Edit at: `/admin/game_dev/art/`

- **Media**
    - Uses the media uploaded when adding the art.
    - Edit at: `/admin/game_dev/art/`