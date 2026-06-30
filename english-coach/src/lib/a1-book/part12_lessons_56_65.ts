import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart12: GermanA1BookLesson[] = [
  {
    lessonNo: 56,
    titleEn: "Hiring a Taxi",
    titleDe: "Mit dem Taxi fahren",
    introduction: "Whether you have heavy luggage or missed the last train, taking a taxi is sometimes unavoidable. In German, telling the driver where you want to go involves a specific set of prepositions that merge with Dative articles. Mastering 'zum' and 'zur' gets you exactly where you need to be without getting overcharged.",
    theRule: [
      "To tell a driver to go to a specific building, station, or street, use the preposition 'zu' (to).",
      "'zu' ALWAYS demands the Dative case.",
      "For masculine (der) and neuter (das) places, 'zu' + 'dem' merges into the short word 'zum'.",
      "For feminine (die) places, 'zu' + 'der' merges into the short word 'zur'.",
      "Use 'Ich möchte bitte...' (I would like to...) + zum/zur + Destination."
    ],
    formula: [
      "Masculine/Neuter Destination: Ich möchte bitte + zum + [Bahnhof / Hotel].",
      "Feminine Destination: Ich möchte bitte + zur + [Bank / Straße]."
    ],
    grammarTable: {
      headers: ["Destination Gender", "Preposition + Article", "Merged Form", "Example"],
      rows: [
        ["Masculine (der Bahnhof)", "zu dem", "zum", "zum Bahnhof"],
        ["Neuter (das Hotel)", "zu dem", "zum", "zum Hotel"],
        ["Feminine (die Bank)", "zu der", "zur", "zur Bank"],
        ["Plural (no merger)", "zu den", "zu den", "zu den Museen"]
      ]
    },
    vocabulary: [
      { de: "das Taxi", en: "taxi", example: "Ich rufe ein Taxi.", exampleEn: "I am calling a taxi." },
      { de: "der Fahrer", en: "driver", example: "Der Fahrer ist nett.", exampleEn: "The driver is nice." },
      { de: "der Bahnhof", en: "train station", example: "Bringen Sie mich zum Bahnhof.", exampleEn: "Take me to the train station." },
      { de: "der Flughafen", en: "airport", example: "Wir müssen zum Flughafen.", exampleEn: "We have to go to the airport." },
      { de: "die Adresse", en: "address", example: "Ich habe die Adresse hier.", exampleEn: "I have the address here." },
      { de: "das Gepäck", en: "luggage", example: "Ich habe viel Gepäck.", exampleEn: "I have a lot of luggage." },
      { de: "der Kofferraum", en: "trunk (of a car)", example: "Bitte in den Kofferraum.", exampleEn: "Into the trunk, please." },
      { de: "halten", en: "to stop", example: "Bitte halten Sie hier.", exampleEn: "Please stop here." },
      { de: "die Quittung", en: "receipt", example: "Ich brauche eine Quittung.", exampleEn: "I need a receipt." },
      { de: "das Wechselgeld", en: "change (money)", example: "Das Wechselgeld ist für Sie.", exampleEn: "The change is for you (Keep the change)." }
    ],
    modelSentences: [
      {
        de: "Guten Tag, zum Flughafen, bitte.",
        en: "Good day, to the airport, please.",
        breakdown: "Guten Tag, zum(to the / zu + dem masculine) Flughafen(airport), bitte(please)."
      },
      {
        de: "Ich möchte bitte zur Goethe-Straße.",
        en: "I would like to go to Goethe Street, please.",
        breakdown: "Ich möchte(would like) bitte zur(to the / zu + der feminine) Goethe-Straße(street)."
      },
      {
        de: "Können Sie mir mit dem Gepäck helfen?",
        en: "Can you help me with the luggage?",
        breakdown: "Können Sie(Can you formal) mir(me/dative) mit dem Gepäck(with the luggage/dative) helfen(help)?"
      },
      {
        de: "Bitte halten Sie hier. Ich brauche eine Quittung.",
        en: "Please stop here. I need a receipt.",
        breakdown: "Bitte halten Sie(stop/imperative formal) hier. Ich brauche eine Quittung(feminine accusative)."
      }
    ],
    culturalNote: "German taxis are almost exclusively cream-colored (hellelfenbein), and many are high-end Mercedes-Benz cars. Tipping the driver is standard; usually, you round up to the next full Euro or add about 10%. To do this, simply state the final amount you want to pay when handing over your money (e.g., giving a 20 Euro note for a 17.50 Euro ride and saying 'Machen wir 19' or 'Stimmt so').",
    exercises: [
      {
        type: "choose",
        instruction: "Choose between 'zum' and 'zur'.",
        items: [
          { prompt: "Ich möchte bitte ___ Bahnhof. (der)", answer: "zum" },
          { prompt: "Bringen Sie mich ___ Post. (die)", answer: "zur" },
          { prompt: "Fahren wir ___ Hotel. (das)", answer: "zum" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate your request to the taxi driver.",
        items: [
          { prompt: "Please stop here.", answer: "Bitte halten Sie hier." },
          { prompt: "I need a receipt.", answer: "Ich brauche eine Quittung." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Bringen Sie mich in der Flughafen.",
        right: "Bringen Sie mich zum Flughafen.",
        explanation: "When directing a vehicle to a public building or station, 'zu' (zum/zur) is the standard and safest preposition to use. 'In' implies physically going inside it, but the taxi just drops you off at it."
      },
      {
        wrong: "Zum die Bank, bitte.",
        right: "Zur Bank, bitte.",
        explanation: "'Zur' already contains the word 'die' (zu + der). Adding 'die' again makes it 'To the the bank'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Let's do a roleplay where I enter your taxi, tell you where to go using 'zum' and 'zur', and ask for a receipt at the end.",
      "Ask Sky: How do I tell a taxi driver to 'keep the change' in German?",
      "Ask Sky: What do I say if I want to ask the driver how much the ride will cost before we start?"
    ],
    examRelevance: "Hören Teil 1: You often hear short announcements or conversations between a driver and a passenger negotiating the destination or the fare.",
    lessonGoal: "Give clear directions to a taxi driver by merging the Dative preposition 'zu' into 'zum' and 'zur' based on the destination's gender."
  },
  {
    lessonNo: 57,
    titleEn: "Adverbs of Time (Temporaladverbien)",
    titleDe: "Temporaladverbien",
    introduction: "To tell a compelling story or make accurate plans, you need to express frequency and timing: 'always', 'sometimes', 'never', 'early', or 'late'. In German, Adverbs of Time are incredibly powerful because of a strict word order rule known as 'Time Before Place'. If you understand this rule, your sentences will instantly sound native.",
    theRule: [
      "Adverbs of time tell you when or how often something happens (immer, oft, manchmal, nie, heute, bald).",
      "Word Order Rule (Time before Place): If a sentence has both a Time word and a Place word, the Time word MUST come first.",
      "Example: 'Ich fahre heute nach Berlin' (I drive today to Berlin). Saying 'Ich fahre nach Berlin heute' sounds terrible in German.",
      "If you place the time adverb in Position 1 to emphasize it, remember the Inversion rule: the verb stays in Position 2, pushing the subject to Position 3."
    ],
    formula: [
      "Standard: Subject (1) + Verb (2) + TIME (3) + PLACE (4).",
      "Emphasized: TIME (1) + Verb (2) + Subject (3) + PLACE (4)."
    ],
    vocabulary: [
      { de: "immer", en: "always", example: "Er ist immer pünktlich.", exampleEn: "He is always on time." },
      { de: "oft", en: "often", example: "Ich gehe oft ins Kino.", exampleEn: "I go to the movies often." },
      { de: "manchmal", en: "sometimes", example: "Manchmal bin ich müde.", exampleEn: "Sometimes I am tired." },
      { de: "selten", en: "rarely", example: "Wir essen selten Fleisch.", exampleEn: "We rarely eat meat." },
      { de: "nie", en: "never", example: "Ich trinke nie Kaffee.", exampleEn: "I never drink coffee." },
      { de: "bald", en: "soon", example: "Wir sehen uns bald.", exampleEn: "We will see each other soon." },
      { de: "sofort", en: "immediately", example: "Ich komme sofort.", exampleEn: "I am coming immediately." },
      { de: "früh", en: "early", example: "Der Zug fährt sehr früh ab.", exampleEn: "The train departs very early." },
      { de: "spät", en: "late", example: "Es ist schon zu spät.", exampleEn: "It is already too late." },
      { de: "pünktlich", en: "on time / punctual", example: "Bitte seien Sie pünktlich.", exampleEn: "Please be punctual." }
    ],
    modelSentences: [
      {
        de: "Ich fahre heute nach Berlin.",
        en: "I am driving to Berlin today.",
        breakdown: "Ich(1) fahre(2) heute(TIME) nach Berlin(PLACE)."
      },
      {
        de: "Manchmal trinke ich morgens Tee.",
        en: "Sometimes I drink tea in the morning.",
        breakdown: "Manchmal(Time pos 1) trinke(Verb pos 2) ich(Subject pos 3) morgens(time) Tee."
      },
      {
        de: "Er geht oft in den Supermarkt.",
        en: "He often goes to the supermarket.",
        breakdown: "Er(1) geht(2) oft(TIME) in den Supermarkt(PLACE)."
      },
      {
        de: "Wir fliegen bald nach Italien.",
        en: "We are flying to Italy soon.",
        breakdown: "Wir fliegen bald(TIME) nach Italien(PLACE)."
      }
    ],
    culturalNote: "Punctuality ('Pünktlichkeit') is practically a national sport. If you are invited somewhere, being 'pünktlich' means arriving exactly on time or 5 minutes early. Arriving 'zu spät' (too late) without calling ahead is deeply frowned upon in professional and social situations.",
    exercises: [
      {
        type: "reorder",
        instruction: "Put the words in the correct order using the 'Time before Place' rule.",
        items: [
          { prompt: "nach München / fahre / heute / Ich", answer: "Ich fahre heute nach München." },
          { prompt: "nie / geht / ins Restaurant / Er", answer: "Er geht nie ins Restaurant." }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the missing adverb based on the English hint.",
        items: [
          { prompt: "Ich trinke ___ Alkohol. (never)", answer: "nie", hint: "Opposite of always" },
          { prompt: "Der Arzt kommt ___. (immediately)", answer: "sofort", hint: "Right now without delay" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Wir fahren ins Kino bald.",
        right: "Wir fahren bald ins Kino.",
        explanation: "English speakers like putting the time at the very end of the sentence (We go to the cinema *soon*). In German, Time (bald) MUST come before Place (ins Kino)."
      },
      {
        wrong: "Oft er trinkt Kaffee.",
        right: "Oft trinkt er Kaffee.",
        explanation: "Inversion rule again! If you start with 'Oft', the verb MUST come next."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 scrambled sentences containing both time and place words, and I will put them in the correct 'Time before Place' order.",
      "Ask Sky: Create a sliding scale of adverbs of frequency in German from 0% (nie) to 100% (immer).",
      "Ask Sky: Ask me 5 questions starting with 'Wie oft...' (How often...) and I will answer with frequency adverbs."
    ],
    examRelevance: "Schreiben Teil 1 & Sprechen Teil 2: 'Time before Place' is heavily monitored by examiners. Writing 'Ich komme nach Berlin am Montag' instead of 'Ich komme am Montag nach Berlin' will result in lost points.",
    lessonGoal: "Describe when and how often things happen while strictly adhering to the German 'Time before Place' word order rule."
  },
  {
    lessonNo: 58,
    titleEn: "Telephone Conversations",
    titleDe: "Am Telefon",
    introduction: "Answering the phone in Germany can be shocking for foreigners. Germans do not say 'Hello' when picking up a professional call; they answer by stating their last name. Knowing the standard phrases for phone etiquette prevents awkward silences and ensures you can leave a message or politely end the call with 'Auf Wiederhören' (Hear you again).",
    theRule: [
      "When answering the phone, state your last name (e.g., 'Schmidt.'). You can also say your full name: 'Thomas Schmidt, hallo.'",
      "To say 'This is [Name]' when you call someone, use 'Hier ist [Name]' (Here is...). DO NOT say 'Ich bin...' (I am...).",
      "To ask for someone, say: 'Kann ich bitte mit Herr/Frau [Name] sprechen?' (Can I speak with...).",
      "To end the phone call, you MUST say 'Auf Wiederhören' (Hear you again), NOT 'Auf Wiedersehen' (See you again)."
    ],
    formula: [
      "Caller: Hier ist [Dein Name]. Kann ich bitte mit [Name] sprechen?",
      "Receiver: Ja, einen Moment bitte. / Tut mir leid, er/sie ist nicht da.",
      "Closing: Auf Wiederhören!"
    ],
    vocabulary: [
      { de: "das Telefon", en: "telephone", example: "Das Telefon klingelt.", exampleEn: "The phone is ringing." },
      { de: "der Anruf", en: "phone call", example: "Ich warte auf einen Anruf.", exampleEn: "I am waiting for a call." },
      { de: "anrufen", en: "to call (separable)", example: "Ich rufe dich später an.", exampleEn: "I will call you later." },
      { de: "hier ist", en: "this is (on the phone)", example: "Hallo, hier ist Anna.", exampleEn: "Hello, this is Anna." },
      { de: "sprechen mit", en: "to speak with (Dative)", example: "Ich möchte mit Frau Weber sprechen.", exampleEn: "I would like to speak with Mrs. Weber." },
      { de: "der Moment", en: "moment", example: "Einen Moment, bitte.", exampleEn: "One moment, please." },
      { de: "die Nachricht", en: "message", example: "Möchten Sie eine Nachricht hinterlassen?", exampleEn: "Would you like to leave a message?" },
      { de: "hinterlassen", en: "to leave (a message)", example: "Ich möchte eine Nachricht hinterlassen.", exampleEn: "I want to leave a message." },
      { de: "falsch verbunden", en: "wrong number", example: "Tut mir leid, Sie sind falsch verbunden.", exampleEn: "Sorry, you have the wrong number." },
      { de: "Auf Wiederhören", en: "goodbye (on the phone)", example: "Vielen Dank, auf Wiederhören.", exampleEn: "Thank you, goodbye." }
    ],
    modelSentences: [
      {
        de: "Müller. Guten Tag.",
        en: "Müller. Good day. (Answering the phone)",
        breakdown: "Müller(Last name only). Guten Tag(Standard greeting)."
      },
      {
        de: "Guten Tag, hier ist Sarah Smith. Kann ich bitte mit Herrn Weber sprechen?",
        en: "Good day, this is Sarah Smith. Can I please speak with Mr. Weber?",
        breakdown: "Hier ist(Here is) Sarah Smith. Kann(Can) ich bitte mit Herrn Weber(Dative) sprechen(speak)?"
      },
      {
        de: "Tut mir leid, Herr Weber ist nicht da.",
        en: "I am sorry, Mr. Weber is not here.",
        breakdown: "Tut mir leid(Sorry), Herr Weber ist nicht da(there/here)."
      },
      {
        de: "Danke für Ihren Anruf. Auf Wiederhören!",
        en: "Thank you for your call. Goodbye!",
        breakdown: "Danke für Ihren Anruf(formal accusative). Auf Wiederhören(Hear again)!"
      }
    ],
    culturalNote: "Answering the phone with just 'Hallo' or 'Ja' is considered unprofessional and suspicious in Germany. State your last name briskly. Also, when leaving voicemails (auf dem Anrufbeantworter), be precise. Leave your name, your reason for calling, and a callback number clearly.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct phrase for a telephone conversation.",
        items: [
          { prompt: "Saying goodbye on the phone: ( Auf Wiedersehen / Auf Wiederhören )", answer: "Auf Wiederhören" },
          { prompt: "Introducing yourself when calling: ( Ich bin Thomas / Hier ist Thomas )", answer: "Hier ist Thomas" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate your request on the phone.",
        items: [
          { prompt: "Can I please speak with Mrs. Schmidt?", answer: "Kann ich bitte mit Frau Schmidt sprechen?" },
          { prompt: "One moment, please.", answer: "Einen Moment, bitte." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Auf Wiedersehen!",
        right: "Auf Wiederhören!",
        explanation: "You cannot 'see' someone over the phone. Using 'Wiedersehen' on a call is a dead giveaway that you are translating literally from English 'Goodbye'."
      },
      {
        wrong: "Hallo, das ist Tom.",
        right: "Hallo, hier ist Tom.",
        explanation: "In English, we say 'This is Tom'. In German, 'Das ist Tom' sounds like you are pointing to a guy named Tom standing next to you. On the phone, you must say 'Hier ist Tom' (Here is Tom)."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we do a phone roleplay? I am calling a doctor's office to make an appointment.",
      "Ask Sky: What is a typical German voicemail greeting (Anrufbeantworter) that I might hear?",
      "Ask Sky: How do I tell someone that the connection is bad and I can't hear them well?"
    ],
    examRelevance: "Hören Teil 3 & Sprechen Teil 2: Voicemail messages make up a large part of the listening exam. You must know what 'Anruf', 'Nachricht', and 'hinterlassen' mean to grasp the context.",
    lessonGoal: "Answer the phone correctly, introduce yourself using 'Hier ist', request to speak to someone, and politely end the call with 'Auf Wiederhören'."
  },
  {
    lessonNo: 59,
    titleEn: "At the Doctor's",
    titleDe: "Beim Arzt",
    introduction: "In Lesson 43, you learned how to say what hurts. Now, you need the vocabulary to physically visit the doctor. Navigating a German 'Praxis' (doctor's office) involves specific bureaucratic steps, primarily presenting your health insurance card. Knowing the routine makes a stressful sick day much easier.",
    theRule: [
      "A doctor's office is called a 'Praxis', not a 'Büro'.",
      "You must always bring your 'Versichertenkarte' (health insurance card) to the reception.",
      "The waiting room is the 'Wartezimmer'. The receptionist will tell you: 'Nehmen Sie bitte im Wartezimmer Platz' (Please take a seat in the waiting room).",
      "Doctors will ask: 'Was fehlt Ihnen?' (What is missing to you? = What's wrong?) or 'Welche Beschwerden haben Sie?' (What complaints do you have?)."
    ],
    formula: [
      "Arriving: Ich habe einen Termin um [Time]. Hier ist meine Versichertenkarte.",
      "Receptionist: Nehmen Sie bitte im Wartezimmer Platz."
    ],
    vocabulary: [
      { de: "die Praxis", en: "doctor's office", example: "Die Praxis ist ab 8 Uhr geöffnet.", exampleEn: "The doctor's office is open from 8 AM." },
      { de: "die Versichertenkarte", en: "health insurance card", example: "Haben Sie Ihre Versichertenkarte?", exampleEn: "Do you have your health insurance card?" },
      { de: "das Wartezimmer", en: "waiting room", example: "Bitte warten Sie im Wartezimmer.", exampleEn: "Please wait in the waiting room." },
      { de: "Platz nehmen", en: "to take a seat", example: "Nehmen Sie bitte Platz.", exampleEn: "Please take a seat." },
      { de: "der Arzt / die Ärztin", en: "doctor (male/female)", example: "Die Ärztin kommt gleich.", exampleEn: "The doctor will be right here." },
      { de: "fehlen", en: "to lack / what is wrong", example: "Was fehlt Ihnen?", exampleEn: "What seems to be the problem?" },
      { de: "das Rezept", en: "prescription", example: "Ich gebe Ihnen ein Rezept.", exampleEn: "I will give you a prescription." },
      { de: "die Apotheke", en: "pharmacy", example: "Geben Sie das Rezept in der Apotheke ab.", exampleEn: "Hand the prescription in at the pharmacy." },
      { de: "die Tablette", en: "pill / tablet", example: "Nehmen Sie eine Tablette pro Tag.", exampleEn: "Take one pill per day." },
      { de: "krankgeschrieben", en: "on sick leave", example: "Sie sind für drei Tage krankgeschrieben.", exampleEn: "You are on sick leave for three days." }
    ],
    modelSentences: [
      {
        de: "Guten Tag, ich habe einen Termin um 10 Uhr. Hier ist meine Versichertenkarte.",
        en: "Good day, I have an appointment at 10 AM. Here is my health insurance card.",
        breakdown: "Guten Tag, ich habe einen Termin(Accusative) um 10 Uhr. Hier ist meine Versichertenkarte."
      },
      {
        de: "Bitte nehmen Sie im Wartezimmer Platz. Der Arzt ruft Sie.",
        en: "Please take a seat in the waiting room. The doctor will call you.",
        breakdown: "Bitte nehmen Sie(Formal imperative) im Wartezimmer(in the waiting room / dative) Platz(seat). Der Arzt ruft(calls) Sie(you)."
      },
      {
        de: "Was fehlt Ihnen heute?",
        en: "What seems to be the problem today?",
        breakdown: "Was fehlt(is lacking) Ihnen(to you / dative formal) heute?"
      },
      {
        de: "Ich brauche ein Rezept für die Apotheke.",
        en: "I need a prescription for the pharmacy.",
        breakdown: "Ich brauche ein Rezept(prescription) für die Apotheke."
      }
    ],
    culturalNote: "When you are too sick to work in Germany, you usually need an 'Arbeitsunfähigkeitsbescheinigung' (Certificate of Incapacity for Work), colloquially called a 'Krankschreibung'. The doctor will write this note, and you must inform your employer immediately. German labor laws are very strict about protecting sick employees.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the missing medical vocabulary word.",
        items: [
          { prompt: "Haben Sie Ihre ___? (health insurance card)", answer: "Versichertenkarte", hint: "Long compound noun starting with V." },
          { prompt: "Warten Sie bitte im ___. (waiting room)", answer: "Wartezimmer", hint: "Room for waiting." }
        ]
      },
      {
        type: "choose",
        instruction: "Select the correct phrase based on the context.",
        items: [
          { prompt: "What the doctor asks you: ( Was fehlt Ihnen? / Was haben Sie verloren? )", answer: "Was fehlt Ihnen?" },
          { prompt: "Where you get the medicine: ( im Supermarkt / in der Apotheke )", answer: "in der Apotheke" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich muss zum Doktorbüro gehen.",
        right: "Ich muss zur Praxis gehen.",
        explanation: "A literal translation of 'doctor's office'. Germans use the word 'die Praxis' for an independent medical clinic."
      },
      {
        wrong: "Ich brauche eine Quittung für Medikamente.",
        right: "Ich brauche ein Rezept für Medikamente.",
        explanation: "'Quittung' is a receipt for payment. 'Rezept' is a medical prescription (and also the word for a cooking recipe!)."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Create a roleplay where I walk into the Praxis. You are the receptionist asking for my card and telling me to wait.",
      "Ask Sky: How do I tell the doctor I need a sick note for my employer?",
      "Ask Sky: Provide 5 different instructions a doctor might give me (e.g., 'Take one pill a day', 'Stay in bed'), and I will translate them."
    ],
    examRelevance: "Hören Teil 1 & Schreiben Teil 1: You may hear an answering machine telling you the 'Praxis' is closed, or you may have to write an email to your German teacher explaining that you cannot come to class because you have a doctor's appointment.",
    lessonGoal: "Navigate the arrival process at a German doctor's clinic by presenting your card, understanding waiting room instructions, and asking for a prescription."
  },
  {
    lessonNo: 60,
    titleEn: "Letter Writing — Hotel Reservation",
    titleDe: "Briefeschreiben — Hotelreservierung",
    introduction: "Booking a room via email requires a much more formal tone than inviting a friend to a party. You cannot use 'Lieber/Liebe'. You must use the highly standardized German formal greetings and closings. Perfecting this formal email structure will ensure you get exactly the room you want, while leaving an excellent impression.",
    theRule: [
      "To open a formal letter/email to a business where you don't know the person's name, use: 'Sehr geehrte Damen und Herren,' (Very honored ladies and gentlemen).",
      "Just like informal letters, put a comma after the greeting, and start the next line with a LOWERCASE letter.",
      "Use 'Ich möchte...' or 'Ich hätte gern...' to request the room.",
      "To close a formal letter, ALWAYS use: 'Mit freundlichen Grüßen' (With friendly greetings). No comma follows this phrase!",
      "Sign your full name (First Last) below the closing."
    ],
    formula: [
      "Greeting: Sehr geehrte Damen und Herren,",
      "Body: ich möchte bitte ein [Einzelzimmer/Doppelzimmer] für [Number] Nächte buchen.",
      "Closing: Mit freundlichen Grüßen \n [Your Full Name]"
    ],
    vocabulary: [
      { de: "Sehr geehrte Damen und Herren", en: "Dear Sir/Madam", example: "Sehr geehrte Damen und Herren, ich brauche ein Zimmer.", exampleEn: "Dear Sir/Madam, I need a room." },
      { de: "buchen", en: "to book / reserve", example: "Ich möchte ein Zimmer buchen.", exampleEn: "I would like to book a room." },
      { de: "reservieren", en: "to reserve", example: "Können Sie den Tisch reservieren?", exampleEn: "Can you reserve the table?" },
      { de: "das Einzelzimmer", en: "single room", example: "Ein Einzelzimmer kostet 50 Euro.", exampleEn: "A single room costs 50 Euros." },
      { de: "das Doppelzimmer", en: "double room", example: "Wir brauchen ein Doppelzimmer.", exampleEn: "We need a double room." },
      { de: "die Nacht", en: "night", example: "Ich bleibe drei Nächte.", exampleEn: "I am staying for three nights." },
      { de: "das Frühstück", en: "breakfast", example: "Ist das Frühstück inklusive?", exampleEn: "Is breakfast included?" },
      { de: "inklusive", en: "included", example: "WLAN ist inklusive.", exampleEn: "WiFi is included." },
      { de: "Mit freundlichen Grüßen", en: "Yours sincerely", example: "Mit freundlichen Grüßen, Max Meyer.", exampleEn: "Yours sincerely, Max Meyer." },
      { de: "die Bestätigung", en: "confirmation", example: "Bitte schicken Sie mir eine Bestätigung.", exampleEn: "Please send me a confirmation." },
      { de: "die Halbpension", en: "half board (breakfast + 1 meal)", example: "Ich möchte ein Zimmer mit Halbpension.", exampleEn: "I would like a room with half board." },
      { de: "die Vollpension", en: "full board (all meals included)", example: "Vollpension ist teurer als Halbpension.", exampleEn: "Full board is more expensive than half board." },
      { de: "die Ankunft", en: "arrival", example: "Meine Ankunft ist am 5. Juni.", exampleEn: "My arrival is on the 5th of June." },
      { de: "die Abreise", en: "departure", example: "Die Abreise ist am Montag.", exampleEn: "The departure is on Monday." },
      { de: "der Schlüssel", en: "key", example: "Kann ich den Schlüssel haben?", exampleEn: "Can I have the key?" },
      { de: "der Aufzug", en: "elevator / lift", example: "Wo ist der Aufzug?", exampleEn: "Where is the elevator?" },
      { de: "ausfüllen", en: "to fill in / fill out", example: "Bitte füllen Sie das Formular aus.", exampleEn: "Please fill in the form." },
      { de: "unterschreiben", en: "to sign", example: "Bitte unterschreiben Sie hier.", exampleEn: "Please sign here." },
      { de: "der Urlaub", en: "vacation / holiday", example: "Ich mache Urlaub in Hamburg.", exampleEn: "I am going on holiday in Hamburg." },
      { de: "das Reisebüro", en: "travel agency", example: "Ich kaufe die Tickets im Reisebüro.", exampleEn: "I buy the tickets at the travel agency." },
      { de: "der Reisepass", en: "passport", example: "Ich brauche meinen Reisepass.", exampleEn: "I need my passport." },
      { de: "die Fahrkarte", en: "ticket (train/bus)", example: "Ich kaufe eine Fahrkarte.", exampleEn: "I am buying a ticket." },
      { de: "die Sehenswürdigkeit", en: "sight / place of interest", example: "Hamburg hat viele Sehenswürdigkeiten.", exampleEn: "Hamburg has many sights." },
      { de: "besuchen", en: "to visit", example: "Ich möchte das Museum besuchen.", exampleEn: "I would like to visit the museum." }
    ],
    modelSentences: [
      {
        de: "Sehr geehrte Damen und Herren, ich möchte ein Einzelzimmer buchen.",
        en: "Dear Sir/Madam, I would like to book a single room.",
        breakdown: "Sehr geehrte Damen und Herren, ich(lowercase!) möchte ein Einzelzimmer(Accusative) buchen(infinitive at end)."
      },
      {
        de: "Wir brauchen ein Doppelzimmer für drei Nächte, vom 10. bis zum 13. Mai.",
        en: "We need a double room for three nights, from the 10th to the 13th of May.",
        breakdown: "Wir brauchen ein Doppelzimmer für drei Nächte, vom 10.(zehnten) bis zum 13.(dreizehnten) Mai."
      },
      {
        de: "Ist das Frühstück im Preis inklusive?",
        en: "Is the breakfast included in the price?",
        breakdown: "Ist das Frühstück im Preis(in the price) inklusive(included)?"
      },
      {
        de: "Bitte senden Sie mir eine Bestätigung. Mit freundlichen Grüßen, Anna Schmidt.",
        en: "Please send me a confirmation. Yours sincerely, Anna Schmidt.",
        breakdown: "Bitte senden Sie(Imperative formal) mir(to me/dative) eine Bestätigung. Mit freundlichen Grüßen(No comma after this!), Anna Schmidt."
      }
    ],
    culturalNote: "When booking a room in Germany, a 'Doppelzimmer' means one large bed (usually two mattresses pushed together). If you want two separate beds across the room, you must ask for a 'Zweibettzimmer'. Breakfast (Frühstück) is historically excellent in German hotels and is very often included in the standard price.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct formal greeting or closing.",
        items: [
          { prompt: "To a hotel reception: ( Liebe Hotel, / Sehr geehrte Damen und Herren, )", answer: "Sehr geehrte Damen und Herren," },
          { prompt: "To close the formal email: ( Viele Grüße / Mit freundlichen Grüßen )", answer: "Mit freundlichen Grüßen" }
        ]
      },
      {
        type: "reorder",
        instruction: "Reorder the sentence to make a formal request.",
        items: [
          { prompt: "buchen / Doppelzimmer / ein / möchte / Ich", answer: "Ich möchte ein Doppelzimmer buchen." },
          { prompt: "Bestätigung / eine / Bitte / senden Sie / mir", answer: "Bitte senden Sie mir eine Bestätigung." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Sehr geehrte Damen und Herren,\nIch möchte ein Zimmer...",
        right: "Sehr geehrte Damen und Herren,\nich möchte ein Zimmer...",
        explanation: "Just like the informal letter, the body of a formal letter MUST start with a lowercase letter because it directly follows the comma."
      },
      {
        wrong: "Mit freundlichen Grüßen,\nMax Meyer",
        right: "Mit freundlichen Grüßen\nMax Meyer",
        explanation: "In English, we put a comma after 'Sincerely,'. In German, there is NO punctuation after 'Mit freundlichen Grüßen'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me a prompt to write a hotel reservation email for 2 people for 4 nights, and I will write it for you to correct.",
      "Ask Sky: How do I write the formal greeting if I actually know the name of the hotel manager (e.g., Herr Schmidt)?",
      "Ask Sky: What are 5 common questions I might ask a hotel in an email (e.g., about parking, dogs, check-in time)?"
    ],
    examRelevance: "Schreiben Teil 2: Writing a formal email to a tourist office or a hotel is a very common exam scenario. Nailing the formal greeting, lowercase continuation, and formal closing guarantees you high marks for form/register.",
    lessonGoal: "Write a formal hotel reservation email using proper business greetings, lowercase continuation, clear room requests, and standard closing phrases.",
    letterSamples: [
      {
        scenario: "Hotel booking — emailing a hotel",
        taskPrompt: "Schreiben Sie eine E-Mail an das Hotel \"Kaiser Wilhelm\" in Hamburg. Sie brauchen ein Doppelzimmer mit Halbpension. Sie bleiben vier Nächte; Ankunft: 05.06., 16:30, Flughafen Fuhlsbüttel. Das Hotelauto soll Sie am Flughafen abholen.",
        letter: `Sehr geehrte Damen und Herren,

ich bin Alexander. Ich bin Arzt. Ich mache einen Ausflug nach Hamburg. Ich brauche ein Doppelzimmer mit Halbpension. Ich möchte im Hotel Kaiser Wilhelm in Hamburg bleiben. Ich bleibe vier Nächte dort. Ich komme am 5. Juni um 16:30 Uhr am Flughafen Fuhlsbüttel an. Das Hotelauto soll mich am Flughafen abholen.

Können Sie mir bitte die Informationen per E-Mail schicken?

Vielen Dank.

Mit freundlichen Grüßen
Alexander George`
      },
      {
        scenario: "Cooking course enquiry — writing to a cooking school",
        taskPrompt: "Sie möchten einen Kochkurs bei der Kochschule Schmidt besuchen. Schreiben Sie an die Kochschule. (Warum schreiben Sie? Kurs wann? Preis?)",
        letter: `Sehr geehrte Damen und Herren,

ich bin Alexander. Ich wohne in Frankfurt. Ich bin ledig und koche selbst. Ich möchte im Sommer einen Kochkurs besuchen. Ich will die Kochschule Schmidt besuchen, denn ich kann sehr gut kochen. Wann fängt der Kurs an? Was kostet der Kurs? Können Sie mir bitte die Informationen per E-Mail oder SMS schicken?

Vielen Dank.

Mit freundlichen Grüßen
Alexander George`
      },
      {
        scenario: "German course — writing to a former teacher",
        taskPrompt: "Sie waren im letzten Sommer in München in einem Deutschkurs. Ihr Lehrer war Herr Bernadt, eine sehr sympathische Person. Schreiben Sie an Herrn Bernadt.",
        letter: `Sehr geehrter Herr Bernadt,

wie geht es Ihnen? Ich bin Alex. Mein Vorname ist Alexander, mein Nachname ist George und ich komme aus Indien. Ich war im letzten Sommer in München in einem Deutschkurs. Sie waren mein Lehrer. Ich möchte dieses Jahr im Sommer weiterstudieren. Meine Handynummer ist 9447189562 und meine E-Mail-Adresse ist alexanderocean@gmail.com. Können Sie mir die Informationen per E-Mail oder SMS schicken?

Vielen Dank.

Mit freundlichen Grüßen
Alexander George`
      },
      {
        scenario: "Party food order — ordering catering for a party",
        taskPrompt: "Sie feiern am nächsten Samstag eine Party für 30 Personen. Sie möchten Essen bestellen. Sie haben ein Restaurant und es bringt das Essen nach Hause. (Warum schreiben Sie? Welches Essen? Preis?)",
        letter: `Sehr geehrte Frau Nabi,

ich bin Alex. Ich mache am Samstagabend um 7 Uhr eine Geburtstagsparty in meinem Haus. Ich möchte Essen für 30 Personen bestellen. Ich möchte Tomatensuppe, Brot, Pommes frites, Wurst, Cola, Bier, Hähnchen, Obst und Nachtisch bestellen. Wie viel kostet das? Können Sie das Essen bitte nach Hause bringen?

Meine Hausadresse ist Renewal Centre, Azad Straße, Kaloor, Ernakulam. Meine Handynummer ist 9447189562. Können Sie mich bitte anrufen?

Vielen Dank.

Mit freundlichen Grüßen
Alexander George`
      },
      {
        scenario: "Course absence — informing a teacher",
        taskPrompt: "Sie machen einen Deutschkurs. Nächsten Montag können Sie aber nicht zum Unterricht gehen. Schreiben Sie an Ihre Lehrerin Frau Lindner. (Warum schreiben Sie? Hausaufgabe? Zurück in den Kurs wann?)",
        letter: `Sehr geehrte Frau Lindner,

ich bin Alexander. Meine Mutter hat am nächsten Montag Geburtstag. Wir machen am Abend eine Party. Darum möchte ich am Montag nach Hause gehen. Nächsten Montag kann ich aber nicht zum Unterricht kommen. Ich komme am Dienstag zurück. Gibt es Hausaufgaben? Können Sie mir bitte die Informationen per E-Mail schicken?

Bitte helfen Sie mir.

Vielen Dank.

Mit freundlichen Grüßen
Alexander George`
      },
      {
        scenario: "Language school enquiry — requesting course information",
        taskPrompt: "Sie möchten einen Deutschkurs machen. Schreiben Sie eine E-Mail an die Sprachschule \"Deutschbistro\" in Hannover. Wann möchten Sie den Kurs machen? Sie möchten in einer deutschen Familie wohnen. Bitten Sie um Informationen über Termine und Preise.",
        letter: `Sehr geehrte Damen und Herren,

ich bin Alexander, komme aus Indien und arbeite in Köln. Ich spreche etwas Deutsch, darum möchte ich wieder studieren. Ich habe im Sommer Urlaub. Ich will im Sommer einen Deutschkurs machen. Ich möchte einen Kurs in der Sprachschule "Deutschbistro" in Hannover machen und ich möchte in einer deutschen Familie wohnen. Gibt es einen Kurs im Sommer? Wie viel kostet das?

Meine Handynummer ist +91 9447189562 und meine E-Mail-Adresse ist alexanderocean@gmail.com. Können Sie mir bitte die Informationen über Termine und Preise per E-Mail oder SMS schicken?

Vielen Dank.

Mit freundlichen Grüßen
Alexander George`
      }
    ]
  },
  {
    lessonNo: 61,
    titleEn: "Filling in a Form",
    titleDe: "Ein Formular ausfüllen",
    introduction: "Germany is famous for its love of bureaucracy. Whether checking into a hotel, opening a bank account, or registering at the language school, you will be handed a 'Formular'. These forms use very specific administrative vocabulary that you rarely hear in spoken conversation. Recognizing these words saves you from filling in the wrong box.",
    theRule: [
      "Forms use highly condensed nouns without articles.",
      "'Name' usually means your last name. If a form wants your first name, it will explicitly say 'Vorname'.",
      "'PLZ' stands for 'Postleitzahl' (Postal code/Zip code), which is always 5 digits in Germany.",
      "'Wohnort' is the city you live in. 'Geburtsort' is the city you were born in.",
      "'Familienstand' (Marital status) requires words like 'ledig' (single) or 'verheiratet' (married)."
    ],
    formula: [
      "Name/Nachname = Last Name",
      "Vorname = First Name",
      "Wohnort = City of Residence",
      "PLZ = 5-digit zip code"
    ],
    grammarTable: {
      headers: ["Form Vocabulary", "English Meaning", "Your Answer Example"],
      rows: [
        ["Vorname", "First name", "Maria"],
        ["Name / Nachname", "Last name", "Müller"],
        ["Straße und Hausnummer", "Street and House Number", "Goethestraße 12"],
        ["PLZ und Wohnort", "Zip code and City", "10115 Berlin"],
        ["Geburtsdatum", "Date of birth", "15.08.1990"],
        ["Familienstand", "Marital status", "ledig (single)"]
      ]
    },
    vocabulary: [
      { de: "das Formular", en: "form / document", example: "Bitte füllen Sie das Formular aus.", exampleEn: "Please fill out the form." },
      { de: "ausfüllen", en: "to fill out (separable)", example: "Ich fülle das Formular aus.", exampleEn: "I am filling out the form." },
      { de: "der Vorname", en: "first name", example: "Mein Vorname ist Tom.", exampleEn: "My first name is Tom." },
      { de: "der Nachname", en: "last name / surname", example: "Mein Nachname ist Meier.", exampleEn: "My last name is Meier." },
      { de: "der Geburtsort", en: "place of birth (city)", example: "Mein Geburtsort ist London.", exampleEn: "My place of birth is London." },
      { de: "die PLZ (Postleitzahl)", en: "postal code", example: "Die PLZ von Berlin ist 10115.", exampleEn: "The zip code of Berlin is 10115." },
      { de: "der Wohnort", en: "place of residence (city)", example: "Mein Wohnort ist München.", exampleEn: "My city of residence is Munich." },
      { de: "der Familienstand", en: "marital status", example: "Familienstand: verheiratet.", exampleEn: "Marital status: married." },
      { de: "ledig", en: "single / unmarried", example: "Ich bin ledig.", exampleEn: "I am single." },
      { de: "die Unterschrift", en: "signature", example: "Ihre Unterschrift, bitte.", exampleEn: "Your signature, please." }
    ],
    modelSentences: [
      {
        de: "Bitte füllen Sie dieses Formular aus.",
        en: "Please fill out this form.",
        breakdown: "Bitte füllen Sie(imperative formal) dieses Formular(neuter accusative) aus(prefix at end)."
      },
      {
        de: "Bei 'Wohnort' schreiben Sie bitte 'Berlin'.",
        en: "At 'Place of residence', please write 'Berlin'.",
        breakdown: "Bei(At) 'Wohnort' schreiben Sie(imperative) bitte 'Berlin'."
      },
      {
        de: "Sind Sie ledig oder verheiratet?",
        en: "Are you single or married?",
        breakdown: "Sind Sie ledig(single) oder verheiratet(married)?"
      },
      {
        de: "Wir brauchen hier unten Ihre Unterschrift.",
        en: "We need your signature down here.",
        breakdown: "Wir brauchen(need) hier unten(down here) Ihre Unterschrift(your formal signature)."
      }
    ],
    culturalNote: "When writing dates on a German form, always use the DD.MM.YYYY format. Furthermore, when writing your signature (Unterschrift), it must be handwritten in ink if it is a physical document. A printed name does not count as an official 'Unterschrift' in Germany.",
    exercises: [
      {
        type: "choose",
        instruction: "Match the information to the correct field on a German form.",
        items: [
          { prompt: "Information: 'Hamburg' -> ( Vorname / Wohnort / PLZ )", answer: "Wohnort" },
          { prompt: "Information: '10437' -> ( Geburtsdatum / PLZ / Straße )", answer: "PLZ" },
          { prompt: "Information: 'ledig' -> ( Familienstand / Name / Beruf )", answer: "Familienstand" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Translate the required action.",
        items: [
          { prompt: "Bitte füllen Sie das Formular ___. (out)", answer: "aus", hint: "Prefix for 'ausfüllen'" },
          { prompt: "Ich brauche Ihre ___ hier. (signature)", answer: "Unterschrift", hint: "What you sign with." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Name: Thomas",
        right: "Name: Müller (Vorname: Thomas)",
        explanation: "Foreigners often put their first name under 'Name'. On German forms, 'Name' almost always implies 'Nachname' (family name)."
      },
      {
        wrong: "Familienstand: lediger",
        right: "Familienstand: ledig",
        explanation: "When filling out a form, adjectives like 'ledig' or 'verheiratet' do not take any endings. They are written in their base dictionary form."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Create a blank German hotel registration form (Meldeschein) for me, and I will reply with my fake information to fill it out.",
      "Ask Sky: What is the difference between 'Staatsangehörigkeit' and 'Herkunftsland' on a form?",
      "Ask Sky: Give me 5 common abbreviations found on German forms (like PLZ, Tel., Str.) and explain what they mean."
    ],
    examRelevance: "Lesen Teil 3: The final reading task on the Goethe A1 exam is literally filling out a form. You will read a short text about a person (e.g., 'Carlos lives in Munich and is married') and you must copy that information into the blank spaces of a form.",
    lessonGoal: "Decipher and correctly fill out standard German administrative forms using specific vocabulary like Wohnort, PLZ, and Familienstand."
  },
  {
    lessonNo: 62,
    titleEn: "The Post Office",
    titleDe: "Die Post",
    introduction: "Sending a letter or package in Germany requires dealing with the 'Deutsche Post'. To make sure your mail gets to the right place, you need to use the Accusative case to express where the letter is going, and know the difference between a standard letter and a small package.",
    theRule: [
      "To say you are sending something TO a country or city, use 'nach' (Ich schicke das Paket nach Spanien).",
      "To say you are sending something TO a person, use 'an' + Accusative (Ich schicke den Brief an den Vater).",
      "A regular letter is 'der Brief'. A small parcel is 'das Päckchen'. A large tracked box is 'das Paket'.",
      "You always need a stamp ('die Briefmarke') to send a letter."
    ],
    formula: [
      "Destination (Place): Ich schicke + [Item] + nach + [City/Country].",
      "Destination (Person): Ich schicke + [Item] + an + [Accusative Person]."
    ],
    vocabulary: [
      { de: "die Post", en: "post office / mail", example: "Ich muss zur Post gehen.", exampleEn: "I must go to the post office." },
      { de: "der Brief", en: "letter", example: "Ich schreibe einen Brief.", exampleEn: "I am writing a letter." },
      { de: "das Paket", en: "package (large, tracked)", example: "Das Paket ist schwer.", exampleEn: "The package is heavy." },
      { de: "das Päckchen", en: "parcel (small, untracked)", example: "Ich schicke ein Päckchen.", exampleEn: "I am sending a parcel." },
      { de: "die Briefmarke", en: "stamp", example: "Ich brauche eine Briefmarke.", exampleEn: "I need a stamp." },
      { de: "schicken", en: "to send", example: "Ich schicke dir eine E-Mail.", exampleEn: "I send you an email." },
      { de: "der Schalter", en: "counter / desk", example: "Bitte gehen Sie zum Schalter 3.", exampleEn: "Please go to counter 3." },
      { de: "wiegen", en: "to weigh", example: "Ich muss das Paket wiegen.", exampleEn: "I have to weigh the package." },
      { de: "schwer", en: "heavy", example: "Das Paket ist zu schwer.", exampleEn: "The package is too heavy." },
      { de: "leicht", en: "light (weight)", example: "Der Brief ist leicht.", exampleEn: "The letter is light." }
    ],
    modelSentences: [
      {
        de: "Ich möchte dieses Paket nach Berlin schicken.",
        en: "I would like to send this package to Berlin.",
        breakdown: "Ich möchte dieses Paket(neuter acc) nach Berlin schicken(infinitive at end)."
      },
      {
        de: "Ich brauche fünf Briefmarken für Europa, bitte.",
        en: "I need five stamps for Europe, please.",
        breakdown: "Ich brauche fünf Briefmarken für Europa(for Europe), bitte."
      },
      {
        de: "Gehen Sie bitte zum Schalter vier.",
        en: "Please go to counter four.",
        breakdown: "Gehen Sie bitte zum(zu dem/dative) Schalter(counter) vier."
      },
      {
        de: "Ich schicke den Brief an meinen Bruder.",
        en: "I am sending the letter to my brother.",
        breakdown: "Ich schicke den Brief(acc object) an(to) meinen Bruder(acc person)."
      }
    ],
    culturalNote: "When waiting at a German post office (or a bank), you almost never form a chaotic line in front of the counter. You usually wait behind a designated red or yellow line on the floor labeled 'Bitte hier warten' (Please wait here) until the clerk calls you forward. Stepping over this line early is a major faux pas.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct word for the mail item.",
        items: [
          { prompt: "A small, untracked box: ( das Paket / das Päckchen / der Brief )", answer: "das Päckchen" },
          { prompt: "The sticker you put on a letter: ( der Schalter / die Briefmarke / die Post )", answer: "die Briefmarke" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Choose between 'nach' (for places) and 'an' (for people).",
        items: [
          { prompt: "Ich schicke das Paket ___ München.", answer: "nach", hint: "Destination is a city." },
          { prompt: "Ich schicke den Brief ___ meinen Freund.", answer: "an", hint: "Destination is a person." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich schicke den Brief zu meinem Bruder.",
        right: "Ich schicke den Brief an meinen Bruder.",
        explanation: "While 'zu' means 'to', when sending mail to a person, German prefers the preposition 'an' + Accusative. (Thinking of it like addressing the letter 'an' / 'to' someone)."
      },
      {
        wrong: "Ich brauche ein Briefmark.",
        right: "Ich brauche eine Briefmarke.",
        explanation: "The word for stamp is feminine ('die Briefmarke'), ending in an 'e'. Ensure you use 'eine'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we practice a roleplay where I am at the post office trying to send a heavy package to the USA?",
      "Ask Sky: Explain the difference in price and tracking between 'ein Paket' and 'ein Päckchen' in Germany.",
      "Ask Sky: Give me 5 sentences asking how to send things to different people and places, and correct my prepositions."
    ],
    examRelevance: "Sprechen Teil 3 & Hören Teil 2: Formulating requests with 'möchten' at the post office counter is a standard roleplay. Also, listening for counter numbers ('Bitte gehen Sie zu Schalter 2') is frequently tested.",
    lessonGoal: "Navigate the post office by confidently asking to send letters and packages to specific places and people, and purchasing stamps."
  },
  {
    lessonNo: 63,
    titleEn: "The Bank",
    titleDe: "Die Bank",
    introduction: "In Germany, cash is still king, but you absolutely need a bank account to pay rent or receive a salary. Banking vocabulary in German is very specific. Verbs like 'to transfer' or 'to withdraw' do not translate literally from English. Learning these precise verbs ensures your money goes exactly where you want it.",
    theRule: [
      "To open an account, use 'ein Konto eröffnen'.",
      "To withdraw cash from a machine, use 'Geld abheben'. (Do NOT use 'nehmen').",
      "To transfer money to someone else, use 'Geld überweisen'.",
      "A checking account is called a 'Girokonto'. The card you use to pay in stores is called a 'Girocard' or 'EC-Karte' (not a credit card!)."
    ],
    formula: [
      "Withdrawing: Ich möchte + Geld + abheben.",
      "Transferring: Ich möchte + Geld + auf das Konto + überweisen."
    ],
    vocabulary: [
      { de: "die Bank", en: "bank", example: "Die Bank ist geschlossen.", exampleEn: "The bank is closed." },
      { de: "das Konto", en: "bank account", example: "Ich möchte ein Konto eröffnen.", exampleEn: "I would like to open an account." },
      { de: "das Geld", en: "money", example: "Ich habe kein Geld dabei.", exampleEn: "I don't have any money with me." },
      { de: "abheben", en: "to withdraw (separable)", example: "Ich hebe am Automaten Geld ab.", exampleEn: "I withdraw money at the ATM." },
      { de: "überweisen", en: "to transfer (money)", example: "Bitte überweisen Sie die Miete.", exampleEn: "Please transfer the rent." },
      { de: "der Geldautomat", en: "ATM / cash machine", example: "Wo ist der Geldautomat?", exampleEn: "Where is the ATM?" },
      { de: "die Karte", en: "card (bank card)", example: "Ich bezahle mit Karte.", exampleEn: "I pay with a card." },
      { de: "die Gebühr", en: "fee", example: "Das kostet eine Gebühr.", exampleEn: "That costs a fee." },
      { de: "der Ausweis", en: "ID card", example: "Haben Sie Ihren Ausweis?", exampleEn: "Do you have your ID?" },
      { de: "bar", en: "cash (in cash)", example: "Zahlen Sie bar oder mit Karte?", exampleEn: "Are you paying cash or with card?" }
    ],
    modelSentences: [
      {
        de: "Guten Tag, ich möchte ein Konto eröffnen.",
        en: "Good day, I would like to open an account.",
        breakdown: "Guten Tag, ich möchte(would like) ein Konto(account/neuter) eröffnen(open/infinitive)."
      },
      {
        de: "Wo kann ich Geld abheben?",
        en: "Where can I withdraw money?",
        breakdown: "Wo(Where) kann(can/modal) ich Geld abheben(withdraw/full separable verb at end)?"
      },
      {
        de: "Ich muss das Geld heute überweisen.",
        en: "I must transfer the money today.",
        breakdown: "Ich muss(must/modal) das Geld heute überweisen(transfer/inseparable verb at end)."
      },
      {
        de: "Zahlen Sie bar oder mit Karte? Ich zahle bar.",
        en: "Do you pay cash or with card? I pay cash.",
        breakdown: "Zahlen(Pay) Sie bar(cash) oder mit Karte(with card)? Ich zahle bar."
      }
    ],
    culturalNote: "Germans heavily prefer paying 'bar' (in cash) for small purchases like coffee or bakery items, viewing it as faster and better for privacy. Credit cards (Kreditkarten) are often not accepted in smaller German shops. They will only accept cash or a German 'Girocard' (a local debit card). Always ask 'Kann ich mit Karte zahlen?' before buying.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct verb for the banking action.",
        items: [
          { prompt: "Getting physical cash from the ATM: ( eröffnen / abheben / überweisen )", answer: "abheben" },
          { prompt: "Sending money digitally to a landlord: ( abheben / bar zahlen / überweisen )", answer: "überweisen" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the missing vocabulary word.",
        items: [
          { prompt: "Haben Sie Ihren ___? (ID card)", answer: "Ausweis", hint: "Required to open an account." },
          { prompt: "Ich bezahle nicht mit Karte, ich bezahle ___. (in cash)", answer: "bar", hint: "Physical money." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich nehme Geld vom Automaten.",
        right: "Ich hebe Geld vom Automaten ab.",
        explanation: "In English, we 'take' money out of the ATM. In German, 'nehmen' is incorrect here. You must use the specific banking verb 'abheben'."
      },
      {
        wrong: "Ich möchte ein Account aufmachen.",
        right: "Ich möchte ein Konto eröffnen.",
        explanation: "'Account' is Denglisch. In banking, it is 'das Konto'. And while 'aufmachen' means to open (like a window), opening an account requires the formal verb 'eröffnen'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Create a roleplay where I am at the bank trying to open a 'Girokonto' and the clerk asks for my documents.",
      "Ask Sky: How do I read out a long German IBAN number correctly over the phone?",
      "Ask Sky: Explain the cultural difference between a 'Kreditkarte' and an 'EC-Karte/Girocard' in Germany."
    ],
    examRelevance: "Sprechen Teil 2 & Hören Teil 1: You may need to ask your partner 'Bezahlst du lieber bar oder mit Karte?' (Do you prefer paying cash or with card?). Listening tasks often feature ATM instructions or bank hours.",
    lessonGoal: "Communicate effectively at a German bank by using the specific verbs for withdrawing, transferring, and opening accounts, and understand cash vs. card culture."
  },
  {
    lessonNo: 64,
    titleEn: "Looking for an Apartment",
    titleDe: "Wohnungssuche",
    introduction: "Finding an apartment in a German city is highly competitive, and understanding the real estate abbreviations is like learning a secret code. You must understand the difference between 'Kaltmiete' (cold rent) and 'Warmmiete' (warm rent) so you aren't surprised by the final price, and know how to ask about the size and rooms.",
    theRule: [
      "Apartment sizes are measured in square meters ('Quadratmeter' or 'qm').",
      "Rent is split into two parts: 'Kaltmiete' (the base rent for just the space) and 'Nebenkosten' (extra costs like heating, water, garbage).",
      "Kaltmiete + Nebenkosten = 'Warmmiete' (the actual total amount you pay every month).",
      "The 'Kaution' is the security deposit, usually equal to 2 or 3 months of Kaltmiete."
    ],
    formula: [
      "Asking about size: Wie groß ist die Wohnung?",
      "Asking about rent: Wie hoch ist die Miete? / Was kostet die Warmmiete?"
    ],
    grammarTable: {
      headers: ["Abbreviation in Ads", "Full Word", "English Meaning"],
      rows: [
        ["NK", "die Nebenkosten", "Additional costs (utilities)"],
        ["WM", "die Warmmiete", "Total rent (Base + Utilities)"],
        ["KM", "die Kaltmiete", "Base rent (without utilities)"],
        ["ZKB", "Zimmer, Küche, Bad", "Room, Kitchen, Bathroom"],
        ["qm / m²", "die Quadratmeter", "Square meters"]
      ]
    },
    vocabulary: [
      { de: "die Wohnung", en: "apartment / flat", example: "Ich suche eine Wohnung.", exampleEn: "I am looking for an apartment." },
      { de: "die Miete", en: "rent", example: "Die Miete ist sehr hoch.", exampleEn: "The rent is very high." },
      { de: "die Nebenkosten", en: "additional costs (utilities)", example: "Wie hoch sind die Nebenkosten?", exampleEn: "How high are the utility costs?" },
      { de: "die Kaution", en: "security deposit", example: "Die Kaution ist 1000 Euro.", exampleEn: "The deposit is 1000 Euros." },
      { de: "das Zimmer", en: "room", example: "Die Wohnung hat drei Zimmer.", exampleEn: "The apartment has three rooms." },
      { de: "die Küche", en: "kitchen", example: "Ist die Küche groß?", exampleEn: "Is the kitchen big?" },
      { de: "das Bad", en: "bathroom", example: "Das Bad hat ein Fenster.", exampleEn: "The bathroom has a window." },
      { de: "der Balkon", en: "balcony", example: "Ich möchte einen Balkon.", exampleEn: "I want a balcony." },
      { de: "die Quadratmeter", en: "square meters", example: "Die Wohnung hat 60 Quadratmeter.", exampleEn: "The apartment has 60 square meters." },
      { de: "mieten", en: "to rent (as a tenant)", example: "Wir mieten die Wohnung.", exampleEn: "We are renting the apartment." }
    ],
    modelSentences: [
      {
        de: "Wie groß ist die Wohnung? Sie ist 50 Quadratmeter groß.",
        en: "How big is the apartment? It is 50 square meters big.",
        breakdown: "Wie groß(How big) ist die Wohnung(subject)? Sie ist 50 Quadratmeter groß."
      },
      {
        de: "Was kostet die Warmmiete? Die Warmmiete ist 800 Euro.",
        en: "What does the warm rent cost? The warm rent is 800 euros.",
        breakdown: "Was(What) kostet(costs) die Warmmiete(total rent)?"
      },
      {
        de: "Die Wohnung hat zwei Zimmer, eine Küche und ein Bad.",
        en: "The apartment has two rooms, a kitchen, and a bathroom.",
        breakdown: "Die Wohnung hat zwei Zimmer(rooms), eine Küche(kitchen) und ein Bad(bathroom)."
      },
      {
        de: "Wann kann ich die Wohnung besichtigen?",
        en: "When can I view the apartment?",
        breakdown: "Wann(When) kann(can) ich die Wohnung besichtigen(view/inspect/infinitive at end)?"
      }
    ],
    culturalNote: "When you rent an apartment in Germany, it is often 'kalt'—which doesn't just mean the rent type, it means the apartment might literally be empty. No light fixtures, no closets, and sometimes not even a kitchen sink or cabinets (eine Einbauküche). You are expected to bring or build your own kitchen!",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct rental term.",
        items: [
          { prompt: "The total amount you pay every month: ( Kaltmiete / Warmmiete / Kaution )", answer: "Warmmiete" },
          { prompt: "The money you pay upfront as a security deposit: ( Nebenkosten / Miete / Kaution )", answer: "Kaution" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate your questions for the landlord.",
        items: [
          { prompt: "How big is the apartment?", answer: "Wie groß ist die Wohnung?" },
          { prompt: "How high are the utility costs? (die Nebenkosten)", answer: "Wie hoch sind die Nebenkosten?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Die Wohnung hat 3 Schlafzimmer.",
        right: "Die Wohnung hat 3 Zimmer.",
        explanation: "In English, we say a '2-bedroom apartment'. In Germany, apartments are counted by total living rooms (Zimmer). A '3-Zimmer-Wohnung' usually means 1 living room and 2 bedrooms. Do not count just the bedrooms!"
      },
      {
        wrong: "Ich zahle 500 Euro Miete. (Assuming this is the total).",
        right: "Ich zahle 500 Euro Warmmiete.",
        explanation: "Always specify 'Warmmiete'. If a landlord just says 'Miete', they often mean 'Kaltmiete', and you will be shocked by the extra 150 Euros added on for utilities later."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me a fake German apartment listing with abbreviations (like 2 ZKB, 60qm, 600€ KM) and I will explain what it means in English.",
      "Ask Sky: Let's do a roleplay where I call a landlord to ask when I can view the apartment (besichtigen).",
      "Ask Sky: How do I ask if pets (Haustiere) are allowed in the apartment?"
    ],
    examRelevance: "Lesen Teil 2 & Schreiben: Reading apartment advertisements is a staple of the reading comprehension section. You must be able to understand the abbreviations to answer True/False questions about the apartment's size and price.",
    lessonGoal: "Decipher German apartment advertisements and ask targeted questions about size, room count, and the difference between base rent and total rent."
  },
  {
    lessonNo: 65,
    titleEn: "Buying a Train Ticket",
    titleDe: "Fahrkarten kaufen",
    introduction: "The German railway network (Deutsche Bahn) is vast, connecting every corner of the country. To buy a ticket, you need to know specific travel vocabulary that dictates whether you are coming back, where you have to switch trains, and which platform to stand on. Mastering this ensures you never end up on the wrong train to Munich.",
    theRule: [
      "When asking for a ticket, use 'Ich möchte eine Fahrkarte nach...' (I would like a ticket to...).",
      "You must specify if it is a one-way ticket: 'einfach' (simple/one-way) or a return ticket: 'hin und zurück' (there and back).",
      "Trains depart from a 'Gleis' (track/platform).",
      "To change trains, use the separable verb 'umsteigen'. If it's a direct train, there is no need to 'umsteigen'."
    ],
    formula: [
      "Buying: Ich möchte eine Fahrkarte nach [Destination], bitte.",
      "Specifying: [einfach] oder [hin und zurück]?",
      "Platform info: Der Zug fährt auf Gleis [Number] ab."
    ],
    grammarTable: {
      headers: ["Term", "German Translation", "Action Needed"],
      rows: [
        ["One-way", "einfach", "You only travel to the destination."],
        ["Return ticket", "hin und zurück", "You travel there and back."],
        ["Direct train", "direkt", "You stay on the train."],
        ["Transfer", "umsteigen", "You must get off and board a new train."]
      ]
    },
    vocabulary: [
      { de: "die Fahrkarte", en: "ticket (for transport)", example: "Ich brauche eine Fahrkarte nach Köln.", exampleEn: "I need a ticket to Cologne." },
      { de: "einfach", en: "one-way / simple", example: "Einmal Frankfurt einfach, bitte.", exampleEn: "One ticket to Frankfurt one-way, please." },
      { de: "hin und zurück", en: "round trip / return", example: "München, hin und zurück.", exampleEn: "Munich, return trip." },
      { de: "das Gleis", en: "track / platform", example: "Auf welchem Gleis fährt der Zug ab?", exampleEn: "On which track does the train depart?" },
      { de: "umsteigen", en: "to change trains / transfer", example: "Sie müssen in Hannover umsteigen.", exampleEn: "You must change trains in Hannover." },
      { de: "einsteigen", en: "to board / get on", example: "Bitte steigen Sie ein.", exampleEn: "Please get on board." },
      { de: "aussteigen", en: "to disembark / get off", example: "Hier müssen wir aussteigen.", exampleEn: "We must get off here." },
      { de: "der Automat", en: "ticket machine", example: "Ich kaufe die Karte am Automaten.", exampleEn: "I buy the ticket at the machine." },
      { de: "die Verspätung", en: "delay", example: "Der Zug hat 10 Minuten Verspätung.", exampleEn: "The train has a 10 minute delay." },
      { de: "der Fahrplan", en: "timetable / schedule", example: "Schauen Sie auf den Fahrplan.", exampleEn: "Look at the timetable." }
    ],
    modelSentences: [
      {
        de: "Ich möchte eine Fahrkarte nach Hamburg, bitte. Einfach.",
        en: "I would like a ticket to Hamburg, please. One-way.",
        breakdown: "Ich möchte eine Fahrkarte(accusative) nach Hamburg(destination), bitte. Einfach(one-way)."
      },
      {
        de: "Muss ich umsteigen? Nein, der Zug fährt direkt.",
        en: "Do I have to change trains? No, the train goes directly.",
        breakdown: "Muss(Must) ich umsteigen(change trains/infinitive at end)? Nein, der Zug fährt direkt."
      },
      {
        de: "Entschuldigung, auf welchem Gleis fährt der Zug nach Berlin ab?",
        en: "Excuse me, on which platform does the train to Berlin depart?",
        breakdown: "Entschuldigung, auf welchem(dative) Gleis(track) fährt der Zug nach Berlin ab(prefix at end)?"
      },
      {
        de: "Der ICE hat heute leider 20 Minuten Verspätung.",
        en: "The ICE (Intercity Express) unfortunately has a 20-minute delay today.",
        breakdown: "Der ICE hat(has) heute leider 20 Minuten Verspätung(delay)."
      }
    ],
    culturalNote: "The 'Deutsche Bahn' (DB) is Germany's national railway. While famous worldwide for precision, locals frequently complain about 'Verspätung' (delays). High-speed trains are called 'ICE' (Intercity-Express) and are white with a red stripe. Local commuter trains are red and called 'Regionalbahn' (RE/RB) or 'S-Bahn'.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct travel term.",
        items: [
          { prompt: "You want a ticket there and back: ( einfach / hin und zurück / umsteigen )", answer: "hin und zurück" },
          { prompt: "You need to change from one train to another: ( einsteigen / aussteigen / umsteigen )", answer: "umsteigen" }
        ]
      },
      {
        type: "reorder",
        instruction: "Reorder the question to ask about the platform.",
        items: [
          { prompt: "fährt / welchem / Auf / Gleis / der Zug / ab / ?", answer: "Auf welchem Gleis fährt der Zug ab?" },
          { prompt: "Muss / in Frankfurt / ich / umsteigen / ?", answer: "Muss ich in Frankfurt umsteigen?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich brauche ein Ticket.",
        right: "Ich brauche eine Fahrkarte.",
        explanation: "While 'Ticket' is understood and increasingly used in modern German (especially for flights), 'Fahrkarte' is the traditional, universally correct word for trains and buses, and the one tested on exams."
      },
      {
        wrong: "Ich möchte nach Berlin gehen.",
        right: "Ich möchte nach Berlin fahren.",
        explanation: "English speakers use 'go' for everything. In German, if you use a vehicle, you MUST use 'fahren'. 'Gehen' means physically walking on your own two feet."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Let's do a roleplay at the train station counter (Reisezentrum). I want to buy a return ticket to Munich.",
      "Ask Sky: Explain the difference between 'einsteigen', 'aussteigen', and 'umsteigen' using examples.",
      "Ask Sky: Give me an audio-style announcement about a train delay and a platform change, and I will translate it."
    ],
    examRelevance: "Hören Teil 1 & Sprechen Teil 2: Train station announcements are guaranteed in the listening section. You must listen carefully for 'Gleis' numbers and 'Verspätung' times to choose the correct multiple-choice answer.",
    lessonGoal: "Purchase train tickets specifying one-way or return, and ask for critical travel details like platforms, transfers, and delays."
  }
];