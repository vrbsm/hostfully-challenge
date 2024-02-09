import { Places } from "../components/types";

export const places: Places[] = [
  {
    id: 1,
    excludeDates: [new Date(2024, 1, 12), new Date(2024, 1, 13), new Date(2024, 1, 14), new Date(2024, 1, 15)],
    name: "Santos",
    dailyPrice: 150,
    img: "https://images.trvl-media.com/lodging/20000000/19860000/19858700/19858690/6f09a7d8.jpg?impolicy=resizecrop&rw=455&ra=fit",
  },
  {
    id: 2,
    excludeDates: [],
    name: "Miami Beach Retreat",
    dailyPrice: 200,
    img: "https://images.trvl-media.com/lodging/13000000/12320000/12316600/12316590/dffb9d2c.jpg?impolicy=resizecrop&rw=500&ra=fit",
  },
  {
    id: 3,
    excludeDates: [],
    name: "Grand Canyon Getaway",
    dailyPrice: 180,
    img: "https://www.everysteph.com/wp-content/uploads/2021/03/grand-canyon-weekend-getaway-1-1024x680.jpg.webp",
  },
  {
    id: 4,
    excludeDates: [],
    name: "New York City Penthouse",
    dailyPrice: 300,
    img: "https://i.insider.com/63306e8e329bac00182f1f93?width=700",
  },
  {
    id: 5,
    excludeDates: [],
    name: "Lake Tahoe Cabin",
    dailyPrice: 120,
    img: "https://galeriemagazine.com/wp-content/uploads/2019/01/Dining_3-1024x674.jpg",
  },
  {
    id: 6,
    excludeDates: [],
    name: "Napa Valley Vineyard Cottage",
    dailyPrice: 250,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHK8AWZU7M8WBrRN6JSss_wbi2PYXglyAskw&usqp=CAU",
  },
  {
    id: 7,
    excludeDates: [],
    name: "Aspen Mountain Chalet",
    dailyPrice: 280,
    img: "https://imageio.forbes.com/specials-images/imageserve/63ebf3a7f192f2861fcaa56c/Great-room/960x0.jpg?height=469&width=711&fit=bounds",
  },
]
