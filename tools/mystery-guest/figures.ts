/**
 * Mystery Guest · the figure roster.
 *
 * The array order IS the daily schedule: game #1 is FIGURES[0], game #2 is
 * FIGURES[1], and the schedule wraps with a modulo once the list runs out.
 * Everything the host says comes from these dossiers, so every fact here has
 * to be true at the level of an encyclopedia lead paragraph.
 *
 * Roster rules, enforced by game.test.ts:
 *  - Deceased historical people or fictional characters only. No living people.
 *  - Facts are written in the third person, never in the figure's own voice.
 *  - Every figure carries at least one alias so surname guesses count.
 *  - No em dash characters anywhere in the data.
 *
 * To swap in a different roster, replace the contents of the FIGURES array.
 * Nothing else in the tool depends on which figures are in it or how many.
 */

export interface Figure {
  /** Kebab-case slug, unique across the roster. */
  id: string;
  /** Canonical display name, shown at the reveal. */
  name: string;
  /** Accepted guesses: surname alone, nicknames, alternate spellings. */
  aliases: string[];
  category:
    | "leader"
    | "scientist"
    | "inventor"
    | "explorer"
    | "artist"
    | "writer"
    | "musician"
    | "athlete"
    | "entertainer"
    | "fictional";
  /** Life span, or the first appearance for a fictional character. */
  era: string;
  /** 1 means everyone knows them, 3 means only the well read will land it. */
  difficulty: 1 | 2 | 3;
  /** 8 to 12 short, true facts the host answers questions from. */
  dossier: string[];
  /** One or two sentences of voice guidance for the host. */
  persona: string;
  /** One delightful fact shown at the reveal. */
  revealFact: string;
}

export const FIGURES: Figure[] = [
  {
    id: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    aliases: ["Leonardo", "da Vinci", "Leonardo di ser Piero da Vinci"],
    category: "artist",
    era: "1452-1519",
    difficulty: 1,
    dossier: [
      "Painted the Mona Lisa, which now hangs in the Louvre in Paris.",
      "Painted The Last Supper on the wall of a monastery dining hall in Milan.",
      "Was born in 1452 near the Tuscan town of Vinci, the son of a notary.",
      "Filled thousands of notebook pages with sketches and notes, much of it written in mirror script.",
      "Designed flying machines, a diving suit, and war machines centuries before they could be built.",
      "Drew the Vitruvian Man, a study of the proportions of the human body.",
      "Dissected human bodies so his anatomical drawings would be accurate.",
      "Worked for powerful patrons including Ludovico Sforza in Milan and King Francis I of France.",
      "Left a great many works unfinished and was known for drifting between projects.",
      "Died in 1519 at Amboise in France.",
    ],
    persona:
      "Curious about absolutely everything and easily distracted, happy to talk about birds, water, and machines. " +
      "Would rather describe an unsolved problem than boast about a finished painting.",
    revealFact:
      "He wrote much of his private notebooks backwards, in mirror writing, so the easiest way to read them is to hold them up to a mirror.",
  },
  {
    id: "cleopatra",
    name: "Cleopatra",
    aliases: ["Cleopatra VII", "Cleopatra VII Philopator"],
    category: "leader",
    era: "69-30 BC",
    difficulty: 1,
    dossier: [
      "Ruled Egypt as its last active pharaoh, from 51 to 30 BC.",
      "Belonged to the Ptolemaic dynasty, a Macedonian Greek family that had ruled Egypt for centuries.",
      "Was reportedly the first ruler of that dynasty to learn the Egyptian language.",
      "Ruled from Alexandria, the great port city known for its library and its lighthouse.",
      "Formed a political and personal alliance with Julius Caesar of Rome.",
      "Later allied with Mark Antony against Octavian, who became the emperor Augustus.",
      "Lost the naval battle of Actium in 31 BC alongside Mark Antony.",
      "Was known to contemporaries for her intelligence and her command of languages.",
      "Died in 30 BC, traditionally said to have been by snakebite.",
      "Her death ended the Ptolemaic kingdom, and Egypt became a Roman province.",
    ],
    persona:
      "Regal, dry, and politically shrewd. Treats the interview as an audience she has graciously granted, " +
      "and speaks of Rome as a problem she managed rather than a power she feared.",
    revealFact:
      "She lived closer in time to the first moon landing than to the building of the Great Pyramid of Giza.",
  },
  {
    id: "albert-einstein",
    name: "Albert Einstein",
    aliases: ["Einstein"],
    category: "scientist",
    era: "1879-1955",
    difficulty: 1,
    dossier: [
      "Published the special theory of relativity in 1905.",
      "Published the general theory of relativity in 1915, describing gravity as the curving of spacetime.",
      "Wrote the equation relating energy and mass, E equals m c squared.",
      "Won the 1921 Nobel Prize in Physics, awarded for the photoelectric effect rather than for relativity.",
      "Was born in Ulm in Germany in 1879 and grew up in Munich.",
      "Worked as a patent examiner in Bern, Switzerland, through his most productive early years.",
      "Left Germany in 1933 and spent the rest of his life at Princeton in the United States.",
      "Played the violin and often said that music helped him think.",
      "Signed a 1939 letter to President Roosevelt warning about nuclear weapons research.",
      "Was offered the presidency of Israel in 1952 and declined it.",
      "Died in 1955 in Princeton, New Jersey.",
    ],
    persona:
      "Gentle, wry, and fond of thought experiments. Reaches for an everyday analogy before an equation, " +
      "and makes quiet fun of his own fame.",
    revealFact:
      "The famous photograph of him sticking his tongue out was taken on his 72nd birthday, when he had finally had enough of smiling for photographers.",
  },
  {
    id: "frida-kahlo",
    name: "Frida Kahlo",
    aliases: ["Kahlo", "Frida"],
    category: "artist",
    era: "1907-1954",
    difficulty: 1,
    dossier: [
      "Was a Mexican painter best known for vivid self portraits.",
      "Was born in 1907 in Coyoacan on the edge of Mexico City, in the house now known as the Blue House.",
      "Was badly injured at eighteen when the bus she was riding collided with a streetcar.",
      "Began painting seriously while recovering in bed, working from a mirror mounted above her.",
      "Married the muralist Diego Rivera in 1929, divorced him, and then married him again.",
      "Painted The Two Fridas, a double self portrait, in 1939.",
      "Wore traditional Tehuana dresses and braided her hair with flowers and ribbons.",
      "Tied her work closely to Mexican folk art and to Mexican identity.",
      "Had a single solo exhibition in Mexico during her lifetime, in 1953.",
      "Died in 1954 at the age of 47, in the same house where she was born.",
    ],
    persona:
      "Direct, funny, and completely unsentimental about pain. Talks about her paintings as plain facts of her life " +
      "rather than as symbols for anyone to interpret.",
    revealFact:
      "She was too ill to stand for her only solo show in Mexico, so she had her four poster bed carried into the gallery and greeted guests from it.",
  },
  {
    id: "william-shakespeare",
    name: "William Shakespeare",
    aliases: ["Shakespeare", "the Bard"],
    category: "writer",
    era: "1564-1616",
    difficulty: 1,
    dossier: [
      "Wrote roughly 38 plays and 154 sonnets in English.",
      "Was born in Stratford upon Avon in 1564 and died there in 1616.",
      "Wrote Hamlet, Macbeth, King Lear, and Romeo and Juliet.",
      "Worked in London as an actor and as a part owner of a playing company.",
      "His company performed at the Globe, a theatre on the south bank of the Thames.",
      "Married Anne Hathaway in 1582 and had three children, including twins.",
      "Wrote comedies, tragedies, and histories, often reworking older stories.",
      "His plays were gathered after his death into the 1623 collection known as the First Folio.",
      "Is credited with popularizing a great many English words and phrases still in use.",
      "Left a will that bequeathed his second best bed to his wife.",
    ],
    persona:
      "Playful and quick with wordplay, and enjoys teasing the interviewer. Talks about the theatre as a business " +
      "at least as much as an art.",
    revealFact:
      "His will left his wife his second best bed, a single line that scholars have argued about for four centuries.",
  },
  {
    id: "marie-curie",
    name: "Marie Curie",
    aliases: ["Curie", "Marie Sklodowska Curie", "Maria Sklodowska"],
    category: "scientist",
    era: "1867-1934",
    difficulty: 1,
    dossier: [
      "Was a physicist and chemist whose work established the study of radioactivity.",
      "Was born Maria Sklodowska in Warsaw in 1867, when the city was under Russian rule.",
      "Moved to Paris to study at the Sorbonne.",
      "Discovered the elements polonium and radium together with her husband Pierre Curie.",
      "Named polonium after Poland, her homeland.",
      "Won the Nobel Prize in Physics in 1903, shared with Pierre Curie and Henri Becquerel.",
      "Won a second Nobel Prize, this one in Chemistry, in 1911.",
      "Was the first woman to win a Nobel Prize and the first person to win in two different sciences.",
      "Ran mobile X-ray units to help treat wounded soldiers during the First World War.",
      "Died in 1934 of a blood disorder linked to years of exposure to radiation.",
    ],
    persona:
      "Precise, modest, and impatient with fuss. Answers plainly about the work itself and deflects every question " +
      "about being famous.",
    revealFact:
      "Her notebooks are still radioactive today and are stored in lead lined boxes.",
  },
  {
    id: "genghis-khan",
    name: "Genghis Khan",
    aliases: ["Chinggis Khan", "Chingis Khan", "Temujin"],
    category: "leader",
    era: "c. 1162-1227",
    difficulty: 2,
    dossier: [
      "Founded the Mongol Empire, which became the largest contiguous land empire in history.",
      "Was born Temujin on the Mongolian steppe around the year 1162.",
      "United the rival Mongol clans and was proclaimed their leader in 1206.",
      "Built an army organized in units of ten and built around mounted archers.",
      "Created a relay messenger system that carried news across the empire at remarkable speed.",
      "Issued a code of laws and granted religious tolerance across his territories.",
      "Had a writing system adopted for the Mongolian language during his reign.",
      "Campaigned across Central Asia, northern China, and into Persia.",
      "Died in 1227, and the location of his grave has never been established.",
      "His successors extended the empire from Korea to eastern Europe.",
    ],
    persona:
      "Blunt, watchful, and unhurried. Talks about loyalty and horses more readily than about glory, and gives short " +
      "answers that make the interviewer work for the next one.",
    revealFact:
      "His tomb has never been found, and by some accounts the burial party went to extraordinary lengths to make sure it never would be.",
  },
  {
    id: "amelia-earhart",
    name: "Amelia Earhart",
    aliases: ["Earhart"],
    category: "explorer",
    era: "1897-1937",
    difficulty: 2,
    dossier: [
      "Was an American aviator and the first woman to fly solo across the Atlantic Ocean.",
      "Made that solo Atlantic flight in 1932, from Newfoundland to Northern Ireland.",
      "Was born in Atchison, Kansas, in 1897.",
      "First crossed the Atlantic as a passenger in 1928 and disliked the attention it brought her.",
      "Flew solo from Hawaii to California in 1935, which no pilot had done before.",
      "Set an altitude record in an autogiro and several speed records for women pilots.",
      "Wrote bestselling books about flying and campaigned for women in aviation.",
      "Helped found an organization of women pilots known as the Ninety Nines.",
      "Flew a twin engine Lockheed Electra on her attempt to circle the globe.",
      "Disappeared over the central Pacific in July 1937, and neither she nor the aircraft was found.",
    ],
    persona:
      "Practical, plain spoken, and a little restless. Talks about weather and fuel loads with real relish and shrugs " +
      "off any attempt to call her a heroine.",
    revealFact:
      "She designed and sold her own line of practical clothing for women, using fabrics borrowed from aviation including parachute silk.",
  },
  {
    id: "ludwig-van-beethoven",
    name: "Ludwig van Beethoven",
    aliases: ["Beethoven"],
    category: "musician",
    era: "1770-1827",
    difficulty: 1,
    dossier: [
      "Was a German composer and pianist whose work bridged the Classical and Romantic eras.",
      "Was born in Bonn in 1770 and spent most of his career in Vienna.",
      "Wrote nine symphonies, including the famous Fifth and the Ninth.",
      "Set Schiller's Ode to Joy in the choral finale of the Ninth Symphony.",
      "Wrote 32 piano sonatas, among them the ones nicknamed Moonlight and Pathetique.",
      "Began losing his hearing in his late twenties and was profoundly deaf in later life.",
      "Kept composing after he could no longer hear his own music performed.",
      "Wrote a single opera, Fidelio, and revised it repeatedly.",
      "Was famously untidy and short tempered, and moved lodgings dozens of times in Vienna.",
      "Died in Vienna in 1827, and enormous crowds attended his funeral.",
    ],
    persona:
      "Gruff, proud, and quick to bristle. Speaks in short bursts, complains about landlords and publishers, and " +
      "softens only when the subject is the music itself.",
    revealFact:
      "At the first performance of his Ninth Symphony he could not hear the ovation, and one of the singers had to turn him around so he could see the audience applauding.",
  },
  {
    id: "sherlock-holmes",
    name: "Sherlock Holmes",
    aliases: ["Holmes", "Mr Holmes"],
    category: "fictional",
    era: "fictional, first appeared 1887",
    difficulty: 1,
    dossier: [
      "Is a fictional consulting detective created by the writer Arthur Conan Doyle.",
      "First appeared in the 1887 novel A Study in Scarlet.",
      "Lives at 221B Baker Street in London.",
      "Shares those lodgings with his friend and chronicler Doctor John Watson.",
      "Solves cases by observation and by deduction from very small physical details.",
      "Plays the violin and keeps chemistry equipment in the sitting room.",
      "Faces the criminal mastermind Professor Moriarty at the Reichenbach Falls.",
      "Was killed off by his author in 1893 and brought back after a public outcry.",
      "Appears in four novels and 56 short stories.",
      "Has an older brother, Mycroft, who works quietly for the British government.",
    ],
    persona:
      "Clipped, superior, and visibly bored unless the question is a good one. Should offer at least one unnerving " +
      "deduction about the interviewer along the way.",
    revealFact:
      "The line elementary, my dear Watson, never appears in any of the original stories. It came from later stage and screen versions.",
  },
];
