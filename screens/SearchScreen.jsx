import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, Image, Button, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
    const [title, setTitle] = useState('');
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const navigation = useNavigation();

    // Fetch favourites from async storage
    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const storedFavourites = await AsyncStorage.getItem('favourites');
                if (storedFavourites) {
                    setFavourites(JSON.parse(storedFavourites));
                }
            } catch (error) {
                console.error('Error fetching favourites', error);
            }
        };
        fetchFavourites();
    }, []);

    // Add or remove movie from favourites
    const handleFavouritePress = async (movie) => {
        try {
            const isFav = favourites.some(fav => fav.imdbID === movie.imdbID);
            let updatedFavourites;
            if (isFav) {
                updatedFavourites = favourites.filter(fav => fav.imdbID !== movie.imdbID);
            } else {
                updatedFavourites = [movie, ...favourites];
            }
            setFavourites(updatedFavourites);
            await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        } catch (error) {
            console.error('Error updating favourites', error);
        }
    };

    // Fetch suggestions when title length > 2
    useEffect(() => {
        if (title.length > 2) {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [title]);

    // Debounced suggestion fetch
    const fetchSuggestions = debounce(() => {
        const url = `http://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=302daf8f`;
        axios.get(url)
            .then(response => {
                if (response.data.Response === 'True') {
                    setSuggestions(response.data.Search);
                } else {
                    setSuggestions([]);
                }
            })
            .catch(error => console.error('Error fetching suggestions', error));
    }, 300);

    // Search for a movie
    const movieSearch = () => {
        setLoading(true);
        const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=302daf8f`;
        axios.get(url)
            .then(response => {
                const data = response.data;
                setLoading(false);
                if (data.Response === 'True') {
                    setMovie(data);
                    setHistory([data, ...history]);
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

    // Render items in the FlatList
    const renderItem = ({ item }) => {
        if (item.type === 'searchBar') {
            return (
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Search for a movie'
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Button title="Search" onPress={movieSearch} />
                </View>
            );
        } else if (item.type === 'suggestion') {
            return (
                <TouchableOpacity onPress={() => { setTitle(item.data.Title); setSuggestions([]); }}>
                    <Text style={styles.suggestionItem}>{item.data.Title}</Text>
                </TouchableOpacity>
            );
        } else if (item.type === 'movie') {
            return (
                <View style={styles.movieContainer}>
                    <Image
                        source={{ uri: item.data.Poster }}
                        style={styles.poster}
                    />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>{item.data.Title} ({item.data.Year})</Text>
                        <TouchableOpacity onPress={() => handleFavouritePress(item.data)} style={styles.starIconContainer}>
                            <Text style={styles.starIcon}>{favourites.some(fav => fav.imdbID === item.data.imdbID) ? '★' : '☆'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.plot}>{item.data.Plot}</Text>
                        <Text style={styles.details}>Genre: {item.data.Genre}</Text>
                        <Text style={styles.details}>Director: {item.data.Director}</Text>
                        <Text style={styles.details}>Cast: {item.data.Actors}</Text>
                        <Text style={styles.details}>Runtime: {item.data.Runtime}</Text>
                        <Text style={styles.details}>Rating: {item.data.imdbRating}</Text>
                    </View>
                </View>
            );
        } else if (item.type === 'history') {
            return (
                <TouchableOpacity onPress={() => setMovie(item.data)}>
                    <Text style={styles.historyItem}>{item.data.Title} ({item.data.Year})</Text>
                </TouchableOpacity>
            );
        }
    };

    // Combine all data into a single array for FlatList
    const data = [
        { type: 'searchBar' },
        ...(suggestions.length > 0 ? suggestions.map(suggestion => ({ type: 'suggestion', data: suggestion })) : []),
        ...(movie ? [{ type: 'movie', data: movie }] : []),
        ...(history.map(historyItem => ({ type: 'history', data: historyItem }))),
    ];

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.scrollContainer}
            />
            <Button title="View Favourites" onPress={() => navigation.navigate('Favourites', { favourites })} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#12343b',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        flex: 1,
        backgroundColor: 'white',
        color: 'black',
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
    },
    movieContainer: {
        flexDirection: 'column',
        marginTop: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    poster: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width,
        resizeMode: 'contain',
    },
    detailsContainer: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#2d545e',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
        color: '#fff',
    },
    plot: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
        width: '100%',
        color: '#fff',
    },
    details: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
        width: '100%',
        color: '#fff',
    },
    historyItem: {
        fontSize: 18,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        color: '#fff',
    },
    starIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    starIcon: {
        fontSize: 24,
        color: '#ffd700',
    },
});

export default SearchScreen;