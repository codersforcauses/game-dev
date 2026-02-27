## About/Committee Page

Has a description of the club, it's aim's etc, along with a big feature photo, intended to be a group photo of the committee or a big event? Then below is a display of all the current committee members of the club, showing name, role and pronouns.

## Hardcoded content to be modified by committee members

The club description and feature photo are the only things hardcoded into the website's front-end. Starting from the root directory of this website's source, this code to modify can be found in /client/src/pages/about.tsx

## Other Notes

The Committee Members are always displayed in the same order on the about page, which is the order mentioned in admin-dashboard/committee.md. If a certain Committee object can't be retreived, a placeholder Committee Member portrait will be displayed to maintain the same order.