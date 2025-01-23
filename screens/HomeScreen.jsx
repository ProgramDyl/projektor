import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native'


const HomeScreen = ({navigation}) => {
    
    //init state to hold list of favourite movies
    const [ favMovies, setFavMovies ] = useState([
        {id: '1', text: 'Twin Peaks'},
    ]);

    //add a favourite movie to the list
    const addFavMovie = (newFavMovie) => {
        setFavMovies([...favMovies, {id: Date.now().toString(), text: newFavMovie}]);
    }

    //remove a movie from favourites list
    const deleteMovie = (id) => {
        setFavMovies(favMovies.filter(movie => movie.id !== id));
    }




    return (

        
            <View style={styles.container}>   
                        
                <Image source={require('../assets/projector.png')} style={styles.image}/>
                <Text style={styles.header}>Projektor</Text> 

                <FlatList
                    data= { favMovies }
                    renderItem={({item}) => {
                        <View style={styles.itemContainer}>

                        </View>
                    }}
                    keyExtractor={item => item.id }
                />
                    
                
                
                {/* navigation buttons */}
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Text style={styles.buttonText}>Search for a film</Text>
                    </TouchableOpacity>
                </View>
                
            </View>

    );

};

export default HomeScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
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
      marginBottom: 20,
      alignSelf: 'center',
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#ccc',
    },
    item: {
      fontSize: 18,
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 60,
    },
    icon: {
      marginHorizontal: 5,
    },
    button: {
      backgroundColor: '#000080',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });