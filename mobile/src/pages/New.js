import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image  } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import api from '../services/api'

export default class New extends Component {

  static navigationOptions = {
    headerTitle: 'Nova Publicacao'
  }

  state = {
    author: '',
    place: '',
    description: '',
    hashtags: '',
    preview: null,
    image: null,

  }

  handleSelectImage = () => {
    ImagePicker.showImagePicker({
      title: 'Selecionar Imagem',
    }, upload => {
       if (upload.error) {
         console.log('error')
       }

       else if (upload.didCancel) {
         console.log()
       }

       else {
         const preview = {
           uri: `data:image/jpeg;base64,${upload.data}`
         }

         let prefix
         let ext

         if(upload.fileName) {
          [prefix, ext] = upload.fileName.split('.')
          ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext
         }

         else{
           prefix = new Date().getTime()
           ext = 'jpg'
         }

         const image = {
           uri: upload.uri,
           type: upload.type,
           name: `${prefix}.${ext}` 
         }

         this.setState({ preview, image })
       }

       

    })
  }

  handleSubmit = async () => {

    const data = new FormData()

    data.append('image', this.state.image)
    data.append('author', this.state.author)
    data.append('place', this.state.place)
    data.append('description', this.state.description)
    data.append('hashtags', this.state.hashtags)

    console.log(this.state)
    await api.post('posts', data)

    this.props.navigation.navigate('Feed')

  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
        onPress={this.handleSelectImage}
        style={styles.selectButton}
        >
          <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
        </TouchableOpacity>

        {this.state.preview && <Image style={styles.preview} source={this.state.preview} /> }

        <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Nome do Autor"
        placeholderTextColor="#999"
        value={this.state.author}
        onChangeText={author => this.setState({ author })}
        />


        <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Lugar"
        placeholderTextColor="#999"
        value={this.state.place}
        onChangeText={place => this.setState({ place })}
        />


        <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Descricao do Post"
        placeholderTextColor="#999"
        value={this.state.description}
        onChangeText={description => this.setState({ description })}
        />


        <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="hashtags"
        placeholderTextColor="#999"
        value={this.state.hashtags}
        onChangeText={hashtags => this.setState({ hashtags })}
        />

        <TouchableOpacity
        onPress={this.handleSubmit}
        style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center'

  },
  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4, 
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'

  }



})