import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, ThemeProvider } from 'react-native-elements';

/// Import from 'react-native-pdf-lib'
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import download from 'downloadjs';
  
 
import pdfdoc from './doc/location.pdf';


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

   async function createPdf(props) {

// Modify first page in document
const page1 = PDFPage
  .modify(0)
  .drawText(lastname, {
    x: 5,
    y: 235,
    color: '#F62727',
  })
  .drawRectangle({
    x: 150,
    y: 150,
    width: 50,
    height: 50,
    color: '#81C744',
  });
 
 
const existingPDF = pdfdoc;
console.log(existingPDF);
PDFDocument
  .modify(existingPDF)
  .modifyPages(page1)
  .write() // Returns a promise that resolves with the PDF's path
  .then(path => {
    console.log('PDF modified at: ' + path);
  });

  const pdfBytes = await existingPDF.save()

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