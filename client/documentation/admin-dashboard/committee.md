## Committee Members

Profiles of the Committee Members of the club that are displayed on the about page.

## Fields

**Id:** Required and unique field for the club member that is on the committee. It is an integer field that corresponds to the raw integer id of a row in the Member table, as a Foreign Key if you know databases.

**Role:** Required and unique field for the specific role in the committee that this member has. It is something known as an Enum (Enumeration), which has a discrete number of custom choices. You can choose from 'President', 'Vice President', 'Secretary', 'Treasurer', 'Marketing', 'Events OCM', 'Projects OCM', and 'Fresher Rep'. Since they must be unique, you can only have 8 objects in the Committee table at a time for now. This can definitely be changed in the future when the committee grows.

## Other Notes

Before making a Committee object in the Committee table, you must make a Member object for the person that's on the committee and then link it through the id (just to clarify)

The Committee Members are always displayed in the same order on the about page, which is the order previously mentioned. If a certain Committee object can't be retreived, a placeholder Committee Member portrait will be displayed to maintain the same order.