const uploadFiles = async (req, res) => {
  try {
    let EDFile = req.files.file;
    EDFile.mv(`./files/${EDFile.name}`, (err) => {
      if (err) return res.status(500).send({ message: err });

      return res.status(200).send({ message: "File upload" });
    });
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error: error });
  }
};
module.exports = {
  uploadFiles,
};
