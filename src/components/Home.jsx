import React from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

const Home = () => {
  return (
    <div className="flex h-[calc(100vh-2rem)] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-slate-900/35 shadow-2xl backdrop-blur-lg sm:h-[450px] md:h-[550px] lg:h-[650px]">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
