"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

interface TeamMemberDisplay {
  slug: string;
  name: string;
  role: string;
  image: string;
}

interface TeamGridProps {
  members: TeamMemberDisplay[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {members.map((member, index) => (
        <motion.div
          key={member.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={{ pathname: "/nuestro-equipo/[slug]", params: { slug: member.slug } }}
            className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative h-72 overflow-hidden flex-shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-5 flex-grow flex flex-col justify-center">
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-navy group-hover:text-crimson transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
