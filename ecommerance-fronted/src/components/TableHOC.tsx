import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { useTable,Column, TableOptions, useSortBy, usePagination } from "react-table"

function TableHOC <T extends Object>(columns: Column<T>[], data:T[] , heading:string, containerClassname:string,showPagination:boolean=false){
    return function() {
        const option: TableOptions <T>={
            columns , data,
            initialState:{
                pageSize:5
            }
        }
        const {pageCount,state:{pageIndex},canNextPage,canPreviousPage,nextPage,previousPage, headerGroups,getTableProps,getTableBodyProps,page,prepareRow} = useTable(option,useSortBy,usePagination);
        return (
            <div className={containerClassname}>
                <h2 className="heading"> {heading} </h2>
                <table className="table" {... getTableProps()}>
                    <thead >
                        {headerGroups.map((headerGroups)=>(
                            <tr {...headerGroups.getHeaderGroupProps()}>
                                {headerGroups.headers.map((column)=>(
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        {column.isSorted && <span> {column.isSortedDesc? <AiOutlineSortDescending/> : <AiOutlineSortAscending/>} </span>}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {... getTableBodyProps()}>
                    {page.map((row)=>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell)=>(
                                    <th {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </th>
                                ))}
                            </tr>
                        )
                    })}
                    </tbody> 
                </table>
                {showPagination && (
                    <div className="pagination">
                        
                        <button disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
                        <span style={{marginLeft:"0.5rem", marginRight:"0.5rem"}}>{`${pageIndex +1} of  ${pageCount}`}   </span>
                        <button disabled={!canNextPage} onClick={nextPage}>Next</button>
                    </div>
                )}
            </div>
        )
    }
}

export default TableHOC