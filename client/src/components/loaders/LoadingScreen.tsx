import { Lottie } from "lottie-react";
import LoadingAnimation from "../loaders/LoadingAnimation.json";

export const LoadingScreen = () => {
  return (
    <div className="bg-background flex items-center justify-center h-screen">
      <Lottie src={LoadingAnimation} loop={true} autoplay={true} />
    </div>
  );
};
