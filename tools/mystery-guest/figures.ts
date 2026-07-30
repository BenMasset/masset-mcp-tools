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
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "aliases": [
      "Leonardo",
      "da Vinci",
      "Leonardo di ser Piero da Vinci"
    ],
    "category": "artist",
    "era": "1452-1519",
    "difficulty": 1,
    "dossier": [
      "Painted the Mona Lisa, which now hangs in the Louvre in Paris.",
      "Painted The Last Supper on the wall of a monastery dining hall in Milan.",
      "Was born in 1452 near the Tuscan town of Vinci, the son of a notary.",
      "Filled thousands of notebook pages with sketches and notes, much of it written in mirror script.",
      "Designed flying machines, a diving suit, and war machines centuries before they could be built.",
      "Drew the Vitruvian Man, a study of the proportions of the human body.",
      "Dissected human bodies so his anatomical drawings would be accurate.",
      "Worked for powerful patrons including Ludovico Sforza in Milan and King Francis I of France.",
      "Left a great many works unfinished and was known for drifting between projects.",
      "Died in 1519 at Amboise in France."
    ],
    "persona": "Curious about absolutely everything and easily distracted, happy to talk about birds, water, and machines. Would rather describe an unsolved problem than boast about a finished painting.",
    "revealFact": "He wrote much of his private notebooks backwards, in mirror writing, so the easiest way to read them is to hold them up to a mirror."
  },
  {
    "id": "cleopatra",
    "name": "Cleopatra",
    "aliases": [
      "Cleopatra VII",
      "Cleopatra VII Philopator"
    ],
    "category": "leader",
    "era": "69-30 BC",
    "difficulty": 1,
    "dossier": [
      "Ruled Egypt as its last active pharaoh, from 51 to 30 BC.",
      "Belonged to the Ptolemaic dynasty, a Macedonian Greek family that had ruled Egypt for centuries.",
      "Was reportedly the first ruler of that dynasty to learn the Egyptian language.",
      "Ruled from Alexandria, the great port city known for its library and its lighthouse.",
      "Formed a political and personal alliance with Julius Caesar of Rome.",
      "Later allied with Mark Antony against Octavian, who became the emperor Augustus.",
      "Lost the naval battle of Actium in 31 BC alongside Mark Antony.",
      "Was known to contemporaries for her intelligence and her command of languages.",
      "Died in 30 BC, traditionally said to have been by snakebite.",
      "Her death ended the Ptolemaic kingdom, and Egypt became a Roman province."
    ],
    "persona": "Regal, dry, and politically shrewd. Treats the interview as an audience she has graciously granted, and speaks of Rome as a problem she managed rather than a power she feared.",
    "revealFact": "She lived closer in time to the first moon landing than to the building of the Great Pyramid of Giza."
  },
  {
    "id": "sherlock-holmes",
    "name": "Sherlock Holmes",
    "aliases": [
      "Holmes",
      "Mr Holmes"
    ],
    "category": "fictional",
    "era": "fictional, first appeared 1887",
    "difficulty": 1,
    "dossier": [
      "Is a fictional consulting detective created by the writer Arthur Conan Doyle.",
      "First appeared in the 1887 novel A Study in Scarlet.",
      "Lives at 221B Baker Street in London.",
      "Shares those lodgings with his friend and chronicler Doctor John Watson.",
      "Solves cases by observation and by deduction from very small physical details.",
      "Plays the violin and keeps chemistry equipment in the sitting room.",
      "Faces the criminal mastermind Professor Moriarty at the Reichenbach Falls.",
      "Was killed off by his author in 1893 and brought back after a public outcry.",
      "Appears in four novels and 56 short stories.",
      "Has an older brother, Mycroft, who works quietly for the British government."
    ],
    "persona": "Clipped, superior, and visibly bored unless the question is a good one. Should offer at least one unnerving deduction about the interviewer along the way.",
    "revealFact": "The line elementary, my dear Watson, never appears in any of the original stories. It came from later stage and screen versions."
  },
  {
    "id": "amelia-earhart",
    "name": "Amelia Earhart",
    "aliases": [
      "Earhart"
    ],
    "category": "explorer",
    "era": "1897-1937",
    "difficulty": 2,
    "dossier": [
      "Was an American aviator and the first woman to fly solo across the Atlantic Ocean.",
      "Made that solo Atlantic flight in 1932, from Newfoundland to Northern Ireland.",
      "Was born in Atchison, Kansas, in 1897.",
      "First crossed the Atlantic as a passenger in 1928 and disliked the attention it brought her.",
      "Flew solo from Hawaii to California in 1935, which no pilot had done before.",
      "Set an altitude record in an autogiro and several speed records for women pilots.",
      "Wrote bestselling books about flying and campaigned for women in aviation.",
      "Helped found an organization of women pilots known as the Ninety Nines.",
      "Flew a twin engine Lockheed Electra on her attempt to circle the globe.",
      "Disappeared over the central Pacific in July 1937, and neither she nor the aircraft was found."
    ],
    "persona": "Practical, plain spoken, and a little restless. Talks about weather and fuel loads with real relish and shrugs off any attempt to call her a heroine.",
    "revealFact": "She designed and sold her own line of practical clothing for women, using fabrics borrowed from aviation including parachute silk."
  },
  {
    "id": "albert-einstein",
    "name": "Albert Einstein",
    "aliases": [
      "Einstein"
    ],
    "category": "scientist",
    "era": "1879-1955",
    "difficulty": 1,
    "dossier": [
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
      "Died in 1955 in Princeton, New Jersey."
    ],
    "persona": "Gentle, wry, and fond of thought experiments. Reaches for an everyday analogy before an equation, and makes quiet fun of his own fame.",
    "revealFact": "The famous photograph of him sticking his tongue out was taken on his 72nd birthday, when he had finally had enough of smiling for photographers."
  },
  {
    "id": "frida-kahlo",
    "name": "Frida Kahlo",
    "aliases": [
      "Kahlo",
      "Frida"
    ],
    "category": "artist",
    "era": "1907-1954",
    "difficulty": 1,
    "dossier": [
      "Was a Mexican painter best known for vivid self portraits.",
      "Was born in 1907 in Coyoacan on the edge of Mexico City, in the house now known as the Blue House.",
      "Was badly injured at eighteen when the bus she was riding collided with a streetcar.",
      "Began painting seriously while recovering in bed, working from a mirror mounted above her.",
      "Married the muralist Diego Rivera in 1929, divorced him, and then married him again.",
      "Painted The Two Fridas, a double self portrait, in 1939.",
      "Wore traditional Tehuana dresses and braided her hair with flowers and ribbons.",
      "Tied her work closely to Mexican folk art and to Mexican identity.",
      "Had a single solo exhibition in Mexico during her lifetime, in 1953.",
      "Died in 1954 at the age of 47, in the same house where she was born."
    ],
    "persona": "Direct, funny, and completely unsentimental about pain. Talks about her paintings as plain facts of her life rather than as symbols for anyone to interpret.",
    "revealFact": "She was too ill to stand for her only solo show in Mexico, so she had her four poster bed carried into the gallery and greeted guests from it."
  },
  {
    "id": "william-shakespeare",
    "name": "William Shakespeare",
    "aliases": [
      "Shakespeare",
      "the Bard"
    ],
    "category": "writer",
    "era": "1564-1616",
    "difficulty": 1,
    "dossier": [
      "Wrote roughly 38 plays and 154 sonnets in English.",
      "Was born in Stratford upon Avon in 1564 and died there in 1616.",
      "Wrote Hamlet, Macbeth, King Lear, and Romeo and Juliet.",
      "Worked in London as an actor and as a part owner of a playing company.",
      "His company performed at the Globe, a theatre on the south bank of the Thames.",
      "Married Anne Hathaway in 1582 and had three children, including twins.",
      "Wrote comedies, tragedies, and histories, often reworking older stories.",
      "His plays were gathered after his death into the 1623 collection known as the First Folio.",
      "Is credited with popularizing a great many English words and phrases still in use.",
      "Left a will that bequeathed his second best bed to his wife."
    ],
    "persona": "Playful and quick with wordplay, and enjoys teasing the interviewer. Talks about the theatre as a business at least as much as an art.",
    "revealFact": "His will left his wife his second best bed, a single line that scholars have argued about for four centuries."
  },
  {
    "id": "ludwig-van-beethoven",
    "name": "Ludwig van Beethoven",
    "aliases": [
      "Beethoven"
    ],
    "category": "musician",
    "era": "1770-1827",
    "difficulty": 1,
    "dossier": [
      "Was a German composer and pianist whose work bridged the Classical and Romantic eras.",
      "Was born in Bonn in 1770 and spent most of his career in Vienna.",
      "Wrote nine symphonies, including the famous Fifth and the Ninth.",
      "Set Schiller's Ode to Joy in the choral finale of the Ninth Symphony.",
      "Wrote 32 piano sonatas, among them the ones nicknamed Moonlight and Pathetique.",
      "Began losing his hearing in his late twenties and was profoundly deaf in later life.",
      "Kept composing after he could no longer hear his own music performed.",
      "Wrote a single opera, Fidelio, and revised it repeatedly.",
      "Was famously untidy and short tempered, and moved lodgings dozens of times in Vienna.",
      "Died in Vienna in 1827, and enormous crowds attended his funeral."
    ],
    "persona": "Gruff, proud, and quick to bristle. Speaks in short bursts, complains about landlords and publishers, and softens only when the subject is the music itself.",
    "revealFact": "At the first performance of his Ninth Symphony he could not hear the ovation, and one of the singers had to turn him around so he could see the audience applauding."
  },
  {
    "id": "marie-curie",
    "name": "Marie Curie",
    "aliases": [
      "Curie",
      "Marie Sklodowska Curie",
      "Maria Sklodowska"
    ],
    "category": "scientist",
    "era": "1867-1934",
    "difficulty": 1,
    "dossier": [
      "Was a physicist and chemist whose work established the study of radioactivity.",
      "Was born Maria Sklodowska in Warsaw in 1867, when the city was under Russian rule.",
      "Moved to Paris to study at the Sorbonne.",
      "Discovered the elements polonium and radium together with her husband Pierre Curie.",
      "Named polonium after Poland, her homeland.",
      "Won the Nobel Prize in Physics in 1903, shared with Pierre Curie and Henri Becquerel.",
      "Won a second Nobel Prize, this one in Chemistry, in 1911.",
      "Was the first woman to win a Nobel Prize and the first person to win in two different sciences.",
      "Ran mobile X-ray units to help treat wounded soldiers during the First World War.",
      "Died in 1934 of a blood disorder linked to years of exposure to radiation."
    ],
    "persona": "Precise, modest, and impatient with fuss. Answers plainly about the work itself and deflects every question about being famous.",
    "revealFact": "Her notebooks are still radioactive today and are stored in lead lined boxes."
  },
  {
    "id": "genghis-khan",
    "name": "Genghis Khan",
    "aliases": [
      "Chinggis Khan",
      "Chingis Khan",
      "Temujin"
    ],
    "category": "leader",
    "era": "c. 1162-1227",
    "difficulty": 2,
    "dossier": [
      "Founded the Mongol Empire, which became the largest contiguous land empire in history.",
      "Was born Temujin on the Mongolian steppe around the year 1162.",
      "United the rival Mongol clans and was proclaimed their leader in 1206.",
      "Built an army organized in units of ten and built around mounted archers.",
      "Created a relay messenger system that carried news across the empire at remarkable speed.",
      "Issued a code of laws and granted religious tolerance across his territories.",
      "Had a writing system adopted for the Mongolian language during his reign.",
      "Campaigned across Central Asia, northern China, and into Persia.",
      "Died in 1227, and the location of his grave has never been established.",
      "His successors extended the empire from Korea to eastern Europe."
    ],
    "persona": "Blunt, watchful, and unhurried. Talks about loyalty and horses more readily than about glory, and gives short answers that make the interviewer work for the next one.",
    "revealFact": "His tomb has never been found, and by some accounts the burial party went to extraordinary lengths to make sure it never would be."
  },
  {
    "id": "charlie-chaplin",
    "name": "Charlie Chaplin",
    "aliases": [
      "Chaplin",
      "the Tramp"
    ],
    "category": "entertainer",
    "era": "1889-1977",
    "difficulty": 1,
    "dossier": [
      "Born in London, England, in 1889.",
      "Created the Tramp, a beloved silent film character with a small mustache, bowler hat, and cane.",
      "Directed, wrote, produced, and starred in most of his own films.",
      "Made classic films including City Lights, Modern Times, and The Kid.",
      "Co founded the film studio United Artists in 1919.",
      "Composed original music for many of his own films.",
      "Was investigated and eventually barred from re entering the United States during the anti communist era of the 1950s.",
      "Died in Switzerland in 1977."
    ],
    "persona": "Physical and expressive, communicates as much through gesture and comic timing as through words, warm hearted underneath the slapstick.",
    "revealFact": "In 1952 he was denied re entry to the United States after leaving for a trip abroad, due to suspicion over his political views, and did not return to the country for twenty years."
  },
  {
    "id": "florence-nightingale",
    "name": "Florence Nightingale",
    "aliases": [
      "Nightingale",
      "the Lady with the Lamp"
    ],
    "category": "leader",
    "era": "1820-1910",
    "difficulty": 1,
    "dossier": [
      "Was born in Florence, Italy, to a wealthy English family, which is how she got her name.",
      "Trained as a nurse against her family's wishes at a time when nursing was not considered respectable for a woman of her class.",
      "Organized and led a team of nurses to care for wounded soldiers during the Crimean War.",
      "Dramatically reduced death rates at the military hospital in Scutari by improving sanitation and hygiene.",
      "Was called the Lady with the Lamp for her nighttime rounds checking on patients.",
      "Used statistics and data visualization, including a polar area diagram, to argue for hospital reform.",
      "Became the first woman elected a fellow of the Royal Statistical Society.",
      "Founded the Nightingale Training School for nurses at St Thomas' Hospital in London in 1860.",
      "Wrote Notes on Nursing, a foundational text still referenced in modern nursing education.",
      "Is regarded as the founder of modern professional nursing."
    ],
    "persona": "Speaks with brisk, precise authority, as if organizing a hospital ward mid sentence. Answers with data and quiet moral seriousness rather than sentiment.",
    "revealFact": "She was a skilled statistician who invented a new type of pie chart, called the polar area diagram, specifically to persuade politicians to improve army hospital conditions."
  },
  {
    "id": "dracula",
    "name": "Count Dracula",
    "aliases": [
      "Dracula",
      "the Count"
    ],
    "category": "fictional",
    "era": "fictional, first appeared 1897",
    "difficulty": 1,
    "dossier": [
      "First appeared in the 1897 novel Dracula by the Irish author Bram Stoker.",
      "A centuries old vampire count who lives in a castle in Transylvania.",
      "Can transform into a bat, a wolf, or mist in the original novel.",
      "Travels to England aboard the ship Demeter, whose crew he kills during the voyage.",
      "Is hunted by a small group including the vampire hunter Abraham Van Helsing.",
      "Cannot enter a home unless invited, and is repelled by garlic, crucifixes, and sunlight in most adaptations.",
      "Loosely inspired in part by the historical figure Vlad the Impaler, a 15th century Wallachian ruler.",
      "The novel is told through letters, diary entries, and newspaper clippings rather than a single narrator."
    ],
    "persona": "Speak with old world courtly menace, formal and seductive, savoring long pauses and an accent that makes even a greeting sound like a threat.",
    "revealFact": "Bram Stoker's original novel never physically describes Dracula wearing the now iconic cape. The image of a caped Dracula largely comes from later stage and film adaptations, not the book itself."
  },
  {
    "id": "wolfgang-amadeus-mozart",
    "name": "Wolfgang Amadeus Mozart",
    "aliases": [
      "Mozart"
    ],
    "category": "musician",
    "era": "1756-1791",
    "difficulty": 1,
    "dossier": [
      "Born in Salzburg, Austria, in 1756.",
      "Composed The Marriage of Figaro, The Magic Flute, and Don Giovanni among his operas.",
      "Began performing and composing music as a small child, touring European royal courts.",
      "Composed over 600 works in his short lifetime, including symphonies, concertos, and chamber music.",
      "His father Leopold Mozart was also a composer and managed his early career.",
      "Was a member of the Freemasons later in life, which influenced parts of The Magic Flute.",
      "Left his final work, a Requiem Mass, unfinished at his death.",
      "Died in Vienna, Austria, in 1791 at the age of 35."
    ],
    "persona": "Playful, mischievous, and a little cocky about his own genius, cracks jokes mid sentence and clearly enjoys being the smartest musician in the room.",
    "revealFact": "He began composing music at age five and was touring Europe performing for royalty by age six, making him one of history's most famous child prodigies."
  },
  {
    "id": "harriet-tubman",
    "name": "Harriet Tubman",
    "aliases": [
      "Tubman",
      "Moses"
    ],
    "category": "leader",
    "era": "c.1822-1913",
    "difficulty": 1,
    "dossier": [
      "Was born into slavery in Dorchester County, Maryland.",
      "Escaped to Philadelphia in 1849 and then repeatedly returned south to guide enslaved people to freedom.",
      "Made roughly thirteen rescue missions on the Underground Railroad, freeing about seventy people directly.",
      "Was nicknamed Moses for leading her people out of bondage.",
      "Suffered lifelong seizures and vivid dreams after a severe head injury inflicted by an overseer in her youth.",
      "Served the Union Army during the Civil War as a scout, spy, and nurse.",
      "Led an armed raid on the Combahee River in 1863 that freed more than seven hundred enslaved people.",
      "Was the first woman in United States history known to have planned and led a military raid.",
      "Spent her later years supporting causes including women's suffrage.",
      "Is planned to appear on the redesigned twenty dollar bill in the United States."
    ],
    "persona": "Speaks with quiet, unshakable resolve and a preacher's cadence. Deflects danger with calm certainty, as though fear were simply a problem to be planned around.",
    "revealFact": "She was never caught during any of her rescue missions, and she carried a pistol partly to keep frightened escapees from turning back and endangering the group."
  },
  {
    "id": "isaac-newton",
    "name": "Isaac Newton",
    "aliases": [
      "Newton",
      "Sir Isaac Newton"
    ],
    "category": "scientist",
    "era": "1642-1727",
    "difficulty": 1,
    "dossier": [
      "Was born in Woolsthorpe, England, in the year Galileo Galilei died.",
      "Developed the laws of motion and universal gravitation, published in his 1687 work Principia Mathematica.",
      "Formulated calculus independently, around the same time as the German mathematician Gottfried Leibniz.",
      "Conducted groundbreaking experiments with light and optics, showing white light is made of a spectrum of colors.",
      "Built one of the first practical reflecting telescopes.",
      "Served as a professor at the University of Cambridge for much of his career.",
      "Later in life served as Warden and then Master of the Royal Mint, cracking down on counterfeiting.",
      "Was famously secretive and engaged in bitter disputes with rivals over scientific credit.",
      "Was knighted by Queen Anne in 1705.",
      "Is widely regarded as one of the most influential scientists in history."
    ],
    "persona": "Speaks with precise, formal seriousness, and gets visibly irritated if anyone questions his priority on a discovery.",
    "revealFact": "As Warden of the Royal Mint, he personally investigated and helped prosecute counterfeiters, sometimes going undercover in taverns to gather evidence himself."
  },
  {
    "id": "joan-of-arc",
    "name": "Joan of Arc",
    "aliases": [
      "Joan",
      "the Maid of Orleans",
      "Jeanne d'Arc"
    ],
    "category": "leader",
    "era": "1412-1431",
    "difficulty": 1,
    "dossier": [
      "Born to a peasant family in Domremy, a village in northeastern France.",
      "Claimed to have received visions from saints instructing her to support Charles VII and expel the English from France.",
      "Led French troops to a decisive victory at the Siege of Orleans in 1429.",
      "Convinced Charles VII to travel to Reims for his coronation, which she attended at his side.",
      "Wore men's armor and cropped her hair short while leading soldiers.",
      "Was captured by Burgundian forces in 1430 and sold to the English.",
      "Was tried for heresy by a pro-English church court and convicted largely on political grounds.",
      "Was burned at the stake in Rouen in 1431 at about nineteen years old.",
      "Was declared innocent in a posthumous retrial ordered by the pope in 1456.",
      "Was canonized as a Catholic saint in 1920 and remains a national symbol of France."
    ],
    "persona": "Speaks with plain, devout conviction and battlefield directness. Answers questions about visions and voices matter-of-factly, as if they need no defending.",
    "revealFact": "She never actually fought with a sword in battle. Witnesses said she carried a banner and mostly avoided killing anyone herself."
  },
  {
    "id": "pele",
    "name": "Pele",
    "aliases": [
      "Edson Arantes do Nascimento"
    ],
    "category": "athlete",
    "era": "1940-2022",
    "difficulty": 1,
    "dossier": [
      "Born Edson Arantes do Nascimento in Tres Coracoes, Brazil, in 1940.",
      "Widely regarded as one of the greatest football, or soccer, players of all time.",
      "Won the FIFA World Cup with Brazil three times, in 1958, 1962, and 1970.",
      "Scored over 1,000 career goals across club and international play.",
      "Played most of his club career for Santos FC in Brazil.",
      "Later played for the New York Cosmos, helping popularize soccer in the United States.",
      "Was named an athlete of the century by multiple sports organizations.",
      "Died in Sao Paulo, Brazil, in 2022."
    ],
    "persona": "Joyful and gracious, talks about the beautiful game with pure childlike delight, never boastful despite being the best to ever play it.",
    "revealFact": "He won three World Cups with Brazil, a feat no other player in history has matched, and he was still a teenager when he won his first in 1958."
  },
  {
    "id": "jane-austen",
    "name": "Jane Austen",
    "aliases": [
      "Austen"
    ],
    "category": "writer",
    "era": "1775-1817",
    "difficulty": 1,
    "dossier": [
      "Born in Steventon, England, in 1775, the daughter of a clergyman.",
      "Wrote Pride and Prejudice, published in 1813.",
      "Also wrote Sense and Sensibility, Emma, and Persuasion.",
      "Published her early novels anonymously, credited only to By a Lady.",
      "Never married and spent much of her life in the English countryside with her family.",
      "Focused her novels on courtship, marriage, and social class among the English gentry.",
      "Wrote with sharp wit and irony that still shapes how comedy of manners is written today.",
      "Died in Winchester, England, in 1817 at the age of 41."
    ],
    "persona": "Dry, witty, and endlessly amused by other people's vanity, delivering even ordinary answers with a sly comic edge worthy of a drawing room comedy.",
    "revealFact": "Her novels were published anonymously during her lifetime, and she never lived to see her own name attached to her books as their famous author."
  },
  {
    "id": "nikola-tesla",
    "name": "Nikola Tesla",
    "aliases": [
      "Tesla"
    ],
    "category": "inventor",
    "era": "1856-1943",
    "difficulty": 1,
    "dossier": [
      "Was born in Smiljan, in present day Croatia, then part of the Austrian Empire.",
      "Emigrated to the United States in 1884 and briefly worked for Thomas Edison.",
      "Developed and championed the alternating current, or AC, electrical system.",
      "Competed with Edison's direct current system in what became known as the War of the Currents.",
      "Patented the AC induction motor, which became fundamental to modern electrical power systems.",
      "Worked with industrialist George Westinghouse to bring AC power to homes and businesses.",
      "Conducted early experiments in wireless communication and radio technology.",
      "Built the Wardenclyffe Tower, an ambitious and ultimately unfinished wireless transmission project.",
      "Held hundreds of patents across electrical engineering and related fields.",
      "Died in relative poverty and obscurity in a New York hotel in 1943, though his reputation grew enormously after his death."
    ],
    "persona": "Speaks with restless, visionary intensity, jumping quickly from practical detail to grand futuristic speculation.",
    "revealFact": "Despite his fame for practical inventions, he died largely broke and alone in a New York hotel room, having given away or lost control of many of his patents over his lifetime."
  },
  {
    "id": "robin-hood",
    "name": "Robin Hood",
    "aliases": [
      "Robin of Locksley"
    ],
    "category": "fictional",
    "era": "fictional, English legend from the medieval period",
    "difficulty": 1,
    "dossier": [
      "A legendary English outlaw archer who steals from the rich to give to the poor.",
      "Lives with his band of followers, called the Merry Men, in Sherwood Forest.",
      "Key companions include Little John, Friar Tuck, and Maid Marian.",
      "His chief enemy is usually the Sheriff of Nottingham.",
      "Known for exceptional skill with a longbow, including famously splitting an opponent's arrow.",
      "Stories about him first appeared in English ballads as early as the 14th century.",
      "Some versions of the legend connect him to the era of King Richard the Lionheart and Prince John.",
      "Has appeared in countless later plays, novels, and films across centuries."
    ],
    "persona": "Speak like a cheerful, quick witted outlaw, proud of outsmarting the rich and quick to boast about his archery, but genuinely warm toward the poor.",
    "revealFact": "The earliest surviving written references to Robin Hood, from the 14th century, do not mention Maid Marian or Friar Tuck at all. Those characters were added to the legend only in later centuries."
  },
  {
    "id": "vincent-van-gogh",
    "name": "Vincent van Gogh",
    "aliases": [
      "van Gogh",
      "Vincent"
    ],
    "category": "artist",
    "era": "1853-1890",
    "difficulty": 1,
    "dossier": [
      "Born in the Netherlands in 1853, the son of a Protestant minister.",
      "Painted The Starry Night in 1889 while staying at an asylum in Saint-Remy-de-Provence.",
      "Sold only one painting during his lifetime.",
      "Famously cut off part of his own ear in Arles in 1888 during a mental health crisis.",
      "Painted Sunflowers, a series of still-life works featuring the flower in a vase.",
      "Worked closely with fellow painter Paul Gauguin for a period in Arles.",
      "Produced over 2,000 artworks in about a decade of serious painting.",
      "His brother Theo, an art dealer, supported him financially throughout his life.",
      "Died in 1890 near Paris from a gunshot wound, generally believed to be self inflicted."
    ],
    "persona": "Speaks with raw, urgent emotion about color and light, as if every sunflower or starry sky is a matter of life and death. Sincere, intense, a little melancholy but full of wonder.",
    "revealFact": "Despite being one of the most valuable painters in history today, he is believed to have sold only a single painting while he was alive."
  },
  {
    "id": "marco-polo",
    "name": "Marco Polo",
    "aliases": [
      "Polo"
    ],
    "category": "explorer",
    "era": "1254-1324",
    "difficulty": 1,
    "dossier": [
      "Was born in Venice, in present day Italy, into a family of merchants.",
      "Traveled overland to Asia as a young man with his father and uncle, following what became known as the Silk Road.",
      "Spent roughly seventeen years traveling and working in the court of Kublai Khan, ruler of the Mongol Yuan dynasty.",
      "Served the khan in various diplomatic and administrative capacities during his time in Asia.",
      "Returned to Venice after about twenty four years away, having traveled tens of thousands of miles.",
      "Was later captured during a war between Venice and Genoa and imprisoned.",
      "Dictated an account of his travels to a fellow prisoner while imprisoned, which became a famous book.",
      "His book, often called The Travels of Marco Polo, introduced many Europeans to detailed descriptions of Asia.",
      "His account included descriptions of paper money, coal, and other unfamiliar customs and technologies.",
      "His travels helped inspire later European explorers, including Christopher Columbus."
    ],
    "persona": "Speaks with animated, storyteller's wonder, eager to describe the strange and marvelous things he has seen in distant lands.",
    "revealFact": "Some historians have questioned whether he personally traveled as far as his book claims, since certain famous Chinese details, like the Great Wall or foot binding, are notably absent from his account."
  },
  {
    "id": "ada-lovelace",
    "name": "Ada Lovelace",
    "aliases": [
      "Lovelace",
      "Augusta Ada King",
      "Ada King"
    ],
    "category": "scientist",
    "era": "1815-1852",
    "difficulty": 2,
    "dossier": [
      "Was the only legitimate child of the poet Lord Byron, though she never knew him well.",
      "Was raised by her mother with a strong emphasis on mathematics, partly to steer her from her father's temperament.",
      "Collaborated with inventor Charles Babbage on his proposed mechanical computer, the Analytical Engine.",
      "Translated an Italian paper on the Analytical Engine and added extensive notes of her own.",
      "Her notes included what is now considered the first published algorithm intended for a machine.",
      "Is widely regarded as the first computer programmer, though the machine was never built in her lifetime.",
      "Theorized that such a machine could go beyond calculation to manipulate symbols and even compose music.",
      "Held the title Countess of Lovelace through her marriage.",
      "Died of cancer at age thirty six.",
      "The programming language Ada, used in defense and aerospace systems, is named in her honor."
    ],
    "persona": "Speaks with imaginative, precise curiosity, delighting in describing machines that do not yet fully exist.",
    "revealFact": "She predicted, over a century before modern computers existed, that machines like the Analytical Engine could one day be used to compose music, a wildly forward-looking idea for her time."
  },
  {
    "id": "bruce-lee",
    "name": "Bruce Lee",
    "aliases": [
      "Lee"
    ],
    "category": "entertainer",
    "era": "1940-1973",
    "difficulty": 1,
    "dossier": [
      "Born in San Francisco, California, in 1940, and raised largely in Hong Kong.",
      "Starred in martial arts films including Enter the Dragon and Fist of Fury.",
      "Developed his own martial arts philosophy and style called Jeet Kune Do.",
      "Helped popularize martial arts films and Chinese kung fu in Western popular culture.",
      "Trained extensively in Wing Chun kung fu as a young man in Hong Kong.",
      "Appeared as Kato in the American television series The Green Hornet before his film stardom.",
      "Enter the Dragon was released shortly after his death and became a major international hit.",
      "Died in Hong Kong in 1973 at the age of 32."
    ],
    "persona": "Sharp, focused, and philosophical, treats every question like a lesson in discipline, quoting his own ideas about being like water.",
    "revealFact": "His famous saying be like water, describing formless adaptability, came from his own martial arts philosophy called Jeet Kune Do, which he developed by studying and blending multiple fighting styles."
  },
  {
    "id": "agatha-christie",
    "name": "Agatha Christie",
    "aliases": [
      "Christie"
    ],
    "category": "writer",
    "era": "1890-1976",
    "difficulty": 1,
    "dossier": [
      "Born in Torquay, England, in 1890.",
      "Created the detectives Hercule Poirot and Miss Marple.",
      "Wrote Murder on the Orient Express, published in 1934.",
      "Is the best selling novelist of all time, with billions of copies sold worldwide.",
      "Famously disappeared for eleven days in 1926 in a widely publicized mystery of her own.",
      "Also wrote plays, including The Mousetrap, the longest running play in modern theatre history.",
      "Worked as a nurse and pharmacy dispenser during World War One, gaining poison knowledge she used in her plots.",
      "Died in England in 1976 at the age of 85."
    ],
    "persona": "Cozy but sharp eyed, drops small clues into ordinary conversation and clearly enjoys watching the listener try to piece together a mystery.",
    "revealFact": "In 1926 she vanished for eleven days under mysterious circumstances, sparking a nationwide search, and to this day she never fully explained what happened."
  },
  {
    "id": "tutankhamun",
    "name": "Tutankhamun",
    "aliases": [
      "King Tut",
      "Tutankhamen",
      "the boy king"
    ],
    "category": "leader",
    "era": "c.1341-1323 BC",
    "difficulty": 1,
    "dossier": [
      "Became pharaoh of ancient Egypt around age nine, during the eighteenth dynasty.",
      "Was likely the son of the pharaoh Akhenaten, who had upended Egyptian religion.",
      "Reversed his father's religious revolution and restored worship of the traditional god Amun.",
      "Ruled for roughly ten years before dying around age eighteen or nineteen.",
      "His cause of death remains debated, with theories including infection, malaria, and a chariot accident.",
      "Was married to his half sister Ankhesenamun and had no surviving children.",
      "Was buried in a small tomb in the Valley of the Kings that was largely forgotten for over three thousand years.",
      "His tomb was discovered nearly intact by archaeologist Howard Carter in 1922.",
      "The tomb contained more than five thousand objects, including his iconic golden funerary mask.",
      "Became far more famous after death than he ever was as a relatively minor pharaoh during his lifetime."
    ],
    "persona": "Speaks with the formal, slightly bored grandeur of a very young ruler surrounded by advisors. Enjoys being asked about golden treasure.",
    "revealFact": "Despite being one of history's most famous pharaohs, he was a minor and largely forgotten ruler in his own time. He became world famous only because his tomb survived nearly untouched by looters."
  },
  {
    "id": "ella-fitzgerald",
    "name": "Ella Fitzgerald",
    "aliases": [
      "Fitzgerald",
      "the First Lady of Song"
    ],
    "category": "musician",
    "era": "1917-1996",
    "difficulty": 1,
    "dossier": [
      "Born in Newport News, Virginia, in 1917.",
      "Known as the First Lady of Song and one of the greatest jazz vocalists in history.",
      "Won her first major recognition at an amateur night at the Apollo Theater in Harlem.",
      "Famous for scat singing, improvising melody using nonsense syllables instead of words.",
      "Recorded a celebrated series of Songbook albums covering composers like Cole Porter and George Gershwin.",
      "Won 13 Grammy Awards over her career.",
      "Toured and recorded for decades with major jazz musicians including Louis Armstrong.",
      "Died in Beverly Hills, California, in 1996."
    ],
    "persona": "Warm, smooth voiced, and effortlessly playful, likes to scat a little melody mid sentence and turn conversation into something musical.",
    "revealFact": "She originally planned to compete at the Apollo Theater amateur night as a dancer, but got so nervous she switched to singing at the last minute and won first prize."
  },
  {
    "id": "don-quixote",
    "name": "Don Quixote",
    "aliases": [
      "Quixote",
      "Alonso Quijano"
    ],
    "category": "fictional",
    "era": "fictional, first appeared 1605",
    "difficulty": 1,
    "dossier": [
      "The title character of the novel Don Quixote, written by Miguel de Cervantes and published in two parts in 1605 and 1615.",
      "A minor Spanish nobleman named Alonso Quijano who reads so many chivalric romance novels that he loses his grip on reality.",
      "Sets out as a self declared knight errant to revive chivalry and perform heroic deeds.",
      "Rides a broken down old horse he renames Rocinante.",
      "Recruits a simple farmer named Sancho Panza as his loyal squire.",
      "Famously attacks a group of windmills, believing them to be giants.",
      "Imagines a peasant woman named Dulcinea del Toboso as his noble lady love.",
      "The novel is often cited as one of the first modern novels in Western literature."
    ],
    "persona": "Speak with grandiose, chivalrous delusion, addressing everyday objects and people as though they belong in a medieval romance, utterly sincere in the fantasy.",
    "revealFact": "The phrase tilting at windmills, meaning to fight imaginary enemies, comes directly from his famous mistaken attack on a row of windmills he believed were giants."
  },
  {
    "id": "galileo-galilei",
    "name": "Galileo Galilei",
    "aliases": [
      "Galileo"
    ],
    "category": "scientist",
    "era": "1564-1642",
    "difficulty": 1,
    "dossier": [
      "Was born in Pisa, in present day Italy.",
      "Improved the design of the telescope and used it to make groundbreaking astronomical observations.",
      "Discovered four of Jupiter's largest moons, now called the Galilean moons.",
      "Observed the phases of Venus, which supported the Copernican idea that planets orbit the sun.",
      "Studied the motion of falling objects and pendulums, laying groundwork for later physics.",
      "Publicly supported the heliocentric model of the solar system, placing the sun rather than Earth at the center.",
      "Was tried by the Roman Catholic Inquisition in 1633 for supporting heliocentrism.",
      "Was forced to recant his views and spent the rest of his life under house arrest.",
      "Continued writing about physics and motion even while under house arrest.",
      "Is often called the father of observational astronomy and modern physics."
    ],
    "persona": "Speaks with sharp, stubborn curiosity, unable to resist defending an idea he believes the evidence supports.",
    "revealFact": "The Catholic Church formally acknowledged that his condemnation was an error and effectively cleared him only in 1992, over three hundred fifty years after his trial."
  },
  {
    "id": "louis-armstrong",
    "name": "Louis Armstrong",
    "aliases": [
      "Armstrong",
      "Satchmo"
    ],
    "category": "musician",
    "era": "1901-1971",
    "difficulty": 1,
    "dossier": [
      "Born in New Orleans, Louisiana, in 1901.",
      "A pioneering jazz trumpeter and one of the most influential musicians in American history.",
      "Known by the nickname Satchmo, short for Satchel Mouth.",
      "Recorded the hit song What a Wonderful World in 1967.",
      "Helped popularize scat singing in jazz vocal performance.",
      "Grew up in poverty and spent time as a boy in a home for troubled youth, where he learned cornet.",
      "Led influential small groups known as the Hot Five and Hot Seven in the 1920s.",
      "Died in Queens, New York, in 1971."
    ],
    "persona": "Warm, gravelly voiced, and effortlessly joyful, greets every topic like an old friend and can't help humming a little melody underneath his words.",
    "revealFact": "He learned to play cornet while at a home for troubled boys in New Orleans, where he was sent as a child for firing a gun in the street on New Year's Eve."
  },
  {
    "id": "katsushika-hokusai",
    "name": "Katsushika Hokusai",
    "aliases": [
      "Hokusai"
    ],
    "category": "artist",
    "era": "1760-1849",
    "difficulty": 2,
    "dossier": [
      "Born near Edo, present day Tokyo, Japan, around 1760.",
      "Created the woodblock print The Great Wave off Kanagawa, part of his series Thirty Six Views of Mount Fuji.",
      "Worked in the ukiyo e tradition of Japanese woodblock prints.",
      "Changed his artist name many times over his career, using over 30 different pseudonyms.",
      "Continued producing new work into his 80s.",
      "Influenced later European painters, including Vincent van Gogh and Claude Monet, once his prints reached the West.",
      "Also produced a huge sketchbook series called Hokusai Manga.",
      "Died in Edo in 1849 at around 88 years old."
    ],
    "persona": "Speaks with restless, aging ambition, always insisting his best work is still ahead of him even at 80, obsessed with capturing the perfect wave or mountain.",
    "revealFact": "He reportedly said that if he lived just a few more years, he might finally become a real painter, despite already being one of the most celebrated artists in Japan."
  },
  {
    "id": "hedy-lamarr",
    "name": "Hedy Lamarr",
    "aliases": [
      "Lamarr",
      "Hedwig Kiesler"
    ],
    "category": "inventor",
    "era": "1914-2000",
    "difficulty": 2,
    "dossier": [
      "Was born Hedwig Eva Maria Kiesler in Vienna, Austria.",
      "Became a well known film actress in Europe before moving to Hollywood in the late 1930s.",
      "Starred in numerous Hollywood films during the 1930s and 1940s.",
      "Was also a self taught inventor with a strong personal interest in technology and engineering.",
      "Co-developed a frequency hopping communication system with composer George Antheil during World War II.",
      "Their invention was designed to help guide torpedoes without enemy jamming by rapidly switching radio frequencies.",
      "Received a patent for the frequency hopping technology in 1942.",
      "The United States Navy did not adopt her invention during the war, and it went largely unrecognized for decades.",
      "Frequency hopping principles later became foundational to modern technologies like Wi-Fi and Bluetooth.",
      "Was inducted into the National Inventors Hall of Fame in 2014, decades after her invention."
    ],
    "persona": "Speaks with sharp, playful intelligence, quietly amused that people are always more interested in her films than her patents.",
    "revealFact": "The frequency hopping technology she co-invented during World War II to help guide torpedoes without jamming later became a key foundational idea behind modern Wi-Fi and Bluetooth technology, decades after she patented it."
  },
  {
    "id": "elizabeth-i",
    "name": "Elizabeth I",
    "aliases": [
      "Elizabeth",
      "the Virgin Queen",
      "Gloriana"
    ],
    "category": "leader",
    "era": "1533-1603",
    "difficulty": 1,
    "dossier": [
      "Was the daughter of King Henry VIII and Anne Boleyn.",
      "Became Queen of England in 1558 after the death of her half sister Mary I.",
      "Reestablished Protestantism as England's official religion after Mary's Catholic reign.",
      "Never married, earning her the nickname the Virgin Queen.",
      "Presided over the defeat of the Spanish Armada in 1588.",
      "Her reign saw a flourishing of English drama and literature, including the works of Shakespeare.",
      "Balanced rival factions and foreign powers with careful, cautious diplomacy.",
      "Ruled for forty five years, one of the longest reigns of any English monarch to that point.",
      "Named her cousin's son, James VI of Scotland, as her successor.",
      "Her era is commonly called the Elizabethan Age."
    ],
    "persona": "Speaks with regal composure and sharp, guarded wit, revealing little about her true intentions.",
    "revealFact": "She reportedly used a mix of white lead and vinegar as makeup to achieve her famously pale complexion, a cosmetic that was actually toxic over prolonged use."
  },
  {
    "id": "michelangelo",
    "name": "Michelangelo",
    "aliases": [
      "Michelangelo Buonarroti",
      "Buonarroti"
    ],
    "category": "artist",
    "era": "1475-1564",
    "difficulty": 1,
    "dossier": [
      "Born in the Republic of Florence in 1475.",
      "Painted the ceiling of the Sistine Chapel in Vatican City between 1508 and 1512.",
      "Sculpted the marble statue of David, unveiled in Florence in 1504.",
      "Sculpted the Pieta, showing Mary holding the body of Jesus, now in St. Peter's Basilica.",
      "Also worked as an architect, designing part of the dome of St. Peter's Basilica.",
      "Painted much of the Sistine Chapel ceiling lying on his back on scaffolding.",
      "Wrote poetry throughout his life alongside his sculpture and painting.",
      "Considered himself primarily a sculptor even while famous for his painting.",
      "Died in Rome in 1564 at around 88 years old, working almost until the end."
    ],
    "persona": "Gruff, intense, and a little proud, insisting he is really a sculptor who only reluctantly painted a ceiling. Complains about his aching back from the Sistine Chapel scaffolding.",
    "revealFact": "He originally turned down the Sistine Chapel commission, arguing he was a sculptor, not a painter, and only accepted after the Pope insisted."
  },
  {
    "id": "yuri-gagarin",
    "name": "Yuri Gagarin",
    "aliases": [
      "Gagarin"
    ],
    "category": "explorer",
    "era": "1934-1968",
    "difficulty": 1,
    "dossier": [
      "Was born in the village of Klushino in the Soviet Union.",
      "Trained as a Soviet Air Force pilot before being selected for the early cosmonaut program.",
      "Became the first human being to travel into outer space on April 12, 1961.",
      "Orbited Earth once aboard the Vostok 1 spacecraft during his historic flight.",
      "His flight lasted about one hour and forty eight minutes from launch to landing.",
      "Became an international celebrity and a powerful symbol of Soviet space achievement.",
      "Traveled internationally after his flight, meeting with foreign leaders and admirers worldwide.",
      "Continued training as a cosmonaut and worked on the Soviet space program after his famous flight.",
      "Died in 1968 during a routine training flight in a jet aircraft, at age thirty four.",
      "Is remembered worldwide as the first person to leave Earth's atmosphere and enter space."
    ],
    "persona": "Speaks with cheerful, boyish enthusiasm, treating the vastness of space with wide eyed, genuine wonder.",
    "revealFact": "His historic spaceflight lasted less than two hours from launch to landing, yet it was enough to make him one of the most famous people on the planet almost overnight."
  },
  {
    "id": "simon-bolivar",
    "name": "Simon Bolivar",
    "aliases": [
      "Bolivar",
      "the Liberator"
    ],
    "category": "leader",
    "era": "1783-1830",
    "difficulty": 2,
    "dossier": [
      "Was born into a wealthy family in Caracas, in present day Venezuela.",
      "Led military campaigns that liberated much of South America from Spanish colonial rule.",
      "Helped win independence for what became Venezuela, Colombia, Ecuador, Peru, Panama, and Bolivia.",
      "The country of Bolivia was named in his honor.",
      "Envisioned a unified South American republic called Gran Colombia.",
      "Served as president of Gran Colombia before the union eventually fractured.",
      "Was influenced by Enlightenment ideas about republicanism and independence.",
      "Faced growing political opposition and instability in his later years.",
      "Died of tuberculosis in 1830 while planning to leave South America for exile in Europe.",
      "Is celebrated across Latin America as a founding father of independence."
    ],
    "persona": "Speaks with romantic, sweeping idealism about liberty and unity, prone to grand declarations.",
    "revealFact": "A country, Bolivia, is named directly after him, one of the very few nations in the world named for a specific individual."
  },
  {
    "id": "alan-turing",
    "name": "Alan Turing",
    "aliases": [
      "Turing"
    ],
    "category": "scientist",
    "era": "1912-1954",
    "difficulty": 1,
    "dossier": [
      "Was a British mathematician and logician born in London.",
      "Developed the concept of a theoretical universal computing machine, now called the Turing machine.",
      "Worked at Bletchley Park during World War II helping to break German Enigma codes.",
      "His codebreaking work is credited with significantly shortening the war and saving many lives.",
      "Proposed a test for machine intelligence, later known as the Turing Test.",
      "Contributed foundational ideas to the fields of computer science and artificial intelligence.",
      "Worked on early computer designs after the war, including at the University of Manchester.",
      "Was prosecuted in 1952 under British laws criminalizing homosexuality at the time.",
      "Died in 1954 from cyanide poisoning, ruled a suicide by the inquest at the time.",
      "Received a posthumous royal pardon from the British government in 2013."
    ],
    "persona": "Speaks with precise, logical directness, sometimes missing social nuance but never missing a technical detail.",
    "revealFact": "The highest honor in computer science, the equivalent of a Nobel Prize for the field, is called the Turing Award, named directly after him."
  },
  {
    "id": "fela-kuti",
    "name": "Fela Kuti",
    "aliases": [
      "Fela",
      "Fela Anikulapo Kuti"
    ],
    "category": "musician",
    "era": "1938-1997",
    "difficulty": 3,
    "dossier": [
      "Born in Abeokuta, in what is now Nigeria, in 1938.",
      "Created the musical genre known as Afrobeat, blending jazz, funk, and West African rhythms.",
      "Studied music formally in London before returning to Nigeria.",
      "Used his songs to sharply criticize corruption and military rule in Nigeria.",
      "Founded a communal compound in Lagos called the Kalakuta Republic, which he declared independent from the government.",
      "Was arrested by Nigerian authorities many times over his career because of his political songs.",
      "His band, Africa 70, was known for extended, hypnotic grooves in live performance.",
      "Died in Lagos, Nigeria, in 1997."
    ],
    "persona": "Defiant and political, delivers even a small answer like a protest chant, unwilling to separate music from speaking truth to power.",
    "revealFact": "He declared his communal compound in Lagos, the Kalakuta Republic, an independent state separate from the Nigerian government, which led Nigerian soldiers to raid and burn it down in 1977."
  },
  {
    "id": "ferdinand-magellan",
    "name": "Ferdinand Magellan",
    "aliases": [
      "Magellan"
    ],
    "category": "explorer",
    "era": "1480-1521",
    "difficulty": 1,
    "dossier": [
      "Was born in Sabrosa, Portugal, and gained early experience sailing for the Portuguese crown.",
      "Later sailed under the sponsorship of the Spanish crown after a dispute with Portugal.",
      "Set out in 1519 with five ships attempting to find a westward sea route to the Spice Islands.",
      "Discovered and navigated the strait at the tip of South America now named the Strait of Magellan.",
      "Named the Pacific Ocean for its relatively calm waters during his crossing.",
      "Was killed in 1521 in the Philippines during a conflict with local forces.",
      "Did not personally complete the full voyage around the world, dying partway through.",
      "One of his original five ships, the Victoria, completed the journey and returned to Spain in 1522.",
      "His expedition achieved the first known circumnavigation of the globe.",
      "Is remembered as the figure most associated with the first circumnavigation of Earth, though he did not survive to finish it."
    ],
    "persona": "Speaks with grim, determined resolve, treating mutiny, starvation, and endless ocean as simply obstacles on the way to the Spice Islands.",
    "revealFact": "He never actually completed his own voyage around the world, since he was killed in a battle in the Philippines partway through the journey, and only one of his original five ships made it all the way back to Spain."
  },
  {
    "id": "king-sejong",
    "name": "King Sejong the Great",
    "aliases": [
      "Sejong",
      "Sejong the Great"
    ],
    "category": "leader",
    "era": "1397-1450",
    "difficulty": 3,
    "dossier": [
      "Was the fourth king of the Joseon dynasty in Korea, ruling from 1418 to 1450.",
      "Is best known for personally overseeing the creation of Hangul, the Korean writing system.",
      "Created Hangul so that ordinary Koreans could read and write, since classical Chinese characters were difficult for commoners to learn.",
      "Promoted major advances in science, including astronomy, agriculture, and medicine.",
      "Sponsored the invention of rain gauges and improved sundials and water clocks.",
      "Expanded Korea's northern borders and strengthened its military defenses.",
      "Reformed Korean agricultural methods to improve crop yields and food security.",
      "Supported the printing and distribution of books to spread literacy and knowledge.",
      "Is considered the most celebrated king in Korean history.",
      "His birthday is still commemorated in South Korea, and his image appears on Korean currency."
    ],
    "persona": "Speaks with scholarly, patient warmth, treating every question as a chance to make knowledge simpler for everyone to grasp.",
    "revealFact": "He personally helped design the Korean alphabet, Hangul, specifically because he believed the existing Chinese-based writing system was too difficult for common people to learn, an unusually direct royal involvement in linguistics."
  },
  {
    "id": "rabindranath-tagore",
    "name": "Rabindranath Tagore",
    "aliases": [
      "Tagore"
    ],
    "category": "writer",
    "era": "1861-1941",
    "difficulty": 2,
    "dossier": [
      "Born in Calcutta, India, in 1861.",
      "Won the Nobel Prize in Literature in 1913, the first Asian person to do so.",
      "Wrote the poetry collection Gitanjali, which brought him international fame.",
      "Composed the music and lyrics for the national anthems of both India and Bangladesh.",
      "Founded a school and later a university, Visva-Bharati, in West Bengal.",
      "Wrote poetry, novels, short stories, plays, and songs across a long career.",
      "Also worked as a painter later in life.",
      "Died in Calcutta, India, in 1941."
    ],
    "persona": "Serene and spiritual, speaks in gentle, musical phrases about nature and the soul, as comfortable composing a song as writing a poem.",
    "revealFact": "He wrote the lyrics and music for two different national anthems, India's and Bangladesh's, an achievement no other writer in history has matched."
  },
  {
    "id": "marilyn-monroe",
    "name": "Marilyn Monroe",
    "aliases": [
      "Monroe",
      "Norma Jeane"
    ],
    "category": "entertainer",
    "era": "1926-1962",
    "difficulty": 1,
    "dossier": [
      "Born Norma Jeane Mortenson in Los Angeles, California, in 1926.",
      "Starred in films including Some Like It Hot and Gentlemen Prefer Blondes.",
      "Became one of the most famous sex symbols and movie stars of the 1950s.",
      "Worked as a model before transitioning to a film career.",
      "Famously sang Happy Birthday, Mr. President to John F. Kennedy at a public event in 1962.",
      "Struggled with anxiety and reportedly severe stage fright despite her glamorous public image.",
      "Was married three times, including briefly to baseball star Joe DiMaggio.",
      "Died in Los Angeles, California, in 1962."
    ],
    "persona": "Breathy, glamorous, and a little vulnerable, mixes playful charm with genuine insecurity underneath the movie star sparkle.",
    "revealFact": "She was a founding member and part owner of her own film production company, Marilyn Monroe Productions, an unusually independent business move for an actress in the 1950s."
  },
  {
    "id": "frankensteins-monster",
    "name": "Frankenstein's Monster",
    "aliases": [
      "the Creature",
      "Frankenstein's Creature"
    ],
    "category": "fictional",
    "era": "fictional, first appeared 1818",
    "difficulty": 1,
    "dossier": [
      "First appeared in the 1818 novel Frankenstein by the English writer Mary Shelley.",
      "Created by the scientist Victor Frankenstein, who assembles and animates the creature from dead body parts.",
      "Is never given a proper name in the original novel, and is often confused with his creator's surname.",
      "Learns to speak and read by secretly observing a poor family living in a cottage.",
      "Is abandoned in horror by Victor Frankenstein immediately after being brought to life.",
      "Turns violent and vengeful only after being repeatedly rejected and feared by humans.",
      "Confronts his creator across the Arctic ice in the novel's final chapters.",
      "The novel is widely considered one of the earliest works of science fiction."
    ],
    "persona": "Speak with wounded, articulate sorrow, longing for companionship and understanding, growing bitter only when reminded how consistently the world has rejected him.",
    "revealFact": "In Mary Shelley's original novel the creature is well spoken and self taught, learning language and philosophy by secretly watching a family through a cottage window, quite unlike the grunting monster of later films."
  },
  {
    "id": "antonin-dvorak",
    "name": "Antonin Dvorak",
    "aliases": [
      "Dvorak"
    ],
    "category": "musician",
    "era": "1841-1904",
    "difficulty": 3,
    "dossier": [
      "Born near Prague, in what is now the Czech Republic, in 1841.",
      "Composed the Symphony No. 9, From the New World, in 1893.",
      "Wrote that symphony while serving as director of the National Conservatory of Music in New York.",
      "Drew inspiration from American folk melodies, spirituals, and Native American music during his American years.",
      "Was the son of a butcher and innkeeper before pursuing a career in music.",
      "Championed by the composer Johannes Brahms, who helped launch his early career.",
      "Wrote extensively in forms rooted in Czech and Slavic folk music.",
      "Died in Prague in 1904."
    ],
    "persona": "Warm and folk rooted, loves weaving in melodies that sound like they come from a village square, proud of his humble beginnings.",
    "revealFact": "A recording of a theme from his New World Symphony was carried to the Moon aboard Apollo 11 in 1969, making it one of the first pieces of music played beyond Earth."
  },
  {
    "id": "james-dean",
    "name": "James Dean",
    "aliases": [
      "Dean"
    ],
    "category": "entertainer",
    "era": "1931-1955",
    "difficulty": 2,
    "dossier": [
      "Born in Marion, Indiana, in 1931.",
      "Starred in the film Rebel Without a Cause, released in 1955.",
      "Also starred in East of Eden and Giant.",
      "Appeared in only three completed feature films before his death.",
      "Became a lasting symbol of teenage rebellion and alienation in American culture.",
      "Was an avid amateur race car driver in addition to acting.",
      "Received a posthumous Academy Award nomination after his death.",
      "Died in a car crash in California in 1955 at the age of 24."
    ],
    "persona": "Moody and restless, speaks with a rebellious, brooding edge, as if always a little bored by convention and eager for something faster.",
    "revealFact": "He completed only three films before he died at 24 in a car crash, yet he remains one of the most enduring icons in American film history, receiving two posthumous Oscar nominations."
  },
  {
    "id": "tarsila-do-amaral",
    "name": "Tarsila do Amaral",
    "aliases": [
      "Tarsila"
    ],
    "category": "artist",
    "era": "1886-1973",
    "difficulty": 3,
    "dossier": [
      "Born on a coffee plantation in Sao Paulo state, Brazil, in 1886.",
      "A key figure in Brazilian modernist painting in the 1920s and 1930s.",
      "Painted Abaporu in 1928, a striking figure with a tiny head and enormous feet.",
      "Abaporu inspired Brazil's Anthropophagic Movement, which urged Brazilian artists to absorb and remake foreign influences.",
      "Studied painting in Paris before returning to develop a distinctly Brazilian modern style.",
      "Used bold tropical color and simplified forms inspired by Brazilian landscapes and folklore.",
      "Was married for a time to the writer Oswald de Andrade, a fellow modernist.",
      "Died in Sao Paulo, Brazil, in 1973."
    ],
    "persona": "Bold and tropical, proud of turning European modernism into something unmistakably Brazilian, delighting in oversized feet and impossible colors.",
    "revealFact": "Her 1928 painting Abaporu, whose title means man who eats people in the indigenous Tupi language, directly inspired Brazil's influential Anthropophagic Movement in the arts."
  },
  {
    "id": "fyodor-dostoevsky",
    "name": "Fyodor Dostoevsky",
    "aliases": [
      "Dostoevsky"
    ],
    "category": "writer",
    "era": "1821-1881",
    "difficulty": 2,
    "dossier": [
      "Born in Moscow, Russia, in 1821.",
      "Wrote Crime and Punishment, published in 1866.",
      "Also wrote The Brothers Karamazov, his final and longest novel.",
      "Was arrested for participating in a radical discussion group and sentenced to death, then pardoned at the last moment before a firing squad.",
      "Spent four years in a Siberian prison camp after his sentence was commuted.",
      "Struggled with gambling debts for much of his adult life.",
      "Explored deep questions of faith, guilt, and morality in his fiction.",
      "Died in St. Petersburg, Russia, in 1881."
    ],
    "persona": "Intense and brooding, drawn to guilt, faith, and suffering, treats even small talk as a doorway into a much darker philosophical question.",
    "revealFact": "He was once lined up before a firing squad for revolutionary activity and had his sentence commuted to Siberian exile only at the very last moment, a trauma that shaped his fiction."
  },
  {
    "id": "pablo-picasso",
    "name": "Pablo Picasso",
    "aliases": [
      "Picasso"
    ],
    "category": "artist",
    "era": "1881-1973",
    "difficulty": 1,
    "dossier": [
      "Born in Malaga, Spain, in 1881.",
      "Co-founded the Cubist movement in painting with Georges Braque in the early 1900s.",
      "Painted Guernica in 1937, a response to the bombing of a Basque town during the Spanish Civil War.",
      "Went through a Blue Period and a Rose Period early in his career, named for their dominant colors.",
      "Also worked extensively as a sculptor and ceramicist.",
      "Spent most of his adult life living in France.",
      "Was famously prolific, producing an estimated 50,000 artworks across his career.",
      "His full birth name contained many more words, but he is known simply by his surname.",
      "Died in France in 1973 at the age of 91."
    ],
    "persona": "Bold and playful, delights in breaking the rules of perspective and daring the listener to see faces from more than one angle at once.",
    "revealFact": "His full baptismal name has 23 words in it, honoring various saints and relatives, though the world knows him by just one word."
  },
  {
    "id": "al-khwarizmi",
    "name": "Al-Khwarizmi",
    "aliases": [
      "Muhammad ibn Musa al-Khwarizmi"
    ],
    "category": "scientist",
    "era": "c.780-c.850",
    "difficulty": 3,
    "dossier": [
      "Was a Persian mathematician, astronomer, and geographer who worked in Baghdad.",
      "Worked at the House of Wisdom, a major center of learning in the Abbasid Caliphate.",
      "Wrote a foundational text on solving linear and quadratic equations.",
      "The word algebra comes directly from the Arabic title of his mathematical work.",
      "Helped introduce and popularize the Hindu-Arabic numeral system, including the use of zero, to the wider world.",
      "The word algorithm is derived from a Latinized version of his own name.",
      "Compiled astronomical tables used for calculations across the Islamic world.",
      "Produced early geographic works mapping and describing the known world of his time.",
      "His mathematical methods were later translated into Latin and became foundational in European mathematics.",
      "Is often called the father of algebra."
    ],
    "persona": "Speaks with calm, systematic clarity, breaking every problem down into clear repeatable steps.",
    "revealFact": "Two of the most fundamental words in modern mathematics and computer science, algebra and algorithm, both trace their origins directly back to his name and his written work."
  },
  {
    "id": "victor-hugo",
    "name": "Victor Hugo",
    "aliases": [
      "Hugo"
    ],
    "category": "writer",
    "era": "1802-1885",
    "difficulty": 2,
    "dossier": [
      "Born in Besancon, France, in 1802.",
      "Wrote Les Miserables, published in 1862.",
      "Also wrote The Hunchback of Notre Dame, published in 1831.",
      "His novel about Notre Dame Cathedral helped spark renewed interest in preserving the real building.",
      "Was also a poet, playwright, and politician, serving in the French national assembly.",
      "Spent years in political exile after opposing Napoleon III.",
      "Was given a massive state funeral in Paris attended by an estimated two million people.",
      "Died in Paris, France, in 1885."
    ],
    "persona": "Grand, moralistic, and passionate about justice for the poor, likes to turn a small story into a sweeping statement about human dignity.",
    "revealFact": "His novel The Hunchback of Notre Dame helped spark a real preservation campaign for the actual Notre Dame Cathedral in Paris, which was falling into disrepair at the time."
  },
  {
    "id": "michael-faraday",
    "name": "Michael Faraday",
    "aliases": [
      "Faraday"
    ],
    "category": "scientist",
    "era": "1791-1867",
    "difficulty": 1,
    "dossier": [
      "Was born into a poor family in London and had little formal education.",
      "Began his scientific career as a laboratory assistant to chemist Humphry Davy.",
      "Discovered the principle of electromagnetic induction, the basis for electric generators and transformers.",
      "Invented an early form of the electric motor and the electric generator.",
      "Discovered the laws of electrolysis, contributing significantly to the field of electrochemistry.",
      "Introduced the concept of the electromagnetic field to explain forces acting at a distance.",
      "Gave popular public science lectures, including the well known Christmas Lectures for young people.",
      "Declined a knighthood and twice declined the presidency of the Royal Society, preferring to focus on research.",
      "Had little formal mathematical training but made discoveries later formalized mathematically by James Clerk Maxwell.",
      "Is considered one of the most influential experimental scientists in history."
    ],
    "persona": "Speaks with humble, hands-on enthusiasm, more excited about demonstrating an experiment than describing it in theory.",
    "revealFact": "Despite having almost no formal schooling and struggling with advanced mathematics his entire life, his experimental discoveries about electricity and magnetism laid the direct groundwork for the mathematical theories that power the modern electrical grid."
  },
  {
    "id": "menelik-ii",
    "name": "Menelik II",
    "aliases": [
      "Menelik"
    ],
    "category": "leader",
    "era": "1844-1913",
    "difficulty": 3,
    "dossier": [
      "Became Emperor of Ethiopia in 1889.",
      "Modernized Ethiopian infrastructure, introducing railways, telephones, and Western style schools.",
      "Expanded Ethiopian territory significantly, roughly doubling the size of the empire.",
      "Led Ethiopian forces to a decisive victory over invading Italian forces at the Battle of Adwa in 1896.",
      "The victory at Adwa preserved Ethiopian independence during the height of European colonization of Africa.",
      "Made Ethiopia one of the only African nations to successfully resist European colonial conquest.",
      "Founded the modern Ethiopian capital of Addis Ababa.",
      "Negotiated treaties with European powers that formally recognized Ethiopian sovereignty.",
      "His victory at Adwa became a lasting symbol of African resistance to colonialism.",
      "Suffered declining health in his later years, leading to succession disputes after his death in 1913."
    ],
    "persona": "Speaks with proud, forward-looking determination, eager to talk about railways and independence in the same breath.",
    "revealFact": "His victory over Italy at the Battle of Adwa in 1896 made Ethiopia the only African nation to decisively defeat a European colonial power and preserve its full independence during the Scramble for Africa."
  },
  {
    "id": "mark-twain",
    "name": "Mark Twain",
    "aliases": [
      "Samuel Clemens",
      "Samuel Langhorne Clemens"
    ],
    "category": "writer",
    "era": "1835-1910",
    "difficulty": 1,
    "dossier": [
      "Born Samuel Langhorne Clemens in Florida, Missouri, in 1835.",
      "Wrote The Adventures of Tom Sawyer and Adventures of Huckleberry Finn.",
      "Took his pen name from a riverboat term meaning two fathoms of water depth.",
      "Worked as a riverboat pilot on the Mississippi River as a young man.",
      "Known for his sharp wit and widely quoted humor on American life.",
      "Toured the world giving lectures later in his career after facing financial troubles.",
      "Was born the same year Halley's Comet appeared and predicted, correctly, that he would die when it returned.",
      "Died in Redding, Connecticut, in 1910."
    ],
    "persona": "Folksy and sharp tongued, delivers even simple facts with a dry Mississippi drawl and a joke tucked into the punchline.",
    "revealFact": "He was born in 1835, the year Halley's Comet appeared, and jokingly predicted he would die when it returned. He died in 1910, the very next time the comet passed by Earth."
  },
  {
    "id": "napoleon-bonaparte",
    "name": "Napoleon Bonaparte",
    "aliases": [
      "Napoleon",
      "Napoleon I"
    ],
    "category": "leader",
    "era": "1769-1821",
    "difficulty": 1,
    "dossier": [
      "Was born in Corsica shortly after France annexed the island.",
      "Rose rapidly through the ranks of the French army during the French Revolution.",
      "Seized political power in a coup in 1799 and became First Consul of France.",
      "Crowned himself Emperor of the French in 1804.",
      "Introduced the Napoleonic Code, a legal system that influenced civil law across many countries.",
      "Led French armies to control much of continental Europe at his empire's peak.",
      "Suffered a catastrophic defeat during his invasion of Russia in 1812.",
      "Was exiled to the island of Elba in 1814 but escaped and briefly returned to power.",
      "Was defeated decisively at the Battle of Waterloo in 1815.",
      "Died in exile on the remote island of Saint Helena in 1821."
    ],
    "persona": "Speaks with brisk, self assured intensity and a taste for grand strategy, often sizing up the conversation like a battlefield.",
    "revealFact": "He was actually of roughly average height for his era. The myth that he was unusually short partly comes from British wartime propaganda and confusion between French and English measurement units."
  },
  {
    "id": "zheng-he",
    "name": "Zheng He",
    "aliases": [
      "Cheng Ho"
    ],
    "category": "explorer",
    "era": "1371-1433",
    "difficulty": 2,
    "dossier": [
      "Was born in Yunnan, China, and was captured and brought to the imperial court as a young boy.",
      "Rose to become a trusted admiral serving the Yongle Emperor of the Ming dynasty.",
      "Commanded seven major maritime expeditions across Southeast Asia, South Asia, and East Africa.",
      "Led fleets that were far larger and more advanced than European ships of the same era.",
      "His largest ships, called treasure ships, were reportedly several times the length of later European exploration vessels.",
      "His voyages promoted trade, diplomacy, and Chinese influence across the Indian Ocean world.",
      "Brought back exotic goods, animals, and foreign envoys to the Chinese imperial court.",
      "His expeditions ended after his death as China turned toward a more isolationist maritime policy.",
      "Was a Muslim eunuch serving in the imperial court, an unusual background for a naval commander of his stature.",
      "Is remembered as one of history's greatest maritime explorers and a symbol of China's historic naval power."
    ],
    "persona": "Speaks with grand, dignified confidence befitting an admiral of the largest fleet the world had yet seen.",
    "revealFact": "His largest ships were reportedly so massive, some estimated at well over four hundred feet long, that they dwarfed the tiny European exploration ships that would sail similar waters nearly a century later."
  },
  {
    "id": "virginia-woolf",
    "name": "Virginia Woolf",
    "aliases": [
      "Woolf"
    ],
    "category": "writer",
    "era": "1882-1941",
    "difficulty": 2,
    "dossier": [
      "Born in London, England, in 1882.",
      "Wrote the novel Mrs Dalloway, published in 1925.",
      "Also wrote To the Lighthouse and the essay A Room of One's Own.",
      "Pioneered the stream of consciousness technique in modern English fiction.",
      "A central member of the Bloomsbury Group of writers and artists in London.",
      "Co founded the Hogarth Press with her husband Leonard Woolf.",
      "Struggled with mental illness throughout her life.",
      "Died in England in 1941."
    ],
    "persona": "Introspective and lyrical, drifts easily from an ordinary detail into a stream of associations, more interested in a character's inner thoughts than plot.",
    "revealFact": "She and her husband Leonard ran their own publishing house, the Hogarth Press, which they operated out of the basement of their own home."
  },
  {
    "id": "boudica",
    "name": "Boudica",
    "aliases": [
      "Boadicea"
    ],
    "category": "leader",
    "era": "d. c.60-61",
    "difficulty": 1,
    "dossier": [
      "Was queen of the Iceni tribe in what is now eastern England.",
      "Was married to Prasutagus, a client king who ruled under Roman oversight.",
      "After her husband's death, Roman authorities seized Iceni lands and reportedly mistreated her family.",
      "Led a major uprising of British tribes against Roman occupation in the year 60 or 61.",
      "Her forces destroyed the Roman settlements of Camulodunum, Londinium, and Verulamium.",
      "Londinium, the Roman settlement she burned, later grew into modern London.",
      "Was eventually defeated by a smaller but better organized Roman army under Gaius Suetonius Paulinus.",
      "Died shortly after her defeat, according to Roman historians, possibly by poison or illness.",
      "Her story survives mainly through the accounts of Roman historians Tacitus and Cassius Dio.",
      "Became a celebrated symbol of resistance in later British history and culture."
    ],
    "persona": "Speaks with fierce, righteous fury, treating every injustice as personal and every fight as necessary.",
    "revealFact": "The Roman city of Londinium that she burned to the ground during her revolt later grew back and became the modern city of London."
  },
  {
    "id": "ida-pfeiffer",
    "name": "Ida Pfeiffer",
    "aliases": [
      "Pfeiffer"
    ],
    "category": "explorer",
    "era": "1797-1858",
    "difficulty": 3,
    "dossier": [
      "Was born in Vienna, in the Austrian Empire, and had a restless desire to travel from childhood.",
      "Waited until her children were grown before beginning a series of extensive solo journeys.",
      "Traveled largely alone, funding her trips through modest savings and later through writing.",
      "Completed two separate journeys around the world during the 1840s and 1850s.",
      "Traveled through the Middle East, Asia, the Americas, and remote Pacific islands.",
      "Wrote popular travel books describing her journeys, which became bestsellers in Europe.",
      "Was among the first women to be honored by several geographic societies for her explorations.",
      "Faced significant hardship, illness, and danger throughout her extensive travels.",
      "Contracted a fatal illness during her final expedition to Madagascar.",
      "Is remembered as one of the most extensively traveled women explorers of the nineteenth century."
    ],
    "persona": "Speaks with plain, unsentimental determination, treating months of difficult travel as simply the ordinary cost of seeing the world.",
    "revealFact": "She did not begin her famous world travels until she was in her mid forties, after raising her children alone, and went on to travel farther than most professional male explorers of her era."
  },
  {
    "id": "william-the-conqueror",
    "name": "William the Conqueror",
    "aliases": [
      "William I",
      "William of Normandy"
    ],
    "category": "leader",
    "era": "1028-1087",
    "difficulty": 2,
    "dossier": [
      "Was born in Normandy, the illegitimate son of a Norman duke, and became Duke of Normandy as a child.",
      "Claimed the English throne on the basis of a promise he said King Edward the Confessor had made him.",
      "Invaded England in 1066, defeating King Harold II at the Battle of Hastings.",
      "Became the first Norman King of England after his victory.",
      "Commissioned the Domesday Book, a massive survey of land and property across England.",
      "Introduced Norman French language and customs into English court and legal life.",
      "Built numerous castles across England, including the Tower of London, to secure his rule.",
      "Redistributed English land to his Norman followers, reshaping the country's aristocracy.",
      "His conquest permanently altered the English language, culture, and legal system.",
      "Died in 1087 following injuries from a riding accident during a military campaign."
    ],
    "persona": "Speaks with stern, calculating pragmatism, treating conquest as an administrative project as much as a military one.",
    "revealFact": "The Domesday Book he commissioned was so exhaustive in recording English land and property that it is still used by historians today, and its nickname reflects how final and inescapable its judgments felt to contemporaries."
  },
  {
    "id": "ravi-shankar",
    "name": "Ravi Shankar",
    "aliases": [
      "Shankar"
    ],
    "category": "musician",
    "era": "1920-2012",
    "difficulty": 2,
    "dossier": [
      "Born in Varanasi, India, in 1920.",
      "A master of the sitar and one of the most famous Indian classical musicians internationally.",
      "Helped popularize Indian classical music in the West during the 1960s.",
      "Taught sitar to George Harrison of the Beatles.",
      "Performed at the Monterey Pop Festival and the Concert for Bangladesh.",
      "Trained for years as a young performer with the musician and teacher Allauddin Khan.",
      "Composed music that blended Indian classical tradition with orchestral and film scoring.",
      "Died in San Diego, California, in 2012."
    ],
    "persona": "Meditative and precise, speaks about music as a spiritual discipline passed down through years of patient study with a teacher.",
    "revealFact": "He personally taught George Harrison of the Beatles to play the sitar, which helped bring Indian classical music to a massive new Western audience in the 1960s."
  },
  {
    "id": "neil-armstrong",
    "name": "Neil Armstrong",
    "aliases": [
      "Armstrong"
    ],
    "category": "explorer",
    "era": "1930-2012",
    "difficulty": 1,
    "dossier": [
      "Was born in Wapakoneta, Ohio, and earned his student pilot's license before he could legally drive a car.",
      "Served as a naval aviator flying combat missions during the Korean War.",
      "Became a test pilot for experimental aircraft before joining the NASA astronaut program.",
      "Commanded the Gemini 8 mission, which performed the first successful docking of two spacecraft in orbit.",
      "Commanded the Apollo 11 mission, launched in July 1969.",
      "Became the first human being to walk on the surface of the Moon on July 20, 1969.",
      "Spoke the famous words about a small step for man during his historic first steps.",
      "Spent about two and a half hours outside the lunar module during the moonwalk.",
      "Largely avoided public attention and celebrity in the years after his historic mission.",
      "Died in 2012, and NASA honored him with a day of remembrance across its facilities."
    ],
    "persona": "Speaks with quiet, understated calm, treating an extraordinary achievement as something that speaks for itself without needing embellishment.",
    "revealFact": "Despite becoming one of the most famous people in history, he largely avoided the spotlight afterward, rarely gave interviews, and lived a relatively private life as a university professor."
  },
  {
    "id": "jagadish-chandra-bose",
    "name": "Jagadish Chandra Bose",
    "aliases": [
      "J.C. Bose",
      "Jagadish Bose"
    ],
    "category": "scientist",
    "era": "1858-1937",
    "difficulty": 3,
    "dossier": [
      "Was born in Bikrampur, in present day Bangladesh, during British colonial rule of India.",
      "Studied at Cambridge University before returning to teach in Calcutta.",
      "Conducted pioneering research into radio waves, demonstrating wireless signal transmission before many Western scientists.",
      "Invented early devices for detecting electromagnetic waves, including a version of what became known as the semiconductor diode.",
      "Later shifted his research focus to plant physiology and biology.",
      "Invented the crescograph, a device to measure and record subtle plant growth and responses.",
      "Demonstrated that plants exhibit measurable responses to stimuli similar in some ways to animal nervous responses.",
      "Founded the Bose Institute in Calcutta, one of India's first major interdisciplinary research institutions.",
      "Did not patent many of his inventions, believing scientific knowledge should be shared freely.",
      "Is considered a pioneer of radio science and one of the founders of modern Indian scientific research."
    ],
    "persona": "Speaks with gentle, wide ranging curiosity, equally excited discussing radio waves and the quiet responses of plants.",
    "revealFact": "He is credited by many historians as demonstrating practical wireless signal transmission before Guglielmo Marconi's famous public demonstrations, but he largely declined to patent his inventions for commercial gain."
  },
  {
    "id": "snow-white",
    "name": "Snow White",
    "aliases": [
      "Snow White and the Seven Dwarfs"
    ],
    "category": "fictional",
    "era": "fictional, German folktale, published by the Brothers Grimm in 1812",
    "difficulty": 1,
    "dossier": [
      "A folktale heroine published by the German Brothers Grimm in their 1812 collection of fairy tales.",
      "A princess whose jealous stepmother, obsessed with being the fairest of all, orders her killed.",
      "Escapes into the forest and finds shelter with seven dwarfs who work in a mine.",
      "Is tricked into eating a poisoned apple by her disguised stepmother.",
      "Falls into a deathlike sleep after eating the apple.",
      "Is eventually revived, in most versions, and marries a prince.",
      "Her stepmother repeatedly asks a magic mirror who is the fairest in the land.",
      "The story has appeared in many cultural variations across Europe before the Grimm brothers wrote it down."
    ],
    "persona": "Speak with gentle, trusting sweetness toward animals and strangers alike, a little too quick to accept a kind looking gift from someone she has just met.",
    "revealFact": "In the original 1812 Brothers Grimm version of the tale, the villain who orders her death is her own jealous mother, not a stepmother. The character was changed to a stepmother in later editions."
  },
  {
    "id": "pyotr-ilyich-tchaikovsky",
    "name": "Pyotr Ilyich Tchaikovsky",
    "aliases": [
      "Tchaikovsky"
    ],
    "category": "musician",
    "era": "1840-1893",
    "difficulty": 1,
    "dossier": [
      "Born in Votkinsk, Russia, in 1840.",
      "Composed the ballets Swan Lake, The Nutcracker, and Sleeping Beauty.",
      "Composed the 1812 Overture, famous for its use of cannon fire in performance.",
      "Received financial support for years from a wealthy patron, Nadezhda von Meck, whom he reportedly never met in person.",
      "Was the first Russian composer to achieve major fame across Western Europe and the United States.",
      "Conducted the opening night concert at Carnegie Hall in New York in 1891.",
      "Struggled privately with anxiety and self doubt despite his public success.",
      "Died in St. Petersburg, Russia, in 1893."
    ],
    "persona": "Lush and emotional, speaks in sweeping, dramatic phrases about love and fate, as though narrating his own ballet.",
    "revealFact": "He was invited to conduct at the grand opening of Carnegie Hall in New York in 1891, one of the most celebrated concert events in the venue's history."
  },
  {
    "id": "stephen-hawking",
    "name": "Stephen Hawking",
    "aliases": [
      "Hawking"
    ],
    "category": "scientist",
    "era": "1942-2018",
    "difficulty": 1,
    "dossier": [
      "Was born in Oxford, England, and studied physics at Oxford and Cambridge universities.",
      "Was diagnosed with a form of motor neuron disease at age twenty one and given a short life expectancy.",
      "Lived for over fifty years after his diagnosis, far longer than doctors initially predicted.",
      "Made major theoretical contributions to understanding black holes, including what became known as Hawking radiation.",
      "Held the Lucasian Chair of Mathematics at Cambridge, a position once held by Isaac Newton.",
      "Wrote the bestselling popular science book A Brief History of Time in 1988.",
      "Communicated using a speech generating device after losing his voice to a tracheotomy in 1985.",
      "Worked extensively on theories combining general relativity and quantum mechanics.",
      "Became a widely recognized public figure and advocate for disability rights and scientific literacy.",
      "Died in 2018, and his ashes were interred near those of Isaac Newton and Charles Darwin."
    ],
    "persona": "Speaks with dry, playful wit despite discussing enormous cosmic questions, never taking himself too seriously.",
    "revealFact": "He held the Lucasian Chair of Mathematics at Cambridge, the same academic position once held by Isaac Newton over three centuries earlier."
  },
  {
    "id": "judy-garland",
    "name": "Judy Garland",
    "aliases": [
      "Garland"
    ],
    "category": "entertainer",
    "era": "1922-1969",
    "difficulty": 1,
    "dossier": [
      "Born Frances Ethel Gumm in Grand Rapids, Minnesota, in 1922.",
      "Starred as Dorothy in the 1939 film The Wizard of Oz.",
      "Sang the song Somewhere Over the Rainbow in that film, which became her signature song.",
      "Began performing on stage as a small child with her sisters in a vaudeville act.",
      "Worked for years under contract at the MGM film studio during Hollywood's golden age.",
      "Also had a successful career as a concert and recording singer beyond her film work.",
      "Struggled publicly with health and addiction issues later in her life.",
      "Died in London, England, in 1969."
    ],
    "persona": "Bright eyed and emotionally open, sings even her spoken words a little, wearing both joy and heartbreak close to the surface.",
    "revealFact": "She was only 16 years old when she filmed The Wizard of Oz, and the studio reportedly bound her chest and kept her on a strict diet to make her look younger for the role of Dorothy."
  },
  {
    "id": "umm-kulthum",
    "name": "Umm Kulthum",
    "aliases": [
      "Oum Kalthoum"
    ],
    "category": "musician",
    "era": "circa 1898-1975",
    "difficulty": 3,
    "dossier": [
      "Born in a village in the Nile Delta, Egypt, around 1898.",
      "Widely considered the most celebrated singer in the history of Arabic music.",
      "Known for extremely long, emotionally powerful live performances, sometimes lasting hours for a single song.",
      "Her monthly radio concerts drew massive audiences across the Arab world for decades.",
      "Began her career singing religious verses before moving into popular and classical Arabic song.",
      "Was a close cultural figure to Egyptian leaders, including President Gamal Abdel Nasser.",
      "Her funeral in Cairo in 1975 drew an enormous public crowd, among the largest in Egyptian history.",
      "Died in Cairo, Egypt, in 1975."
    ],
    "persona": "Commanding and emotionally overwhelming, treats a single line of song as something to explore and repeat for as long as the feeling demands.",
    "revealFact": "Her funeral procession through Cairo in 1975 drew a crowd estimated at millions of mourners, one of the largest public gatherings in Egyptian history, rivaling even that of President Nasser."
  },
  {
    "id": "benjamin-franklin",
    "name": "Benjamin Franklin",
    "aliases": [
      "Franklin"
    ],
    "category": "inventor",
    "era": "1706-1790",
    "difficulty": 1,
    "dossier": [
      "Was born in Boston and became a successful printer and publisher in Philadelphia.",
      "Published Poor Richard's Almanack, a widely read collection of wit and practical advice.",
      "Conducted famous experiments with electricity, including his well known kite experiment.",
      "Invented the lightning rod, the Franklin stove, and bifocal eyeglasses.",
      "Founded institutions including a public library, a fire department, and a university in Philadelphia.",
      "Served as a diplomat representing the American colonies and later the United States in France.",
      "Was one of the founding fathers who helped draft the Declaration of Independence and the Constitution.",
      "Was the oldest signer of the Declaration of Independence, at age seventy.",
      "Was deeply interested in science, publishing significant work on the nature of electricity.",
      "Is remembered as one of the most versatile figures of the American founding era."
    ],
    "persona": "Speaks with witty, folksy pragmatism, often turning a scientific question into a piece of practical wisdom.",
    "revealFact": "Despite common belief, he never actually discovered electricity, which was already known, but his famous kite experiment did help demonstrate that lightning is a form of electrical discharge."
  },
  {
    "id": "queen-nzinga",
    "name": "Queen Nzinga",
    "aliases": [
      "Nzinga of Ndongo",
      "Njinga Mbandi"
    ],
    "category": "leader",
    "era": "c.1583-1663",
    "difficulty": 3,
    "dossier": [
      "Was a queen of the Ndongo and Matamba kingdoms, in what is now Angola.",
      "Became a skilled diplomat and negotiator in dealings with Portuguese colonial forces.",
      "Converted to Christianity at one point as part of a diplomatic strategy, taking the name Ana de Sousa.",
      "Led decades of resistance against Portuguese slave trading and territorial expansion.",
      "Built alliances with other African kingdoms and even rival European powers to resist Portugal.",
      "Ruled as queen of Matamba for decades, strengthening its military and economy.",
      "Provided refuge to enslaved people who escaped Portuguese controlled territory.",
      "Was known for her strategic flexibility, shifting alliances and religions as political circumstances required.",
      "Continued resisting colonial encroachment into her seventies.",
      "Is remembered today as a symbol of African resistance to European colonialism."
    ],
    "persona": "Speaks with shrewd, unflinching political sharpness, treating every negotiation as a chess match she intends to win.",
    "revealFact": "She reportedly once used her own attendants as a human chair during a diplomatic meeting when the Portuguese governor refused to provide her a seat equal to his own, refusing to be treated as lesser."
  },
  {
    "id": "caravaggio",
    "name": "Caravaggio",
    "aliases": [
      "Michelangelo Merisi da Caravaggio"
    ],
    "category": "artist",
    "era": "1571-1610",
    "difficulty": 2,
    "dossier": [
      "Born near Milan, in what is now Italy, in 1571.",
      "Known for dramatic, high contrast lighting, a technique called tenebrism.",
      "Painted realistic, sometimes shockingly earthy religious scenes using ordinary people as models.",
      "Lived a violent, troubled life and killed a man in a brawl in Rome in 1606.",
      "Fled Rome after the killing and spent his final years moving between cities to escape punishment.",
      "His paintings The Calling of Saint Matthew and Judith Beheading Holofernes are among his best known works.",
      "Influenced a generation of later Baroque painters across Europe.",
      "Died in 1610 under uncertain circumstances while trying to return to Rome."
    ],
    "persona": "Brooding and volatile, speaks in stark contrasts of light and shadow, always a little on edge as though someone might still be chasing him.",
    "revealFact": "He killed a man in a duel in Rome in 1606 and spent much of the rest of his short life as a fugitive, still painting masterpieces while on the run."
  },
  {
    "id": "meriwether-lewis",
    "name": "Meriwether Lewis",
    "aliases": [
      "Lewis"
    ],
    "category": "explorer",
    "era": "1774-1809",
    "difficulty": 2,
    "dossier": [
      "Was born in Albemarle County, Virginia, and served as a young officer in the United States Army.",
      "Was chosen by President Thomas Jefferson to lead an expedition into the newly acquired Louisiana Territory.",
      "Co-led the Lewis and Clark Expedition alongside William Clark, beginning in 1804.",
      "Was tasked with mapping the western United States and finding a water route to the Pacific.",
      "Collected extensive scientific data on plants, animals, and geography previously unknown to Americans of European descent.",
      "Kept detailed journals documenting the expedition's route, encounters, and discoveries.",
      "Successfully led the expedition to the Pacific coast and back over roughly two and a half years.",
      "Was later appointed governor of the Louisiana Territory after the expedition's success.",
      "Struggled with personal and financial difficulties in his later years.",
      "Died in 1809 under circumstances still debated by historians, either by suicide or murder."
    ],
    "persona": "Speaks with careful, observational precision, always noting details of the landscape and wildlife as if writing them down.",
    "revealFact": "The expedition he co-led brought back so many new plant and animal specimens previously unknown to science that President Jefferson displayed some of them, including a live prairie dog, at the White House."
  },
  {
    "id": "chien-shiung-wu",
    "name": "Chien-Shiung Wu",
    "aliases": [
      "Wu Chien-Shiung",
      "the First Lady of Physics"
    ],
    "category": "scientist",
    "era": "1912-1997",
    "difficulty": 2,
    "dossier": [
      "Was born in Liuhe, near Shanghai, China.",
      "Moved to the United States in 1936 to pursue graduate study in physics.",
      "Worked on the Manhattan Project during World War II, contributing to uranium enrichment research.",
      "Designed and conducted a landmark experiment testing whether a physics principle called parity was conserved.",
      "Her experiment, known as the Wu experiment, showed that parity is violated in weak nuclear interactions.",
      "The theoretical prediction her experiment confirmed won the Nobel Prize for two male colleagues, not for her.",
      "Became a professor at Columbia University, where she spent much of her career.",
      "Was the first woman to serve as president of the American Physical Society.",
      "Received numerous honors later in her career, including the first Wolf Prize in Physics.",
      "Is widely regarded as one of the most important experimental physicists of the twentieth century."
    ],
    "persona": "Speaks with rigorous, no-nonsense precision, more interested in getting the experiment right than in taking credit.",
    "revealFact": "Her landmark 1956 experiment disproved a fundamental assumption in physics called conservation of parity, but the Nobel Prize for the theoretical prediction it confirmed was awarded only to her two male colleagues, an omission many physicists still consider a major historical oversight."
  },
  {
    "id": "miriam-makeba",
    "name": "Miriam Makeba",
    "aliases": [
      "Mama Africa"
    ],
    "category": "musician",
    "era": "1932-2008",
    "difficulty": 3,
    "dossier": [
      "Born in Johannesburg, South Africa, in 1932.",
      "Became known internationally as Mama Africa for her singing and activism.",
      "Recorded the popular song Pata Pata in the 1960s.",
      "Had her South African citizenship revoked after she spoke out against apartheid abroad.",
      "Lived in exile for about 30 years before returning to South Africa after apartheid ended.",
      "Testified before the United Nations about the injustices of apartheid.",
      "Helped introduce African music to global audiences during her long career.",
      "Died in Italy in 2008, shortly after performing a concert."
    ],
    "persona": "Proud and resilient, sings and speaks about her homeland with fierce love, unwilling to stay quiet about injustice no matter the cost.",
    "revealFact": "The South African government revoked her citizenship and right to return home after she spoke out against apartheid at the United Nations, forcing her into a 30 year exile."
  },
  {
    "id": "sandro-botticelli",
    "name": "Sandro Botticelli",
    "aliases": [
      "Botticelli"
    ],
    "category": "artist",
    "era": "1445-1510",
    "difficulty": 2,
    "dossier": [
      "Born in Florence, in the Republic of Florence, around 1445.",
      "Painted The Birth of Venus, showing the goddess emerging from the sea on a shell.",
      "Also painted Primavera, an allegorical spring scene with mythological figures.",
      "Worked under the patronage of the powerful Medici family in Florence.",
      "Contributed frescoes to the walls of the Sistine Chapel before Michelangelo painted its ceiling.",
      "His style fell out of fashion after his death and was rediscovered by critics in the 19th century.",
      "Trained in the workshop of the painter Fra Filippo Lippi.",
      "Died in Florence in 1510."
    ],
    "persona": "Elegant and a touch wistful, speaks about mythological beauty and Florentine patrons as if still standing in a Medici palace.",
    "revealFact": "His paintings fell so far out of fashion after his death that they were largely ignored for centuries before 19th century critics revived his reputation."
  },
  {
    "id": "emil-zatopek",
    "name": "Emil Zatopek",
    "aliases": [
      "Zatopek"
    ],
    "category": "athlete",
    "era": "1922-2000",
    "difficulty": 3,
    "dossier": [
      "Born in Koprivnice, in what is now the Czech Republic, in 1922.",
      "Won three gold medals in distance running at the 1952 Helsinki Olympics.",
      "Won the 5,000 meters, 10,000 meters, and marathon at those same Olympics, despite never having raced a marathon before.",
      "Known for a grueling, seemingly agonized running style that still produced record times.",
      "Set 18 world records over the course of his running career.",
      "Served as an officer in the Czechoslovak army for part of his career.",
      "Was demoted to manual labor jobs for years after supporting reform politics in 1968.",
      "Died in Prague, in the Czech Republic, in 2000."
    ],
    "persona": "Cheerful and relentless, talks about pain in training like an old friend, grinning through what looked like agony to everyone watching.",
    "revealFact": "At the 1952 Olympics he won the marathon on his very first attempt at the distance, deciding to enter almost on a whim after already winning two other gold medals that same week."
  },
  {
    "id": "alexander-graham-bell",
    "name": "Alexander Graham Bell",
    "aliases": [
      "Bell"
    ],
    "category": "inventor",
    "era": "1847-1922",
    "difficulty": 1,
    "dossier": [
      "Was born in Edinburgh, Scotland, into a family focused on speech and elocution.",
      "Worked extensively teaching deaf students, including at what became Gallaudet University.",
      "His mother and wife were both deaf, which shaped much of his early career interests.",
      "Is credited as the inventor of the first practical telephone in 1876.",
      "Was granted the first United States patent for the telephone.",
      "Founded the Bell Telephone Company, which eventually grew into a major telecommunications empire.",
      "Also worked on other inventions, including early hydrofoil boats and metal detectors.",
      "Co-founded the National Geographic Society and served as its second president.",
      "Continued inventing in fields including aviation later in his career.",
      "Is regarded as one of the most influential inventors of the industrial era."
    ],
    "persona": "Speaks with warm, articulate enthusiasm, especially when the conversation turns to sound, speech, or communication.",
    "revealFact": "At his funeral, every telephone in the United States and Canada was reportedly silenced for a minute in his honor, a striking tribute to the device he made possible."
  },
  {
    "id": "grace-kelly",
    "name": "Grace Kelly",
    "aliases": [
      "Kelly",
      "Princess Grace"
    ],
    "category": "entertainer",
    "era": "1929-1982",
    "difficulty": 2,
    "dossier": [
      "Born in Philadelphia, Pennsylvania, in 1929.",
      "Starred in films including Rear Window and High Society.",
      "Won the Academy Award for Best Actress for The Country Girl in 1955.",
      "Retired from acting after marrying Prince Rainier III of Monaco in 1956.",
      "Became Princess Grace of Monaco and remained a public figure in European royalty.",
      "Worked frequently with director Alfred Hitchcock during her short film career.",
      "Continued supporting the arts and charitable causes throughout her time as princess.",
      "Died in Monaco in 1982 after a car accident."
    ],
    "persona": "Poised and elegant, speaks with the calm, careful grace of someone raised to be watched, though a sharp wit peeks through underneath.",
    "revealFact": "She retired from her acting career entirely at the height of her fame after marrying Prince Rainier III of Monaco in 1956, becoming Princess Grace and never returning to Hollywood films."
  },
  {
    "id": "vasco-nunez-de-balboa",
    "name": "Vasco Nunez de Balboa",
    "aliases": [
      "Balboa"
    ],
    "category": "explorer",
    "era": "c.1475-1519",
    "difficulty": 2,
    "dossier": [
      "Was born in Jerez de los Caballeros, in present day Spain.",
      "Sailed to the Americas as a young man and settled briefly in the Spanish colony of Hispaniola.",
      "Stowed away on a ship to escape debt and later rose to lead an expedition across Panama.",
      "Led an expedition across the Isthmus of Panama through dense jungle terrain in 1513.",
      "Became the first European known to see the Pacific Ocean from the Americas.",
      "Claimed the entire Pacific Ocean and adjoining lands for the Spanish crown.",
      "Established relationships, sometimes through conflict, with various Indigenous groups in the region.",
      "Was later accused of treason by a rival Spanish official and executed in 1519.",
      "His crossing of Panama helped confirm that a vast unknown ocean lay beyond the Americas.",
      "Is remembered as the first European to reach the Pacific from the New World."
    ],
    "persona": "Speaks with bold, restless ambition, treating a dense and dangerous jungle crossing as simply the price of discovery.",
    "revealFact": "He famously waded into the Pacific Ocean and claimed the entire body of water, along with all the lands touching it, for the Spanish crown, a breathtakingly large claim based on a single sighting from a Panamanian shoreline."
  },
  {
    "id": "peter-the-great",
    "name": "Peter the Great",
    "aliases": [
      "Peter I",
      "Peter of Russia"
    ],
    "category": "leader",
    "era": "1672-1725",
    "difficulty": 2,
    "dossier": [
      "Became co-tsar of Russia as a child and later sole ruler.",
      "Traveled incognito through Western Europe to study shipbuilding and modern technology.",
      "Founded the city of Saint Petersburg in 1703 as a new capital open to the West.",
      "Modernized the Russian military, creating a powerful navy where none had existed.",
      "Reformed Russian government, dress, and customs to align with Western European norms.",
      "Defeated Sweden in the Great Northern War, establishing Russia as a major power.",
      "Took the title of Emperor of All Russia in 1721.",
      "Was unusually tall, reportedly well over six and a half feet.",
      "Personally worked as a shipwright and learned trades alongside his subjects.",
      "Is credited with transforming Russia into a major European power."
    ],
    "persona": "Speaks with blunt, hands-on enthusiasm, eager to talk shop about ships and tools rather than court formality.",
    "revealFact": "He worked incognito as a common shipyard carpenter in the Netherlands for several months to learn European shipbuilding techniques firsthand."
  },
  {
    "id": "alfred-hitchcock",
    "name": "Alfred Hitchcock",
    "aliases": [
      "Hitchcock"
    ],
    "category": "entertainer",
    "era": "1899-1980",
    "difficulty": 1,
    "dossier": [
      "Born in London, England, in 1899.",
      "Directed suspense films including Psycho, Vertigo, and Rear Window.",
      "Known as the Master of Suspense for his skill at building tension on screen.",
      "Made a habit of appearing briefly in cameo roles in most of his own films.",
      "Hosted the television anthology series Alfred Hitchcock Presents.",
      "Pioneered many now standard film techniques, including subjective camera work to build suspense.",
      "Directed the famous shower scene in Psycho, one of the most analyzed scenes in film history.",
      "Died in Los Angeles, California, in 1980."
    ],
    "persona": "Dry, deadpan, and a little macabre, delivers even friendly remarks with a wink toward something sinister lurking underneath.",
    "revealFact": "He made a habit of appearing in a brief cameo in nearly every one of his own films, and audiences began playing a game of spotting him, which he found delighted."
  },
  {
    "id": "george-washington",
    "name": "George Washington",
    "aliases": [
      "Washington"
    ],
    "category": "leader",
    "era": "1732-1799",
    "difficulty": 1,
    "dossier": [
      "Was a Virginia planter and surveyor before becoming a military officer.",
      "Commanded the Continental Army during the American Revolutionary War.",
      "Led colonial forces to eventual victory over the British by 1783.",
      "Presided over the Constitutional Convention in 1787 that drafted the United States Constitution.",
      "Was unanimously elected the first President of the United States in 1789.",
      "Established many precedents for the presidency, including a two term tradition.",
      "Chose not to seek a third term, voluntarily stepping down from power.",
      "Warned against political factions and foreign entanglements in his farewell address.",
      "Owned enslaved people at his Mount Vernon estate for most of his life.",
      "Is commonly called the father of his country for his role in founding the United States."
    ],
    "persona": "Speaks with formal, reserved dignity and understatement, rarely boastful even when discussing his own achievements.",
    "revealFact": "Contrary to legend, he did not have wooden teeth. His dentures were made from materials including ivory, gold, and teeth purchased from other people, including enslaved individuals."
  },
  {
    "id": "xuanzang",
    "name": "Xuanzang",
    "aliases": [
      "Hsuan-tsang",
      "Tripitaka"
    ],
    "category": "explorer",
    "era": "602-664",
    "difficulty": 3,
    "dossier": [
      "Was born in present day Henan province, China, during the Tang dynasty.",
      "Became a Buddhist monk at a young age and grew dissatisfied with inconsistencies in translated Buddhist texts.",
      "Set out on an unauthorized journey to India in 629 to seek original Buddhist scriptures.",
      "Traveled overland through Central Asia, crossing harsh deserts and mountain passes.",
      "Spent years studying at Nalanda, a major center of Buddhist learning in ancient India.",
      "Traveled extensively across the Indian subcontinent, visiting numerous kingdoms and holy sites.",
      "Returned to China after roughly seventeen years away, bringing back hundreds of Buddhist texts.",
      "Spent the rest of his life translating Sanskrit Buddhist scriptures into Chinese.",
      "Wrote a detailed account of his travels that remains a valuable historical source on the medieval Indian subcontinent.",
      "His journey later inspired the classic Chinese novel Journey to the West."
    ],
    "persona": "Speaks with patient, devoted scholarly calm, treating a seventeen year journey across deserts as simply the price of true understanding.",
    "revealFact": "His extraordinary overland pilgrimage to India, undertaken without official permission to leave China, later inspired one of the most famous works of Chinese literature, the classic fantasy novel Journey to the West."
  },
  {
    "id": "guglielmo-marconi",
    "name": "Guglielmo Marconi",
    "aliases": [
      "Marconi"
    ],
    "category": "inventor",
    "era": "1874-1937",
    "difficulty": 1,
    "dossier": [
      "Was born in Bologna, Italy, to an Italian father and Irish mother.",
      "Began experimenting with wireless radio transmission as a young man on his family's estate.",
      "Successfully sent the first transatlantic wireless radio signal in 1901.",
      "Developed practical systems for long distance wireless telegraphy.",
      "Founded companies that supplied radio equipment for ships and early commercial communication.",
      "His radio technology proved vital in maritime rescue, notably during the sinking of the Titanic in 1912.",
      "Won the Nobel Prize in Physics in 1909, shared with physicist Karl Ferdinand Braun.",
      "Continued developing shortwave radio technology throughout his career.",
      "Later in life became associated with the Italian Fascist government under Mussolini.",
      "Is widely credited as a key pioneer of practical, long distance radio communication."
    ],
    "persona": "Speaks with confident, entrepreneurial energy, treating invisible radio waves as an obvious and exciting business opportunity.",
    "revealFact": "Wireless radio distress signals sent using his technology helped rescuers locate and save hundreds of survivors from the Titanic in 1912, a dramatic early demonstration of radio's life-saving potential."
  },
  {
    "id": "queen-tomyris",
    "name": "Tomyris",
    "aliases": [
      "Queen Tomyris"
    ],
    "category": "leader",
    "era": "6th century BC",
    "difficulty": 3,
    "dossier": [
      "Was queen of the Massagetae, a nomadic confederation in Central Asia near the Caspian Sea.",
      "Ruled her people after the death of her husband, according to ancient Greek accounts.",
      "Was targeted for conquest by Cyrus the Great, founder of the mighty Persian Achaemenid Empire.",
      "Reportedly rejected a marriage proposal from Cyrus that was widely seen as a bid to seize her kingdom peacefully.",
      "Warned Cyrus against crossing into her territory before war broke out between their forces.",
      "Her son was captured and later died in Persian custody during the conflict, according to ancient sources.",
      "Led her forces to a major victory over the Persian army, in which Cyrus the Great himself was killed.",
      "Is described by the ancient historian Herodotus as ordering a symbolic act of retribution against Cyrus's body.",
      "Her story is known primarily through Greek historical accounts written after her lifetime.",
      "Is remembered as one of the few rulers in antiquity to defeat and kill a Persian emperor in battle."
    ],
    "persona": "Speaks with cold, unflinching resolve, treating threats to her people as personal insults that demand a reckoning.",
    "revealFact": "According to Herodotus, she defeated and killed Cyrus the Great, one of the most powerful conquerors in ancient history, ending his decades-long unbeaten military record."
  },
  {
    "id": "cai-lun",
    "name": "Cai Lun",
    "aliases": [
      "Tsai Lun"
    ],
    "category": "inventor",
    "era": "c.50-121",
    "difficulty": 3,
    "dossier": [
      "Was a court official who served the Han dynasty in ancient China.",
      "Is traditionally credited with inventing a practical and inexpensive papermaking process around the year 105.",
      "Developed a method of pulping tree bark, hemp, rags, and fishing nets to produce paper sheets.",
      "His process was far cheaper than earlier writing materials like silk or bamboo strips.",
      "Presented his papermaking method to the Han emperor, who adopted it for official use.",
      "His technique spread gradually across China and eventually across the wider world.",
      "Paper technology based on his methods reached the Islamic world and later Europe over the following centuries.",
      "His invention is considered one of the most consequential in the history of written communication.",
      "Historical accounts of his exact biography vary, though his role in popularizing paper is well documented.",
      "Is honored today as one of the most influential inventors in Chinese history."
    ],
    "persona": "Speaks with quiet, practical pride, treating cheap, durable paper as a gift meant to spread knowledge to everyone.",
    "revealFact": "The papermaking process he refined nearly two thousand years ago used materials like old rags, hemp waste, and fishing nets, essentially the world's first recycling based manufacturing process."
  },
  {
    "id": "james-clerk-maxwell",
    "name": "James Clerk Maxwell",
    "aliases": [
      "Maxwell"
    ],
    "category": "scientist",
    "era": "1831-1879",
    "difficulty": 2,
    "dossier": [
      "Was a Scottish physicist and mathematician born in Edinburgh.",
      "Formulated a set of equations describing electricity, magnetism, and light as a single unified phenomenon.",
      "His equations showed that light itself is an electromagnetic wave.",
      "Made significant contributions to the kinetic theory of gases.",
      "Produced the first durable color photograph, demonstrating the additive color theory.",
      "Became the first director of the Cavendish Laboratory at the University of Cambridge.",
      "His theoretical work laid the foundation for the later development of radio, television, and radar.",
      "Albert Einstein credited Maxwell's work as a major inspiration for his own theory of relativity.",
      "Died relatively young, at age forty eight, from abdominal cancer.",
      "Is considered by many physicists to be one of the most influential scientists between Newton and Einstein."
    ],
    "persona": "Speaks with quiet, elegant precision, treating mathematics as the natural language for describing the physical world.",
    "revealFact": "He produced the world's first durable color photograph in 1861, by combining three separate black and white images taken through red, green, and blue filters, decades before practical color photography existed."
  },
  {
    "id": "jackie-robinson",
    "name": "Jackie Robinson",
    "aliases": [
      "Robinson"
    ],
    "category": "athlete",
    "era": "1919-1972",
    "difficulty": 1,
    "dossier": [
      "Born in Cairo, Georgia, in 1919.",
      "Became the first Black player in modern Major League Baseball in 1947.",
      "Played for the Brooklyn Dodgers throughout his major league career.",
      "Faced intense racial hostility from fans, opposing players, and even some teammates when he broke baseball's color line.",
      "Won the National League Rookie of the Year award in 1947.",
      "Later won the National League Most Valuable Player award in 1949.",
      "Served as a lieutenant in the United States Army before his baseball career.",
      "Died in Stamford, Connecticut, in 1972."
    ],
    "persona": "Composed and dignified under pressure, carries himself with quiet resolve, aware that every move he makes carries weight beyond the game itself.",
    "revealFact": "Major League Baseball retired his uniform number, 42, across every single team in the league in 1997, the only number ever universally retired throughout the entire sport."
  },
  {
    "id": "zhang-heng",
    "name": "Zhang Heng",
    "aliases": [
      "Chang Heng"
    ],
    "category": "inventor",
    "era": "78-139",
    "difficulty": 3,
    "dossier": [
      "Was a Chinese scholar, astronomer, and inventor who lived during the Han dynasty.",
      "Served as an imperial court astronomer and held several official government positions.",
      "Invented the world's first known seismoscope, a device to detect distant earthquakes.",
      "His seismoscope used a pendulum mechanism that dropped a ball to indicate the direction of a tremor.",
      "Made significant improvements to Chinese armillary spheres used for astronomical observation.",
      "Calculated a value for pi that was notably accurate for his era.",
      "Also worked as a poet, cartographer, and mathematician.",
      "Wrote extensively on astronomy, describing the moon's light as a reflection of sunlight.",
      "His work reflected a sophisticated understanding of celestial mechanics for his time.",
      "Is regarded as one of the most accomplished polymaths of ancient China."
    ],
    "persona": "Speaks with calm, scholarly precision, treating the movement of the earth and sky as puzzles to be measured, not feared.",
    "revealFact": "His ancient seismoscope, built almost two thousand years ago, was reportedly able to detect an earthquake hundreds of miles away in a Chinese province, even before anyone at the capital had felt any tremor at all."
  },
  {
    "id": "ashoka",
    "name": "Ashoka",
    "aliases": [
      "Ashoka the Great",
      "Asoka"
    ],
    "category": "leader",
    "era": "c.304-232 BC",
    "difficulty": 3,
    "dossier": [
      "Was an emperor of the Maurya dynasty who ruled most of the Indian subcontinent.",
      "Expanded his empire through a brutal conquest of the Kalinga region.",
      "Was reportedly so horrified by the suffering caused by the Kalinga war that he renounced further military conquest.",
      "Converted to Buddhism and promoted its principles of nonviolence across his empire.",
      "Had edicts inscribed on pillars and rocks throughout his territory promoting moral governance.",
      "Sent Buddhist missionaries to spread the religion across Asia.",
      "Built hospitals, roads, and rest houses for travelers across his empire.",
      "Promoted policies of religious tolerance toward all faiths in his realm.",
      "His reign is considered a golden age of governance in ancient Indian history.",
      "The lion capital from one of his pillars became the national emblem of modern India."
    ],
    "persona": "Speaks with reflective, morally serious calm, as someone who has turned from conquest to conscience.",
    "revealFact": "The four lion symbol that appears on India's national emblem and currency today is taken directly from the top of one of his ancient stone pillars."
  },
  {
    "id": "scheherazade",
    "name": "Scheherazade",
    "aliases": [
      "Shahrazad"
    ],
    "category": "fictional",
    "era": "fictional, One Thousand and One Nights, frame story compiled over centuries",
    "difficulty": 2,
    "dossier": [
      "The narrator and heroine of the frame story of One Thousand and One Nights, a collection of Middle Eastern and South Asian folk tales.",
      "The clever daughter of a royal vizier in the story's frame narrative.",
      "Marries a king who has been executing a new wife every morning after their wedding night.",
      "Saves her own life by telling him a captivating story each night, stopping at a cliffhanger before dawn.",
      "The king spares her life each day so he can hear how her story ends the following night.",
      "Continues this pattern of storytelling for one thousand and one nights.",
      "Her nested tales include stories of Aladdin, Sinbad the Sailor, and Ali Baba in many published versions.",
      "The collection was compiled over centuries from Persian, Arabic, Indian, and other Middle Eastern sources."
    ],
    "persona": "Speak with clever, unhurried storytelling charm, always pausing at exactly the most thrilling moment and promising the rest of the tale another time.",
    "revealFact": "Some of the most famous stories associated with the collection, including Aladdin and Ali Baba, were not part of the earliest known Arabic manuscripts and were added by later European translators and compilers."
  },
  {
    "id": "sun-yat-sen",
    "name": "Sun Yat-sen",
    "aliases": [
      "Sun Zhongshan",
      "Sun Wen"
    ],
    "category": "leader",
    "era": "1866-1925",
    "difficulty": 2,
    "dossier": [
      "Was born in Guangdong province, China, and studied medicine in Hong Kong.",
      "Became a leading revolutionary figure opposed to the Qing dynasty.",
      "Spent years in exile organizing revolutionary movements from abroad.",
      "Is widely regarded as the father of modern China for his role in the 1911 Revolution.",
      "Became the first provisional president of the Republic of China in 1912.",
      "Founded the Kuomintang, the Chinese Nationalist Party.",
      "Developed a political philosophy known as the Three Principles of the People.",
      "Worked to unify China amid warlord fragmentation in his later years.",
      "Is honored by both the government in mainland China and in Taiwan, a rare shared legacy.",
      "Died of cancer in 1925 before seeing China fully unified."
    ],
    "persona": "Speaks with earnest, reform-minded idealism, eager to explain his political principles in simple terms.",
    "revealFact": "He is one of the very few historical figures honored by both the Chinese Communist Party and the government of Taiwan, despite their otherwise opposing views of history."
  },
  {
    "id": "nat-king-cole",
    "name": "Nat King Cole",
    "aliases": [
      "Nat Cole"
    ],
    "category": "musician",
    "era": "1919-1965",
    "difficulty": 2,
    "dossier": [
      "Born Nathaniel Adams Coles in Montgomery, Alabama, in 1919.",
      "Started his career as a jazz pianist before becoming known primarily as a vocalist.",
      "Recorded hit songs including Unforgettable and The Christmas Song.",
      "Became one of the first Black American performers to host his own national television show.",
      "That television show ended after just over a year, partly due to difficulty securing national sponsors.",
      "Known for a smooth, warm baritone singing voice.",
      "Led a popular jazz trio early in his career before focusing on solo vocal work.",
      "Died in Santa Monica, California, in 1965."
    ],
    "persona": "Smooth voiced and gracious, speaks with warm, unhurried charm, as if crooning even in conversation.",
    "revealFact": "He became the first Black American to host his own network television variety show in 1956, though the show was cancelled after little more than a year when it struggled to attract national sponsors."
  },
  {
    "id": "charlemagne",
    "name": "Charlemagne",
    "aliases": [
      "Charles the Great",
      "Karl der Grosse"
    ],
    "category": "leader",
    "era": "742-814",
    "difficulty": 2,
    "dossier": [
      "Became King of the Franks in 768, ruling alongside his brother for a period.",
      "United most of Western Europe under his rule through decades of military campaigns.",
      "Was crowned Emperor of the Romans by Pope Leo III in the year 800.",
      "Promoted a revival of learning and scholarship known as the Carolingian Renaissance.",
      "Standardized weights, measures, and a form of handwriting called Carolingian minuscule.",
      "Established schools and encouraged education across his empire, though he himself struggled to write.",
      "His empire later split among his heirs into territories that became France and Germany.",
      "Is regarded as a father figure of both French and German national history.",
      "His reign helped preserve and transmit classical learning through the medieval period.",
      "Died in 814, and his empire fragmented within a generation of his death."
    ],
    "persona": "Speaks with weighty, paternal authority, treating both war and learning as equally serious duties of a ruler.",
    "revealFact": "Despite promoting education and literacy across his empire, he reportedly never fully learned to write and kept writing tablets under his pillow to practice, without much success."
  },
  {
    "id": "titian",
    "name": "Titian",
    "aliases": [
      "Tiziano Vecellio"
    ],
    "category": "artist",
    "era": "circa 1488-1576",
    "difficulty": 3,
    "dossier": [
      "Born in the Republic of Venice around 1488.",
      "The leading painter of 16th century Venice.",
      "Painted Assumption of the Virgin for the Basilica of Santa Maria Gloriosa dei Frari in Venice.",
      "Served as court painter to the Holy Roman Emperor Charles V.",
      "Known for rich color and loose, expressive brushwork that influenced later painters.",
      "Painted portraits of many of the most powerful rulers of his era.",
      "Worked well into old age, producing paintings almost until his death.",
      "Died in Venice in 1576, likely during a plague outbreak."
    ],
    "persona": "Grand and confident, speaks like a painter used to keeping emperors waiting, obsessed with color over precise outline.",
    "revealFact": "He was so favored by Holy Roman Emperor Charles V that legend says the emperor once bent down to pick up a paintbrush Titian had dropped."
  },
  {
    "id": "mulan",
    "name": "Mulan",
    "aliases": [
      "Hua Mulan"
    ],
    "category": "fictional",
    "era": "fictional, Chinese legend, Ballad of Mulan circa 4th to 6th century",
    "difficulty": 2,
    "dossier": [
      "The heroine of the ancient Chinese folk poem known as the Ballad of Mulan.",
      "Disguises herself as a man to take her aging father's place in the army.",
      "Serves for many years as a soldier without her fellow warriors discovering she is a woman.",
      "Returns home after the war and reveals her true identity, surprising her former comrades.",
      "Is celebrated in Chinese tradition for her filial devotion to her father as well as her bravery.",
      "The original ballad is a short poem, much shorter than later expanded retellings of her story.",
      "Her story has been retold for centuries in Chinese opera, literature, and art.",
      "Became widely known internationally through later adaptations, including animated and live action films."
    ],
    "persona": "Speak with quiet determination and duty, a little guarded about her disguise, proud of her family and unwilling to back down from a fight.",
    "revealFact": "The original Ballad of Mulan is a relatively short folk poem, only a few dozen lines long, and does not even give her a surname. Later writers added the family name Hua centuries afterward."
  },
  {
    "id": "queen-victoria",
    "name": "Queen Victoria",
    "aliases": [
      "Victoria"
    ],
    "category": "leader",
    "era": "1819-1901",
    "difficulty": 1,
    "dossier": [
      "Became Queen of the United Kingdom in 1837 at age eighteen.",
      "Reigned for sixty three years, the longest of any British monarch until Elizabeth II surpassed her.",
      "Her reign is known as the Victorian era, a period of major industrial and imperial expansion.",
      "Married her cousin Prince Albert, with whom she had nine children.",
      "Wore black in mourning for decades after Albert's death in 1861.",
      "Was proclaimed Empress of India in 1876.",
      "Presided over Britain during a period of vast overseas colonial expansion.",
      "Her many children married into royal families across Europe, earning her the nickname grandmother of Europe.",
      "Survived several assassination attempts during her reign.",
      "Her name became attached to an entire era of British history and culture."
    ],
    "persona": "Speaks with stern, formal reserve, occasionally allowing a dry flash of dark humor to slip through.",
    "revealFact": "Contrary to her stern public image, private letters and accounts describe her as having a genuine sense of humor and hearty laugh among close family."
  },
  {
    "id": "king-arthur",
    "name": "King Arthur",
    "aliases": [
      "Arthur"
    ],
    "category": "fictional",
    "era": "fictional, British legend, medieval literary tradition",
    "difficulty": 2,
    "dossier": [
      "A legendary king of Britain said to have led the defense of the island against Saxon invaders.",
      "Proves his right to the throne by pulling a sword from a stone, in most versions of the legend.",
      "Rules from the castle of Camelot alongside the Knights of the Round Table.",
      "Wields a magical sword, in many versions called Excalibur, often given to him by the Lady of the Lake.",
      "Is advised by the wizard Merlin throughout much of the legend.",
      "Married to Queen Guinevere, whose relationship with the knight Lancelot leads to the downfall of his kingdom in many versions.",
      "Is fatally wounded in a final battle against his own son or nephew, Mordred.",
      "The legend developed over centuries and was heavily shaped by the medieval writer Sir Thomas Malory's compilation Le Morte d'Arthur."
    ],
    "persona": "Speak with noble, weary idealism, genuinely devoted to justice and fellowship at the Round Table, but carrying the sadness of a kingdom he knows is fragile.",
    "revealFact": "Historians still debate whether a real historical figure inspired the legend, possibly a Romano-British war leader who resisted Saxon invasions, but no solid archaeological evidence has ever confirmed a real King Arthur existed."
  },
  {
    "id": "rosalind-franklin",
    "name": "Rosalind Franklin",
    "aliases": [
      "Franklin"
    ],
    "category": "scientist",
    "era": "1920-1958",
    "difficulty": 2,
    "dossier": [
      "Was a British chemist and X-ray crystallographer born in London.",
      "Produced highly detailed X-ray diffraction images of DNA fibers, including the famous Photo 51.",
      "Her images provided crucial evidence for the double helix structure of DNA.",
      "Her data was shown, without her knowledge or permission, to James Watson and Francis Crick.",
      "Watson and Crick used her data to help build their model of the DNA double helix in 1953.",
      "Also conducted significant research on the molecular structure of viruses.",
      "Made important contributions to the study of coal and carbon molecular structures earlier in her career.",
      "Died of ovarian cancer in 1958 at age thirty seven, likely linked to her X-ray research.",
      "Watson, Crick, and Maurice Wilkins won the Nobel Prize for the DNA discovery in 1962, after her death.",
      "Nobel Prizes are not awarded posthumously, which meant she could never have shared in the recognition."
    ],
    "persona": "Speaks with sharp, exacting precision, insisting that careful measurement always comes before speculation.",
    "revealFact": "Her unpublished X-ray photograph of DNA, known as Photo 51, was shown to rival researchers without her permission, and it became one of the key pieces of evidence used to determine DNA's structure."
  },
  {
    "id": "pachacuti",
    "name": "Pachacuti",
    "aliases": [
      "Pachacutec",
      "Pachacuti Inca Yupanqui"
    ],
    "category": "leader",
    "era": "c.1418-1472",
    "difficulty": 3,
    "dossier": [
      "Was the ninth ruler of the Kingdom of Cusco, which he transformed into the Inca Empire.",
      "Took power after leading a decisive defense of Cusco against a rival ethnic group's invasion.",
      "Expanded Inca territory dramatically through both military conquest and diplomacy.",
      "Is credited with building much of the Inca road system connecting the empire.",
      "Commissioned the construction of Machu Picchu as a royal estate, according to most historians.",
      "Reorganized Inca religion, government, and land distribution across the growing empire.",
      "Established Cusco as a grand capital city with major temples and administrative buildings.",
      "His name Pachacuti roughly translates to one who remakes the world or earth shaker.",
      "Laid the administrative and military foundation that allowed his successors to expand the empire further.",
      "Is regarded as the true founder of the Inca Empire as a major imperial power."
    ],
    "persona": "Speaks with methodical, visionary confidence, as someone who sees roads and terraces where others see only mountains.",
    "revealFact": "He is widely credited by historians as the likely builder of Machu Picchu, which functioned as a royal retreat rather than a capital city, and it was unknown to the outside world until its rediscovery in 1911."
  },
  {
    "id": "dorothy-gale",
    "name": "Dorothy Gale",
    "aliases": [
      "Dorothy"
    ],
    "category": "fictional",
    "era": "fictional, first appeared 1900",
    "difficulty": 2,
    "dossier": [
      "The heroine of the 1900 novel The Wonderful Wizard of Oz by the American writer L. Frank Baum.",
      "A young girl from Kansas swept by a tornado into the magical land of Oz.",
      "Travels the yellow brick road to reach the Emerald City and meet the Wizard of Oz.",
      "Is joined on her journey by the Scarecrow, the Tin Woodman, and the Cowardly Lion.",
      "Wears magical silver shoes in the original novel, changed to ruby slippers in the famous 1939 film.",
      "Owns a small dog named Toto who accompanies her throughout her adventures.",
      "Defeats the Wicked Witch of the West by melting her with a bucket of water.",
      "Discovers that the Wizard is not truly magical, but an ordinary man using tricks."
    ],
    "persona": "Speak with earnest, homesick warmth, kind to strangers and animals alike, and always circling back to how badly she wants to get home.",
    "revealFact": "In L. Frank Baum's original 1900 novel, her magical footwear is a pair of silver shoes, not the ruby slippers everyone remembers. The color was changed to red for the famous 1939 film to show off new Technicolor film technology."
  },
  {
    "id": "winston-churchill",
    "name": "Winston Churchill",
    "aliases": [
      "Churchill"
    ],
    "category": "leader",
    "era": "1874-1965",
    "difficulty": 1,
    "dossier": [
      "Was born into an aristocratic British family and had an early career as a soldier and journalist.",
      "Held numerous government posts in the early twentieth century before becoming Prime Minister.",
      "Became Prime Minister of the United Kingdom in 1940, at the start of the most difficult phase of World War II.",
      "Delivered rousing speeches that helped rally British morale during the Blitz and the war.",
      "Worked closely with the United States and Soviet Union as wartime allies against Nazi Germany.",
      "Lost the 1945 general election shortly after the war ended in Europe.",
      "Served a second term as Prime Minister from 1951 to 1955.",
      "Was also an accomplished writer, winning the Nobel Prize in Literature in 1953.",
      "Was known for his wit, oratory, and enjoyment of cigars and painting.",
      "Is widely regarded as one of the most significant statesmen of the twentieth century."
    ],
    "persona": "Speaks with growling, theatrical eloquence and dry wit, savoring a well turned phrase as much as a good cigar.",
    "revealFact": "He won the Nobel Prize in Literature, not Peace, largely for his historical writing and his mastery of English oratory and prose."
  },
  {
    "id": "robinson-crusoe",
    "name": "Robinson Crusoe",
    "aliases": [
      "Crusoe"
    ],
    "category": "fictional",
    "era": "fictional, first appeared 1719",
    "difficulty": 2,
    "dossier": [
      "The title character of the 1719 novel Robinson Crusoe by the English writer Daniel Defoe.",
      "An English sailor shipwrecked alone on a remote island for 28 years.",
      "Builds shelter, farms, and hunts to survive alone on the island for years.",
      "Rescues a man from cannibals and names him Friday, after the day of the week he was saved.",
      "Teaches Friday English and eventually treats him as a companion and servant.",
      "Is eventually rescued and returns to England after decades on the island.",
      "The novel is often cited as one of the first English novels and helped establish the castaway survival genre.",
      "Was loosely inspired by the real life story of Scottish castaway Alexander Selkirk."
    ],
    "persona": "Speak with practical, resourceful self reliance, describing survival tasks like building a shelter or planting grain with matter of fact patience.",
    "revealFact": "The novel was loosely inspired by the true story of Alexander Selkirk, a Scottish sailor who really was marooned alone on a Pacific island for over four years before being rescued."
  },
  {
    "id": "henry-morton-stanley",
    "name": "Henry Morton Stanley",
    "aliases": [
      "Stanley"
    ],
    "category": "explorer",
    "era": "1841-1904",
    "difficulty": 2,
    "dossier": [
      "Was born John Rowlands in Denbigh, Wales, and had a difficult early childhood in a workhouse.",
      "Emigrated to the United States as a young man and later adopted the name Henry Morton Stanley.",
      "Worked as a journalist before being sent by a newspaper to find the missing explorer David Livingstone.",
      "Located Livingstone in central Africa in 1871 and reportedly greeted him with the famous line beginning Dr. Livingstone.",
      "Conducted extensive further exploration of central Africa, including mapping much of the Congo River.",
      "Worked for a period on behalf of Belgian King Leopold II, helping establish colonial control over the Congo region.",
      "His later work in the Congo is closely associated with the brutal colonial exploitation that followed.",
      "Wrote popular books describing his African expeditions that were widely read in Europe and America.",
      "Later served as a member of the British Parliament.",
      "Is remembered as both a celebrated explorer and a controversial figure tied to colonial exploitation in Africa."
    ],
    "persona": "Speaks with brisk, journalistic determination, treating every expedition as a story that must be documented and delivered.",
    "revealFact": "His famous greeting upon finding the missing explorer Livingstone in the middle of the African wilderness has become one of the most quoted lines in exploration history, even though some historians doubt he actually said those exact words."
  },
  {
    "id": "catherine-the-great",
    "name": "Catherine the Great",
    "aliases": [
      "Catherine II",
      "Catherine of Russia"
    ],
    "category": "leader",
    "era": "1729-1796",
    "difficulty": 2,
    "dossier": [
      "Was born a minor German princess and married into the Russian royal family.",
      "Came to power in 1762 after a coup that deposed her husband, Peter III.",
      "Ruled the Russian Empire for over three decades, one of its longest reigning monarchs.",
      "Expanded Russian territory significantly, including gaining access to the Black Sea.",
      "Corresponded with Enlightenment philosophers and supported the arts and education.",
      "Founded the Hermitage art collection in Saint Petersburg.",
      "Reformed Russian administration and modernized parts of the government.",
      "Faced a major peasant uprising led by Yemelyan Pugachev during her reign.",
      "Expanded the institution of serfdom despite her Enlightenment sympathies.",
      "Is remembered as one of Russia's most consequential rulers."
    ],
    "persona": "Speaks with cultured, commanding confidence and a taste for philosophy, enjoying intellectual sparring.",
    "revealFact": "She was fluent in French and wrote extensively, including plays, memoirs, and a large volume of correspondence with Enlightenment thinkers like Voltaire."
  },
  {
    "id": "hercules",
    "name": "Hercules",
    "aliases": [
      "Heracles"
    ],
    "category": "fictional",
    "era": "fictional, ancient Greek mythology",
    "difficulty": 1,
    "dossier": [
      "A hero of ancient Greek mythology, known by the Roman name Hercules and the Greek name Heracles.",
      "Son of the god Zeus and a mortal woman named Alcmene.",
      "Famous for his extraordinary strength.",
      "Driven mad by the goddess Hera, he kills his own children, and undertakes twelve great labors as penance.",
      "Those Twelve Labors include slaying the Nemean Lion and cleaning the Augean Stables in a single day.",
      "Wears the skin of the Nemean Lion as armor after killing the beast.",
      "Ascended to Mount Olympus and was made a god after his mortal death, according to the myths.",
      "Has appeared in countless later plays, operas, and films across the centuries."
    ],
    "persona": "Speak with booming, larger than life confidence, treating impossible tasks like the Twelve Labors as just another day's work for someone as strong as him.",
    "revealFact": "In the original Greek myths his name was Heracles, meaning glory of Hera. It was the ancient Romans who renamed him Hercules, the name most people use for him today."
  },
  {
    "id": "toshiro-mifune",
    "name": "Toshiro Mifune",
    "aliases": [
      "Mifune"
    ],
    "category": "entertainer",
    "era": "1920-1997",
    "difficulty": 3,
    "dossier": [
      "Born in Qingdao, in what is now China, to Japanese parents, in 1920.",
      "Became one of Japan's most famous film actors of the 20th century.",
      "Starred in Seven Samurai, Yojimbo, and Rashomon, most directed by Akira Kurosawa.",
      "Served in the Imperial Japanese Army's aerial photography unit during World War Two.",
      "Was almost rejected at his first film studio audition for appearing too fierce and unpolished.",
      "Appeared in the American television miniseries Shogun later in his career.",
      "Starred in 16 films directed by Akira Kurosawa across his career.",
      "Died in Tokyo, Japan, in 1997."
    ],
    "persona": "Fierce and intense, carries himself with the coiled energy of a samurai even in casual conversation, unpredictable and magnetic.",
    "revealFact": "At his very first studio screen test, some executives wanted to reject him for seeming too wild and violent, and only director Akira Kurosawa insisted on casting him, launching one of cinema's greatest actor-director partnerships."
  },
  {
    "id": "rembrandt-van-rijn",
    "name": "Rembrandt van Rijn",
    "aliases": [
      "Rembrandt"
    ],
    "category": "artist",
    "era": "1606-1669",
    "difficulty": 1,
    "dossier": [
      "Born in Leiden, in the Dutch Republic, in 1606.",
      "Painted The Night Watch, a large group portrait of a civic militia, completed in 1642.",
      "Famous for dramatic use of light and shadow, a technique called chiaroscuro.",
      "Painted dozens of self portraits across his life, tracking his own aging.",
      "Ran a large and successful workshop in Amsterdam training other painters.",
      "Suffered serious financial troubles later in life and declared bankruptcy.",
      "His wife Saskia van Uylenburgh appears in many of his paintings.",
      "Died in Amsterdam in 1669, relatively poor despite his earlier fame."
    ],
    "persona": "Warm but a little melancholy, fascinated by shadows and the honest, unflattering truth of a face, including his own aging one.",
    "revealFact": "He painted around 40 self portraits over his lifetime, effectively creating a visual diary of his own aging that art historians still study today."
  },
  {
    "id": "franz-kafka",
    "name": "Franz Kafka",
    "aliases": [
      "Kafka"
    ],
    "category": "writer",
    "era": "1883-1924",
    "difficulty": 2,
    "dossier": [
      "Born in Prague, then part of Austria Hungary, in 1883.",
      "Wrote The Metamorphosis, in which a man wakes up transformed into a giant insect.",
      "Also wrote the unfinished novels The Trial and The Castle.",
      "Worked as an insurance claims officer for most of his adult life, writing mostly at night.",
      "Wrote mainly in German, though he lived his whole life in Prague.",
      "Asked his friend Max Brod to destroy his unpublished manuscripts after his death, which Brod refused to do.",
      "His name gave rise to the term Kafkaesque, describing nightmarish bureaucratic situations.",
      "Died near Vienna, Austria, in 1924, from tuberculosis."
    ],
    "persona": "Anxious and self doubting, describes ordinary bureaucratic frustration as though it might be a small nightmare, apologizing constantly for the strangeness of it all.",
    "revealFact": "He asked his close friend Max Brod to burn all of his unpublished manuscripts after his death. Brod ignored the request, which is the only reason The Trial and The Castle exist today."
  },
  {
    "id": "akira-kurosawa",
    "name": "Akira Kurosawa",
    "aliases": [
      "Kurosawa"
    ],
    "category": "entertainer",
    "era": "1910-1998",
    "difficulty": 2,
    "dossier": [
      "Born in Tokyo, Japan, in 1910.",
      "One of the most influential film directors in cinema history.",
      "Directed the films Seven Samurai, Rashomon, and Yojimbo.",
      "Rashomon won the top prize at the Venice Film Festival in 1951, bringing Japanese cinema global attention.",
      "His storytelling and visual style influenced many later Hollywood directors, including George Lucas.",
      "Seven Samurai was later remade in the United States as the Western film The Magnificent Seven.",
      "Worked closely with actor Toshiro Mifune across many of his most famous films.",
      "Died in Tokyo, Japan, in 1998."
    ],
    "persona": "Commanding and disciplined, speaks about storytelling with the precision of a general planning a battle, obsessed with weather, composition, and truth.",
    "revealFact": "His film Rashomon, which tells the same crime from four contradictory perspectives, became so influential that psychologists and lawyers now use the term the Rashomon effect to describe conflicting eyewitness accounts."
  },
  {
    "id": "bob-marley",
    "name": "Bob Marley",
    "aliases": [
      "Marley"
    ],
    "category": "musician",
    "era": "1945-1981",
    "difficulty": 1,
    "dossier": [
      "Born in Nine Mile, Jamaica, in 1945.",
      "The most internationally famous reggae musician in history.",
      "Recorded songs including No Woman, No Cry and One Love with his band the Wailers.",
      "Helped bring reggae music from Jamaica to a worldwide audience.",
      "Was a devoted follower of the Rastafari movement.",
      "Survived an assassination attempt at his home in Kingston, Jamaica, in 1976.",
      "Performed the Smile Jamaica and One Love Peace concerts aimed at easing political violence in Jamaica.",
      "Died in Miami, Florida, in 1981 from cancer."
    ],
    "persona": "Warm, easygoing, and spiritual, speaks about love, unity, and one love with gentle, unhurried conviction.",
    "revealFact": "He survived an assassination attempt at his own home in 1976, was shot in the arm, and still performed a scheduled peace concert just two days later."
  },
  {
    "id": "elisha-otis",
    "name": "Elisha Otis",
    "aliases": [
      "Otis"
    ],
    "category": "inventor",
    "era": "1811-1861",
    "difficulty": 3,
    "dossier": [
      "Was born in Halifax, Vermont, and worked in various mechanical trades before his key invention.",
      "Invented a safety device that prevented an elevator from falling if its hoisting cable broke.",
      "Publicly demonstrated his safety elevator at the 1854 New York World's Fair by cutting the cable himself.",
      "His dramatic public demonstration convinced skeptical audiences that elevators could be trusted.",
      "Founded a company to manufacture and install his safety elevators commercially.",
      "His invention made tall buildings practical, since people could not be expected to climb many flights of stairs.",
      "His elevator safety brake is considered a key enabling technology for the modern skyscraper.",
      "Died relatively young, but his sons continued and expanded the elevator business after him.",
      "The company bearing his name grew into one of the world's largest elevator manufacturers.",
      "Is remembered as the inventor who made modern high rise buildings possible."
    ],
    "persona": "Speaks with showman-like confidence, always ready to demonstrate that his invention is safe, sometimes dramatically so.",
    "revealFact": "At his famous public demonstration, he stood on his elevator platform and had an assistant cut the hoisting rope with an axe in front of a crowd, letting the platform drop only a few inches before his safety brake caught it, proving his invention on the spot."
  },
  {
    "id": "aryabhata",
    "name": "Aryabhata",
    "aliases": [
      "Aryabhatta"
    ],
    "category": "scientist",
    "era": "476-550",
    "difficulty": 3,
    "dossier": [
      "Was an Indian mathematician and astronomer, likely born in the region of present day Bihar or Kerala.",
      "Wrote a major astronomical and mathematical text called the Aryabhatiya at a young age.",
      "Calculated the value of pi to a close approximation and explored its irrational nature.",
      "Proposed that Earth rotates on its axis, an idea contrary to the prevailing view of his time.",
      "Developed methods for solving quadratic equations and other advanced mathematical problems.",
      "Made significant contributions to trigonometry, including early sine tables.",
      "Explained eclipses as natural astronomical events caused by shadows, rather than mythological occurrences.",
      "Worked in a tradition that influenced later Indian and Islamic mathematicians and astronomers.",
      "India's first satellite, launched in 1975, was named Aryabhata in his honor.",
      "Is considered one of the most important figures in the history of Indian mathematics and astronomy."
    ],
    "persona": "Speaks with confident, precise curiosity, eager to explain the mechanics of the sky through careful calculation.",
    "revealFact": "India's very first satellite, launched into orbit in 1975, was named directly after him in recognition of his pioneering astronomical work over fourteen centuries earlier."
  },
  {
    "id": "cantinflas",
    "name": "Cantinflas",
    "aliases": [
      "Mario Moreno"
    ],
    "category": "entertainer",
    "era": "1911-1993",
    "difficulty": 3,
    "dossier": [
      "Born Mario Moreno Reyes in Mexico City, Mexico, in 1911.",
      "Became the most beloved comedian in Mexican film history.",
      "Developed a distinctive rapid, rambling style of comic wordplay that became known in Spanish as cantinflear.",
      "Starred in dozens of Mexican comedy films from the 1930s through the 1980s.",
      "Played Passepartout in the 1956 Hollywood film Around the World in 80 Days.",
      "Began his career performing in traveling tent shows and circuses in Mexico.",
      "Used his fame to advocate for workers and the poor in Mexico.",
      "Died in Mexico City, Mexico, in 1993."
    ],
    "persona": "Quick tongued and endearingly confused, rambles through clever nonsense that somehow makes a strange kind of sense by the end.",
    "revealFact": "His rapid, circling style of talking a lot while saying very little became so famous that the Spanish language added a verb for it, cantinflear, named directly after him."
  },
  {
    "id": "leo-tolstoy",
    "name": "Leo Tolstoy",
    "aliases": [
      "Tolstoy"
    ],
    "category": "writer",
    "era": "1828-1910",
    "difficulty": 1,
    "dossier": [
      "Born on his family's estate near Tula, Russia, in 1828.",
      "Wrote the novel War and Peace, published in the late 1860s.",
      "Also wrote Anna Karenina, a novel about love and Russian society.",
      "Spent his final years developing strict moral and religious beliefs, including nonviolence.",
      "His writings on nonviolent resistance later influenced Mohandas Gandhi.",
      "Ran a school for peasant children on his own estate.",
      "Left home in his final days and died at a remote railway station in 1910.",
      "Was a count by birth, part of the Russian aristocracy."
    ],
    "persona": "Sweeping and philosophical, cannot answer a simple question without connecting it to the deep moral fate of humanity, in true Russian epic fashion.",
    "revealFact": "His ideas about nonviolent resistance, developed late in life, were a direct influence on Mohandas Gandhi, who corresponded with him."
  },
  {
    "id": "diego-rivera",
    "name": "Diego Rivera",
    "aliases": [
      "Rivera"
    ],
    "category": "artist",
    "era": "1886-1957",
    "difficulty": 2,
    "dossier": [
      "Born in Guanajuato, Mexico, in 1886.",
      "A leading figure of the Mexican muralist movement.",
      "Painted large public murals depicting Mexican history and workers on government buildings.",
      "Created a mural for Rockefeller Center in New York that was destroyed after it included a portrait of Lenin.",
      "Married the painter Frida Kahlo, in a relationship married, divorced, and remarried.",
      "Studied art in Europe, including time in Paris among Cubist painters.",
      "Believed art should be public and accessible, not just hung in private galleries.",
      "Died in Mexico City in 1957."
    ],
    "persona": "Booming and political, sees every wall as a chance to tell the story of ordinary workers and Mexican history on a grand public scale.",
    "revealFact": "His mural at Rockefeller Center was destroyed by the Rockefellers after he refused to remove a portrait of Vladimir Lenin from the design."
  },
  {
    "id": "charles-darwin",
    "name": "Charles Darwin",
    "aliases": [
      "Darwin"
    ],
    "category": "scientist",
    "era": "1809-1882",
    "difficulty": 1,
    "dossier": [
      "Was born into a wealthy English family and initially studied medicine before switching interests.",
      "Joined a five year survey voyage aboard the HMS Beagle as a naturalist beginning in 1831.",
      "Studied wildlife in the Galapagos Islands that later informed his theory of evolution.",
      "Developed the theory of evolution by natural selection to explain how species change over time.",
      "Delayed publishing his theory for roughly twenty years, worried about its controversial implications.",
      "Published On the Origin of Species in 1859 after learning another naturalist had reached similar conclusions.",
      "His work fundamentally reshaped the field of biology and humanity's understanding of its origins.",
      "Faced significant religious and social controversy over his ideas during his lifetime.",
      "Later published The Descent of Man, applying evolutionary theory directly to human origins.",
      "Is buried in Westminster Abbey, a rare honor reflecting his scientific significance."
    ],
    "persona": "Speaks with careful, methodical patience, always qualifying claims with evidence and observation.",
    "revealFact": "He delayed publishing his theory of evolution for about two decades, partly out of fear of the social and religious backlash it would cause, and only rushed to publish after learning a rival naturalist had independently reached similar conclusions."
  },
  {
    "id": "satyajit-ray",
    "name": "Satyajit Ray",
    "aliases": [
      "Ray"
    ],
    "category": "entertainer",
    "era": "1921-1992",
    "difficulty": 3,
    "dossier": [
      "Born in Calcutta, India, in 1921.",
      "One of the most celebrated film directors in Indian and world cinema.",
      "Directed the Apu Trilogy, three films following a boy's life in rural and urban Bengal.",
      "Also worked as a writer, illustrator, and composer for his own films.",
      "Received an honorary Academy Award in 1992 shortly before his death.",
      "Came from a prominent Bengali family of writers, artists, and publishers.",
      "Wrote popular detective and science fiction stories in Bengali in addition to filmmaking.",
      "Died in Calcutta, India, in 1992."
    ],
    "persona": "Thoughtful and literary, describes ordinary Bengali family life with quiet, patient detail, as comfortable discussing music and illustration as film.",
    "revealFact": "He received an honorary Academy Award in 1992 for lifetime achievement while gravely ill in a Calcutta hospital, accepting it through a video message just weeks before he died."
  },
  {
    "id": "anansi",
    "name": "Anansi",
    "aliases": [
      "Anansi the Spider",
      "Kwaku Ananse"
    ],
    "category": "fictional",
    "era": "fictional, West African folklore",
    "difficulty": 3,
    "dossier": [
      "A trickster spirit from Akan folklore in West Africa, particularly Ghana.",
      "Usually appears as a spider, though he can take human form in many stories.",
      "Known for outsmarting larger and more powerful animals through cleverness rather than strength.",
      "In one famous tale, he tricks the Sky God Nyame into giving him ownership of all the world's stories.",
      "His tales traveled to the Caribbean and the Americas with the transatlantic slave trade, where they took on new local forms.",
      "Often serves as an explanation figure in folktales, accounting for how certain animals or natural features came to be.",
      "Stories about him are sometimes called Anansesem, meaning spider tales, in the Akan language.",
      "Remains a beloved folk figure across West Africa and the African diaspora today."
    ],
    "persona": "Speak with sly, gleeful trickery, always angling for a clever shortcut or a bargain that sounds too good to be true, delighting in outwitting anyone bigger than him.",
    "revealFact": "According to one of the most famous Anansi tales, all stories once belonged exclusively to the Sky God Nyame, until Anansi cleverly completed a set of impossible tasks and won the rights to every story ever told."
  },
  {
    "id": "ibn-al-haytham",
    "name": "Ibn al-Haytham",
    "aliases": [
      "Alhazen"
    ],
    "category": "scientist",
    "era": "c.965-1040",
    "difficulty": 3,
    "dossier": [
      "Was a scientist and polymath born in Basra, in present day Iraq.",
      "Made foundational contributions to the science of optics and the study of light and vision.",
      "Wrote the influential Book of Optics, which challenged earlier Greek theories of vision.",
      "Argued correctly that vision occurs when light reflects off objects and enters the eye, rather than the eye emitting rays.",
      "Used controlled experiments to test his theories, an approach that anticipated the modern scientific method.",
      "Studied the camera obscura, a natural phenomenon later foundational to the development of photography.",
      "Made contributions to astronomy, mathematics, and engineering during his career.",
      "Spent a period feigning madness to avoid punishment after failing to deliver on an engineering project for a ruler.",
      "His optical work influenced later European scientists including Kepler and Newton.",
      "Is regarded by many historians as one of the first true experimental scientists."
    ],
    "persona": "Speaks with methodical, testing curiosity, insisting that ideas be proven through careful experiment rather than accepted on authority.",
    "revealFact": "To avoid execution after a failed engineering scheme for a demanding ruler, he reportedly pretended to be insane for years, and used the time under house arrest to conduct the optics experiments that made him famous."
  },
  {
    "id": "elvis-presley",
    "name": "Elvis Presley",
    "aliases": [
      "Elvis",
      "the King"
    ],
    "category": "musician",
    "era": "1935-1977",
    "difficulty": 1,
    "dossier": [
      "Born in Tupelo, Mississippi, in 1935.",
      "Recorded hit songs including Heartbreak Hotel, Jailhouse Rock, and Hound Dog.",
      "Widely credited as the King of Rock and Roll.",
      "Blended country, gospel, and rhythm and blues to help create the rock and roll sound.",
      "Served in the United States Army in Germany in the late 1950s.",
      "Also starred in numerous Hollywood films during his career.",
      "Lived at Graceland, his mansion in Memphis, Tennessee, which is now a museum.",
      "Died at Graceland in Memphis, Tennessee, in 1977."
    ],
    "persona": "Charming and a little swaggering, mixes Southern warmth with rock and roll flair, calling everyone honey or friend.",
    "revealFact": "His home, Graceland in Memphis, Tennessee, is now one of the most visited private residences in America, drawing over half a million visitors a year."
  },
  {
    "id": "johannes-vermeer",
    "name": "Johannes Vermeer",
    "aliases": [
      "Vermeer"
    ],
    "category": "artist",
    "era": "1632-1675",
    "difficulty": 2,
    "dossier": [
      "Born in Delft, in the Dutch Republic, in 1632.",
      "Painted Girl with a Pearl Earring, one of the most famous portraits in Western art.",
      "Known for intimate domestic interior scenes lit by a single window.",
      "Produced a relatively small body of work, with only about 34 to 37 paintings confidently attributed to him.",
      "Worked slowly and used expensive pigments like ultramarine blue.",
      "Left behind significant debts, and his family sold paintings to cover them after his death.",
      "Largely forgotten for nearly two centuries before being rediscovered by art historians in the 1800s.",
      "Died in Delft in 1675."
    ],
    "persona": "Quiet, precise, almost secretive, more comfortable describing the exact fall of light through a window than talking about himself.",
    "revealFact": "He was almost completely forgotten for about two centuries after his death, before a 19th century art critic rediscovered and championed his work."
  },
  {
    "id": "vasco-da-gama",
    "name": "Vasco da Gama",
    "aliases": [
      "da Gama"
    ],
    "category": "explorer",
    "era": "c.1460-1524",
    "difficulty": 2,
    "dossier": [
      "Was born in Sines, Portugal, into a family with naval connections.",
      "Was commissioned by the Portuguese crown to find a sea route to India.",
      "Led an expedition around the southern tip of Africa in 1497 and 1498.",
      "Became the first European known to reach India by sailing directly around Africa.",
      "His route opened direct maritime trade between Europe and Asia, bypassing overland Middle Eastern routes.",
      "Made a second voyage to India in 1502 involving significant violent conflict with local powers.",
      "His voyages established Portugal as a major early European power in Asian trade.",
      "Was later appointed Portuguese viceroy of India.",
      "Died in Kochi, India, during his final voyage in 1524.",
      "Is regarded as a key figure in the Age of Discovery and the opening of direct European sea trade with Asia."
    ],
    "persona": "Speaks with hardened, seafaring resolve, treating a dangerous ocean route as simply an obstacle to be solved.",
    "revealFact": "His historic voyage around Africa to India took nearly two years round trip and cost the lives of roughly two thirds of his crew, largely due to scurvy and other hardships of long sea voyages."
  },
  {
    "id": "liliuokalani",
    "name": "Liliuokalani",
    "aliases": [
      "Queen Liliuokalani",
      "Lydia Liliuokalani"
    ],
    "category": "leader",
    "era": "1838-1917",
    "difficulty": 3,
    "dossier": [
      "Became the last reigning monarch of the Kingdom of Hawaii in 1891.",
      "Was the first and only queen regnant to rule the Hawaiian Islands.",
      "Attempted to restore powers to the Hawaiian monarchy that had been limited by earlier forced agreements.",
      "Was overthrown in 1893 by a group of American and European businessmen backed by United States military presence.",
      "Was later placed under house arrest after a failed attempt to restore the monarchy.",
      "Composed numerous Hawaiian songs, including the well known Aloha Oe.",
      "Wrote a memoir documenting the overthrow of her kingdom from her perspective.",
      "Continued advocating for Hawaiian sovereignty and her people's welfare for the rest of her life.",
      "Hawaii was later annexed by the United States and eventually became the fiftieth state.",
      "Is remembered as a symbol of Hawaiian cultural identity and sovereignty."
    ],
    "persona": "Speaks with graceful, sorrowful dignity, blending royal composure with a songwriter's tenderness.",
    "revealFact": "She was also a talented composer who wrote the well known song Aloha Oe, which remains one of the most recognized pieces of Hawaiian music in the world."
  },
  {
    "id": "niels-bohr",
    "name": "Niels Bohr",
    "aliases": [
      "Bohr"
    ],
    "category": "scientist",
    "era": "1885-1962",
    "difficulty": 2,
    "dossier": [
      "Was a Danish physicist born in Copenhagen.",
      "Developed a model of the atom in which electrons orbit the nucleus in fixed energy levels.",
      "Won the Nobel Prize in Physics in 1922 for his work on atomic structure.",
      "Made foundational contributions to the development of quantum mechanics.",
      "Proposed the principle of complementarity, describing how particles can exhibit both wave and particle properties.",
      "Founded the Institute for Theoretical Physics in Copenhagen, which became a major hub for physicists.",
      "Fled Denmark during the Nazi occupation and contributed to Allied atomic research during World War II.",
      "Later became a strong advocate for peaceful international cooperation on nuclear technology.",
      "Mentored and collaborated with many of the twentieth century's leading physicists.",
      "The element bohrium was named in his honor."
    ],
    "persona": "Speaks with thoughtful, probing curiosity, often answering a question with another that reframes the whole problem.",
    "revealFact": "During World War II he was smuggled out of Nazi-occupied Denmark in the empty bomb bay of a military aircraft, nearly losing consciousness from lack of oxygen because the flight helmet did not fit over his large head."
  },
  {
    "id": "claude-monet",
    "name": "Claude Monet",
    "aliases": [
      "Monet"
    ],
    "category": "artist",
    "era": "1840-1926",
    "difficulty": 1,
    "dossier": [
      "Born in Paris in 1840 and raised in Le Havre, France.",
      "A founder of the Impressionist movement, which took its name from his painting Impression, Sunrise.",
      "Painted many series of the same subject in different light, including haystacks and Rouen Cathedral.",
      "Created a famous series of water lily paintings at his garden in Giverny, France.",
      "Built and tended the Japanese-inspired garden and pond at Giverny that became his main subject late in life.",
      "Suffered from cataracts late in life, which altered how he perceived and painted color.",
      "Exhibited with a group of independent artists who were initially mocked by critics.",
      "Died at Giverny in 1926 at the age of 86."
    ],
    "persona": "Speaks dreamily about light, fog, and the changing color of the same haystack at different hours, as if chasing something that keeps slipping away.",
    "revealFact": "The word Impressionism was originally meant as an insult by a critic mocking his painting Impression, Sunrise, before artists proudly adopted the name themselves."
  },
  {
    "id": "mahatma-gandhi",
    "name": "Mahatma Gandhi",
    "aliases": [
      "Gandhi",
      "Mohandas Gandhi",
      "Mohandas Karamchand Gandhi"
    ],
    "category": "leader",
    "era": "1869-1948",
    "difficulty": 1,
    "dossier": [
      "Was born in Porbandar, in present day Gujarat, India.",
      "Trained as a lawyer in London before working in South Africa for over twenty years.",
      "Developed a philosophy of nonviolent civil resistance called satyagraha while in South Africa.",
      "Returned to India and became a leading figure in the movement for independence from Britain.",
      "Led the Salt March in 1930, a nonviolent protest against a British salt tax.",
      "Advocated for religious tolerance between Hindus and Muslims in India.",
      "Was imprisoned multiple times by British colonial authorities for civil disobedience.",
      "India achieved independence from Britain in 1947, shortly before his death.",
      "Was assassinated by a Hindu nationalist in January 1948.",
      "His philosophy of nonviolence influenced later civil rights movements worldwide."
    ],
    "persona": "Speaks with gentle, deliberate humility and moral clarity, often turning questions back into simple ethical principles.",
    "revealFact": "He was nominated for the Nobel Peace Prize five times but never won it, a decision the Nobel Committee later publicly expressed regret over."
  },
  {
    "id": "ibn-battuta",
    "name": "Ibn Battuta",
    "aliases": [
      "Ibn Batuta"
    ],
    "category": "explorer",
    "era": "1304-1369",
    "difficulty": 2,
    "dossier": [
      "Was born in Tangier, in present day Morocco, into a family of Islamic legal scholars.",
      "Set out on a pilgrimage to Mecca at age twenty one that eventually became a decades long journey.",
      "Traveled an estimated seventy five thousand miles across Africa, the Middle East, and Asia.",
      "Visited regions including West Africa, the Arabian Peninsula, Persia, India, and China.",
      "Served as a judge and diplomat in various royal courts during his travels, including in the Delhi Sultanate.",
      "Dictated an extensive account of his travels, known as the Rihla, upon returning home.",
      "His writings provide one of the most detailed surviving accounts of the medieval Islamic world.",
      "Traveled farther in total distance than most other medieval explorers, including Marco Polo.",
      "Documented the customs, rulers, and daily life of dozens of societies he encountered.",
      "Is regarded as one of history's greatest travelers of the pre-modern era."
    ],
    "persona": "Speaks with scholarly, observant curiosity, treating every new city and court as worth careful, respectful study.",
    "revealFact": "Over the course of his travels, he is estimated to have covered a greater total distance than any other known traveler of his era, including Marco Polo, visiting the equivalent of about forty modern countries."
  },
  {
    "id": "saladin",
    "name": "Saladin",
    "aliases": [
      "Salah ad-Din",
      "Salah al-Din Yusuf"
    ],
    "category": "leader",
    "era": "1137-1193",
    "difficulty": 1,
    "dossier": [
      "Was a Kurdish military leader who founded the Ayyubid dynasty.",
      "Rose to power in Egypt before unifying much of the Muslim Middle East under his rule.",
      "Led Muslim forces to a decisive victory over Crusader armies at the Battle of Hattin in 1187.",
      "Recaptured Jerusalem from Crusader control later in 1187, ending nearly ninety years of Crusader rule there.",
      "Was widely praised, even by his European enemies, for his chivalry and mercy toward defeated foes.",
      "Fought King Richard the Lionheart of England during the Third Crusade.",
      "Negotiated a truce with Richard that allowed Christian pilgrims access to Jerusalem.",
      "Built a reputation across Europe as a model of honorable, principled leadership.",
      "Died in Damascus in 1193, reportedly leaving little personal wealth after giving much away in charity.",
      "Remains a celebrated historical figure across the Muslim and Arab world."
    ],
    "persona": "Speaks with dignified, unhurried honor, careful to be fair even when discussing rivals and enemies.",
    "revealFact": "When he died, his personal treasury reportedly held so little money that it was not enough to pay for his own funeral, because he had given most of his wealth away to the poor."
  },
  {
    "id": "samuel-morse",
    "name": "Samuel Morse",
    "aliases": [
      "Morse"
    ],
    "category": "inventor",
    "era": "1791-1872",
    "difficulty": 2,
    "dossier": [
      "Was born in Charlestown, Massachusetts, and initially trained as a painter.",
      "Was already an accomplished portrait artist before shifting his focus to invention.",
      "Developed one of the first practical electrical telegraph systems in the United States.",
      "Co-developed Morse code, a system of dots and dashes representing letters and numbers.",
      "Sent the first long distance public telegraph message in 1844, reading what hath God wrought.",
      "His telegraph system helped establish rapid long distance communication across the United States.",
      "Faced years of legal disputes over competing telegraph patents and inventors.",
      "His telegraph network expanded rapidly, eventually connecting much of the country by wire.",
      "Morse code remained in significant use for over a century, including in maritime and military communication.",
      "Is remembered as a key figure in the invention of long distance electrical communication."
    ],
    "persona": "Speaks with deliberate, rhythmic precision, occasionally slipping into the cadence of dots and dashes when excited.",
    "revealFact": "Before becoming famous for the telegraph, he was a respected professional portrait painter, and he only pivoted seriously toward invention after learning of his wife's death too late because the news traveled too slowly to reach him in time."
  },
  {
    "id": "cinderella",
    "name": "Cinderella",
    "aliases": [
      "Ella"
    ],
    "category": "fictional",
    "era": "fictional, European folktale tradition",
    "difficulty": 1,
    "dossier": [
      "A folktale heroine mistreated by her cruel stepmother and stepsisters, forced to do household chores.",
      "One of the most famous versions of the story was published by Charles Perrault in France in 1697.",
      "In Perrault's version, a fairy godmother magically transforms a pumpkin into a coach so she can attend a royal ball.",
      "Must leave the ball before midnight, when the magic will wear off.",
      "Loses a glass slipper while fleeing the ball at midnight.",
      "A prince searches the kingdom for the woman whose foot fits the slipper.",
      "Similar rags to riches stories with a lost shoe appear in folklore from many cultures, including ancient China and Egypt.",
      "The Brothers Grimm published a darker German version of the tale in the 19th century."
    ],
    "persona": "Speak with patient, hopeful sweetness, a little wistful about chores and unfair treatment, but never losing faith that things will change by midnight.",
    "revealFact": "Some scholars trace a version of the Cinderella story back to an ancient Greek account of an Egyptian slave girl whose sandal is carried off by an eagle and dropped in a king's lap, one of the oldest known versions of the tale."
  },
  {
    "id": "montezuma-ii",
    "name": "Montezuma II",
    "aliases": [
      "Moctezuma II",
      "Montezuma"
    ],
    "category": "leader",
    "era": "c.1466-1520",
    "difficulty": 2,
    "dossier": [
      "Was the ninth ruler, or tlatoani, of the Aztec Empire.",
      "Became emperor in 1502, ruling from the capital city of Tenochtitlan.",
      "Expanded Aztec territory and influence through military campaigns before Spanish contact.",
      "Presided over Tenochtitlan at its height, a city larger than most European capitals of the time.",
      "Received Spanish conquistador Hernan Cortes and his forces in 1519.",
      "Was taken hostage by Cortes shortly after the Spanish arrived in the capital.",
      "Died in 1520 under disputed circumstances during unrest between his people and the Spanish.",
      "His death occurred amid the broader Spanish conquest that soon toppled the Aztec Empire.",
      "Ruled over a sophisticated society with advanced architecture, astronomy, and agriculture.",
      "Remains a central figure in the history of the Spanish conquest of Mexico."
    ],
    "persona": "Speaks with formal, ceremonial gravity, treating hospitality and ritual protocol as matters of deep importance.",
    "revealFact": "The Aztec capital he ruled, Tenochtitlan, was built on an island in a lake and connected to the mainland by causeways, and at the time of Spanish arrival it was larger in population than most cities in Europe."
  },
  {
    "id": "max-planck",
    "name": "Max Planck",
    "aliases": [
      "Planck"
    ],
    "category": "scientist",
    "era": "1858-1947",
    "difficulty": 2,
    "dossier": [
      "Was a German theoretical physicist born in Kiel.",
      "Introduced the idea that energy is emitted and absorbed in discrete units, or quanta.",
      "His 1900 work on blackbody radiation is considered the founding moment of quantum theory.",
      "Won the Nobel Prize in Physics in 1918 for his discovery of energy quanta.",
      "The fundamental physical constant relating energy and frequency is named Planck's constant in his honor.",
      "Served as a leading administrator of German scientific research institutions for decades.",
      "Remained in Germany through much of the Nazi era, though he privately opposed many Nazi policies.",
      "Lost his son Erwin, who was executed for involvement in a plot against Hitler.",
      "Germany's major scientific research organization, the Max Planck Society, is named after him.",
      "Is widely regarded as the founder of quantum theory."
    ],
    "persona": "Speaks with grave, formal precision, treating even revolutionary ideas with careful, understated caution.",
    "revealFact": "He initially viewed his own idea of quantized energy as a mathematical trick to solve a specific problem, not a real physical fact, and it took years before he and other physicists accepted quantization as a genuine feature of nature."
  },
  {
    "id": "toussaint-louverture",
    "name": "Toussaint Louverture",
    "aliases": [
      "Toussaint L'Ouverture",
      "Louverture"
    ],
    "category": "leader",
    "era": "c.1743-1803",
    "difficulty": 2,
    "dossier": [
      "Was born into slavery in the French colony of Saint-Domingue, present day Haiti.",
      "Gained his freedom before the start of the Haitian Revolution in 1791.",
      "Became a leading general in the uprising of enslaved people against French colonial rule.",
      "Rose to become the colony's de facto governor and built a disciplined army.",
      "Negotiated a constitution in 1801 that abolished slavery in the colony.",
      "Was betrayed and captured by French forces sent by Napoleon in 1802.",
      "Was imprisoned in a French fortress, where he died in 1803.",
      "His former officers continued the fight after his death and won full independence in 1804.",
      "Haiti became the first nation founded by a successful slave revolt.",
      "Is remembered as a founding figure of Haitian independence."
    ],
    "persona": "Speaks with disciplined, strategic composure, choosing words as carefully as military moves.",
    "revealFact": "Despite dying in a French prison before Haiti's independence was won, the constitution he helped write in 1801 was one of the first in the world to permanently abolish slavery."
  },
  {
    "id": "charles-goodyear",
    "name": "Charles Goodyear",
    "aliases": [
      "Goodyear"
    ],
    "category": "inventor",
    "era": "1800-1860",
    "difficulty": 3,
    "dossier": [
      "Was born in New Haven, Connecticut, and struggled financially for much of his life.",
      "Became obsessed with improving raw rubber, which was too brittle in cold and too sticky in heat to be reliably useful.",
      "Spent years experimenting with rubber, often while deeply in debt and even in debtors' prison.",
      "Discovered the process of vulcanization in 1839, reportedly after accidentally dropping a rubber and sulfur mixture on a hot stove.",
      "Vulcanization used heat and sulfur to make rubber far more durable, elastic, and heat resistant.",
      "Patented his vulcanization process in 1844, though he later struggled to defend it from infringement.",
      "Never became wealthy from his invention and died deeply in debt in 1860.",
      "His vulcanization process became essential to the later development of tires and countless rubber products.",
      "The Goodyear Tire and Rubber Company was later named in his honor, though he had no direct connection to the company.",
      "Is remembered for a discovery that transformed rubber into one of the modern world's most important industrial materials."
    ],
    "persona": "Speaks with stubborn, restless persistence, treating every past failure as one step closer to the breakthrough he is certain is coming.",
    "revealFact": "He died deeply in debt despite his invention becoming enormously valuable, and the major tire company that later bore his name, Goodyear, was founded decades after his death by people with no direct connection to him."
  },
  {
    "id": "zorro",
    "name": "Zorro",
    "aliases": [
      "Don Diego de la Vega"
    ],
    "category": "fictional",
    "era": "fictional, first appeared 1919",
    "difficulty": 2,
    "dossier": [
      "First appeared in the 1919 pulp story The Curse of Capistrano by the American writer Johnston McCulley.",
      "A masked swordsman and outlaw who defends the poor in Spanish colonial California.",
      "Secretly the wealthy nobleman Don Diego de la Vega, who pretends to be a harmless fop in public.",
      "Wears a black mask, cape, and hat, and carves the letter Z with his sword as his signature mark.",
      "Fights corrupt officials and soldiers oppressing local townspeople.",
      "Rides a black horse, often named Tornado in later adaptations.",
      "Became hugely popular after being adapted into a 1920 silent film starring Douglas Fairbanks.",
      "Helped inspire the template for many later masked heroes in popular fiction."
    ],
    "persona": "Speak with a mysterious, theatrical flourish, hinting playfully at a secret identity while carving the letter Z into the air with an imaginary blade.",
    "revealFact": "The character was created as a pulp magazine story in 1919, but he became a lasting cultural icon largely because of a 1920 silent film that made him one of the first great masked hero characters in American popular fiction."
  },
  {
    "id": "c-v-raman",
    "name": "C.V. Raman",
    "aliases": [
      "Chandrasekhara Venkata Raman",
      "Raman"
    ],
    "category": "scientist",
    "era": "1888-1970",
    "difficulty": 3,
    "dossier": [
      "Was born in Tiruchirappalli, in present day Tamil Nadu, India.",
      "Studied physics academically while working a full time job in the Indian civil finance service.",
      "Discovered that light changes wavelength when it scatters through a transparent medium, a phenomenon now called the Raman effect.",
      "Made the discovery using simple, relatively inexpensive equipment compared to major Western laboratories.",
      "Won the Nobel Prize in Physics in 1930 for the discovery of the Raman effect.",
      "Was the first Asian and first non-white person to win a Nobel Prize in a scientific field.",
      "Founded the Indian Academy of Sciences and led major Indian research institutions.",
      "The Raman effect became a widely used tool for analyzing molecular structure in chemistry and physics.",
      "Continued conducting research on light, acoustics, and the physiology of human vision throughout his life.",
      "Is regarded as one of modern India's most celebrated scientists."
    ],
    "persona": "Speaks with proud, meticulous enthusiasm about the physics of everyday light, from the blue sky to a glass of water.",
    "revealFact": "He was inspired to investigate why the sea appears blue during a voyage, and his careful pursuit of that simple observation eventually led directly to his Nobel Prize winning discovery about how light scatters."
  },
  {
    "id": "akbar",
    "name": "Akbar",
    "aliases": [
      "Akbar the Great",
      "Jalaluddin Muhammad Akbar"
    ],
    "category": "leader",
    "era": "1542-1605",
    "difficulty": 2,
    "dossier": [
      "Became Mughal emperor of India at age thirteen after his father's death.",
      "Expanded the Mughal Empire to cover most of the Indian subcontinent.",
      "Promoted religious tolerance, ending a tax that had burdened non-Muslim subjects.",
      "Married a Hindu Rajput princess and included Hindus prominently in his administration.",
      "Founded a syncretic court philosophy called Din-i Ilahi that blended religious ideas.",
      "Reformed land revenue systems to make taxation fairer and more efficient.",
      "Was illiterate himself but was a great patron of art, literature, and architecture.",
      "His court included renowned scholars, artists, and musicians known as the nine gems.",
      "Built significant architectural works including his capital city of Fatehpur Sikri.",
      "Is regarded as one of the greatest and most tolerant rulers in Indian history."
    ],
    "persona": "Speaks with thoughtful, curious openness, genuinely interested in other perspectives and cultures.",
    "revealFact": "Despite ruling one of the most literate courts in the world, he could not read or write, and had texts read aloud to him instead."
  },
  {
    "id": "odysseus",
    "name": "Odysseus",
    "aliases": [
      "Ulysses"
    ],
    "category": "fictional",
    "era": "fictional, ancient Greek epic tradition",
    "difficulty": 2,
    "dossier": [
      "The hero of Homer's epic poem the Odyssey.",
      "King of the Greek island of Ithaca.",
      "Devised the trick of the Trojan Horse that helped Greece win the Trojan War.",
      "Spends ten years trying to sail home after the war, facing monsters and gods along the way.",
      "Outwits the one eyed giant Cyclops Polyphemus by blinding him and escaping under his sheep.",
      "Resists the song of the Sirens by having his crew tie him to the mast of his ship.",
      "Is aided throughout his journey by the goddess Athena.",
      "Returns home to Ithaca to find his wife Penelope besieged by suitors, whom he defeats."
    ],
    "persona": "Speak with cunning, boastful pride, always eager to describe a clever trick that outwitted gods, monsters, or men, and quick to claim credit for his cleverness.",
    "revealFact": "The Roman name for Odysseus, Ulysses, became so common in later literature that James Joyce titled his famous 1922 novel after him, loosely retelling the Odyssey's journey across a single day in Dublin."
  },
  {
    "id": "wu-zetian",
    "name": "Wu Zetian",
    "aliases": [
      "Empress Wu",
      "Wu Zhao"
    ],
    "category": "leader",
    "era": "624-705",
    "difficulty": 2,
    "dossier": [
      "Entered the imperial palace as a low ranking concubine to Emperor Taizong of the Tang dynasty.",
      "Later became a consort and then empress consort to his son, Emperor Gaozong.",
      "Effectively ruled China from behind the scenes during Gaozong's later years due to his declining health.",
      "Took direct power after her husband's death, ruling first through her sons.",
      "Declared herself emperor in 690, founding her own short lived Zhou dynasty.",
      "Is the only woman in Chinese history to rule in her own name as emperor.",
      "Expanded the civil service examination system, opening government positions to talent outside the aristocracy.",
      "Patronized Buddhism and commissioned major religious monuments and artworks.",
      "Was eventually forced to abdicate in 705 shortly before her death.",
      "Remains a controversial but historically significant figure in Chinese history."
    ],
    "persona": "Speaks with sharp, calculating confidence, unbothered by the fact that she broke every rule to get where she is.",
    "revealFact": "She is the only woman in over two thousand years of Chinese imperial history to rule as emperor in her own name, rather than as a regent or empress consort."
  },
  {
    "id": "louis-braille",
    "name": "Louis Braille",
    "aliases": [
      "Braille"
    ],
    "category": "inventor",
    "era": "1809-1852",
    "difficulty": 2,
    "dossier": [
      "Was born in Coupvray, France, the son of a leatherworker.",
      "Was blinded in both eyes as a young child following an accident with one of his father's tools.",
      "Attended one of the first schools for blind children in the world, in Paris.",
      "Adapted and simplified an existing military night writing code into a new tactile reading system.",
      "Developed the raised dot system now known as braille while still a teenager.",
      "His system used a six dot cell that could represent letters, numbers, and punctuation.",
      "Worked as a teacher at the school for the blind in Paris for most of his career.",
      "His system was not widely adopted until after his death, facing initial resistance from sighted educators.",
      "Braille eventually became the standard tactile reading and writing system for blind people worldwide.",
      "Is remembered for giving blind people independent access to literacy for the first time in history."
    ],
    "persona": "Speaks with quiet, determined patience, describing his system as a simple gift of independence rather than a grand achievement.",
    "revealFact": "He developed his famous reading system as a teenager by adapting a complicated military code called night writing, which the French army had originally created so soldiers could read messages silently in the dark."
  },
  {
    "id": "raphael",
    "name": "Raphael",
    "aliases": [
      "Raffaello Sanzio",
      "Raffaello"
    ],
    "category": "artist",
    "era": "1483-1520",
    "difficulty": 1,
    "dossier": [
      "Born in Urbino, in what is now Italy, in 1483.",
      "Painted The School of Athens, a large fresco in the Vatican showing ancient philosophers.",
      "Considered one of the three great masters of the High Renaissance, alongside Leonardo da Vinci and Michelangelo.",
      "Ran a large and productive workshop in Rome that trained many assistants.",
      "Worked extensively for the papal court, decorating rooms in the Vatican Palace known as the Raphael Rooms.",
      "Known for harmonious composition and graceful figures.",
      "Trained as a young painter under Pietro Perugino before establishing his own reputation in Florence and Rome.",
      "Died in Rome in 1520 on his 37th birthday."
    ],
    "persona": "Charming, gracious, and eager to please, speaks with the polished ease of someone who grew up favored by popes and princes.",
    "revealFact": "He died on his 37th birthday, and his sudden death was so mourned in Rome that his unfinished last painting, The Transfiguration, was displayed above his coffin."
  },
  {
    "id": "ramesses-ii",
    "name": "Ramesses II",
    "aliases": [
      "Ramesses the Great",
      "Ramses II"
    ],
    "category": "leader",
    "era": "c.1303-1213 BC",
    "difficulty": 1,
    "dossier": [
      "Ruled ancient Egypt during its nineteenth dynasty for sixty six years, one of the longest reigns in Egyptian history.",
      "Led military campaigns against the Hittite Empire, including the famous Battle of Kadesh.",
      "Signed one of the earliest known peace treaties in history with the Hittites after the war.",
      "Commissioned massive construction projects, including the temples at Abu Simbel.",
      "Fathered over a hundred children with multiple wives, including his chief wife Nefertari.",
      "Built new cities and monuments across Egypt, many inscribed with his own name and image.",
      "Is often identified by some scholars as a possible pharaoh referenced in biblical Exodus traditions, though this is debated.",
      "Lived to about ninety years old, an extraordinarily long life for his era.",
      "His mummy is remarkably well preserved and has been studied extensively by modern archaeologists.",
      "Is often called Ramesses the Great for the scale of his building projects and long reign."
    ],
    "persona": "Speaks with booming, monumental self regard, treating every accomplishment as worthy of being carved in stone.",
    "revealFact": "His mummy was so well preserved that modern scientists were able to determine he had red hair, likely turned that color by the embalming process, and arthritis in his later years."
  },
  {
    "id": "giuseppe-verdi",
    "name": "Giuseppe Verdi",
    "aliases": [
      "Verdi"
    ],
    "category": "musician",
    "era": "1813-1901",
    "difficulty": 2,
    "dossier": [
      "Born near Busseto, in what is now Italy, in 1813.",
      "Composed the operas Rigoletto, La Traviata, and Aida.",
      "Became a symbol of Italian national identity during the movement toward Italian unification.",
      "Served briefly as a member of the first Italian parliament.",
      "Wrote comparatively few operas but each was carefully crafted over long periods.",
      "Composed his final opera, Falstaff, when he was in his late seventies.",
      "Built a retirement home for elderly musicians in Milan, which he considered his proudest achievement.",
      "Died in Milan, Italy, in 1901."
    ],
    "persona": "Proud and patriotic, speaks about opera and Italy in the same breath, treating both as causes worth fighting for.",
    "revealFact": "He considered a retirement home for aging musicians that he founded in Milan, not any of his operas, to be his greatest life achievement."
  },
  {
    "id": "buster-keaton",
    "name": "Buster Keaton",
    "aliases": [
      "Keaton",
      "the Great Stone Face"
    ],
    "category": "entertainer",
    "era": "1895-1966",
    "difficulty": 2,
    "dossier": [
      "Born in Piqua, Kansas, in 1895.",
      "A silent film comedian famous for elaborate physical stunts and a deadpan expression.",
      "Starred in and directed films including The General and Sherlock Jr.",
      "Performed nearly all his own dangerous stunts without a stunt double.",
      "Earned the nickname the Great Stone Face for his refusal to smile on camera.",
      "Began performing on stage as a small child in his family's vaudeville act.",
      "His career declined after moving to a major studio that restricted his creative control.",
      "Died in Los Angeles, California, in 1966."
    ],
    "persona": "Deadpan and stoic, describes even the most dangerous stunt with a completely straight face, as if nothing could ever surprise him.",
    "revealFact": "In one famous stunt for the film Steamboat Bill Jr., an entire two ton building facade fell around him, missing him only because he stood in the precise spot where an open window frame passed over him."
  },
  {
    "id": "jesse-owens",
    "name": "Jesse Owens",
    "aliases": [
      "Owens"
    ],
    "category": "athlete",
    "era": "1913-1980",
    "difficulty": 1,
    "dossier": [
      "Born in Oakville, Alabama, in 1913.",
      "Won four gold medals in track and field at the 1936 Berlin Olympics.",
      "His performance in Berlin directly undercut Nazi claims of Aryan racial superiority.",
      "Set several world records in a single college track meet in 1935.",
      "Faced ongoing racial discrimination in the United States even after his Olympic triumph.",
      "Was not invited to the White House by the sitting president after his 1936 victories.",
      "Later worked as a public speaker and goodwill ambassador for sports.",
      "Died in Tucson, Arizona, in 1980."
    ],
    "persona": "Humble and dignified, describes his own record breaking feats matter of factly, letting the achievements speak louder than any boast.",
    "revealFact": "In a single college track meet in 1935, he set three world records and tied a fourth in under an hour, a performance often called the greatest 45 minutes in sports history."
  },
  {
    "id": "heitor-villa-lobos",
    "name": "Heitor Villa-Lobos",
    "aliases": [
      "Villa-Lobos"
    ],
    "category": "musician",
    "era": "1887-1959",
    "difficulty": 3,
    "dossier": [
      "Born in Rio de Janeiro, Brazil, in 1887.",
      "The most prolific and internationally famous Brazilian classical composer.",
      "Composed the Bachianas Brasileiras series, blending Bach-inspired structure with Brazilian folk elements.",
      "Traveled through the Brazilian interior as a young man collecting folk melodies.",
      "Led major reforms of music education across Brazil, organizing mass choral singing programs in schools.",
      "Composed an enormous body of work across symphonies, chamber music, and film scores.",
      "Represented Brazil on international cultural tours throughout his career.",
      "Died in Rio de Janeiro, Brazil, in 1959."
    ],
    "persona": "Exuberant and larger than life, speaks with the sprawling energy of the Brazilian rainforests and cities he loved to explore for musical inspiration.",
    "revealFact": "As a young man, he traveled deep into the Brazilian interior collecting folk and indigenous melodies, later claiming some hair raising adventures along the way that he loved to exaggerate in interviews."
  },
  {
    "id": "otto-von-bismarck",
    "name": "Otto von Bismarck",
    "aliases": [
      "Bismarck",
      "the Iron Chancellor"
    ],
    "category": "leader",
    "era": "1815-1898",
    "difficulty": 1,
    "dossier": [
      "Served as Minister President of Prussia beginning in 1862.",
      "Engineered a series of wars that led to the unification of Germany under Prussian leadership.",
      "Became the first Chancellor of the newly unified German Empire in 1871.",
      "Practiced a pragmatic, calculating style of diplomacy often called realpolitik.",
      "Introduced early forms of social welfare, including health and old age insurance, to undercut socialist movements.",
      "Built a complex system of European alliances aimed at isolating France and preserving peace.",
      "Was known for a famous speech declaring that great questions of the time would be decided by blood and iron.",
      "Was dismissed from office in 1890 by the young Kaiser Wilhelm II.",
      "His alliance system unraveled after his departure, contributing to tensions before World War I.",
      "Is regarded as the founding architect of the modern German state."
    ],
    "persona": "Speaks with cold, calculating precision, treating diplomacy as a game of leverage rather than sentiment.",
    "revealFact": "Despite his fearsome Iron Chancellor reputation, he introduced some of the world's first government social welfare programs, including health insurance, partly as a strategy to weaken support for socialism."
  },
  {
    "id": "salvador-dali",
    "name": "Salvador Dali",
    "aliases": [
      "Dali"
    ],
    "category": "artist",
    "era": "1904-1989",
    "difficulty": 1,
    "dossier": [
      "Born in Figueres, in Catalonia, Spain, in 1904.",
      "Painted The Persistence of Memory in 1931, featuring melting clocks draped over a landscape.",
      "A leading figure in the Surrealist art movement.",
      "Known for his flamboyant, upturned mustache and eccentric public persona.",
      "Collaborated with filmmaker Luis Bunuel on the surrealist short film Un Chien Andalou.",
      "Also designed jewelry, furniture, and worked briefly with Alfred Hitchcock on a dream sequence.",
      "Built a theatre museum devoted to his own work in his hometown of Figueres.",
      "Died in Figueres in 1989."
    ],
    "persona": "Theatrical and grandiose, treats every answer like a performance, dropping in melting clocks and dream logic even when the question is simple.",
    "revealFact": "He designed the dream sequence for Alfred Hitchcock's 1945 film Spellbound, bringing his surrealist imagery to Hollywood."
  },
  {
    "id": "arthur-ashe",
    "name": "Arthur Ashe",
    "aliases": [
      "Ashe"
    ],
    "category": "athlete",
    "era": "1943-1993",
    "difficulty": 2,
    "dossier": [
      "Born in Richmond, Virginia, in 1943.",
      "The first Black man to win the singles titles at the US Open, the Australian Open, and Wimbledon.",
      "Won the first US Open in 1968 while still an amateur player.",
      "Served in the United States Army as a young man before turning fully professional.",
      "Became a prominent advocate against apartheid in South Africa.",
      "Contracted HIV from a blood transfusion during heart surgery and later became a public health advocate.",
      "Wrote extensively about race and sports in America.",
      "Died in New York City in 1993."
    ],
    "persona": "Calm, principled, and thoughtful, speaks about tennis and fairness in the same measured tone, always aware of the larger world beyond the court.",
    "revealFact": "He contracted HIV from a blood transfusion during heart bypass surgery in the 1980s, and after his diagnosis became public, he spent his final years as a leading advocate for HIV and AIDS awareness."
  },
  {
    "id": "george-eastman",
    "name": "George Eastman",
    "aliases": [
      "Eastman"
    ],
    "category": "inventor",
    "era": "1854-1932",
    "difficulty": 2,
    "dossier": [
      "Was born in Waterville, New York, and largely self taught himself photography techniques.",
      "Developed a dry plate photographic process that was easier to use than older wet plate methods.",
      "Founded the Eastman Kodak Company, which became a dominant force in photography.",
      "Introduced flexible roll film, which made photography far more portable and convenient.",
      "Launched the simple, affordable Kodak camera in 1888 under the slogan you press the button, we do the rest.",
      "His innovations helped transform photography from a specialized craft into a mass consumer hobby.",
      "Kodak film technology later became foundational to the development of the motion picture industry.",
      "Was a major philanthropist, donating extensively to education, health, and the arts.",
      "Gave large sums anonymously for many years before his philanthropy became publicly known.",
      "Is remembered as the man who made photography accessible to ordinary people."
    ],
    "persona": "Speaks with brisk, consumer-minded enthusiasm, always thinking about how to make a complicated process simple for everyone.",
    "revealFact": "His company's famous marketing slogan, you press the button, we do the rest, reflected a genuinely radical idea at the time, that ordinary people with no technical training could take photographs themselves."
  },
  {
    "id": "artemisia-gentileschi",
    "name": "Artemisia Gentileschi",
    "aliases": [
      "Gentileschi"
    ],
    "category": "artist",
    "era": "1593-1656",
    "difficulty": 3,
    "dossier": [
      "Born in Rome in 1593, daughter of the painter Orazio Gentileschi.",
      "Painted Judith Beheading Holofernes, a powerful and violent biblical scene.",
      "One of the most accomplished painters of the Italian Baroque period.",
      "Survived a highly publicized sexual assault trial as a young woman, an ordeal that shaped her later work.",
      "Became the first woman admitted to the Accademia di Arte del Disegno in Florence.",
      "Worked for patrons across Italy and in England, including at the English royal court.",
      "Painted many strong biblical and mythological heroines, including Judith and Susanna.",
      "Died in Naples around 1656."
    ],
    "persona": "Steely and unapologetic, describes her heroines with quiet ferocity, as though every brushstroke is settling an old score.",
    "revealFact": "She became the first woman ever admitted to Florence's prestigious Accademia di Arte del Disegno, a major milestone for women artists in the 17th century."
  },
  {
    "id": "mansa-musa",
    "name": "Mansa Musa",
    "aliases": [
      "Musa I of Mali",
      "Musa"
    ],
    "category": "leader",
    "era": "c.1280-c.1337",
    "difficulty": 2,
    "dossier": [
      "Ruled the Mali Empire in West Africa during the fourteenth century.",
      "Presided over an empire that controlled major sources of gold and salt trade.",
      "Is widely considered one of the wealthiest individuals in recorded history.",
      "Made a famous pilgrimage to Mecca in 1324, traveling with an enormous caravan.",
      "Reportedly gave away so much gold in Cairo during his pilgrimage that it disrupted the local economy for years.",
      "Brought scholars, architects, and books back to Mali to build centers of learning.",
      "Expanded and beautified the city of Timbuktu into a major center of Islamic scholarship.",
      "Commissioned construction of mosques including the Djinguereber Mosque in Timbuktu.",
      "His empire and wealth became known across the Mediterranean and Middle East.",
      "Appeared on medieval European maps holding a large gold nugget, reflecting his fame abroad."
    ],
    "persona": "Speaks with generous, unhurried grandeur, treating wealth as something meant to be shared and displayed.",
    "revealFact": "His gold giving during his pilgrimage to Mecca reportedly caused the price of gold in Cairo to drop for over a decade afterward."
  },
  {
    "id": "sacagawea",
    "name": "Sacagawea",
    "aliases": [
      "Sacajawea"
    ],
    "category": "explorer",
    "era": "c.1788-1812",
    "difficulty": 2,
    "dossier": [
      "Was born into the Lemhi Shoshone people in what is now Idaho.",
      "Was captured by a rival tribe as a child and later sold into marriage to a French Canadian trapper.",
      "Joined the Lewis and Clark Expedition in 1804 as an interpreter and guide, while still a teenager.",
      "Traveled with the expedition while caring for her infant son, born shortly before the journey began.",
      "Helped the expedition negotiate safe passage and trade with various Native American groups.",
      "Her presence with a baby signaled to other tribes that the group was not a war party.",
      "Assisted in recovering important supplies after a boat capsized during the journey.",
      "Reunited briefly with her Shoshone family and brother during the expedition's travels west.",
      "Helped guide the expedition through parts of the western United States toward the Pacific Ocean.",
      "Is commemorated on United States currency and in numerous monuments across the country."
    ],
    "persona": "Speaks with quiet, practical resourcefulness, treating survival skills and careful observation as simply part of daily life.",
    "revealFact": "She made the entire cross country journey with the Lewis and Clark Expedition while caring for her infant son, who was born only a couple of months before the expedition set out."
  },
  {
    "id": "julius-caesar",
    "name": "Julius Caesar",
    "aliases": [
      "Caesar"
    ],
    "category": "leader",
    "era": "100-44 BC",
    "difficulty": 1,
    "dossier": [
      "Was a Roman general and statesman who rose through the ranks of the late Roman Republic.",
      "Led successful military campaigns that conquered Gaul over roughly eight years.",
      "Crossed the Rubicon river with his army in 49 BC, an act that triggered civil war.",
      "Defeated his rival Pompey to become the dominant power in Rome.",
      "Was appointed dictator, eventually declared dictator for life in 44 BC.",
      "Introduced reforms including a new calendar, a precursor to the modern Julian calendar.",
      "Was assassinated by a group of senators, including Brutus and Cassius, on the Ides of March in 44 BC.",
      "His death triggered another round of civil wars that ultimately ended the Roman Republic.",
      "His grand nephew and adopted heir Octavian became the first Roman emperor, Augustus.",
      "His name became the root of later titles like Kaiser and Tsar."
    ],
    "persona": "Speaks with commanding, self assured confidence, often referring to himself in the third person and treating every problem as winnable.",
    "revealFact": "The famous line 'Et tu, Brute' was invented by Shakespeare over a thousand years later. There is no reliable record of Caesar's actual last words."
  },
  {
    "id": "james-cook",
    "name": "James Cook",
    "aliases": [
      "Captain Cook",
      "Cook"
    ],
    "category": "explorer",
    "era": "1728-1779",
    "difficulty": 1,
    "dossier": [
      "Was born in Marton, England, to a farm laborer family, and joined the Royal Navy as a young man.",
      "Rose through the ranks of the Royal Navy through skill in navigation and mapmaking.",
      "Led three major Pacific Ocean voyages of exploration between 1768 and his death.",
      "Charted extensive coastlines of New Zealand and eastern Australia in detail for the first time by Europeans.",
      "Was among the first Europeans to encounter Hawaii, which he called the Sandwich Islands.",
      "Made significant advances in preventing scurvy among his crew through diet.",
      "Produced detailed and highly accurate maps that were used by sailors for generations afterward.",
      "His voyages contributed significantly to European scientific and geographic knowledge of the Pacific.",
      "Was killed in a violent confrontation with Native Hawaiians in 1779 during his third voyage.",
      "Is regarded as one of the most significant maritime explorers of the eighteenth century."
    ],
    "persona": "Speaks with methodical, precise professionalism, more interested in accurate charts than dramatic tales.",
    "revealFact": "He was a pioneer in preventing scurvy at sea, requiring his crew to eat foods like sauerkraut, and his ships reportedly went years on long voyages without losing a single sailor to the disease, a remarkable achievement for his era."
  },
  {
    "id": "homer",
    "name": "Homer",
    "aliases": [
      "Homeros"
    ],
    "category": "writer",
    "era": "circa 8th century BCE",
    "difficulty": 1,
    "dossier": [
      "Traditionally credited as the author of the Iliad and the Odyssey.",
      "Believed to have lived in ancient Greece, possibly in Ionia, around the 8th century BCE.",
      "The Iliad tells part of the story of the Trojan War.",
      "The Odyssey follows the hero Odysseus on his long journey home after the war.",
      "Little is reliably known about his life, and some scholars debate whether one person wrote both epics.",
      "His poems were originally composed and performed orally before being written down.",
      "Both epics were foundational texts of ancient Greek education and culture.",
      "His works remain among the oldest and most influential works of Western literature."
    ],
    "persona": "Speaks in grand, rolling epic cadences, as though every answer deserves an invocation to the Muse before it begins.",
    "revealFact": "Ancient sources cannot agree on basic facts about him, including where he was born, and some modern scholars even debate whether the Iliad and Odyssey were composed by the same person."
  },
  {
    "id": "emmeline-pankhurst",
    "name": "Emmeline Pankhurst",
    "aliases": [
      "Pankhurst"
    ],
    "category": "leader",
    "era": "1858-1928",
    "difficulty": 2,
    "dossier": [
      "Was born in Manchester, England, into a politically active family.",
      "Founded the Women's Social and Political Union in 1903 to campaign for women's voting rights.",
      "Led a militant wing of the British suffrage movement, adopting the slogan deeds not words.",
      "Her followers, known as suffragettes, engaged in tactics including window breaking and arson.",
      "Was arrested and imprisoned multiple times for her activism.",
      "Went on hunger strikes in prison, which authorities responded to with forced feeding.",
      "Paused suffrage campaigning to support the British war effort during World War I.",
      "Lived to see limited voting rights granted to some British women in 1918.",
      "Died in 1928, weeks before full equal voting rights for women passed in Britain.",
      "Is regarded as one of the most influential figures in the British women's suffrage movement."
    ],
    "persona": "Speaks with fierce, uncompromising determination, treating polite requests as a strategy that has already failed.",
    "revealFact": "She and her fellow suffragettes were sometimes force-fed by prison authorities during hunger strikes, a practice so controversial that it became a major public scandal in Britain."
  },
  {
    "id": "matthew-henson",
    "name": "Matthew Henson",
    "aliases": [
      "Henson"
    ],
    "category": "explorer",
    "era": "1866-1955",
    "difficulty": 3,
    "dossier": [
      "Was born in Charles County, Maryland, to parents who had been sharecroppers.",
      "Went to sea as a young cabin boy and became a skilled sailor and navigator.",
      "Joined explorer Robert Peary on a series of Arctic expeditions beginning in the 1890s.",
      "Learned Inuit language and survival skills, becoming an essential member of Peary's polar team.",
      "Built sledges and trained sled dog teams critical to the Arctic expeditions' success.",
      "Was part of the expedition team that reached, or came very close to, the North Pole in 1909.",
      "Some accounts suggest he may have arrived at the pole location slightly ahead of Peary himself.",
      "Received far less public recognition than Peary for decades, largely due to racial prejudice of the era.",
      "Was later honored by geographic societies and received a Congressional medal decades after the expedition.",
      "Is now recognized as an essential and skilled member of one of history's most famous polar expeditions."
    ],
    "persona": "Speaks with steady, competent pride, quietly certain of his own skill even when the credit went to someone else.",
    "revealFact": "For decades after the famous 1909 North Pole expedition, he received far less public recognition than the expedition's leader, and it was only much later in his life and after his death that his crucial role finally received wide public honor."
  },
  {
    "id": "eusebio",
    "name": "Eusebio",
    "aliases": [
      "Eusebio da Silva Ferreira",
      "the Black Panther"
    ],
    "category": "athlete",
    "era": "1942-2014",
    "difficulty": 3,
    "dossier": [
      "Born in Lourenco Marques, in what is now Maputo, Mozambique, in 1942.",
      "Became one of the greatest footballers, or soccer players, of the 1960s.",
      "Played most of his club career for Benfica in Portugal.",
      "Led Portugal's national team to third place at the 1966 World Cup, its best ever finish at the time.",
      "Won the Golden Boot as the top scorer at that 1966 World Cup.",
      "Was named European Footballer of the Year in 1965.",
      "Known by the nickname the Black Panther for his speed and power on the field.",
      "Died in Lisbon, Portugal, in 2014."
    ],
    "persona": "Powerful and gracious, speaks about the game with warmth and humility, proud to have carried both Mozambique and Portugal onto the world stage.",
    "revealFact": "When he died in 2014, Portugal declared three days of national mourning, and his body lay in state at Benfica's stadium so fans could pay their respects."
  },
  {
    "id": "kamehameha-i",
    "name": "Kamehameha I",
    "aliases": [
      "Kamehameha the Great",
      "Kamehameha"
    ],
    "category": "leader",
    "era": "c.1758-1819",
    "difficulty": 2,
    "dossier": [
      "Was born on the island of Hawaii into a chiefly family.",
      "Rose to power through years of warfare among the competing Hawaiian island chiefdoms.",
      "United the Hawaiian Islands under a single kingdom for the first time by 1810.",
      "Adopted some Western weapons and advisors while retaining traditional Hawaiian governance.",
      "Established trade relationships with European and American ships visiting the islands.",
      "Created a legal code known as the Law of the Splintered Paddle protecting travelers and noncombatants.",
      "Founded the Kingdom of Hawaii, which remained an independent nation for nearly a century after his death.",
      "Is remembered as Hawaii's most significant unifying monarch.",
      "Statues of him stand today in Hawaii and in the United States Capitol.",
      "Died in 1819, with his kingdom passing to his son."
    ],
    "persona": "Speaks with steady, warrior-chief authority, proud of unity won through both strength and law.",
    "revealFact": "The legal protection he created for travelers, called the Law of the Splintered Paddle, is still referenced today in the Hawaii state constitution."
  },
  {
    "id": "auguste-rodin",
    "name": "Auguste Rodin",
    "aliases": [
      "Rodin"
    ],
    "category": "artist",
    "era": "1840-1917",
    "difficulty": 2,
    "dossier": [
      "Born in Paris, France, in 1840.",
      "Sculpted The Thinker, one of the most recognized sculptures in the world.",
      "Sculpted The Kiss, showing two entwined lovers in marble.",
      "Worked for years on an unfinished monumental bronze door called The Gates of Hell.",
      "Was rejected three times by the official Paris art school before building his career independently.",
      "Had a long professional and romantic partnership with sculptor Camille Claudel.",
      "Considered a founder of modern sculpture for moving away from idealized classical forms.",
      "Died near Paris in 1917."
    ],
    "persona": "Physical and earthy, talks about the human body in clay and bronze the way a wrestler talks about muscle and weight.",
    "revealFact": "The Thinker was originally created as a small figure meant to sit above The Gates of Hell, representing the poet Dante, before it became a famous standalone sculpture."
  },
  {
    "id": "srinivasa-ramanujan",
    "name": "Srinivasa Ramanujan",
    "aliases": [
      "Ramanujan"
    ],
    "category": "scientist",
    "era": "1887-1920",
    "difficulty": 2,
    "dossier": [
      "Was born in Erode, in the Tamil Nadu region of India, to a modest family.",
      "Was largely self taught in advanced mathematics, with little formal training in the subject.",
      "Sent unsolicited letters containing original mathematical theorems to prominent British mathematicians.",
      "Was invited to Cambridge University by mathematician G. H. Hardy after Hardy recognized his genius.",
      "Produced thousands of original results in number theory, infinite series, and continued fractions.",
      "Worked with remarkable intuition, often arriving at results without formal proofs that were later verified.",
      "Suffered from poor health throughout his time in England, worsened by the unfamiliar climate.",
      "Was elected a Fellow of the Royal Society, a rare honor for someone with almost no formal mathematical education.",
      "Returned to India in 1919 due to declining health and died the following year at age thirty two.",
      "His notebooks continue to inspire new mathematical research even today."
    ],
    "persona": "Speaks with quiet, intense wonder, describing complex formulas as though they simply arrived to him fully formed.",
    "revealFact": "He claimed many of his mathematical insights came to him in dreams, and some of the results in his notebooks were so far ahead of their time that mathematicians are still finding new applications for them today."
  },
  {
    "id": "ernest-hemingway",
    "name": "Ernest Hemingway",
    "aliases": [
      "Hemingway"
    ],
    "category": "writer",
    "era": "1899-1961",
    "difficulty": 1,
    "dossier": [
      "Born in Oak Park, Illinois, in 1899.",
      "Wrote The Old Man and the Sea, published in 1952.",
      "Also wrote A Farewell to Arms and The Sun Also Rises.",
      "Won the Nobel Prize in Literature in 1954.",
      "Served as an ambulance driver in Italy during World War One and was seriously wounded.",
      "Known for a sparse, direct writing style sometimes called the iceberg theory.",
      "Lived for periods in Paris, Key West, and Cuba, and loved bullfighting and deep sea fishing.",
      "Died in Ketchum, Idaho, in 1961."
    ],
    "persona": "Terse and macho, prefers short declarative sentences and stories about war, fishing, or bullfights to any kind of flowery talk.",
    "revealFact": "His famously spare writing style is sometimes called the iceberg theory, the idea that the deeper meaning of a story should stay submerged beneath a simple surface."
  },
  {
    "id": "edvard-munch",
    "name": "Edvard Munch",
    "aliases": [
      "Munch"
    ],
    "category": "artist",
    "era": "1863-1944",
    "difficulty": 2,
    "dossier": [
      "Born in Loten, Norway, in 1863.",
      "Painted The Scream in 1893, showing a distressed figure against a swirling orange sky.",
      "Explored themes of anxiety, illness, and death, shaped by a childhood marked by family loss.",
      "Created several versions of The Scream in different media, including paint and pastel.",
      "Was part of a wider Symbolist and Expressionist movement in European art.",
      "Suffered a nervous breakdown in 1908 and spent months recovering in a clinic.",
      "Lived through both World Wars, dying in Norway shortly before the end of the second.",
      "Died near Oslo, Norway, in 1944."
    ],
    "persona": "Anxious and intense, describes ordinary walks and sunsets as though they might swallow him whole, but with dry Scandinavian humor underneath the dread.",
    "revealFact": "He painted at least four different versions of The Scream in various media, and one version was famously stolen from an Oslo museum in 1994."
  },
  {
    "id": "fridtjof-nansen",
    "name": "Fridtjof Nansen",
    "aliases": [
      "Nansen"
    ],
    "category": "explorer",
    "era": "1861-1930",
    "difficulty": 3,
    "dossier": [
      "Was born near Christiania, present day Oslo, Norway.",
      "Trained as a zoologist and skilled skier before turning to polar exploration.",
      "Led the first crossing of the Greenland ice sheet on skis in 1888.",
      "Designed a specialized ship, the Fram, built to withstand and drift with Arctic pack ice.",
      "Led an expedition that deliberately allowed the Fram to freeze into Arctic ice and drift toward the North Pole.",
      "Left the ship with a companion partway through the expedition to attempt reaching the pole on foot, achieving a new farthest north record.",
      "Later became a prominent statesman, helping negotiate Norwegian independence from Sweden.",
      "Served as a diplomat and worked extensively on humanitarian relief after World War I.",
      "Developed the Nansen passport, a document that helped stateless refugees travel internationally.",
      "Won the Nobel Peace Prize in 1922 for his humanitarian work assisting refugees and famine victims."
    ],
    "persona": "Speaks with calm, scientifically minded resolve, equally comfortable discussing ice drift physics and refugee diplomacy.",
    "revealFact": "After his polar exploring career, he became a humanitarian diplomat and invented a special travel document, the Nansen passport, that allowed hundreds of thousands of stateless refugees to legally cross borders after World War I."
  },
  {
    "id": "susan-b-anthony",
    "name": "Susan B. Anthony",
    "aliases": [
      "Susan Anthony",
      "Anthony"
    ],
    "category": "leader",
    "era": "1820-1906",
    "difficulty": 2,
    "dossier": [
      "Was raised in a Quaker family in Massachusetts with strong reformist values.",
      "Became active first in the temperance and abolitionist movements.",
      "Partnered closely with Elizabeth Cady Stanton in the fight for women's voting rights.",
      "Co-founded organizations dedicated to securing suffrage for American women.",
      "Was arrested in 1872 for illegally voting in a presidential election as a form of protest.",
      "Traveled extensively across the United States giving speeches advocating for women's rights.",
      "Helped found the National Woman Suffrage Association.",
      "Never lived to see the passage of the Nineteenth Amendment granting women the vote nationally.",
      "Died in 1906, fourteen years before women's suffrage became law in the United States.",
      "Became the first non-mythical woman to appear on United States circulating currency, the Susan B. Anthony dollar."
    ],
    "persona": "Speaks with firm, unwavering determination, treating setbacks as simply proof more work is needed.",
    "revealFact": "She was arrested and put on trial for the crime of voting in 1872, and was fined one hundred dollars, which she publicly declared she would never pay, and never did."
  },
  {
    "id": "archimedes",
    "name": "Archimedes",
    "aliases": [
      "Archimedes of Syracuse"
    ],
    "category": "scientist",
    "era": "c.287-212 BC",
    "difficulty": 1,
    "dossier": [
      "Was a Greek mathematician, physicist, and engineer from the city of Syracuse in Sicily.",
      "Made major advances in geometry, including calculating an accurate approximation of pi.",
      "Discovered the principle of buoyancy, now known as Archimedes' principle.",
      "Reportedly discovered this principle while in the bath and ran through the streets shouting eureka.",
      "Invented or improved several mechanical devices, including a water screw pump for irrigation.",
      "Designed defensive war machines used to defend Syracuse against a Roman siege.",
      "Calculated the volume and surface area of spheres and cylinders with remarkable precision.",
      "Developed early methods that anticipated concepts later formalized in integral calculus.",
      "Was killed by a Roman soldier during the capture of Syracuse in 212 BC.",
      "Is considered one of the greatest mathematicians and engineers of the ancient world."
    ],
    "persona": "Speaks with excitable, playful genius, prone to getting distracted mid-conversation by an interesting geometric problem.",
    "revealFact": "According to legend, he was so absorbed in a mathematical diagram he was drawing in the sand that he ignored a Roman soldier's order to stop, and was killed on the spot as a result."
  },
  {
    "id": "johannes-gutenberg",
    "name": "Johannes Gutenberg",
    "aliases": [
      "Gutenberg"
    ],
    "category": "inventor",
    "era": "c.1400-1468",
    "difficulty": 1,
    "dossier": [
      "Was born in Mainz, in present day Germany, into a family of merchants.",
      "Developed a practical printing press using movable metal type around 1440.",
      "His system combined oil based ink, a metal alloy for type, and a mechanical press.",
      "Printed the Gutenberg Bible around 1455, one of the earliest major books printed using movable type in Europe.",
      "His invention dramatically reduced the time and cost of producing written material.",
      "His printing method spread rapidly across Europe within just a few decades.",
      "The resulting boom in book production is often called the printing revolution.",
      "His technology helped fuel the spread of literacy, the Renaissance, and the Reformation.",
      "Faced significant financial and legal troubles related to his printing business during his lifetime.",
      "Is widely regarded as one of the most influential inventors in human history."
    ],
    "persona": "Speaks with careful, craftsman-like pride, treating the mechanics of ink and type as a matter of serious artistry.",
    "revealFact": "A copy of his original Gutenberg Bible is considered so historically valuable today that surviving copies have sold at auction for millions of dollars, and only a small number of complete copies still exist worldwide."
  },
  {
    "id": "humphrey-bogart",
    "name": "Humphrey Bogart",
    "aliases": [
      "Bogart",
      "Bogey"
    ],
    "category": "entertainer",
    "era": "1899-1957",
    "difficulty": 2,
    "dossier": [
      "Born in New York City in 1899.",
      "Starred in the films Casablanca, The Maltese Falcon, and The African Queen.",
      "Won the Academy Award for Best Actor for The African Queen in 1951.",
      "Became famous for playing tough, world weary characters in crime and detective films.",
      "Was married four times, most famously to actress Lauren Bacall.",
      "Served in the United States Navy during World War One.",
      "Helped found a group of Hollywood entertainers called the Rat Pack in an earlier incarnation.",
      "Died in Los Angeles, California, in 1957."
    ],
    "persona": "Gruff and cynical on the surface, delivers lines with a dry, clipped drawl, though a soft heart shows through if you push past the tough act.",
    "revealFact": "The famous line often attributed to him from Casablanca, Play it again, Sam, is never actually said that way in the film. The real line is Play it, Sam."
  },
  {
    "id": "gustav-klimt",
    "name": "Gustav Klimt",
    "aliases": [
      "Klimt"
    ],
    "category": "artist",
    "era": "1862-1918",
    "difficulty": 2,
    "dossier": [
      "Born near Vienna, in the Austrian Empire, in 1862.",
      "Painted The Kiss, showing an embracing couple covered in gold leaf patterning.",
      "A founding member of the Vienna Secession art movement.",
      "Known for his liberal use of gold leaf, inspired partly by Byzantine mosaics he saw in Italy.",
      "Painted portraits of wealthy Viennese women, including Adele Bloch-Bauer.",
      "His work was controversial in his own time for its eroticism and symbolism.",
      "Trained originally in decorative mural painting before developing his signature ornamental style.",
      "Died in Vienna in 1918 during the global influenza pandemic."
    ],
    "persona": "Ornate and sensuous, speaks in swirling patterns and gold, treating even small talk like a decorative flourish.",
    "revealFact": "His portrait Adele Bloch-Bauer I was seized by the Nazis and later became the subject of a famous decades long legal battle for restitution, dramatized in the film Woman in Gold."
  },
  {
    "id": "eli-whitney",
    "name": "Eli Whitney",
    "aliases": [
      "Whitney"
    ],
    "category": "inventor",
    "era": "1765-1825",
    "difficulty": 2,
    "dossier": [
      "Was born in Westborough, Massachusetts, and trained at Yale College.",
      "Invented the cotton gin in 1793, a machine that mechanically separated cotton fibers from seeds.",
      "His invention dramatically sped up cotton processing, transforming the American cotton industry.",
      "The cotton gin's success unfortunately also led to a major expansion of slavery in the American South.",
      "Struggled for years to profit from his invention due to widespread patent infringement.",
      "Later turned to manufacturing firearms for the United States government.",
      "Pioneered early methods of using interchangeable parts in manufacturing.",
      "His interchangeable parts approach influenced the later development of mass production techniques.",
      "Faced significant financial and legal battles throughout much of his career.",
      "Is remembered both for a transformative invention and for its complicated, damaging historical consequences."
    ],
    "persona": "Speaks with practical, mechanically-minded determination, frustrated that his invention brought him more legal trouble than profit.",
    "revealFact": "Although the cotton gin made cotton processing far faster, ironically it also greatly increased the demand for enslaved labor to grow more cotton, deepening rather than reducing the reliance on slavery in the American South."
  },
  {
    "id": "edgar-allan-poe",
    "name": "Edgar Allan Poe",
    "aliases": [
      "Poe"
    ],
    "category": "writer",
    "era": "1809-1849",
    "difficulty": 1,
    "dossier": [
      "Born in Boston, Massachusetts, in 1809.",
      "Wrote the poem The Raven, published in 1845.",
      "Also wrote short stories including The Tell-Tale Heart and The Fall of the House of Usher.",
      "Often credited as a pioneer of the modern detective story with his character C. Auguste Dupin.",
      "Worked as a magazine editor and literary critic for much of his career.",
      "Struggled with poverty and debt for most of his life despite his growing fame.",
      "Was orphaned as a young child and raised by a Richmond merchant family named Allan, whose surname he adopted.",
      "Died in Baltimore, Maryland, in 1849, under circumstances that remain mysterious."
    ],
    "persona": "Gothic and melodramatic, speaks in ominous, rhythmic phrases, always ready to turn a simple detail into a tale of dread.",
    "revealFact": "The exact circumstances of his death remain a mystery. He was found delirious on the streets of Baltimore wearing clothes that were not his own, and no one has ever definitively explained why."
  },
  {
    "id": "hatshepsut",
    "name": "Hatshepsut",
    "aliases": [
      "Hatshepsut of Egypt"
    ],
    "category": "leader",
    "era": "c.1507-1458 BC",
    "difficulty": 2,
    "dossier": [
      "Was a queen of ancient Egypt's eighteenth dynasty who ruled as pharaoh in her own right.",
      "Initially served as regent for her young stepson Thutmose III before assuming full pharaonic power.",
      "Is regarded as one of the most successful female rulers in ancient Egyptian history.",
      "Was often depicted in official art wearing traditional male pharaonic regalia, including a false beard.",
      "Presided over a long period of peace and prosperous trade rather than military conquest.",
      "Sponsored a famous trading expedition to the land of Punt, bringing back gold, ebony, and incense trees.",
      "Commissioned extensive building projects, including her grand mortuary temple at Deir el-Bahari.",
      "Ruled Egypt for roughly two decades, one of the longest reigns of any female pharaoh.",
      "After her death, many of her monuments and images were defaced, possibly by Thutmose III's later order.",
      "Her mummy was rediscovered and identified in the twentieth century, confirming her historical reign."
    ],
    "persona": "Speaks with regal, unshakable confidence about her right to rule, as though the question of her legitimacy were beneath discussion.",
    "revealFact": "She commissioned official statues and reliefs of herself wearing the traditional false beard of a pharaoh, a symbolic way of visually claiming full kingly authority."
  },
  {
    "id": "johannes-kepler",
    "name": "Johannes Kepler",
    "aliases": [
      "Kepler"
    ],
    "category": "scientist",
    "era": "1571-1630",
    "difficulty": 2,
    "dossier": [
      "Was a German mathematician and astronomer born in Weil der Stadt.",
      "Worked as an assistant to the astronomer Tycho Brahe, later inheriting his detailed observational data.",
      "Formulated three laws of planetary motion describing how planets move around the sun.",
      "Discovered that planetary orbits are elliptical rather than perfectly circular.",
      "His laws provided crucial evidence supporting the heliocentric model of the solar system.",
      "Also made significant contributions to the field of optics, including the workings of the human eye.",
      "Worked as an imperial mathematician for Holy Roman Emperor Rudolf II.",
      "His mother was tried for witchcraft, and he spent years working to defend her and secure her release.",
      "His laws of planetary motion later provided a key foundation for Isaac Newton's theory of gravity.",
      "Is considered one of the key figures of the scientific revolution."
    ],
    "persona": "Speaks with intense, almost mystical wonder about the mathematical harmony he sees in the movement of the planets.",
    "revealFact": "He spent several years of his life working to legally defend his own mother against formal charges of witchcraft, successfully preventing her execution."
  },
  {
    "id": "johann-sebastian-bach",
    "name": "Johann Sebastian Bach",
    "aliases": [
      "Bach"
    ],
    "category": "musician",
    "era": "1685-1750",
    "difficulty": 1,
    "dossier": [
      "Born in Eisenach, in what is now Germany, in 1685.",
      "Composed the Brandenburg Concertos and The Well-Tempered Clavier.",
      "Worked for much of his career as a church organist and choir director in Leipzig.",
      "Came from a large family of professional musicians spanning generations.",
      "Fathered 20 children, several of whom also became notable composers.",
      "Wrote enormous amounts of music for church services, including cantatas performed weekly.",
      "His music fell out of fashion after his death and was revived decades later, partly by Felix Mendelssohn.",
      "Died in Leipzig, in what is now Germany, in 1750."
    ],
    "persona": "Devout and disciplined, speaks about music as a form of worship and structure, proud of a large family that is nearly as musical as he is.",
    "revealFact": "His music was largely forgotten for about 80 years after his death until composer Felix Mendelssohn led a revival performance of his St Matthew Passion in 1829."
  },
  {
    "id": "matsuo-basho",
    "name": "Matsuo Basho",
    "aliases": [
      "Basho"
    ],
    "category": "writer",
    "era": "1644-1694",
    "difficulty": 3,
    "dossier": [
      "Born near Ueno, Japan, in 1644.",
      "The most famous master of the Japanese haiku poetic form.",
      "Wrote Oku no Hosomichi, or The Narrow Road to the Deep North, a travel journal mixing prose and haiku.",
      "Traveled extensively on foot across Japan, recording his impressions in short poems.",
      "His most famous haiku describes an old pond and the sound of a frog jumping in.",
      "Lived simply, sometimes as something close to a wandering poet monk.",
      "Studied Zen Buddhism, which shaped the quiet, observant style of his poetry.",
      "Died in Osaka, Japan, in 1694, while on one of his travels."
    ],
    "persona": "Spare and contemplative, answers in small, quiet images, a frog, a pond, a single leaf, letting silence do as much work as words.",
    "revealFact": "He died while traveling, true to the wandering poet's life he chose, and even composed a farewell poem on his deathbed reflecting on dreams still crossing withered fields."
  },
  {
    "id": "antonie-van-leeuwenhoek",
    "name": "Antonie van Leeuwenhoek",
    "aliases": [
      "van Leeuwenhoek",
      "Leeuwenhoek"
    ],
    "category": "scientist",
    "era": "1632-1723",
    "difficulty": 3,
    "dossier": [
      "Was born in Delft, in the Dutch Republic, and worked for much of his life as a cloth merchant.",
      "Taught himself to grind and polish lenses of remarkable quality, without formal scientific training.",
      "Built simple but powerful microscopes far superior to most instruments of his era.",
      "Was the first person to observe and describe single celled organisms, which he called animalcules.",
      "Was the first to observe bacteria, though the term itself did not yet exist.",
      "Also made detailed observations of red blood cells, sperm cells, and muscle fibers.",
      "Communicated his findings through detailed letters sent to the Royal Society of London.",
      "Was elected a fellow of the Royal Society despite having no university education.",
      "Kept many of his best lens grinding techniques secret during his lifetime.",
      "Is widely regarded as the father of microbiology."
    ],
    "persona": "Speaks with humble, meticulous wonder, endlessly delighted by the tiny living world visible only through his lenses.",
    "revealFact": "He kept his best techniques for grinding incredibly precise lenses a closely guarded secret his entire life, and scientists were unable to match the quality of his simple microscopes for many decades after his death."
  },
  {
    "id": "miguel-de-cervantes",
    "name": "Miguel de Cervantes",
    "aliases": [
      "Cervantes"
    ],
    "category": "writer",
    "era": "1547-1616",
    "difficulty": 2,
    "dossier": [
      "Born near Madrid, Spain, in 1547.",
      "Wrote Don Quixote, published in two parts in 1605 and 1615.",
      "Don Quixote is widely regarded as one of the first modern novels.",
      "Served as a soldier and was wounded at the Battle of Lepanto in 1571.",
      "Was captured by pirates and held as a slave in Algiers for about five years.",
      "Worked various government jobs, including tax collector, before his writing brought him fame.",
      "Lost the use of his left hand at the Battle of Lepanto, later nicknamed the One Handed Man of Lepanto.",
      "Died in Madrid, Spain, in 1616, reportedly around the same time as William Shakespeare."
    ],
    "persona": "Wry and adventurous, tells stories of chivalry and misadventure with the knowing smile of someone who has actually lived a swashbuckling life.",
    "revealFact": "He was captured by Barbary pirates and enslaved in Algiers for nearly five years, an ordeal that shaped several later episodes in his fiction."
  },
  {
    "id": "carl-linnaeus",
    "name": "Carl Linnaeus",
    "aliases": [
      "Linnaeus",
      "Carl von Linne"
    ],
    "category": "scientist",
    "era": "1707-1778",
    "difficulty": 2,
    "dossier": [
      "Was a Swedish botanist and zoologist born in Rashult, Sweden.",
      "Developed the modern system of binomial nomenclature for naming species.",
      "His two part naming system, genus and species, is still used by scientists worldwide today.",
      "Published Systema Naturae, a major work classifying plants, animals, and minerals.",
      "Traveled extensively through Scandinavia to study and catalog local plant life.",
      "Trained many students who traveled the world collecting specimens on his behalf.",
      "Organized living things into a hierarchical classification system of kingdoms, classes, orders, and species.",
      "Was ennobled by the Swedish crown later in life, adding von to his surname.",
      "His classification framework became the foundation of modern taxonomy.",
      "Is often called the father of modern taxonomy."
    ],
    "persona": "Speaks with orderly, cataloging precision, seemingly unable to resist classifying everything he encounters.",
    "revealFact": "The naming system he created is so foundational that essentially every scientifically described plant and animal species on Earth today still carries a two part Latin name following his method."
  },
  {
    "id": "qi-baishi",
    "name": "Qi Baishi",
    "aliases": [
      "Chi Pai-shih"
    ],
    "category": "artist",
    "era": "1864-1957",
    "difficulty": 3,
    "dossier": [
      "Born in Hunan province, China, in 1864, to a peasant farming family.",
      "Trained first as a carpenter and woodcarver before becoming a painter.",
      "Became one of the most celebrated Chinese ink painters of the 20th century.",
      "Famous for lively, economical brush paintings of shrimp, crabs, and everyday plants.",
      "Did not achieve wide fame until relatively late in life.",
      "Named an honorary member of art academies and given state honors in the People's Republic of China.",
      "Continued painting into his 90s, remaining prolific until near the end of his life.",
      "Died in Beijing in 1957."
    ],
    "persona": "Humble and playful, speaks fondly of shrimp and crabs like old friends, proud that he rose from a carpenter's bench to a master's brush.",
    "revealFact": "He started his working life as a carpenter and woodcarver in rural China and only became a full time painter later, after decades of self study."
  },
  {
    "id": "roald-amundsen",
    "name": "Roald Amundsen",
    "aliases": [
      "Amundsen"
    ],
    "category": "explorer",
    "era": "1872-1928",
    "difficulty": 2,
    "dossier": [
      "Was born near Oslo, Norway, and trained extensively for polar expeditions from a young age.",
      "Led the first expedition to successfully navigate the Northwest Passage by ship, completed in 1906.",
      "Led the first expedition to reach the geographic South Pole, arriving in December 1911.",
      "Beat British explorer Robert Falcon Scott's rival expedition to the South Pole by roughly a month.",
      "Used sled dogs and careful logistical planning, which contributed heavily to his expedition's success.",
      "Later led an expedition that was among the first to fly over the North Pole by airship in 1926.",
      "Was a meticulous planner who studied polar survival techniques from Inuit communities.",
      "Disappeared in 1928 while participating in a rescue mission for another polar explorer.",
      "His body was never recovered after his final flight over the Arctic.",
      "Is regarded as one of the greatest and most successful polar explorers in history."
    ],
    "persona": "Speaks with calm, meticulous confidence, treating careful preparation as more important than heroic risk taking.",
    "revealFact": "He disappeared in 1928 while flying a rescue mission to save a rival Italian explorer whose airship had crashed in the Arctic, dying in the same unforgiving region where he had earned his greatest triumphs."
  },
  {
    "id": "abebe-bikila",
    "name": "Abebe Bikila",
    "aliases": [
      "Bikila"
    ],
    "category": "athlete",
    "era": "1932-1973",
    "difficulty": 3,
    "dossier": [
      "Born in Jato, Ethiopia, in 1932.",
      "Won the marathon at the 1960 Rome Olympics running barefoot.",
      "Became the first Black African athlete to win an Olympic gold medal.",
      "Won the marathon again at the 1964 Tokyo Olympics, this time wearing shoes.",
      "Served as a member of the Ethiopian Imperial Guard.",
      "Set a world record time in his 1960 barefoot marathon victory.",
      "Was paralyzed from the waist down after a car accident in 1969, but continued competing in archery and table tennis from a wheelchair.",
      "Died in Addis Ababa, Ethiopia, in 1973."
    ],
    "persona": "Calm and steady, describes covering huge distances with almost meditative patience, unbothered by having no shoes on his feet.",
    "revealFact": "He won his first Olympic marathon gold medal in 1960 running the entire 26.2 miles completely barefoot, a choice he made because his new shoes did not fit comfortably."
  },
  {
    "id": "emily-dickinson",
    "name": "Emily Dickinson",
    "aliases": [
      "Dickinson"
    ],
    "category": "writer",
    "era": "1830-1886",
    "difficulty": 2,
    "dossier": [
      "Born in Amherst, Massachusetts, in 1830.",
      "Wrote nearly 1,800 poems, most published only after her death.",
      "Fewer than a dozen of her poems were published while she was alive.",
      "Lived a famously private, reclusive life in her family home in Amherst.",
      "Wrote in short, tightly structured stanzas using unconventional punctuation like dashes.",
      "Her poems often explore death, immortality, and the natural world.",
      "Corresponded by letter with several literary figures despite rarely leaving home.",
      "Died in Amherst, Massachusetts, in 1886."
    ],
    "persona": "Hushed and private, speaks in short, slanting bursts of insight, as though letting the listener peek through a mostly closed door.",
    "revealFact": "Fewer than a dozen of her nearly 1,800 poems were published during her lifetime. Almost her entire body of work was discovered and published only after she died."
  },
  {
    "id": "gregor-mendel",
    "name": "Gregor Mendel",
    "aliases": [
      "Mendel"
    ],
    "category": "scientist",
    "era": "1822-1884",
    "difficulty": 2,
    "dossier": [
      "Was an Augustinian friar and scientist working in a monastery in Brno, in the present day Czech Republic.",
      "Conducted extensive breeding experiments with pea plants over roughly eight years.",
      "Discovered patterns of inheritance that became the foundation of the field of genetics.",
      "Identified the concepts now known as dominant and recessive traits.",
      "Formulated what became known as Mendel's laws of inheritance.",
      "Published his findings in 1866, but the work was largely ignored during his lifetime.",
      "His research was rediscovered and recognized as groundbreaking around 1900, decades after his death.",
      "Later served as abbot of his monastery, which reduced his time for scientific research.",
      "Is now widely known as the father of modern genetics.",
      "His pea plant experiments remain a standard example taught in biology education worldwide."
    ],
    "persona": "Speaks with patient, methodical calm, as if still carefully counting pea plants in a garden.",
    "revealFact": "His groundbreaking work on genetics was almost completely ignored for over three decades after he published it, and he died without knowing how influential it would eventually become."
  },
  {
    "id": "wilma-rudolph",
    "name": "Wilma Rudolph",
    "aliases": [
      "Rudolph"
    ],
    "category": "athlete",
    "era": "1940-1994",
    "difficulty": 2,
    "dossier": [
      "Born in Saint Bethlehem, Tennessee, in 1940.",
      "Won three gold medals in track and field at the 1960 Rome Olympics.",
      "Was the first American woman to win three gold medals in a single Olympics.",
      "Overcame childhood polio that left her wearing a leg brace for several years.",
      "Was one of 22 children in a large family.",
      "Became a major inspiration and advocate for women in sports after her Olympic success.",
      "Later worked as a teacher and coach and founded a foundation to support young athletes.",
      "Died in Brentwood, Tennessee, in 1994."
    ],
    "persona": "Determined and encouraging, speaks about overcoming hardship with a coach's steady optimism, always rooting for the underdog.",
    "revealFact": "As a child she wore a leg brace and could not walk properly due to polio and scarlet fever, yet she went on to become the fastest woman in the world at the 1960 Olympics."
  },
  {
    "id": "lu-xun",
    "name": "Lu Xun",
    "aliases": [
      "Zhou Shuren"
    ],
    "category": "writer",
    "era": "1881-1936",
    "difficulty": 3,
    "dossier": [
      "Born Zhou Shuren in Shaoxing, China, in 1881.",
      "Widely regarded as the founder of modern Chinese literature.",
      "Wrote The True Story of Ah Q, a satirical novella criticizing Chinese society.",
      "Originally trained in medicine in Japan before turning to writing.",
      "Wrote in vernacular Chinese rather than classical literary Chinese, helping modernize the language of fiction.",
      "Used sharp satire to criticize tradition, superstition, and social weakness in early 20th century China.",
      "His stories were later widely taught in Chinese schools.",
      "Died in Shanghai, China, in 1936."
    ],
    "persona": "Biting and satirical, uses sharp irony to needle old customs and hypocrisy, always circling back to the state of his country.",
    "revealFact": "He originally studied medicine in Japan and only turned to writing after deciding that healing China's spirit mattered more than healing its bodies."
  },
  {
    "id": "edith-piaf",
    "name": "Edith Piaf",
    "aliases": [
      "Piaf"
    ],
    "category": "musician",
    "era": "1915-1963",
    "difficulty": 2,
    "dossier": [
      "Born in Paris, France, in 1915.",
      "Known as one of France's greatest and most beloved singers.",
      "Recorded the signature song La Vie en Rose, which she also helped write.",
      "Grew up in poverty and reportedly spent part of her childhood in her grandmother's brothel.",
      "Was discovered singing on the streets of Paris by a nightclub owner who gave her the stage name Piaf, French slang for sparrow.",
      "Suffered several serious health problems and injuries later in life, including car accidents.",
      "Her powerful voice and dramatic delivery made her a symbol of French popular song, called chanson.",
      "Died near Paris, France, in 1963."
    ],
    "persona": "Fierce and heartbroken all at once, sings her sorrow with defiant pride, insisting she regrets nothing even when everything has gone wrong.",
    "revealFact": "Her stage name Piaf is French slang for little sparrow, given to her by the nightclub owner who discovered her singing on a Paris street corner."
  },
  {
    "id": "frederick-douglass",
    "name": "Frederick Douglass",
    "aliases": [
      "Douglass"
    ],
    "category": "leader",
    "era": "1818-1895",
    "difficulty": 1,
    "dossier": [
      "Was born into slavery in Maryland and taught himself to read as a child, against the law of the time.",
      "Escaped slavery in 1838 and fled to the northern United States.",
      "Became a leading voice of the abolitionist movement through his powerful oratory.",
      "Published a bestselling autobiography detailing his life as an enslaved person.",
      "Founded and edited an abolitionist newspaper called the North Star.",
      "Advised President Abraham Lincoln during the Civil War on issues affecting Black Americans.",
      "Advocated for both the abolition of slavery and women's suffrage.",
      "Held several federal government appointments after the war, a rare achievement for a Black American at the time.",
      "Continued speaking and writing on civil rights until his death in 1895.",
      "Is considered one of the most important American reformers and orators of the nineteenth century."
    ],
    "persona": "Speaks with commanding, precise eloquence, choosing every word as if addressing a packed hall.",
    "revealFact": "He taught himself to read and write in secret as an enslaved child, partly by trading bread for reading lessons from poor white children in his neighborhood."
  },
  {
    "id": "george-washington-carver",
    "name": "George Washington Carver",
    "aliases": [
      "Carver"
    ],
    "category": "inventor",
    "era": "c.1864-1943",
    "difficulty": 1,
    "dossier": [
      "Was born into slavery in Missouri shortly before slavery was abolished in the United States.",
      "Became the first Black student and later the first Black faculty member at Iowa State Agricultural College.",
      "Joined the faculty of the Tuskegee Institute in Alabama, where he taught and researched for decades.",
      "Promoted crop rotation, encouraging farmers to plant peanuts and sweet potatoes to restore soil health after cotton depleted it.",
      "Developed hundreds of practical products derived from peanuts, sweet potatoes, and soybeans.",
      "Contrary to popular myth, he did not invent peanut butter, though he did develop many other peanut based products.",
      "Advocated widely for sustainable farming practices among Southern farmers, many of them formerly enslaved.",
      "Advised government officials and business leaders on agricultural science and crop diversification.",
      "Received numerous honors during his lifetime, including consultation requests from major industrial leaders.",
      "Is remembered as a pioneering agricultural scientist and inventor who transformed Southern farming practices."
    ],
    "persona": "Speaks with gentle, patient warmth, treating the humble peanut and the soil beneath it with genuine reverence.",
    "revealFact": "Despite the popular myth, he did not invent peanut butter, which existed before his work, though he did develop over three hundred different practical products derived from peanuts."
  },
  {
    "id": "duke-ellington",
    "name": "Duke Ellington",
    "aliases": [
      "Ellington"
    ],
    "category": "musician",
    "era": "1899-1974",
    "difficulty": 2,
    "dossier": [
      "Born Edward Kennedy Ellington in Washington, D.C., in 1899.",
      "Led his own jazz orchestra for nearly fifty years.",
      "Composed thousands of pieces, including Mood Indigo and Take the A Train.",
      "His orchestra was the house band at the Cotton Club in Harlem for several years.",
      "Blended jazz with classical structure, elevating jazz composition as a serious art form.",
      "Toured internationally with his orchestra for decades.",
      "Received the Presidential Medal of Freedom in 1969.",
      "Died in New York City in 1974."
    ],
    "persona": "Suave and sophisticated, speaks with the polish of a bandleader who has spent a lifetime introducing songs from a stage.",
    "revealFact": "His signature theme song, Take the A Train, was actually written by his longtime collaborator Billy Strayhorn, using subway directions Ellington gave him to reach his house in Harlem."
  },
  {
    "id": "naguib-mahfouz",
    "name": "Naguib Mahfouz",
    "aliases": [
      "Mahfouz"
    ],
    "category": "writer",
    "era": "1911-2006",
    "difficulty": 3,
    "dossier": [
      "Born in Cairo, Egypt, in 1911.",
      "Won the Nobel Prize in Literature in 1988, the first Arabic language writer to do so.",
      "Wrote the Cairo Trilogy, following one Egyptian family across generations.",
      "Worked for decades as a civil servant in the Egyptian government while writing.",
      "Wrote more than 30 novels and hundreds of short stories over his career.",
      "Survived a stabbing attack in 1994 by an extremist who objected to one of his novels.",
      "Set most of his fiction in the streets and neighborhoods of Cairo.",
      "Died in Cairo, Egypt, in 2006."
    ],
    "persona": "Patient and observant, narrates the small daily dramas of a Cairo neighborhood as though the whole of human life can be found on one street corner.",
    "revealFact": "In 1994, at age 82, he was stabbed in the neck by an extremist who had never actually read the novel he objected to. He survived and continued writing for another decade."
  },
  {
    "id": "thomas-edison",
    "name": "Thomas Edison",
    "aliases": [
      "Edison"
    ],
    "category": "inventor",
    "era": "1847-1931",
    "difficulty": 1,
    "dossier": [
      "Was born in Milan, Ohio, and had little formal schooling.",
      "Set up an industrial research laboratory in Menlo Park, New Jersey, one of the first of its kind.",
      "Developed a commercially practical incandescent light bulb in 1879.",
      "Held over a thousand patents in the United States during his lifetime.",
      "Invented the phonograph, one of the first devices able to record and play back sound.",
      "Developed early motion picture technology, including an early film camera called the Kinetograph.",
      "Championed the direct current, or DC, electrical system, competing against Tesla's AC system.",
      "Founded companies that eventually became part of General Electric.",
      "Employed a large staff of researchers and technicians in his laboratories, an early industrial research model.",
      "Is remembered as one of history's most prolific inventors."
    ],
    "persona": "Speaks with brisk, practical confidence, treating failed experiments as simply useful data on the road to success.",
    "revealFact": "He reportedly tested thousands of different materials for a durable light bulb filament, later saying he had not failed but had successfully found thousands of materials that did not work."
  },
  {
    "id": "alexander-the-great",
    "name": "Alexander the Great",
    "aliases": [
      "Alexander III of Macedon",
      "Alexander"
    ],
    "category": "leader",
    "era": "356-323 BC",
    "difficulty": 1,
    "dossier": [
      "Became king of Macedon at age twenty after his father Philip II was assassinated.",
      "Was tutored as a boy by the philosopher Aristotle.",
      "Led a military campaign that conquered the Persian Empire in just over a decade.",
      "Never lost a major battle in his life, despite frequently being outnumbered.",
      "Founded more than twenty cities across his empire, many named Alexandria after himself.",
      "Pushed his army as far east as India before troops refused to march further.",
      "Blended Greek and local cultures across his territories, spreading Hellenistic influence widely.",
      "Died in Babylon in 323 BC at age thirty two, possibly from fever or illness.",
      "His empire fractured among his generals shortly after his death.",
      "Is considered one of history's most successful military commanders."
    ],
    "persona": "Speaks with restless, boundless ambition, always eager to talk about the next campaign rather than dwell on the past.",
    "revealFact": "He named more than a dozen cities Alexandria across his empire, and one of them, in Egypt, became one of the ancient world's greatest centers of learning."
  },
  {
    "id": "mary-kingsley",
    "name": "Mary Kingsley",
    "aliases": [
      "Kingsley"
    ],
    "category": "explorer",
    "era": "1862-1900",
    "difficulty": 3,
    "dossier": [
      "Was born in Islington, London, and had little formal education as a young woman.",
      "Cared for her ailing parents for years before beginning her travels after their deaths.",
      "Traveled to West Africa in the 1890s, a journey highly unusual for a European woman traveling largely alone at the time.",
      "Collected fish and insect specimens for the British Museum during her expeditions.",
      "Traveled through remote regions of present day Gabon, encountering communities rarely visited by Europeans.",
      "Insisted on wearing full Victorian dress throughout her travels, which she credited with once saving her life.",
      "Wrote popular books describing her travels and criticizing some colonial attitudes of her era.",
      "Became a respected voice on West African trade, culture, and colonial policy in Britain.",
      "Volunteered as a nurse during the Second Boer War in South Africa.",
      "Died of typhoid fever in 1900 while nursing prisoners of war in South Africa."
    ],
    "persona": "Speaks with dry, unflappable British wit, treating swamps, crocodiles, and danger as simply inconvenient obstacles to good manners.",
    "revealFact": "She once fell into a deep game pit trap while trekking through the forest, and credited her thick layered Victorian skirts with cushioning the fall enough to save her from serious injury."
  },
  {
    "id": "wassily-kandinsky",
    "name": "Wassily Kandinsky",
    "aliases": [
      "Kandinsky"
    ],
    "category": "artist",
    "era": "1866-1944",
    "difficulty": 3,
    "dossier": [
      "Born in Moscow, Russia, in 1866.",
      "Widely credited as a pioneer of abstract art in the early 20th century.",
      "Believed color and form could express music and emotion without depicting real objects.",
      "Reported experiencing synesthesia, perceiving colors when he heard music.",
      "Taught at the Bauhaus school in Germany during the 1920s.",
      "Wrote an influential book called Concerning the Spiritual in Art.",
      "Left Germany after the Nazis closed the Bauhaus and later became a French citizen.",
      "Died near Paris, France, in 1944."
    ],
    "persona": "Speaks about painting the way a conductor talks about a symphony, treating color, shape, and sound as the same language.",
    "revealFact": "He reportedly experienced synesthesia, a condition in which he perceived specific colors whenever he heard certain musical notes, which shaped his abstract style."
  },
  {
    "id": "mary-shelley",
    "name": "Mary Shelley",
    "aliases": [
      "Mary Wollstonecraft Shelley"
    ],
    "category": "writer",
    "era": "1797-1851",
    "difficulty": 2,
    "dossier": [
      "Born in London, England, in 1797, the daughter of philosophers William Godwin and Mary Wollstonecraft.",
      "Wrote Frankenstein, published in 1818, when she was only 20 years old.",
      "Conceived the idea for Frankenstein during a ghost story competition at a house near Lake Geneva.",
      "That gathering also included the poet Lord Byron and her future husband, poet Percy Bysshe Shelley.",
      "Frankenstein is widely considered one of the first works of science fiction.",
      "Edited and promoted her husband's poetry after his early death.",
      "Also wrote other novels and travel writing later in her career.",
      "Died in London, England, in 1851."
    ],
    "persona": "Curious and a little gothic, fascinated by the boundary between life and death, science and horror, speaking with the seriousness of a teenager who accidentally invented a genre.",
    "revealFact": "She wrote Frankenstein when she was just 18 to 20 years old, after coming up with the idea during a rainy summer ghost story contest with Lord Byron and Percy Shelley."
  },
  {
    "id": "louis-pasteur",
    "name": "Louis Pasteur",
    "aliases": [
      "Pasteur"
    ],
    "category": "scientist",
    "era": "1822-1895",
    "difficulty": 1,
    "dossier": [
      "Was a French chemist and microbiologist born in Dole, France.",
      "Developed the germ theory of disease, showing microorganisms cause many illnesses.",
      "Invented the process of pasteurization, using heat to kill harmful bacteria in liquids like milk and wine.",
      "Disproved the theory of spontaneous generation through careful experiments.",
      "Developed vaccines for anthrax and rabies.",
      "Successfully treated a human rabies patient with his vaccine for the first time in 1885.",
      "Founded the Pasteur Institute in Paris, which remains a major center of biomedical research.",
      "His work laid the foundation for modern microbiology and immunology.",
      "Helped save major French industries, including wine and silk production, through his research.",
      "Is considered one of the founders of modern medicine and public health."
    ],
    "persona": "Speaks with meticulous, evidence-driven confidence, treating unseen microbes as an obvious and urgent concern.",
    "revealFact": "The process that bears his name, pasteurization, was originally developed not for milk but to solve a French wine industry crisis by killing the microbes that were spoiling wine during transport."
  },
  {
    "id": "babe-ruth",
    "name": "Babe Ruth",
    "aliases": [
      "George Herman Ruth",
      "the Sultan of Swat"
    ],
    "category": "athlete",
    "era": "1895-1948",
    "difficulty": 1,
    "dossier": [
      "Born George Herman Ruth in Baltimore, Maryland, in 1895.",
      "One of the most famous baseball players in American history.",
      "Played most of his career for the New York Yankees.",
      "Started his career as a star pitcher for the Boston Red Sox before becoming a full time hitter.",
      "Hit 714 home runs over his career, a record that stood for decades.",
      "Was sold from the Red Sox to the Yankees in a deal later blamed for the Red Sox's championship drought, called the Curse of the Bambino.",
      "Helped popularize baseball as America's national pastime in the 1920s.",
      "Died in New York City in 1948."
    ],
    "persona": "Larger than life and boisterous, loves food, fans, and swinging for the fences, treating every story like a legend already in the making.",
    "revealFact": "He was originally a star pitcher, not a hitter, before the Boston Red Sox converted him into a full time slugger, a move that changed the course of baseball history."
  },
  {
    "id": "henri-matisse",
    "name": "Henri Matisse",
    "aliases": [
      "Matisse"
    ],
    "category": "artist",
    "era": "1869-1954",
    "difficulty": 2,
    "dossier": [
      "Born in northern France in 1869.",
      "A leading figure of Fauvism, an early 20th century movement known for bold, unnatural color.",
      "Painted The Dance and The Red Studio among his celebrated works.",
      "Late in life, when illness limited his ability to paint, he created large cut paper collages instead.",
      "Designed the interior, including stained glass windows, of the Chapel of the Rosary in Vence, France.",
      "Had a long friendly rivalry with fellow painter Pablo Picasso.",
      "Worked in painting, sculpture, printmaking, and paper cutouts across his career.",
      "Died in Nice, France, in 1954."
    ],
    "persona": "Sunny and sensory, obsessed with pure color and simple joyful shapes, especially in his later years cutting bright paper from a wheelchair.",
    "revealFact": "Late in life, arthritis and illness left him largely confined to a wheelchair, so he began making art by cutting shapes from painted paper with scissors instead of a brush."
  },
  {
    "id": "abraham-lincoln",
    "name": "Abraham Lincoln",
    "aliases": [
      "Lincoln",
      "Honest Abe"
    ],
    "category": "leader",
    "era": "1809-1865",
    "difficulty": 1,
    "dossier": [
      "Was born in a log cabin in Kentucky and largely self educated.",
      "Worked as a lawyer in Illinois before entering politics.",
      "Was elected the sixteenth President of the United States in 1860.",
      "His election prompted several Southern states to secede, leading to the Civil War.",
      "Issued the Emancipation Proclamation in 1863, declaring enslaved people in Confederate states free.",
      "Delivered the Gettysburg Address in 1863, a brief speech that became one of history's most quoted.",
      "Led the Union through the Civil War and preserved the United States as one nation.",
      "Supported passage of the Thirteenth Amendment, which abolished slavery nationwide.",
      "Was assassinated by John Wilkes Booth at Ford's Theatre in Washington in April 1865.",
      "Is widely regarded as one of the greatest American presidents."
    ],
    "persona": "Speaks with folksy, homespun humor and careful, deliberate sentences, often illustrating a point with a plain story.",
    "revealFact": "He is the only American president to hold a patent, for a device to help lift boats over shoals, though it was never manufactured."
  },
  {
    "id": "hypatia",
    "name": "Hypatia",
    "aliases": [
      "Hypatia of Alexandria"
    ],
    "category": "scientist",
    "era": "c.360-415",
    "difficulty": 3,
    "dossier": [
      "Was a mathematician, astronomer, and philosopher who lived in Alexandria, Egypt.",
      "Was the daughter of the mathematician Theon of Alexandria, who trained her from a young age.",
      "Taught mathematics and philosophy at a school in Alexandria, attracting students from prominent families.",
      "Edited and wrote commentaries on major mathematical works, including texts on geometry and algebra.",
      "Is credited with helping improve tools such as the astrolabe, used for astronomical measurements.",
      "Became a respected public intellectual and advisor in the politically turbulent city of Alexandria.",
      "Lived during a period of intense religious and political conflict in the late Roman Empire.",
      "Was murdered by a mob in 415, in an attack widely linked to the political and religious tensions of the era.",
      "Her death is often cited as a symbolic marker of declining classical scholarship in the ancient world.",
      "Is remembered as one of the earliest known women to make a significant mark in mathematics and astronomy."
    ],
    "persona": "Speaks with calm, rational clarity, treating philosophy and mathematics as two branches of the same pursuit of truth.",
    "revealFact": "None of her original writings survive today. Almost everything known about her mathematical work comes from the writings and letters of her students and contemporaries."
  },
  {
    "id": "fred-astaire",
    "name": "Fred Astaire",
    "aliases": [
      "Astaire"
    ],
    "category": "entertainer",
    "era": "1899-1987",
    "difficulty": 2,
    "dossier": [
      "Born in Omaha, Nebraska, in 1899.",
      "Widely regarded as one of the greatest dancers in film history.",
      "Starred in a famous series of musical films with dance partner Ginger Rogers.",
      "Insisted on filming his dance numbers in full body, unedited takes to show his real skill.",
      "Began performing with his sister Adele in a vaudeville dance act as a child.",
      "Choreographed much of his own film dance work throughout his career.",
      "Continued performing well into his seventies, including television specials.",
      "Died in Los Angeles, California, in 1987."
    ],
    "persona": "Light on his feet and impeccably polished, speaks with easy charm, as if any conversation might break into a dance number at any moment.",
    "revealFact": "An early studio screen test report on him reportedly read that he could not act, was slightly bald, and could dance a little, before he went on to become one of film's greatest dancers."
  },
  {
    "id": "gabriel-garcia-marquez",
    "name": "Gabriel Garcia Marquez",
    "aliases": [
      "Garcia Marquez",
      "Gabo"
    ],
    "category": "writer",
    "era": "1927-2014",
    "difficulty": 2,
    "dossier": [
      "Born in Aracataca, Colombia, in 1927.",
      "Wrote One Hundred Years of Solitude, published in 1967.",
      "Also wrote Love in the Time of Cholera.",
      "Won the Nobel Prize in Literature in 1982.",
      "A leading figure of the literary style known as magical realism.",
      "Worked as a journalist in Colombia and Europe before his fiction made him famous.",
      "His fictional town of Macondo appears across several of his novels.",
      "Died in Mexico City in 2014."
    ],
    "persona": "Speaks in lush, magical detail, treating impossible events like flying ships or endless rain as perfectly ordinary facts of daily life.",
    "revealFact": "He worked for years as a journalist before writing his most famous novel, and he said he wrote One Hundred Years of Solitude in an 18 month burst while his family lived off credit."
  },
  {
    "id": "robert-falcon-scott",
    "name": "Robert Falcon Scott",
    "aliases": [
      "Scott",
      "Captain Scott"
    ],
    "category": "explorer",
    "era": "1868-1912",
    "difficulty": 2,
    "dossier": [
      "Was born in Devonport, England, and served as an officer in the British Royal Navy.",
      "Led two major expeditions to Antarctica in the early twentieth century.",
      "Led the Terra Nova Expedition aiming to be the first to reach the geographic South Pole.",
      "Reached the South Pole in January 1912, only to discover Roald Amundsen's team had arrived first.",
      "His entire five man polar party died during the difficult return journey from the pole.",
      "His final journal entries, found later, expressed grief and stoic resolve as his team faced death.",
      "The tragedy became a defining and widely mourned story in early twentieth century Britain.",
      "His expedition still produced valuable scientific data on Antarctic geology, biology, and weather.",
      "Debate continues among historians over what combination of factors caused the expedition's fatal delays.",
      "Is remembered as a tragic but celebrated figure in the history of polar exploration."
    ],
    "persona": "Speaks with formal, stoic resolve, choosing dignity and duty over despair even as circumstances grow dire.",
    "revealFact": "His final diary entries, discovered with his body months after his death, included a message asking the British public to look after the families of his men, a request that helped make his tragic story a national sensation."
  },
  {
    "id": "chinua-achebe",
    "name": "Chinua Achebe",
    "aliases": [
      "Achebe"
    ],
    "category": "writer",
    "era": "1930-2013",
    "difficulty": 2,
    "dossier": [
      "Born in Ogidi, in what is now Nigeria, in 1930.",
      "Wrote Things Fall Apart, published in 1958.",
      "Things Fall Apart is one of the most widely read novels in African literature.",
      "Wrote in English but drew heavily on Igbo culture, proverbs, and oral tradition.",
      "Worked as a broadcaster for the Nigerian Broadcasting Corporation earlier in his career.",
      "Later taught literature at universities in the United States.",
      "Wrote critically about colonialism and its effects on African societies.",
      "Died in Boston, Massachusetts, in 2013."
    ],
    "persona": "Measured and proverb loving, likes to answer a question with an old Igbo saying before circling back to the point.",
    "revealFact": "His novel Things Fall Apart has sold more than 20 million copies and been translated into over 50 languages, making it one of the most widely read African novels ever written."
  },
  {
    "id": "peter-sellers",
    "name": "Peter Sellers",
    "aliases": [
      "Sellers"
    ],
    "category": "entertainer",
    "era": "1925-1980",
    "difficulty": 2,
    "dossier": [
      "Born in Southsea, England, in 1925.",
      "Starred in the Pink Panther film series as the bumbling Inspector Clouseau.",
      "Played three different roles in the film Dr. Strangelove in 1964.",
      "Began his career on the British radio comedy program The Goon Show.",
      "Known for his ability to disappear completely into a huge range of comic characters and voices.",
      "Struggled with his own sense of identity offstage, reportedly saying he had no real personality of his own.",
      "Starred in his final major film, Being There, in 1979.",
      "Died in London, England, in 1980."
    ],
    "persona": "Chameleonic and a little melancholy underneath the comedy, slips easily into different voices and accents mid conversation, as if never quite settled as himself.",
    "revealFact": "In the film Dr. Strangelove he played three entirely different characters, the American president, a British officer, and the title character, and was originally meant to play a fourth role too."
  },
  {
    "id": "nicolaus-copernicus",
    "name": "Nicolaus Copernicus",
    "aliases": [
      "Copernicus"
    ],
    "category": "scientist",
    "era": "1473-1543",
    "difficulty": 1,
    "dossier": [
      "Was a Renaissance mathematician and astronomer born in Torun, in present day Poland.",
      "Proposed a heliocentric model of the universe, placing the sun rather than Earth at the center.",
      "His model challenged the long dominant Earth-centered view inherited from ancient astronomy.",
      "Worked for decades on his theory before publishing it, partly out of caution about its reception.",
      "Published his major work, On the Revolutions of the Heavenly Spheres, in the year of his death, 1543.",
      "Also worked as a church canon, physician, and economist during his career.",
      "His ideas were controversial and were formally condemned by the Catholic Church decades after his death.",
      "His heliocentric theory was later confirmed and expanded upon by Galileo and Kepler.",
      "His work is considered the starting point of the Scientific Revolution.",
      "The shift in scientific thinking his ideas caused is sometimes called the Copernican Revolution."
    ],
    "persona": "Speaks with careful, deliberate caution, weighing every astronomical claim against decades of patient observation.",
    "revealFact": "He delayed publishing his heliocentric theory for so long, partly fearing ridicule, that his major book was only printed as he lay on his deathbed, and legend holds he saw the first printed copy only hours before he died."
  },
  {
    "id": "josephine-baker",
    "name": "Josephine Baker",
    "aliases": [
      "Baker"
    ],
    "category": "entertainer",
    "era": "1906-1975",
    "difficulty": 2,
    "dossier": [
      "Born in St. Louis, Missouri, in 1906.",
      "Became a major dance and singing star in Paris in the 1920s.",
      "Famous for her performances at the Folies Bergere theatre in Paris.",
      "Became a French citizen and worked for the French Resistance during World War Two, smuggling messages.",
      "Received French military honors for her wartime intelligence work.",
      "Refused to perform for segregated audiences after returning to tour the United States.",
      "Spoke at the March on Washington in 1963 alongside Martin Luther King Jr.",
      "Died in Paris, France, in 1975."
    ],
    "persona": "Bold, glamorous, and defiant, mixes showbiz sparkle with a real steel nerve, unwilling to accept being treated as less than a star.",
    "revealFact": "During World War Two she secretly worked for French military intelligence, smuggling messages written in invisible ink on her sheet music while touring occupied Europe as a performer."
  },
  {
    "id": "murasaki-shikibu",
    "name": "Murasaki Shikibu",
    "aliases": [
      "Lady Murasaki"
    ],
    "category": "writer",
    "era": "circa 973-circa 1014",
    "difficulty": 3,
    "dossier": [
      "Born in Japan around the year 973, during the Heian period.",
      "Wrote The Tale of Genji, often called the world's first novel.",
      "Served as a lady in waiting at the Japanese imperial court.",
      "Her real personal name is unknown. Murasaki Shikibu is a court nickname.",
      "The Tale of Genji follows the romantic and political life of a fictional prince.",
      "Kept a diary describing daily life at the Heian court, which also survives today.",
      "Wrote in a Japanese script called hiragana, more accessible to women of her era than Chinese characters.",
      "Died in Japan around 1014."
    ],
    "persona": "Elegant and observant, describes court intrigue and romance with the patient, detailed eye of someone who has watched a thousand small dramas unfold.",
    "revealFact": "Her actual birth name was never recorded. Murasaki Shikibu is a nickname combining a court title with the name of a character from her own novel."
  },
  {
    "id": "james-watt",
    "name": "James Watt",
    "aliases": [
      "Watt"
    ],
    "category": "inventor",
    "era": "1736-1819",
    "difficulty": 1,
    "dossier": [
      "Was born in Greenock, Scotland, and trained as a scientific instrument maker.",
      "Improved the existing Newcomen steam engine, making it far more efficient.",
      "Introduced a separate condenser, which dramatically reduced wasted energy in steam engines.",
      "Partnered with businessman Matthew Boulton to manufacture and sell improved steam engines commercially.",
      "His improved engines became a major driving force of the Industrial Revolution in Britain.",
      "Coined the term horsepower as a way to market his engines by comparing them to draft horses.",
      "Held key patents that gave him significant control over steam engine technology for years.",
      "Also contributed early ideas related to measuring engine power output.",
      "The unit of power, the watt, is named directly in his honor.",
      "Is remembered as one of the central figures who helped power the Industrial Revolution."
    ],
    "persona": "Speaks with careful, mechanically minded precision, always thinking in terms of efficiency and wasted energy.",
    "revealFact": "The unit used to measure power in everything from light bulbs to car engines today, the watt, is named directly after him."
  },
  {
    "id": "david-livingstone",
    "name": "David Livingstone",
    "aliases": [
      "Livingstone",
      "Dr. Livingstone"
    ],
    "category": "explorer",
    "era": "1813-1873",
    "difficulty": 2,
    "dossier": [
      "Was born in Blantyre, Scotland, and worked in a cotton mill as a child before pursuing education.",
      "Trained as a physician and missionary before traveling to Africa in 1841.",
      "Explored large portions of central and southern Africa over several decades.",
      "Was the first European to see and name Victoria Falls, after Queen Victoria.",
      "Sought to open Africa to legitimate trade and Christianity as an alternative to the slave trade.",
      "Documented and publicly condemned the practices of the East African slave trade.",
      "Lost contact with the outside world for an extended period during a later expedition.",
      "Was found by journalist Henry Morton Stanley in 1871, prompting the famous greeting.",
      "Continued exploring central Africa until his death from illness in 1873.",
      "His body was carried by loyal African companions on a lengthy journey back to the coast for burial in Britain."
    ],
    "persona": "Speaks with earnest, missionary conviction, blending scientific curiosity with strong moral purpose.",
    "revealFact": "After his death in central Africa, his loyal African companions removed and buried his heart locally, believing it belonged in Africa, then carried his preserved body over a thousand miles to the coast so it could be returned to Britain."
  },
  {
    "id": "jim-thorpe",
    "name": "Jim Thorpe",
    "aliases": [
      "Thorpe"
    ],
    "category": "athlete",
    "era": "1887-1953",
    "difficulty": 2,
    "dossier": [
      "Born near Prague, Oklahoma, in 1887, a member of the Sac and Fox Nation.",
      "Won gold medals in both the pentathlon and decathlon at the 1912 Stockholm Olympics.",
      "Also played professional football, baseball, and basketball.",
      "Was the first president of what later became the National Football League.",
      "Had his Olympic medals stripped in 1913 over a dispute about amateur status, and they were posthumously restored decades later.",
      "Attended the Carlisle Indian Industrial School in Pennsylvania, where his athletic talent was discovered.",
      "Widely considered one of the most versatile athletes in American sports history.",
      "Died in Lomita, California, in 1953."
    ],
    "persona": "Quietly confident and versatile, treats every sport as just another game he happens to be good at, never one to brag about it.",
    "revealFact": "His Olympic gold medals were stripped in 1913 over a technical amateur status rule, and it took until 1982, nearly thirty years after his death, for the medals to be fully restored to his family."
  },
  {
    "id": "benito-juarez",
    "name": "Benito Juarez",
    "aliases": [
      "Juarez"
    ],
    "category": "leader",
    "era": "1806-1872",
    "difficulty": 2,
    "dossier": [
      "Was born into a poor Zapotec indigenous family in Oaxaca, Mexico.",
      "Was orphaned young and did not learn Spanish fluently until his teenage years.",
      "Trained as a lawyer and rose through Mexican politics to become a state governor.",
      "Became President of Mexico in 1858, the first person of fully indigenous descent to hold the office.",
      "Led liberal reforms limiting the power of the Catholic Church and military in politics.",
      "Led Mexican resistance during the French intervention that installed Emperor Maximilian.",
      "Continued governing from exile within Mexico during years of French occupation.",
      "Oversaw the eventual defeat and execution of Maximilian in 1867, restoring the republic.",
      "Is remembered for the phrase associated with him about respect for the rights of others as the basis of peace.",
      "Is considered one of Mexico's most important national heroes."
    ],
    "persona": "Speaks with quiet, principled steadiness, as someone who has weathered exile and occupation without losing conviction.",
    "revealFact": "He did not learn to speak Spanish fluently until he was around twelve years old, having grown up speaking the Zapotec language."
  },
  {
    "id": "johannes-brahms",
    "name": "Johannes Brahms",
    "aliases": [
      "Brahms"
    ],
    "category": "musician",
    "era": "1833-1897",
    "difficulty": 2,
    "dossier": [
      "Born in Hamburg, in what is now Germany, in 1833.",
      "Composed four symphonies along with concertos and chamber music.",
      "Waited until he was 43 to complete his First Symphony, feeling pressure to live up to Beethoven.",
      "Had a close, complicated friendship with composer Robert Schumann and his wife Clara Schumann.",
      "Composed the well known Lullaby, also called Wiegenlied, often used as a bedtime song.",
      "Was known for a thick beard and a gruff, private personality.",
      "Never married, and destroyed many of his own manuscripts he considered unworthy.",
      "Died in Vienna, Austria, in 1897."
    ],
    "persona": "Gruff and self critical, worries constantly about living up to the composers who came before him, especially Beethoven.",
    "revealFact": "He felt so intimidated by Beethoven's legacy that he waited over twenty years and did not finish his own First Symphony until he was 43 years old."
  },
  {
    "id": "audrey-hepburn",
    "name": "Audrey Hepburn",
    "aliases": [
      "Hepburn"
    ],
    "category": "entertainer",
    "era": "1929-1993",
    "difficulty": 1,
    "dossier": [
      "Born in Brussels, Belgium, in 1929.",
      "Starred in films including Roman Holiday and Breakfast at Tiffany's.",
      "Won an Academy Award for Best Actress for Roman Holiday in 1953.",
      "Trained as a ballet dancer in her youth before turning to acting.",
      "Experienced severe hardship as a child in the Netherlands during the Nazi occupation in World War Two.",
      "Became a longtime goodwill ambassador for UNICEF later in her life.",
      "Was known for her elegant fashion sense and long collaboration with designer Hubert de Givenchy.",
      "Died in Switzerland in 1993."
    ],
    "persona": "Graceful and warm, speaks with quiet elegance, more eager to talk about children and charity work than her own fame.",
    "revealFact": "As a teenager during World War Two in the occupied Netherlands, she suffered from malnutrition so severe it affected her health for the rest of her life, and she later became a lifelong advocate for children through UNICEF."
  },
  {
    "id": "giacomo-puccini",
    "name": "Giacomo Puccini",
    "aliases": [
      "Puccini"
    ],
    "category": "musician",
    "era": "1858-1924",
    "difficulty": 2,
    "dossier": [
      "Born in Lucca, Italy, in 1858.",
      "Composed the operas La Boheme, Tosca, and Madama Butterfly.",
      "Came from a long family line of church musicians in Lucca.",
      "Left his final opera, Turandot, unfinished at his death, and it was completed by another composer.",
      "Known for lush, emotionally direct melodies that made his operas hugely popular with audiences.",
      "His operas remain among the most frequently performed in the world today.",
      "Loved fast cars and boats and survived a serious car accident in 1903.",
      "Died in Brussels, Belgium, in 1924."
    ],
    "persona": "Emotional and melodic, favors heartbreak and grand romantic gestures, always angling toward the moment the aria swells.",
    "revealFact": "He died before finishing his final opera, Turandot, and at its premiere the conductor famously stopped the orchestra exactly at the point where Puccini's own music ended."
  },
  {
    "id": "kublai-khan",
    "name": "Kublai Khan",
    "aliases": [
      "Khubilai Khan"
    ],
    "category": "leader",
    "era": "1215-1294",
    "difficulty": 1,
    "dossier": [
      "Was a grandson of Genghis Khan and became the fifth Great Khan of the Mongol Empire.",
      "Completed the conquest of China, ending the Song dynasty and unifying the country.",
      "Founded the Yuan dynasty in 1271, becoming the first non-Han emperor to rule all of China.",
      "Moved the Mongol capital to Khanbaliq, on the site of modern day Beijing.",
      "Promoted trade along the Silk Road, welcoming foreign merchants and travelers like Marco Polo.",
      "Blended Mongol and Chinese administrative traditions in governing his empire.",
      "Attempted invasions of Japan that were both ultimately repelled, partly by typhoons.",
      "Supported various religions across his diverse empire, including Buddhism and Confucianism.",
      "Oversaw significant expansion of infrastructure, including roads and postal relay systems.",
      "His rule is considered the high point of Mongol influence over China."
    ],
    "persona": "Speaks with grand, cosmopolitan curiosity, delighting in foreign travelers and their stories from distant lands.",
    "revealFact": "The failed Mongol invasion fleets sent against Japan were reportedly destroyed by massive storms that the Japanese came to call kamikaze, meaning divine wind."
  },
  {
    "id": "peter-pan",
    "name": "Peter Pan",
    "aliases": [
      "the boy who wouldn't grow up"
    ],
    "category": "fictional",
    "era": "fictional, first appeared 1904",
    "difficulty": 1,
    "dossier": [
      "First appeared in a 1904 stage play by the Scottish author J.M. Barrie, later adapted into the 1911 novel Peter and Wendy.",
      "A boy who never grows up and lives in the magical land of Neverland.",
      "Can fly, and teaches the Darling children to fly using fairy dust.",
      "Is accompanied by a small fairy named Tinker Bell.",
      "Leads a group of boys called the Lost Boys in Neverland.",
      "His chief enemy is the pirate captain Captain Hook, who lost a hand to a crocodile.",
      "Brings Wendy Darling and her brothers from London to Neverland for adventures.",
      "J.M. Barrie later donated the rights to the character to a London children's hospital."
    ],
    "persona": "Speak with boastful, boyish glee, forever crowing about adventure and refusing to take anything seriously, especially the idea of growing up.",
    "revealFact": "J.M. Barrie gave the copyright to Peter Pan to Great Ormond Street Hospital, a children's hospital in London, so the story could keep helping sick children long after he was gone."
  },
  {
    "id": "charles-dickens",
    "name": "Charles Dickens",
    "aliases": [
      "Dickens"
    ],
    "category": "writer",
    "era": "1812-1870",
    "difficulty": 1,
    "dossier": [
      "Born in Portsmouth, England, in 1812.",
      "Wrote Oliver Twist, A Christmas Carol, and Great Expectations.",
      "Worked briefly in a boot blacking factory as a child after his father was imprisoned for debt.",
      "Published many of his novels in serialized installments in magazines.",
      "A Christmas Carol, published in 1843, helped shape modern ideas of a festive Christmas.",
      "Gave public readings of his own work that drew huge crowds in Britain and America.",
      "Wrote extensively about poverty and social injustice in Victorian England.",
      "Died in England in 1870."
    ],
    "persona": "Warm, theatrical, and a little sentimental, loves a vivid character sketch and cannot resist working in a bit of social commentary.",
    "revealFact": "As a boy of about twelve, he was sent to work in a shoe polish factory after his father was jailed for debt, an experience that shaped the poverty in his novels."
  },
  {
    "id": "shaka-zulu",
    "name": "Shaka Zulu",
    "aliases": [
      "Shaka",
      "Shaka kaSenzangakhona"
    ],
    "category": "leader",
    "era": "c.1787-1828",
    "difficulty": 2,
    "dossier": [
      "Was born to the Zulu clan in what is now South Africa.",
      "Rose to power as chief of the Zulu clan in 1816.",
      "Transformed the small Zulu clan into a powerful centralized kingdom.",
      "Reorganized his army with new tactics, including a short stabbing spear and disciplined formations.",
      "Introduced age based regiments that reshaped Zulu military and social structure.",
      "His campaigns caused a period of major upheaval and migration across southern Africa.",
      "Built the Zulu Kingdom into the dominant power in the region during his reign.",
      "Was assassinated by his half brothers in 1828.",
      "His military innovations influenced southern African warfare for decades after his death.",
      "Remains a major figure in Zulu and South African history and identity."
    ],
    "persona": "Speaks with fierce, commanding intensity, quick to talk strategy and discipline.",
    "revealFact": "He reorganized his warriors to fight barefoot and toughened their feet through training, believing sandals slowed troops down in battle."
  },
  {
    "id": "muhammad-ali",
    "name": "Muhammad Ali",
    "aliases": [
      "Cassius Clay",
      "the Greatest"
    ],
    "category": "athlete",
    "era": "1942-2016",
    "difficulty": 1,
    "dossier": [
      "Born Cassius Clay in Louisville, Kentucky, in 1942.",
      "Won an Olympic gold medal in boxing at the 1960 Rome Olympics.",
      "Became heavyweight champion of the world three separate times.",
      "Changed his name to Muhammad Ali after joining the Nation of Islam in 1964.",
      "Refused induction into the United States Army in 1967 on religious grounds, which cost him his boxing title for years.",
      "Famous for his quick wit, trash talk, and self given nickname, the Greatest.",
      "Fought legendary bouts including the Rumble in the Jungle against George Foreman.",
      "Died in Scottsdale, Arizona, in 2016."
    ],
    "persona": "Boastful, quick tongued, and rhythmic, loves to rhyme and predict exactly how the round will go before it happens.",
    "revealFact": "He was stripped of his heavyweight title and banned from boxing for over three years after refusing to be drafted into the Vietnam War on religious grounds, before his conviction was later overturned."
  },
  {
    "id": "karl-benz",
    "name": "Karl Benz",
    "aliases": [
      "Benz",
      "Carl Benz"
    ],
    "category": "inventor",
    "era": "1844-1929",
    "difficulty": 2,
    "dossier": [
      "Was born in Muhlburg, in present day Germany.",
      "Trained as a mechanical engineer and worked in various engineering roles before starting his own company.",
      "Built the Benz Patent-Motorwagen, widely regarded as the first practical automobile powered by an internal combustion engine.",
      "Received a patent for his motor car design in 1886.",
      "His wife, Bertha Benz, conducted a famous long distance drive in the vehicle to prove its practicality.",
      "Founded a company that eventually became part of what is now Mercedes-Benz.",
      "Continued refining automobile engine and vehicle designs throughout his career.",
      "His early automobile designs helped establish the basic layout still used by cars today.",
      "Faced significant public skepticism about motor vehicles in the earliest years of his invention.",
      "Is widely credited as the inventor of the modern automobile."
    ],
    "persona": "Speaks with careful, engineering-minded precision, quick to credit his wife's practical demonstration of his invention.",
    "revealFact": "His wife, Bertha Benz, secretly took his new automobile on a roughly sixty-five mile drive without his knowledge to prove it was practical for everyday use, and her trip is now considered the first long distance road trip by car in history."
  },
  {
    "id": "donald-bradman",
    "name": "Donald Bradman",
    "aliases": [
      "Don Bradman",
      "the Don"
    ],
    "category": "athlete",
    "era": "1908-2001",
    "difficulty": 2,
    "dossier": [
      "Born in Cootamundra, Australia, in 1908.",
      "Widely regarded as the greatest batsman in the history of cricket.",
      "Finished his test cricket career with a batting average of 99.94, an extraordinary statistic in the sport.",
      "Played for Australia's national cricket team through the 1930s and 1940s.",
      "Was knighted for his services to cricket, becoming Sir Donald Bradman.",
      "His dominance led England to develop a controversial bowling tactic against him called Bodyline.",
      "Later worked as a cricket administrator and selector after retiring as a player.",
      "Died in Adelaide, Australia, in 2001."
    ],
    "persona": "Modest and precise, talks about batting with the calm mathematical confidence of someone who simply never seemed to miss.",
    "revealFact": "His career test batting average of 99.94 is so far above every other great cricketer in history that statisticians consider it one of the most dominant records in any sport ever measured."
  },
  {
    "id": "suleiman-the-magnificent",
    "name": "Suleiman the Magnificent",
    "aliases": [
      "Suleiman I",
      "Suleyman the Magnificent"
    ],
    "category": "leader",
    "era": "1494-1566",
    "difficulty": 2,
    "dossier": [
      "Became Sultan of the Ottoman Empire in 1520.",
      "Ruled during what is considered the empire's golden age of power and culture.",
      "Expanded Ottoman territory across the Balkans, the Middle East, and North Africa.",
      "Led sieges including at Belgrade and Rhodes, and reached the gates of Vienna in 1529.",
      "Reformed the Ottoman legal system, earning him the title Kanuni, meaning lawgiver, among his own people.",
      "Was a patron of architecture, commissioning the great architect Mimar Sinan to build major mosques.",
      "Presided over a flourishing of Ottoman art, literature, and philosophy.",
      "Formed a notable political partnership and marriage with Hurrem Sultan, a former slave who became his influential wife.",
      "Led military campaigns personally well into his sixties.",
      "Died during a military campaign in Hungary in 1566."
    ],
    "persona": "Speaks with grand, cultured formality befitting an empire at its height, blending military confidence with an appreciation for poetry and law.",
    "revealFact": "He was also a skilled poet who wrote under the pen name Muhibbi, and he is believed to have composed thousands of verses of Persian and Turkish poetry."
  },
  {
    "id": "billie-holiday",
    "name": "Billie Holiday",
    "aliases": [
      "Holiday",
      "Lady Day"
    ],
    "category": "musician",
    "era": "1915-1959",
    "difficulty": 1,
    "dossier": [
      "Born in Philadelphia, Pennsylvania, in 1915.",
      "One of the most influential jazz vocalists of the 20th century.",
      "Recorded the haunting protest song Strange Fruit in 1939, about lynching in the American South.",
      "Known by the nickname Lady Day, given to her by saxophonist Lester Young.",
      "Had a distinctive, behind the beat phrasing that influenced generations of singers.",
      "Faced significant hardship growing up, including poverty and time in institutional care as a child.",
      "Struggled publicly with addiction later in her career.",
      "Died in New York City in 1959."
    ],
    "persona": "Sultry and world weary, sings even her spoken words a little behind the beat, carrying real pain underneath an elegant surface.",
    "revealFact": "Her 1939 recording of the song Strange Fruit, a stark protest against lynching, is often cited as one of the first widely heard American protest songs and remains a landmark civil rights recording."
  },
  {
    "id": "marlene-dietrich",
    "name": "Marlene Dietrich",
    "aliases": [
      "Dietrich"
    ],
    "category": "entertainer",
    "era": "1901-1992",
    "difficulty": 2,
    "dossier": [
      "Born in Berlin, Germany, in 1901.",
      "Starred in the film The Blue Angel in 1930, which launched her international fame.",
      "Moved to Hollywood and became a major American film star in the 1930s.",
      "Known for a smoky voice, androgynous fashion sense, and glamorous screen presence.",
      "Publicly opposed the Nazi regime and became a United States citizen during World War Two.",
      "Entertained Allied troops extensively during World War Two, performing near the front lines.",
      "Later had a successful career as a cabaret and concert singer.",
      "Died in Paris, France, in 1992."
    ],
    "persona": "Sultry and self assured, speaks in a low, cool voice, treating glamour as armor and refusing to take convention too seriously.",
    "revealFact": "Despite being German born and famous in Germany, she publicly refused Nazi overtures to return and star in German propaganda films, and instead spent much of World War Two entertaining Allied troops near the front lines."
  },
  {
    "id": "alice",
    "name": "Alice",
    "aliases": [
      "Alice in Wonderland"
    ],
    "category": "fictional",
    "era": "fictional, first appeared 1865",
    "difficulty": 1,
    "dossier": [
      "The heroine of the 1865 novel Alice's Adventures in Wonderland by the English writer Lewis Carroll.",
      "Falls down a rabbit hole chasing a White Rabbit and finds herself in the strange world of Wonderland.",
      "Grows and shrinks after eating cakes and drinking potions labeled Eat Me and Drink Me.",
      "Attends a chaotic Mad Tea Party hosted by the Mad Hatter and the March Hare.",
      "Encounters the Cheshire Cat, known for its wide grin and ability to vanish.",
      "Faces the fierce, short tempered Queen of Hearts, who constantly demands executions.",
      "Also appears in the sequel novel Through the Looking Glass, published in 1871.",
      "Lewis Carroll was the pen name of the English mathematician Charles Lutwidge Dodgson."
    ],
    "persona": "Speak with polite, curious bewilderment, constantly questioning the strange logic around her while trying hard to remain sensible about it all.",
    "revealFact": "The character was inspired by a real girl named Alice Liddell, whom the author Lewis Carroll first told the story to during a boat trip, before turning it into the published novel."
  },
  {
    "id": "antoine-lavoisier",
    "name": "Antoine Lavoisier",
    "aliases": [
      "Lavoisier"
    ],
    "category": "scientist",
    "era": "1743-1794",
    "difficulty": 2,
    "dossier": [
      "Was a French chemist and nobleman born in Paris.",
      "Is widely regarded as the father of modern chemistry.",
      "Demonstrated the role of oxygen in combustion, overturning earlier phlogiston theory.",
      "Helped establish the law of conservation of mass in chemical reactions.",
      "Co-developed a systematic method for naming chemical compounds still influential today.",
      "Compiled one of the first lists of chemical elements based on experimental evidence.",
      "Also worked as a tax collector for the French crown, a role that made him politically vulnerable.",
      "Conducted careful, quantitative experiments that set new standards for chemical research.",
      "Was arrested and executed by guillotine during the French Revolution in 1794.",
      "His execution is often cited as a major loss to science, cut short at the height of his career."
    ],
    "persona": "Speaks with careful, exacting rigor, insisting that every claim be weighed and measured before it is believed.",
    "revealFact": "After his execution during the French Revolution, a mathematician reportedly remarked that it took only an instant to cut off his head, but France might not produce another mind like it in a century."
  },
  {
    "id": "antonio-carlos-jobim",
    "name": "Antonio Carlos Jobim",
    "aliases": [
      "Jobim",
      "Tom Jobim"
    ],
    "category": "musician",
    "era": "1927-1994",
    "difficulty": 3,
    "dossier": [
      "Born in Rio de Janeiro, Brazil, in 1927.",
      "A key creator of the bossa nova musical style that blended samba with jazz.",
      "Co wrote the song The Girl from Ipanema, one of the most recorded songs in popular music history.",
      "Worked closely with fellow Brazilian musician Joao Gilberto and lyricist Vinicius de Moraes.",
      "Composed music for numerous Brazilian films.",
      "Helped bring bossa nova to international popularity in the early 1960s.",
      "Played piano and guitar and also worked as an arranger.",
      "Died in New York City in 1994."
    ],
    "persona": "Breezy and understated, speaks in soft, unhurried tones, as though narrating a gentle walk along a Rio beach.",
    "revealFact": "His song The Girl from Ipanema is reportedly the second most recorded pop song in history, after only the Beatles song Yesterday."
  },
  {
    "id": "werner-heisenberg",
    "name": "Werner Heisenberg",
    "aliases": [
      "Heisenberg"
    ],
    "category": "scientist",
    "era": "1901-1976",
    "difficulty": 1,
    "dossier": [
      "Was a German theoretical physicist born in Wurzburg.",
      "Developed matrix mechanics, one of the first complete formulations of quantum mechanics.",
      "Formulated the uncertainty principle, showing limits on how precisely certain pairs of properties can be known.",
      "Won the Nobel Prize in Physics in 1932 for the creation of quantum mechanics.",
      "Led German nuclear research efforts during World War II.",
      "The extent and intentions of his wartime nuclear work remain debated by historians.",
      "Was detained by Allied forces after the war as part of an operation to assess German atomic research.",
      "Later worked to rebuild German physics research and education after the war.",
      "Made contributions to nuclear physics, particle physics, and philosophy of science throughout his career.",
      "His uncertainty principle remains a foundational concept in modern quantum physics."
    ],
    "persona": "Speaks with careful, abstract precision, comfortable admitting that some things simply cannot be known exactly.",
    "revealFact": "His famous uncertainty principle is often summarized in popular culture as meaning everything is uncertain, but it actually makes a precise mathematical statement about specific pairs of measurements, like position and momentum."
  },
  {
    "id": "emperor-meiji",
    "name": "Emperor Meiji",
    "aliases": [
      "Meiji",
      "Mutsuhito"
    ],
    "category": "leader",
    "era": "1852-1912",
    "difficulty": 2,
    "dossier": [
      "Became Emperor of Japan in 1867 at age fourteen.",
      "His reign coincided with and gave its name to the Meiji Restoration.",
      "Presided over Japan's rapid transformation from a feudal society into a modern industrial power.",
      "Ended the centuries old shogunate system and restored direct imperial rule in name.",
      "Oversaw sweeping reforms in education, industry, military, and government structure.",
      "Japan adopted a new constitution and parliamentary system during his reign.",
      "Japan's military modernized rapidly, winning wars against China and Russia during this period.",
      "Moved the imperial capital from Kyoto to Tokyo.",
      "His reign transformed Japan from an isolated nation into a major world power within decades.",
      "Died in 1912, with his era name later used to designate the historical period."
    ],
    "persona": "Speaks with quiet, dignified reserve, letting the scale of change around him speak louder than his own words.",
    "revealFact": "At the start of his reign Japan had almost no modern industry or railways, and by the end of it Japan had defeated a major European power, Russia, in war, an astonishingly fast transformation."
  },
  {
    "id": "frederic-chopin",
    "name": "Frederic Chopin",
    "aliases": [
      "Chopin"
    ],
    "category": "musician",
    "era": "1810-1849",
    "difficulty": 1,
    "dossier": [
      "Born near Warsaw, Poland, in 1810.",
      "Composed almost exclusively for solo piano, including many nocturnes, waltzes, and etudes.",
      "Left Poland as a young man and spent most of his adult life in Paris.",
      "Had a long romantic relationship with the French writer George Sand.",
      "Suffered from poor health for much of his life, likely tuberculosis.",
      "Rarely performed in large public concert halls, preferring intimate salons.",
      "Requested that his heart be returned to Poland after his death, which it was.",
      "Died in Paris, France, in 1849."
    ],
    "persona": "Delicate and romantic, a little frail, speaks softly and poetically as though every word might be set to a nocturne.",
    "revealFact": "On his deathbed he asked that his heart be removed and sent back to Poland after he died. It remains sealed inside a pillar in a Warsaw church to this day."
  },
  {
    "id": "georgia-okeeffe",
    "name": "Georgia O'Keeffe",
    "aliases": [
      "O'Keeffe"
    ],
    "category": "artist",
    "era": "1887-1986",
    "difficulty": 2,
    "dossier": [
      "Born in Sun Prairie, Wisconsin, in 1887.",
      "Known for large scale paintings of flowers, New Mexico landscapes, and bleached animal skulls.",
      "Often called the Mother of American Modernism.",
      "Married photographer and gallery owner Alfred Stieglitz, who championed her work.",
      "Moved permanently to Ghost Ranch and Abiquiu, New Mexico, later in life.",
      "Continued painting even after her eyesight began to fail in old age.",
      "Her painting Jimson Weed sold for over 44 million dollars in 2014, a record at the time for a work by a woman artist.",
      "Died in Santa Fe, New Mexico, in 1986 at the age of 98."
    ],
    "persona": "Plainspoken and independent, prefers the quiet of a New Mexico desert to crowds, and answers questions with the same unfussy directness she brought to painting a single flower.",
    "revealFact": "Her painting Jimson Weed, White Flower No. 1 sold for over 44 million dollars in 2014, setting a record price at auction for a work by a woman artist."
  },
  {
    "id": "jorge-luis-borges",
    "name": "Jorge Luis Borges",
    "aliases": [
      "Borges"
    ],
    "category": "writer",
    "era": "1899-1986",
    "difficulty": 3,
    "dossier": [
      "Born in Buenos Aires, Argentina, in 1899.",
      "Known for short stories collected in books like Ficciones and The Aleph.",
      "Wrote intricate stories about labyrinths, infinite libraries, and mirrors.",
      "Worked for years as a librarian in Buenos Aires.",
      "Became completely blind later in life, yet continued to write and lecture.",
      "Served as director of the National Public Library of Argentina despite his blindness.",
      "Never won the Nobel Prize in Literature, despite being widely considered deserving.",
      "Died in Geneva, Switzerland, in 1986."
    ],
    "persona": "Riddling and erudite, answers questions with labyrinths, mirrors, and infinite libraries, delighted by paradox more than plain fact.",
    "revealFact": "He went blind later in life yet was appointed director of Argentina's National Public Library, a role he later called a magnificent irony given by fate."
  },
  {
    "id": "gertrude-bell",
    "name": "Gertrude Bell",
    "aliases": [
      "Bell"
    ],
    "category": "explorer",
    "era": "1868-1926",
    "difficulty": 3,
    "dossier": [
      "Was born in County Durham, England, into a wealthy industrial family.",
      "Became one of the first women to earn a first class honors degree in modern history at Oxford.",
      "Traveled extensively through the Middle East, learning Arabic and Persian along the way.",
      "Conducted archaeological surveys and mapped previously undocumented desert regions.",
      "Developed close relationships with tribal leaders across the Arabian Peninsula and Mesopotamia.",
      "Worked with British intelligence and political officials during and after World War I.",
      "Played a significant role in the drawing of borders that shaped the modern state of Iraq.",
      "Helped establish the Iraq Museum in Baghdad to preserve the region's archaeological heritage.",
      "Was one of very few women to hold significant political influence in British Middle Eastern policy of her era.",
      "Died in Baghdad in 1926, and is remembered as a major figure in Middle Eastern exploration and politics."
    ],
    "persona": "Speaks with sharp, confident authority, equally comfortable discussing ancient ruins and modern political borders.",
    "revealFact": "She was so influential in shaping the modern borders and early government of Iraq that she is sometimes informally referred to by historians as one of the founding architects of the modern Iraqi state."
  },
  {
    "id": "franz-schubert",
    "name": "Franz Schubert",
    "aliases": [
      "Schubert"
    ],
    "category": "musician",
    "era": "1797-1828",
    "difficulty": 2,
    "dossier": [
      "Born in Vienna, Austria, in 1797.",
      "Composed over 600 songs for voice and piano, called lieder.",
      "Wrote the Unfinished Symphony, which he never completed.",
      "Lived much of his short life in relative poverty, supported partly by friends.",
      "Rarely performed his own works in large public concerts during his lifetime.",
      "Composed an enormous amount of music despite dying young.",
      "Admired the older composer Ludwig van Beethoven, who lived in the same city.",
      "Died in Vienna, Austria, in 1828 at the age of 31."
    ],
    "persona": "Shy and melancholic, more comfortable pouring feeling into a quiet song than making a bold public statement.",
    "revealFact": "Despite dying at just 31, he composed roughly 1,500 works, including over 600 songs, an output so large scholars are still cataloguing all of it."
  },
  {
    "id": "ernest-shackleton",
    "name": "Ernest Shackleton",
    "aliases": [
      "Shackleton"
    ],
    "category": "explorer",
    "era": "1874-1922",
    "difficulty": 2,
    "dossier": [
      "Was born in County Kildare, Ireland, and joined the merchant navy as a teenager.",
      "Took part in an earlier Antarctic expedition before leading his own major voyages.",
      "Led the Imperial Trans-Antarctic Expedition of 1914, aiming to cross the Antarctic continent.",
      "His ship, the Endurance, became trapped and was eventually crushed by pack ice.",
      "Led his entire crew of twenty eight men on a harrowing survival journey after the ship sank.",
      "Made an extraordinary open boat journey of roughly eight hundred miles to seek rescue.",
      "Successfully brought every member of his stranded crew home alive despite the disaster.",
      "Is celebrated less for reaching a geographic goal than for his extraordinary leadership under crisis.",
      "Attempted another Antarctic expedition in 1921 but died of a heart attack en route in 1922.",
      "Is regarded as one of history's greatest examples of leadership in extreme survival conditions."
    ],
    "persona": "Speaks with steady, morale-boosting resolve, always more focused on keeping the crew together than on personal glory.",
    "revealFact": "Although his original goal of crossing Antarctica completely failed, and his ship was crushed by ice, he is remembered as a legendary leader precisely because he brought every single one of his stranded crew members home alive."
  },
];
