type VisiblePagesResult = {
  totalPages: number;
  pages: number[];
  showBegin: boolean;
  showEnd: boolean;
  onStart: boolean;
  onEnd: boolean;
};

export const getVisiblePages = ({
  count,
  perPage,
  page,
}: {
  count: number;
  perPage: number;
  page: number;
}): VisiblePagesResult => {
  const totalPages = Math.ceil(count / perPage);

  // Contains pages by index (0, 1, 2, 3, 4, ...)
  const pageIndexes = [...Array(totalPages).keys()];
  // Contains pages by page number (1, 2, 3, 4, 5, ...)
  const allPages = pageIndexes.map((index) => index + 1);

  /*
       Begin has to be >= 0 and <= pages.length -3
       This makes sure there will be atleast 3 pages, when current page is the
       first page
     */
  const begin = Math.min(
    Math.max(page - 2, 0),
    Math.max(allPages.length - 3, 0),
  );
  const showBegin = begin > 0;
  const onStart = page === 1;

  /*
       End has to be >= 3
       This makes sure there will be atleast 3 pages, when current page is the
       last page
     */
  const end = Math.max(page + 1, 3);
  const showEnd = end < totalPages;
  const onEnd = page === totalPages;

  const pages: number[] = allPages.slice(begin, end);

  if (showBegin) pages.splice(0, 0, allPages[0]);
  if (showEnd) pages.push(allPages[totalPages - 1]);

  return { totalPages, pages, showBegin, showEnd, onStart, onEnd };
};
