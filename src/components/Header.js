import React, { memo } from "react";

const HeaderComponent = () => {
  return (
    <header
      data-testid="headerContainer"
      className="flex content-start justify-center"
    >
      <h1 data-testid="h1Tag" className="text-2xl font-bold text-white">
        iO Assignment
      </h1>
    </header>
  );
};

export const Header = memo(HeaderComponent);
