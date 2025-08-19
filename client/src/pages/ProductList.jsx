import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import { formatCurrency } from '../helper';
import { Link } from 'react-router-dom';
import { api } from '../config/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
}
