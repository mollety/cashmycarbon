'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center flex-wrap">
        <h1 className="text-xl md:text-2xl font-bold text-brandBlue">SLAM-DUNK.NET</h1>
        <Link href="/login" className="text-brandBlue font-medium hover:underline text-sm md:text-base mt-2 md:mt-0">
          Login
        </Link>
      </header>

      {/* Main Body */}
      <main className="flex-1 w-full px-4 py-6 bg-gray-50 flex flex-col items-center">
        <h2 className="text-lg md:text-xl text-gray-700 mb-6 text-center">
          Cash in your Carbon Savings
        </h2>

        {/* Intro Text */}
        <div className="max-w-xl text-sm text-gray-700 text-center leading-relaxed mb-6 px-2">
          <p className="mb-3">
            Are you one of the million solar households in the UK or 10 million in Europe?
            It&apos;s as easy as filling in a form and uploading your proof of electricity export from your monthly bill.
          </p>
          <p>
            If you don&apos;t yet have clean home power, we offer free installation and management, upon submission of your last three months&apos; bills.
          </p>
        </div>

        {/* Panel Section */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl items-center justify-center">
          {/* Left Panel */}
          <div className="flex-1 bg-brandBlue text-white rounded-lg p-6 flex flex-col items-center text-center w-full">
            <Image src="/cashback2/images/globe.svg" alt="Solar Icon" width={80} height={80} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">Have Solar or Wind?</h3>
            <p className="mb-2 text-sm px-2">
              Cash in the carbon savings from your clean energy generation.
            </p>
            <p className="text-xs italic mb-3 px-2">
              Next: Upload your energy proof and fill in the form
            </p>
            <Image src="/cashback2/public/images/cash.svg" alt="Energy Proof" width={160} height={100} className="mb-4" />
            <Link href="/signup" className="bg-white text-brandBlue text-xs md:text-sm px-3 py-1.5 rounded font-semibold">
              Register Now
            </Link>
          </div>

          {/* Right Panel */}
          <div className="flex-1 bg-brandGreen text-white rounded-lg p-6 flex flex-col items-center text-center w-full">
            <Image src="/cashback2/images/window.svg" alt="Community Icon" width={80} height={80} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">Want Free Solar?</h3>
            <p className="mb-2 text-sm px-2">
              Anywhere in the UK, free solar or wind, and guaranteed lower bills — carbon savings included!
            </p>
            <p className="text-xs italic mb-3 px-2">
              Next: Fill in the form and upload two recent energy bills
            </p>
<Image src="/cashback2/public/images/cash.svg" alt="Energy Proof" width={160} height={100} className="mb-4" />

            <Link href="/cashback2/free-solar" className="bg-white text-brandGreen text-xs md:text-sm px-3 py-1.5 rounded font-semibold">
              Join the Waitlist
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-10 max-w-3xl text-sm text-gray-700 leading-relaxed text-justify px-4">
          <p className="mb-3">
            In the USA 🇺🇸 <strong className="text-brandGreen">TESLA POWERWALL</strong> is paying homeowners up to <strong>$10,500/year</strong> for joining virtual power plants (VPPs) using solar panels, EVs, and Powerwalls.
          </p>
          <p className="mb-3">
            In <strong>CA, VT, TX, and UT</strong>, utilities tap stored home energy during heatwaves—cutting blackouts and replacing gas plants.
          </p>
          <p className="mb-3">
            <strong>Sunrun</strong> auto-enrolls customers and pays <strong>$100/year</strong> while preserving 20% backup. <strong>GoodLeap</strong> offers <strong>$350</strong> for battery use.
          </p>
          <p className="mb-3">
            <strong>Vermont&apos;s Green Mountain Power</strong> subsidizes two Tesla Powerwalls with <strong>$5,500</strong>—if shared for 10 years.
          </p>
          <p className="mb-3">
            One Maryland man earns <strong>$500/month</strong> using his Ford F-150 Lightning.
          </p>
          <p className="mt-6 text-brandBlue font-bold">
            BUT NONE OF THEM ARE OFFERING CARBON CREDITS
          </p>
          <p className="text-xs mt-2 text-gray-500 font-medium">Source: Business Insider, Yahoo Life</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4">
        <div className="flex flex-wrap justify-center space-x-4">
          <Link href="/cashback2/terms" className="hover:underline">Terms</Link>
          <Link href="/cashback2/privacy" className="hover:underline">Privacy</Link>
          <Link href="/cashback2/contact" className="hover:underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
