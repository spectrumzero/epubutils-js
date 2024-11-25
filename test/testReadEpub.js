import { parseEpub } from "../src/readEpub.js";

(async () => {
  const epubFilePath = '/home/fanyfull/HDisk/Books/Test/沉默的大多数.epub';
  const opfData = await parseEpub(epubFilePath);
  console.log(opfData);
})();
