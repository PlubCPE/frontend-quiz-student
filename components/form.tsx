"use client";

import { API_URL } from "@/utils/api";
import { Input, Button, Card, Title, Stack } from "@mantine/core";
import React, {useState} from "react";
import axios from "axios";


// export default function Form() {
//   return (
//     <Card withBorder shadow="xs" p="xl" bg="cyan.2">
//       <Title order={1} color="blue">
//         Donate
//       </Title>

//       <form>
//         <Stack spacing={"xs"}>
//           <Input.Wrapper>
//             <Input.Label>First Name</Input.Label>
//             <Input />
//             <Input.Error>{/* Error goes here */}</Input.Error>
//           </Input.Wrapper>

//           <Input.Wrapper>
//             <Input.Label>Last Name</Input.Label>
//             <Input />
//             <Input.Error>{/* Error goes here */}</Input.Error>
//           </Input.Wrapper>

//           <Input.Wrapper>
//             <Input.Label>Email</Input.Label>
//             <Input />
//             <Input.Error>{/* Error goes here */}</Input.Error>
//           </Input.Wrapper>

//           <Input.Wrapper>
//             <Input.Label>Donation Amount</Input.Label>
//             <Input />
//             <Input.Error>{/* Error goes here */}</Input.Error>
//           </Input.Wrapper>
//           <Button>Submit</Button>
//         </Stack>
//       </form>
//     </Card>
//   );
// }

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    amount: Number,
  });

  const [errors, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    amount: Number,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request with JSON data
      await axios.post("https://donation-server-production.up.railway.app/donate", formData);

      // Handle success or redirection to a thank-you page
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Error submitting donation:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation function (you can customize this)
  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      amount: "",
    };

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.amount) {
      newErrors.amount = "Donation amount is required";
    } else if (formData.amount < 0) {
      newErrors.amount = "Invalid amount";
    }

    setErrors(newErrors);

    // Check if there are no errors
    return Object.values(newErrors).every((error) => !error);
  };


  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack spacing={"xs"}>
          <Input.Wrapper>
            <Input.Label>First Name</Input.Label>
            <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Last Name</Input.Label>
            <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Email</Input.Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Donation Amount</Input.Label>
            <Input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Card>
  );
}