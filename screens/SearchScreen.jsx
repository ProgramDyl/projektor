import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, Image, Button, ActivityIndicator, ScrollView, Platform, Dimensions } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
    const [title, setTitle] = useState('');
    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);




    /*TODO: improve search functionality:
    * 
    *
    * https://stackoverflow.com/questions/63295054/how-to-execute-api-call-after-entering-3-characters-in-field
    * REMINDER: look at 'debounce' for better querying
    *
    * 
    * 
    * 
    */

    const movieSearch = () => {
        setLoading(true);
        const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=302daf8f`;

        // get the movie data
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
            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <>
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
                    </>
                }
                style={styles.historyList}
            />
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
        flexDirection: 'column', 
        marginTop: 16,
        alignItems: 'center', 
    },
    poster: {
        width: Dimensions.get('window').width * 0.8, 
        height: Dimensions.get('window').width * 1.2, 
        resizeMode: 'contain',
    },
    detailsContainer: {
        width: '100%',
        padding: 16,
        alignItems: 'center', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
    },
    // react-native/platform https://reactnative.dev/docs/platform
    plot: {
        fontSize: Platform.select({
            ios: 16,
            android: 16,
            web: 18,
        }),
        marginTop: 8,
        textAlign: 'center',
        width: '100%',
    },
    details: {
        fontSize: Platform.select({
            ios: 14,
            android: 14,
            web: 16,
        }),
        marginTop: 4,
        textAlign: 'center',
        width: '100%',
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
