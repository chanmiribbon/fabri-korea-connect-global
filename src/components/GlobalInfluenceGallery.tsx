
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const GlobalInfluenceGallery = () => {
  const showcases = [
    {
      image: "/lovable-uploads/5df0021b-e8b9-4d7c-80d8-362fd0717043.png",
      title: "동대문 원단의 글로벌 영향",
      description: "파리 컬렉션에 사용된 동대문 실크 원단",
      region: "Paris Fashion Week"
    },
    {
      image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
      title: "남대문 액세서리의 세계화",
      description: "글로벌 주얼리 브랜드에 납품된 남대문 큐빅",
      region: "Global Jewelry Brands"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-fabri-purple">
          글로벌 영향력
          <span className="block text-lg font-normal text-gray-600 mt-2">
            Global Influence
          </span>
        </h2>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {showcases.map((item, index) => (
              <CarouselItem key={index}>
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-fabri-purple mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-sm text-fabri-purple mt-2">{item.region}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12" />
          <CarouselNext className="absolute -right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default GlobalInfluenceGallery;
