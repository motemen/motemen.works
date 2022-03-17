import * as React from "react";

interface Props {
  name: string;
  url: string;
  year: number;
  tags: string[];
  articleURL?: string;
}

const WorksItem = ({ name, url, year, tags, articleURL }: Props) => (
  <li key={url}>
    <div>
      <a href={url}>{name}</a>
    </div>
    <div className="meta">
      <span className="year">{year}</span>{" "}
      {tags.map((tag) => (
        <span className="tag">{tag}</span>
      ))}
    </div>
  </li>
);

export default WorksItem;
