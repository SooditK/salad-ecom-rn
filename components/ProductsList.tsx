import React, { useEffect } from "react";
import { FlatList } from "react-native";
import ProductCard from "./ProductCard";
import { useAtom } from "jotai";
import { cartAtom } from "../screens/Home";
import axios from "axios";
import { userToken } from "../navigation";
import { ProductCardProps } from "./ProductCard";

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  count: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  orderId?: any;
  Category: Category;
}

export interface ProductCardItems {
  success: boolean;
  message: string;
  products: Product[];
}

export default function ProductsList() {
  const [token, setToken] = useAtom(userToken);
  const [products, setProducts] = React.useState<ProductCardProps[]>();

  async function getProducts() {
    try {
      const response = await axios.get<ProductCardItems>(
        "https://api.langdatyagi.tk/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success === true) {
        const data = response.data.products.map((item) => {
          if (
            item?.Category?.name !== undefined &&
            item?.Category?.name !== null
          ) {
            return {
              image: item.image,
              id: item.id,
              category: item.Category.name,
              title: item.title,
              price: item.price,
              description: item.description,
              count: item.count,
            };
          } else {
            return {
              image: item.image,
              id: item.id,
              category: "No category",
              title: item.title,
              price: item.price,
              description: item.description,
              count: item.count,
            };
          }
        });
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [token]);

  if (!products) {
    return null;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductCard
          image={item.image}
          id={item.id}
          category={item.category as string}
          title={item.title}
          price={item.price}
          description={item.description}
          count={item.count}
        />
      )}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
    />
  );
}
