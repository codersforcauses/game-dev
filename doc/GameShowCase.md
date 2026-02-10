# Game Showcase Page Maintenance Guide

> This document is intended for website administrators to help maintain the content of the Game Showcase page.

---

## Page Overview

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

- **Contributors**
    - Each contributor is a website member, inheriting ID, name, and social media links from the member panel.
    - Edit member info at: `/admin/game_dev/member/`
    - Contributor roles can be freely assigned at `/admin/game_dev/gamecontributor/`.

---


