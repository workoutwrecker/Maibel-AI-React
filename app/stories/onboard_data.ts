export const initOnboardStoryData = {
  initOnboard_1: {
    image: require('../../assets/images/onboard/story_onboard_1.jpg'),
    buttons: [
      { label: "Read The Letter", link: "/stories/initOnboard_2", marginBottom: 25, style: "gradient" },
    ],
  },
  initOnboard_2: {
    image: require('../../assets/images/onboard/story_onboard_2.jpg'),
    buttons: [
      { label: "What's in Store for me?", link: "/stories/initOnboard_3",  marginBottom: 25, style: "gradient" },
      { label: "Hold up, what the heck?!", link: "/stories/initOnboard_3",  marginBottom: 25, style: "plain" },
    ],
  },
  initOnboard_3: {
    image: require('../../assets/images/onboard/story_onboard_3.jpg'),
    buttons: [
      { label: "Yes, I accept", link: "/stories/initOnboard_4",  marginBottom: 25, style: "gradient" },
      { label: "I think I'll pass", link: "/stories/initOnboard_4",  marginBottom: 25, style: "plain" },
    ],
  },
  initOnboard_4: {
    image: require('../../assets/images/onboard/story_onboard_4.jpg'),
    buttons: [
      { label: "Build AI companion", link: "/stories/initOnboard_5",  marginBottom: 25, style: "gradient" },
    ],
  },
  initOnboard_5: {
    image: require('../../assets/images/onboard/choose-ai.jpg'),
    buttons: [
      { label: "Let's Go!", link: "/onboard-flow/choose-ai",  marginBottom: 50, style: "gradient" },
    ],
  },
};
