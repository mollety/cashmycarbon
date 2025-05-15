'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Globe, SquareDashedBottom } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-800">
      {/* Header */}
      <header className="px-6 py-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-brandGreen">SLAM-DUNK.NET</h1>
          <p className="text-sm text-gray-500">Cash in your carbon savings</p>
        </div>
        <nav className="mt-2 md:mt-0">
          <Link href="/login" className="text-sm font-medium text-brandBlue hover:underline">Login</Link>
        </nav>
      </header>

      {/* Main Panels */}
      <section className="flex flex-col md:flex-row flex-grow items-center justify-center p-6 gap-6">
        {/* Left Panel */}
        <div className="bg-blue-100 rounded-lg p-6 w-full md:w-1/2 text-center shadow-md">
          <h2 className="text-2xl font-semibold text-brandBlue mb-2">Have Solar or Wind?</h2>
          <Image src="/vercel.svg" alt="Solar Panels" width={100} height={100} className="mx-auto my-4" />
          <p className="mb-4 text-sm">Turn your renewable energy into cash.</p>
          <Link href="/signup" className="bg-brandBlue text-white py-2 px-4 rounded hover:bg-blue-600">Register Now</Link>
        </div>

        {/* Right Panel */}
        <div className="bg-green-100 rounded-lg p-6 w-full md:w-1/2 text-center shadow-md">
          <h2 className="text-2xl font-semibold text-brandGreen mb-2">Want Free Solar?</h2>
          <Image src="/next.svg" alt="Community Solar" width={100} height={100} className="mx-auto my-4" />
          <p className="mb-4 text-sm">Join our free community solar program.</p>
          <Link href="/waitlist" className="bg-brandGreen text-white py-2 px-4 rounded hover:bg-green-600">Join the Waitlist</Link>
        </div>
      </section>

      {/* Informational Text */}
      <section className="px-6 pb-6 max-w-4xl mx-auto text-sm text-gray-700 text-justify leading-relaxed">
        <p className="mb-4">
          In the USA 🇺🇸, <strong className="text-brandGreen">TESLA POWERWALL</strong> is paying homeowners up to <strong>$10,500/year</strong> for joining virtual power plants (VPPs) using solar panels, EVs, and Powerwalls.
        </p>
        <p className="mb-4">
          In <strong>California, Vermont, Texas, and Utah</strong>, utilities tap stored home energy during heatwaves—cutting blackouts and replacing gas plants.
        </p>
        <p className="mb-4">
          <strong>Sunrun</strong> auto-enrolls customers and pays <strong>$100/year</strong> while preserving 20% backup. <strong>GoodLeap</strong> offers <strong>$350</strong> for battery use.
        </p>
        <p className="mb-4">
          Vermont’s <strong>Green Mountain Power</strong> subsidizes two Tesla Powerwalls with <strong>$5,500</strong>—if shared for 10 years.
        </p>
        <p className="mb-4">
          One Maryland man earns <strong>$500/month</strong> using his Ford F-150 Lightning.
        </p>
        <p className="font-bold text-brandBlue mt-6">
          BUT NONE OF THEM ARE OFFERING CARBON CREDITS.
        </p>
        <p className="font-bold text-brandBlue">
          Source: Business Insider, Yahoo Life
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 border-t">
        <Link href="/terms" className="mx-2 hover:underline">Terms</Link>
        <Link href="/privacy" className="mx-2 hover:underline">Privacy</Link>
        <Link href="/contact" className="mx-2 hover:underline">Contact</Link>
      </footer>
    </main>
  );
}
