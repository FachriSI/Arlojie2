import React, { useState } from "react";

const product = {
  image: "https://i.ibb.co/6WZb7gD/longines-master.png", // Ganti dengan url gambar produk
  name: "Longines Master AC 6570 Silver Stainless Steel Strap",
};

const ratingLabels = ["", "Buruk", "Cukup", "Baik", "Sangat Baik", "Sempurna"];

export const Rating = ({ onClose, onSubmit }) => {
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Nilai Produk</h2>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-contain"
        />
        <span className="font-medium text-lg">{product.name}</span>
      </div>
      <div className="mb-6">
        <div className="font-medium mb-2">Kualitas Produk</div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setStars(num)}
              className="focus:outline-none"
            >
              <span
                className={`text-3xl ${
                  num <= stars ? "text-black" : "text-gray-300"
                }`}
              >
                ★
              </span>
            </button>
          ))}
          <span className="ml-3 text-base font-semibold text-black">
            {ratingLabels[stars]}
          </span>
        </div>
      </div>
      <textarea
        className="w-full border rounded-lg p-4 mb-8 text-gray-700"
        rows={4}
        placeholder="Bagikan penilaianmu tentang produk ini"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end gap-4">
        <button
          className="px-8 py-2 rounded-full border border-black text-black font-semibold bg-white hover:bg-gray-100"
          onClick={onClose}
        >
          Nanti Saja
        </button>
        <button
          className="px-8 py-2 rounded-full bg-black text-white font-semibold shadow hover:bg-gray-900"
          onClick={() => onSubmit && onSubmit({ stars, comment })}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Rating;
