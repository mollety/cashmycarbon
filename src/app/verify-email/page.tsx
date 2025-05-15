import Layout from '../components/Layout';
export default function VerifyEmailPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
        <img src="/file.svg" alt="Envelope" className="w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
        <p className="text-gray-600 mb-4">We've sent a confirmation link to your email.</p>
        <button className="bg-brandBlue text-white px-4 py-2 rounded">Resend Email</button>
        <p className="text-sm text-gray-500 mt-2">Check your spam folder if you don't see it.</p>
        <a href="/login" className="text-brandBlue mt-4 underline text-sm">Back to Login</a>
      </div>
    );
  }
  