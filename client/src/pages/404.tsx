"use client";

import Link from "next/link";
import { useEffect,useState } from "react";

import { Button } from "@/components/ui/button";

interface Trivia {
  question: string;
  answer: string;
}

const TRIVIA: Trivia[] = [
  {
    question:
      "What 1997 N64 video game, widely cited as one of the greatest of all time, features James Bond up against a criminal syndicate and is named after the 1995 film in the Bond franchise?",
    answer: "GoldenEye",
  },
  {
    question:
      'Originally given the Japanese title "Puckman," what 1980s arcade game was inducted into the Guinness Book of Records as the "Most Successful Coin-Operated Game" in 2005?',
    answer: "Pac-Man",
  },
  {
    question:
      "In July 2023, video game company EA announced that players will be able to explore Wakanda in an upcoming open-world video game based on the adventures of what Marvel superhero?",
    answer: "Black Panther",
  },
  {
    question:
      "Which spooky 2001 GameCube game starring Mario's brother got a reboot for Nintendo Switch in 2019?",
    answer: "Luigi's Mansion",
  },
  {
    question:
      'In May 2022, the government of what European nation banned its employees from using American gaming terms such as "e-sports," instead using their domestic language counterparts?',
    answer: "France",
  },
  {
    question:
      "In 2011, the World Health Organization included VGA, an addiction to what activity, among its mental health disorders for the first time?",
    answer: "Video Games",
  },
  {
    question:
      "What Will Wright created video game series, released in 2000 (with sequels in 2004, 2009, and 2014), saw players watching and directing characters to mundane things like eating, sleeping, and cleaning their houses?",
    answer: "The Sims",
  },
  {
    question:
      "Regarded as one of the greatest video games of all time, what 1981 arcade game features the titular amphibian trying to cross a road and a river?",
    answer: "Frogger",
  },
  {
    question:
      "What is thought to be the first video game, created in 1958 and becoming popular in the 1970s?",
    answer: "Pong",
  },
  {
    question:
      "Which video game console released in 2006 pioneered the use of motion controls in its gameplay?",
    answer: "Nintendo Wii",
  },
  {
    question:
      'Making his debut in 1990s "Super Mario World," what is the name of the enemy-eating, egg-throwing green dinosaur who serves as a sidekick to Mario and Luigi?',
    answer: "Yoshi",
  },
  {
    question:
      "In 2014, Google partnered with Game Freak and Nintendo as part of an April Fool's Day prank to create a new version of Google Maps. This prank inspired what massively popular 2016 video game?",
    answer: "Pokemon Go",
  },
  {
    question:
      "What video game came with the Nintendo Entertainment System when it was released in the late 1980s, and was meant to be played with the NES Zapper gun?",
    answer: "Duck Hunt",
  },
  {
    question:
      "Introduced on Wii consoles, Nintendo gamers can make their own in-game character by creating an avatar known by what three-letter name that sounds similar to a pronoun?",
    answer: "Mii",
  },
  {
    question:
      'What word completes the title of the 2017 game "Super Mario" what, for the Nintendo Switch? The word in question is also a vehicle manufactured by Honda.',
    answer: "Odyssey",
  },
  {
    question:
      'What Konami game from September 1998 was initially released to the European arcade audience under the name "Dancing Stage?"',
    answer: "Dance Dance Revolution",
  },
  {
    question:
      "In Mario Kart, the power-up that seeks out the player in first position and explodes on impact is a shell that is what color?",
    answer: "Blue",
  },
  {
    question:
      "The company that created Fortnite, EPIC, also created a game engine that is licensed to other game creators, named what?",
    answer: "Unreal",
  },
  {
    question:
      "Smoke on the Water is a fictional medical-marijuana shop that can be purchased by Franklin with money in what heist-y video game franchise?",
    answer: "Grand Theft Auto",
  },
  {
    question:
      "Which PlayStation platformer released in 1996 has you play as the titular character—a marsupial prone to mayhem who was captured by Dr. Neo Cortex?",
    answer: "Crash Bandicoot",
  },
  {
    question:
      "The Warthog is the nickname of the M12 Force Application Light Reconnaissance Vehicle, a fictional armored vehicle that appears in what video game series?",
    answer: "Halo",
  },
  {
    question:
      "Pocket, Light, Color, and Advance were all styles or variants of what video game hardware system?",
    answer: "Game Boy",
  },
  {
    question:
      "Released in 2004 by Blizzard Entertainment and set in the fictional universe of Azeroth, what is the name of the computer game that became the world's most popular MMORPG?",
    answer: "World of Warcraft",
  },
  {
    question:
      "What object does Mario typically leap onto after completing a level in the earliest iterations of his franchise?",
    answer: "Flag pole",
  },
  {
    question:
      "What third-person shooter video game developed by Nintendo was first released in 2015 and features characters known as inklings?",
    answer: "Splatoon",
  },
  {
    question:
      "In Super Mario Kart, the first game in Nintendo's racing franchise, which of the playable characters has the shortest name?",
    answer: "Toad",
  },
  {
    question:
      "When the kids online say \"LoL,\" they're either laughing or referencing what online battle arena game that's been sponsored by Mastercard since 2018?",
    answer: "League of Legends",
  },
  {
    question:
      "What 2009 game, developed by Mojang, is an open sandbox in which players often build structures and battle creepers and zombies?",
    answer: "Minecraft",
  },
  {
    question:
      'A 2017 Guerrilla Games game, published on the PlayStation 4, that features Aloy battling giant machines with her bow, is what "Zero Dawn"?',
    answer: "Horizon Zero Dawn",
  },
  {
    question:
      "Harry must collect treasures including gold and diamonds without landing in quicksand in what classic 1982 Atari game with an exclamation point in the title?",
    answer: "Pitfall!",
  },
  {
    question:
      "What word—which shares its name with a popular soda brand—describes a 2D bitmap image, such as a video game character, that's integrated into a larger scene?",
    answer: "Sprite",
  },
  {
    question:
      "In what franchise-launching 1985 educational video game was a user required to have a warrant for each arrest while traveling to locales like Oslo and Cairo?",
    answer: "Where in the World Is Carmen San Diego?",
  },
  {
    question:
      'An egg-shaped wind instrument dating back to ancient times appears in the title of what 1998 installment in the "Legend of Zelda" franchise?',
    answer: "Ocarina of Time",
  },
  {
    question:
      "2021 saw the release of what sixth game in the Halo franchise, continuing the adventures of Master Chief? Its name sounds as if the game's story will continue in perpetuity.",
    answer: "Halo Infinite",
  },
  {
    question:
      'Mendicant Bias and Offensive Bias are fictional AIs in what "holy" video game franchise that shares its name with a Beyonce song?',
    answer: "Halo",
  },
  {
    question:
      "What 2018 video games are set in 1899 and follow the story of outlaws Arthur Morgan and John Marston?",
    answer: "Red Dead Redemption 2",
  },
  {
    question:
      'Used while playing "Contra," the original Konami code gave you 30 extra of what video game things?',
    answer: "Extra Lives",
  },
  {
    question:
      'What card game related to the "Warcraft" universe did Blizzard release in 2014?',
    answer: "Hearthstone",
  },
  {
    question:
      "A sleek black convertible known as the Regalia is the car Noctis and his friends use to travel across Eos in the 15th installment of what alliterative video game franchise?",
    answer: "Final Fantasy",
  },
  {
    question:
      'Dressed in purple and black with an upside-down "L" on his cap, what skinny and mustachioed character made his debut in the 2000 Nintendo 64 game, "Mario Tennis?"',
    answer: "Waluigi",
  },
  {
    question:
      'Although early versions of the game featured a character named "Ivan the Space Biker," the game\'s maker (Valve) eventually settled on "Gordon Freeman" as the hero. What was the game?',
    answer: "Half-Life",
  },
  {
    question:
      "What video game character is described as a young, energetic, violet creature with orange medium-sized wings, large curved horns, and a spiral-shaped spike on his tail?",
    answer: "Spyro the Dragon",
  },
  {
    question:
      "What name is shared by a sci-fi video game franchise, a Beyonce song, and the tiara worn by Kate Middleton on her wedding day?",
    answer: "Halo",
  },
  {
    question:
      "In the timeless Oregon Trail video games, you were often given three options to get across rivers: caulk and float, take a ferry, and what four-letter third choice?",
    answer: "Ford",
  },
  {
    question:
      "What Star Wars console video game released at the end of 2020 focuses on space combat inspired by the movie franchise?",
    answer: "Star Wars: Squadrons",
  },
  {
    question:
      "What 2021 installment in the Call of Duty video game franchise shares its name with one of America's largest investment management firms?",
    answer: "Vanguard",
  },
  {
    question:
      'What fantasy kingdom is the main setting for the "Legend of Zelda" video game series?',
    answer: "Hyrule",
  },
  {
    question:
      "Chuck E. Cheese was originally founded by Nolan Bushnell, who also co-founded what video game company known for its 2600?",
    answer: "Atari",
  },
  {
    question:
      'The third entry in an extremely popular post-apocalyptic video game franchise was set in an area known as "Capital Wasteland," the ruins of Washington, DC. What is the name of this franchise?',
    answer: "Fallout",
  },
  {
    question:
      'In 2008, the open world racing game was pioneered with the release of what "Paradise"?',
    answer: "Burnout Paradise",
  },
  {
    question:
      "Imane Anys, whose millions of followers love to watch her play League of Legends and Fortnite, is better known by what name?",
    answer: "Pokimane",
  },
  {
    question:
      "Sun, Moon, Diamond, Pearl, and SoulSilver have all been names of games in what iconic video game franchise?",
    answer: "Pokemon",
  },
  {
    question:
      "Crash is a video game character who is a genetically mutated type of what marsupial?",
    answer: "Bandicoot",
  },
  {
    question:
      "What first-person shooter video game developed by Valve and published for Microsoft Windows in 1998 launched a globally successful franchise?",
    answer: "Half-Life",
  },
  {
    question:
      "The first Star Wars video game, made for the Atari 2600, was based on which film in the original trilogy?",
    answer: "The Empire Strikes Back",
  },
  {
    question:
      "What is the name of the best-selling video game franchise to come out of Disney's home-grown intellectual property?",
    answer: "Kingdom Hearts",
  },
  {
    question:
      "In the original 1980 edition of Pac-Man, the four ghosts were named Blinky, Inky, Pinky, and what name that doesn't rhyme with the rest?",
    answer: "Clyde",
  },
  {
    question:
      "What simulation video game franchise was originally developed by Will Wright and launched in 1989 for the Macintosh computer?",
    answer: "SimCity",
  },
  {
    question:
      'Tingle is a "short, paunchy 35-year-old" obsessed with "forest fairies." In what video game franchise did Tingle debut?',
    answer: "The Legend of Zelda",
  },
  {
    question:
      '"Ultimate" and "Melee" are two of the iterations in the Super Smash Bros. franchise. What is the one additional word that follows the name of a title in the series?',
    answer: "Brawl",
  },
  {
    question:
      "Tony Hawk is one of the world's most skilled skateboarders. He is also the face of one of the best-selling video games of the late '90s entitled \"Tony Hawk's\" what, released September 29, 1999?",
    answer: "Pro Skater",
  },
  {
    question:
      "The first game in the Final Fantasy video game franchise was released for what console?",
    answer: "Nintendo Entertainment System (NES)",
  },
  {
    question:
      "What is the name of the twin brother of Solid Snake, the protagonist of the Metal Gear franchise?",
    answer: "Liquid Snake",
  },
  {
    question:
      "In January 2021, a short squeeze orchestrated by Reddit users caused a skyrocketing of the price of what retail chain that sells video games and consumer electronics?",
    answer: "GameStop",
  },
  {
    question:
      'The 1995 point-and-click adventure game "I Have No Mouth, and I Must Scream" is based on the short story of the same name by what sci-fi author?',
    answer: "Harlan Ellison",
  },
  {
    question:
      'A 2022 Lego Star Wars game that lets players reenact all 9 mainline Star Wars films is "Lego Star Wars:" The what Saga?',
    answer: "Skywalker",
  },
  {
    question:
      "Skyrim is the fifth installment of what epic open-world videogame series by Bethesda Softworks?",
    answer: "The Elder Scrolls",
  },
  {
    question:
      'What "S" videogame series co-created and published by Electronic Arts allows users to create and customize virtual human beings?',
    answer: "The Sims",
  },
  {
    question:
      "Which Legend of Zelda game that picks up after Ocarina of Time was released for N64 in 2000 and remade for Nintendo 3DS in 2015?",
    answer: "Majora's Mask",
  },
  {
    question:
      "What video game franchise debuted in 2001 as a hybrid real-time strategy and puzzle video game centered on part-collecting for a crashed rocket ship?",
    answer: "Pikmin",
  },
  {
    question:
      'What was the name of the franchise of educational video games from the 1990s that featured a green protagonist and titles like "In Search of Spot"?',
    answer: "Math Blaster!",
  },
  {
    question:
      'What video game franchise technically included "Dr. Kawashima" in the title? The first installment debuted in 2005 on the Nintendo DS.',
    answer: "Brain Age",
  },
  {
    question:
      "What is the name of the series of Star Wars video games that began on the Nintendo 64 console in 1998?",
    answer: "Rogue Squadron",
  },
  {
    question:
      "What classic open-ended PC game of 1993 may have been inspired by a Jules Verne novel whose characters were marooned on an island?",
    answer: "Myst",
  },
  {
    question:
      'According to Apple, the second most popular free game downloaded on iPhones in 2018 was an "endless play style" game where you try to get a ball down platforms. What is the game?',
    answer: "Helix Jump",
  },
  {
    question:
      "What is the name of the largest body of water on the Fortnite Battle Royale map?",
    answer: "Loot Lake",
  },
  {
    question:
      "What Pokémon holds the title as the first listed creature in the Pokédex and is considered a hybrid grass-poison type?",
    answer: "Bulbasaur",
  },
  {
    question:
      "What regulatory group assigns content ratings and suggested age ratings for video games? (4-letter initialism)",
    answer: "ESRB",
  },
  {
    question:
      "Blathers is the name of the nocturnal, museum-curating owl in what series of Nintendo video games?",
    answer: "Animal Crossing",
  },
  {
    question:
      "In what video game universe, created by Capcom, would you find a character named Jill Valentine?",
    answer: "Resident Evil",
  },
  {
    question:
      "What 2021 game in the Metroid franchise, released on the Nintendo Switch, features Samus Aran investigating a mysterious transmission on the planet ZDR?",
    answer: "Metroid Dread",
  },
  {
    question:
      "The website Ranker named GLaDOS, a fictional artificially intelligent computer system, the greatest video game villain of all time. GLaDOS was introduced in what groundbreaking computer game?",
    answer: "Portal",
  },
  {
    question:
      '"Korobeiniki," a folk song about a peddler and a girl haggling, is best known outside Russia as the theme music for what video game?',
    answer: "Tetris",
  },
  {
    question:
      'Air Man, Cut Man, Ring Man, and Drill Man are all villains in what "M.M." video game franchise?',
    answer: "Mega Man",
  },
  {
    question:
      "Larry, Morton, Wendy, Iggy, Roy, Lemmy, and Ludwig are all video game villains that report to which young commander?",
    answer: "Bowser Jr",
  },
  {
    question:
      'A reference to its popular Angry Birds franchise, what Finnish video game company sometimes uses the slogan "Angry since 2009?"',
    answer: "Rovio",
  },
  {
    question:
      "It's one of the longest-running series in video game history. The four ghosts in Pac-Man are called Inky, Blinky, Pinky, and what name that breaks the pattern?",
    answer: "Clyde",
  },
  {
    question:
      "The very first game in the Madden NFL video game franchise was named John Madden Football and was released June 1st in what year?",
    answer: "1988",
  },
  {
    question:
      "What gothic video game franchise debuted in 1986 with Simon Belmont as protagonist, a member of the Belmont clan of vampire hunters?",
    answer: "Castlevania",
  },
  {
    question:
      'What was the "metallic" golf video game played with a trackball that was popularized in bars across America?',
    answer: "Golden Tee",
  },
  {
    question:
      "What beat-em-up video game franchise, featuring twin brother martial artists Billy and Jimmy, was later turned into a poorly received 1994 movie?",
    answer: "Double Dragon",
  },
  {
    question:
      "According to market research company NPD Group, which video game console sold the most units in the United States in 2008?",
    answer: "Nintendo Wii",
  },
  {
    question:
      'What popular mobile puzzle game involves the collection of characters who are described as "friends without the R"?',
    answer: "Best Fiends",
  },
  {
    question:
      "Which side-scrolling platformer by Ubisoft debuted in 1995 and tasked players with navigating levels like The Dream Forest?",
    answer: "Rayman",
  },
  {
    question:
      'In Mario\'s first appearance in the video game "Donkey Kong", what J-word was his official name before later transitioning to Mario?',
    answer: "Jumpman",
  },
  {
    question:
      "What is the name of the talking animatronic toy that resembled a bear and reached peak popularity in the mid-1980s?",
    answer: "Teddy Ruxpin",
  },
  {
    question:
      'The sci-fi novel "Ready Player One" features what 1979 Atari 2600 game in the book\'s final challenge?',
    answer: "Adventure",
  },
  {
    question:
      'What was the name of the princess Mario rescues in Nintendo Gameboy\'s "Super Mario Land" (1989)?',
    answer: "Daisy",
  },
  {
    question:
      '"Dachshund & Friends," "Lab & Friends," and "Chihuahua & Friends" are the three versions of the 2005 U.S. release of what video game?',
    answer: "Nintendogs",
  },
];

export default function Custom404() {
  const [gameQuestions, setGameQuestions] = useState<Trivia[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  const currentTrivia = gameQuestions[currentQuestionIndex];

  const generateQuestions = () => {
    const shuffled = TRIVIA.sort(() => Math.random() - 0.5).slice(0, 10);
    setGameQuestions(shuffled);
  };

  useEffect(() => {
    if (!currentTrivia) return;

    const wrongAnswers = TRIVIA.filter((t) => t.answer !== currentTrivia.answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((t) => t.answer);

    const allOptions = [currentTrivia.answer, ...wrongAnswers].sort(
      () => Math.random() - 0.5,
    );
    setOptions(allOptions);
  }, [currentQuestionIndex, currentTrivia]);

  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    generateQuestions();
    setGameActive(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: string) => {
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === currentTrivia.answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setGameActive(false);
      }
    }, 1000);
  };

  const getButtonClass = (option: string) => {
    const baseClass =
      "w-full p-3 text-left rounded border transition-all cursor-pointer";

    if (!answered) {
      return `${baseClass} bg-card border-border text-foreground hover:border-accent`;
    }

    if (option === currentTrivia.answer) {
      return `${baseClass} bg-accent border-accent text-accent-foreground font-semibold`;
    }

    if (option === selectedAnswer && option !== currentTrivia.answer) {
      return `${baseClass} bg-secondary border-secondary text-secondary-foreground`;
    }

    return `${baseClass} bg-muted border-border text-muted-foreground`;
  };

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="mb-8 text-center font-jersey10 text-6xl text-primary">
          404
        </h1>
        <h2 className="mb-4 text-center font-jersey10 text-2xl text-foreground">
          Page Not Found
        </h2>

        <p className="mb-8 text-center text-foreground">
          Test your game knowledge with quick rapid-fire instead!!!
        </p>

        {!gameActive ? (
          <div className="mb-8 space-y-4">
            {gameQuestions.length === 0 ? (
              <>
                <p className="mb-4 text-muted-foreground">
                  Answer 10 random gaming trivia questions in 30 seconds!
                </p>
                <Button onClick={startGame} className="w-full">
                  Start Trivia
                </Button>
              </>
            ) : (
              <>
                <p className="mb-4 text-center font-jersey10 text-2xl font-bold text-primary">
                  Game Over!
                </p>
                <p className="mb-4 text-center text-foreground">
                  Final Score:{" "}
                  <span className="text-xl font-bold text-primary">
                    {score}
                  </span>{" "}
                  / 10
                </p>
                <Button onClick={startGame} className="w-full">
                  Play Again
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="mb-8 space-y-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} / 10
              </p>
              <div
                className={`font-jersey10 text-3xl font-bold ${
                  timeLeft <= 10 ? "text-destructive" : "text-primary"
                }`}
              >
                {timeLeft}s
              </div>
            </div>

            <div className="space-y-6 rounded border border-border bg-card p-6">
              <p className="text-lg text-foreground">
                {currentTrivia.question}
              </p>

              <div className="space-y-3">
                {options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className={getButtonClass(option)}
                    disabled={answered}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <p className="text-sm text-foreground">
                Score:{" "}
                <span className="font-jersey10 font-bold text-primary">
                  {score}
                </span>{" "}
                / 10
              </p>
            </div>
          </div>
        )}

        <Link href="/">
          <Button variant="outline" className="w-full">
            Go Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
