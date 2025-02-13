/*
 * @Date: 2024-03-01 15:30:05
 * @Description: description
 */
import React from 'react';
import { NavBar, ProductCard } from 'react-vant';

function List() {
  return (
    <div>
      <NavBar title="列表" />
      <ProductCard num="2" price="2.00" desc="描述信息" title="商品名称" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
    </div>
  );
}

export default List;
