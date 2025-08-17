import { Progress } from '@/components/ui/progress'


export default function GlobalAppLoader() {
  //SET TIME OUT

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-3xl">E</span>
        </div>
        <span className="text-3xl font-bold text-gray-900">EStore</span>
      </div>
      {/* Spinner */}
      <div className="mb-4">
        <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
      {/* Loading text */}
      <div className="text-lg text-gray-500 font-medium tracking-wide">Loading…</div>
    </div>
  );
}