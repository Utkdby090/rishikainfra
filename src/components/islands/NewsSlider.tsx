import React, { useRef, useState, useEffect } from 'react';
import { NEWS } from '../../data/news';



export default function NewsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNativeScroll = () => {
    if (scrollRef.current) {
      const cardNode = scrollRef.current.children[0] as HTMLElement;
      if (cardNode) {
        const cardWidth = cardNode.offsetWidth + 24; 
        const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardNode = scrollRef.current.children[0] as HTMLElement;
      if (cardNode) {
        const cardWidth = cardNode.offsetWidth + 24;
        scrollRef.current.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
        });
        setActiveIndex(index);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      scrollToIndex(Math.max(0, activeIndex - 1));
    } else {
      scrollToIndex(Math.min(NEWS.length - 1, activeIndex + 1));
    }
  };

  return (
    <section className="bg-[#F8F9FA] py-24 overflow-hidden relative">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <h2 className="text-4xl md:text-5xl font-light text-[#17212B] mb-12 tracking-tight">
          Latest news
        </h2>
        
        <div className="relative group">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')} 
            disabled={activeIndex === 0}
            className={`absolute -left-6 top-[40%] z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md
              ${activeIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-0' : 'bg-[#FFC62F] text-[#17212B] hover:scale-105 opacity-100'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* Cards Container */}
          <div 
            ref={scrollRef} 
            onScroll={handleNativeScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 relative"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {NEWS.map((item, idx) => (
              <a 
                href={`/news/${item.slug}`} 
                key={idx} 
                className="min-w-[340px] md:min-w-[400px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden snap-start cursor-pointer group/card flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={item.img.replace('w=1200', 'w=600')} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover/card:bg-black/0 transition-colors duration-300"/>
                  {/* Arrow on image */}
                  <div className="absolute right-4 bottom-4 w-10 h-10 border border-white flex items-center justify-center rounded transition-transform group-hover/card:translate-x-1">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow bg-white">
                  <h3 className="font-semibold text-lg text-[#17212B] leading-snug group-hover/card:text-[#0070BA] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            disabled={activeIndex >= NEWS.length - 1}
            className={`absolute -right-6 top-[40%] z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md
              ${activeIndex >= NEWS.length - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-0' : 'bg-[#FFC62F] text-[#17212B] hover:scale-105 opacity-100'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* Straight Segmented Dash Indicators */}
        <div className="flex justify-center items-center gap-1.5 mt-8">
          {NEWS.map((_, index) => (
            <button 
              key={index} 
              onClick={() => scrollToIndex(index)}
              aria-label={`Jump to news item ${index + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                activeIndex === index ? 'w-8 bg-[#FFC62F]' : 'w-3 bg-gray-300 cursor-pointer hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}