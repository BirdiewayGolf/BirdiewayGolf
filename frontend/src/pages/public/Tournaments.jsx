// src/pages/public/Tournaments.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react';
import api from '../../services/api';

const Tournaments = () => {
 const { category } = useParams();
 const [tournaments, setTournaments] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');

 useEffect(() => {
   fetchTournaments();
 }, [category]);

 const fetchTournaments = async () => {
   try {
     const response = await api.get('/tournaments', {
       params: { league: category }
     });
     setTournaments(response.data);
   } catch (err) {
     setError('Failed to fetch tournaments');
   } finally {
     setLoading(false);
   }
 };

 if (loading) {
   return (
     <div className="flex justify-center items-center min-h-screen">
       <div className="text-lg text-gray-600">Loading tournaments...</div>
     </div>
   );
 }

 if (error) {
   return (
     <div className="flex justify-center items-center min-h-screen">
       <div className="text-lg text-red-600">Error: {error}</div>
     </div>
   );
 }

 return (
   <div className="container mx-auto px-4 py-8">
     <h1 className="text-3xl font-bold mb-6">
       {category 
         ? `${category.charAt(0).toUpperCase() + category.slice(1)} League Tournaments` 
         : 'All Tournaments'
       }
     </h1>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {tournaments.map(tournament => (
         <div key={tournament._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
           <div className="flex justify-between items-start mb-4">
             <h2 className="text-xl font-semibold">{tournament.name}</h2>
             <span className={`px-2 py-1 text-sm rounded-full ${
               tournament.league === 'business' ? 'bg-blue-100 text-blue-800' :
               tournament.league === 'amateur' ? 'bg-green-100 text-green-800' :
               'bg-purple-100 text-purple-800'
             }`}>
               {tournament.league.charAt(0).toUpperCase() + tournament.league.slice(1)}
             </span>
           </div>

           <div className="space-y-2 mb-4">
             <div className="flex items-center text-gray-600">
               <Calendar className="w-4 h-4 mr-2" />
               {new Date(tournament.date).toLocaleDateString()}
             </div>
             
             <div className="flex items-center text-gray-600">
               <MapPin className="w-4 h-4 mr-2" />
               {tournament.location}
             </div>

             <div className="flex items-center text-gray-600">
               <Users className="w-4 h-4 mr-2" />
               {tournament.maxPlayers} Players Max
             </div>

             <div className="flex items-center text-gray-600">
               <DollarSign className="w-4 h-4 mr-2" />
               ${tournament.entryFee}
             </div>
           </div>

           <Link 
            to={`/tournaments/details/${tournament._id}`}
             className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 inline-block w-full text-center transition-colors"
           >
             View Details
           </Link>
         </div>
       ))}
     </div>

     {tournaments.length === 0 && (
       <div className="text-center py-12">
         <p className="text-gray-600 text-lg">No tournaments found</p>
         {category && (
           <Link 
             to="/tournaments" 
             className="text-emerald-600 hover:text-emerald-700 mt-2 inline-block"
           >
             View all tournaments
           </Link>
         )}
       </div>
     )}
   </div>
 );
};

export default Tournaments;