"use client";

import { useEffect, useState } from "react";
import constate from "constate";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>();
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    fetchUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUser = async () => {
    try {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return {
    user,
    signOut,
    fetchUser,
  };
};

export const [AuthProvider, useAuthContext] = constate(useAuth);
