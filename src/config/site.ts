/**
 * Every piece of church-specific content lives here.
 *
 * Editing this file is the safest way to change the site: the pages read from
 * it, so a corrected time or a new staff member only has to be typed once.
 */

export const SITE = {
  name: "Calvary Baptist Church",
  shortName: "Calvary Baptist",
  city: "McMinnville",
  state: "TN",
  tagline: "We Preach Christ Crucified, Risen, and Coming Again",
  url: "https://www.calvarybaptistnews.com",
  description:
    "Calvary Baptist Church is a friendly, traditional, Independent Baptist church in McMinnville, Tennessee. Sunday School at 10:00, worship at 12 noon, and Bible preaching from the King James Bible.",
  founded: 1972,
  pastor: "Thomas Fittis",
  pastorInformal: "Bro. Tom",

  address: {
    street: "610 Myers Lane",
    city: "McMinnville",
    state: "TN",
    zip: "37110",
    full: "610 Myers Lane, McMinnville, TN 37110",
  },

  phone: "(931) 815-3919",
  phoneHref: "tel:+19318153919",

  mapEmbed:
    "https://www.google.com/maps?q=610+Myers+Lane,+McMinnville,+TN+37110&output=embed",
  mapLink:
    "https://www.google.com/maps/dir/?api=1&destination=610+Myers+Lane%2C+McMinnville%2C+TN+37110",

  giveUrl: "https://onrealm.org/calvarybaptistc33033/-/form/give/now",
  facebookUrl: "https://www.facebook.com/calvarybroadcast",
  youtubeUrl:
    "https://www.youtube.com/channel/UCI_B3V_W-tHU2p7LJgCcTXQ/featured",
  /** Drives the auto-updating sermon list on /sermons. */
  youtubeChannelId: "UCI_B3V_W-tHU2p7LJgCcTXQ",
  /**
   * A channel's "uploads" playlist is its id with UC swapped for UU. Embedding
   * that playlist always plays the newest sermon first, with no API key and no
   * dependence on the RSS feed (which YouTube rate-limits with a 404). This is
   * what keeps the player on /sermons working even when the feed is unavailable.
   */
  youtubeUploadsPlaylist: "UUI_B3V_W-tHU2p7LJgCcTXQ",
  anchorsPdf: "https://www.wholesomewords.org/pdf/anchors.pdf",
  discipleshipPdf:
    "https://irp.cdn-website.com/f4ca3a22/files/uploaded/Discipleship_101_Master._Revised_July_2025.pdf",
} as const;

/** Weekly schedule. `note` renders as small print under the time. */
export const SERVICES = [
  {
    day: "Sunday",
    name: "Sunday School",
    time: "10:00 am",
    note: "Classes for all ages",
  },
  {
    day: "Sunday",
    name: "Morning Worship",
    time: "12:00 noon",
    note: "Children's Church meets at the same hour",
  },
  {
    day: "Sunday",
    name: "Evening Bible Hour",
    time: "6:00 pm",
    note: "Teen Rally meets during this hour",
  },
  {
    day: "Wednesday",
    name: "Prayer & Bible Study",
    time: "6:45 pm",
    note: "Master Clubs, ages 4 through 6th grade, at 6:30 pm",
  },
  {
    day: "Thursday",
    name: "School of the Bible",
    time: "7:00 pm",
    note: "Open to everyone — no cost, no credit required",
  },
  {
    day: "Tuesday",
    name: "Visitation & Outreach",
    time: "6:00 pm",
    note: "We go out two by two across McMinnville",
  },
] as const;

/**
 * TV and radio, as listed on the church's weekly bulletin. The Amazing Grace
 * broadcast on 90.9 is the church's own programme.
 */
export const BROADCASTS = [
  {
    station: "King of Kings Radio — 90.9 FM",
    place: "Cookeville, Tennessee",
    programme: "The Amazing Grace Broadcast",
    when: "Saturdays, 6:30 pm",
  },
  {
    station: "92.1 FM",
    place: "McMinnville area",
    programme: "Sunday broadcast",
    when: "Sundays, 10:30 am",
  },
  {
    station: "BLTV Channel 6",
    place: "Local television",
    programme: "Sunday and Wednesday services",
    when: "Sundays 8:00 am & 7:30 pm · Wednesdays 8:30 pm",
  },
] as const;

/** The church's own descriptor, as printed on its bulletin. */
export const DESCRIPTOR = "Independent · Fundamental · Premillennial";

export const NURSERY_NOTE =
  "A nursery for children three and under is provided at every service.";

/** Leadership, in the order the church lists them. */
export const LEADERS = [
  {
    name: "Thomas & Leslie Fittis",
    role: "Pastor · Children's Ministries",
    photo: "/img/staff-fittis.png",
    bio: [
      "Thomas is from Belfast, Northern Ireland. He is married to Leslie, who is from Memphis, Tennessee, and they have three children. At the age of eighteen, Thomas was saved at Victory Baptist Church in Belfast — a church founded through the missionary efforts of Freeman Goodge and Ed Bissett.",
      "Four months after he became a Christian, Thomas enrolled at Tennessee Temple University in Chattanooga for his ministerial training. Thomas and Leslie were married in 1983 and then served the Lord in Northern Ireland for nineteen years before returning to the United States in 2005. Since then the couple have served as Director of Enrichment at Baptist International Missions, Inc., and as pastor of Temple Baptist Church and Calvary Baptist Church in McMinnville, Tennessee.",
      "Pastor Fittis enjoys expository preaching and teaching of the Scriptures in each service. Christ is lifted up as the Word of God is proclaimed, and people are encouraged to believe upon Christ and grow in the Lord. Ms. Leslie helps with the children's ministries at Calvary.",
    ],
  },
  {
    name: "Jeremy & Hanna Jones",
    role: "Assistant Pastor · Youth Ministry",
    photo: "/img/staff-jones.png",
    bio: [
      "Jeremy and Hanna are both graduates of Hyles Anderson College, where Hanna's parents teach on faculty. Jeremy grew up in a preacher's home and has a real heart for people and ministry.",
      "Jeremy is the Assistant Pastor and also, with his wife, leads our youth ministries — meeting weekly at the Sunday Evening Teen Rally, along with fun events held every month. Hanna is also our Nursery Coordinator.",
    ],
  },
  {
    name: "Mike & Jennifer Stanley",
    role: "Song Leader · Pianist & Organist",
    photo: "/img/staff-stanley.png",
    bio: [
      "Mike and Jennifer Stanley have faithfully served the Lord for many years. Both graduates of Bob Jones University, Jennifer helps as pianist and Mike leads the congregational singing. Our music ministry emphasizes genuine, heartfelt worship using traditional hymns and choruses.",
      "Mike also organizes the outreach ministry of the church, and is a deacon and trustee at Calvary.",
    ],
  },
  {
    name: "Billy & Sherry Kirk",
    role: "Senior Ministry · Ministry Coordinator",
    photo: "/img/staff-kirk.png",
    bio: [
      "Billy and Sherry Kirk help lead our senior ministry, assisted by Ed and Nancy Davis. Fun times of fellowship and activities are planned each month for our seniors to meet, make friends, and be a blessing to each other.",
      "Sherry is our Church Secretary, and Billy is a deacon and trustee at Calvary.",
    ],
  },
  {
    name: "Robert & Connie Ditmore",
    role: "Children's Ministry · Media Ministry",
    photo: "/img/staff-ditmore.png",
    bio: [
      "Robert, with his wife Connie, leads our JAM Club (Jesus And Me) for school-aged children. JAM meets on Wednesday evenings at 7:00 pm.",
      "Robert is a graduate of Liberty University and holds two Master's degrees, in History and Education. He is also editor of our church quarterly, \"The Calvary Newsletter,\" leads our Church Media Ministry, and is a trustee at Calvary.",
    ],
  },
  {
    name: "Rachel Waters",
    role: "Pianist",
    photo: null,
    bio: [
      "Rachel provides beautiful piano music for our congregational singing and special groups.",
      "Rachel is assisted by Mrs. Holly Whitley and Mrs. Jennifer Stanley in our music ministry. Our church worship style is traditional, with the singing of the old hymns and choruses that many people grew up with. These hymns provide a theological depth to our worship — songs that the generation before us sang, songs that we will know and sing into our old age.",
    ],
  },
] as const;

/** Testimonies as given by members on the church's own website. */
export const TESTIMONIES = [
  {
    quote:
      "Calvary Baptist is a great church with a pastor that preaches truth directly from the Bible. It is a growing and loving church that feels like a true Christian family.",
    name: "Josh Jernigan",
  },
  {
    quote:
      "I enjoy each service here at Calvary! The sermons are wonderful, and I always learn something! I have also enjoyed being part of the youth group!",
    name: "Heidi Bohman",
  },
  {
    quote:
      "What a blessing it has been to have a place to go to actually hear the Word of God preached in truth. In addition, this is one of the most loving church families I have ever belonged to.",
    name: "Robert Ditmore",
  },
  {
    quote:
      "This church is a true Bible believing and Bible preaching church. The people are welcoming and there are programs for all ages.",
    name: "Sandra Bryan",
  },
  {
    quote:
      "The absolute best Bible-believing church, with excellent teaching and a family-like atmosphere.",
    name: "Hillary Campbell",
  },
] as const;

export const MINISTRIES = [
  {
    title: "Children's Ministry",
    href: "/ministries/children",
    blurb:
      "Children's Church every Sunday at 11:00, JAM Club on Wednesday evenings, and Master Clubs for ages four through sixth grade.",
    meta: "Sundays 11:00 am · Wednesdays 7:00 pm",
  },
  {
    title: "Youth",
    href: "/ministries/youth",
    blurb:
      "Teens meet at the Sunday Evening Teen Rally, with fun events planned every month. Led by Jeremy and Hanna Jones.",
    meta: "Sunday evenings · Monthly events",
  },
  {
    title: "Ladies Ministry",
    href: "/ministries/ladies",
    blurb:
      "The ladies of Calvary gather through the year for fellowship, encouragement, and service — including our annual Christmas party.",
    meta: "Through the year",
  },
  {
    title: "Senior Fellowship",
    href: "/ministries/seniors",
    blurb:
      "The seniors of our church, 50 and up, meet regularly for social and spiritual encouragement. Led by Billy and Sherry Kirk.",
    meta: "Monthly · Ages 50+",
  },
  {
    title: "Music Ministry",
    href: "/ministries/music",
    blurb:
      "Traditional worship — the old hymns and choruses, sung by the congregation, with piano, organ, and special groups.",
    meta: "Every service",
  },
  {
    title: "Visitation & Outreach",
    href: "/ministries/outreach",
    blurb:
      "Every Tuesday evening we go out across McMinnville with the gospel, door to door and to those who have visited our services.",
    meta: "Tuesdays 6:00 pm",
  },
] as const;

/** Missionary roster, grouped as the church groups it. */
export const MISSION_TEAMS = [
  {
    region: "South & Central America · Caribbean & Africa",
    leaders: "Justin and Sandra Bryan",
    missionaries: [
      "Eric Bohman — Africa Director, BIMI",
      "Erica Bohman — Kenya, East Africa",
      "Kyle Burchwell — Liberia, West Africa",
      "Jacob Clower — Mozambique",
      "Calvin George — Cuba",
      "Joshua Morris — Bolivia",
      "Larry Nelson — Africa Representative",
      "Lynette Osborn — South Africa",
      "Bruno Mendes — Brazil",
      "Charles Powell — Mexico",
      "Sam Sanderlin — Cameroon, Africa",
      "Kathy Stark — Uganda, East Africa",
      "Darren Townsend — Peru",
      "Evan Williams — Honduras",
    ],
  },
  {
    region: "Europe",
    leaders: "Mike and Jennifer Stanley",
    missionaries: [
      "Mike Comstock — England",
      "Brandon Cook — Italy",
      "Joshua Furan — Ireland",
      "Zachary Gillit — England",
      "Jonathan Heaton — United Kingdom",
      "Homan Family — Italy",
      "William LeFevre — Bulgaria",
      "Zachary LeFevre — Bulgaria",
      "Andrew Livingstone",
      "Oriel O'Gorman — Ireland",
      "Sam Quinn — United Kingdom",
      "B. J. Stagner — United Kingdom",
      "Jonathan VandenHurk — United Kingdom",
      "James Wilson — Northern Ireland",
      "Larry Writesel — Spain",
    ],
  },
  {
    region: "Far East",
    leaders: "Jeremy and Hanna Jones",
    missionaries: [
      "Solomon Ambrosia — Philippines",
      "Gregory Bach — Mongolia",
      "Ben Bounds — Faith Int. Partners, Myanmar",
      "Clint Burden — Indonesia",
      "Brian Delaney — South Korea",
      "Anjelo De Dios — Philippines",
      "Ken Fielder — World View, 10/40 Window",
      "Jesse Galuta — Philippines",
      "B. Isaac — India",
      "Brandon Kelley — Indonesia",
      "Jeremy Martin — Mongolia",
      "April Mato — Philippines",
      "Jason Ottosen — Papua New Guinea",
      "Chris Reed — Thailand",
    ],
  },
  {
    region: "North America",
    leaders: "Ed and Nancy Davis",
    missionaries: [
      "Tabatha Beam — Silent Word Ministries",
      "Bible & Literature Foundation — Printing",
      "Jay Brandon — Jewish End-time Ministries",
      "Rick Flanders — Evangelist",
      "Linda Fulton — Rock of Ages Prison Ministry",
      "Joe Gammon — Lighthouse Baptist Ministries",
      "Betty Gillies — Safely Home Children's Ministry",
      "The Good Shepherd Children's Home",
      "King of Kings Radio — Somerset, KY",
      "Lighthouse Baptist Ministries",
      "Fabian Ruiz — USA",
      "Jerry Sexton — Bearing Precious Seeds",
      "Tony Smith — Victory Baptist Press",
      "Shenandoah Boys' Ranch — Cleveland, TN",
      "Tim Vermaas — Good News for Little People",
      "James Womack — Military, Fort Knox, KY",
    ],
  },
] as const;

export const SPECIAL_PROJECTS = [
  {
    title: "Disaster Relief Team",
    when: "October 2024",
    blurb:
      "Our team travelled to North Carolina following Hurricane Helene to help families dig out, rebuild, and hear the gospel.",
  },
  {
    title: "The Mongolian Project",
    when: "2025",
    blurb:
      "Helping to build the only Christian church in Hagal, Mongolia — a building for a congregation that has had none.",
  },
  {
    title: "Orphanage Mission Trip, Panama",
    when: "2025",
    blurb:
      "Lorena Wagner and Betty Gillies travelled to David, Panama, to serve the children's orphanage there.",
  },
] as const;

export const NAV: {
  label: string;
  href: string;
  children?: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Pastor & Leaders", href: "/leadership" },
      { label: "What We Believe", href: "/what-we-believe" },
      { label: "Our History", href: "/history" },
      { label: "Our Vision", href: "/vision" },
      { label: "New Building Project", href: "/new-building" },
      { label: "How to Join", href: "/join" },
    ],
  },
  {
    label: "Ministries",
    href: "/ministries",
    children: [
      { label: "All Ministries", href: "/ministries" },
      { label: "Children's Ministry", href: "/ministries/children" },
      { label: "Youth", href: "/ministries/youth" },
      { label: "Ladies Ministry", href: "/ministries/ladies" },
      { label: "Senior Fellowship", href: "/ministries/seniors" },
      { label: "School of the Bible", href: "/school-of-the-bible" },
      { label: "Missions", href: "/missions" },
      { label: "Special Projects", href: "/special-projects" },
    ],
  },
  {
    label: "Sermons",
    href: "/sermons",
    children: [
      { label: "Watch & Listen", href: "/sermons" },
      { label: "Radio Broadcasts", href: "/radio" },
      { label: "Free Resources", href: "/resources" },
      { label: "Weekly Bulletin", href: "/bulletin" },
      { label: "Bulletin Library", href: "/bulletin#library" },
    ],
  },
  { label: "Visit", href: "/visit" },
  { label: "Contact", href: "/contact" },
];