"use client"
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Head from 'next/head';
import Image from 'next/image'
const ItemTypes = {
  ITEM: 'item',
};

const DraggableItem = ({ item, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => drag(drop(node))}
      className={`p-4 mb-2 text-black rounded  shadow flex items-center justify-between ${isDragging ? 'opacity-20' : ''
        }`}
    >
      <div className="group relative flex items-center w-full gap-x-6 rounded-lg p-4 hover:bg-gray-50">
        <div className="flex h-20 w-20 flex-none items-center justify-center rounded-lg bg-gray-100 group-hover:bg-white">
          <Image
            src={item.imgSrc}
            alt={item.cityName}
            width={500}
            height={500}
          />

        </div>
        <div className="flex-auto">
          <a href="#" className="block font-semibold text-gray-900">
            {item.cityName}
            <span className="absolute inset-0"></span>
          </a>
          <p className="mt-1 text-gray-600"> {item.cityLocation}</p>
        </div>
      </div>
      <div></div>
    </li>
  );
};

const DraggableList = () => {
  const [items, setItems] = useState([
    { id: '1', cityName: 'Scotland Island', cityLocation: 'Sydney, Australia', imgSrc: "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: '2', cityName: 'Bridge Climb', cityLocation: 'Sydney, Australia', imgSrc: "https://images.pexels.com/photos/1192671/pexels-photo-1192671.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: '3', cityName: 'Vivid Festival', cityLocation: 'Vence, Italy', imgSrc: 'https://images.pexels.com/photos/163872/italy-cala-gonone-air-sky-163872.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: '4', cityName: 'Calm Bar', cityLocation: 'London, United Kingdom', imgSrc: 'https://images.pexels.com/photos/1024989/pexels-photo-1024989.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="p-4 w-1/2 mx-auto bg-gray-100 rounded-md">
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
          />
        ))}
      </ul>
    </DndProvider>
  );
};

export default function Home() {
  return (
    <div>
      <Head>
        <meta name="description" cityName="A draggable list with Next.js and Tailwind CSS" />
      </Head>
      <main className="flex items-center justify-center min-h-screen bg-gray-200">
        <DraggableList />
      </main>
    </div>
  );
}
