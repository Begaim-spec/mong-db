import React, {useEffect, useState} from 'react'
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios('http://localhost:8000/api/tasks')
        .then(({data}) => setTasks(data))
  }, [])

  return (
   <div className='container my-4'>
       <h2>Tasks</h2>
     <ul className="list-group bg-primary text-white">
       {
         tasks.map(item =>
           <li className='list-group-item' key={item._id}>{item.title}</li>
         )
       }
     </ul>
   </div>
  );
}

export default App;
