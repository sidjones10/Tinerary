import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("your_table_name").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setData(data);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Itinerary Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="mt-2 p-2 border border-gray-300 rounded">
            {JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
