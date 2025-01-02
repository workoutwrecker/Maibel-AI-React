import { getFromSecureStorage } from '../utils/SecureStorage';

export const getCoach = async () => {
  const coachId = await getFromSecureStorage("coachId");
  const name = await getFromSecureStorage("name") as string;
  const coachBackground = await getFromSecureStorage("background");
  const personality_1 = await getFromSecureStorage("personality_1");
  const personality_2 = await getFromSecureStorage("personality_2");
  const personality_3 = await getFromSecureStorage("personality_3");
  const gender = await getFromSecureStorage("selectedGender");
  return {
    coachId,
    name,
    coachBackground,
    personalities: [personality_1, personality_2, personality_3].filter(Boolean),
    gender,
  };
};

export const getOnboardDay = async() => {
  const onboardDay = await getFromSecureStorage("onboardDay")
  return (onboardDay)
};