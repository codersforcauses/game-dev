## Contributors

Models that associate a member object with another certain object as a contributor to it. There are two types:

## Game Contributor

A model that will associate a certain member with having contributed to a certain game. A Game Contributor object will be represented under the 'Contributors' section of a game's page as the name of the member who contributed.

## Fields

**Game:** Required field for the game that the contributor is for. It is an integer field that corresponds to the raw integer id of a Game object in the Game table, known as a Foreign Key.

**Member:** Required field for the member that is the contributor to the specified game. It is an integer field that corresponds to the raw integer id of a Member object in the Member table, known as a Foreign Key.

**Role:** Required character field for the description of the role that the person played in contributing to the game. Maximum length of 100 characters

## Other Notes

You will see a little magnifying glass when selecting a Game and Member, click on it to see their respective table and be able choose the integer id's using the desired details. Though none of the individual fields are a primary key, the actual primary key is the unique (Game, Member) pair that each object forms.


## Art Contributor

A model that will associate a certain member with having contributed to a certain artwork. An Art Contributor object will be represented under the 'Contributors' section of an artworks's page as the name of the member who contributed.

## Fields

**Art:** Required field for the artwork that the contributor is for. It is an integer field that corresponds to the raw integer id of an Art object in the Art table, known as a Foreign Key.

**Member:** Required field for the member that is the contributor to the specified artwork. It is an integer field that corresponds to the raw integer id of a Member object in the Member table, known as a Foreign Key.

**Role:** Required character field for the description of the role that the person played in contributing to the artwork. Maximum length of 100 characters

## Other Notes

You will see a little magnifying glass when selecting an Art and a Member, click on it to see their respective table and be able choose the integer id's using the desired details. Though none of the individual fields are a primary key, the actual primary key is the unique (Art, Member) pair that each object forms.