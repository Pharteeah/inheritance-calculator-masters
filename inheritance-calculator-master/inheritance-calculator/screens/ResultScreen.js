import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ImageBackground, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;


const ResultScreen = ({ route, navigation }) => {
  const CoupleAlert = () => {
    Alert.alert(
        'The maximun number of wive is 4',
        'In put correct details !',
        [
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed')
            }
        ],
        { cancelable: false }
    );
};
  const {  gender,
    propertyValue,
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
    paternalCousin } = route.params;
  const [result, setResult] = useState({});
  // const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (propertyValue) {
      calculateShares();
    }
  }, []);

  const calculateShares = () => {
    try {

    let shares= {
     
    } 
    let remainingWealth = parseFloat(propertyValue);

    // Spouse shares
    if (gender === "male"){
 // wive
 if (wive > 0 &&  (!daughters || daughters === 0) && (!sons || sons === 0 )) {
  shares.wive =remainingWealth * 1 / 4;
  } 
  
  else if (wive > 0 && (daughters > 0 || sons > 0)) {
  shares.wive =remainingWealth * 1 / 8;
  }
  if (sons === "yes") {
    shares.sons =remainingWealth * 1 / 6;
    }
    }else{
         
  // Husband
    if (husband == "yes" && (!daughters || daughters === 0) && (!sons || sons === 0 )) {
      shares.husband =remainingWealth * 1 / 2;
      } else if (husband === 'yes' &&  (daughters > 0 || sons > 0)) {
      shares.husband =remainingWealth * 1 / 4;
      }
      
    }
 

   

    // Father
    if (father === "yes" &&(!daughters || daughters === 0) && (!sons || sons === 0 )) {
    shares.father =remainingWealth * 0; // Residuary
    } else if (father === "yes" &&(daughters > 0 || sons > 0)) {
    shares.father =remainingWealth * 1 / 6;
    }

   

    // Mother
    if (mother === 'yes' && (!daughters || daughters === 0) && (!sons || sons === 0 )) {
    shares.mother =remainingWealth * 1 / 3;
    } else if (mother === "yes" && (daughters > 0 || sons > 0) ) {
    shares.mother =remainingWealth * 1 / 6;
    }

   

    // Daughter
    if (daughters === 1) {
    shares.daughter =remainingWealth * 1 / 2;
    } else if (daughters > 1) {
    shares.daughter =remainingWealth * 2 / 3;
    }
 // Son's Daughter
 
   
 // Consanguine Sister
 
    if (fullsisters === 1&& sons == 0 && (!trueGrandfather || trueGrandfather =="no") && (!father || father === no)&& daughters == 0) {
    shares.fullSisters =remainingWealth * 1 / 2;
    } else if (paternalHalf> 1&& sons == 0 && (!trueGrandfather || trueGrandfather =="no") && (!father || father === no)&& daughters == 0) {
    shares.fullSisters =remainingWealth * 2 / 3;
    }

      // Full Sister
    if (paternalHalf === 1 && sons == 0 && (!trueGrandfather || trueGrandfather =="no") && (!father || father === no)&& daughters == 0) {
    shares.paternalHalf =remainingWealth * 1 / 2;
    } else if (paternalHalf > 1&& sons == 0 && (!trueGrandfather || trueGrandfather =="no") && (!father || father === no)&& daughters == 0) {
    shares.paternalHalf =remainingWealth * 2 / 3;
    }

    // Uterine Brother
    if (uterineBrother > 0 && sons == 0 && (!trueGrandfather || trueGrandfather =="no") && (!father || father === no)&& daughters == 0) {
    shares.uterineBrother =remainingWealth * 1 / 6;
    }

    // maternalHalf
    if (maternalHalf > 0) {
    shares.maternalHalf =remainingWealth * 1 / 6;
    }

    // // Sibling shares
    // const numberOfFullBrothers = fullbrothers;
    // const numberOfFullSisters = fullsisters;

    // if (numberOfFullBrothers + numberOfFullSisters > 0) {
    //   const totalShares = (2 * numberOfFullBrothers) + numberOfFullSisters;
    //   const sharePerUnit = remainingWealth / totalShares;

    //   shares.fullbrothers = sharePerUnit * 2 * numberOfFullBrothers;
    //   shares.fullsisters = sharePerUnit * numberOfFullSisters;
    //   remainingWealth -= shares.fullbrothers + shares.fullsisters;
    //   console.log(remainingWealth)
    // }

    // Convert to two decimal points
    // for (let key in shares) {
    //   shares[key] = parseFloat(shares[key].toFixed(2));
    // }
    return shares;
  }catch (error) {
    console.error(error);
    return {};
  }
};

const shares = calculateShares();

const chartData = Object.entries(shares).map(([key, value]) => ({
  name: key.charAt(0).toUpperCase() + key.slice(1),
  population: value,
  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
  legendFontColor: '#7F7F7F',
  legendFontSize: 8,
}));

return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Inheritance Distribution</Text>
    <Text style={styles.result}>
      Property Value: {propertyValue.toLocaleString()}
    </Text>
    {Object.entries(shares).map(([key, value]) => (
      <Text style={styles.result} key={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}: {value.toLocaleString()}
      </Text>
    ))}
    <PieChart
      data={chartData}
      width={screenWidth}
      height={220}
      chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
    />
    <Button
      title="Go Back"
      onPress={() => navigation.goBack()}
      color='#6200EE'
    />
  </ScrollView>
);
};

const styles = StyleSheet.create({
container: {
  flexGrow: 1,
  padding: 20,
  backgroundColor: '#f0f8ff', // Light blue background color
  alignItems: 'center',
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 20,
},
result: {
  fontSize: 18,
  color: '#4a4a4a',
  marginBottom: 10,
  textAlign: 'left',
  width: '100%',
},
});

export default ResultScreen;