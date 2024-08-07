import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Camera } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="bg-purple-600 text-white py-16">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Feline Fascination
          </motion.h1>
          <motion.p 
            className="text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Discover the Wonderful World of Cats
          </motion.p>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            src={catImages[currentImageIndex]}
            alt="Cute cat" 
            className="mx-auto object-cover w-full h-[500px] rounded-lg mb-12 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
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

        <Alert className="mb-8">
          <Paw className="h-4 w-4" />
          <AlertTitle>Did you know?</AlertTitle>
          <AlertDescription>
            Cats spend 70% of their lives sleeping. That's about 13-16 hours a day!
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="characteristics" className="mb-12">
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
                <ul className="list-none pl-6 space-y-2">
                  {[
                    "Independent nature",
                    "Excellent hunters with sharp claws and teeth",
                    "Flexible bodies and quick reflexes",
                    "Keen senses, especially hearing and night vision",
                    "Communicate through vocalizations, body language, and scent"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paw className="h-4 w-4 text-purple-500" />
                      {item}
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
                <ul className="list-none pl-6 space-y-2">
                  {[
                    { breed: "Siamese", description: "Known for their distinctive coloring and vocal nature" },
                    { breed: "Persian", description: "Recognized for their long, luxurious coat and flat face" },
                    { breed: "Maine Coon", description: "One of the largest domestic cat breeds with a friendly disposition" },
                    { breed: "Bengal", description: "Featuring a wild appearance with spotted or marbled coat patterns" },
                    { breed: "Scottish Fold", description: "Characterized by their unique folded ears and round faces" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paw className="h-4 w-4 mt-1 text-purple-500" />
                      <div>
                        <span className="font-bold">{item.breed}</span> - {item.description}
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
            <Camera className="mr-2 h-4 w-4" /> Capture Cat Moments
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
