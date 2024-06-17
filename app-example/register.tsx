import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

const Register = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"/"} asChild>
        <Pressable>
          <Text>Go To Index</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Register;
