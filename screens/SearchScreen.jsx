import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-web';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


const SearchScreen = () => {

    const [title, setTitle] = useState();
    const [movie, setMovie] = useState();
    

    

    const movieSearch = () => {
x   
        const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}apikey=302daf8f`;
    
        axios.get(url)
        .then(response => {
            const data = response.data;
            if (data.Response === 'True') {
                setMovie(data);
            } else {
                setMovie(null);
                alert('Movie not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching movie', error);
        });
    };
        
    return (
        <View>

        {/* search box */}
        <TextInput 
        style={styles.input}
            placeholder='Search for a movie'
            value={title}
            onChangeText={setTitle}
        />
        <Button title="search" onPress={movieSearch} />
        {movie && (
                <View style={styles.result}>
                    <Text style={styles.title}>{movie.Title} ({movie.Year})</Text>
                    <Text>{movie.Plot}</Text>
                    <Image
                        source={{ uri: movie.Poster }}
                        style={styles.poster}
                    />
                </View>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  export default SearchScreen