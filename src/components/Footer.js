import React, { memo } from "react";

const FooterComponent = () => {
  return (
    <footer
      data-testid="footerContainer"
      className="flex py-5 mt-5 justify-evenly"
    >
      <a
        data-testid="gitHubLink"
        className="text-white"
        href="https://github.com/ar0ra1/io-assignment.git"
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        Github
      </a>
      <p data-testid="authorName" className="text-white">
        By Akash Arora
      </p>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
