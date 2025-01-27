import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
    // Init state to hold list of favourite movies
    const [favMovies, setFavMovies] = useState([{id: '1', text: 'Twin Peaks'}]);

    // Add a favourite movie to the list
    const addFavMovie = (newFavMovie) => {
        setFavMovies([...favMovies, {id: Date.now().toString(), text: newFavMovie}]);
    };

    // Remove a movie from favourites list
    const deleteMovie = (id) => {
        setFavMovies(favMovies.filter(movie => movie.id !== id));
    };

    return (
        <SafeAreaProvider>
          {/* Citation: https://reactnative.dev/docs/flatlist */}
            <SafeAreaView style={styles.container} edges={['top']}>
                <FlatList
                    data={favMovies}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.item}>{item.text}</Text>
                            <View style={styles.iconContainer}>
                                {/* Add icons for edit/delete if needed */}
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={
                        <>
                            <Image source={require('../assets/projector.png')} style={styles.image}/>
                            <Text style={styles.header}>Projektor</Text> 

                            {/* Film of the Day section */}
                            <View style={styles.filmOfTheDayContainer}>
                                <Text style={styles.filmOfTheDayTitle}>Film of the Day</Text>
                                <Text style={styles.filmOfTheDayInfo}>Some movie information here</Text>
                            </View>
                        </>
                    }
                    ListFooterComponent={
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
                                <Text style={styles.buttonText}>Search for a film</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333', 
        paddingTop: StatusBar.currentHeight,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#00CED1', 
        marginBottom: 20,
        alignSelf: 'center',
    },
    filmOfTheDayContainer: {
        width: 500, 
        height: 500, 
        backgroundColor: '#444444', 
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    filmOfTheDayTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00CED1', 
        marginBottom: 10,
    },
    filmOfTheDayInfo: {
        fontSize: 16,
        color: '#FFFFFF', 
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#666666',
    },
    item: {
        fontSize: 18,
        color: '#FFFFFF', 
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60,
    },
    icon: {
        marginHorizontal: 5,
    },
    buttonContainer: {
        alignItems: 'center', 
        marginTop: 20,
    },
    button: {
        backgroundColor: '#0000FF', 
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 16,
    },
});
