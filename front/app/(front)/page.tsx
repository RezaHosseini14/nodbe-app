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

const Home = () => {
  const { data: posterData, isLoading: posterLoading } = useQuery({
    queryKey: ["lastposter"],
    queryFn: lastPoster,
  });

  return (
    <PageLoading loading={posterLoading}>
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
