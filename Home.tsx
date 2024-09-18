import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

// Define types for the data structure
interface Category {
  category_img: string;
  category_name: string;
}

interface PopularItem {
  item_img: string;
  name: string;
  price: number;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://foodbyte.pythonanywhere.com/home/');
      const data = response.data;
      setCategories(data.categories);
      setPopularItems(data.popularitems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
        <TouchableOpacity>
          <FontAwesome name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#000"
        />
      </View>

      {/* Food Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <Image
              source={{ uri: `https://foodbyte.pythonanywhere.com/${category.category_img}` }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>{category.category_name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Specials */}
      <View style={styles.specialsContainer}>
        <Text style={styles.specialsTitle}>Specials</Text>
        <View style={styles.specialsBox}>
          <Text style={styles.specialsTextBold}>flat</Text>
          <Text style={[styles.specialsTextBold, styles.specialsDiscount]}>50% OFF</Text>
          <Text style={styles.specialsText}>Combo Pack of the day</Text>
        </View>
      </View>

      {/* Popular Items */}
      <ScrollView style={styles.popularContainer}>
        <Text style={styles.popularTitle}>Popular</Text>
        <View style={styles.popularGrid}>
          {popularItems.map((item, index) => (
            <View key={index} style={styles.popularItem}>
              <Image
                source={{ uri: `https://foodbyte.pythonanywhere.com/${item.item_img}` }}
                style={styles.popularImage}
              />
              <Text style={styles.popularName}>{item.name}</Text>
              <View style={styles.popularFooter}>
                <Text style={styles.popularPrice}>₹ {item.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <FontAwesome name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B46C1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'red',
  },
  categoryName: {
    color: 'white',
    marginTop: 8,
    fontSize: 14,
  },
  specialsContainer: {
    backgroundColor: '#553C9A',
    padding: 16,
    marginBottom: 16,
  },
  specialsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  specialsBox: {
    backgroundColor: '#44337A',
    padding: 16,
    borderRadius: 8,
  },
  specialsTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  specialsDiscount: {
    fontSize: 24,
  },
  specialsText: {
    color: 'white',
  },
  popularContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  popularItem: {
    backgroundColor: '#E53E3E',
    width: '48%',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  popularImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  popularName: {
    color: 'white',
    fontWeight: 'bold',
  },
  popularFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  popularPrice: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#38A169',
    borderRadius: 4,
    padding: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#E2E8F0',
  },
});

export default Home;
