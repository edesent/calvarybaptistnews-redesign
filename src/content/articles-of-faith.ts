/**
 * The Articles of Faith of Calvary Baptist Church, McMinnville, Tennessee,
 * transcribed as the church states them. `refs` holds the Scripture citations
 * that close each article.
 */

export type Article = {
  n: number;
  title: string;
  body: string[];
  refs?: string;
};

export const ARTICLES: Article[] = [
  {
    n: 1,
    title: "The Scriptures",
    body: [
      "We believe the Holy Scriptures of the Old and New Testaments to be the Bible, “as it is in truth, the Word of God…” (I Thessalonians 2:13). We believe in verbal, plenary inspiration in the original writings, and God's preservation of His pure words to every generation (Psalms 12:6-8). The Masoretic Text of the Old Testament and the Received Text of the New Testament (Textus Receptus) are those texts of the original languages we accept and use; the King James Version of the Bible is the only English version we accept and use. The Bible is our sole authority for faith and practice.",
    ],
    refs: "2 Timothy 3:16-17; 2 Peter 1:19-21.",
  },
  {
    n: 2,
    title: "The True God",
    body: [
      "We believe there is one and only one living and true God, an infinite, sovereign Spirit, the Maker and Supreme Ruler of heaven and earth; inexpressibly glorious in holiness and worthy of all possible honor, confidence and love; that in the unity of the Godhead there are three Persons, the Father, the Son and the Holy Spirit, equal in every divine perfection and executing distinct but harmonious offices in the great work of redemption.",
    ],
    refs: "Exodus 20:2-3; 1 Corinthians 8:6; Revelation 4:11.",
  },
  {
    n: 3,
    title: "The Holy Spirit",
    body: [
      "We believe that the Holy Spirit is a divine Person, equal with God the Father and God the Son and of the same nature; that He was active in the creation; that in His relation to the unbelieving world He restrains the evil one until God's purpose is fulfilled; that He convicts of sin, of righteousness, and of judgment; that He bears witness to the truth of the Gospel in preaching and testimony; that He is the agent in the New Birth; that He baptizes, seals and indwells every believer at the moment of salvation; that He endues, guides, teaches, witnesses, sanctifies and helps the believer. The gift of tongues and healing were “sign gifts” which fulfilled their purpose in the first century, at which time these gifts ceased.",
    ],
    refs: "John 14:16-17; Matthew 28:19; Hebrews 9:14; John 14:26; Luke 1:35; Genesis 1:1-3; John 16:8-11; Acts 5:30-32; John 3:5-6; Ephesians 1:13-14; Mark 1:8; John 1:33; Acts 11:16; Luke 24:49; Romans 8:14; Hebrews 2:4; 1 Corinthians 13:8.",
  },
  {
    n: 4,
    title: "The Devil, or Satan",
    body: [
      "We believe in the personality of Satan, that he is the unholy god of this age, and the ruler of all the powers of darkness, and is destined to the judgment of an eternal justice in the Lake of Fire.",
    ],
    refs: "Matthew 4:1-11; 2 Corinthians 4:4; Revelation 20:10.",
  },
  {
    n: 5,
    title: "Creation",
    body: [
      "We believe the Genesis account of creation as being neither allegory nor myth, but a literal, historical account of the direct, immediate creative acts of God, in six literal twenty-four hour days, without any evolutionary process; that man, spirit, soul and body, was created by a direct work of God and not from previously existing life forms; and that all men are descended from the historical Adam and Eve, first parents of the entire human race.",
    ],
    refs: "Genesis 1 & 2; Colossians 1:16-17; John 1:3.",
  },
  {
    n: 6,
    title: "The Fall of Man",
    body: [
      "We believe that man was created in innocence under the law of his Maker; but by voluntary transgression Adam fell from this sinless and happy state, and all men sinned in him, in consequence of which all men are totally depraved, are partakers of Adam's fallen nature and are sinners by nature and by conduct; and therefore are under just condemnation without defense or excuse.",
    ],
    refs: "Genesis 3:1-6; Romans 3:10-19; Romans 5:12 & 19; Romans 1:18 & 32.",
  },
  {
    n: 7,
    title: "The Virgin Birth",
    body: [
      "We believe that Jesus was begotten of the Holy Ghost in a miraculous manner, born of Mary, a virgin, as no other man ever born or can ever be born of woman, and that He is both the Son of God and God the Son.",
    ],
    refs: "Genesis 3:15; Isaiah 7:14; Matthew 1:18-25; Luke 1:35; John 1:14; Hebrews 1:8.",
  },
  {
    n: 8,
    title: "The Resurrection and Priesthood",
    body: [
      "We believe in the bodily resurrection of Christ, in His ascension into heaven, where He now sits at the right hand of the Father as our Great High Priest.",
    ],
    refs: "Matthew 28:6-7; Luke 24:39; John 20:27; 1 Corinthians 15:14; Mark 16:6; Luke 24:2-6; Acts 1:9-11; Revelation 3:21; Hebrews 8:6; 1 Timothy 2:5; 1 John 2:1; Hebrews 2:17; Hebrews 5:9 & 19.",
  },
  {
    n: 9,
    title: "The Redemption of Man from Sin",
    body: [
      "We believe that the only escape from the condemnation of sin is through the redemption wrought by Jesus Christ, when He voluntarily took upon Him a human body and nature, yet without sin, and by His suffering, death and resurrection made full satisfaction to the justice of God for the sin of man; that the blessings of this salvation are given on the grounds of grace to all who believe, and that it is the immediate duty of all to accept these offers of mercy.",
    ],
    refs: "John 1:1-3, 14; 3:1-7; Hebrews 10:4-14; Acts 16:30-33.",
  },
  {
    n: 10,
    title: "Salvation by Grace",
    body: [
      "We believe that faith in the finished work of the Lord Jesus Christ is the only condition of salvation from sin and this salvation is wholly by grace; that no works, however good, make that salvation more secure.",
    ],
    refs: "Acts 16:31; Ephesians 2:8-9; Titus 3:5-7; Romans 10:9-13.",
  },
  {
    n: 11,
    title: "The New Birth",
    body: [
      "We believe that all who receive by faith the Lord Jesus Christ are born of the Holy Spirit and thereby become children of God.",
    ],
    refs: "John 1:12-13; 3:3-16; Acts 16:31; Ephesians 2:8-9; Galatians 3:26.",
  },
  {
    n: 12,
    title: "Justification",
    body: [
      "We believe that justification is the judicial act of God whereby He declares us to be righteous through faith in Christ Jesus; that justification includes pardon from sin and the imputation of God's righteousness; that it is bestowed, not in consideration of any works of righteousness which we have done, but solely through faith in the Redeemer's blood.",
    ],
    refs: "Acts 13:39; Isaiah 15:11; Zechariah 13:1; 2 Corinthians 5:18-21; Romans 5:1, 5 & 9; 8:1.",
  },
  {
    n: 13,
    title: "Repentance",
    body: [
      "We believe that repentance is a change of mind and purpose toward God prompted by the Holy Spirit; that it is characterized by godly sorrow for sin as offensive to God and ruinous to the soul; and that true repentance is inseparably related to true faith.",
    ],
    refs: "Luke 13:1-3; Acts 8:22; Romans 2:4; 2 Corinthians 7:10; Acts 20:21.",
  },
  {
    n: 14,
    title: "Sanctification",
    body: [
      "We believe that sanctification is the divine setting apart of the believer unto God, accomplished in a threefold manner: first, an eternal act of God, based upon redemption in Christ, establishing the believer in a position of holiness at the moment he trusts the Saviour; second, a continuing process in the saint as the Holy Spirit applies the Word of God to the life; third, the final accomplishment at the Lord's return when the saint is glorified and perfected forever.",
    ],
    refs: "Hebrews 10:10-14; 3:1; John 17:17; 2 Corinthians 3:18; 1 Corinthians 1:30; Ephesians 5:25-27; 1 Thessalonians 4:3-4; 5:23-24; 1 John 3:2; Jude 24-25; Revelation 22:11.",
  },
  {
    n: 15,
    title: "The Security of the Saints",
    body: [
      "We believe that all who are truly born again are kept by the Father for Jesus Christ. That one who has been truly saved can never be lost.",
    ],
    refs: "Philippians 1:6; John 10:28-29; Romans 8:35-39; Jude.",
  },
  {
    n: 16,
    title: "The Church",
    body: [
      "We believe in the unity of all true believers in the Church which is the body of Christ, which was established on the Day of Pentecost and will be taken up at the Rapture. Both Jews and Gentiles are added to this Church by the baptism of the Holy Spirit.",
      "We believe that this Church is manifested through the local Church, which is a congregation of immersed believers associated by covenant of faith and fellowship in the Gospel; observing the ordinances of Christ; governed by His laws; exercising the gifts, rights and privileges invested in them by His Word; and that its Scriptural officers are Pastors and Deacons, whose qualification, claims and duties are clearly defined in Scripture. We believe the mission of the Church is the faithful witnessing of Christ to all men as we have opportunity.",
      "We hold that the local Church has the absolute right to self government, free from the interference of any hierarchy of individuals or organizations; that the one and only superintendent is Christ through the Holy Spirit; that it is Scriptural for true churches to cooperate with each other in contending for the faith and for the furtherance of the Gospel; that each local Church is sole judge of the measure and method of its cooperation; and that on all matters of policy, government, discipline, and benevolence, the will of the local Church is final.",
    ],
    refs: "Ephesians 1:22-23; 3:1-6; 4:1; 5:23-24; 1 Corinthians 11:2; 12:12-13; Acts 2:41-42; 15:13-18; 20:17-28; Colossians 1:18; 1 Timothy 3:1-7.",
  },
  {
    n: 17,
    title: "Baptism and the Lord's Supper",
    body: [
      "We believe that Christian baptism is the immersion of a believer in water, under the authority of the local Church, to show forth in a solemn and beautiful emblem our faith in the crucified, buried and risen Saviour, through Whom we died to sin and rose to new life; that baptism is a prerequisite to the privileges of Church membership.",
      "We believe that the Lord's Supper is the commemoration of His death until He comes, and should be preceded always by solemn self examination. We believe that the Biblical order of the ordinances is baptism and the Lord's Supper, and that participants should be immersed believers.",
    ],
    refs: "Acts 2:41-42; 8:36-39; John 3:23; Romans 6:3-5; Matthew 3:16; 28:19-20; Colossians 3:12; 1 Corinthians 11:23-28.",
  },
  {
    n: 18,
    title: "Separation",
    body: [
      "We believe in obedience to the Biblical commands to separate entirely from worldliness and ecclesiastical apostasy unto God.",
    ],
    refs: "2 Corinthians 6:14; 7:1; 1 Thessalonians 1:9-10; Romans 16:17; 1 Timothy 6:3-5; 2 John 9-11.",
  },
  {
    n: 19,
    title: "Civil Government",
    body: [
      "We believe that civil government is of divine appointment for the interest and good order of human society; that magistrates are to be prayed for, conscientiously honored and obeyed, except in things opposed to the will of our Lord Jesus Christ, Who is the only Lord of the conscience and the coming King of kings.",
    ],
    refs: "Romans 13:1-7; 2 Samuel 23:3; Exodus 18:21-22; Acts 23:5; Matthew 22:21; Acts 5:29; 4:19-20; Daniel 3:17-18.",
  },
  {
    n: 20,
    title: "Human Sexuality",
    body: [
      "We believe that God has commanded that no intimate sexual activity be engaged in outside of a marriage between one man and one woman. We believe that any form of homosexuality, lesbianism, bisexuality, bestiality, incest, fornication, adultery, and pornography are sinful perversions of God's gift of sex. We believe that God disapproves of and forbids any attempt to alter one's gender by surgery or appearance.",
      "We believe that the only Scriptural marriage is the joining of one man and one woman.",
    ],
    refs: "Genesis 2:24; 19:5, 13; 26:8-9; Leviticus 18:1-30; Romans 1:26-29; 1 Corinthians 5:1; 6:9; 1 Thessalonians 4:1-8; Hebrews 13:4; Romans 7:2; 1 Corinthians 7:10; Ephesians 5:22-23.",
  },
  {
    n: 21,
    title: "Family Relationships",
    body: [
      "We believe that men and women are spiritually equal in position before God but that God has ordained distinct and separate spiritual functions for men and women in the home and the church. The husband is to be the leader of the home, and men are to be the leaders (pastors and deacons) of the church. Accordingly, only men are eligible for licensure and ordination by the church.",
      "We believe that God has ordained the family as the foundational institution of human society. The husband is to love his wife as Christ loves the church. The wife is to submit herself to the Scriptural leadership of her husband as the church submits to the headship of Christ. Children are an heritage from the Lord. Parents are responsible for teaching their children spiritual and moral values and leading them, through consistent lifestyle example and appropriate discipline, including Scriptural corporal correction.",
    ],
    refs: "Galatians 3:28; Colossians 3:18; 1 Timothy 2:8-15; 3:4-5, 12; Genesis 1:26-28; Exodus 20:12; Deuteronomy 6:4-9; Psalm 127:3-5; Proverbs 19:18; 22:15; 23:13-14; Mark 10:6-12; 1 Corinthians 7:1-16; Ephesians 5:21-33; 6:1-4; Colossians 3:18-21; Hebrews 13:4; 1 Peter 3:1-7.",
  },
  {
    n: 22,
    title: "Divorce and Remarriage",
    body: [
      "We believe that God disapproves of and forbids divorce and intends marriage to last until one of the spouses dies. Although divorced and remarried persons or divorced persons may hold positions of service in the church and be greatly used of God for Christian service, they may not be considered for the offices of pastor or deacon.",
    ],
    refs: "Malachi 2:14-17; Matthew 19:3-12; Romans 7:1-3; 1 Timothy 3:2, 12; Titus 1:6.",
  },
  {
    n: 23,
    title: "The Sanctity of Life",
    body: [
      "We believe that human life begins at conception and that the unborn child is a living human being. Abortion constitutes the unjustified, unexcused taking of unborn human life. Abortion is murder. We reject any teaching that abortions of pregnancies due to rape, incest, birth defects, gender selection, birth or population control, or the physical or mental well being of the mother are acceptable.",
    ],
    refs: "Job 3:16; Psalm 51:5; 139:14-16; Isaiah 44:24; 49:1, 5; Jeremiah 1:5; 20:15-18; Luke 1:44.",
  },
  {
    n: 24,
    title: "Lawsuits Between Believers",
    body: [
      "We believe that Christians are prohibited from bringing civil lawsuits against other Christians or the church to resolve personal disputes. We believe the church possesses all the resources necessary to resolve personal disputes between members. We do believe, however, that a Christian may seek compensation for injuries from another Christian's insurance company as long as the claim is pursued without malice or slander.",
    ],
    refs: "1 Corinthians 6:1-8; Ephesians 4:31-32.",
  },
  {
    n: 25,
    title: "Missions",
    body: [
      "We believe that God has given the church a great commission to proclaim the Gospel to all nations so that there might be a great multitude from every nation, tribe, ethnic group, and language group who believe on the Lord Jesus Christ. As ambassadors of Christ, we must use all available means to go to the foreign nations and not wait for them to come to us.",
    ],
    refs: "Matthew 28:19-20; Mark 16:15; Luke 24:46-48; John 20:21; Acts 1:8; 2 Corinthians 5:20.",
  },
  {
    n: 26,
    title: "Giving",
    body: [
      "We believe that every Christian, as a steward of that portion of God's wealth entrusted to him, is obligated to financially support his local church. We believe that God has established the tithe as a basis for giving, but that every Christian should also give other offerings sacrificially and cheerfully to the support of the church, the relief of those in need, and the spread of the Gospel. We believe that a Christian relinquishes all rights to direct the use of his tithe or offering once the gift has been made.",
    ],
    refs: "Genesis 14:20; Proverbs 3:9-10; Acts 4:34-37; 1 Corinthians 16:2; 2 Corinthians 9:6-7; Galatians 6:6; Ephesians 4:28; 1 Timothy 5:17-18; 1 John 3:17.",
  },
  {
    n: 27,
    title: "Israel",
    body: [
      "We believe in the sovereign selection of Israel as God's eternal, covenant people, that she is now dispersed because of her disobedience and rejection of Christ, and that she will be regathered in the Holy Land and, after the completion of the Church, will be saved as a nation at the second advent of Christ.",
    ],
    refs: "Genesis 13:14-17; Romans 11:1-32; Ezekiel 37.",
  },
  {
    n: 28,
    title: "The Second Coming",
    body: [
      "We believe in the imminent, personal, pretribulational and premillennial return of Christ for His Church. At that moment the dead in Christ shall be raised in glorified bodies and the living in Christ shall be given glorified bodies without tasting death, and all shall be caught up to meet the Lord in the air.",
      "We believe that the tribulation period, which follows the Rapture of the Church, will be culminated by the revelation of Christ in power and great glory to establish His earthly millennial reign and to sit upon the throne of David in Jerusalem.",
    ],
    refs: "1 Corinthians 15:42-44, 51-54; 1 Thessalonians 4:13-18; Philippians 3:20-21; Revelation 3:10; Daniel 9:25-27; Matthew 24:29-31; Luke 1:30-33; Isaiah 9:6-7; 11:1-9; Acts 2:29-30; Revelation 20:1-6.",
  },
  {
    n: 29,
    title: "The Righteous and the Wicked",
    body: [
      "We believe that there is a radical and essential difference between the righteous and the wicked; that only those who are justified by faith in our Lord Jesus Christ and sanctified by the Spirit of God are truly righteous in His esteem; while all such as continue in impenitence and unbelief are in His sight wicked and under the curse; and this distinction holds among men both in life and after death. We believe in the everlasting blessedness of the saved and the everlasting conscious suffering of the lost in the Lake of Fire.",
    ],
    refs: "Malachi 3:18; Genesis 18:23; Romans 6:17-18; 7:6; Proverbs 14:32; 1 John 5:19; Luke 16:25; Matthew 25:34-41; John 8:21; Revelation 20:14-15.",
  },
];
