const uploadFile = async(req, res) => {
    console.log(req.body.name);
    console.log(req.body.file);
    res.status(200).send();

 }

module.exports = {
    uploadFile
}