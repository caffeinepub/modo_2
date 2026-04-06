import { motion } from "motion/react";
import AnnouncementBanner from "./components/AnnouncementBanner";
import CategoryTiles from "./components/CategoryTiles";
import FeaturedArrivals from "./components/FeaturedArrivals";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LookbookTile from "./components/LookbookTile";
import MusicPlayer from "./components/MusicPlayer";
import NewArrivals from "./components/NewArrivals";
import Testimonials from "./components/Testimonials";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBanner />
      <Header />

      <main>
        {/* Two-column layout */}
        <div className="mx-auto max-w-screen-2xl px-4 py-6 lg:px-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* ─── LEFT COLUMN (~65%) ─── */}
            <motion.div
              className="flex flex-col gap-0 lg:w-[65%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection />
              <CategoryTiles />
              <FeaturedArrivals />
            </motion.div>

            {/* ─── RIGHT COLUMN (~35%) ─── */}
            <motion.div
              className="flex flex-col gap-6 lg:w-[35%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <NewArrivals />
              <LookbookTile />
              <Testimonials />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <MusicPlayer />
    </div>
  );
}
