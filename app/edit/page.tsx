'use client'
import EditHeader from '@/components/edit/header/Header';
import Tiptap from '@/components/edit/tiptap/Tiptap';
import useFileStorage from '@/hooks/useFileStorage';

export default function Home() {

  return (
    <div className='bg-base-300 w-screen h-screen prose p-5 max-w-full'>
      <Tiptap />
    </div>
  );
}

