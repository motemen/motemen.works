import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import "./site.css";
import WorksItem from "../components/WorksItem";

const WorksPage = (props: any) => {
  const data = useStaticQuery<GatsbyTypes.WorksQuery>(
    graphql`
      query Works {
        works: allWorksTsv {
          nodes {
            Date
            Name
            URL
            Article_URL
            Repository_URL
            Tags
            Deprecated
          }
        }
      }
    `
  );

  return (
    <main>
      <title>作品 | motemen</title>
      <h1>
        <Link to="/">motemen</Link>
      </h1>

      <section className="works">
        <h2>作品</h2>
        <ul>
          {data.works.nodes.map((work) => (
            <WorksItem
              name={work.Name}
              url={work.URL}
              articleURL={work.Article_URL}
              repositoryURL={work.Repository_URL}
              tags={work.Tags.split(",")}
              year={parseInt(work.Date?.substring(0, 4))}
              deprecated={work.Deprecated === "TRUE"}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default WorksPage;
