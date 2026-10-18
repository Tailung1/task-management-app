export default function BoardListSkeleton() {
  return (
    // aria-busy Tells screen readers this region is still loading or updating.
    <div aria-label='Loading boards' aria-busy='true'>
      <p className='pb-4 text-xs font-bold tracking-wide text-[#828FA3]'>ALL BOARDS</p>

      <div className='-ml-8 mb-8 max-h-58.5 overflow-y-auto pr-10'>
        <ul>
          {[1, 2, 3, 4].map((item) => (
            <li key={item}>
              <div className='flex w-67 items-center gap-2 rounded-r-3xl py-2.5 pl-8 md:w-55'>
                <div className='h-5 w-5 shrink-0 animate-pulse rounded-sm bg-[#828FA3]/25' />

                <div className='flex h-7 min-w-0 flex-1 items-center'>
                  <div
                    className={`h-3 animate-pulse rounded-full bg-[#828FA3]/25 ${
                      item % 2 === 0 ? "w-2/5" : "w-3/5"
                    }`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className='mb-6 flex cursor-pointer items-center gap-2'>
        <div className='h-5 w-5 shrink-0 animate-pulse rounded bg-[#7230db]/20' />

        <div className='h-7 w-40 animate-pulse rounded-full bg-[#7230db]/20' />
      </div>

      <span className='sr-only' role='status'>
        Loading boards...
      </span>
    </div>
  );
}
