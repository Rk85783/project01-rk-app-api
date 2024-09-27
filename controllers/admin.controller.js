import Utils from "../utils/common.util.js";

export const adminProfile = async (req, res) => {
  const xyz = Utils.test;
  console.log(xyz);
  console.log(req.user);
  res.send("admin profile");
}