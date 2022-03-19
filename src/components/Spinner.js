export default function Spinner() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/[0.3] dark:bg-black/[0.275] z-[5000] flex justify-center items-center">
      <div className="w-16 h-16  border-8 rounded-full animate-spin border-t-indigo-600 border-b-indigo-600 border-l-transparent border-r-transparent dark:border-t-blue-400 dark:border-b-blue-400"></div>
    </div>
  );
}
