import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { image500, fallbackMoviePoster } from '../api/apiCalls';
import { LinearGradient } from 'expo-linear-gradient';


let { width } = Dimensions.get('window');

const MovieDetails = () => {
    const route = useRoute();
    const { selectedMovie } = route.params;

    return (
        <View style={styles.container}>
            
            <LinearGradient
                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                style={styles.gradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            >
                <Image
                    source={selectedMovie.poster_path ? { uri: image500(selectedMovie.poster_path) } : fallbackMoviePoster}
                    style={styles.poster}
                />
            </LinearGradient>

            <Text style={styles.title}>{selectedMovie.title}</Text>
            <Text>{selectedMovie.Tagline}</Text>
            <Text style={styles.releaseDate}>{new Date(selectedMovie.release_date).getFullYear()}</Text>

            
            <Text style={styles.overview}>{selectedMovie.overview}</Text>
            <Text style={styles.genres}>{selectedMovie.genres}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#1f2937',
    },
    poster: {
        width: 450,
        height: width * 1.4,
        borderRadius: 12,
        alignSelf: 'center',
        marginTop: 0,
    },
    title: {
        color: 'white',
        fontSize: 36,
        marginTop:2,
        marginBottom: 2,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'SimSun-ExtB',
    },
    releaseDate: {
        color: 'white',
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    overview: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    genres: {
        color: 'white',
        fontSize: 11,
        textAlign: 'center',
    },
});

export default MovieDetails;
