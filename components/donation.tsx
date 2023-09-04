import { API_URL } from "../utils/api";
import { type Donation } from "@/utils/types";
import { Paper, Text, Stack, Group, Title, Card, Space } from "@mantine/core";
import dayjs from "dayjs";
import axios from "axios";
import { useState,useEffect } from "react";



// export default function Donation() {
//   return (
//     <Card withBorder shadow="xs" bg="gray.3">
//       <Group mb={20}>
//         <Title order={1} color="gray">
//           Total
//         </Title>
//         <Title order={1} variant="gradient">
//           10000
//         </Title>
//         <Title order={1} color="gray">
//           THB
//         </Title>
//       </Group>
//       <Stack>
//         <Paper shadow="xs" p="md">
//           <Group>
//             <Text>Tom</Text>
//             <Text>Sawyer</Text>
//             <Text>tom_sawyer@gmail.com</Text>
//             <Text>10000</Text>
//             <Text>{dayjs("2023-08-26 06:17:51").format("D-MMM HH:mm:ss")}</Text>
//           </Group>
//         </Paper>
//         <Paper shadow="xs" p="md">
//           <Group>
//             <Text>Tom</Text>
//             <Text>Sawyer</Text>
//             <Text>tom_sawyer@gmail.com</Text>
//             <Text>10000</Text>
//             <Text>{dayjs("2023-08-26 06:17:51").format("D-MMM HH:mm:ss")}</Text>
//           </Group>
//         </Paper>
//         <Paper shadow="xs" p="md">
//           <Group>
//             <Text>Tom</Text>
//             <Text>Sawyer</Text>
//             <Text>tom_sawyer@gmail.com</Text>
//             <Text>10000</Text>
//             <Text>{dayjs("2023-08-26 06:17:51").format("D-MMM HH:mm:ss")}</Text>
//           </Group>
//         </Paper>
//       </Stack>
//     </Card>
//   );
// }



export default function Donation() {
  const [donationData, setDonationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://donation-server-production.up.railway.app/donation");

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        const intervalID = setInterval(fetchData, 5000);
        //return () => clearInterval(intervalID);
        setDonationData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const TotalDonationAmount = donationData.reduce((total,donation) => total + donation.amount,0)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Card withBorder shadow="xs" bg="gray.3">
      <Group mb={20}>         
      <Title order={1} color="gray">
          Total
        </Title>
         <Title order={1} variant="gradient">
           {TotalDonationAmount}
         </Title>
         <Title order={1} color="gray">
           THB
         </Title>
       </Group>
    <div>
      {donationData.length > 0 ? (
        donationData.map((donation, index) => (
          
          <Paper key={index} shadow="xs" p="md">
            <Group>
              <Text>{donation.firstName}</Text>
              <Text>{donation.lastName}</Text>
              <Text>{donation.email}</Text>
              <Text>{donation.amount}</Text>
              <Text>{dayjs(donation.timestamp).format("D-MMM HH:mm:ss")}</Text>
            </Group>
          </Paper>
          
        ))
      ) : (
        <p>No donation data available.</p>
      )}
    </div>
    
    </Card>
  );
}