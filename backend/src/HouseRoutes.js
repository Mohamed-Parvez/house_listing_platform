import House from "../database/schema.js";

export const GetHouse = async (req, res) => {
  const getdata = await House.find();
  res.json(getdata);
};

export const PostHouse = async (req, res) => {
  const getdata = await House.create(req.body);
  res.json(getdata);
};

export const UpdateHouse = async (req, res) => {
  const id = req.body._id;
  const updateData = await House.findByIdAndUpdate(id, req.body);
  res.json(updateData);
};

export const DeleteHouse = async (req, res) => {
  const id = req.body._id;
  const deleteData = await House.findByIdAndDelete(id);
  res.json(deleteData);
};
