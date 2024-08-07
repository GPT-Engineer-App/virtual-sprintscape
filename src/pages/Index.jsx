import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Camera, ChevronLeft, ChevronRight, Star, Music, Volume2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import confetti from 'canvas-confetti';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const { toast } = useToast();
  const headerRef = useRef(null);
  const audioRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gato_Siam%C3%A9s_Tradicional.jpg/1200px-Gato_Siam%C3%A9s_Tradicional.jpg",
  ];

  const catFacts = [
    "Cats have over 20 vocalizations, including the meow, purr, and hiss.",
    "A group of cats is called a 'clowder'.",
    "Cats can jump up to six times their length.",
    "A cat's sense of smell is 14 times stronger than a human's.",
    "Cats spend 70% of their lives sleeping.",
  ];

  const catPopulationData = [
    { year: 2015, population: 530 },
    { year: 2016, population: 552 },
    { year: 2017, population: 580 },
    { year: 2018, population: 600 },
    { year: 2019, population: 625 },
    { year: 2020, population: 650 },
  ];

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume[0]);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0];
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Meow-velous!",
      description: "You've shown some love to this cute cat!",
      duration: 3000,
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.header 
        ref={headerRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={catImages[0]} 
            alt="Cat background" 
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-7xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Feline Fascination
          </motion.h1>
          <motion.p 
            className="text-3xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Discover the Wonderful World of Cats
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-100 transition-colors"
              onClick={() => {
                toast({
                  title: "Welcome!",
                  description: "Enjoy your journey through the world of cats!",
                  duration: 3000,
                });
              }}
            >
              <Star className="mr-2 h-5 w-5" /> Start Exploring
            </Button>
          </motion.div>
        </div>
      </motion.header>

      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-white p-2 rounded-full shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="text-purple-600 hover:text-purple-800"
        >
          {isPlaying ? <Volume2 className="h-6 w-6" /> : <Music className="h-6 w-6" />}
        </Button>
        <Slider
          className="w-24"
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
        />
      </div>
      <audio ref={audioRef} loop>
        <source src="https://example.com/cat-purring.mp3" type="audio/mpeg" />
      </audio>

      <main className="container mx-auto py-24 px-4">
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-8 text-center">Cat of the Day</h2>
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={catImages[currentImageIndex]}
              alt="Cute cat" 
              className="mx-auto object-cover w-full h-[600px] rounded-lg mb-12 shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              onClick={() => openLightbox(catImages[currentImageIndex])}
            />
          </AnimatePresence>

          <div className="flex justify-center mb-12">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleLike}
              className="flex items-center gap-2 bg-white hover:bg-pink-100 transition-colors"
            >
              <Heart className={`h-6 w-6 ${likes > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              Like this cat! ({likes})
            </Button>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-8 text-center">Cat Facts Carousel</h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="bg-white p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Paw className="h-8 w-8 text-purple-500 mb-4 mx-auto" />
                <p className="text-xl text-center">{catFacts[currentImageIndex]}</p>
              </motion.div>
            </AnimatePresence>
            <Button 
              variant="outline" 
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2"
              onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + catFacts.length) % catFacts.length)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catFacts.length)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-8 text-center">Cat Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => openLightbox(image)}
              >
                <img src={image} alt={`Cat ${index + 1}`} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Camera className="text-white h-12 w-12" />
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-lg font-semibold">Cat {index + 1}</p>
                  <p className="text-white text-sm">Click to view full size</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-8 text-center">Cat Population Trend</h2>
          <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={catPopulationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="population" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <Tabs defaultValue="characteristics" className="mb-24">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-6 w-6" />
                  Characteristics of Cats
                </CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none pl-6 space-y-4">
                  {[
                    "Independent nature",
                    "Excellent hunters with sharp claws and teeth",
                    "Flexible bodies and quick reflexes",
                    "Keen senses, especially hearing and night vision",
                    "Communicate through vocalizations, body language, and scent"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-4 bg-purple-50 p-4 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paw className="h-6 w-6 text-purple-500 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cat className="h-6 w-6" />
                  Popular Cat Breeds
                </CardTitle>
                <CardDescription>Some well-known cat breeds around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none pl-6 space-y-4">
                  {[
                    { breed: "Siamese", description: "Known for their distinctive coloring and vocal nature" },
                    { breed: "Persian", description: "Recognized for their long, luxurious coat and flat face" },
                    { breed: "Maine Coon", description: "One of the largest domestic cat breeds with a friendly disposition" },
                    { breed: "Bengal", description: "Featuring a wild appearance with spotted or marbled coat patterns" },
                    { breed: "Scottish Fold", description: "Characterized by their unique folded ears and round faces" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-4 bg-pink-50 p-4 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paw className="h-6 w-6 mt-1 text-pink-500 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-lg">{item.breed}</span>
                        <p className="mt-1">{item.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button 
            variant="outline"
            size="lg"
            className="bg-white hover:bg-purple-100 transition-colors"
            onClick={() => {
              toast({
                title: "Paw-some!",
                description: "You're on your way to becoming a true cat expert!",
                duration: 3000,
              });
            }}
          >
            <Camera className="mr-2 h-6 w-6" /> Capture Cat Moments
          </Button>
        </div>
      </main>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 text-white"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                ✕
              </motion.div>
            </Button>
            <motion.img
              src={lightboxImage}
              alt="Lightbox image"
              className="max-w-full max-h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
