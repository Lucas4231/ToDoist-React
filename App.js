import React, { useState } from 'react';
import { View, 
         Text, 
         TextInput, 
         FlatList, 
         TouchableOpacity, 
         StyleSheet } from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); 

  const adicionarItem = () => {
    if (item.trim() !== '') {
      setItems([...items, item]);
      setItem('');
    }
  };

  const removerPrimeiroItem = () => {
    if (items.length > 0) {
      setItems(items.slice(1));
    }
  };

  const removerUltimoItem = () => {
    if (items.length > 0) {
      setItems(items.slice(0, -1));
    }
  };

  const toggleSelection = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const removerItensSelecionados = () => {
    setItems(items.filter((_, index) => !selectedItems.includes(index)));
    setSelectedItems([]); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite um item"
        value={item}
        onChangeText={setItem}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={adicionarItem}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={removerPrimeiroItem}>
          <Text style={styles.buttonText}>Remover Primeiro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={removerUltimoItem}>
          <Text style={styles.buttonText}>Remover Último</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={removerItensSelecionados}>
          <Text style={styles.buttonText}>Remover Itens</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => toggleSelection(index)}
            style={[styles.listItem, selectedItems.includes(index) && styles.selected]}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginVertical: 10,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff', 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  selected: {
    backgroundColor: '#007bff',
  },
});
