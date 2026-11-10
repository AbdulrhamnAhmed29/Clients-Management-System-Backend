export const toPublicUser = (user) => {
  const publicUser = user.toObject();
  delete publicUser.password;
  return publicUser;
};

export const handleDuplicateEmail = (error, res) => {
  if (error.code !== 11000 || !error.keyPattern?.email) {
    return false;
  }

  res.status(409).json({ message: "A user with this email already exists" });
  return true;
};
