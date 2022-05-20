import { Link } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";

interface Props extends React.PropsWithChildren<{}> {
  pageTitle?: string;
}

const Layout = ({ pageTitle, children }: Props) => {
  return (
    <main>
      <Helmet>
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
      </Helmet>
      <h1>
        <Link to="/">motemen</Link>
      </h1>

      {children}
    </main>
  );
};

export default Layout;
