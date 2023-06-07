import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const Home = () => {
  const [albumList, setAlbumList] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 3;

  const handleFilteredList = (originalData, initialTrigger) => {
    console.log(skip);
    const newData = originalData.slice(skip, skip + limit);
    setFilteredList((prevList) => {
      if (initialTrigger) {
        return newData;
      } else {
        return [...prevList, ...newData];
      }
    });
    if (newData.length > 0) {
      setSkip((prevData) => prevData + limit);
    } else {
      setDisableLoadMore(true);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://itunes.apple.com/in/rss/topalbums/limit=25/json"
      );
      setAlbumList(response.data.feed.entry);
      handleFilteredList(response.data.feed.entry, true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
    setIsLoading(false);
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading && <Text>Loading....</Text>}
      {filteredList?.map((data, idx) => {
        return (
          <View style={styles.container} key={idx}>
            <Image
              source={{ uri: data["im:image"][0]?.label }}
              style={{ height: 60, width: 60 }}
            />
            <Text>{data["im:name"].label}</Text>
          </View>
        );
      })}
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!disableLoadMore && (
          <Pressable
            style={styles.loginBtn}
            onPress={() => handleFilteredList(albumList, false)}
          >
            <Text style={{ color: "#fff" }}>Load More</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#000",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default Home;
