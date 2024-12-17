export const initOnboardStoryData = {
    initOnboardStart: {
      image: require('../../assets/images/onboard/cozy_room.png'),
      text: "You stare at your reflection in the window. Diddy Stares back.",
      button: { label: "Read The Letter", link: "/stories/initOnboardIntro" },
    },
    initOnboardIntro: {
      image: require('../../assets/images/onboard/parchment.png'),
      text: "Ji-ae, the inheritence is yours.",
      button: { label: "I accept my fate", link: "/onboard-flow/call-prompt" },
    },
  };
  