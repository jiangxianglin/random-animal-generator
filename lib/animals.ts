// Animal data types and database
export interface Animal {
  id: string;
  commonName: string;
  scientificName: string;
  category: 'mammals' | 'birds' | 'reptiles' | 'marine' | 'insects';
  facts: string[];
  imageUrl: string;
  imageAlt: string;
}

// Comprehensive animal database with 60+ species
export const ANIMAL_DATABASE: Animal[] = [
  // ===== MAMMALS (20 species) =====
  {
    id: "mammal_001",
    commonName: "African Elephant",
    scientificName: "Loxodonta africana",
    category: "mammals",
    facts: [
      "African elephants are the largest land animals on Earth, weighing up to 6,000 kg.",
      "They can communicate using infrasound that travels several kilometers.",
      "Elephants have excellent memory and can recognize up to 30 relatives by their calls."
    ],
    imageUrl: "https://images.pexels.com/photos/3850526/pexels-photo-3850526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "African elephant in savanna"
  },
  {
    id: "mammal_002",
    commonName: "Red Panda",
    scientificName: "Ailurus fulgens",
    category: "mammals",
    facts: [
      "Red pandas are more closely related to raccoons than giant pandas.",
      "They have a false thumb to help grip branches while climbing.",
      "Can rotate their ankles to descend trees headfirst."
    ],
    imageUrl: "https://images.pexels.com/photos/148182/pexels-photo-148182.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Red panda in tree"
  },
  {
    id: "mammal_003",
    commonName: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    category: "mammals",
    facts: [
      "Each tiger's stripe pattern is unique, like human fingerprints.",
      "Tigers can leap distances of up to 10 meters in a single bound.",
      "Excellent swimmers and often cool off in water during hot days."
    ],
    imageUrl: "https://images.pexels.com/photos/516541/pexels-photo-516541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Bengal tiger"
  },
  {
    id: "mammal_004",
    commonName: "Giant Panda",
    scientificName: "Ailuropoda melanoleuca",
    category: "mammals",
    facts: [
      "Pandas spend 12-16 hours daily eating bamboo, consuming up to 38 kg.",
      "Despite being carnivores, 99% of their diet is bamboo.",
      "Have an extra 'thumb' that helps them grip bamboo stems."
    ],
    imageUrl: "https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Giant panda eating bamboo"
  },
  {
    id: "mammal_005",
    commonName: "Gray Wolf",
    scientificName: "Canis lupus",
    category: "mammals",
    facts: [
      "Wolves can travel up to 50 km in a single day while hunting.",
      "A wolf's howl can be heard from up to 10 km away.",
      "Wolf packs have complex social structures led by an alpha pair."
    ],
    imageUrl: "https://images.pexels.com/photos/69350/pexels-photo-69350.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Gray wolf in snow"
  },
  {
    id: "mammal_006",
    commonName: "Cheetah",
    scientificName: "Acinonyx jubatus",
    category: "mammals",
    facts: [
      "Cheetahs are the fastest land animals, reaching speeds of 120 km/h.",
      "They can accelerate from 0 to 96 km/h in just 3 seconds.",
      "Unlike other big cats, cheetahs cannot roar but can purr."
    ],
    imageUrl: "https://images.pexels.com/photos/9765280/pexels-photo-9765280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Cheetah running"
  },
  {
    id: "mammal_007",
    commonName: "Polar Bear",
    scientificName: "Ursus maritimus",
    category: "mammals",
    facts: [
      "Polar bears have black skin under their white fur to absorb heat.",
      "They can swim continuously for days, covering over 100 km.",
      "Their sense of smell is so acute they can detect seals nearly 1 km away."
    ],
    imageUrl: "https://images.pexels.com/photos/598966/pexels-photo-598966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Polar bear on ice"
  },
  {
    id: "mammal_008",
    commonName: "Giraffe",
    scientificName: "Giraffa camelopardalis",
    category: "mammals",
    facts: [
      "Giraffes are the tallest mammals, reaching heights of up to 5.5 meters.",
      "Their tongues can be up to 50 cm long and are prehensile.",
      "Despite their long necks, giraffes have the same number of neck vertebrae as humans (7)."
    ],
    imageUrl: "https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Giraffe in savanna"
  },
  {
    id: "mammal_009",
    commonName: "Kangaroo",
    scientificName: "Macropus rufus",
    category: "mammals",
    facts: [
      "Kangaroos can hop at speeds of up to 56 km/h.",
      "They can jump up to 3 meters high and 8 meters long.",
      "Female kangaroos can pause their pregnancy if environmental conditions are unfavorable."
    ],
    imageUrl: "https://images.pexels.com/photos/2560510/pexels-photo-2560510.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Kangaroo hopping"
  },
  {
    id: "mammal_010",
    commonName: "Sloth",
    scientificName: "Bradypus variegatus",
    category: "mammals",
    facts: [
      "Sloths move so slowly that algae grows on their fur, providing camouflage.",
      "They sleep 15-20 hours per day and move only when necessary.",
      "Sloths can hold their breath for up to 40 minutes underwater."
    ],
    imageUrl: "https://images.pexels.com/photos/26690591/pexels-photo-26690591.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Sloth hanging from tree"
  },
  {
    id: "mammal_011",
    commonName: "Koala",
    scientificName: "Phascolarctos cinereus",
    category: "mammals",
    facts: [
      "Koalas sleep up to 22 hours a day to conserve energy.",
      "They eat only eucalyptus leaves, which are toxic to most other animals.",
      "Each koala has unique fingerprints, similar to humans."
    ],
    imageUrl: "https://images.pexels.com/photos/146083/pexels-photo-146083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Koala in eucalyptus tree"
  },
  {
    id: "mammal_012",
    commonName: "Gorilla",
    scientificName: "Gorilla beringei",
    category: "mammals",
    facts: [
      "Gorillas share 98.3% of their DNA with humans.",
      "They can learn sign language and communicate with humans.",
      "Adult male gorillas can weigh up to 220 kg and are incredibly strong."
    ],
    imageUrl: "https://images.pexels.com/photos/33535/primate-ape-thinking-mimic.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Mountain gorilla"
  },
  {
    id: "mammal_013",
    commonName: "Lion",
    scientificName: "Panthera leo",
    category: "mammals",
    facts: [
      "Lions are the only cats that live in groups called prides.",
      "A lion's roar can be heard from up to 8 km away.",
      "Male lions sleep up to 20 hours a day while females do most of the hunting."
    ],
    imageUrl: "https://images.pexels.com/photos/2220337/pexels-photo-2220337.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Male lion with mane"
  },
  {
    id: "mammal_014",
    commonName: "Orangutan",
    scientificName: "Pongo pygmaeus",
    category: "mammals",
    facts: [
      "Orangutans are the largest tree-dwelling animals in the world.",
      "They share 97% of their DNA with humans.",
      "Orangutans can use tools and have been observed making umbrellas from leaves."
    ],
    imageUrl: "https://images.pexels.com/photos/2083277/pexels-photo-2083277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Orangutan in tree"
  },
  {
    id: "mammal_015",
    commonName: "Zebra",
    scientificName: "Equus quagga",
    category: "mammals",
    facts: [
      "Each zebra has a unique stripe pattern, like a fingerprint.",
      "Zebras can run at speeds of up to 65 km/h.",
      "Their stripes may help confuse predators and regulate body temperature."
    ],
    imageUrl: "https://images.pexels.com/photos/1524628/pexels-photo-1524628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Zebra herd"
  },
  {
    id: "mammal_016",
    commonName: "Hippopotamus",
    scientificName: "Hippopotamus amphibius",
    category: "mammals",
    facts: [
      "Hippos can hold their breath underwater for up to 5 minutes.",
      "Despite their bulk, they can run at speeds of 30 km/h on land.",
      "Hippos secrete a red, oily substance that acts as sunscreen and antibiotic."
    ],
    imageUrl: "https://images.pexels.com/photos/35995/hippo-mammal-wildlife-nature.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Hippopotamus in water"
  },
  {
    id: "mammal_017",
    commonName: "Raccoon",
    scientificName: "Procyon lotor",
    category: "mammals",
    facts: [
      "Raccoons have highly dexterous front paws with five fingers.",
      "They can remember solutions to tasks for up to 3 years.",
      "Raccoons 'wash' their food in water to better understand what they're eating."
    ],
    imageUrl: "https://images.pexels.com/photos/10767665/pexels-photo-10767665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Raccoon"
  },
  {
    id: "mammal_018",
    commonName: "Meerkat",
    scientificName: "Suricata suricatta",
    category: "mammals",
    facts: [
      "Meerkats live in groups of up to 50 individuals called mobs.",
      "They take turns standing guard while others forage for food.",
      "Meerkats are immune to certain types of venom, including scorpion stings."
    ],
    imageUrl: "https://images.pexels.com/photos/389962/pexels-photo-389962.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Meerkat standing guard"
  },
  {
    id: "mammal_019",
    commonName: "Otter",
    scientificName: "Lutra lutra",
    category: "mammals",
    facts: [
      "Sea otters hold hands while sleeping to avoid drifting apart.",
      "They use rocks as tools to crack open shellfish.",
      "Otters have the densest fur of any animal, with up to 1 million hairs per square inch."
    ],
    imageUrl: "https://images.pexels.com/photos/11870769/pexels-photo-11870769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Otter swimming"
  },
  {
    id: "mammal_020",
    commonName: "Fox",
    scientificName: "Vulpes vulpes",
    category: "mammals",
    facts: [
      "Foxes use Earth's magnetic field to hunt prey hidden under snow.",
      "They can hear a mouse squeaking 100 feet away.",
      "Fox pups are born blind and don't open their eyes for about 2 weeks."
    ],
    imageUrl: "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Red fox"
  },

  // ===== BIRDS (15 species) =====
  {
    id: "bird_001",
    commonName: "Bald Eagle",
    scientificName: "Haliaeetus leucocephalus",
    category: "birds",
    facts: [
      "Bald eagles can spot fish from up to 1.6 km away while soaring.",
      "Despite their name, they aren't bald—white head feathers make them appear so.",
      "They can dive at speeds of up to 160 km/h when hunting."
    ],
    imageUrl: "https://images.pexels.com/photos/3877512/pexels-photo-3877512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Bald eagle perched"
  },
  {
    id: "bird_002",
    commonName: "Hummingbird",
    scientificName: "Trochilidae",
    category: "birds",
    facts: [
      "Hummingbirds can flap their wings up to 80 times per second.",
      "They are the only birds that can fly backwards.",
      "Their hearts beat up to 1,260 times per minute during flight."
    ],
    imageUrl: "https://images.pexels.com/photos/4793432/pexels-photo-4793432.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Hummingbird hovering"
  },
  {
    id: "bird_003",
    commonName: "Penguin",
    scientificName: "Aptenodytes forsteri",
    category: "birds",
    facts: [
      "Emperor penguins can dive to depths of over 500 meters.",
      "They can hold their breath for up to 22 minutes underwater.",
      "Male penguins incubate eggs on their feet for 2 months without eating."
    ],
    imageUrl: "https://images.pexels.com/photos/1823704/pexels-photo-1823704.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Emperor penguin"
  },
  {
    id: "bird_004",
    commonName: "Owl",
    scientificName: "Strigiformes",
    category: "birds",
    facts: [
      "Owls can rotate their heads up to 270 degrees.",
      "Their flight is nearly silent due to special feather adaptations.",
      "Owls have three eyelids: one for blinking, one for sleeping, and one for keeping eyes clean."
    ],
    imageUrl: "https://images.pexels.com/photos/106685/pexels-photo-106685.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Owl perched"
  },
  {
    id: "bird_005",
    commonName: "Peacock",
    scientificName: "Pavo cristatus",
    category: "birds",
    facts: [
      "Male peacocks have up to 200 colorful tail feathers used to attract mates.",
      "They can fly despite their large tail, reaching speeds of 16 km/h.",
      "Peacocks are omnivores and eat plants, insects, and small reptiles."
    ],
    imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Peacock displaying feathers"
  },
  {
    id: "bird_006",
    commonName: "Flamingo",
    scientificName: "Phoenicopterus",
    category: "birds",
    facts: [
      "Flamingos get their pink color from carotenoids in their diet of algae and shrimp.",
      "They can stand on one leg for hours without getting tired.",
      "Flamingos are filter feeders and can filter up to 20 beakfuls of water per second."
    ],
    imageUrl: "https://images.pexels.com/photos/1327405/pexels-photo-1327405.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Flamingo flock"
  },
  {
    id: "bird_007",
    commonName: "Parrot",
    scientificName: "Psittaciformes",
    category: "birds",
    facts: [
      "Parrots can live for over 80 years in captivity.",
      "They are one of the few animals that can mimic human speech.",
      "Parrots use their feet like hands to hold and manipulate food."
    ],
    imageUrl: "https://images.pexels.com/photos/1059823/pexels-photo-1059823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Colorful parrot"
  },
  {
    id: "bird_008",
    commonName: "Albatross",
    scientificName: "Diomedea exulans",
    category: "birds",
    facts: [
      "Albatrosses have the longest wingspan of any bird, up to 3.5 meters.",
      "They can fly for hours without flapping their wings, using dynamic soaring.",
      "Albatrosses can live for over 50 years and mate for life."
    ],
    imageUrl: "https://images.pexels.com/photos/31307997/pexels-photo-31307997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Albatross in flight"
  },
  {
    id: "bird_009",
    commonName: "Toucan",
    scientificName: "Ramphastos toco",
    category: "birds",
    facts: [
      "A toucan's bill can be one-third of its total body length.",
      "Despite its size, the bill is very light due to its hollow structure.",
      "Toucans use their bills to regulate body temperature."
    ],
    imageUrl: "https://images.pexels.com/photos/4468188/pexels-photo-4468188.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Toucan with large bill"
  },
  {
    id: "bird_010",
    commonName: "Woodpecker",
    scientificName: "Picidae",
    category: "birds",
    facts: [
      "Woodpeckers can peck up to 20 times per second.",
      "Their skulls have special shock-absorbing structures to prevent brain damage.",
      "They have barbed tongues that can extend up to 4 inches to catch insects."
    ],
    imageUrl: "https://images.pexels.com/photos/4621165/pexels-photo-4621165.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Woodpecker on tree"
  },
  {
    id: "bird_011",
    commonName: "Kingfisher",
    scientificName: "Alcedo atthis",
    category: "birds",
    facts: [
      "Kingfishers can dive into water at speeds of 40 km/h to catch fish.",
      "They have excellent vision and can see prey underwater despite refraction.",
      "Kingfishers nest in burrows dug into riverbanks."
    ],
    imageUrl: "https://images.pexels.com/photos/459449/pexels-photo-459449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Kingfisher perched"
  },
  {
    id: "bird_012",
    commonName: "Crane",
    scientificName: "Gruidae",
    category: "birds",
    facts: [
      "Cranes perform elaborate courtship dances that include jumping and wing flapping.",
      "They can fly at altitudes of up to 10,000 meters during migration.",
      "Cranes are symbols of longevity and good fortune in many Asian cultures."
    ],
    imageUrl: "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Crane standing"
  },
  {
    id: "bird_013",
    commonName: "Pelican",
    scientificName: "Pelecanus",
    category: "birds",
    facts: [
      "A pelican's bill pouch can hold up to 13 liters of water.",
      "They dive from heights of up to 20 meters to catch fish.",
      "Pelicans often hunt cooperatively in groups."
    ],
    imageUrl: "https://images.pexels.com/photos/61157/pelicans-pelican-water-bird-australian-pelican-61157.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Pelican with fish"
  },
  {
    id: "bird_014",
    commonName: "Raven",
    scientificName: "Corvus corax",
    category: "birds",
    facts: [
      "Ravens are among the most intelligent birds and can solve complex problems.",
      "They can mimic sounds, including human speech.",
      "Ravens have been observed using tools and planning for future events."
    ],
    imageUrl: "https://images.pexels.com/photos/59850/crow-corvus-frugilegus-rook-raven-bird-59850.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Raven perched"
  },
  {
    id: "bird_015",
    commonName: "Swan",
    scientificName: "Cygnus",
    category: "birds",
    facts: [
      "Swans mate for life and can live for over 20 years.",
      "They are one of the largest flying birds, weighing up to 15 kg.",
      "Swans have over 25,000 feathers, more than most other birds."
    ],
    imageUrl: "https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "White swan on water"
  },

  // ===== REPTILES (12 species) =====
  {
    id: "reptile_001",
    commonName: "Green Sea Turtle",
    scientificName: "Chelonia mydas",
    category: "reptiles",
    facts: [
      "Green sea turtles can hold their breath for up to 5 hours when resting.",
      "They are named for the green color of their fat, not their shells.",
      "Sea turtles can navigate using Earth's magnetic field."
    ],
    imageUrl: "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Green sea turtle swimming"
  },
  {
    id: "reptile_002",
    commonName: "Komodo Dragon",
    scientificName: "Varanus komodoensis",
    category: "reptiles",
    facts: [
      "Komodo dragons are the largest living lizards, growing up to 3 meters long.",
      "They have venomous bites that prevent blood clotting in prey.",
      "Can eat up to 80% of their body weight in a single meal."
    ],
    imageUrl: "https://images.pexels.com/photos/2664272/pexels-photo-2664272.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Komodo dragon"
  },
  {
    id: "reptile_003",
    commonName: "Chameleon",
    scientificName: "Chamaeleonidae",
    category: "reptiles",
    facts: [
      "Chameleons can move their eyes independently to look in two directions at once.",
      "They change color based on mood, temperature, and communication, not just camouflage.",
      "Their tongues can extend to twice their body length to catch prey."
    ],
    imageUrl: "https://images.pexels.com/photos/45868/chameleon-reptile-lizard-green-45868.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Colorful chameleon"
  },
  {
    id: "reptile_004",
    commonName: "Crocodile",
    scientificName: "Crocodylus niloticus",
    category: "reptiles",
    facts: [
      "Crocodiles have the strongest bite force of any animal, up to 3,700 psi.",
      "They can hold their breath underwater for up to 2 hours.",
      "Crocodiles have been around for over 200 million years."
    ],
    imageUrl: "https://images.pexels.com/photos/31591512/pexels-photo-31591512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Nile crocodile"
  },
  {
    id: "reptile_005",
    commonName: "Python",
    scientificName: "Pythonidae",
    category: "reptiles",
    facts: [
      "Pythons can grow up to 9 meters long and weigh over 90 kg.",
      "They kill prey by constriction, squeezing until the prey can't breathe.",
      "Pythons can go months without eating after a large meal."
    ],
    imageUrl: "https://images.pexels.com/photos/1394938/pexels-photo-1394938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Python coiled"
  },
  {
    id: "reptile_006",
    commonName: "Iguana",
    scientificName: "Iguana iguana",
    category: "reptiles",
    facts: [
      "Iguanas can detach their tails to escape predators and regrow them later.",
      "They are excellent swimmers and can hold their breath for up to 30 minutes.",
      "Iguanas have a third eye on top of their head that detects light and movement."
    ],
    imageUrl: "https://images.pexels.com/photos/927497/pexels-photo-927497.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Green iguana"
  },
  {
    id: "reptile_007",
    commonName: "Gecko",
    scientificName: "Gekkonidae",
    category: "reptiles",
    facts: [
      "Geckos can climb smooth surfaces using millions of tiny hairs on their feet.",
      "Most geckos don't have eyelids and lick their eyes to keep them clean.",
      "They can detach their tails when threatened and regrow them."
    ],
    imageUrl: "https://images.pexels.com/photos/5475191/pexels-photo-5475191.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Gecko on wall"
  },
  {
    id: "reptile_008",
    commonName: "Tortoise",
    scientificName: "Testudinidae",
    category: "reptiles",
    facts: [
      "Tortoises can live for over 150 years, making them one of the longest-living animals.",
      "They can survive for months without food or water.",
      "Tortoises have excellent memory and can remember locations for years."
    ],
    imageUrl: "https://images.pexels.com/photos/1201431/pexels-photo-1201431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Giant tortoise"
  },
  {
    id: "reptile_009",
    commonName: "Cobra",
    scientificName: "Naja",
    category: "reptiles",
    facts: [
      "King cobras are the longest venomous snakes, growing up to 5.5 meters.",
      "They can 'stand up' and raise one-third of their body off the ground.",
      "Cobras can spit venom up to 2 meters to defend themselves."
    ],
    imageUrl: "https://images.pexels.com/photos/7256324/pexels-photo-7256324.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Cobra with hood spread"
  },
  {
    id: "reptile_010",
    commonName: "Alligator",
    scientificName: "Alligator mississippiensis",
    category: "reptiles",
    facts: [
      "Alligators can live for 30-50 years in the wild.",
      "They have 80 teeth and can replace them up to 3,000 times in their lifetime.",
      "Alligators are surprisingly fast on land, reaching speeds of 35 km/h in short bursts."
    ],
    imageUrl: "https://images.pexels.com/photos/326116/pexels-photo-326116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "American alligator"
  },
  {
    id: "reptile_011",
    commonName: "Bearded Dragon",
    scientificName: "Pogona vitticeps",
    category: "reptiles",
    facts: [
      "Bearded dragons can change color to regulate temperature and communicate.",
      "They wave their arms to show submission or acknowledge other dragons.",
      "Can live up to 10-15 years in captivity with proper care."
    ],
    imageUrl: "https://images.pexels.com/photos/6002806/pexels-photo-6002806.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Bearded dragon"
  },
  {
    id: "reptile_012",
    commonName: "Anaconda",
    scientificName: "Eunectes murinus",
    category: "reptiles",
    facts: [
      "Green anacondas are the heaviest snakes in the world, weighing up to 250 kg.",
      "They can grow up to 9 meters long and have a girth of 30 cm.",
      "Anacondas are excellent swimmers and spend most of their time in water."
    ],
    imageUrl: "https://images.pexels.com/photos/751691/pexels-photo-751691.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Green anaconda"
  },

  // ===== MARINE ANIMALS (15 species) =====
  {
    id: "marine_001",
    commonName: "Great White Shark",
    scientificName: "Carcharodon carcharias",
    category: "marine",
    facts: [
      "Great white sharks can detect a single drop of blood in 100 liters of water.",
      "They can swim at speeds up to 56 km/h in short bursts.",
      "Great whites can live for 70+ years and grow up to 6 meters long."
    ],
    imageUrl: "https://images.pexels.com/photos/11179780/pexels-photo-11179780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Great white shark"
  },
  {
    id: "marine_002",
    commonName: "Blue Whale",
    scientificName: "Balaenoptera musculus",
    category: "marine",
    facts: [
      "Blue whales are the largest animals ever known, reaching lengths of up to 30 meters.",
      "Their hearts can weigh as much as a car (400 kg).",
      "A blue whale's tongue alone can weigh as much as an elephant."
    ],
    imageUrl: "https://images.pexels.com/photos/831084/pexels-photo-831084.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Blue whale"
  },
  {
    id: "marine_003",
    commonName: "Dolphin",
    scientificName: "Delphinus delphis",
    category: "marine",
    facts: [
      "Dolphins are highly intelligent and can recognize themselves in mirrors.",
      "They use echolocation to navigate and hunt in murky water.",
      "Dolphins sleep with one half of their brain at a time to stay alert for predators."
    ],
    imageUrl: "https://images.pexels.com/photos/225869/pexels-photo-225869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Dolphin jumping"
  },
  {
    id: "marine_004",
    commonName: "Octopus",
    scientificName: "Octopus vulgaris",
    category: "marine",
    facts: [
      "Octopuses have three hearts and blue blood.",
      "They can change color and texture in milliseconds for camouflage.",
      "Octopuses are highly intelligent and can solve complex puzzles."
    ],
    imageUrl: "https://images.pexels.com/photos/2902860/pexels-photo-2902860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Octopus underwater"
  },
  {
    id: "marine_005",
    commonName: "Jellyfish",
    scientificName: "Medusozoa",
    category: "marine",
    facts: [
      "Jellyfish have been around for over 500 million years.",
      "They are 95% water and have no brain, heart, or bones.",
      "Some jellyfish species are biologically immortal and can revert to their juvenile form."
    ],
    imageUrl: "https://images.pexels.com/photos/2166916/pexels-photo-2166916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Jellyfish floating"
  },
  {
    id: "marine_006",
    commonName: "Seahorse",
    scientificName: "Hippocampus",
    category: "marine",
    facts: [
      "Male seahorses carry and give birth to babies, not females.",
      "They can move each eye independently to watch for predators and prey.",
      "Seahorses mate for life and greet each other every morning with a dance."
    ],
    imageUrl: "https://images.pexels.com/photos/23459294/pexels-photo-23459294.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Seahorse"
  },
  {
    id: "marine_007",
    commonName: "Manta Ray",
    scientificName: "Mobula birostris",
    category: "marine",
    facts: [
      "Manta rays have the largest brain-to-body ratio of all fish.",
      "They can grow up to 7 meters wide and weigh up to 2,000 kg.",
      "Manta rays are filter feeders and eat up to 30 kg of plankton daily."
    ],
    imageUrl: "https://images.pexels.com/photos/27402085/pexels-photo-27402085.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Manta ray swimming"
  },
  {
    id: "marine_008",
    commonName: "Clownfish",
    scientificName: "Amphiprioninae",
    category: "marine",
    facts: [
      "Clownfish are immune to sea anemone stings and live among their tentacles.",
      "All clownfish are born male, and some change to female when needed.",
      "They can live for 6-10 years in the wild."
    ],
    imageUrl: "https://images.pexels.com/photos/6023997/pexels-photo-6023997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Clownfish in anemone"
  },
  {
    id: "marine_009",
    commonName: "Orca",
    scientificName: "Orcinus orca",
    category: "marine",
    facts: [
      "Orcas are the largest members of the dolphin family.",
      "They have complex social structures and unique dialects.",
      "Orcas can swim at speeds of up to 56 km/h."
    ],
    imageUrl: "https://images.pexels.com/photos/3695720/pexels-photo-3695720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Orca breaching"
  },
  {
    id: "marine_010",
    commonName: "Hammerhead Shark",
    scientificName: "Sphyrna mokarran",
    category: "marine",
    facts: [
      "The hammer-shaped head helps them detect prey using electroreception.",
      "They can grow up to 6 meters long.",
      "Hammerheads have 360-degree vision in the vertical plane."
    ],
    imageUrl: "https://images.pexels.com/photos/4781942/pexels-photo-4781942.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Hammerhead shark"
  },
  {
    id: "marine_011",
    commonName: "Starfish",
    scientificName: "Asteroidea",
    category: "marine",
    facts: [
      "Starfish can regenerate lost arms and even grow a new body from a single arm.",
      "They have no brain or blood, using filtered seawater instead.",
      "Starfish can have anywhere from 5 to 40 arms depending on the species."
    ],
    imageUrl: "https://images.pexels.com/photos/9613659/pexels-photo-9613659.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Starfish on reef"
  },
  {
    id: "marine_012",
    commonName: "Walrus",
    scientificName: "Odobenus rosmarus",
    category: "marine",
    facts: [
      "Walrus tusks can grow up to 1 meter long and are used for defense and hauling out of water.",
      "They can weigh up to 1,700 kg and live for 40 years.",
      "Walruses can slow their heart rate to withstand freezing temperatures."
    ],
    imageUrl: "https://images.pexels.com/photos/3164498/pexels-photo-3164498.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Walrus on ice"
  },
  {
    id: "marine_013",
    commonName: "Seal",
    scientificName: "Phocidae",
    category: "marine",
    facts: [
      "Seals can hold their breath for up to 2 hours while diving.",
      "They can dive to depths of over 600 meters.",
      "Seals have a thick layer of blubber to keep warm in cold water."
    ],
    imageUrl: "https://images.pexels.com/photos/105819/pexels-photo-105819.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Seal on beach"
  },
  {
    id: "marine_014",
    commonName: "Manatee",
    scientificName: "Trichechus",
    category: "marine",
    facts: [
      "Manatees are gentle herbivores that eat up to 10% of their body weight daily.",
      "They can live for 60 years and grow up to 4 meters long.",
      "Manatees are closely related to elephants."
    ],
    imageUrl: "https://images.pexels.com/photos/10962931/pexels-photo-10962931.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Manatee swimming"
  },
  {
    id: "marine_015",
    commonName: "Pufferfish",
    scientificName: "Tetraodontidae",
    category: "marine",
    facts: [
      "Pufferfish can inflate to several times their normal size when threatened.",
      "They contain tetrodotoxin, one of the most poisonous substances in nature.",
      "Despite their toxicity, pufferfish are considered a delicacy in Japan (fugu)."
    ],
    imageUrl: "https://images.pexels.com/photos/3990830/pexels-photo-3990830.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Pufferfish inflated"
  },

  // ===== INSECTS (10 species) =====
  {
    id: "insect_001",
    commonName: "Monarch Butterfly",
    scientificName: "Danaus plexippus",
    category: "insects",
    facts: [
      "Monarch butterflies migrate up to 4,800 km from Canada to Mexico each year.",
      "They are poisonous to predators due to toxins from milkweed plants.",
      "Monarchs use the sun and Earth's magnetic field to navigate."
    ],
    imageUrl: "https://images.pexels.com/photos/2629027/pexels-photo-2629027.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Monarch butterfly"
  },
  {
    id: "insect_002",
    commonName: "Honeybee",
    scientificName: "Apis mellifera",
    category: "insects",
    facts: [
      "A single honeybee produces only 1/12 teaspoon of honey in its lifetime.",
      "Honeybees communicate through complex dances to share flower locations.",
      "They visit up to 5,000 flowers in a single day."
    ],
    imageUrl: "https://images.pexels.com/photos/3070870/pexels-photo-3070870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Honeybee on flower"
  },
  {
    id: "insect_003",
    commonName: "Ladybug",
    scientificName: "Coccinellidae",
    category: "insects",
    facts: [
      "Ladybugs can eat up to 5,000 aphids in their lifetime.",
      "They secrete a foul-tasting fluid from their leg joints to deter predators.",
      "Ladybugs come in many colors including red, orange, and yellow."
    ],
    imageUrl: "https://images.pexels.com/photos/32288295/pexels-photo-32288295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Ladybug on leaf"
  },
  {
    id: "insect_004",
    commonName: "Dragonfly",
    scientificName: "Anisoptera",
    category: "insects",
    facts: [
      "Dragonflies can fly in any direction, including backwards and sideways.",
      "They have nearly 360-degree vision with 30,000 lenses in each eye.",
      "Dragonflies can catch prey mid-air with a 95% success rate."
    ],
    imageUrl: "https://images.pexels.com/photos/762941/pexels-photo-762941.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Dragonfly perched"
  },
  {
    id: "insect_005",
    commonName: "Ant",
    scientificName: "Formicidae",
    category: "insects",
    facts: [
      "Ants can lift objects 10-50 times their own body weight.",
      "They communicate using pheromones and can form complex colonies.",
      "Some ant species farm fungi for food, similar to human agriculture."
    ],
    imageUrl: "https://images.pexels.com/photos/12404843/pexels-photo-12404843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Ant carrying leaf"
  },
  {
    id: "insect_006",
    commonName: "Praying Mantis",
    scientificName: "Mantodea",
    category: "insects",
    facts: [
      "Praying mantises can turn their heads 180 degrees to scan their surroundings.",
      "They are the only insects that can see in 3D.",
      "Female mantises sometimes eat males after mating."
    ],
    imageUrl: "https://images.pexels.com/photos/1085542/pexels-photo-1085542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Praying mantis"
  },
  {
    id: "insect_007",
    commonName: "Firefly",
    scientificName: "Lampyridae",
    category: "insects",
    facts: [
      "Fireflies produce light through bioluminescence with nearly 100% efficiency.",
      "They use their light to attract mates with species-specific flash patterns.",
      "Firefly larvae glow to warn predators they taste bad."
    ],
    imageUrl: "https://images.pexels.com/photos/17961741/pexels-photo-17961741.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Firefly glowing"
  },
  {
    id: "insect_008",
    commonName: "Grasshopper",
    scientificName: "Caelifera",
    category: "insects",
    facts: [
      "Grasshoppers can jump 20 times their own body length.",
      "They have ears on their abdomen, not their head.",
      "Grasshoppers existed before dinosaurs, over 250 million years ago."
    ],
    imageUrl: "https://images.pexels.com/photos/17853677/pexels-photo-17853677.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Grasshopper on grass"
  },
  {
    id: "insect_009",
    commonName: "Beetle",
    scientificName: "Coleoptera",
    category: "insects",
    facts: [
      "Beetles make up 25% of all known animal species on Earth.",
      "Some beetles can lift objects 850 times their own weight.",
      "Beetles have been around for over 300 million years."
    ],
    imageUrl: "https://images.pexels.com/photos/53988/stag-beetle-great-stag-beetle-lucanus-cervus-beetle-53988.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Colorful beetle"
  },
  {
    id: "insect_010",
    commonName: "Mosquito",
    scientificName: "Culicidae",
    category: "insects",
    facts: [
      "Only female mosquitoes bite; males feed on nectar.",
      "Mosquitoes can detect carbon dioxide from up to 50 meters away.",
      "They are considered the deadliest animals due to disease transmission."
    ],
    imageUrl: "https://images.pexels.com/photos/86722/tiger-mosquito-mosquito-asian-tigermucke-sting-86722.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Mosquito close-up"
  }
];

// Category definitions
export const CATEGORIES = {
  mammals: 'Mammals',
  birds: 'Birds',
  reptiles: 'Reptiles',
  marine: 'Marine Animals',
  insects: 'Insects'
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

// Get count of animals per category
export function getCategoryCounts() {
  const counts: Record<CategoryKey, number> = {
    mammals: 0,
    birds: 0,
    reptiles: 0,
    marine: 0,
    insects: 0
  };
  
  ANIMAL_DATABASE.forEach(animal => {
    counts[animal.category]++;
  });
  
  return counts;
}
