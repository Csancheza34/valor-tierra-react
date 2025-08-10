// src/components/SearchFilters.jsx
import React, { useState, useEffect } from 'react';
import { fetchBizTypes, fetchPropertyTypes, fetchZones, fetchNeighborhoods } from '../Api/domus.js';

const SearchFilters = ({ onSearch }) => {
  const initialState = {
    keyword: '', biz: '', type: '', zone: '', neighborhood_code: '',
    pcmin: '', pcmax: '', minarea: '', maxarea: '',
    bathrooms: '', stratum: '', parking: ''
  };
  const [filters, setFilters] = useState(initialState);

  const [bizTypes, setBizTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [zones, setZones] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const loadFilterOptions = async () => {
      setBizTypes(await fetchBizTypes());
      setPropertyTypes(await fetchPropertyTypes());
      setZones(await fetchZones());
      setNeighborhoods(await fetchNeighborhoods());
    };
    loadFilterOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
    onSearch(cleanFilters);
  };

  const handleClear = () => {
    setFilters(initialState);
    onSearch({});
  };

  return (
    <div className="search-filters-container">
      <form onSubmit={handleSearch}>
        <div className="search-form-grid">
          <input name="keyword" type="text" placeholder="Buscar por Código, Ciudad o Barrio..." value={filters.keyword} onChange={handleChange} className="search-input" />
          <select name="biz" value={filters.biz} onChange={handleChange} className="search-select">
            <option value="">Gestión</option>
            {bizTypes.map(b => <option key={b.code} value={b.code}>{b.name}</option>)}
          </select>
          <select name="type" value={filters.type} onChange={handleChange} className="search-select">
            <option value="">Tipo de Inmueble</option>
            {propertyTypes.map(t => <option key={t.code} value={t.code}>{t.name}</option>)}
          </select>
          <button type="submit" className="search-button">Buscar</button>
        </div>

        {showAdvanced && (
          <div className="advanced-filters-grid">
            <select name="zone" value={filters.zone} onChange={handleChange} className="search-select"><option value="">Zona</option>{zones.map(z => <option key={z.code} value={z.code}>{z.name}</option>)}</select>
            <select name="neighborhood_code" value={filters.neighborhood_code} onChange={handleChange} className="search-select"><option value="">Barrio</option>{neighborhoods.map(n => <option key={n.code} value={n.code}>{n.name}</option>)}</select>
            <input name="pcmin" type="number" placeholder="Precio Mínimo" value={filters.pcmin} onChange={handleChange} className="search-input" />
            <input name="pcmax" type="number" placeholder="Precio Máximo" value={filters.pcmax} onChange={handleChange} className="search-input" />
            <input name="minarea" type="number" placeholder="Área Mínima" value={filters.minarea} onChange={handleChange} className="search-input" />
            <input name="maxarea" type="number" placeholder="Área Máxima" value={filters.maxarea} onChange={handleChange} className="search-input" />
            <input name="bathrooms" type="number" placeholder="Baños" value={filters.bathrooms} onChange={handleChange} className="search-input" />
            <input name="parking" type="number" placeholder="Parqueaderos" value={filters.parking} onChange={handleChange} className="search-input" />
            <input name="stratum" type="number" placeholder="Estrato" value={filters.stratum} onChange={handleChange} className="search-input" />
          </div>
        )}

        <div className="search-toggles">
          <a href="#" className="toggle-link" onClick={(e) => { e.preventDefault(); setShowAdvanced(!showAdvanced); }}>
            {showAdvanced ? 'Búsqueda Sencilla' : 'Búsqueda Avanzada'}
          </a>
          <button type="button" className="clear-button" onClick={handleClear}>Borrar</button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;