import React, { useMemo } from 'react';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { getVisiblePages } from '@utils/pagination';

import { Button } from '@atoms';

import { HStack } from '@chakra-ui/react';

type Props = {
  currentPage: number;
  count: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  count,
  perPage,
  onPageChange,
}: Props) => {
  const { totalPages, pages, showBegin, showEnd, onStart, onEnd } =
    useMemo(() => {
      return getVisiblePages({
        count,
        perPage,
        page: currentPage,
      });
    }, [currentPage, count, perPage]);

  return (
    <HStack>
      <Button
        variant="link"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={onStart || count === 0}
      >
        <HiChevronLeft fontSize="24px" />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          fontSize={currentPage === page ? 'md' : 'sm'}
          marginRight={showBegin && page === 1 ? '20px' : ''}
          marginLeft={showEnd && page === totalPages ? '20px' : ''}
          variant={currentPage === page ? 'outline' : 'link'}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="link"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={onEnd || count === 0}
      >
        <HiChevronRight fontSize="24px" />
      </Button>
    </HStack>
  );
};
