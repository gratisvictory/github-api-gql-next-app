import React from 'react';

const AtIcon: React.FC<ReactTagProps<'svg'>> = props => (
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
    <path d='M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
    <path d='M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28' />
  </svg>
);
export { AtIcon };
