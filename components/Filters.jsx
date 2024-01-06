'use client'

import {useState} from 'react'

const Filters = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };


  return (
    <section className='flex w-full items-center my-6'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-6 w-full'>
        <label htmlFor="category" className='text-2xl text-main font-semibold mb-3'>Productos</label>
        <select id="category" onChange={handleCategoryChange} value={filters.category} className='bg-grayback text-main cursor-pointer font-semibold p-3 rounded-xl w-[200px] text-center text-lg border-none'>
          <option value="all">Todos</option>
          <option value="tortas">Tortas</option>
          <option value="especiales">Especiales</option>
          <option value="desayunos">Desayunos</option>
        </select>
      </div>
    </section>
  )
}

export default Filters