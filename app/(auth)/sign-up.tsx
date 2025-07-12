import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submit = async () => {
    const { name, email, password } = form;
    setIsSubmitting(true);
    try {
      if (!form.name || !form.email || !form.password) {
        // Handle validation error
        Alert.alert(" Error", "All fields are required.");
        setIsSubmitting(false);
        return;
      }
      // Call AppWrite sign-un function here
      await createUser({
        name,
        email,
        password,
      });

      Alert.alert("Success", "You have signed in successfully.");
      router.replace("/");

      // Handle successful sign-in
    } catch (error) {
      // Handle sign-in error
      Alert.alert("Error", error as string);
      Sentry.captureException(error);
      console.error("Sign-in error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5">
      <CustomInput
        placeholder="Enter your Name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Name"
        keyboardType="default"
        secureTextEntry={false}
      />
      <CustomInput
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
        secureTextEntry={false}
      />

      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={submit} />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
