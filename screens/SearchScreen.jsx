import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Button, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-web';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const SearchScreen = () => {
    const [title, setTitle] = useState('');
    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);



    /*TODO: improve search functionality:
    *
    * React Native
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    */

    const movieSearch = () => {
        setLoading(true);
        const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=302daf8f`;

        axios.get(url)
        .then(response => {
            const data = response.data;
            setLoading(false);
            if (data.Response === 'True') {
                setMovie(data);
                setHistory([data, ...history]); // Add the movie to the search history
            } else {
                setMovie(null);
                alert('Movie not found!');
            }
        })
        .catch(error => {
            setLoading(false);
            console.error('Error fetching movie', error);
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => setMovie(item)}>
            <Text style={styles.historyItem}>{item.Title} ({item.Year})</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* search box */}
                <View style={styles.searchContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder='Search for a movie'
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Button title="Search" onPress={movieSearch} />
                </View>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {movie && (
                    <View style={styles.movieContainer}>
                        <Image
                            source={{ uri: movie.Poster }}
                            style={styles.poster}
                        />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.title}>{movie.Title} ({movie.Year})</Text>
                            <Text style={styles.plot}>{movie.Plot}</Text>
                            <Text style={styles.details}>Genre: {movie.Genre}</Text>
                            <Text style={styles.details}>Director: {movie.Director}</Text>
                            <Text style={styles.details}>Cast: {movie.Actors}</Text>
                            <Text style={styles.details}>Runtime: {movie.Runtime}</Text>
                            <Text style={styles.details}>Rating: {movie.imdbRating}</Text>
                        </View>
                    </View>
                )}
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.historyList}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        flex: 1,
    },
    movieContainer: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'flex-start',
    },
    poster: {
        width: 370,
        height: 450,
        resizeMode: 'contain',
    },
    detailsContainer: {
        flex: 1,
        paddingLeft: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
    },
    plot: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'left',
    },
    details: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'left',
    },
    historyList: {
        marginTop: 16,
    },
    historyItem: {
        fontSize: 18,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default SearchScreen;
