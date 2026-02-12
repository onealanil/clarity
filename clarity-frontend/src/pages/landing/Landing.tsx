import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar/Navbar";
import { cardVariants, heroVariants } from "./helper/Vairants";
import { cards } from "./helper/card_data";


const Landing = (): React.ReactElement => {

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-clarity-light/5">
      <div className="w-full lg:w-[70%]">
        <Navbar />

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-5 md:py-15">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="inline-flex items-center space-x-2 bg-clarity-green/10 border border-clarity-green/20 px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-clarity-green rounded-full animate-pulse" />
            <span className="text-sm font-medium text-clarity-charcoal">
              Money reflection, not restriction
            </span>
          </motion.div>

          <motion.h2
            custom={1}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-clarity-charcoal mb-6 leading-tight max-w-4xl mx-auto break-words"
          >
            Understand how your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">money</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                className="absolute bottom-1 left-0 w-full h-2 bg-clarity-green/30 -rotate-1 origin-left"
              />
            </span>{" "}
            feels.
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="text-lg sm:text-xl md:text-2xl text-clarity-slate max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Clarity is not an expense tracker. It helps you reflect on how your
            spending feels so you can build{" "}
            <span className="text-clarity-green font-semibold">awareness</span>, not anxiety.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              to="/signup"
              className="group bg-clarity-green text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:bg-clarity-lightGreen focus:outline-none focus:ring-4 focus:ring-clarity-green/50 shadow-2xl hover:shadow-clarity-green/50 hover:scale-105 transform flex items-center space-x-2 transition-transform duration-300"
            >
              <span>Start Reflecting</span>
              <MoveRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              to="/login"
              className="hidden md:flex border-2 border-clarity-charcoal px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold text-clarity-charcoal hover:border-black focus:outline-none focus:ring-4 focus:ring-clarity-charcoal/30 hover:scale-105 transform transition-transform duration-300"
            >
              Login
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gray-200 hover:shadow-2xl hover:scale-105 transform transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-clarity-green/20 rounded-2xl flex items-center justify-center mb-4 group hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-clarity-charcoal mb-2">{card.title}</h3>
                <p className="text-clarity-slate leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
