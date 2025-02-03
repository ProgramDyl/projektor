import { View, Text, TouchableWithoutFeedback, Image, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMovies, image500, fallbackMoviePoster } from '../api/apiCalls';

// get device width and height
let { width, height } = Dimensions.get('window');

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
    if (response && response.results) {
      // set data to response results
      setData(response.results);
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

  return (
    <View style={styles.container}>
      {/* title */}
      <Text style={styles.title}>trending</Text>
      {loading ? (
        // show loading text while fetching data
        <Text style={styles.loadingText}>loading...</Text>
      ) : (
        // render carousel with trending movies
        <Carousel
          data={data}
          renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
          width={width * 0.62}
          loop={false}
          style={styles.carouselStyle}
        />
      )}
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  // get full poster url or fallback image
  const posterUrl = image500(item.poster_path) || fallbackMoviePoster;

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: posterUrl }}
        style={styles.movieImage}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
  },
  carouselStyle: {
    display: 'flex',
    alignItems: 'center',
  },
  movieImage: {
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 24,
  },
});
