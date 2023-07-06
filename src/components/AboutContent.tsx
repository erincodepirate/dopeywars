import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function AboutContent(props: any) {
    return (
    <View style={styles.container}>
      <Text style={styles.header}>DopeyWars</Text>
      <Text style={styles.author}>by Erin Clark</Text>
      <Image
        style={styles.raccoon}
        source={require("../../images/raccdealer.png")}
      />
      <View style={styles.creditsView}>
        <Text style={styles.credits}>Inspired by DopeWars for Palm</Text>
        <Text style={styles.credits}>by Matthew Lee and Michael Hallet</Text>
        <Text style={styles.credits}>As well as the original Drug Wars by John E. Dell</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32
  },
  raccoon: {
    height: 128,
    width: 128,
  },
  credits: {
    textAlign: 'center'
  },
  author: {
    paddingTop: 10,
    paddingBottom: 20
  },
  creditsView: {
    paddingTop: 20,
    paddingBottom: 20
  }
});        
