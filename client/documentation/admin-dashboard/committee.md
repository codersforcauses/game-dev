## Committee Members

URL: `/admin/game_dev/committee/`

Profiles of the Committee Members of the club that are displayed on the about page `/about`.

## Prerequisites

As a committee member is also a member of the club, you must construct a member first via `/admin/game_dev/member/add/`. Back on the committee page, you can find a specific member (e.g. the one you just created) by clicking the magnifying glass icon next to the `Id` input box.

## Fields

**Id:** Required and unique field for the club member that is on the committee. It is an integer field that corresponds to the raw integer id of a row in the Member table, as a Foreign Key if you know databases.

**Role:** Required and unique field for the specific role in the committee that this member has. It is something known as an Enum (Enumeration), which has a discrete number of custom choices. You can choose from 'President', 'Vice President', 'Secretary', 'Treasurer', 'Marketing', 'Events OCM', 'Projects OCM', and 'Fresher Rep'. Since they must be unique, you can only have 8 objects in the Committee table at a time for now. This can definitely be changed in the future when the committee grows.
