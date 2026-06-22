import {
    chromecast,
    disc02,
    discord,
    facebook,
    figma,
    file02,
    framer,
    homeSmile,
    instagram,
    notification2,
    notification3,
    notification4,
    notion,
    photoshop,
    plusSquareWhite,
    protopie,
    raindrop,
    recording01,
    recording03,
    // roadmap images removed from assets
    searchMd,
    slack,
    sliders04,
    telegram,
    youtube,
    Economy,
    Mex,
    Awreck,
    RC,
    Nextcar,
    Advantage,
    Nu,
    Routes,
    priceless,
    Wheego,
    Flexways,
    Zezgo,
    Flextogo,
    Zoom,
    Carwiz,
    Autounion,
    york,
    ACO,
    tht,
    cargreen,
    Colusa,
    oneswitch,
    Clubs,
    Nordic,
    amerirent,
    Cafe,
    Tarpon,
    Final,
    seven24,
    Nola,
    Flex,
    curve1,
    curve2,
} from "../assets";

export const navigation = [
    {
        id: "0",
        title: "Solutions",
        url: null, // Not clickable, only hover for dropdown
    },

    {
        id: "2",
        title: "Pricing",
        url: "/pricing",
    },

    {
        id: "3",
        title: "Blog",
        url: "/blog",
    },

    {
        id: "4",
        title: "About Us",
        url: "/about-us",
    },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquareWhite];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [
    Economy, Mex, Awreck, RC, Nextcar, Advantage, Nu,
    Routes, priceless, Wheego, Flexways, Zezgo, Flextogo,
    Zoom, Carwiz, Autounion, york, ACO, Tarpon, Final,
    cargreen, Colusa, oneswitch, Clubs, Nordic,
    amerirent, Cafe, tht, seven24, Nola, Flex
];

export const brainwaveServices = ["Location is not a problem", "24/7 assistance gets easier", "Absolute game changer"];

export const brainwaveServicesIcons = [recording03, recording01, disc02, chromecast, sliders04];

export const brainwaveServicesIconClasses = [
    "icon-recording-03",
    "icon-recording-01",
    "icon-key",
    "icon-chromecast",
    "icon-sliders-04",
];

export const roadmap = [
    {
        id: "0",
        title: "Voice recognition",
        text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
        date: "May 2023",
        status: "done",
        imageUrl: null,
        colorful: true,
    },
    {
        id: "1",
        title: "Gamification",
        text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
        date: "May 2023",
        status: "progress",
        imageUrl: null,
    },
    {
        id: "2",
        title: "Chatbot customization",
        text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
        date: "May 2023",
        status: "done",
        imageUrl: null,
    },
    {
        id: "3",
        title: "Integration with APIs",
        text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
        date: "May 2023",
        status: "progress",
        imageUrl: null,
    },
];

export const collabText =
    "Humans will always be needed in the sales and customer service industry. We're just here to make their lives easier.";

export const collabContent = [
    {
        id: "0",
        title: "Have an advantage in the market",
        text: "As we move towards a more automated world, VideFace will set your company on top of the competition.",
    },
    {
        id: "1",
        title: "Increase your customer satisfaction",
    },
    {
        id: "2",
        title: "Better work environment for your team",
    },
];

export const collabApps = [
    {
        id: "0",
        title: "Figma",
        icon: figma,
        width: 38,
        height: 38,
    },
    {
        id: "1",
        title: "Notion",
        icon: notion,
        width: 36,
        height: 36,
    },
    {
        id: "2",
        title: "Raindrop",
        icon: raindrop,
        width: 36,
        height: 28,
    },
    {
        id: "3",
        title: "Framer",
        icon: framer,
        width: 34,
        height: 35,
    },
    {
        id: "4",
        title: "Photoshop",
        icon: photoshop,
        width: 34,
        height: 34,
    },
    {
        id: "5",
        title: "Protopie",
        icon: protopie,
        width: 34,
        height: 34,
    },
    {
        id: "6",
        title: "Slack",
        icon: slack,
        width: 36,
        height: 36,
    },
    {
        id: "7",
        title: "Discord",
        icon: discord,
        width: 38,
        height: 32,
    },
];

export const pricing = [
    {
        id: "0",
        title: "VideFace Calls",
        description:
            "Real time videocalls, unlimited connections between agents and clients and easy management of your kiosks.",
        price1: "2 Kiosks $649",
        price2: "3 Kiosks $849",
        price3: "Extra: $149 each",
        features: [
            "Live Translation, Subtitles and Recording included",
            "Document, signature and rating features included",
            "Assistance to set up your kiosks and agents",
        ],
    },
    {
        id: "3",
        title: "SmartLocker + KeyDrop",
        description: "Give and receive the keys smoothly without the need of agents in the office.",
        price1: "200 Cars $249",
        price2: "300 Cars $299",
        price3: "Every 100+ for $50",
        features: [
            "Record of all key movements",
            "Real-time key delivery for clients",
            "Easy key drop off by carwasher",
        ],
    },
    {
        id: "2",
        title: "VideFace Cars",
        description: "Manage every car easily. Avoid losing chargebacks with the car inspection and walk around.",
        price1: "200 Cars $249",
        price2: "300 Cars $299",
        price3: "Every 100+ for $50",
        features: [
            "Full control of your cars, damages, photos and more",
            "Car Inspection, Pickup and Return in real time",
            "No more staff needed, no more misunderstandings",
        ],
    },
    {
        id: "1",
        title: "Full VideFace",
        description: "Fully virtualize your office by using all our services. Unlock the full potential of VideFace",
        price1: "Previous prices",
        price2: "Get new features",
        price3: "No car's initial fee",
        features: [
            "Get first the new features we constantly add to our software",
            "It's easier to manage everything in one place. Definitely worth it!",
            "Priority support and assistance for any needs.",
        ],
    },
];

export const socials = [
    {
        id: "1",
        title: "Youtube",
        iconUrl: youtube,
        url: "https://www.youtube.com/@videfaceapp",
    },
    {
        id: "2",
        title: "Instagram",
        iconUrl: instagram,
        url: "https://www.instagram.com/videface.app/",
    },
    {
        id: "3",
        title: "LinkedIn",
        iconUrl: facebook,
        url: "https://www.linkedin.com/company/videface/",
    },
    {
        id: "4",
        title: "Mail",
        iconUrl: telegram,
        url: "mailto:contact@videface.com",
    },
];
