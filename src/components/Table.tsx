const Table = ({ data, classNameProp }: { data: string[][], classNameProp: string }) => {
    if (data.length === 0) return null;

    const headers = data[0];
    const rows = data.slice(1);

    return (
        <div className={`tableContent ${classNameProp}`}>
            {headers.map((header, columnIndex) => (
                <div key={columnIndex} className="tableColumn">
                    <div className="tableCol">{header}</div>
                    {rows.map((row, rowIndex) => {
                        const value = row[columnIndex];
                        const formattedValue = !isNaN(Number(value)) ? Math.round(Number(value)) : value; 

                        return (
                            <div key={rowIndex} className="tableCol">
                                {formattedValue ?? "-"}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Table;
