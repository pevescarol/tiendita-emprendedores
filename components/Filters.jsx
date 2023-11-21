'use client'

import {useState} from 'react'

const Filters = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };


  return (
    <section className='flex w-full items-center justify-evenly text-sm font-bold'>
      <div className='flex gap-4'>
        <label htmlFor="category">Categoria</label>
        <select id="category" onChange={handleCategoryChange} value={filters.category}>
          <option value="all">Todas</option>
          <option value="tortas">Tortas</option>
          <option value="budines">Budines</option>
          <option value="desayunos">Desayunos</option>
        </select>
      </div>
    </section>
  )
}

export default Filters