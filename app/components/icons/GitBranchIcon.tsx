import React from 'react';

const GitBranchIcon: React.FC<ReactTagProps<'svg'>> = props => (
  <svg
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M0 0h24v24H0z' fill='none' stroke='none' />
    <path d='M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
    <path d='M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
    <path d='M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
    <path d='M7 8l0 8' />
    <path d='M9 18h6a2 2 0 0 0 2 -2v-5' />
    <path d='M14 14l3 -3l3 3' />
  </svg>
);
export { GitBranchIcon };
