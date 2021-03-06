import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

export default function App() {
  const [text, setText] = useState('');

  function getWords() {
    const regEx = /[A-Z0-9áàâãéèêíïóôõöúçñ]+/gi;

    if (regEx.test(text)) return text.match(regEx).length;
    else return 0;
  }

  function phraseFormat() {
    let newText = text.toLowerCase();
    let regEx = /(\?|\.|\!)\s?[a-z]|^[a-z]/gi;
    newText = newText.replace(regEx, (match) => {
      return match.toUpperCase();
    });
    setText(newText);
  }

  function lowercase() {
    setText(text.toLowerCase());
  }

  function uppercase() {
    setText(text.toUpperCase());
  }

  function capitalized() {
    let regEx = /\s[a-z]|^[a-z]/gi;
    let newText = text.toLowerCase();
    setText(
      newText.replace(regEx, (match) => {
        return match.toUpperCase();
      })
    );
  }

  function alternated() {
    let newText = text.split('');
    for (let i = 0; i < newText.length; i += 2) {
      newText[i] = newText[i].toUpperCase();
      if (newText[i + 1] !== undefined) {
        newText[i + 1] = newText[i + 1].toLowerCase();
      }
    }
    setText(newText.join(''));
  }

  function inverted() {
    let newText = text.split('');
    for (let i = 0; i < newText.length; i += 1) {
      if (newText[i].toUpperCase() === newText[i]) {
        newText[i] = newText[i].toLowerCase();
      } else {
        newText[i] = newText[i].toUpperCase();
      }
    }
    setText(newText.join(''));
  }

  function clear() {
    setText('');
  }

  function copy() {
    Clipboard.setString(text);
  }

  return (
    <ScrollView style={styles.scroll}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.headerLogo}
            source={require('./assets/icon.png')}
          ></Image>
          <Text style={styles.headerText}>Case Converter</Text>
          <View />
        </View>
        <AdMobBanner style={styles.adTop} bannerSize='banner' adUnitID='' />
        <TextInput
          style={styles.textInput}
          value={text}
          multiline
          onChangeText={(text) => setText(text)}
        ></TextInput>
        <View style={styles.countView}>
          <View>
            <Text style={styles.countText}>Words: {getWords()}</Text>
            <Text style={styles.portuguese}>Palavras</Text>
          </View>
          <View>
            <Text style={styles.countText}>Letters: {text.length}</Text>
            <Text style={styles.portuguese}>Letras</Text>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={phraseFormat}>
            <Text style={styles.optionButtonText}>Phrase format</Text>
            <Text style={styles.portuguese}>Formato frase</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={lowercase}>
            <Text style={styles.optionButtonText}>lowercase</Text>
            <Text style={styles.portuguese}>minúsculas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={uppercase}>
            <Text style={styles.optionButtonText}>UPPERCASE</Text>
            <Text style={styles.portuguese}>MAIÚSCULAS </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={capitalized}>
            <Text style={styles.optionButtonText}>Capitalized</Text>
            <Text style={styles.portuguese}>Capitalizado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={alternated}>
            <Text style={styles.optionButtonText}>AlTeRnAtEd</Text>
            <Text style={styles.portuguese}>AlTeRnAdO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={inverted}>
            <Text style={styles.optionButtonText}>iNVERTED</Text>
            <Text style={styles.portuguese}>iNVERTIDO</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.functionsContainer}>
          <TouchableOpacity style={styles.functionButton} onPress={clear}>
            <Text style={styles.functionButtonText}>Clear</Text>
            <Text style={styles.portuguese}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.functionButton} onPress={copy}>
            <Text style={styles.functionButtonText}>Copy</Text>
            <Text style={styles.portuguese}>Copiar</Text>
          </TouchableOpacity>
        </View>
        <AdMobBanner
          style={styles.adBottom}
          bannerSize='largeBanner'
          adUnitID=''
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Developed by {'\n'} Tiago Schulz Sansão &copy; 2020-
            {new Date().getFullYear()}
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  adTop: {
    marginTop: 10,
    width: 320,
    height: 50,
  },
  adBottom: {
    width: 320,
    height: 100,
    marginTop: 10,
    marginBottom: 15,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  countView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  countText: {
    color: 'white',
    fontSize: 20,
  },
  functionsContainer: {
    marginTop: 5,
    marginBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  functionButton: {
    width: 120,
    height: 40,
    backgroundColor: '#00b894',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#81ecec',
    borderWidth: 1,
  },
  functionButtonText: {
    textShadowColor: 'black',
    textShadowRadius: 5,
    color: 'white',
  },
  footer: {
    backgroundColor: '#6c5ce7',
    width: '100%',
    justifyContent: 'center',
    height: 55,
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 3,
  },
  header: {
    backgroundColor: '#6c5ce7',
    width: '100%',
    height: 75,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomColor: '#81ecec',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    marginRight: 30,
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  headerLogo: {
    width: 50,
    height: 50,
  },
  optionsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    width: 100,
    height: 37,
    backgroundColor: '#6c5ce7',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#81ecec',
    borderWidth: 1,
  },
  optionButtonText: {
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  scroll: {
    backgroundColor: '#2d3436',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  portuguese: {
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  textInput: {
    textAlignVertical: 'top',
    marginTop: 10,
    backgroundColor: '#b2bec3',
    width: '90%',
    height: 200,
    padding: 10,
  },
});
