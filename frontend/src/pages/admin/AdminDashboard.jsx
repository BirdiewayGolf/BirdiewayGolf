// AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import {
 Trophy,
 Users, 
 Star,
 Calendar
} from 'lucide-react';

const AdminDashboard = () => {
 const stats = [
   {
     title: "Active Tournaments",
     value: "3",
     icon: <Trophy className="h-6 w-6 text-emerald-600" />,
     change: "+2 this month"
   },
   {
     title: "Total Registrations", 
     value: "128",
     icon: <Users className="h-6 w-6 text-emerald-600" />,
     change: "+12 this week"
   },
   {
     title: "Upcoming Events",
     value: "5", 
     icon: <Calendar className="h-6 w-6 text-emerald-600" />,
     change: "Next event in 3 days"
   }
 ];

 const quickActions = [
   {
     title: "Create Tournament",
     icon: <Trophy />,
     description: "Set up a new tournament",
     link: "/admin/tournaments/new",
     color: "bg-emerald-50"
   },
   {
     title: "Manage Tournaments",  // Changed title from "Edit Tournament"
     icon: <Trophy />,
     description: "View and edit tournaments",  // Updated description
     link: "/admin/tournaments",   // Changed from /edit to list view
     color: "bg-yellow-50"
   },
   {
     title: "Manage Standings",
     icon: <Star />,
     description: "Add or update standings for a tournament",
     link: "/admin/standings",
     color: "bg-blue-50"
   },
   {
     title: "View Registrations",
     icon: <Users />,
     description: "Review tournament registrations",
     link: "/admin/registrations",
     color: "bg-purple-50"
   }
 ];

 return (
   <div className="admin-dashboard custom-scrollbar pt-20">
     {/* Admin Header */}
     <div className="dashboard-header">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center">
           <h1 className="header-title animate-slide-in">Admin Dashboard</h1>
           <div className="flex items-center space-x-4">
             <Link to="/admin/tournaments/new" className="create-button">
               Create Tournament
             </Link>
           </div>
         </div>
       </div>
     </div>

     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
       {/* Stats Overview */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         {stats.map((stat, index) => (
           <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
             <div className="flex items-center">
               <div className="p-3 rounded-full bg-emerald-50">
                 {stat.icon}
               </div>
               <div className="ml-4">
                 <p className="text-sm text-gray-500">{stat.title}</p>
                 <p className="text-2xl font-semibold">{stat.value}</p>
                 <p className="text-sm text-emerald-600">{stat.change}</p>
               </div>
             </div>
           </div>
         ))}
       </div>

       {/* Quick Actions */}
       <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         {quickActions.map((action, index) => (
           <Link
             key={index}
             to={action.link}
             className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
           >
             <div className={`p-3 rounded-full w-fit ${action.color}`}>
               {action.icon}
             </div>
             <h3 className="text-lg font-semibold mt-4">{action.title}</h3>
             <p className="text-gray-500 mt-1">{action.description}</p>
           </Link>
         ))}
       </div>
     </div>
   </div>
 );
};

export default AdminDashboard;