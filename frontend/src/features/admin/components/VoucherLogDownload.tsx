"use client";

import { motion } from "framer-motion";
import { Download, FileSpreadsheet } from "lucide-react";

export default function VoucherLogDownload() {
  return (
    <div className="mx-auto max-w-md px-4 pt-44 pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
          <FileSpreadsheet className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Voucher assignment log</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Every voucher an admin has sent, with who got it and when. Updates every time one goes out.
        </p>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <a
            href="/api/admin/voucher-log"
            className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
