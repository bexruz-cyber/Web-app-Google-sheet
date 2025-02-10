const Table = ({ data, classNameProp }: { data: string[][], classNameProp: string }) => {
    if (data.length === 0) return null;

    // Sarlavhalarni olish
    const headers = data[0];
    // Ma'lumotlarni olish
    const rows = data.slice(1);

    return (
        <div className={`tableContent ${classNameProp}`}>
            {headers.map((header, columnIndex) => (
                <div key={columnIndex} className="tableColumn">
                    <div className="tableCol">{header}</div>
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} className="tableCol">
                            {row[columnIndex] ?? "-"}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Table;
