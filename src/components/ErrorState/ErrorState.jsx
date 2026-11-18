export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
      <i className="fa-solid fa-triangle-exclamation text-5xl text-red-400"></i>
      <p className="text-gray-600 text-lg">{message}</p>
      <p className="text-gray-400 text-sm">
        The server may be waking up — this can take up to a minute.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
        >
          Try again
        </button>
      )}
    </div>
  );
}
