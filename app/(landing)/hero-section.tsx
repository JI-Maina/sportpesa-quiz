import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/modals/login-modal";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          fill
          src={"/heroImg.jpg"}
          alt="Soccer stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/90 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-primary-glow" />
            <span className="text-sm font-medium text-primary-glow">
              Test Your Soccer Knowledge
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Predict. Quiz.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
              Dominate.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Challenge yourself with match predictions and soccer trivia. Compete
            with fans worldwide and prove you're the ultimate football expert.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LoginModal title="Start Predicting" path="/predictor" />

            <LoginModal title="Take a Quiz" path="/quiz" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
