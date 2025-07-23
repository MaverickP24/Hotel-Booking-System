import logo from './logo.png'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";


export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities = [
    "Dubai",
    "Singapore",
    "New York",
    "London",
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
    { id: 1, name: "Emma Rodriguez", address: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides." },
    { id: 2, name: "Liam Johnson", address: "New York, USA", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "QuickStay exceeded my expectations. The booking process was seamless, and the hotels were absolutely top-notch. Highly recommended!" },
    { id: 3, name: "Sophia Lee", address: "Seoul, South Korea", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Amazing service! I always find the best luxury accommodations through QuickStay. Their recommendations never disappoint!" }
];

// Facility Icon
export const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Great Stack",
    "email": "user.greatstack@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "New York"
    ]
}

// Hotel Dummy Data
export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "Urbanza Suites",
    "address": "Main Road  123 Street , 23 Colony",
    "contact": "+0123456789",
    "owner": userDummyData,
    "city": "New York",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
}

// Additional Hotel Dummy Data
const additionalHotels = [
    {
        "_id": "hotel_001",
        "name": "Grand Palace Resort",
        "address": "Ocean Drive 456, Luxury District",
        "contact": "+1234567890",
        "owner": userDummyData,
        "city": "Dubai",
        "createdAt": "2025-04-10T06:22:11.663Z",
        "updatedAt": "2025-04-10T06:22:11.663Z",
        "__v": 0
    },
    {
        "_id": "hotel_002", 
        "name": "Marina Bay Suites",
        "address": "Harbor Street 789, Marina District",
        "contact": "+1234567891",
        "owner": userDummyData,
        "city": "Singapore",
        "createdAt": "2025-04-10T06:22:11.663Z",
        "updatedAt": "2025-04-10T06:22:11.663Z",
        "__v": 0
    },
    {
        "_id": "hotel_003",
        "name": "Thames View Hotel",
        "address": "River Walk 321, Westminster",
        "contact": "+1234567892", 
        "owner": userDummyData,
        "city": "London",
        "createdAt": "2025-04-10T06:22:11.663Z",
        "updatedAt": "2025-04-10T06:22:11.663Z",
        "__v": 0
    }
];

// Additional Rooms Dummy Data
const additionalRooms = [
    {
        "_id": "room_001",
        "hotel": additionalHotels[0],
        "roomType": "Presidential Suite",
        "pricePerNight": 899,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service", "Pool Access"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_002",
        "hotel": additionalHotels[0],
        "roomType": "Ocean View Suite",
        "pricePerNight": 699,
        "amenities": ["Free WiFi", "Mountain View", "Pool Access"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_003",
        "hotel": additionalHotels[1],
        "roomType": "Marina Suite",
        "pricePerNight": 549,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_004",
        "hotel": additionalHotels[1],
        "roomType": "City View Room",
        "pricePerNight": 449,
        "amenities": ["Free WiFi", "Room Service", "Pool Access"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_005",
        "hotel": additionalHotels[2],
        "roomType": "Thames View Suite",
        "pricePerNight": 649,
        "amenities": ["Free WiFi", "Free Breakfast", "Mountain View"],
        "images": [roomImg1, roomImg3, roomImg2, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_006",
        "hotel": additionalHotels[2],
        "roomType": "Executive Room",
        "pricePerNight": 349,
        "amenities": ["Free WiFi", "Room Service"],
        "images": [roomImg2, roomImg4, roomImg1, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    }
];

// Rooms Dummy Data
export const roomsDummyData = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 399,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 299,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:25:22.593Z",
        "updatedAt": "2025-04-10T06:25:22.593Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 249,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "hotel": hotelDummyData,
        "roomType": "Single Bed",
        "pricePerNight": 199,
        "amenities": ["Free WiFi", "Room Service", "Pool Access"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    },
    ...additionalRooms,
    // Add 14 more rooms with different hotels
    {
        "_id": "room_007",
        "hotel": { ...hotelDummyData, "_id": "hotel_004", "name": "Skyline Tower", "city": "Dubai", "address": "Downtown Boulevard 567, Business District" },
        "roomType": "Penthouse Suite",
        "pricePerNight": 1299,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_008",
        "hotel": { ...hotelDummyData, "_id": "hotel_005", "name": "Garden Paradise Resort", "city": "Singapore", "address": "Botanical Gardens Road 890, Green District" },
        "roomType": "Garden Villa",
        "pricePerNight": 799,
        "amenities": ["Free WiFi", "Free Breakfast", "Pool Access"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_009",
        "hotel": { ...hotelDummyData, "_id": "hotel_006", "name": "Royal Westminster", "city": "London", "address": "Parliament Square 234, Westminster" },
        "roomType": "Royal Suite",
        "pricePerNight": 999,
        "amenities": ["Free WiFi", "Room Service", "Mountain View"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_010",
        "hotel": { ...hotelDummyData, "_id": "hotel_007", "name": "Central Park Plaza", "city": "New York", "address": "Fifth Avenue 678, Manhattan" },
        "roomType": "Park View Suite",
        "pricePerNight": 849,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_011",
        "hotel": { ...hotelDummyData, "_id": "hotel_008", "name": "Desert Oasis Resort", "city": "Dubai", "address": "Desert Highway 345, Luxury Oasis" },
        "roomType": "Desert Villa",
        "pricePerNight": 1199,
        "amenities": ["Free WiFi", "Pool Access", "Room Service"],
        "images": [roomImg1, roomImg3, roomImg2, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_012",
        "hotel": { ...hotelDummyData, "_id": "hotel_009", "name": "Infinity Pool Resort", "city": "Singapore", "address": "Sentosa Island 123, Resort World" },
        "roomType": "Infinity Suite",
        "pricePerNight": 699,
        "amenities": ["Free WiFi", "Free Breakfast", "Pool Access", "Mountain View"],
        "images": [roomImg2, roomImg4, roomImg1, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_013",
        "hotel": { ...hotelDummyData, "_id": "hotel_010", "name": "Tower Bridge Hotel", "city": "London", "address": "Tower Bridge Road 456, Southwark" },
        "roomType": "Bridge View Room",
        "pricePerNight": 549,
        "amenities": ["Free WiFi", "Room Service"],
        "images": [roomImg3, roomImg1, roomImg4, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_014",
        "hotel": { ...hotelDummyData, "_id": "hotel_011", "name": "Times Square Grand", "city": "New York", "address": "Broadway 789, Times Square" },
        "roomType": "Broadway Suite",
        "pricePerNight": 749,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service", "Mountain View"],
        "images": [roomImg4, roomImg2, roomImg3, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_015",
        "hotel": { ...hotelDummyData, "_id": "hotel_012", "name": "Burj Al Arab View", "city": "Dubai", "address": "Jumeirah Beach Road 901, Jumeirah" },
        "roomType": "Burj View Suite",
        "pricePerNight": 1599,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service", "Pool Access"],
        "images": [roomImg1, roomImg4, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_016",
        "hotel": { ...hotelDummyData, "_id": "hotel_013", "name": "Merlion Suites", "city": "Singapore", "address": "Marina Bay Sands 234, Financial District" },
        "roomType": "Merlion View Room",
        "pricePerNight": 599,
        "amenities": ["Free WiFi", "Pool Access", "Mountain View"],
        "images": [roomImg2, roomImg1, roomImg4, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_017",
        "hotel": { ...hotelDummyData, "_id": "hotel_014", "name": "Hyde Park Luxury", "city": "London", "address": "Hyde Park Corner 567, Mayfair" },
        "roomType": "Park Suite",
        "pricePerNight": 899,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg3, roomImg2, roomImg1, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_018",
        "hotel": { ...hotelDummyData, "_id": "hotel_015", "name": "Brooklyn Bridge Suites", "city": "New York", "address": "Brooklyn Heights 890, DUMBO" },
        "roomType": "Bridge Suite",
        "pricePerNight": 649,
        "amenities": ["Free WiFi", "Room Service", "Pool Access"],
        "images": [roomImg4, roomImg3, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_019",
        "hotel": { ...hotelDummyData, "_id": "hotel_016", "name": "Palm Jumeirah Resort", "city": "Dubai", "address": "Palm Jumeirah 123, Atlantis District" },
        "roomType": "Palm Villa",
        "pricePerNight": 1399,
        "amenities": ["Free WiFi", "Free Breakfast", "Pool Access", "Mountain View"],
        "images": [roomImg1, roomImg2, roomImg4, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_020",
        "hotel": { ...hotelDummyData, "_id": "hotel_017", "name": "Orchard Road Grand", "city": "Singapore", "address": "Orchard Road 456, Shopping District" },
        "roomType": "Shopping Suite",
        "pricePerNight": 499,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg2, roomImg3, roomImg1, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    }
];

// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": roomsDummyData[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 299,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 399,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 199,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 897,
    "bookings": userBookingsDummyData
}

