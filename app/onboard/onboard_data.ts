export const initOnboardStoryData = {
  initOnboard_1_day1: {
    image: require('../../assets/images/onboard/story_onboard_1.jpg'),
    buttons: [
      { label: "Read The Letter", link: "/onboard/initOnboard_2_day1", marginBottom: 25, style: "gradient" },
    ],
  },
  initOnboard_2_day1: {
    image: require('../../assets/images/onboard/story_onboard_2.jpg'),
    buttons: [
      { label: "What's in Store for me?", link: "/onboard/initOnboard_3_day1",  marginBottom: 20, style: "gradient" },
      { label: "Hold up, what the heck?!", link: "/onboard/initOnboard_3_day1",  marginBottom: 25, style: "plain" },
    ],
  },
  initOnboard_3_day1: {
    image: require('../../assets/images/onboard/story_onboard_3.jpg'),
    buttons: [
      { label: "Yes, I accept", link: "/onboard/initOnboard_4_day1",  marginBottom: 15, style: "gradient" },
      { label: "I think I'll pass", link: "/onboard/initOnboard_4_day1",  marginBottom: 25, style: "plain" },
    ],
  },
  initOnboard_4_day1: {
    image: require('../../assets/images/onboard/story_onboard_4.jpg'),
    buttons: [
      { label: "Build AI companion", link: "/onboard/initOnboard_5_day1",  marginBottom: 25, style: "gradient" },
    ],
  },
  initOnboard_5_day1: {
    image: require('../../assets/images/onboard/choose-ai.jpg'),
    buttons: [
      { label: "Let's Go!", link: "/onboard/choose-ai",  marginBottom: 50, style: "gradient" },
    ],
  },
};
