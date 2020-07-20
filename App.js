import React, { useState } from "react";
import { StyleSheet, Text, View, processColor } from "react-native";
import { Button, Input, ThemeProvider } from "react-native-elements";

//import de la bibliothèque pdf
import { degrees, PDFDocument, StandardFonts, rgb } from "pdf-lib";
import download from "downloadjs";

//import document
// import pdf from "./doc/location.pdf";


export default function App(){

const [lastname, setLastname] = useState('');
  // const [firstname, setFirstname] = useState('');
  // const [model, setModel] = useState('');

const changeLastname= (val) => {
  setLastname(val)
}
// const changeFirstame= (val) => {
//   setFirstname(val)
// }
// const changeModel= (val) => {
//   setModel(val)
// }

// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()
async function modifyPdf(props) {

const url = "/home/sanjuron/projects/code-personnel/native/pdf-test/doc/location.pdf";
const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
var bytes = new Uint8Array(existingPdfBytes);


// Load a PDFDocument from the existing PDF bytes
const pdfDoc = await PDFDocument.load(existingPdfBytes);
// console.log(pdfDoc.context.header.toString());
process.exit();


// Embed the Helvetica font
const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

// Get the first page of the document
const pages = pdfDoc.getPages()
const firstPage = pages[0]

// Get the width and height of the first page
const { width, height } = firstPage.getSize()

// Draw a string of text diagonally across the first page
firstPage.drawText(lastname, {
  x: 5,
  y: height / 2 + 300,
  size: 50,
  font: helveticaFont,
  color: rgb(0.95, 0.1, 0.1),
  rotate: degrees(-45),
})



// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

// For example, `pdfBytes` can be:
//   • Written to a file in Node
//   • Downloaded from the browser
//   • Rendered in an <iframe>
download(pdfBytes, "contrat-de-location.pdf", "application/pdf");
}


  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.h1}>Contrat de Location</Text>
        <Input placeholder="Nom du demandeur" onChangeText={changeLastname} />
        {/* <Input
          placeholder="Prénom du demandeur"
          onChangeText={changeFirstame}
        />
        <Input
          placeholder="Modèle de la voiture à louer"
          onChangeText={changeModel}
        /> */}
        <Button title="sauvegarder pdf" onPress={modifyPdf} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#009CBF",
  },
});
