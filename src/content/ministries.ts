/**
 * Detail content for each ministry page. `slug` is the URL segment under
 * /ministries. Keep the keys in step with MINISTRIES in config/site.ts.
 */

export type MinistryDetail = {
  slug: string;
  title: string;
  eyebrow: string;
  lead: string;
  photo: { src: string; alt: string; caption?: string };
  meetings: { name: string; when: string; who?: string }[];
  body: string[];
  led?: string;
};

export const MINISTRY_DETAILS: MinistryDetail[] = [
  {
    slug: "children",
    title: "Children's Ministry",
    eyebrow: "Nursery through sixth grade",
    lead: "There is somewhere for your children to be at every service, and someone glad to have them there.",
    photo: {
      src: "/img/sanctuary-interior.jpg",
      alt: "Inside the Tabernacle, where Children's Church meets during the morning service",
      caption: "Children's Church meets during the 11:00 hour.",
    },
    meetings: [
      {
        name: "Children's Church",
        when: "Sundays, 11:00 am",
        who: "During morning worship",
      },
      {
        name: "Sunday School",
        when: "Sundays, 10:00 am",
        who: "A class for every age",
      },
      {
        name: "JAM Club — Jesus And Me",
        when: "Wednesdays, 7:00 pm",
        who: "School-aged children",
      },
      {
        name: "Master Clubs",
        when: "Wednesdays, 6:30 pm",
        who: "Ages 4 through 6th grade",
      },
      {
        name: "Nursery",
        when: "Every service",
        who: "Ages three and under",
      },
    ],
    body: [
      "Children's Church meets every Sunday morning at 11:00, at the same hour as the preaching service, so parents can hear the message while their children get one of their own.",
      "On Wednesday evenings, Robert and Connie Ditmore lead our JAM Club — Jesus And Me — for school-aged children, and Master Clubs meets for ages four through sixth grade. Both are a mix of Bible teaching, memory work, and a good deal of fun.",
      "Through the year there is a Children's Christmas Play and a JAM Club Christmas party. A staffed nursery is available for ages three and under at every service, coordinated by Hanna Jones.",
    ],
    led: "Robert & Connie Ditmore, with Ms. Leslie Fittis",
  },
  {
    slug: "youth",
    title: "Youth Ministry",
    eyebrow: "Teens",
    lead: "Our teens meet weekly at the Sunday Evening Teen Rally, with fun events planned every month.",
    photo: {
      src: "/img/fellowship-outdoors.jpg",
      alt: "Church families on the field at 610 Myers Lane, a ball game going on in the grass",
      caption: "Nineteen acres makes for good ball games.",
    },
    meetings: [
      {
        name: "Teen Rally",
        when: "Sunday evenings",
        who: "During the 6:00 Bible Hour",
      },
      { name: "Youth events", when: "Monthly", who: "Announced in the bulletin" },
    ],
    body: [
      "Jeremy and Hanna Jones lead our youth ministries. Both are graduates of Hyles Anderson College, where Hanna's parents teach on faculty, and Jeremy grew up in a preacher's home. They have a real heart for young people.",
      "The Teen Rally meets weekly during the Sunday evening hour — singing, a message aimed squarely at teenagers, and time together afterward. Once a month there is an event of some kind, and the nineteen acres out back get put to good use.",
      "Teens are welcome in every service of the church, and several of them serve in the music and media ministries.",
    ],
    led: "Jeremy & Hanna Jones, Assistant Pastor",
  },
  {
    slug: "ladies",
    title: "Ladies Ministry",
    eyebrow: "Women of Calvary",
    lead: "The ladies of Calvary gather through the year for fellowship, encouragement, and service.",
    photo: {
      src: "/img/pavilion-chairs.jpg",
      alt: "The pavilion at 610 Myers Lane set with chairs for a gathering",
      caption: "The pavilion, set for a gathering.",
    },
    meetings: [
      { name: "Ladies fellowships", when: "Through the year" },
      { name: "Annual Christmas party", when: "December" },
    ],
    body: [
      "Our ladies meet for fellowship, Bible study, and service projects at points through the year. The annual Christmas party is the one everybody plans around — food, gifts, and a great deal of laughing.",
      "Beyond the gatherings, the ladies of Calvary carry a good deal of the church's quiet work: meals for families in need, cards to the sick and shut-in, the nursery rotation, and the hospitality that makes a visitor feel expected rather than merely noticed.",
      "If you would like to know when the next fellowship is, ask any of the ladies on a Sunday morning or send us a message and we will pass it along.",
    ],
  },
  {
    slug: "seniors",
    title: "Senior Fellowship",
    eyebrow: "Ages 50 and up",
    lead: "The seniors of our church, fifty and up, meet regularly for social and spiritual encouragement.",
    photo: {
      src: "/img/property-sunset.jpg",
      alt: "Evening light over the field and drive at 610 Myers Lane, cars parked along the gravel",
      caption: "Evening on the property at Myers Lane.",
    },
    meetings: [
      { name: "Senior fellowship", when: "Monthly", who: "Ages 50 and up" },
    ],
    body: [
      "Billy and Sherry Kirk help lead our senior ministry, assisted by Ed and Nancy Davis. Fun times of fellowship and activities are planned each month for our seniors to meet, make friends, and be a blessing to each other.",
      "Some months it is a meal together, some months a trip, some months simply an afternoon of coffee and conversation in the fellowship hall. Anyone fifty and over is welcome — including visitors who have not yet decided whether Calvary is home.",
    ],
    led: "Billy & Sherry Kirk, with Ed & Nancy Davis",
  },
  {
    slug: "music",
    title: "Music Ministry",
    eyebrow: "Traditional worship",
    lead: "The old hymns and choruses, sung by the whole congregation, with piano and organ.",
    photo: {
      src: "/img/congregation-worship.jpg",
      alt: "The congregation standing to sing during a Sunday morning service at Calvary Baptist Church",
      caption: "Congregational singing from the hymnal.",
    },
    meetings: [
      { name: "Congregational singing", when: "Every service" },
      { name: "Special music", when: "Sunday mornings and evenings" },
    ],
    body: [
      "Mike Stanley leads the congregational singing, and Jennifer Stanley serves as pianist and organist. Both are graduates of Bob Jones University. Rachel Waters also provides piano music for our singing and special groups, assisted by Mrs. Holly Whitley.",
      "Our music ministry emphasizes genuine, heartfelt worship using traditional hymns and choruses. Our church worship style is traditional — the old hymns and choruses that many people grew up with. These hymns provide a theological depth to our worship: songs that the generation before us sang, songs that we will know and sing into our old age.",
      "If you play or sing and would like to serve, speak to Mike or to the pastor.",
    ],
    led: "Mike & Jennifer Stanley, with Rachel Waters",
  },
  {
    slug: "outreach",
    title: "Visitation & Outreach",
    eyebrow: "Tuesday evenings",
    lead: "Every Tuesday evening we go out across McMinnville with the gospel, door to door and to those who have visited our services.",
    photo: {
      src: "/img/property-pavilion.jpg",
      alt: "The pavilion and workshop buildings standing in the open field at 610 Myers Lane",
      caption: "Where we gather before heading out.",
    },
    meetings: [
      {
        name: "Visitation & Outreach",
        when: "Tuesdays, 6:00 pm",
        who: "Meet at the church",
      },
    ],
    body: [
      "Mike Stanley organizes the outreach ministry of the church. We meet at the church at 6:00 on Tuesday evenings, pair up, and go out — to homes across McMinnville, and to the folks who have visited a service and left us a card.",
      "Nobody is sent out alone, and nobody is sent out unprepared. If you have never done this before, you will go with someone who has, and you can listen for as many weeks as you like before you ever say a word.",
      "This is also how our special outreach projects begin — the disaster relief trips, the work in Mongolia, the orphanage in Panama. It starts with a church that is in the habit of going.",
    ],
    led: "Mike Stanley",
  },
];

export function getMinistry(slug: string) {
  return MINISTRY_DETAILS.find((m) => m.slug === slug);
}
