// import { useState } from 'react'
import { useEffect } from 'react' 
import { supabase } from './lib/supabase.ts'
import './App.css'

function App() {
  useEffect(() => {// will render when there`s change`s the dependency
    fetchUsers();
  }, []);// [] no dependencies means run only once on the first mount
  // [variable] - dependency
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')

      if(error){
        console.log(error);
      }else{
        console.log(data);
      }
  };

  return (
    <>
      <div>Cheack console for users</div>
    </>
  )
}

export default App
