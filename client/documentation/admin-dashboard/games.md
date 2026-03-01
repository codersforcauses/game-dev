## Games

Pages for games can be added and edited at the row 'Game' of the GAME_DEV section on the main admin page.

### Fields

**Name:** Required field for the game's name. A character field (includes letters, numbers and symbols) of maximum length 200 characters.

**Descripiton:** Required field for the game's description. A text field.

**Completion:** Required field for the game's completion. A multichoice option field with four options including:
 - "Work in progress (Unplayable)"
 - "Playable - In Development"
 - "Beta - Stable but not Final"
 - "Completed" 

**Active:** Required field for if the game is continued to be being worked on. A boolean field.

**Host URL:** Optional field for the game's host URL. A URL field with a maximum length 2083 characters

**Itch Embed ID:** Optional field for game's embed. If the field is empty the game will display a custom embed ID at the bottom of the page. This value can be gotten from the itch.io page of the game, at the bottom of the page there is an embed button, clicking this will bring up a full embed, the only part needed is the 7 digit number after "https://itch.io/embed/".

**Thumbnail:** Required field for the game's thumbnail. This image is displayed on the game page in place of a game embed or displayed within the game embed before the play button is pressed. Must be an image file.

**Event:** Optional field for the event at which the game was created. Links the game to an event. Foreign key field for an event.

**Itch Game Embed ID:** Optional field for the game's game embed. This ID allows the web version of a game to be played inside the site. This value can be acquired in two ways, either by the developer or through looking in the page source. A developer can get the value by going to the distribution tab of their game and going to the embed game section this will bring up a full embed for the game and the only part needed is the 8 digit number after "https://html-classic.itch.zone/html/". By looking through the page source that link can also be found either in a div or an iframe on the page depending on if the game has been played. **This value is not attainable if there is no web version of the game. hosted on itch.**

**Itch Game Width:** Required field for the game's game embed. This value is gotten in a similar way to the Itch Game Embed, however for the developer it's the number after "width=" and in the page source is found after "data-width=".

**Itch Game Height:** Required field for the game's game embed. This value is gotten in a similar way to the Itch Game Embed, however for the developer it's the number after "height=" and in the page source is found after "data-height=".