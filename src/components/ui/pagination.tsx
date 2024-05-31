import * as React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import cn from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';

interface PaginationProps extends React.ComponentProps<'nav'> {
  className?: string;
}

function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}
Pagination.displayName = 'Pagination';

interface PaginationContentProps extends React.ComponentProps<'ul'> {
  className?: string;
}

const PaginationContent = React.forwardRef<
HTMLUListElement,
PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

interface PaginationItemProps extends React.ComponentProps<'li'> {
  className?: string;
}

const PaginationItem = React.forwardRef<
HTMLLIElement,
PaginationItemProps
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
React.ComponentProps<'a'>;

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}
PaginationLink.displayName = 'PaginationLink';

interface PaginationPreviousProps extends React.ComponentProps<typeof PaginationLink> {
  className?: string;
}

function PaginationPrevious({
  className,
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
}
PaginationPrevious.displayName = 'PaginationPrevious';

interface PaginationNextProps extends React.ComponentProps<typeof PaginationLink> {
  className?: string;
}

function PaginationNext({
  className,
  ...props
}: PaginationNextProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      <span>Next</span>
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}
PaginationNext.displayName = 'PaginationNext';

interface PaginationEllipsisProps extends React.ComponentProps<'span'> {
  className?: string;
}

function PaginationEllipsis({
  className,
  ...props
}: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <DotsHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
