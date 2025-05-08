import { useEffect, useState } from "react";
import { fetchRestaurants } from "../services/restaurant";
import { fetchUserById } from "../services/user";
import "../styles/leaderboard.css";
import FNavbar from "../components/foodbankNavbar";
import Navbar from "../components/NavBar";
import { useAppSelector } from "../redux/hooks";
import AIAssistant from '../components/aiAssistant'

type Restaurant = {
  user_id: string;
  total_donations: number;
  points?: number;
  name?: string;
};

function App() {
  const user = useAppSelector((state: any) => state.user);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const restaurantData = await fetchRestaurants();
        const enrichedData = await Promise.all(
          restaurantData.map(async (restaurant: Restaurant) => {
            const user = await fetchUserById(restaurant.user_id);
            return {
              name: user.name,
              points: restaurant.total_donations,
            };
          })
        );
        enrichedData.sort((a, b) => b.points! - a.points!);
        setRestaurants(enrichedData);
      } catch (error) {
        console.error("Error loading restaurants:", error);
      }
    };
    loadRestaurants();
  }, []);

  return (
    <>
    <div>
    {user.user_type === "restaurant" ? (
        <Navbar active="leaderboard" />
      ) : (
        <FNavbar active="leaderboard" />
      )}
    </div>
    
    <div className="app">
      

      <main className="container">
        <h1 className="page-title">Leaderboard</h1>

        <div className="top-leaders">
        {restaurants.slice(0, 3).map((restaurant, index) => {
          const imageSrc =
            index === 0
              ? "/first.png"
              : index === 1
              ? "/second.png"
              : "/third.png";

          const tierClass = index === 0 ? "gold gold-border" : index === 1 ? "silver silver-border" : "bronze bronze-border";

          return (
            <div key={restaurant.user_id} className={`leader-card ${tierClass}`}>
              <div className="leader-image">
                <img src={imageSrc} alt={`Rank ${index + 1}`} />
              </div>
              <div className="leader-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.points} Points</p>
              </div>
            </div>
          );
        })}
      </div>

        <div className="leaderboard-list">
          {restaurants.slice(3).map((restaurant, index) => (
            <div key={index} className="list-item light-blue">
              <span className="rank">{index + 4}</span>
              <span className="user-name">{restaurant.name}</span>
              <span className="points">{restaurant.points} Points</span>
            </div>
          ))}
        </div>
      </main>
      <AIAssistant />
    </div>
    </>
  );
}

export default App;
