import React, { useState, useEffect } from 'react';
import '../styles/OrdersPage.css'
import { fetchDonationRequestsForFoodbank } from '../services/donationRequests';
import { fetchRestaurantById } from '../services/restaurant';
import { fetchUserById } from '../services/user';
import { useAppSelector } from "../redux/hooks";
import FNavbar from '../components/foodbankNavbar';
import AIAssistant from '../components/aiAssistant'
import socket from '../services/socket';

interface Restaurant {
  _id: string;
  name: string;
}

interface FoodItem {
  _id: string;
  restaurant_id: string;
  restaurant: Restaurant;
  quantity: number;
  expiration_date: Date;
  name: string;
  category: string;
  status: "available" | "expired";
  created_at: Date;
  expiresIn: string;
  subCategory: "Savoury" | "Sweet" | "Beverage";
}

interface DonationRequest {
  _id: string;
  foodbank_id: string;
  food_id: FoodItem;
  requested_quantity: number;
  status: 'pending' | 'accepted' | 'cancelled' | 'completed';
  created_at: Date;
  foodItem?: FoodItem;
}

function getCategoryImage(subCategory: string): string {
  switch (subCategory) {
    case "Savoury":
      return "../images/savoury.jpg";
    case "Sweet":
      return "../images/sweet.jpg";
    case "Beverage":
      return "../images/beverage.jpg";
    default:
      return "../images/default-food.jpg";
  }
}

function formatExpiryTime(expirationDate: Date): string {
  const now = new Date();
  let expire = new Date(expirationDate).getTime() - (1000 * 60 * 60 * 5);
  const diffMs = expire - now.getTime();
  const diffHrs = Math.round(diffMs / (1000 * 60 * 60));

  if (diffHrs < 1) return "Less than 1h";
  else if (diffHrs < 24) return `${diffHrs}h`;
  else return `${Math.floor(diffHrs / 24)}d`;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<DonationRequest[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const foodbankId = useAppSelector((state: any) => state.user.type_id);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data: DonationRequest[] = await fetchDonationRequestsForFoodbank(foodbankId);

        const enrichedOrders = await Promise.all(data.map(async (order) => {
          const enrichedOrder = { ...order };
          enrichedOrder.foodItem = { ...order.food_id };
          if (enrichedOrder.foodItem) {
            enrichedOrder.foodItem.subCategory = enrichedOrder.foodItem.category as FoodItem["subCategory"];
            try {
              const restaurant = await fetchRestaurantById(enrichedOrder.foodItem.restaurant_id);
              const user = await fetchUserById(restaurant.user_id);
              enrichedOrder.foodItem.restaurant = {
                _id: restaurant._id,
                name: user.name
              };
            } catch (err) {
              console.error("Failed to fetch restaurant name", err);
              enrichedOrder.foodItem.restaurant = {
                _id: enrichedOrder.foodItem.restaurant_id,
                name: "Unknown"
              };
            }
          }
          return enrichedOrder;
        }));

        setOrders(enrichedOrders);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [foodbankId]);

  useEffect(() => {
    const handleStatusUpdate = (data: { requestId: string; newStatus: DonationRequest["status"] }) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === data.requestId
            ? { ...order, status: data.newStatus }
            : order
        )
      );
    };
  
    socket.on("donationStatusUpdated", handleStatusUpdate);
  
    return () => {
      socket.off("donationStatusUpdated", handleStatusUpdate);
    };
  }, []);
  

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(order => order.status === filter);

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'accepted': return 'status-accepted';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="orders-page">
      <FNavbar active="orders" />
      <main className="main-content">
        <h1 className="page-title">My Food Bank Orders</h1>

        <div className="filter-container">
          <div className="filter-tabs">
            {['all', 'pending', 'accepted', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                className={`filter-tab ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="no-orders">Loading...</div>
        ) : (
          filteredOrders.length === 0 ? (
            <div className="no-orders">No items to display.</div>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map(order => (
                <div className="order-card" key={order._id}>
                  <div className="order-image-container">
                    {order.foodItem && (
                      <img
                        src={getCategoryImage(order.foodItem.subCategory)}
                        alt={order.foodItem.name}
                        className="order-image"
                      />
                    )}
                    {order.foodItem?.expiration_date && (
                      <div className="expires-tag">
                        Expires in {formatExpiryTime(order.foodItem.expiration_date)}
                      </div>
                    )}
                  </div>
                  <div className="order-details">
                    <h3 className="food-name">{order.foodItem?.name || 'Food Item'}</h3>
                    <div className={`order-status ${getStatusClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                    <div className="order-provider">
                      <span className="provider-icon">🏢</span>
                      {order.foodItem?.restaurant.name || 'Food Provider'}
                    </div>
                    <div className="order-quantity">
                      Quantity requested: <span className="quantity-value">{order.requested_quantity} portions</span>
                    </div>
                    <div className="order-date">
                      Ordered on {formatDate(order.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>
      <AIAssistant />
    </div>
  );
};

export default OrdersPage;
