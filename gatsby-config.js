/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  plugins: [
    "gatsby-plugin-typegen",
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [require(`postcss-preset-env`)({ stage: 0 })],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-34276254-1",
      },
    },
    {
      resolve: `gatsby-transformer-csv`,
      options: {
        extensions: [`tsv`],
        delimiter: "\t",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    "gatsby-transformer-remark",
  ],
};
