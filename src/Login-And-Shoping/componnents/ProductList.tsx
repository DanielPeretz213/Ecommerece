import React, { useEffect, useState } from "react";
import { Product } from "../types/types";
import { fetchListItemAPI } from "../functions/fetchAPI";
import DrawCard from "./DrawCard";
import { Box } from "@mui/material";

const ProductList: React.FC = () => {
  const [listProducts, setListProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchListItemAPI();
      setListProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 3,
          backgroundColor: "#F5F6FA",
        }}
      >
        {listProducts?.map((ele) => (
          <div key={ele.id}>
            <DrawCard product={ele} />
          </div>
        ))}
      </Box>
    </div>
  );
};

export default ProductList;