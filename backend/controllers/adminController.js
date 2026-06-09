import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.EMAIL ||
      password !== process.env.PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { adminLogin};
