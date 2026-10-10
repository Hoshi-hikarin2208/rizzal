"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import type { InitialForumData } from "@/lib/supabase/forum-types";
import StatueExperience from "./statue-experience";

type Props = {
  supabaseUrl: string;
  supabaseKey: string;
  initialForumData: InitialForumData;
};

declare global {
  interface Window {
    supabase?: {
      createClient: () => ReturnType<typeof createClient>;
    };
    RIZAL_FORUM_CONFIG?: { supabaseUrl: string; supabaseAnonKey: string };
    RIZAL_INITIAL_FORUM_DATA?: InitialForumData;
    RIZAL_APP_SCRIPT_PROMISE?: Promise<void>;
  }
}

export default function LegacyAppScripts({
  supabaseUrl,
  supabaseKey,
  initialForumData,
}: Props) {
  useEffect(() => {
    window.supabase = {
      createClient,
    };
    window.RIZAL_FORUM_CONFIG = {
      supabaseUrl,
      supabaseAnonKey: supabaseKey,
    };
    window.RIZAL_INITIAL_FORUM_DATA = initialForumData;

    if (!window.RIZAL_APP_SCRIPT_PROMISE) {
      window.RIZAL_APP_SCRIPT_PROMISE = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "/app.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Could not load the site interaction script."));
        document.body.append(script);
      });
      window.RIZAL_APP_SCRIPT_PROMISE.catch((error: unknown) => {
        console.error("Could not initialize the site interactions.", error);
      });
    }
  }, [initialForumData, supabaseKey, supabaseUrl]);

  return <StatueExperience />;
}
