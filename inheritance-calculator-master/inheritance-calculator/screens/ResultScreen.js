import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ImageBackground, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;


const ResultScreen = ({ route, navigation }) => {

  const { gender,
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
      trueGrandfather,
      trueGrandmother,
      paternalGrandmother,
      fullNephew,
      paternalHalf,
      fullUncle,
      maternalHalf,
      sonsDaughter,
      uterineBrother, } = route.params;
  const [result, setResult] = useState({});
  // const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (propertyValue) {
      calculateShares();
    }
  }, []);

  let propertyValues = parseFloat(propertyValue);
  const calculateShares = () => {

    let shares = {
      father:0,
      mother:0,
      wive:0,
      husband:0,
      sons:0,
      daughters:0,
      fullbrothers:0,
      fullsisters:0,
      maternalSiblings:0,
      trueGrandfather:0,
      trueGrandmother:0,
      paternalGrandmother:0,
      fullNephew:0,
      paternalHalf:0,
      fullUncle:0,
      maternalHalf:0,
      sonsDaughter:0,
      uterineBrother:0,

    }

    try {

      
     

      let remaining = parseFloat(propertyValue);;
      let totalFixedShares = 0;
      let wife_remaining=  shares.wive*1/3
     

      // Spouse shares
      if (gender === "male") {
        // wive
        if (wive > 0 && (!daughters || daughters === 0) && (!sons || sons === 0)) {
          shares.wive = propertyValues * 1 / 4;
        }

        else if (wive > 0 && (daughters > 0 || sons > 0)) {
          shares.wive = propertyValues * 1 / 8;
          totalFixedShares += shares.wive
        }

       // Mother
      if (mother == "yes" && father === "yes" && wive > 0) {
        shares.mother =wife_remaining;
       
      } else if ( mother === "yes" && (daughters > 0 || sons > 0 || fullbrothers > 1 || fullsisters > 1))
        {
          
   shares.mother = propertyValues * 1 / 6;
         
        }
      else  {     
           shares.mother = propertyValues * 1 / 3;
     
      }

      }
      else {

        // Husband
        if (husband == "yes" && (!daughters || daughters === 0) && (!sons || sons === 0)) {
          shares.husband = propertyValues * 1 / 2;
        } else if (husband === 'yes' && (daughters > 0 || sons > 0)) {
          shares.husband = propertyValues * 1 / 4;
          totalFixedShares += shares.husband
        }
        if (mother == "yes" && father === "yes" && husband == "yes") {
          shares.mother =wife_remaining;
         
        } else if ( mother === "yes" && (daughters > 0 || sons > 0 || fullbrothers > 1 || fullsisters > 1))
          {
            
     shares.mother = propertyValues * 1 / 6;
           
          }
        else  {     
             shares.mother = propertyValues * 1 / 3;
       
        }


      }

      if (sons >0) {
        shares.sons = propertyValues * 1 / 6;
        totalFixedShares += shares.sons
      }
      

      // True Grandmother
      if (trueGrandmother === 'yes' && mother === "no") {
        shares.trueGrandmother = propertyValues * 1 / 6;
        totalFixedShares += shares.trueGrandmother
      }

      // // Daughter
      // if (daughters === 1) {
      //   shares.daughters = propertyValues * 1 / 2;
      // } else if (daughters > 1) {
      //   shares.daughter = propertyValues * 2 / 3;
      //   totalFixedShares += shares.daughters
      // }

      // Son's Daughter

      // Son's Daughter
      if (sonsDaughter > 1 && daughters > 0 && sons == 0 && daughters < 2) {
        shares.sonsDaughter = propertyValues * 2 / 3;
      } else if (sonsDaughter == 1 && daughters > 0 && sons == 0 && daughters < 2) {
        shares.sonsDaughter = propertyValues * 1 / 2;
        totalFixedShares += shares.sonsDaughter
      }

      // Consanguine Sister

      if (fullsisters === 1 && sons == 0 && (!trueGrandfather || trueGrandfather == "no") && (!father || father === no) && daughters == 0) {
        shares.fullsisters = propertyValues * 1 / 2;
      } else if (paternalHalf > 1 && sons == 0 && (!trueGrandfather || trueGrandfather == "no") && (!father || father === no) && daughters == 0) {
        shares.fullsisters = propertyValues * 2 / 3;
        totalFixedShares += shares.fullsisters
      }


      // Full Sister
      if (paternalHalf === 1 && sons == 0 && (!trueGrandfather || trueGrandfather == "no") && (!father || father === no) && daughters == 0) {
        shares.paternalHalf = propertyValues * 1 / 2;
      } else if (paternalHalf > 1 && sons == 0 && (!trueGrandfather || trueGrandfather == "no") && (!father || father === no) && daughters == 0) {
        shares.paternalHalf = propertyValues * 2 / 3;
        totalFixedShares += shares.paternalHalf
      }


      // Uterine Brother
      if (uterineBrother > 0 && sons == 0 && (!trueGrandfather || trueGrandfather == "no") && (!father || father === no) && daughters == 0) {
        shares.uterineBrother = propertyValues * 1 / 6;
        totalFixedShares += shares.uterineBrother
      }

      // maternalHalf
      if (maternalHalf > 0) {
        shares.maternalHalf = propertyValues * 1 / 6;
        totalFixedShares += shares.maternalHalf
      }
      let remainingss = remaining - (shares.father + shares.mother + shares.wive + shares.husband + shares.sons + shares.daughters + shares.fullbrothers + shares.paternalHalf + shares.fullsisters + shares.trueGrandfather + shares.trueGrandmother + shares.sonsDaughter + shares.uterineBrother + shares.maternalHalf)
     
      // Sibling shares
      const numberOfFullBrothers = fullbrothers;
      const numberOfFullsisters = fullsisters;

      if (numberOfFullBrothers + numberOfFullsisters > 0) {
        const totalShares = (2 * numberOfFullBrothers) + numberOfFullsisters;
        const sharePerUnit = propertyValues / totalShares;

        shares.fullbrothers = sharePerUnit * 2 * numberOfFullBrothers;
        shares.fullsisters = sharePerUnit * numberOfFullsisters;

        console.log(propertyValues)
      }

      const sonss = sons;
      const  daughter =  daughters;

      if (sonss +  daughters > 0) {
        const totalShares = (2 * sonss) +  daughters;
        const sharePerUnit = remainingss / totalShares;

        shares.sons = sharePerUnit * 2 * sonss;
        shares. daughters = sharePerUnit *  daughters;

        console.log(propertyValues)
      }else if (sonss >0 || daughter==0)
        {
         shares.sons=remainingss; 
        }
      // Convert to two decimal points
      // for (let key in shares) {
      //   shares[key] = parseFloat(shares[key].toFixed(2));
      // }
    

 let remainin = parseFloat(remainingss);
      // Father
      if (father === "yes") {
        if ((daughters > 0 || sons > 0)) {

          shares.father = propertyValues * 1 / 6

        } else {

          shares.father = remainingss

        }  // Residuary
      }

      // True Grandfather
    if (trueGrandfather ==="yes" && father === 'no') {
      shares.trueGrandfather =propertyValues * 1 / 6;
      }else if (trueGrandfather ==="yes"&& father === "no" &&(!daughters || daughters === 0) && (!sons || sons === 0 )) {
      
       shares.trueGrandfather = remainingss;
      
  
       totalFixedShares += shares.trueGrandfather
     }  // Residuary
      console.log(shares.mother - shares.father + shares.trueGrandfather)
      return shares;
    } catch (error) {
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
