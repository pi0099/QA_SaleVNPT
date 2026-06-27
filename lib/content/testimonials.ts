export type Testimonial = {
  id: string;
  name: string;
  area: string;
  rating: number;
  comment: string;
  service: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Chị Lan",
    area: "Quận 12",
    rating: 5,
    service: "WiFi VNPT",
    comment:
      "Tư vấn nhanh, kiểm tra hạ tầng đúng địa chỉ trước khi chốt gói. Lắp xong test speed ổn, WiFi tầng 2 dùng Mesh ổn.",
  },
  {
    id: "t2",
    name: "Anh Minh",
    area: "Gò Vấp",
    rating: 5,
    service: "Combo Internet + Di động",
    comment:
      "Gom bill WiFi và SIM cho cả nhà tiện hơn trả riêng. Nhân viên giải thích rõ phần data và phút gọi.",
  },
  {
    id: "t3",
    name: "Chị Hương",
    area: "Tân Bình",
    rating: 4,
    service: "Camera VNPT",
    comment:
      "Lắp camera cửa hàng, hướng dẫn xem app rõ ràng. WiFi yếu góc sau được tư vấn thêm Mesh.",
  },
];

export const reviewSummary = {
  average: 4.9,
  total: 128,
  breakdown: [
    { stars: 5, count: 112 },
    { stars: 4, count: 12 },
    { stars: 3, count: 3 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 },
  ],
};
