import { Link } from "gatsby";
import * as React from "react";

interface Props extends React.PropsWithChildren<{}> {
  pageTitle?: string;
}

const Layout = ({ pageTitle, children }: Props) => {
  return (
    <main>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&display=swap"
        rel="stylesheet"
      />
      <title>{pageTitle ? `${pageTitle} | ` : ""}motemen</title>
      <h1>
        <Link to="/">motemen</Link>
      </h1>

      {children}
    </main>
  );
};

export default Layout;
