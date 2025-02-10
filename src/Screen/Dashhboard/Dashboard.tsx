import { useEffect, useState } from "react";
import GoBackBtn from "../../components/GoBackBtn";
import axios from "axios";
import Table from "../../components/Table";

const sections = [
  {
    id: "sotuv",
    title: "Sotuv bo‘limi",
    sheetId: "1J1nnEVdGaf_DbnaJgvWdFPCg4mYURo1y__SoD7hMj60",
    className: "col4",
    headers: ["Qo‘ng‘iroq", "Zamer", "Sotuv", "Sotuv miqdori"]
  },
  {
    id: "marketing",
    title: "Marketing bo‘limi",
    sheetId: "16Axb0rtKKH9rJzZvIH8MuOrcZkpZdDiTXztP-sWVc9M",
    className: "col3",
    headers: ["Lidlar Byujeti", "Lidlar soni", "Lidlar narxi"]
  },
  {
    id: "ishlab",
    title: "Ishlab chiqarish",
    sheetId: "18epTxdZBwCnBTwxn6DYOCJ0fgCAbNQQYR7Qad9IMIx0",
    className: "col5",
    headers: ["Oddiy eshik", "Qiyin eshik", "Jami eshik", "Vaqtida topshirildi", "Vaqtida topshirildi foizi"]
  },
  {
    id: "taminot",
    title: "Ta'minot bo‘limi",
    sheetId: "1LgWmKqLGby5DoZLgpiRmq2TNLlpnLHXDUFmtPHdwRUk",
    className: "col4",
    headers: ["Yetkazib berildi", "O‘rnatildi", "Mijoz rozi", "Rozi emas"]
  }
];

const Dashboard = () => {
  const [data, setData] = useState<{ [key: string]: string[][] }>({});

  const fetchData = async (sheetId: string, sectionId: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    try {
      const response = await axios.get(url);
      const jsonText = response.data.substring(47, response.data.length - 2);
      const jsonData = JSON.parse(jsonText);

      const rows = jsonData.table.rows.map((row: any) =>
        row.c.map((cell: any) => cell?.v ?? 0)
      );

      setData((prev) => ({ ...prev, [sectionId]: rows }));
    } catch (error) {
      console.error(`Error fetching data for sheet ${sheetId}:`, error);
    }
  };

  useEffect(() => {
    sections.forEach((section) => fetchData(section.sheetId, section.id));
  }, []);

  console.log(data);


  return (
    <div className="container">
      <div className="header">
        <GoBackBtn />
        <h1 className="title" style={{ marginBottom: 0 }}>Kunlik hisobot</h1>
      </div>
      <div className="box ">
        {sections.map((section) => (
          <div key={section.id}>
            <h2 className="title" style={{ marginBottom: 10, textAlign: "left" }}>{section.title}</h2>
            <div className="tableDataBox">
              <Table data={[section.headers, ...(data[section.id] || [])]} classNameProp={section.className} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default Dashboard;
