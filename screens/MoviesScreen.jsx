import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'


const MoviesScreen = () => {

    const [movies, setMovies] = useState();

    useEffect(() => {
        axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=302daf8f')
        .then((response) => {
            setPosts(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    },[]);


    return (
        <View style={styles.container}>
            
        </View>

    );

};
export default MoviesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
      item: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#f0e68c',
        borderRadius: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    image: {
        maxheight: 100,
        maxWidth: 200,
    },
})