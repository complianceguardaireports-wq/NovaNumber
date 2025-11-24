export const initBrightSDK = (userId) => {
  if (typeof window !== "undefined" && window.BrightSDK) {
    console.log("Initializing Bright SDK for user:", userId);
    window.BrightSDK.init({
      userId: userId,
      optIn: true,
      onReward: (minutes) => {
        // In a real scenario, this calls Supabase to credit the user
        console.log(`User earned ${minutes} minutes via bandwidth sharing`);
      }
    });
    return true;
  }
  return false;
};
