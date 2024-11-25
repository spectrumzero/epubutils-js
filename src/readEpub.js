import fs from 'fs';
import JSZip from 'jszip';
import { parseStringPromise } from 'xml2js';

export const parseEpub = async (filePath) => {
  const zip = new JSZip();

  try {
    // read epub file
    const data = fs.readFileSync(filePath);

    // load epub file
    const content = await zip.loadAsync(data);

    // read container.xml
    const containerXml = await content.file('META-INF/container.xml').async('string');

    // use xml2js to parse XML
    const containerData = await parseStringPromise(containerXml);
    const rootFilePath = containerData.container.rootfiles[0].rootfile[0].$['full-path'];
    // console.log(rootFilePath);

    // read opf file
    const opfContent = await content.file(rootFilePath).async('string');

    // parse opf file
    const opfData = await parseStringPromise(opfContent);
    return opfData;
  } catch (error) {
    console.error('Error parsing EPUB:', error);
    return null;
  }
};