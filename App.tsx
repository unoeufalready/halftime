import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [yourAge, setYourAge] = useState("");
  const [theirAge, setTheirAge] = useState("");
  const [halfTime, setHalfTime] = useState(Infinity);

  function cleanAndSetAge(setter: (arg0: string) => void, text: string) {
    const sanitizedText: string = text.replace(/[^\d]/g, "");
    if (null != sanitizedText) {
      setter(sanitizedText);
    }
  }

  useEffect(
    function calculateHalfTime(): void {
      const i: number = parseInt(yourAge);
      const u: number = parseInt(theirAge);
      const h: number = !isNaN(i) && !isNaN(u) ? u - i : Infinity;
      setHalfTime(h);
    },
    [yourAge, theirAge]
  );

  function renderEncouragement() {
    let styleName: any = styles.standardMessage;
    let message: string = "OK";

    if (halfTime === Infinity) {
      message = "OK, ready to do some calculating!";
    } else if (halfTime < +yourAge) {
      styleName = styles.missed;
      message = "Aww... you missed it!";
    } else {
      const yearsToGo: number = halfTime - parseInt(yourAge);
      if (yearsToGo === 0) {
        message = "Your time is now!";
      } else {
        message = `You only have ${yearsToGo} year${
          1 === yearsToGo ? "" : "s"
        } to go!`;
      }
    }
    return <Text style={styleName}>{message}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        placeholder="Your age"
        onChangeText={text => cleanAndSetAge(setYourAge, text)}
        defaultValue={yourAge}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Their age"
        onChangeText={text => cleanAndSetAge(setTheirAge, text)}
        defaultValue={theirAge}
      />
      <Text style={styles.result}>{Infinity === halfTime ? "" : halfTime}</Text>
      {renderEncouragement()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputs: {
    borderWidth: 1,
    fontSize: 32,
    height: 110,
    marginBottom: 15,
    width: "90%",
    textAlign: "center"
  },
  result: {
    fontSize: 48
  },
  missed: {
    color: "#C86298"
  },
  standardMessage: {
    color: "#443FA3"
  }
});
