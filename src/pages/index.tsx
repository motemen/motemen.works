import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import "./site.css";
import WorksItem from "../components/WorksItem";

// markup
const IndexPage = (props: any) => {
  const data = useStaticQuery<GatsbyTypes.DataQuery>(
    graphql`
      query Data {
        profile: markdownRemark(frontmatter: { slug: { eq: "profile" } }) {
          html
        }
        experiences: markdownRemark(
          frontmatter: { slug: { eq: "experiences" } }
        ) {
          html
        }
        allWorks: allWorksTsv {
          totalCount
        }
        selectedWorks: allWorksTsv(filter: { Select: { eq: "TRUE" } }) {
          nodes {
            Date
            Name
            URL
            Article_URL
            Tags
          }
        }
      }
    `
  );

  return (
    <main>
      <title>motemen</title>
      <h1>motemen</h1>

      <section className="profile">
        <div dangerouslySetInnerHTML={{ __html: data.profile.html }}></div>
      </section>

      <section className="works">
        <h2>選集</h2>
        <ul>
          {data.selectedWorks.nodes.map((work) => (
            <WorksItem
              name={work.Name}
              url={work.URL}
              tags={work.Tags.split(",")}
              year={parseInt(work.Date?.substring(0, 4))}
            ></WorksItem>
          ))}
        </ul>
        <Link to="/works">
          ➔ すべての作品を見る ({data.allWorks.totalCount})
        </Link>
      </section>

      <section className="experiences">
        <h2>職務経歴</h2>
        <div dangerouslySetInnerHTML={{ __html: data.experiences.html }}></div>
      </section>

      <section className="links">
        <h2>リンク</h2>
        <ul>
          <li>
            ブログ:{" "}
            <a href="https://motemen.hatenablog.com/">詩と創作・思索のひろば</a>
          </li>
          <li>
            GitHub: <a href="https://github.com/motemen">@motemen</a>
            <ul>
              <li>
                一部のメンテナンスを引き継いだソフトウェアは{" "}
                <a href="https://github.com/x-motemen">x-motemen</a>{" "}
                にあります。
              </li>
            </ul>
          </li>
          <li>
            Twitter: <a href="https://twitter.com/motemen">@motemen</a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default IndexPage;