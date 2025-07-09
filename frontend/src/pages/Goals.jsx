// src/pages/Goals.jsx

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import GoalCard from "../components/GoalCard";
import AddGoalModal from "../components/AddGoalModal";
import EditGoalModal from "../components/EditGoalModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const res = await axios.get("/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(res.data);
      } catch (err) {
        console.error("Failed to load goals:", err.message);
      }
    };
    fetchGoals();
  }, [refreshKey]);

  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="bg-[#F9FBFD] dark:bg-gray-900 min-h-screen pl-56">
      <Sidebar />
      {/* <Header /> */}

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Goals
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            + Set New Goal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal._id}
              name={goal.name}
              targetAmount={goal.targetAmount}
              savedAmount={goal.savedAmount}
              progress={goal.progress}
              onEdit={() => {
                setSelectedGoal(goal);
                setShowEditModal(true);
              }}
              onDelete={() => {
                setSelectedGoal(goal);
                setShowDeleteModal(true);
              }}
            />
          ))}
        </div>

        {/* Modals */}
        <AddGoalModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleSuccess}
        />
        {showEditModal && selectedGoal && (
          <EditGoalModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
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
