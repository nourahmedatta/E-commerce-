export default function FreshCartFooterCTA(){
  return (
    <section className="w-full bg-gray-100 border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-gray-700">Get the FreshCart app</h2>
        <p className="text-sm text-gray-500 mt-1">We will send you a link, open it on your phone to download the app.</p>

        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <input
            type="email"
            placeholder="Email ..."
            className="flex-1 h-11 px-4 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="h-11 px-6 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition">
            Share App Link
          </button>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-600">Payment Partners</span>
            <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-700">amazon pay</span>
            <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">American Express</span>
            <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">Mastercard</span>
            <span className="px-2 py-1 text-xs rounded bg-sky-100 text-sky-700">PayPal</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-sm text-gray-600">Get deliveries with FreshCart</span>
            <button className="bg-black text-white text-xs px-3 py-2 rounded-md"> App Store</button>
            <button className="bg-black text-white text-xs px-3 py-2 rounded-md">▶ Google Play</button>
          </div>
        </div>
      </div>
    </section>
  )
}