import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";

const Login = observer(() => {
  const { authStore } = useStore();
  const router = useRouter();

  if (!authStore) {
    console.error("authStore is undefined");
    return null;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("cartone");

  // const loginMutation = useMutation(
  //   async () => {
  //     await authStore.login(username, password)
  //   }
  // )


  const handleLogin = async () => {
    await authStore.login(username, password);
    if (authStore.token) {
      router.push('/tasksRender');
    } else {
      Alert.alert('Login failed', 'Invalid credentials');
    }
  };

 
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
          width: 200,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
          width: 200,
        }}
      />
      <Button title="Login" onPress={handleLogin} />
      {data && <Text>{data}</Text>}
      {/* {authStore.token && <Text>Logged in as {authStore.userId}</Text>} */}
    </View>
  );
});

export default Login;
