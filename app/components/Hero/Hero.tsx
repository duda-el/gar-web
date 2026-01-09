"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MousePointer2, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[#191919] flex items-center overflow-hidden pt-[140px] pb-16">
      <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-30" />
      
      <div className="absolute top-[15%] -left-[5%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-8 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6 group cursor-default">
              <div className="w-8 h-[1px] bg-primary group-hover:w-12 transition-all duration-500" />
              <span className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                Digital Experience Studio
              </span>
            </div>

            <h1 className="text-[14vw] sm:text-[10vw] lg:text-[80px] font-black text-white leading-[1.2] lg:leading-[1.1] tracking-tighter">
              შექმენი <br />
              <span className="text-primary italic inline-block hover:translate-x-2 transition-transform duration-500">
                მომავალი
              </span> <br />
              ჩვენთან ერთად
            </h1>

            <div className="flex lg:hidden items-center gap-2 mt-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Available for projects</span>
            </div>

            <div className="mt-8 lg:mt-12 max-w-[480px]">
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-medium border-l-2 border-primary/40 pl-6">
                ჩვენ ვეხმარებით ბრენდებს გამორჩეული ციფრული გამოცდილების შექმნაში. 
                დიზაინი, დეველოპმენტი და სტრატეგია.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="#projects" 
                className="group flex items-center justify-center gap-3 bg-primary text-black px-10 py-5 rounded-full font-bold transition-all hover:bg-white active:scale-95 text-base"
              >
                ნახე პროექტები
                <ArrowUpRight className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <Link 
                href="#contact" 
                className="flex items-center justify-center px-10 py-5 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all text-base"
              >
                დაგვიკავშირდით
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-4 relative justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/5] group">
              {/* Card Layer */}
              <div className="absolute inset-0 bg-[#222]/40 rounded-[3rem] border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden z-20 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px:30px]" />
                
                <div className="absolute inset-0 p-12 flex flex-col justify-between">
                  <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Sparkles className="size-8 text-primary animate-pulse" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                       <span className="size-2 bg-primary rounded-full animate-ping" />
                       <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-bold">Studio Status</p>
                    </div>
                    <h3 className="text-white text-3xl font-bold tracking-tight leading-tight">მზად ვართ <br /> ახალი იდეებისთვის</h3>
                  </div>
                </div>

                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </div>
              
              <div className="absolute -bottom-8 -left-8 w-full h-full border border-primary/20 rounded-[3rem] z-10 transition-all duration-500 group-hover:scale-105" />
            </div>
          </div>

        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[10px] text-white uppercase tracking-[0.4em]">Scroll</span>
      </div>
    </section>
  );
}