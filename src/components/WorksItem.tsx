import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

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
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          )}
          {articleURL && (
            <a href={articleURL} title="記事">
              <FontAwesomeIcon icon={faSquarePen} />
            </a>
          )}
          {repositoryURL && (
            <a href={repositoryURL} title="リポジトリ">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
        </span>
      </div>
      <div className="meta">
        <span className="year">{year}</span>{" "}
        {tags.map((tag) => (
          <span className="tag">{tag}</span>
        ))}
      </div>
    </li>
  );
};

export default WorksItem;
