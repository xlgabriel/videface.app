import {
    benefitIcon1,
    benefitIcon2,
    benefitIcon3,
    benefitIcon4,
    benefitIcon5,
    benefitIcon6,
    benefitImage1,
    benefitImage2,
    benefitImage3,
    benefitImage4,
    benefitImage5,
    benefitImage6,
    chromecast,
    disc02,
    discord,
    discordBlack,
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
    roadmap1,
    roadmap2,
    roadmap3,
    roadmap4,
    searchMd,
    slack,
    sliders04,
    telegram,
    youtube,
    companyLogo1,
    companyLogo2,
    companyLogo3,
    companyLogo4,
    companyLogo6,
    companyLogo7,
    yourlogo,
    benefitCard1,
    benefitCard2,
    benefitCard3,
    benefitCard4,
    benefitCard5,
    benefitCard6,
} from "../assets";

export const navigation = [
    {
        id: "0",
        title: "Features",
        url: "/home/#features",
    },
    {
        id: "1",
        title: "How to use",
        url: "/home/#how-to-use",
    },
    {
        id: "2",
        title: "Pricing",
        url: "/pricing",
    },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquareWhite];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [
    companyLogo1,
    companyLogo2,
    companyLogo3,
    companyLogo4,
    yourlogo,
    companyLogo6,
    companyLogo7,
];

export const brainwaveServices = ["Location is not a problem", "24/7 assistance gets easier", "Absolute game changer"];

export const brainwaveServicesIcons = [recording03, recording01, disc02, chromecast, sliders04];

export const roadmap = [
    {
        id: "0",
        title: "Voice recognition",
        text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
        date: "May 2023",
        status: "done",
        imageUrl: roadmap1,
        colorful: true,
    },
    {
        id: "1",
        title: "Gamification",
        text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
        date: "May 2023",
        status: "progress",
        imageUrl: roadmap2,
    },
    {
        id: "2",
        title: "Chatbot customization",
        text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
        date: "May 2023",
        status: "done",
        imageUrl: roadmap3,
    },
    {
        id: "3",
        title: "Integration with APIs",
        text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
        date: "May 2023",
        status: "progress",
        imageUrl: roadmap4,
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
        description: "Monthly prices per office.",
        price1: "2 Kiosks $649",
        price2: "3 Kiosks $849",
        price3: "Extra: $149 each",
        features: [
            "Every kiosk includes one user",
            "Each extra user for $25 more per month",
            "Initial fee $499 per office + extra costs (if needed)",
        ],
    },
    {
        id: "1",
        title: "Full VideFace",
        description: "All services included!",
        price1: "Previous prices",
        price2: "Get new features",
        price3: "No car's initial fee",
        features: [
            "Get the new features we constantly add!",
            "It's easier to manage everything in one place.",
            "Priority support to solve issues quickly",
        ],
    },
    {
        id: "2",
        title: "VideFace AutoKeys",
        description: "Price per office.",
        price1: "$165 per month",
        price2: "No initial fee",
        price3: "No extra costs",
        features: [
            "Real-time key delivery for clients using code",
            "Easy key drop off by employees",
            "No initial fee for this service!",
        ],
    },
    {
        id: "3",
        title: "VideFace Cars",
        description: "Monthly prices per office.",
        price1: "200 Cars $249",
        price2: "300 Cars $299",
        price3: "Every 100+ for $50",
        features: [
            "Full control of your cars and damages",
            "Car Inspection Service included",
            "One global initial fee of $499",
        ],
    },
];

export const benefits = [
    {
        id: "0",
        title: "Real time videocall",
        text: "You'll have everything you need to make the most out of your video calls. Manage them in harmony with your team. Unlimited, secure and reliable.",
        backgroundUrl: benefitCard1,
        iconUrl: benefitIcon1,
        imageUrl: benefitImage1,
        light: true,
    },
    {
        id: "1",
        title: "Offices management",
        text: "You can manage your offices with their agents, kiosks, cars and more. Everything inside our software. Easy, fast and secure.",
        backgroundUrl: benefitCard2,
        iconUrl: benefitIcon2,
        imageUrl: benefitImage2,
        light: true,
    },
    {
        id: "2",
        title: "Cars management",
        text: "Create and edit your cars, add photos, damages, dates and more. Clients will have access to this information in real time.",
        backgroundUrl: benefitCard3,
        iconUrl: benefitIcon3,
        imageUrl: benefitImage3,
        light: true,
    },
    {
        id: "3",
        title: "Real time car inspection",
        text: "Your clients can inspect the car, take their own pictures and send them to you. No more misunderstandings or surprises. It's a win-win situation.",
        backgroundUrl: benefitCard4,
        iconUrl: benefitIcon4,
        imageUrl: benefitImage4,
        light: true,
    },
    {
        id: "4",
        title: "AutoKeys system",
        text: "Give your clients the possibility to pick up and drop off the car without your presence. It's easy, fast and secure. Just one click away!",
        backgroundUrl: benefitCard5,
        iconUrl: benefitIcon5,
        imageUrl: benefitImage5,
        light: true,
    },
    {
        id: "5",
        title: "Global customization",
        text: "Set close and open hours, personalize your kiosks, send notifications to your team, see what's going on in real time with our Cloud servers!",
        backgroundUrl: benefitCard6,
        iconUrl: benefitIcon6,
        imageUrl: benefitImage6,
        light: true,
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
        url: "mailto:contact@videface.app",
    },
];
