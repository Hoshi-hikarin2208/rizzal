import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const createClient = (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) => {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch (error) {
          if (
            !(error instanceof Error) ||
            !error.message.includes("Cookies can only be modified")
          ) {
            throw error;
          }
        }
      },
    },
  });
};
