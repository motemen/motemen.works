import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import "./site.css";
import WorksItem from "../components/WorksItem";
import Layout from "../components/Layout";

const IndexPage = () => {
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
            Repository_URL
            Tags
            Deprecated
          }
        }
      }
    `
  );
  if (!data) {
    throw new Error("data is null");
  }

  return (
    <Layout>
      <section className="profile">
        <div dangerouslySetInnerHTML={{ __html: data.profile.html }}></div>
      </section>

      <section className="works">
        <h2>選集</h2>
        <ul>
          {data.selectedWorks.nodes.map((work) => (
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
                一部のコードは{" "}
                <a href="https://github.com/x-motemen">x-motemen</a> に委譲。
              </li>
            </ul>
          </li>
          <li>
            Bluesky:{" "}
            <a href="https://bsky.app/profile/motemen.works">@motemen.works</a>
          </li>
          <li>
            𝕏: <a href="https://twitter.com/motemen">@motemen</a>
          </li>
          <li>
            Fediverse:{" "}
            <a href="https://pub.motemen.works">@motemen@pub.motemen.works</a>
          </li>
          <li>
            メール: <a href="mailto:motemen@gmail.com">motemen@gmail.com</a>
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default IndexPage;
