export interface Work {
  Date: string;
  Name: string;
  Tags: string;
  URL?: string;
  "Repository URL"?: string;
  "Article URL"?: string;
  Select: string;
  Deprecated: string;
  [key: string]: string | undefined; // インデックスシグネチャを追加
}

export async function loadWorks(): Promise<Work[]> {
  // Google Sheetsから直接TSVデータをフェッチする
  const url = "https://docs.google.com/spreadsheets/d/19jtTn6MWEcCAryBreABNOTyQ8Trd7OzRg7_X0QqZjQU/export?format=tsv&gid=0";
  const response = await fetch(url);
  const text = await response.text();
  const lines = text.split("\n");
  const headers = lines[0].split("\t");

  return lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = line.split("\t");
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || "";
        return obj;
      }, {} as Work);
    });
}
