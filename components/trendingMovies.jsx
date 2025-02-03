import { Platform, View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMovies, image500, fallbackMoviePoster } from '../api/apiCalls';

let { width, height } = Dimensions.get('window');

export default function TrendingMovies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(`Platform: ${Platform.OS}`);
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    setLoading(true);
    const response = await fetchTrendingMovies();
    console.log("Fetched trending movies:", response);
    if (response) {
      setData(response);
    } else {
      alert('No trending movies found');
    }
    setLoading(false);
  };

  const handleClick = (item) => {
    navigation.navigate('MovieDetails', { selectedMovie: item });
};


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
      <Text style={styles.title}>Today's #25 Trending Films</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
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
