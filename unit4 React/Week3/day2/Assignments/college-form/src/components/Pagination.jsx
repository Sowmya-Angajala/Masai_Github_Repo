import React from 'react'

export default function Pagination({ page, setPage, pageSize, total }){
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  return (
    <div style={{display:'flex',gap:8,alignItems:'center',marginTop:12}}>
      <button onClick={()=> setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={()=> setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
    </div>
  )
}