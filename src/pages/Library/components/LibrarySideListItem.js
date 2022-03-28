export default function LibrarySideListItem({
  dbId,
  id,
  type,
  title,
  handleClick,
}) {
  return (
    <div
      onClick={() => handleClick({ type, id, dbId })}
      className="transition-all w-full p-3 py-4 text-lg  lg:text-xl dark:text-white hover:bg-slate-200 dark:hover:bg-gray-700 rounded-lg sm:hover:scale-105 text-center md:text-left cursor-pointer"
    >
      {title}
    </div>
  );
}
