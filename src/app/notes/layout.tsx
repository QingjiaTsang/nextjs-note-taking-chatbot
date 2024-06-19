import React, { FC } from 'react';

import NavBar from '@/components/NavBar';

type TProps = {};
const Layout: FC<TProps> = (props) => {
  return (
    <div>
      <NavBar />
    </div>
  );
};
export default Layout;
