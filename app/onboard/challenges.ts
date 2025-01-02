export const dialogueFlow = [
  { id: 1, message: (name: string) => `Hi, my name is ${name}.`, next: 2, time: 1500 },
  { id: 2, message: "To better serve you, I need to understand your lifestyle, preferences, and goals.", next: 3, time: 2000 },
  { id: 3, message: "Don't worry - this will only take a few minutes.", next: 4, time: 3000 },
  { id: 4, message: "Be honest about your habits. I'm here to help, not judge. Your secrets are safe with me.", next: 5, time: 3500 },
  { id: 5, message: "TYPE 'READY' once you're ready to answer 5 short questions.", next: "wait_for_ready", time: 3000 },
  { id: 6, message: "How many meals do you eat daily?", next: "wait" },
  { id: 7, message: "How often do you snack in a day? Any specific cravings?", next: "wait" },
  { id: 8, message: "Any foods you can't eat/don't like?", next: "wait" },
  { id: 9, message: "How much water do you drink in a day?", next: "wait" },
  { id: 10, message: "Lastly, share your greatest challenge to eating healthy.", next: "wait" },
  { id: 11, message: "Thanks for sharing!", next: "wait"}
];