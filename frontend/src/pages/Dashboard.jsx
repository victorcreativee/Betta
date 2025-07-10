import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import ExpenseLineChart from "../components/LineChart";
import SpendingBreakdownChart from "../components/SpendingBreakdownChart";
import RecentTransactions from "../components/RecentTransactions";
import AddTransactionModal from "../components/AddTransactionModal";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { TrendingUp, Target, BarChart2 } from "lucide-react"; 
import GoalCard from "../components/GoalCard";
import AddGoalModal from "../components/AddGoalModal";
import EditGoalModal from "../components/EditGoalModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import AddMoneyModal from "../components/AddMoneyModal";




// const [showGoalModal, setShowGoalModal] = useState(false);

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [summary, setSummary] = useState({ income: 0, 
    expenses: 0, 
    balance: 0, 
    goalsSaved: 0, 
  });

  const [recentTrends, setRecentTrends] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [smartGoals, setSmartGoals] = useState([]);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);



  const navigate = useNavigate();

  // Protect route
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const res = await axios.get("/transactions/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSummary({
          income: res.data.income,
          expenses: res.data.expenses,
          balance: res.data.balance,
          goalsSaved: res.data.goalsSaved || 0,
        });
      } catch (err) {
        console.error("Failed to fetch summary:", err.message);
      }
    };

    fetchSummary();
  }, [refreshKey]);

  // Fetch advanced stats
  useEffect(() => {
    const fetchAdvancedStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const res = await axios.get("/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecentTrends(res.data.recentTrends);
        setTopCategories(res.data.topCategories);
        setSmartGoals(res.data.smartGoals);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err.message);
      }
    };

    fetchAdvancedStats();
  }, [refreshKey]);


  // Fsetting goal
  const [goals, setGoals] = useState([]);

    useEffect(() => {
      const fetchGoals = async () => {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          const token = user?.token;
    
          const res = await axios.get("/goals", {
            headers: { Authorization: `Bearer ${token}` },
          });
    
          setGoals(res.data);
        } catch (err) {
          console.error("Failed to fetch goals:", err.message);
        }
      };
    
      fetchGoals();
    }, [refreshKey]);
    




  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="bg-[#F9FBFD] dark:bg-gray-900 min-h-screen pl-56">
      <Sidebar />
      <Header />

      <div className="p-6 max-w-7xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          {/* <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2> */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add Transaction
          </button>

          <button
            onClick={() => setShowGoalModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            + Set Goal
          </button>

          <button
            onClick={() => setShowAddMoneyModal(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            + Save Money
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SummaryCard title="Total Balance" amount={`$${summary.balance.toFixed(2)}`} color="text-blue-500" />
          <SummaryCard title="Income" amount={`$${summary.income.toFixed(2)}`} color="text-green-500" />
          <SummaryCard title="Expenses" amount={`$${summary.expenses.toFixed(2)}`} color="text-red-500" />
          <SummaryCard title="Total Saved" amount={`$${summary?.goalsSaved.toFixed(2)}`} color="text-purple-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExpenseLineChart refreshKey={refreshKey} />
          <SpendingBreakdownChart data={topCategories} />
        </div>

        <RecentTransactions onSuccess={handleSuccess} key={refreshKey} />

        {/*  Advanced Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Recent Trends" icon={<TrendingUp size={20} />}>
          <ul className="space-y-3">
            {recentTrends.map((t, i) => (
              <li key={i} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>{new Date(t.date).toLocaleDateString()} — {t.category}</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {t.amount.toLocaleString()} RWF
                </span>
              </li>
            ))}
          </ul>
        </DashboardCard>


        <DashboardCard title="Top Categories" icon={<BarChart2 size={20} />}>
          <ul className="space-y-3">
            {topCategories.map((cat, i) => (
              <li key={i} className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span className="capitalize">{cat.category}</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {cat.total.toLocaleString()} RWF
                </span>
              </li>
            ))}
          </ul>
        </DashboardCard>


        <DashboardCard title="Smart Goal Progress" icon={<Target size={20} />}>
        <div className="space-y-3">
          {goals.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No goals set yet.</p>
          )}

          {goals.map((goal) => (
            <GoalCard
              key={goal._id}
              name={goal.name}
              progress={goal.progress}
              targetAmount={goal.targetAmount}
              savedAmount={goal.savedAmount}
              // onAddSavings={() => {
              //   setSelectedGoal(goal);
              //   setShowAddMoneyModal(true);
              // }}
              onEdit={() => {
                setSelectedGoal(goal);
                setShowEditGoalModal(true);
              }}
              onDelete={() => {
                setSelectedGoal(goal);
                setShowDeleteModal(true);
              }}

            />
          ))}


        </div>

        </DashboardCard>

        </div>

        <AddTransactionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
        <AddGoalModal
          isOpen={showGoalModal}
          onClose={() => setShowGoalModal(false)}
          onSuccess={handleSuccess}
        />

        <AddMoneyModal
          isOpen={showAddMoneyModal}
          onClose={() => setShowAddMoneyModal(false)}
          goals={goals}
          onSuccess={handleSuccess}
        />

        {showEditGoalModal && selectedGoal && (
          <EditGoalModal
            isOpen={showEditGoalModal}
            onClose={() => setShowEditGoalModal(false)}
            goal={selectedGoal}
            onSuccess={handleSuccess}
          />
        )}


        {showDeleteModal && selectedGoal && (
          <DeleteConfirmModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            goalId={selectedGoal._id}
            onSuccess={handleSuccess}
          />
        )}

        
              </div>
    </div>
  );
}


