import { View, Text, Platform, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import TrendingMovies from '../components/trendingMovies'
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Loading from "../components/Loading";

const ios = Platform.OS == "ios";
const HomeScreen = () => {
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        // Simulate API call to set loading state
        setTimeout(() => setLoading(false), 2000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <StatusBar style="light" />
                <View style={styles.header}>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
                    <Text style={styles.title}>
                        <Text style={styles.titleM}>P</Text>rojektor
                    </Text>
                    <Image source={require('../assets/projector.png')} style={styles.image} />
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {loading ? <Loading /> : (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                        <TrendingMovies />
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1f2937', // neutral-800
    },
    innerContainer: {
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    titleM: {
        color: '#e5e7eb', // text color if needed
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollView: {
        paddingBottom: 10,
    },
});

export default HomeScreen;
