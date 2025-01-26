'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

// Domain model for company data
interface CompanyData {
  Company: string;
  Location: string;
  Person: string;
  Phone: string;
  Email: string;
  Website: string;
}

export default function CompanySearch() {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);
        const response = await fetch(
          'https://opensheet.elk.sh/1alsvX-fNp0fmvkhINMzMAfUcAl4i752s6TeLYRnnxRg/ATP'
        );
        const data: CompanyData[] = await response.json();
        setCompanies(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    }
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    Object.values(company).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <input
          type='text'
          placeholder='Search ATP using Company, Contact Person, Office Location etc...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {loading ? (
          <div>Fetching data...</div>
        ) : (
          <table className={styles.table}>
            {companies.length === 0 ? (
              <caption></caption>
            ) : (
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Office Location</th>
                  <th>Contact Person</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Website</th>
                </tr>
              </thead>
            )}
            <tbody>
              {filteredCompanies.map((company, index) => (
                <tr key={index}>
                  <td>{company.Company}</td>
                  <td>{company.Location}</td>
                  <td>{company.Person}</td>
                  <td>{company.Phone}</td>
                  <td>{company.Email}</td>
                  <td>{company.Website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
