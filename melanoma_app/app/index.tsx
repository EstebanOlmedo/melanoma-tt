import { Redirect, useRootNavigationState } from "expo-router";

const StartPage = () => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href="/followup" />;
};

export default StartPage;
