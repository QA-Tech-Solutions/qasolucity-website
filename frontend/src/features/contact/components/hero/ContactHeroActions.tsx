"use client";

import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactHeroActions() {
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
            Book Consultation
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          variant="outline"
          className="group h-14 rounded-2xl border-slate-300 px-8 transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50"
        >
          <Mail className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          hello@qasolucity.com
        </Button>
      </motion.div>
    </motion.div>
  );
}