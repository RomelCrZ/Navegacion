// app/[id].tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const CharacterDetail = () => {
  const { id } = useLocalSearchParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(data => {
        setCharacter(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching character: ', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.centered}>npx expo start

        <Text>Error: No se encontró el personaje.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.info}>Especie: {character.species}</Text>
      <Text style={styles.info}>Género: {character.gender}</Text>
      <Text style={styles.info}>Estado: {character.status}</Text>
      <Text style={styles.info}>Origen: {character.origin?.name}</Text>
      <Text style={styles.info}>Ubicación: {character.location?.name}</Text>
    </ScrollView>
  );
};

export default CharacterDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
  },
});
