import { Text, View, Button, StyleSheet } from "react-native";
import useTheme from "@/theme/useTheme";
import { useColorScheme } from "react-native";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const colorScheme = useColorScheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={{ color: theme.colors.text, textTransform: "capitalize" }}>
        Current System Theme: {colorScheme}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
