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
  // Astroでは、import.meta.glob を使って直接ファイルを読み込む
  const fs = await import("fs/promises");
  const path = await import("path");

  const filePath = path.join(process.cwd(), "src/data/works.tsv");
  const text = await fs.readFile(filePath, "utf-8");
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
