import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import "./site.css";
import WorksItem from "../components/WorksItem";
import Layout from "../components/Layout";

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
    <Layout pageTitle="作品">
      <section className="works">
        <h2>作品</h2>
        <ul>
          {data.works.nodes.map((work) => (
            <WorksItem
              key={work.Name}
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
    </Layout>
  );
};

export default WorksPage;
