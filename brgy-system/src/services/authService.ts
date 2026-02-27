import {supabase} from '../lib/supabase';

const isEmail = (input: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
export const loginWithUsername = async (
  usernameOrEmail: string,
  password: string
) => {

  await supabase.auth.signOut() //signout first before logging in again

  //Get email + role in one query, wont return null because I add a policy in this table to be able to view the selected table. Hence wont error 406
  const {data: profile, error: profileError} = await supabase 
    .from("profiles")//table name
    .select("email, role")//table fields
    .eq(isEmail(usernameOrEmail) ? "email" : "username", usernameOrEmail)//equivalent?
    .maybeSingle()

  if(profileError || !profile){
    throw new Error("Invalid username")
  }

  //Login using email + password
  const {data, error} = await supabase.auth.signInWithPassword({
    email: profile.email,
    password,
  })

  if(error){
    throw new Error("Invalid password")
  }
  console.log("profile fetched:", profile)
  console.log("role:", profile?.role)

  return {
    user: data.user,
    role: profile.role,
  }
}