import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";

const sections = [
  {
    id: "sotuv",
    title: "Sotuv bo‘limi",
    className: "col4",
    headers: ["Qo‘ng‘iroq", "Zamer", "Sotuv", "Sotuv miqdori"],
    sheetIds: {
      day: "1J1nnEVdGaf_DbnaJgvWdFPCg4mYURo1y__SoD7hMj60",
      week: "14pZefxXLeJ_oO8vOhOb_sbr-ocPIT9huovfz_vFouEM",
      month: "1wiuZhMZ87OS-BKLNiS0SHdwbUKIgdAh44TuLhLJEmRk"
    }
  },
  {
    id: "marketing",
    title: "Marketing bo‘limi",
    className: "col3",
    headers: ["Lidlar Byujeti", "Lidlar soni", "Lidlar narxi"],
    sheetIds: {
      day: "16Axb0rtKKH9rJzZvIH8MuOrcZkpZdDiTXztP-sWVc9M",
      week: "1iGfvjdHK3Rk_Fja-qLwBidknHVUF2j0VqHZNNbcrBlI",
      month: "1543xpQLPfUMJCH3645cpPBnvz8Jn4eskdbxzlJaOn-w"
    }
  },
  {
    id: "ishlab",
    title: "Ishlab chiqarish",
    className: "col5",
    headers: ["Oddiy eshik", "Qiyin eshik", "Jami eshik", "Vaqtida topshirildi", "Vaqtida topshirildi %"],
    sheetIds: {
      day: "18epTxdZBwCnBTwxn6DYOCJ0fgCAbNQQYR7Qad9IMIx0",
      week: "17eJlNnmrxwNya3nAoPI21YCUiLFcmb3zRoc04WfjbFY",
      month: "1wXFBaxuaslaIxvWCMDT9pcjPCIAFimz4MT8refUlpxw"
    }
  },
  {
    id: "taminot",
    title: "Ta'minot bo‘limi",
    className: "col4",
    headers: ["Yetkazib berildi", "O‘rnatildi", "Mijoz rozi", "Rozi emas"],
    sheetIds: {
      day: "1LgWmKqLGby5DoZLgpiRmq2TNLlpnLHXDUFmtPHdwRUk",
      week: "1BY1HaSED6fiF3gSeTY_eInrtQ_NclBptE1bE5aakCgk",
      month: "1C2jtAbEFCDK_tDXEDJ9Zc9e07yWIdfhAyAltY0zVKao"
    }
  }
];

const Dashboard = () => {
  const [data, setData] = useState<{ [key: string]: string[][] }>({});
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month'>('day');

  const fetchData = async (timeframe: 'day' | 'week' | 'month') => {
    sections.forEach(async (section) => {
      const sheetId = section.sheetIds[timeframe];
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
      try {
        const response = await axios.get(url);
        const jsonText = response.data.substring(47, response.data.length - 2);
        const jsonData = JSON.parse(jsonText);
        const rows = jsonData.table.rows.map((row: any) => row.c.map((cell: any) => cell?.v ?? 0));
        setData((prev) => ({ ...prev, [section.id]: rows }));
      } catch (error) {
        console.error(`Error fetching data for sheet ${sheetId}:`, error);
      }
    });
  };

  useEffect(() => {
    fetchData(selectedTimeframe);
  }, [selectedTimeframe]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title" style={{ marginBottom: 0 }}>{selectedTimeframe === "day" && "Kunlik" || selectedTimeframe == "week" &&  "Haftalik" || selectedTimeframe == "month" && "Oylik"} hisobot</h1>
        <div className="dashbpradBtnBox">
          <button className={`dashBoardBtn ${selectedTimeframe == "day" && "dashBoardBtnActive"}`} onClick={() => setSelectedTimeframe('day')}>Kunlik</button>
          <button className={`dashBoardBtn ${selectedTimeframe == "week" && "dashBoardBtnActive"}`} onClick={() => setSelectedTimeframe('week')}>Haftalik</button>
          <button className={`dashBoardBtn ${selectedTimeframe == "month" && "dashBoardBtnActive"}`} onClick={() => setSelectedTimeframe('month')}>Oylik</button>
        </div>
      </div>
      <div className="box">
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
