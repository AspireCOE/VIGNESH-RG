import React from 'react';
import all_product from '../components/Assets/all_product';
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../components/Breadcrums/Breadcrum';
import { ProductDisplay } from '../components/ProductDisplay/ProductDisplay';
import { RelatedProducts } from '../components/RelatedProducts/RelatedProducts';

export const Product = () => {
  const {productId}=useParams();
  const product =all_product.find((e)=> e.id===Number(productId));
  console.log(all_product);
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product} />
      <RelatedProducts/>
    </div>
  )
}
