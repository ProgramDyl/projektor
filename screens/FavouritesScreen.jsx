import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { image500, fallbackMoviePoster } from '../api/apiCalls';

// Get device width
let { width } = Dimensions.get('window');

export default function FavouritesScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // Ensure favourites is an array, even if route.params is undefined
  const favourites = route.params?.favourites || [];

  // Filter out invalid items (e.g., items without an id)
  const validFavourites = favourites.filter(item => item?.id);

  // Log the data for debugging
  console.log('Favourites:', favourites);
  console.log('Valid Favourites:', validFavourites);

  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.movieCard} onPress={() => handleClick(item)}>
      <Image
        source={item.poster_path ? { uri: image500(item.poster_path) } : fallbackMoviePoster}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites</Text>
      {validFavourites.length > 0 ? (
        <FlatList
          data={validFavourites}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
      ) : (
        <Text style={styles.nofavourites}>No favourites added yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1f2937',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  nofavourites: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  grid: {
    alignItems: 'center',
  },
  movieCard: {
    margin: 8,
    alignItems: 'center',
    width: width * 0.4,
  },
  movieImage: {
    width: width * 0.4,
    height: (width * 0.4) * 1.5,
    borderRadius: 12,
  },
  movieTitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});