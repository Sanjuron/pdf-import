// import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';


  // avevc react-native-pdf-lib
  async function createPdf() {
  const page1 = PDFPage
  .create()
  .setMediaBox(200, 200)
  .drawText("Il est possible d'ajouter du texte dans un pdf", {
    x: 5,
    y: 235,
    color: '#007386',
  });

  

const docsDir = await PDFLib.getDocumentsDirectory();
const pdfPath = `${docsDir}/sample.pdf`;
PDFDocument
  .create(pdfPath)
  .addPages(page1)
  .write()
  .then(path => {
    console.log('le pdf a été créé a ' + path )
  });
  }



async function modifyPdf() {
  const path = './pdfs.doc1.pdf'
  const existingPdfBytes = await fetch(path).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()
  firstPage.drawText('This text was added with JavaScript!', {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  })

  const pdfBytes = await pdfDoc.save()
}