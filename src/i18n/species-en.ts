import type { Locale } from "./locale";

export type SpeciesCopy = {
  name: string;
  tagline: string;
  description: string;
  buff: string;
  summonTags: string[];
  foodTags: string[];
  howToGetAlong: string;
  typicalSymptoms: string;
  roast: string;
};

type SpeciesFields = {
  species_key: string;
  name: string;
  tagline: string;
  description: string;
  buff: string;
  summon_tags: string[];
  food_tags: string[];
  how_to_get_along: string;
  typical_symptoms: string;
  roast: string;
};

// 英文显示文案层：只覆盖展示文字，按 species_key 索引。
// 图片文件名、species_key、评分算法与中文正式文案（manifest / species_content）均不受影响。
export const SPECIES_EN: Record<string, SpeciesCopy> = {
  "weekend-dog": {
    name: "Weekend Dog",
    tagline: "The weekend is my home turf. Monday to Friday? Just the warm-up.",
    description: "Your life creed: work exists so the weekend can be better. You start planning on Thursday night, and by Friday afternoon your heart has already flown off. Your weekends are always packed — not because you are busy, but because wasting a single minute feels like a crime. Friends asking you out? Always free. A last-minute plan? Bring it on.",
    buff: "Weekend recharging efficiency +200%, Monday battery life -50%",
    summonTags: ["Weekends", "Café hunting", "Brunch", "Outdoor plans", "Last-minute food invites"],
    foodTags: ["Brunch", "Specialty coffee", "Hyped restaurants", "Weekend-only specials"],
    howToGetAlong: "Never invite them on a weekday evening — that is when they are recharging. Weekend mornings are golden hour: a 99% success rate of getting them out the door.",
    typicalSymptoms: "Friday-afternoon slacking syndrome, Sunday-evening anxiety, Monday-morning walking corpse",
    roast: "Your weekends are more exhausting than your workdays, but you call that a life well lived.",
  },
  "weekend-missing": {
    name: "Weekend Ghost",
    tagline: "Weekends are not for going out. They are for healing.",
    description: "Your ideal weekend: nobody texting, nothing to attend, lying in bed until you wake up naturally. Going out is forced labour. Socialising — you already spent this month's quota last week. You run a complete homebody loop: delivery, series, games, sleep, repeat.",
    buff: "Solo recovery +150%, social energy drain -50% per session",
    summonTags: ["Food delivery", "Staying in", "Binge-watching", "Steam", "Sleep"],
    foodTags: ["Delivery", "Instant noodles", "Snacks", "Whatever is in the fridge"],
    howToGetAlong: "Do not invite them last minute; three days' notice gives you a chance. If they say “next time for sure”, there is no next time.",
    typicalSymptoms: "Under 500 steps all weekend, up only on Sunday afternoon, heavy food-delivery app user",
    roast: "Your weekend exercise quota is the distance from the bed to the bathroom.",
  },
  "city-guide": {
    name: "City Compass",
    tagline: "My friend map is this city's living guidebook.",
    description: "You carry a map of the city in your head: which café down which alley pours the best coffee, which park has the killer sunset, which new shop is worth the queue. When friends visit, you are a walking itinerary. Your weekend is never boring, because you always know what is happening where.",
    buff: "City exploration +100%, a full day out with friends without a single repeat",
    summonTags: ["Shop hunting", "City walks", "Exhibitions", "Niche spots", "Brand-new openings"],
    foodTags: ["Hidden little shops", "Neighbourhood canteens", "Local markets", "Newly opened restaurants"],
    howToGetAlong: "Ask them where to go — more reliable than any review app. If their recommendation disappoints, it really is your taste.",
    typicalSymptoms: "Gallery full of food and street scenes, level 8 on the review app, permanently top of the step-count board",
    roast: "You say you just want to lie flat, but your body keeps walking the city.",
  },
  homebody: {
    name: "Homebody",
    tagline: "My happiness lives on this sofa.",
    description: "Home is not where you sleep, it is the centre of the universe. Your sofa has been carefully worn into a perfect ergonomic dent. You can do anything at home — work, eat, train, watch films. Going out happens under duress. You own the full kit: projector, console, coffee machine, air fryer.",
    buff: "Home comfort +200%, motivation to leave the house -80%",
    summonTags: ["Projector", "Console gaming", "Home cooking", "Working from home", "Cat"],
    foodTags: ["Air fryer recipes", "Fridge inventory", "Delivery", "Microwave meals"],
    howToGetAlong: "Do not ask why they never go out; the answer is “what is out there”. Bringing them good food beats inviting them anywhere.",
    typicalSymptoms: "Piles of parcels at the door, the delivery driver knows their address, a body-shaped dip in the sofa",
    roast: "Your home has evolved into your shell, and leaving it feels like moulting.",
  },
  "social-peacock": {
    name: "Social Peacock",
    tagline: "Being the centre of attention is not a choice — my talent leaves me no option.",
    description: "You are the person a gathering naturally orbits. Not because you try, but because your field is too strong. You pick up conversations, lift the room, and make sure nobody feels left out. When a new face arrives you are the ice-breaker. You also know this gift is innate, and it costs something.",
    buff: "Social energy +150%, carrier of the whole room's vibe",
    summonTags: ["Parties", "Karaoke", "Murder mystery games", "Drinks", "New friends"],
    foodTags: ["Hotpot", "BBQ", "Izakaya", "Restaurants built for long conversations"],
    howToGetAlong: "A night with them never goes quiet. But do not keep pushing them to socialise once their energy runs out — that is just a faded peacock.",
    typicalSymptoms: "5000+ contacts, no party ever goes flat, weekend diary fuller than the workweek",
    roast: "Alone, on a 99% battery, you still do not know which app to open.",
  },
  "party-king": {
    name: "Party King",
    tagline: "Either I am organising something, or I am on my way to organise something.",
    description: "You are the engine of your friend group. No plans? You make them. Not enough people? You round them up. Nobody knows where to go? You decide. Your pinned chats are group conversations and your gallery is a wall of group photos. You love the feeling of pulling a bunch of people together — watching everyone have fun satisfies you more than anything.",
    buff: "Plan success rate +100%, friends' reply rate +80%",
    summonTags: ["Organising", "Hosting", "Activity planning", "Socialising", "Rounding people up"],
    foodTags: ["Group-dinner friendly places", "Good value spots", "Newly opened venues"],
    howToGetAlong: "Want to meet new people? Ask them. Want to eat with someone? Ask them. Want to go out but not think? Ask them.",
    typicalSymptoms: "10+ pinned group chats, a gallery of group photos, “let me organise it” as a catchphrase",
    roast: "Your contacts list is not a list of people. It is a list of resources.",
  },
  "slow-cat": {
    name: "Slow Cat",
    tagline: "Relax. The sky is not falling.",
    description: "You possess a calm that makes everyone around you anxious. You see the message, you just do not feel like replying yet. The deadline arrives and you know you will make it. Friends are jumping up and down while you drawl “no rush”. It is not procrastination — you genuinely see no reason to hurry. Your pace is slow, but you never drop the ball.",
    buff: "Stress immunity +80%, friend-anxiety aura +50%",
    summonTags: ["Spacing out", "Sunbathing", "Slow living", "Coffee", "Bookshops"],
    foodTags: ["Simple meals", "Light food", "Japanese cuisine", "Places you can sit for a while"],
    howToGetAlong: "Do not rush them. It does not work, and it only makes them slower. They will finish on time — they just will not finish early.",
    typicalSymptoms: "Read with no reply, master of arriving exactly on time, “on my way” means thirty minutes",
    roast: "Your sense of time: as long as I am not late, they simply arrived early.",
  },
  "social-cactus": {
    name: "Social Cactus",
    tagline: "Don't come too close — I sting. But once we are close, I bloom.",
    description: "Your first impression never changes: cold, unapproachable, do not talk to me. That is camouflage. Once we know each other I become a chatterbox, the funny one, the one who remembers how you take your coffee. My friends all pass through three stages: they seem so aloof, they are unhinged, they are genuinely lovely.",
    buff: "Stranger defence +100%, friend affection +100%",
    summonTags: ["Solitude", "Niche hobbies", "Deep conversations", "Quiet corners"],
    foodTags: ["Quiet little shops", "Solo-dining friendly", "Places with private rooms"],
    howToGetAlong: "Give them time; do not force the ice. Once they start saying pointless things in front of you, congratulations — you are in.",
    typicalSymptoms: "Manic with friends, mute with strangers, chat history swinging between two extremes",
    roast: "You have exactly two social states: iceberg to strangers, lunatic to friends.",
  },
  "cyber-social": {
    name: "Cyber Social",
    tagline: "Real-life socialising? Can't — I have three group chats to keep up with.",
    description: "Online and offline you are two different people. Online: meme warlord, joke machine, topic generator. Offline: smile, nod, silence. Your chat logs are richer than your diary and your internet friends know you better than your real ones. You can talk to a stranger online for three hours but rehearse before ordering coffee in person.",
    buff: "Online socialising +200%, offline socialising -50%",
    summonTags: ["Surfing the internet", "Gaming with a squad", "Meeting online friends (rarely)", "Memes"],
    foodTags: ["Delivery", "Convenience store", "Instant food", "Places requiring zero small talk"],
    howToGetAlong: "Do not drag them to offline meetups. Be their friend online first; the meeting-in-person part can wait until they are ready.",
    typicalSymptoms: "500+ saved memes, more online friends than real ones, types faster than they speak",
    roast: "Your social anxiety is not a condition. You just cannot be bothered switching modes.",
  },
  "dinner-engine": {
    name: "Meal Buddy Engine",
    tagline: "What's for today? Let me think — I already have been.",
    description: "You bring enormous enthusiasm and execution to the business of eating. Every day you think about the next meal, your bookmarks are all restaurants, half your gallery is food. Friends ask you to eat out and you are always free. The word “whatever” does not exist in your dictionary — you always have a recommendation.",
    buff: "Foraging ability +150%, friends' dinner-invite success rate +100%",
    summonTags: ["Dinner invites", "Shop hunting", "Food", "Queues", "Eating"],
    foodTags: ["Everything, but especially hotpot", "Japanese food", "BBQ", "Sichuan"],
    howToGetAlong: "Want to invite them? Just say what you are eating. If they say “anything is fine”, they are lying.",
    typicalSymptoms: "Restaurant bookmarks overflowing, storage full of food photos, “what should I eat today” as a daily philosophical problem",
    roast: "Life's three great unsolved problems: what to eat for breakfast, lunch and dinner.",
  },
  "food-hunter": {
    name: "Food Hunter",
    tagline: "I will cross half a city for one good meal.",
    description: "Your pursuit of food has reached hunter level. A new place opened? Go. A hidden shop across town? Find it. A friend mentioned a bowl of noodles in another district? You leave work and head straight there. You will put in superhuman effort to eat well, because you know good food deserves it.",
    buff: "Food radar +200%, legs that carry you across town for a meal +100%",
    summonTags: ["Food hunting", "Queues", "Cross-district foraging", "Hidden menu items"],
    foodTags: ["Street stalls", "Humble local joints", "Hidden shops", "Old-established names"],
    howToGetAlong: "Never ask whether they mind travelling far to eat — the answer is always “let's go”. Their food map could fill a book.",
    typicalSymptoms: "Two-hour queues for a meal, crossing half a city to eat, notes app full of food lists",
    roast: "If someone says they would cross half a city for you, it is because they want to take you to that restaurant.",
  },
  "cafe-resident": {
    name: "Café Resident",
    tagline: "Either I am at the café, or on my way to it.",
    description: "The café is your second home. You have a regular seat, a barista who knows you, and a list of independent cafés longer than most tourist guides. You can work, read, stare into space or socialise there — for you the café is not about coffee, it is a way of living. You may own a machine at home and still prefer to go out.",
    buff: "Caffeine metabolism +200%, café ambience +100%",
    summonTags: ["Coffee", "Independent cafés", "Pour-over", "Latte", "Working remotely"],
    foodTags: ["Croissants", "Basque cheesecake", "Tiramisu", "Anything that pairs with coffee"],
    howToGetAlong: "Suggesting a café is never wrong. Do not ask why they work from a café — the answer is “the vibe”.",
    typicalSymptoms: "A coffee map on the phone, can tell where the beans came from, more coffee gear at home than tableware",
    roast: "You say you go to cafés for the coffee, then nurse a single cup for four hours.",
  },
  "happy-eater": {
    name: "Happy Eater",
    tagline: "No problem survives a good meal. If one does, two will.",
    description: "You are the person who stamps with joy when the food is delicious. Eating is not filling a hole, it is a spring of happiness. You sigh out loud at the first bite, and you will cross town for one specific dessert. Your happiness threshold is low — if it tastes good, today is a good day.",
    buff: "Food joy +200%, one good meal cures a bad mood",
    summonTags: ["Eating out", "Food check-ins", "Shop hunting", "Desserts", "Fizzy drinks"],
    foodTags: ["Sweet", "Spicy", "Savoury", "Crunchy — anything good"],
    howToGetAlong: "Never raise serious topics when they are hungry. Take them somewhere tasty and you become their best friend.",
    typicalSymptoms: "Stamps when the food is good, eats when unhappy, eats when happy, gallery full of food",
    roast: "You have exactly one emotional regulation strategy: treat yourself.",
  },
  "dopamine-beast": {
    name: "Dopamine Beast",
    tagline: "Thrills! More thrills! Keep the thrills coming!",
    description: "You need novelty the way fish need water: new experiences, new hobbies, new spikes of excitement. You probably have ten abandoned hobbies, but each one made you electric at the time. Your life is a rollercoaster — you love the peaks, and that is exactly why flat ordinary days hurt.",
    buff: "Novelty intake +300%, three-day enthusiasm -100%",
    summonTags: ["Extreme sports", "New hobbies", "Adventure", "Impulse trips", "Trying anything new"],
    foodTags: ["Foreign cuisines", "Weird food finds", "Newly opened places", "Anything with a show"],
    howToGetAlong: "Time with them is never dull, but do not expect them to keep doing the same thing beside you forever.",
    typicalSymptoms: "Monthly hobby swaps, “this looks so fun” as a catchphrase, “meh, it is okay” three days later",
    roast: "Your hobbies have shorter lifespans than a goldfish's memory, but each one was true love.",
  },
  "outdoor-savage": {
    name: "Outdoor Savage",
    tagline: "Office walls cannot hold me. My soul is up the mountain.",
    description: "You are a savage trapped in a city. Your weekends are either on a trail or on the way to a campsite. You know every route and which ridge has the best sunrise. Outdoors you are actually yourself — in the city you are just an employee, in the mountains you are free.",
    buff: "Outdoor endurance +200%, city blues -100%",
    summonTags: ["Hiking", "Camping", "Mountains", "Cycling", "River trekking"],
    foodTags: ["Trail food", "Self-heating meals", "Campfire BBQ", "Instant noodles cooked at altitude"],
    howToGetAlong: "Want to invite them out? Invite them outside. Do not suggest a shopping mall — they will suffocate.",
    typicalSymptoms: "20,000+ steps on a weekend, more gear than clothes, checks the weather forecast obsessively",
    roast: "A savage in the city; the office is your temporary cage.",
  },
  "spontaneous-monster": {
    name: "Whim Monster",
    tagline: "Plans? What are those?",
    description: "You are the leaving-right-now type. Plans exist to be broken. Your mottos are “we are already here” and “whatever happens”. You enjoy the thrill of uncertainty and hate being tied to a schedule. Your friends have grown used to your sudden appearances and last-minute changes.",
    buff: "Impromptu success rate +200%, plan execution -80%",
    summonTags: ["Impulse trips", "Last-minute ideas", "Random adventures", "Leave it to fate"],
    foodTags: ["Eat whatever appears", "Walk into whatever shop", "Blind-box restaurants"],
    howToGetAlong: "Do not make them plan — the moment they plan, the plan dies. To invite them say “coming or not”, never “next week”.",
    typicalSymptoms: "Plans constantly changing, “we will see” as a catchphrase, friends gave up nagging them",
    roast: "Your plan is having no plan. Your schedule is fate.",
  },
  "human-itinerary": {
    name: "Human Itinerary",
    tagline: "My calendar is fuller than a CEO's, and I am just an ordinary person.",
    description: "Your calendar is a work of art. Every day is sliced into half-hour blocks, colour-coded, priority-labelled. You run at least three calendars: work, life, side project. It is not that you cannot relax — it is that time spent on something with no output feels wasted. You enjoy the density of a full schedule.",
    buff: "Time utilisation +300%, anxiety about doing nothing -200%",
    summonTags: ["Efficiency", "Planning", "Scheduling", "To-do lists", "Goals"],
    foodTags: ["Quick healthy meals", "Planned diets", "Meal prep"],
    howToGetAlong: "Book them at least three days ahead. If they open their calendar and say “let me check”, they are taking you seriously.",
    typicalSymptoms: "A calendar that overflows, anxiety about wasting time, rest days more tiring than workdays",
    roast: "You schedule leisure, then complete it. Is that rest? That is a task.",
  },
  "night-revive": {
    name: "Night Revival",
    tagline: "The day belongs to the world. The night belongs to me.",
    description: "Low battery all day, fully alive at night. By daylight you are an ordinary worker; after dark you become the real you. You love the quiet of the night — nobody needs you, no messages flooding in, the world finally belongs to you. Your best work and your best ideas both arrive late.",
    buff: "Night-time productivity +150%, daytime -20%",
    summonTags: ["Late night", "Solitude", "Night views", "Midnight snacks", "Night runs"],
    foodTags: ["Late-night snacks", "BBQ", "Midnight diner", "Instant noodles"],
    howToGetAlong: "Do not discuss anything important in the morning — their brain has not booted yet. After 11pm is their golden hour.",
    typicalSymptoms: "Cannot sleep at night, cannot wake in the morning, inspiration bursts at 2am, “five more minutes” until three",
    roast: "Your body clock runs nocturnal: a walking corpse by day, a superhero by night.",
  },
  "night-low-power": {
    name: "Night Low Battery",
    tagline: "Good night, world. I reopen tomorrow.",
    description: "You get sleepy at a set hour and sleep at a set hour. Evening plans? No thanks, my bed is waiting. Your ideal night: shower, lie down, scroll a little, then sleep. You cannot understand night owls, the way they cannot understand how you sleep this early.",
    buff: "Early-to-bed rate +200%, ability to stay up -100%",
    summonTags: ["Sleeping early", "Wellness", "Sleep", "Quiet", "Comfort"],
    foodTags: ["Light dinners", "Herbal tea", "Warm milk"],
    howToGetAlong: "Do not plan evenings with them — their night belongs to the bed. If they have not replied by 10pm, they are asleep.",
    typicalSymptoms: "Sleepy from 10pm, always declines late-night food, early to bed and early to rise by instinct",
    roast: "Your night is not for staying up. It is for standby mode.",
  },
  "human-moments": {
    name: "Human Watcher",
    tagline: "The world is fascinating. Watching from the side is enough.",
    description: "You are a born observer. You like sitting by a café window watching people pass, on a park bench watching old men play chess, scrolling other people's lives online. You do not need to take part — watching is already entertaining. You notice details everyone else walks straight past.",
    buff: "Insight +200%, urge to participate -80%",
    summonTags: ["Watching", "Spacing out", "Café windows", "Park benches", "Scrolling"],
    foodTags: ["People-watching friendly places", "Window seats", "Quiet atmospheres"],
    howToGetAlong: "They may not talk much, but they see everything. Do not mistake their silence for boredom — they are observing you.",
    typicalSymptoms: "Content spacing out alone, only likes and never comments, knows a lot and says nothing",
    roast: "You think they are daydreaming. They are writing your character study.",
  },
  "life-documentary": {
    name: "Life Documentary",
    tagline: "If it is not recorded, it did not happen. My life is an ongoing series.",
    description: "You are the person who insists that life has ritual. Photo before the meal, a cut video after the trip, even small daily things get posted. Your gallery and cloud storage are permanently full. You document every moment, because you believe all of it deserves remembering. When you are old, you will have one complete documentary of your life.",
    buff: "Life documentation +200%, memory retention +150%",
    summonTags: ["Photos", "Vlogs", "Plogs", "Documenting", "Sharing"],
    foodTags: ["Photogenic food", "Beautifully plated places", "Places with atmosphere"],
    howToGetAlong: "They photograph the food first — do not rush them. Offer to take the photos and you become their best friend.",
    typicalSymptoms: "Photo before bite, cloud storage never big enough, gallery sorted by month",
    roast: "Your motto: if it was not photographed, it was not eaten.",
  },
  "deep-talk": {
    name: "Midnight Philosopher",
    tagline: "Gossip by day, existence by night.",
    description: "You can joke around with everyone by daylight, then turn serious somewhere after midnight. You think about the meaning of life late at night and send friends long paragraphs of insight. You love real conversations and dislike small talk. You can talk with someone until dawn — the universe, love, death.",
    buff: "Deep thinking +200%, midnight philosophy +100%",
    summonTags: ["Late-night talks", "Philosophy", "Life", "Thinking", "Deep conversations"],
    foodTags: ["Quiet bars", "Late-night dining", "Places where the conversation beats the food"],
    howToGetAlong: "Night is their switch. If you want a real conversation, wait until evening. By day they will only send you memes.",
    typicalSymptoms: "Late-night melancholy, cheerful all day, chat history reads like two different people",
    roast: "By day an ordinary person, by night a philosopher.",
  },
  "banter-artist": {
    name: "Banter Artist",
    tagline: "This mouth of mine: silver-tongued, and a hazard to everyone.",
    description: "Your mouth outruns your brain. You roast people, but exactly hard enough that they laugh while being annoyed. Your friends long stopped minding the venom — they know you mean no harm, you are just like that. You are the mood section of the group chat and the comedian of the table. Your one problem: sometimes you are too honest and kill the conversation.",
    buff: "Sarcasm damage +100%, group chat energy +200%",
    summonTags: ["Roasting", "Jokes", "Group chats", "Frenemies", "Comedy"],
    foodTags: ["Lively restaurants", "Street food stalls", "Places made for eating and talking"],
    howToGetAlong: "Do not take their jabs personally — they do it to everyone. If they stop roasting you, you are not close enough yet.",
    typicalSymptoms: "Mouth faster than brain, regret right after saying it, doing it again next time",
    roast: "Your creed: as long as I feel no awkwardness, the awkwardness belongs to someone else.",
  },
  "invisible-mode": {
    name: "Invisible Mode",
    tagline: "I am not bad at crowds. I chose to go invisible.",
    description: "You can vanish in a room full of people. Not social fear — you simply opt out. You can sit quietly in the corner of a loud party, watching everything, feeling no need to join. You do not hate socialising, you just find much of it unnecessary. You can switch social mode on when required; it is just not your default.",
    buff: "Invisibility +200%, social mode available on demand",
    summonTags: ["Solitude", "Quiet", "Observing", "Selective socialising", "Going invisible"],
    foodTags: ["Places where dining alone is comfortable", "Restaurants where nobody bothers you"],
    howToGetAlong: "Respect the invisibility. When they are quiet they are not unhappy — they just do not feel like talking.",
    typicalSymptoms: "Automatically invisible at parties, “I am fine” genuinely meaning I am fine, never bored alone",
    roast: "You are not afraid of people. You just think most socialising is not worth switching on for.",
  },
};

export function localizeSpecies<T extends SpeciesFields>(species: T, locale: Locale): T {
  if (locale === "zh") return species;
  const en = SPECIES_EN[species.species_key];
  if (!en) return species;
  return {
    ...species,
    name: en.name,
    tagline: en.tagline,
    description: en.description,
    buff: en.buff,
    summon_tags: en.summonTags,
    food_tags: en.foodTags,
    how_to_get_along: en.howToGetAlong,
    typical_symptoms: en.typicalSymptoms,
    roast: en.roast,
  };
}

export function speciesName(key: string, fallback: string, locale: Locale): string {
  if (locale === "zh") return fallback;
  return SPECIES_EN[key]?.name ?? fallback;
}
