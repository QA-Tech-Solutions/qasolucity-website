"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function AboutHeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-10 flex flex-wrap gap-4"
    >
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link href="/contact">
          <Button className="group h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30">
            Work With Us
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link href="/services">
          <Button
            variant="outline"
            className="h-14 rounded-2xl border-slate-300 dark:border-slate-700 px-8 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
          >
            Explore Our Services
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}