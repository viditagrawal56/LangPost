import { BarChart3Icon, FolderOpenIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL =
  "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
  {
    logo: "/assets/acme.png",
  },
  {
    logo: "/assets/apex.png",
  },
  {
    logo: "/assets/astra.png",
  },
  {
    logo: "/assets/celestial.png",
  },
  {
    logo: "/assets/groq.png",
  },
] as const;

export const PROCESS = [
  {
    title: "Translate Your Content",
    description:
      "Convert your text into 10 languages, including Hindi, Marathi, Sindhi, Punjabi, Odia, and more, effortlessly and accurately.",
    icon: FolderOpenIcon,
  },

  {
    title: " Transcribe Video to Text",
    description:
      "Transform video content into precise text format, ready for editing and sharing.",
    icon: BarChart3Icon,
  },
  {
    title: "Publish Multilingual Blogs",
    description:
      "Automatically post translated text as blogs to reach diverse audiences worldwide.",
    icon: BarChart3Icon,
  },
] as const;

export const FEATURES = [
  {
    title: "Multilingual Translation",
    description:
      "Translate your text into 10 languages, including Hindi, Marathi, Punjabi, and more.",
  },
  {
    title: "Video-to-Text Transcription",
    description:
      "Convert video content into accurate text for easy editing and publishing.",
  },
  {
    title: "Blog Posting Automation",
    description:
      "Automatically publish translated text as blogs to reach wider audiences.",
  },
  {
    title: "Custom Language Models",
    description:
      "Optimize translations with advanced AI models tailored to your needs.",
  },
  {
    title: "Content Formatting",
    description:
      "Ensure your translated content is well-structured and ready for publishing.",
  },
  {
    title: "Team Collaboration",
    description:
      "Work with your team to manage translations and content in real-time.",
  },
] as const;

export const REVIEWS = [
  {
    name: "Rajesh Sharma",
    username: "@rajeshsharma",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    review:
      "This AI translator is phenomenal! Translating my content into multiple languages has never been easier. Highly recommend it!",
  },
  {
    name: "Ananya Verma",
    username: "@ananyaverma",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 4,
    review:
      "A great tool for translation and video-to-text transcription. It's user-friendly and saves me so much time!",
  },
  {
    name: "Harpreet Singh",
    username: "@harpreetsingh",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    review:
      "I use this daily to translate and publish my blogs. The accuracy and formatting are amazing. Highly recommended!",
  },
  {
    name: "Pooja Patel",
    username: "@poojapatel",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    review:
      "Efficient and reliable! It has made translating and sharing content across platforms super simple.",
  },
  {
    name: "Aman Khanna",
    username: "@amankhanna",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    review:
      "Absolutely love this translator! The video-to-text feature is a game-changer for my workflow.",
  },
  {
    name: "Sara Iyer",
    username: "@saraiyer",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4,
    review:
      "Great for multilingual content! It’s helped me reach a much wider audience. Could improve the transcription speed a bit.",
  },
  {
    name: "Vikram Desai",
    username: "@vikramdesai",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    review:
      "This tool has transformed how I handle translations. The AI suggestions are spot on and save so much effort.",
  },
  {
    name: "Meera Nair",
    username: "@meeranair",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 4,
    review:
      "An excellent tool for video-to-text and translation. It’s reliable and accurate, though the interface could be smoother.",
  },
  {
    name: "Ravi Kapoor",
    username: "@ravikapoor",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 5,
    review:
      "This app is a must-have for anyone managing multilingual content. It’s fast, accurate, and easy to use!",
  },
] as const;
