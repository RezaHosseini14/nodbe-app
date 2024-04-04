"use client";
import { useQuery } from "react-query";

// services
import { lastPoster } from "@/services/poster/posterServices";

// components
import PosterSection from "@/components/pages/home/components/PosterSection";
import ContentSlider from "@/components/pages/home/components/ContentSlider";
import PageLoading from "@/components/shared/PageLoading";
import DonateSection from "@/components/pages/home/components/DonateSection";
import LocationSection from "@/components/pages/home/components/LocationSection";
import AboutSection from "@/components/pages/home/components/AboutSection";
import MediaSection from "@/components/pages/home/components/MediaSection";
import BubbleBlur from "@/components/shared/BubbleBlur";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Home = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const { data: posterData, isLoading: posterLoading } = useQuery({
    queryKey: ["lastposter"],
    queryFn: lastPoster,
  });

  return (
    <PageLoading loading={posterLoading}>
      {theme && <BubbleBlur />}

      <div className="h-full relative">
        <div className="grid lg:grid-cols-12 grid-cols-8 gap-8">
          <ContentSlider />

          <MediaSection />

          <PosterSection posterData={posterData} posterLoading={posterLoading} />

          <LocationSection />

          <AboutSection />

          <DonateSection />
        </div>
      </div>
    </PageLoading>
  );
};
export default Home;
