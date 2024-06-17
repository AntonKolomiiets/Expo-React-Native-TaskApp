import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  Button,
  Modal,
  StyleSheet,
  Alert,
  TextInput,
  Animated,
  LayoutAnimation,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { useMutation } from "@tanstack/react-query";

const LoginModal = observer(() => {
  const { authStore } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isLogin]);

  const loginMutation = useMutation({
    mutationFn: () => authStore.login(username, password),
    onSuccess: () => console.log('Login succesfull'),
    onError: (error) => {
      Alert.alert('Login failed', 'Invalid credentials');
      console.error("Login failed:", error);
    }
  })

  const signupMutation = useMutation({
    mutationFn: () => authStore.signup(username, password),
    onSuccess: () => console.log('Signup successful'),
    onError: (error) => {
      if (error.message === 'User already exists') {
        Alert.alert('Signup failed', 'User already exists');
      } else {
        Alert.alert('Signup failed', 'An error occurred');
      }
      console.error("Signup failed:", error);
    }
  });

  const handleLogin = async (string: string) => {
    if (string === "login") {
      loginMutation.mutate();
    } else {
      if (password !== confirmPassword) {
        Alert.alert("Signup failed", "Passwords do not match");
        return;
      }
      signupMutation.mutate();
    }
  }

  const handleSubmit = (string: string) => {
    return string;
  };

  const viewLogin = (status: boolean) => {
    setIsLogin(status);
  };

  return (
    <Modal
      visible={!authStore.isAuthenticated}
      transparent
      animationType="slide"
    >
      {/* <View style={styles.container}> */}
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.box}>
            <Text style={styles.title}>
              {isLogin ? "Please log in: " : "Please sign up!"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="type password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="confirm password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            )}
            {/* <Button
              title={isLogin ? "Login" : "Sign Up"}
              onPress={() => handleLogin(isLogin ? "login" : "signup")}
            /> */}
            <Pressable
              onPress={() => handleLogin(isLogin ? "login" : "signup")}
              style={({ pressed }) => [
                {
                  transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
                },
                styles.confirm,
              ]}
            >
              <Text>Confirm</Text>
            </Pressable>

            <View style={styles.authButtons}>
              <Pressable
                onPress={() => viewLogin(true)}
                style={() => [
                  {
                    backgroundColor: isLogin ? "#FFF" : "#DDD"
                  },
                  styles.authButtonLeft,
                ]}
              >
                <Text>Login</Text>
              </Pressable>
              <Pressable
                onPress={() => viewLogin(false)}
                style={() => [
                  {
                    backgroundColor: isLogin ? "#DDD" : "#FFF"
                  },
                  styles.authButtonRight,
                ]}
              >
                <Text>Sign Up</Text>
              </Pressable>

              {/* <TextInput
            placeholder="Username"
            
            onChangeText={setUsername}
          /> */}
              {/* <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          /> */}
            </View>
            {/* <Button title="Login" onPress={handleLogin} /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* </View> */}
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#000",
  },
  box: {
    backgroundColor: "#fff",
    width: 300,
    borderWidth: 0,
    borderRadius: 10,
    // padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    margin: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 40,
    marginHorizontal: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingLeft: 10,
  },
  confirm: {
    alignSelf: "center",
    width: 100,
    alignItems: "center",
    padding: 10,
    marginBottom: 30,
    borderRadius: 6,
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: "#fcba03",
  },
  authButtons: {
    flexDirection: "row",
    margin: 0,
  },
  authButtonLeft: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderBottomLeftRadius: 10,
  },
  authButtonRight: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderEndEndRadius: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default LoginModal;
