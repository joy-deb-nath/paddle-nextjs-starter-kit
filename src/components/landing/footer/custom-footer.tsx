import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function CustomFooter() {
  return (
    <footer className="border-t border-gray-800 bg-[#0A051A]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Link className="flex items-center" href={'/'}>
            <Image className="w-auto block" src="/logo.svg" width={131} height={28} alt="AeroEdit" />
          </Link>
        </div>
        <div className="text-sm text-gray-500">&copy; {new Date().getFullYear()} AeroEdit. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            Terms of Service
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            Contact Us
          </Link>
          <div className="flex gap-4">
            <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
