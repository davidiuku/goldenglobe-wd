'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Product } from '@/lib/types'
import Image from 'next/image';

const HomePage = () => {

  return (
    <main className="flex justify-center gap-[32px] row-start-2 items-center sm:items-start">
      <div>Home Page</div>
    </main>
  );
}

export default HomePage;
