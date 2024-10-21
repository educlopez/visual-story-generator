"use client";

import { useStory } from "@/context/StoryContext";
import { CldImage } from "next-cloudinary";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const End = () => {
  const { name, finalAvatarImage, selectedStory } = useStory();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = finalAvatarImage;
    link.download = `${name}_final_avatar.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `My Adventure in ${selectedStory?.title}`,
          text: `Check out my final avatar from my adventure in ${selectedStory?.title}!`,
          url: finalAvatarImage,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(
        "Sharing is not supported on this browser. You can copy the image URL to share manually."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 text-center"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6"
      >
        Congratulations, {name}! You&apos;ve completed &ldquo;
        {selectedStory?.title}&rdquo;
      </motion.h1>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <CldImage
          width="300"
          height="300"
          src={finalAvatarImage}
          alt={`${name}'s final avatar`}
          className="mx-auto rounded-full"
          underlay={selectedStory?.scenes[selectedStory.finalScene]?.background}
        />
      </motion.div>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg mb-6"
      >
        Your journey through the {selectedStory?.title} has come to an end. We
        hope you enjoyed your adventure!
      </motion.p>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-x-4"
      >
        <Button onClick={handleDownload}>Download Avatar</Button>
        <Button onClick={handleShare}>Share on Social Media</Button>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8"
      >
        <Link href="/">
          <Button variant="outline">Play Again</Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default End;
