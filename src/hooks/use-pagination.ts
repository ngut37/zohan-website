import { useState } from 'react';

import { PaginationType } from '@api/types';

type Props = {
  initialPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
};

export const usePagination = ({ initialPage = 1, pageSize = 5 }: Props) => {
  const [pagination, setPagination] = useState<PaginationType>({
    page: initialPage,
    limit: pageSize,
    total: 0,
  });

  return {
    pagination,
    setPagination,
  };
};
