import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, ThemeProvider } from 'react-native-elements';

/// Import from 'react-native-pdf-lib'
// import PDFLib, {  PDFDocument, PDFPage } from 'react-native-pdf-lib';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from 'downloadjs';

import location from "./doc/location.pdf"
 


export default function App() {

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [model, setModel] = useState('');

  const changeLastname= (val) => {
    setLastname(val)
  }
  const changeFirstame= (val) => {
    setFirstname(val)
  }
  const changeModel= (val) => {
    setModel(val)
  }

   async function createPdf() {

// Modify first page in document

 
  const url = location;
  console.log(url);
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  console.log(pdfDoc);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

     const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const secondPage = pages[1]
      const fifthPage = pages[4]
      const eighthPage = pages[7]

      // Get the width and height of the first page
      const { width, height } = firstPage.getSize()
      console.log(width);
      console.log(height);

      // Draw a string of text diagonally across the first page

      eighthPage.drawText(lastname, {
        x: 461,
        y: 160,
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      })




      const pdfBytes = await pdfDoc.save()

// PDFDocument
//   .modify(existingPDF)
//   .modifyPages(page1)
//   .write() // Returns a promise that resolves with the PDF's path
//   .then(path => {
//     console.log('PDF modified at: ' + path);
//   });

//   const pdfBytes = await existingPDF.save()

  download(pdfBytes, "contrat-de-location.pdf", "application/pdf");


}


return (
  <ThemeProvider>
  <View style={styles.container}>
    <Text style={styles.h1}>Contrat de Location</Text>
    <Input
      placeholder='Nom du demandeur'
      onChangeText={changeLastname}
    />
    <Input
      placeholder='Prénom du demandeur'
      onChangeText={changeFirstame}
    />
    <Input
      placeholder='Modèle de la voiture à louer'
      onChangeText={changeModel}
    />
    <Button
    title="sauvegarder pdf"
    onPress={createPdf}
    />

  </View>
  </ThemeProvider>
);
}



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#009CBF'
  }
});