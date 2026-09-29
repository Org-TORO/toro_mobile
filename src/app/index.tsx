import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff, LockKeyhole, RefreshCw, UserRound } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginSuccessSection from "./_components/login-success-section";
import { useLogin } from "../feature/authentication/login/login.hook";

const backgroundImage = require("../../assets/LOGIN_SCREEN_BACKGROUND.png");
const logoImage = require("../../assets/TORO_LOGO.png");

export default function LoginScreen() {
  const {
    email,
    password,
    showPassword,
    isSubmitting,
    loginSucceeded,
    fieldErrors,
    errorMessage,
    updateField,
    togglePasswordVisibility,
    submitLogin,
  } = useLogin();

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", android: undefined })}
          style={styles.keyboardView}
        >
          {loginSucceeded ? (
            <LoginSuccessSection />
          ) : (
            <View style={styles.card}>
              <View style={styles.brand}>
                <Image source={logoImage} resizeMode="contain" style={styles.brandLogo} />
              </View>

              <Text style={styles.title}>CHÀO MỪNG ĐÃ ĐẾN VỚI{"\n"}TORO</Text>

              <View style={styles.form}>
                <View style={styles.inputWrap}>
                  <UserRound color="#2E73FF" size={21} strokeWidth={2.4} style={styles.inputIcon} />
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isSubmitting}
                    keyboardType="email-address"
                    onChangeText={(value) => updateField("email", value)}
                    placeholder="Tên đăng nhập hoặc email"
                    placeholderTextColor="#8A93A3"
                    style={styles.input}
                    textContentType="username"
                    value={email}
                  />
                </View>
                {fieldErrors.email ? <Text style={styles.errorText}>{fieldErrors.email}</Text> : null}

                <View style={styles.inputWrap}>
                  <LockKeyhole color="#2E73FF" size={21} strokeWidth={2.4} style={styles.inputIcon} />
                  <TextInput
                    editable={!isSubmitting}
                    onChangeText={(value) => updateField("password", value)}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#8A93A3"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    textContentType="password"
                    value={password}
                  />
                  <Pressable
                    accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    disabled={isSubmitting}
                    hitSlop={12}
                    onPress={togglePasswordVisibility}
                    style={styles.eyeButton}
                  >
                    {showPassword ? (
                      <EyeOff color="#2E73FF" size={22} strokeWidth={2.5} />
                    ) : (
                      <Eye color="#2E73FF" size={22} strokeWidth={2.5} />
                    )}
                  </Pressable>
                </View>
                {fieldErrors.password ? (
                  <Text style={styles.errorText}>{fieldErrors.password}</Text>
                ) : null}

                <Pressable style={styles.forgotButton}>
                  <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                </Pressable>

                {errorMessage ? <Text style={styles.formErrorText}>{errorMessage}</Text> : null}

                <Pressable
                  disabled={isSubmitting}
                  onPress={submitLogin}
                  style={({ pressed }) => [
                    styles.loginButton,
                    (pressed || isSubmitting) && styles.pressed,
                  ]}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={styles.loginText}>Đăng nhập</Text>
                  )}
                </Pressable>

                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>hoặc</Text>
                  <View style={styles.divider} />
                </View>

                <Pressable style={({ pressed }) => [styles.registerButton, pressed && styles.pressed]}>
                  <Text style={styles.registerText}>Đăng ký</Text>
                </Pressable>
              </View>

              <Pressable accessibilityLabel="Làm mới" style={styles.refreshButton}>
                <RefreshCw color="#1766DD" size={28} strokeWidth={2.6} />
              </Pressable>
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const colors = {
  blue: "#2F74D8",
  deepBlue: "#07509F",
  line: "#D6E7FB",
  textMuted: "#8A93A3",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#DCEFFD",
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 38,
  },
  card: {
    width: "100%",
    maxWidth: 342,
    minHeight: 756,
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.78)",
    paddingHorizontal: 32,
    shadowColor: "#82A7CE",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 14,
  },
  brand: {
    alignItems: "center",
  },
  brandLogo: {
    width: 142,
    height: 135,
  },
  title: {
    marginTop: 36,
    color: colors.deepBlue,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 24,
    textAlign: "center",
  },
  form: {
    width: "100%",
    marginTop: 30,
  },
  inputWrap: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#EEF4FA",
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: 19,
    paddingHorizontal: 17,
    shadowColor: "#98B7D9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 3,
  },
  inputIcon: {
    width: 24,
    marginRight: 2,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#253A56",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 0,
  },
  errorText: {
    color: "#C92A2A",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: -12,
  },
  eyeButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 28,
    marginTop: -4,
  },
  forgotText: {
    color: "#155BDE",
    fontSize: 15,
    fontWeight: "800",
  },
  formErrorText: {
    color: "#C92A2A",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 14,
    marginTop: -10,
    textAlign: "center",
  },
  loginButton: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: colors.blue,
    shadowColor: "#1F5EBB",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.26,
    shadowRadius: 18,
    elevation: 7,
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
  loginText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 31,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line,
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#125BDC",
    fontSize: 16,
    fontWeight: "800",
  },
  registerButton: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#98C8FF",
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: "rgba(255, 255, 255, 0.42)",
  },
  registerText: {
    color: "#113EB1",
    fontSize: 16,
    fontWeight: "800",
  },
  refreshButton: {
    width: 57,
    height: 57,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 29,
    backgroundColor: colors.white,
    marginTop: 32,
    shadowColor: "#7DA5CA",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 6,
  },
});
