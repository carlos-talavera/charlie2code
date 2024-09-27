/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Charlie2Code',
  author: 'Carlos Talavera',
  headerTitle: 'Charlie2Code',
  description: 'Software development, web development, lifehacks, and more.',
  language: 'en',
  theme: 'system', // system, dark or light
  siteUrl: 'https://charlie2code.com',
  siteRepo: 'https://github.com/carlos-talavera/charlie2code',
  siteLogo: '/static/images/logo.svg',
  socialBanner: '/static/images/twitter-card.png',
  // mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'carlostalavera@charlie2code.com',
  github: 'https://github.com/carlos-talavera',
  // x: 'https://twitter.com/x',
  // twitter: 'https://twitter.com/Twitter',
  // facebook: 'https://facebook.com',
  // youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/in/carlos-talavera-612703177',
  // threads: 'https://www.threads.net',
  // instagram: 'https://www.instagram.com',
  locale: 'en',
  multiauthors: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    }
  },
  newsletter: {
    provider: 'emailoctopus',
  },
  // waline support
  iswaline: true,
  walineServer: 'https://waline.charlie2code.com',
}

module.exports = siteMetadata
