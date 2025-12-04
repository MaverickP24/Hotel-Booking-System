// Script to generate updated hotel names mapping
const hotelNameMappings = {
    "Urbanza Suites": "The Royal Taj Palace",
    "Grand Palace Resort": "Emerald Gardens Resort",
    "Marina Bay Suites": "Golden Crown Heritage Hotel",
    "Thames View Hotel": "Sapphire Bay Retreat",
    "Skyline Tower": "Maharaja Grand Hotel",
    "Garden Paradise Resort": "Pearl Oasis Inn",
    "Royal Westminster": "Lotus Pavilion Suites",
    "Central Park Plaza": "Imperial Palace Hotel",
    "Desert Oasis Resort": "Riverside Regency",
    "Infinity Pool Resort": "Sunset Paradise Resort",
    "Tower Bridge Hotel": "Silver Oak Manor",
    "Times Square Grand": "Diamond Heights Hotel",
    "Burj Al Arab View": "Peacock Plaza",
    "Merlion Suites": "Amber Fort Residency",
    "Hyde Park Luxury": "Crystal Waters Hotel",
    "Brooklyn Bridge Suites": "Majestic Star Resort",
    "Palm Jumeirah Resort": "Sapphire Shores Hotel",
    "Orchard Road Grand": "Royal Heritage Inn"
};

const USD_TO_INR = 83;

console.log(JSON.stringify(hotelNameMappings, null, 2));
