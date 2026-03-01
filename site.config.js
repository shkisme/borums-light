const CONFIG = {
  // profile setting (required) 
  profile: {
    name: "보름(손현경)",
    image: "/shkisme.png", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Backend Engineer",
    bio: "빛나는 개발자가 되기 위해...✨",
    email: "shkisme@kbs.co.kr",
    linkedin: "shkisme",
    github: "shkisme",
    instagram: "shkisme",
  },
  projects: [
    {
      name: `Keeper Homepage 🔐`,
      href: "https://github.com/KEEPER31337/Homepage-Back-R2",
    },
    {
      name: `Doo Re 🌾`,
      href: "https://github.com/BDD-CLUB/01-doo-re-back",
    },
  ],
  // blog setting (required)
  blog: {
    title: "보름의 달빛 ✨",
    description: "빛나는 개발자가 되기 위해...",
    scheme: "light", // 'light' | 'dark'
    followSystemTheme: false, // If true, the appearance will be changed according to the system theme on first visit your blog.
  },

  // CONFIG configration (required)
  link: "https://shkisme.vercel.app",
  since: 2023, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: true,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: false,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "shkisme/borums-light",
      "issue-term": "og:title",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 1, // revalidate time for [slug], index
}

module.exports = { CONFIG }
