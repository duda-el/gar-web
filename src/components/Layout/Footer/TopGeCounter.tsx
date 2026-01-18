"use client";

import Script from "next/script";

const TopGeCounter = () => {
  return (
    <div className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
      {/* კონტეინერი სადაც აიკონი გამოჩნდება */}
      <div id="top-ge-counter-container" data-site-id="118478"></div>
      
      {/* სკრიპტის ასინქრონული ჩატვირთვა */}
      <Script
        src="https://counter.top.ge/counter.js"
        strategy="lazyOnload" // ჩაიტვირთება მას შემდეგ რაც ძირითადი საიტი მორჩება მუშაობას
      />
    </div>
  );
};

export default TopGeCounter;