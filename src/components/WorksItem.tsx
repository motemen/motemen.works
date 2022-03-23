import * as React from "react";
import ArticleIcon from "@mui/icons-material/Article";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Language";

interface Props {
  name: string;
  url: string;
  year: number;
  tags: string[];
  articleURL: string;
  repositoryURL: string;
  deprecated: boolean;
}

const WorksItem = ({
  name,
  url,
  year,
  tags,
  articleURL: maybeAbandonedArticleURL,
  repositoryURL,
  deprecated,
}: Props) => {
  let articleURL = maybeAbandonedArticleURL;
  if (articleURL.indexOf("subtech.g.hatena.ne.jp") !== -1) {
    articleURL = "https://web.archive.org/web/2020/" + articleURL;
  }

  return (
    <li key={url}>
      <div>
        {deprecated ? (
          <del>{name}</del>
        ) : (
          <a href={url || articleURL || repositoryURL}>{name}</a>
        )}
        <span className="other-links">
          {url && (
            <a href={url} title="URL">
              <WebIcon fontSize="inherit" />
            </a>
          )}
          {articleURL && (
            <a href={articleURL} title="記事">
              <ArticleIcon fontSize="inherit" />
            </a>
          )}
          {repositoryURL && (
            <a href={repositoryURL} title="リポジトリ">
              <GitHubIcon fontSize="inherit" />
            </a>
          )}
        </span>
      </div>
      <div className="meta">
        <span className="year">{year}</span>{" "}
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
};

export default WorksItem;
