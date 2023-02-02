import styled from "styled-components";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const Cont = styled.div``;

const Testing = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 
 const supabase = createClient('https://gnglnlhagljbujwdribh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZ2xubGhhZ2xqYnVqd2RyaWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzNzI5NjcsImV4cCI6MTk5MDk0ODk2N30.8CCCM8Nz2cWCh8lEdAE42hJOV_u9hmvXNpEwPyGIbjE');
 const createUser = async () => {
  try{
    const {data:{user},error} = await supabase.auth.signUp({
      email:email,
      password: password,
    })
    if(error) throw error;
  } catch(error){
    console.log(error)
  }
 }
  return <Cont>
    <input type = 'email'placeholder=  'email' value = {email} onChange = {(e)=>setEmail(e.target.value)} />
    <input type = 'text' placeholder=  'password'value = {password} onChange = {(e) => setPassword(e.target.value)} />

    <button onClick = {createUser}><p>submit</p></button>
  </Cont>;
};

export default Testing;
