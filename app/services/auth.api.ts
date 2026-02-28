export const login = async (username: string, password: string) => {
  const res = await fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  return res.json();
};

export const logout = async () => {
  const res = await fetch("/api/logout", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
};
