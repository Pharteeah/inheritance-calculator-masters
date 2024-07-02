import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalculateScreen = ({ navigation }) => {
  const [gender, setGender] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [wive, setWive] = useState(0);
  const [husband, setHusband] = useState('');
  const [sons, setSons] = useState(0);
  const [daughters, setDaughters] = useState(0);
  const [fullbrothers, setFullBrothers] = useState(0);
  const [fullsisters, setFullSisters] = useState(0);
  const [maternalSiblings, setMaternalSiblings] = useState(0);
  const [paternalGrandfather, setPaternalGrandfather] = useState('');
  const [maternalGrandmother, setMaternalGrandmother] = useState('');
  const [paternalGrandmother, setPaternalGrandmother] = useState('');
  const [fullNephew, setFullNephew] = useState(0);
  const [paternalNephew, setPaternalNephew] = useState(0);
  const [fullUncle, setFullUncle] = useState(0);
  const [paternalUncle, setPaternalUncle] = useState(0);
  const [fullCousin, setFullCousin] = useState(0);
  const [paternalCousin, setPaternalCousin] = useState(0);
 


  const handleCalculate = () => {
    if (!gender) {
      Alert.alert("Input Error", "Please select the gender.");
      return;
    }
    if (!propertyValue) {
      Alert.alert("Input Error", "Please input property value.");
      return;
    }
    navigation.navigate('Result', {
      gender,
      propertyValue: parseFloat(propertyValue.replace(/,/g, '')),
      father,
      mother,
      wive,
      husband,
      sons,
      daughters,
      fullbrothers,
      fullsisters,
      maternalSiblings,
      paternalGrandfather,
      maternalGrandmother,
      paternalGrandmother,
      fullNephew,
      paternalNephew,
      fullUncle,
      paternalUncle,
      fullCousin,
      paternalCousin
    });
  };

  const formatNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePropertyValueChange = (value) => {
    const formattedValue = formatNumber(value.replace(/,/g, ''));
    setPropertyValue(formattedValue);
  };

  return (
    <ImageBackground source={require('../assets/backgrounds.jpg')} style={styles.background}>
   
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Gender of Deceased</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <Text style={styles.label}>Property Value</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={propertyValue}
        onChangeText={handlePropertyValueChange}
        placeholder="Enter property value"
      />

      <Text style={styles.label}>Is Father Alive?</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={father} onValueChange={(itemValue) => setFather(itemValue)} style={styles.picker}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

      <Text style={styles.label}>Is Mother Alive?</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={mother} onValueChange={(itemValue) => setMother(itemValue)} style={styles.picker}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

      {gender === 'male' ? (
        <>
          <Text style={styles.label}>Number of Wive(s)</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={wive} onValueChange={(itemValue) => setWive(itemValue)} style={styles.picker}>
              <Picker.Item label="Select" value="" />
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
            </Picker>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>Is Husband Alive?</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={husband} onValueChange={(itemValue) => setHusband(itemValue)} style={styles.picker}>
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Yes" value="yes" />
              <Picker.Item label="No" value="no" />
            </Picker>
          </View>
        </>
      )}

      <Text style={styles.label}>Number of Sons</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={sons.toString()}
        onChangeText={(value) => setSons(Number(value))}
        placeholder="Enter number of sons"
      />

      <Text style={styles.label}>Number of Daughters</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={daughters.toString()}
        onChangeText={(value) => setDaughters(Number(value))}
        placeholder="Enter number of daughters"
      />

      <Text style={styles.label}>Number of Full Brothers</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={fullbrothers.toString()}
        onChangeText={(value) => setFullBrothers(Number(value))}
        placeholder="Enter number of brothers"
      />

       <Text style={styles.label}>Number of Full Sisters</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={fullsisters.toString()}
        onChangeText={(value) => setFullSisters(Number(value))}
        placeholder="Enter number of sisters"
      />

       <Text style={styles.label}>Number of Maternal Siblings</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={maternalSiblings.toString()}
              onChangeText={(value) => setMaternalSiblings (Number(value))}
              placeholder="Enter number of maternal siblings"
      />

<Text style={styles.label}>Is Paternal Grandfather Alive?</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={father} onValueChange={(itemValue) => setPaternalGrandfather(itemValue)} style={styles.picker}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

      <Text style={styles.label}>Is Maternal GrandmotherAlive?</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={father} onValueChange={(itemValue) => setMaternalGrandmother(itemValue)} style={styles.picker}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

      <Text style={styles.label}>Is Paternal Grandmother Alive?</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={father} onValueChange={(itemValue) => setPaternalGrandmother(itemValue)} style={styles.picker}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

     
      <Text style={styles.label}>Number of Full Nephew</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={fullNephew.toString()}
        onChangeText={(value) => setFullNephew(Number(value))}
        placeholder="Enter number of FullNephew 2above"
      />

      <Text style={styles.label}>Number of Paternal Nephew</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={paternalNephew.toString()}
        onChangeText={(value) => setPaternalNephew(Number(value))}
        placeholder="Enter number of Paternal 2above"
      />

<Text style={styles.label}>Number of Full Uncle</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={fullUncle.toString()}
        onChangeText={(value) => setFullUncle(Number(value))}
        placeholder="Enter number of Full uncle 2above"
      />

      <Text style={styles.label}>Number of Paternal Uncle</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={paternalUncle.toString()}
        onChangeText={(value) => setPaternalUncle(Number(value))}
        placeholder="Enter number of Paternal 2above"
      />

<Text style={styles.label}>Number of Full Cousin</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={fullCousin.toString()}
        onChangeText={(value) => setFullCousin(Number(value))}
        placeholder="Enter number of FullNephew 2above"
      />

      <Text style={styles.label}>Number of Paternal Cousin</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={paternalCousin.toString()}
        onChangeText={(value) => setPaternalCousin(Number(value))}
        placeholder="Enter number of Paternal 2above"
      />

      

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
   backgroundColor: '#dede',  // Added a light blue background color
  },
  
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalculateScreen;
