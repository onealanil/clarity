import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target } from "lucide-react";
import { goals } from "./helper/data";
import { useUserStore } from "../../store/useUserStore";
import { useAuthStore } from "../../store/useAuthStore";

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { updateIncomeGoal, loading, error } = useUserStore();
  const { user } = useAuthStore();

  const [step, setStep] = useState<number>(1);
  const [monthlyIncome, setMonthlyIncome] = useState<string>(
    user?.monthly_income != null
      ? user.monthly_income.toString()
      : ""
  );

  const [goal, setGoal] = useState<
    "Awareness" | "Control" | "Peace" | ""
  >("");

  useEffect(() => {
    if (user) {
      if (user.monthly_income != null) {
        setMonthlyIncome(user.monthly_income.toString());
      }

      if (user.goal) {
        setGoal(user.goal);
      }
    }
  }, [user]);


  useEffect(() => {
    if (user?.monthly_income != null && user?.goal) {
      navigate("/dashboard");
    }
  }, [user, navigate]);


  const handleNext = () => {
    if (!monthlyIncome || Number(monthlyIncome) <= 0) return;
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!goal || !monthlyIncome) return;

    await updateIncomeGoal({
      monthly_income: Number(monthlyIncome),
      goal,
    });

    if (!error) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-green-50/30 to-stone-50 p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-clarity-green/10 mb-4">
            {step === 1 ? (
              <span className="w-8 h-8 text-clarity-green">R.S</span>
            ) : (
              <Target className="w-8 h-8 text-clarity-green" />
            )}
          </div>

          <div className="flex justify-center gap-2 mb-4">
            <div
              className={`h-1 rounded-full transition-all duration-500 ${step >= 1
                ? "w-12 bg-clarity-green"
                : "w-12 bg-stone-200"
                }`}
            />
            <div
              className={`h-1 rounded-full transition-all duration-500 ${step >= 2
                ? "w-12 bg-clarity-green"
                : "w-12 bg-stone-200"
                }`}
            />
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-stone-200/50 animate-slide-up">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-semibold text-clarity-charcoal">
                  What's your monthly income?
                </h1>
                <p className="text-stone-500">
                  This helps us personalize your experience
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg font-medium">
                  R.S
                </div>
                <input
                  type="number"
                  placeholder="20,000"
                  className="w-full border-2 border-stone-200 rounded-2xl pl-12 pr-4 py-4 text-lg focus:outline-none focus:border-clarity-green transition-colors"
                  value={monthlyIncome}
                  onChange={(e) => {
                    setMonthlyIncome(e.target.value);
                  }}
                />
              </div>

              <button
                className="w-full bg-clarity-green text-white px-6 py-4 rounded-2xl hover:bg-clarity-green/90 active:scale-98 transition-all disabled:opacity-40"
                onClick={handleNext}
                disabled={!monthlyIncome}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-semibold text-clarity-charcoal">
                  What's your intention?
                </h1>
                <p className="text-stone-500">
                  Choose what matters most to you
                </p>
              </div>

              <div className="space-y-3">
                {goals.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      className={`w-full px-6 py-5 rounded-2xl border-2 transition-all text-left group ${goal === item.value
                        ? "bg-clarity-green border-clarity-green text-white shadow-lg shadow-clarity-green/20"
                        : "bg-white border-stone-200 text-clarity-charcoal hover:border-clarity-lightGreen hover:shadow-md"
                        }`}
                      onClick={() =>
                        setGoal(
                          item.value as
                          | "Awareness"
                          | "Control"
                          | "Peace"
                        )
                      }
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${goal === item.value
                            ? "bg-white/20"
                            : "bg-stone-100 group-hover:bg-clarity-green/10"
                            }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${goal === item.value
                              ? "text-white"
                              : "text-clarity-green"
                              }`}
                          />
                        </div>

                        <div>
                          <div className="font-semibold text-lg mb-1">
                            {item.value}
                          </div>
                          <div
                            className={`text-sm ${goal === item.value
                              ? "text-white/80"
                              : "text-stone-500"
                              }`}
                          >
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                className="w-full bg-clarity-green text-white px-6 py-4 rounded-2xl hover:bg-clarity-green/90 active:scale-98 transition-all disabled:opacity-40"
                onClick={handleSubmit}
                disabled={!goal || loading}
              >
                {loading ? "Saving..." : "Get Started"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
