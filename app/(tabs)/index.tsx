// app/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching characters: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: { id: number; name: string; species: string; image: string } }) => (
    <TouchableOpacity style={styles.item}>
      <Link href={`/${item.id}`} asChild>
        <View style={styles.itemContent}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.species}</Text>
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default CharactersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
