export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}


export interface UpdateIncomeGoal {
  monthly_income?: number;
  goal?: "Awareness" | "Control" | "Peace";
}

export interface UserStore {
  loading: boolean;
  error: string | null;

  updateIncomeGoal: (data: UpdateIncomeGoal) => Promise<void>;
}