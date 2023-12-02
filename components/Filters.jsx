'use client'

import {useState} from 'react'

const Filters = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };


  return (
    <section className='flex w-full items-center justify-center'>
      <div className='flex flex-col mx-auto items-center gap-6 w-[200px]'>
        <label htmlFor="category" className='text-lg font-semibold mb-3'>Elige la categoría</label>
        <select id="category" onChange={handleCategoryChange} value={filters.category} className='bg-[#e8f7eb] text-emerald-600 font-semibold p-3 rounded-xl w-full text-center text-lg border-none'>
          <option value="all">Todos</option>
          <option value="tortas">Tortas</option>
          <option value="budines">Budines</option>
          <option value="desayunos">Desayunos</option>
        </select>
      </div>
    </section>
  )
}

export default Filters