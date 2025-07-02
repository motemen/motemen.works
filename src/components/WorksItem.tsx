import { Language, Article, GitHub, Tv } from "@mui/icons-material";

interface Props {
  name: string;
  url?: string;
  year: number;
  tags: string[];
  articleURL?: string;
  repositoryURL?: string;
  presentationURL?: string;
  deprecated: boolean;
}

const WorksItem = ({
  name,
  url,
  year,
  tags,
  articleURL: maybeAbandonedArticleURL,
  repositoryURL,
  presentationURL,
  deprecated,
}: Props) => {
  let articleURL = maybeAbandonedArticleURL;
  if (articleURL && articleURL.indexOf("subtech.g.hatena.ne.jp") !== -1) {
    articleURL = "https://web.archive.org/web/2020/" + articleURL;
  }

  return (
    <li className={deprecated ? "deprecated" : ""}>
      <div>
        {deprecated ? (
          <del>{name}</del>
        ) : (
          <a href={url || articleURL || repositoryURL}>{name}</a>
        )}
        <span className="other-links">
          {url && (
            <a href={url} title="URL">
              <span className="icon">
                <Language fontSize="inherit" />
              </span>
            </a>
          )}
          {articleURL && (
            <a href={articleURL} title="記事">
              <span className="icon">
                <Article fontSize="inherit" />
              </span>
            </a>
          )}
          {presentationURL && (
            <a href={presentationURL} title="プレゼンテーション">
              <span className="icon">
                <Tv fontSize="inherit" />
              </span>
            </a>
          )}
          {repositoryURL && (
            <a href={repositoryURL} title="リポジトリ">
              <span className="icon">
                <GitHub fontSize="inherit" />
              </span>
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
