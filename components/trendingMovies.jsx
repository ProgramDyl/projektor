import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMovies, image500, fallbackMoviePoster } from '../api/apiCalls';

// get device width
let { width } = Dimensions.get('window');

export default function TrendingMovies() {
  // state for trending movies data
  const [data, setData] = useState([]);
  // state for loading status
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // fetch trending movies when component mounts
    getTrendingMovies();
  }, []);

  // function to fetch trending movies
  const getTrendingMovies = async () => {
    // set loading to true before fetching data
    setLoading(true);
    // fetch data from api
    const response = await fetchTrendingMovies();
    console.log("Fetched trending movies:", response); // log fetched data
    if (response) {
      // set data to response
      setData(response);
    } else {
      // show alert if no movies found
      alert('no trending movies found');
    }
    // set loading to false after fetching data
    setLoading(false);
  };

  // function to handle movie click
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  // render item for FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.movieCard} onPress={() => handleClick(item)}>
      <Image
        source={typeof item.poster_path === 'string' ? { uri: image500(item.poster_path) } : fallbackMoviePoster}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* title */}
      <Text style={styles.title}>trending movies</Text>
      {loading ? (
        // show loading text while fetching data
        <Text style={styles.loadingText}>loading...</Text>
      ) : (
        // render FlatList with grid layout
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
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
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 20,
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
