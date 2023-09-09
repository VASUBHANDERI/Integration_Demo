import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { apiInstance, setAuthToken } from "../API/contactsAPI";

export default function Page() {
  const { token, setToken } = useState(null);
  const [data, setData] = useState({});
  const [err, setErr] = useState({});
  const register = () => {
    const postData = {
      username: "exampleUser",
      email: "user1@example.com",
      password: "123",
      // Add any other data you want to send
    };

    // Making a POST request using apiInstance
    apiInstance
      .post("/users/register", postData)
      .then((response) => {
        console.log("POST Response:", response.data);
        setData(response.data);

        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("POST Error:", error);
        setErr(error);
        // Handle errors here
      });
  };

  const login = () => {
    // Example data to send in the POST request
    const postData = {
      email: "user1@example.com",
      password: "123",
      // Add any other data you want to send
    };

    // Making a POST request using apiInstance
    apiInstance
      .post("/users/login", postData)
      .then((response) => {
        // setToken(response.accessToken);
        console.log(response.data);
        setData(response.data);
        setAuthToken(response.data.accessToken);

        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("POST Error:", error);
        setErr(error);

        // Handle errors here
      });
  };

  const current = () => {
    apiInstance
      .get("/users/current")
      .then((response) => {
        console.log("Authenticated Response:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        setErr(error);

        if (error.response) {
          console.error("Authenticated Error:", error.response.status);
          console.error("Error Data:", error.response.data);
        } else {
          console.error("Authenticated Error:", error.message);
        }
      });
  };

  const getAllContacts = () => {
    apiInstance
      .get("/api/contacts")
      .then((response) => {
        console.log("Authenticated Response:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        setErr(error);

        if (error.response) {
          console.error("Authenticated Error:", error.response.status);
          console.error("Error Data:", error.response.data);
        } else {
          console.error("Authenticated Error:", error.message);
        }
      });
  };

  const createContact = () => {
    const postData = {
      name: "exampleUser123",
      email: "example123@gm.com",
      phone: "123",
    };
    apiInstance
      .post("/api/contacts", postData)
      .then((response) => {
        console.log(response.data);
        setData(response.data);

        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("POST Error:", error);
        setErr(error);

        // Handle errors here
      });
  };
  const updateContact = (id) => {
    const postData = {
      name: "exampleUser",
      email: "example@gm.com",
      phone: "123456789",
    };

    const route = `/api/contacts/${id}`;

    apiInstance
      .put(`${route}`, postData)
      .then((response) => {
        console.log(response.data);
        setData(response.data);

        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("POST Error:", error);
        setErr(error);
        // Handle errors here
      });
  };
  const deleteContact = (id) => {
    const route = `/api/contacts/${id}`;

    apiInstance
      .delete(`${route}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);

        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("POST Error:", error);
        setErr(error);
        // Handle errors here
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <Button title="Login" onPress={login} />
        <Button title="Register" onPress={register} />
        <Button title="Current" onPress={current} />
        <Button title="Get All Contacts" onPress={getAllContacts} />
        <Button title="Create Contact" onPress={createContact} />
        <Button
          title="Update Contact"
          onPress={() => updateContact("64fc9aaeefd00244264eeffc")}
        />
        <Button
          title="Delete Contact"
          onPress={() => deleteContact("64fc87b5103a33cd66a07dd6")}
        />
      </View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    maxWidth: 960,
    alignSelf:"center"
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
